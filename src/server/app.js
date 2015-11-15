var fs = require('fs');
var _ = require('underscore');
var ws = require('nodejs-websocket');
var strategies = require('../lib/strategies');

var port = 8080;
var messageTypes = {
    QUOTE: 1,
    CALL: 2,
    PUT: 3
};

// Settings
var symbols = ['EURGBP', 'AUDNZD', 'NZDUSD', 'AUDCAD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'EURUSD'];
var investment = 5;
var strategyFn = strategies.Reversals;

// Data
var symbolStrategies = {};
var quotes = {};
var lastDataPoints = {};

var serverOptions = {
    // secure: true,
    // key: fs.readFileSync('../../server.key'),
    // cert: fs.readFileSync('../../server.crt')
};
var serverOptions = ws.createServer(serverOptions, function(client) {
    console.log('New connection');

    client.on('close', function(code, reason) {
        console.log('Connection closed');
    });

    client.on('error', function(error) {
        console.error(error);
    });

    client.on('text', function(data) {
        try {
            var message = JSON.parse(data);
            var quoteDate;

            switch (message.type) {
                case messageTypes.QUOTE:
                    message.data.forEach(function(quote) {
                        var symbolQuotes = quotes[quote.symbol];

                        // Only record the data if the data pertains to a symbol being monitored.
                        if (symbols.indexOf(quote.symbol) > -1) {
                            quoteDate = new Date(quote.timestamp);

                            // If the quote timestamp second is after second 0 and there is no data recorded
                            // yet for the current minute, then use the previous data point's close price
                            // as the open price for this minute.
                            if (symbolQuotes.length === 0 && quoteDate.getSeconds() > 0 && lastDataPoints[quote.symbol]) {
                                symbolQuotes.push({
                                    symbol: quote.symbol,
                                    price: lastDataPoints[quote.symbol].close,
                                    timestamp: quote.timestamp - (quoteDate.getSeconds() * 1000)
                                });

                                // Log data to a file.
                                fs.appendFileSync('./data.csv', JSON.stringify({
                                    symbol: quote.symbol,
                                    price: lastDataPoints[quote.symbol].close,
                                    timestamp: quote.timestamp - (quoteDate.getSeconds() * 1000)
                                }) + '\n');
                            }

                            // Track the quote data by symbol.
                            symbolQuotes.push(quote);

                            // Log data to a file.
                            fs.appendFileSync('./data.csv', JSON.stringify(quote) + '\n');
                        }
                    });

                    break;
            }
        }
        catch (error) {
            console.error(error);
        }
    });

    function calculateMinuteData(symbol) {
        var symbolQuotes = quotes[symbol];
        var firstQuoteTimestamp;
        var dataPoint = null;
        var dataPointTimestamp = new Date().getTime();

        if (lastDataPoints[symbol]) {
            firstQuoteTimestamp = lastDataPoints[symbol].timestamp + (60 * 1000);
            firstQuoteTimestamp = firstQuoteTimestamp - (new Date(firstQuoteTimestamp).getSeconds() * 1000);

            // Use the first second of the minute for the data point timestamp.
            dataPointTimestamp = firstQuoteTimestamp + (59 * 1000);
        }

        // If there are no quotes for the minute, then create one using the previous data point.
        if (symbolQuotes.length === 0 && lastDataPoints[symbol]) {
            symbolQuotes.push({
                symbol: symbol,
                price: lastDataPoints[symbol].close,
                timestamp: firstQuoteTimestamp
            });

            // Log data to a file.
            fs.appendFileSync('./data.csv', JSON.stringify({
                symbol: symbol,
                price: lastDataPoints[symbol].close,
                timestamp: firstQuoteTimestamp
            }) + '\n');
        }

        // Nothing can be done if there still are no quotes.
        if (symbolQuotes.length === 0) {
            return;
        }

        dataPoint = {
            high: _(symbolQuotes).max('price').price,
            low: _(symbolQuotes).min('price').price,
            open: _(symbolQuotes).first().price,
            close: _(symbolQuotes).last().price,
            timestamp: dataPointTimestamp
        };

        quotes[symbol] = [];
        lastDataPoints[symbol] = dataPoint;

        return dataPoint;
    }

    function tickTimer() {
        var date = new Date();
        var drift = date.getMilliseconds();
        var second = date.getSeconds();
        var analysis = '';
        var dataPoint;

        // Enter trades only on the 59th second.
        if (second === 59) {
            // Perform analysis for each symbol.
            symbols.forEach(function(symbol) {
                dataPoint = calculateMinuteData(symbol);

                if (!dataPoint) {
                    // No data point available, so no analysis can take place.
                    return;
                }

                // Log data to a file.
                fs.appendFileSync('./data.csv', JSON.stringify(dataPoint) + '\n');

                // Analyze the data to date.
                analysis = symbolStrategies[symbol].analyze(dataPoint);

                // If analysis sends back a positive result, then tell the client to initiate a trade.
                if (analysis) {
                    client.sendText(JSON.stringify({
                        type: analysis === 'CALL' ? messageTypes.CALL : messageTypes.PUT,
                        data: {
                            symbol: symbol,
                            investment: investment
                        }
                    }));
                    console.log(analysis + ' for ' + symbol + ' at ' + new Date() + ' for $' + investment);
                }
            });
        }

        setTimeout(tickTimer, 1000 - drift);
    }

    // Start the timer.
    tickTimer();
}).listen(port);

symbols.forEach(function(symbol) {
    var settings = require('../../settings/' + symbol + '.js');

    // Instantiate a new strategy instance for the symbol.
    symbolStrategies[symbol] = new strategyFn(symbol, settings);

    // Initialize quote data for the symbol.
    quotes[symbol] = [];
});
