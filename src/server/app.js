var fs = require('fs');
var _ = require('lodash');
var ws = require('nodejs-websocket');
var childProcess = require('child_process');
var strategies = require('../lib/strategies');

var port = 8080;
var messageTypes = {
    QUOTE: 1,
    CALL: 2,
    PUT: 3,
    CONNECTED: 4,
    DISCONNECTED: 5,
    DISALLOWED: 6
};

// Settings
var symbols = ['AUDCAD', 'AUDJPY', 'AUDNZD', 'AUDUSD', 'CADJPY', 'EURGBP', 'EURJPY', 'EURUSD', 'GBPJPY', 'NZDUSD', 'USDCAD', 'USDCHF', 'USDJPY'];
var seconds = [58, 59];  // [56, 57, 58, 59, 0];
var strategyFn = strategies.Reversals;

var disconnectedAtTimestamp = 0;
var clientConnected = false;
var timer = null;
var botProcess = null;
var botRestartTimeout = 0;

// Data
var symbolStrategies = {};
var quotes = {};

var serverOptions = {
    // secure: true,
    // key: fs.readFileSync('./key.pem'),
    // cert: fs.readFileSync('./cert.pem')
};
var serverOptions = ws.createServer(serverOptions, function(client) {
    if (clientConnected) {
        client.sendText(JSON.stringify({
            type: messageTypes.DISALLOWED
        }));
        client.close();

        // If there is already a client connected, do nothing.
        return;
    }

    // Prevent bot restart now that reconnection has occurred.
    clearTimeout(botRestartTimeout);

    clientConnected = true;
    console.log('[' + new Date() + '] New connection');

    // Reset tick data if the last tick was more than 30 seconds ago.
    if (disconnectedAtTimestamp && new Date().getTime() - disconnectedAtTimestamp > 30 * 1000) {
        resetData();
    }

    client.on('close', function(code, reason) {
        disconnectedAtTimestamp = new Date().getTime();

        // Stop the timer on disconnection.
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        clientConnected = false;

        console.log('[' + new Date() + '] Connection closed');

        // Restart the bot if reconnection doesn't occur in a timely manner.
        botRestartTimeout = setTimeout(function() {
            restartBot();
        }, 30 * 1000);  // 30 seconds
    });

    client.on('error', function(error) {
        console.error('[' + new Date() + ']', error);
    });

    client.on('text', function(data) {
        try {
            var message = JSON.parse(data);

            switch (message.type) {
                case messageTypes.QUOTE:
                    message.data.forEach(function(quote) {
                        var symbolQuotes = quotes[quote.symbol];

                        // Only record the data if the data pertains to a symbol being monitored.
                        if (symbols.indexOf(quote.symbol) > -1) {
                            // Track the quote data by symbol.
                            seconds.forEach(function(second) {
                                symbolQuotes[second].push(quote);
                            });

                            // Log data to a file.
                            fs.appendFileSync('./data.csv', JSON.stringify(quote) + '\n');
                        }
                    });

                    break;

                case messageTypes.CONNECTED:
                    console.log('[' + new Date() + '] Data socket connected');

                    if (!timer) {
                        // Restart the timer.
                        tickTimer();
                    }

                    break;

                case messageTypes.DISCONNECTED:
                    console.log('[' + new Date() + '] Data socket disconnected');

                    // Stop the timer on disconnection.
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }

                    break;
            }
        }
        catch (error) {
            console.error('[' + new Date() + ']', error);
        }
    });

    function calculateMinuteData(symbol, second) {
        var symbolQuotes = quotes[symbol][second];
        var dataPoint = null;

        // Nothing can be done if there still are no quotes.
        if (symbolQuotes.length === 0) {
            return;
        }

        dataPoint = {
            symbol: symbol,
            second: second,
            high: _.max(symbolQuotes, 'price').price,
            low: _.min(symbolQuotes, 'price').price,
            open: _.first(symbolQuotes).price,
            close: _.last(symbolQuotes).price,
            timestamp: new Date().getTime()
        };

        quotes[symbol][second] = [];

        return dataPoint;
    }

    function tickTimer() {
        var date = new Date();
        var utcDay = date.getUTCDay();
        var utcHour = date.getUTCHours();
        var drift = date.getMilliseconds();
        var currentSecond = date.getSeconds();
        var analysis = '';
        var dataPoint;

        // Reset data each Sunday morning.
        if (utcDay === 0 && utcHour === 6 && date.getMinutes() === 0 && date.getSeconds() === 0) {
            resetData();
        }

        seconds.forEach(function(second) {
            // Enter trades only on specific seconds.
            if (currentSecond === second) {
                // Perform analysis for each symbol.
                symbols.forEach(function(symbol) {
                    dataPoint = calculateMinuteData(symbol, second);

                    if (!dataPoint) {
                        // No data point available, so no analysis can take place.
                        return;
                    }

                    // Log data to a file.
                    fs.appendFileSync('./data.csv', JSON.stringify(dataPoint) + '\n');

                    // Analyze the data to date.
                    analysis = symbolStrategies[symbol][second].analyze(dataPoint);

                    // If analysis sends back a positive result, then tell the client to initiate a trade.
                    if (analysis) {
                        console.log('[' + new Date() + '] ' + analysis + ' for ' + symbol);

                        client.sendText(JSON.stringify({
                            type: analysis === 'CALL' ? messageTypes.CALL : messageTypes.PUT,
                            data: {symbol: symbol}
                        }));
                    }
                });
            }
        });

        timer = setTimeout(tickTimer, 1000 - drift);
    }

    if (!timer) {
        // Start the timer.
        tickTimer();
    }
}).listen(port);

console.log('[' + new Date() + '] Server started');

// Prepare data containers.
symbols.forEach(function(symbol) {
    var settings = require('../../settings/' + symbol + '.js');

    symbolStrategies[symbol] = {};
    quotes[symbol] = {};

    // Instantiate a new strategy instance and quote data for the symbol for each second.
    seconds.forEach(function(second) {
        symbolStrategies[symbol][second] = new strategyFn(symbol, settings);
        quotes[symbol][second] = [];
    });
});

function resetData() {
    symbols.forEach(function(symbol) {
        seconds.forEach(function(second) {
            quotes[symbol][second] = [];

            // Reset data for strategies.
            symbolStrategies[symbol][second].reset();
        });
    });
    console.log('[' + new Date() + '] Tick data reset');
}

function restartBot() {
    // Try Mac OS path first.
    var chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

    if (botProcess) {
        // Restart the trading bot in case the web page crashed.
        console.log('[' + new Date() + '] Restarting bot');
        botProcess.kill();
    }

    try {
        fs.statSync(chromePath);
    }
    catch (error) {
        // Not on Mac OS, so try Linux path.
        chromePath = 'google-chrome';
    }

    botProcess = childProcess.spawn(chromePath, ['--allow-running-insecure-content', 'https://ctoption.com']);
    console.log('[' + new Date() + '] Bot started');
}

restartBot();
