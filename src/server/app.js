var _ = require('underscore');
var ws = require('nodejs-websocket');
var strategies = require('../lib/strategies');

var port = 8080;
var data = [];

var messageTypes = {
    QUOTE: 1,
    CALL: 2,
    PUT: 3
};

var investment = 5;

var serverOptions = {
    // secure: true,
    // key: fs.readFileSync('../../server.key'),
    // cert: fs.readFileSync('../../server.crt')
};
var serverOptions = ws.createServer(options, function(client) {
    var tickDataPoints = [];
    var strategies = {};

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
                        var configuration;
                        var analysis = '';

                        // Determine if a strategy instance exists to handle the symbol.
                        if (!strategies[quote.symbol]) {
                            configuration = require('../../configurations/' + quote.symbol + '.js');

                            // Instantiate a new strategy.
                            strategies[quote.symbol] = new strategies.Reversals(quote.symbol, configuration);
                        }

                        if (second === 59) {
                            // Analyze the latest minute ticks.
                            analysis = strategy.analyze(calculateMinuteData(...));

                            // If analysis sends back a positive result, then initiate a trade.
                            if (analysis) {
                                client.sendText(JSON.stringify({
                                    type: analysis === 'CALL' ? messageTypes.CALL : messageTypes.PUT,
                                    data: {
                                        symbol: quote.symbol,
                                        investment: investment
                                    }
                                }));
                            }
                        }
                    });

                    break;
            }
        }
        catch (error) {
            console.error(error);
        }
    });

    function tickTimer() {
        var date = new Date();
        var drift = date.getMilliseconds();

        // ...

        setTimeout(tickTimer, 1000 - drift);
    }

    tickTimer();
}).listen(port);

function calculateMinuteData(quotes) {
    return {
       high: _(quotes).max('price').price,
       low: _(quotes).min('price').price,
       open: _(quotes).first().price,
       close: _(quotes).last().price,
       timestamp: _(quotes).last().timestamp
    };

    The backtesting data is only minute data, so just use that for testing purposes.
    return dataPoint;
}
