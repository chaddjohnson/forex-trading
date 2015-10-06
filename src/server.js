var _ = require('underscore');
var ws = require('nodejs-websocket');
var strategies = require('./strategies');
var port = 8080;
var data = [];

var options = {
    // secure: true,
    // key: fs.readFileSync('../../server.key'),
    // cert: fs.readFileSync('../../server.crt')
}
var server = ws.createServer(options, function(client) {
    var tickDataPoints = [];
    var strategyConfiguration = {
        ema200: true,
        ema100: false,
        ema50: true,
        sma13: false,
        ema13: false,
        rsi: {
            length: 7,
            overbought: 77,
            oversold: 23
        },
        prChannel: {
            length: 100,
            degree: 4,
            deviations: 2.0
        },
        trendPrChannel: null
    };
    var strategy = new strategies.Reversals(strategyConfiguration);

    console.log('New connection');

    client.on('close', function(code, reason) {
        console.log('Connection closed');
    });

    client.on('error', function(error) {
        console.log(error);
    });

    client.on('text', function(message) {
        try {
            var tickDataPoint = JSON.parse(message);
            var timestampSeconds = new Date(tickDataPoint.timestamp).getSeconds();
            var analysisResult;

            tickDataPoints.push(tickDataPoint);

            //if (timestampSeconds === 59) {
            if (timestampSeconds === 0) {
                // Analyze the latest minute ticks.
                analysisResult = strategy.analyze(summarizeData(tickDataPoints));

                // Reset the tick points.
                tickDataPoints = [];

                // If analysis sends back a positive result, then initiate a trade.
                if (analysisResult) {
                    client.sendText(JSON.stringify({
                        type: 'buy',
                        symbol: 'EURCHF',
                        direction: analysisResult
                    }));
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}).listen(port);

console.log('Trade service started on port ' + port);

function summarizeData(dataPoints) {
    return {
        high: _(dataPoints).max('price').price,
        low: _(dataPoints).min('price').price,
        open: _(dataPoints).first().price,
        close: _(dataPoints).last().price
    };
}
