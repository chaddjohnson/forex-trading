var fs = require('fs');
var es = require('event-stream');
var stream;

var settings = require('./settings/EURGBP.js');
var strategyFn = require('./src/lib/strategies/Reversals');

var strategy = new strategyFn('EURGBP', settings);

stream = fs.createReadStream('./EURGBP.csv')
    .pipe(es.split())
    .pipe(es.mapSync(function(line) {
        // Pause the read stream.
        stream.pause();

        (function() {
            // Ignore blank lines.
            if (!line) {
                stream.resume();
                return;
            }

            transactionData = line.split(',');

            var dataPoint = {
                timestamp: new Date(transactionData[0]).getTime(),
                open: parseFloat(transactionData[1]),
                high: parseFloat(transactionData[2]),
                low: parseFloat(transactionData[3]),
                close: parseFloat(transactionData[4])
            };

            strategy.analyze(dataPoint);

            // Resume the read stream.
            stream.resume();
        })();
    }));
