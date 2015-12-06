var Base = require('./Base');

function CTOption() {
    this.constructor = CTOption;

    var self = this;
    var symbols = ['EURGBP', 'NZDUSD', 'USDJPY', 'AUDNZD', 'USDCHF', 'USDCAD', 'EURUSD', 'AUDCAD', 'AUDUSD', 'CADJPY', 'AUDJPY', 'EURJPY', 'GBPJPY'];

    Base.call(self, symbols);

    // Select the 5-minute "Hyper" tab.
    $('#bnmain .tabs .tab')[3].click();
    $('#bnmain .hyperfilter li')[3].click()

    // Show controls for all symbols.
    symbols.forEach(function(symbol) {
        self.showSymbolControls(symbol);
    });

    self.initializeTimers();
}

// Create a copy of the base "class" prototype for use in this "class."
CTOption.prototype = Object.create(Base.prototype);

CTOption.prototype.initializeTimers = function() {
    var self = this;

    window.setInterval(function() {
        // Get the current balance.
        var balance = parseFloat(localStorage.balance);

        // Get the latest balance, if available.
        var newBalance = parseFloat($('#balance').text().replace(/[^0-9\.]/g, ''));

        if (newBalance || newBalance === 0) {
            // Update balance.
            balance = newBalance;
        }

        if (isNaN(balance)) {
            console.log('[' + new Date() + '] Invalid account balance')
            return;
        }

        localStorage.balance = balance;

        self.getTradingSocket().send(JSON.stringify({
            type: self.getTradingMessageTypes().BALANCE,
            data: balance
        }));
    }, 15 * 1000);  // 15 seconds

    // Keep the session active.
    window.setInterval(function() {
        var tempWindow = window.open('https://ctoption.com');

        // Close the temporary window after a bit and reload the current page.
        window.setTimeout(function() {
            tempWindow.close();
        }, 30 * 1000);  // 30 seconds
    }, 30 * 60 * 1000);  // 30 minutes

    // Verify at a short interval that the assets are shown.
    window.setInterval(function() {
        var date = new Date();
        var brokerageHour = date.getUTCHours() + 2;
        var brokerageDay = date.getUTCDay();
        var brokerageMinute = date.getUTCMinutes();

        // Don't check during non-tradable hours.
        if (brokerageHour >= 0 && brokerageHour < 7) {
            return;
        }

        // Don't check the last five minutes of the trading day.
        if (brokerageHour === 23 && brokerageMinute >= 54) {
            return;
        }

        // Don't check the last couple hours on Fridays.
        if (brokerageDay === 5 && brokerageHour >= 22) {
            return;
        }

        // Don't check the last five minutes of the trading day on Fridays.
        if (brokerageDay === 5 && brokerageHour === 21 && brokerageMinute >= 54) {
            return;
        }

        // Don't check on weekends.
        if (brokerageDay === 6 || brokerageDay === 0) {
            return;
        }

        if ($('.assets-container .asset_box').length === 0) {
            // No assets are shown, so refresh the page.
            window.location.reload(true);
        }
    }, 30 * 1000);  // 30 seconds

    // Refresh the page every so often to prevent white screen issue.
    window.setInterval(function() {
        window.location.reload(true);
    }, 5.25 * 60 * 60 * 1000);  // 5.25 hours
};

CTOption.prototype.piggybackDataFeed = function() {
    console.log('[' + new Date() + '] Piggybacking on data socket');

    var self = this;
    var tradingMessageTypes = self.getTradingMessageTypes();
    var dataSocket;

    try {
        // Get a reference to the socket object.
        dataSocket = io.sockets['https://client.ctoption.com:443'].transport.websocket;
    }
    catch (error) {
        // Error getting reference to the data socket, so try again in a moment.
        window.setTimeout(function() {
            self.piggybackDataFeed();
        }, 1000);

        return;
    }

    // Get references to the original callbacks for the socket.
    var originalOnOpen = dataSocket.onopen;
    var originalOnMessage = dataSocket.onmessage;
    var originalOnClose = dataSocket.onclose;
    var originalOnError = dataSocket.onerror;

    dataSocket.onopen = function() {
        console.log('[' + new Date() + '] Data socket opened');

        // Let the trading service know the data socket has reconnected.
        self.getTradingSocket().send(JSON.stringify({
            type: tradingMessageTypes.CONNECTED
        }));

        originalOnOpen();
    };

    dataSocket.onmessage = function(event) {
        if (self.getTradingSocket() && self.getTradingSocket().readyState !== 1) {
            // Only forward data to the trading socket if it is open.
            return;
        }

        try {
            var data = JSON.parse(event.data.replace('5:::', ''));
            var dataPoint;
            var quotes = [];
            var tradingMessage = {
                type: tradingMessageTypes.QUOTE,
                data: []
            };

            if (data.name === 'subscribe') {
                // Filter for only the quotes we want to trade.
                quotes = data.args[0].filter(function(quote) {
                    return self.getSymbols().indexOf(quote.Symbol) > -1;
                });

                if (quotes.length > 0) {
                    // Translate the quote data into a format the trading service expects.
                    tradingMessage.data = quotes.map(function(quote) {
                        return {
                            symbol: quote.Symbol,
                            price: parseFloat(quote.Price),
                            timestamp: parseInt(quote.TickTime + '000')
                        };
                    });

                    // Send the reformatted data to the trading service for analysis.
                    self.getTradingSocket().send(JSON.stringify(tradingMessage));
                }
            }
        }
        catch (error) {
            //console.error('[' + new Date() + '] DATA ERROR: ' + (error.message || error), event.data);
        }

        // Call the original callback.
        originalOnMessage(event);
    };

    dataSocket.onclose = function() {
        console.error('[' + new Date() + '] Data socket closed');

        // Let the trading service know the data socket has disconnected.
        self.getTradingSocket().send(JSON.stringify({
            type: tradingMessageTypes.DISCONNECTED
        }));

        originalOnClose();
    };

    dataSocket.onerror = function(error) {
        console.error('[' + new Date() + '] ERROR: ' + (error.message || error));
        originalOnError();
    };

    dataSocket.piggybacked = true;

    if (dataSocket.readyState === 1 && self.getTradingSocket().readyState === 1) {
        // Let the trading service know the data socket has reconnected.
        self.getTradingSocket().send(JSON.stringify({
            type: tradingMessageTypes.CONNECTED
        }));
    }
};

