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
    var tickDataPoints = [];
    var strategies = {};
    var quotes = {};

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

            switch (message.type) {
                case messageTypes.QUOTE:
                    message.data.forEach(function(quote) {
                        if (symbols.indexOf(quote.symbol) > -1) {
                            // Track data by symbol.
                            quotes[quote.symbol].push(quote);
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

        var dataPoint = {
           high: _(symbolQuotes).max('price').price,
           low: _(symbolQuotes).min('price').price,
           open: _(symbolQuotes).first().price,
           close: _(symbolQuotes).last().price,
           timestamp: _(symbolQuotes).last().timestamp
        };

        // Clear out old data.
        //quotes[symbol] = [];

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
