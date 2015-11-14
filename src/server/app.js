var _ = require('underscore');
var ws = require('nodejs-websocket');
var strategies = require('../lib/strategies');

var port = 8080;

var messageTypes = {
    QUOTE: 1,
    CALL: 2,
    PUT: 3
};

var symbols = ['EURGBP', 'AUDNZD', 'NZDUSD', 'AUDCAD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'EURUSD'];
var investment = 5;
var strategyFn = strategies.Reversals;

var serverOptions = {
    // secure: true,
    // key: fs.readFileSync('../../server.key'),
    // cert: fs.readFileSync('../../server.crt')
};
var serverOptions = ws.createServer(options, function(client) {
    var strategies = {};
    var quotes = {};
    var lastDataPoints = {};

    console.log('New connection');

    client.on('close', function(code, reason) {
        console.log('Connection closed');
    });

    client.on('error', function(error) {
        console.log(error);
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
                                    price: lastDataPoints[quote.symbol].close
                                    timestamp: quote.timestamp - (quoteDate.getSeconds() * 1000)
                                });
                            }

                            // Track the quote data by symbol.
                            symbolQuotes.push(quote.data);
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

        // If there are no quotes for the minute, then create one using the previous data point.
        if (symbolQuotes.length === 0 && lastDataPoints[symbol]) {
            firstQuoteTimestamp = lastDataPoints[symbol].timestamp + (60 * 1000);
            firstQuoteTimestamp = firstQuoteTimestamp - (new Date(firstQuoteDate).getSeconds() * 1000);

            symbolQuotes.push({
                symbol: symbol,
                price: lastDataPoints[symbol].close,
                timestamp: firstQuoteTimestamp
            });
        }

        dataPoint = {
            high: _(symbolQuotes).max('price').price,
            low: _(symbolQuotes).min('price').price,
            open: _(symbolQuotes).first().price,
            close: _(symbolQuotes).last().price,
            timestamp: new Date().getTime()
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
                dataPoints.push(dataPoint);

                // Analyze the data to date.
                analysis = strategy.analyze(dataPoint);

                // If analysis sends back a positive result, then tell the client to initiate a trade.
                if (analysis) {
                    client.sendText(JSON.stringify({
                        type: analysis === 'CALL' ? messageTypes.CALL : messageTypes.PUT,
                        data: {
                            symbol: symbol,
                            investment: investment
                        }
                    }));
                }
            });
        }

        setTimeout(tickTimer, 1000 - drift);
    }

    symbols.forEach(function(symbol) {
        var settings = require('../../settings/' + symbol + '.js');

        // Instantiate a new strategy instance for the symbol.
        strategies[symbol] = new strategyFn(symbol, settings);

        // Initialize quote data for the symbol.
        quotes[symbol] = [];
    });

    // Start the timer.
    tickTimer();
}).listen(port);