CTOption.prototype.showSymbolControls = function(symbol) {
    if ($('#assetID_10_' + symbol + ' .option_container').length > 0) {
        // Controls are already shown.
        return;
    }

    // Show the controls.
    $('#assetID_10_' + symbol + ' .box_header').click();
};

CTOption.prototype.callTrade = function(symbol, investment) {
    // Ensure necessary parameters are present.
    if (!symbol) {
        console.error('[' + new Date() + '] No symbol provided');
    }
    if (!investment) {
        console.error('[' + new Date() + '] No investment provided');
    }

    // Ensure UI for symbol is present.
    if ($('#assetID_10_' + symbol).length === 0) {
        return;
    }

    // Verify payout is high enough to trade.
    if (!this.payoutIsHighEnough(symbol)) {
        return;
    }

    // Ensure it's okay to trade based on the account balance.
    if (this.tradeMakesBalanceTooHigh(investment)) {
        console.warn('[' + new Date() + '] Maximum open positions reached; aborting trade for ' + symbol);
        return;
    }

    console.log('[' + new Date() + '] CALL for ' + symbol + ' at ' + new Date() + ' for $' + investment);

    // Ensure the controls are displayed.
    this.showSymbolControls(symbol);

    // Click the "CALL" button.
    $('#assetID_10_' + symbol + ' .call_btn').click();

    // Set the investment amount.
    this.setTradeInvestment(symbol, investment);

    // Initiate trade.
    this.initiateTrade(symbol);
};

CTOption.prototype.putTrade = function(symbol, investment) {
    // Ensure necessary parameters are present.
    if (!symbol) {
        console.error('[' + new Date() + '] No symbol provided');
    }
    if (!investment) {
        console.error('[' + new Date() + '] No investment provided');
    }

    // Ensure UI for symbol is present.
    if ($('#assetID_10_' + symbol).length === 0) {
        return;
    }

    // Verify payout is high enough to trade.
    if (!this.payoutIsHighEnough(symbol)) {
        return;
    }

    // Ensure it's okay to trade based on the account balance.
    if (this.tradeMakesBalanceTooHigh(investment)) {
        console.warn('[' + new Date() + '] Maximum open positions reached; aborting trade for ' + symbol);
        return;
    }

    console.log('[' + new Date() + '] PUT for ' + symbol + ' at ' + new Date() + ' for $' + investment + '.');

    // Ensure the controls are displayed.
    this.showSymbolControls(symbol);

    // Click the "CALL" button.
    $('#assetID_10_' + symbol + ' .put_btn').click();

    // Set the investment amount.
    this.setTradeInvestment(symbol, investment);

    // Initiate trade.
    this.initiateTrade(symbol);
};

CTOption.prototype.payoutIsHighEnough = function(symbol) {
    var element = $('#assetID_10_' + symbol + ' .box_header li').get(2);

    if (element) {
        return parseInt(element.innerText) >= 70;
    }

    console.error('[' + new Date() + '] Unable to get payout for element');
    return false;
};

CTOption.prototype.tradeMakesBalanceTooHigh = function(investment) {
    var balance = parseFloat($('#balance').text().replace(/[\$,]/g, ''));
    var positionCount = parseInt($('#open_positions').text());

    return (positionCount + 1) * investment >= balance * 0.45;
};

CTOption.prototype.setTradeInvestment = function(symbol, investment) {
    $('#assetID_10_' + symbol + ' .mount').val(investment);
    $('#assetID_10_' + symbol + ' .mount').trigger('keyup');
};

CTOption.prototype.initiateTrade = function(symbol) {
    $('#assetID_10_' + symbol + ' .apply_button').click();
};

window.setTimeout(function() {
    var client;

    // Cache credentials so the bot can automatically log in again if logged out.
    localStorage.username = localStorage.username || prompt('Please enter your username');
    localStorage.password = localStorage.password || prompt('Please enter your password');

    // Ask for the starting balance.
    localStorage.balance = localStorage.balance || prompt('Please enter your exact current account balance').replace(/[^0-9\.]/g, '');

    if (!localStorage.username) {
        console.error('[' + new Date() + '] No username provided; terminating bot');
        return;
    }
    if (!localStorage.password) {
        console.error('[' + new Date() + '] No password provided; terminating bot');
        return;
    }
    if (!localStorage.balance) {
        console.error('[' + new Date() + '] No balance provided; terminating bot');
        return;
    }

    // Log in automatically if not logged in.
    if ($('.usernameval').length === 0) {
        $('#txtUsername').val(localStorage.username);
        $('#txtPassword').val(localStorage.password);
        $('#btnformLogin').click();
    }
    else {
        client = new CTOption();
    }
}, 5 * 1000);  // 5 seconds
