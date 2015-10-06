var fs = require('fs');
var es = require('event-stream');
var ws = require('nodejs-websocket');
var port = 8081;
var dataFilePath = '../../data/metatrader/three-year/EURCHF.csv';
var data = [];

var stream = fs.createReadStream(dataFilePath)
    .pipe(es.split())
    .pipe(es.mapSync(function(line) {
        // Pause the readstream.
        stream.pause();

        (function() {
            // Ignore blank lines.
            if (!line) {
                stream.resume();
                return;
            }

            var transactionData = line.split(',');
            data.push({
                symbol: 'EURCHF',
                timestamp: new Date(transactionData[0] + ' ' + transactionData[1] + ':00').getTime(),
                volume: parseInt(transactionData[6]),
                open: parseFloat(transactionData[2]),
                high: parseFloat(transactionData[3]),
                low: parseFloat(transactionData[4]),
                close: parseFloat(transactionData[5])
            });

            // Resume the read stream.
            stream.resume();
        })();
    }));

stream.on('close', function() {
    startServer();
});

function startServer() {
    var options = {
        // secure: true,
        // key: fs.readFileSync('../../server.key'),
        // cert: fs.readFileSync('../../server.crt')
    }
    var server = ws.createServer(options, function(client) {
        var dataIndex = 0;
        var dataCount = data.length;

        console.log('New connection');

        client.on('close', function(code, reason) {
            console.log('Connection closed');
        });

        client.on('error', function(error) {
            console.log(error);
        });

        function sendNext(item) {
            if (client.readyState !== 1) {
                return;
            }

            client.sendText(JSON.stringify(item));

            if (dataIndex < dataCount - 1) {
                setTimeout(function() {
                    sendNext(data[++dataIndex]);
                }, 10);
            }
        };

        sendNext(data[dataIndex]);
    }).listen(port);

    console.log('Data service started on port ' + port);
}
