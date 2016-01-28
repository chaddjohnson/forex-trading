var Base = require('./Base');

function CTOption() {
    this.constructor = CTOption;

    var self = this;
    var symbols = ['AUDCAD', 'AUDJPY', 'AUDNZD', 'AUDUSD', 'CADJPY', 'EURGBP', 'EURUSD', 'GBPJPY', 'NZDUSD', 'USDCAD', 'USDCHF', 'USDJPY'];

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

    // Get the initial account balance if it's not set or if it is old.
    if (!$.cookie('startingBalance') || !$.cookie('startingBalanceLastUpdatedAt') || new Date().getTime() - parseInt($.cookie('startingBalanceLastUpdatedAt')) > 24 * 60 * 60 * 1000) {
        // Wait for the page and balance display to load.
        window.setTimeout(function() {
            self.updateStartingBalance(self.getBalance());
        }, 15 * 1000);  // 15 seconds
    }

    // Update the starting balance at 6am UTC (10pm Central) each day.
    window.setInterval(function() {
        var date = new Date();
        var brokerageHour = date.getUTCHours() + 2;
        var brokerageDay = date.getUTCDay();
        var brokerageMinute = date.getUTCMinutes();
        var brokerageSecond = date.getUTCSeconds();

        if (brokerageHour === 6 && brokerageMinute === 0) {
            self.updateStartingBalance(self.getBalance());
        }
    }, 60 * 1000);

    // Keep the session active.
    window.setInterval(function() {
        var tempWindow = window.open('https://ctoption.com');

        // Close the temporary window after a bit.
        window.setTimeout(function() {
            tempWindow.close();
        }, 15 * 1000);  // 15 seconds
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
        if (brokerageHour === 23 && brokerageMinute >= 54 && brokerageMinute <= 59) {
            return;
        }

        // Don't check prior to the first five minutes of the trading day.
        if (brokerageHour === 7 && brokerageMinute >= 24 && brokerageMinute <= 29) {
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
    var self = this;

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
    if (!self.payoutIsHighEnough(symbol)) {
        return;
    }

    // Ensure it's okay to trade based on the account balance.
    if (self.tradeMakesBalanceTooHigh(investment)) {
        console.warn('[' + new Date() + '] Maximum open positions reached; aborting trade for ' + symbol);
        return;
    }

    console.log('[' + new Date() + '] CALL for ' + symbol + ' at ' + new Date() + ' for $' + investment);

    // Ensure the controls are displayed.
    self.showSymbolControls(symbol);

    window.setTimeout(function() {
        // Click the "CALL" button.
        $('#assetID_10_' + symbol + ' .call_btn').click();

        window.setTimeout(function() {
            // Set the investment amount.
            self.setTradeInvestment(symbol, investment);

            window.setTimeout(function() {
                // Initiate trade.
                self.initiateTrade(symbol);
            }, 3);
        }, 3);
    }, 3);
};

CTOption.prototype.putTrade = function(symbol, investment) {
    var self = this;

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
    if (!self.payoutIsHighEnough(symbol)) {
        return;
    }

    // Ensure it's okay to trade based on the account balance.
    if (self.tradeMakesBalanceTooHigh(investment)) {
        console.warn('[' + new Date() + '] Maximum open positions reached; aborting trade for ' + symbol);
        return;
    }

    console.log('[' + new Date() + '] PUT for ' + symbol + ' at ' + new Date() + ' for $' + investment + '.');

    // Ensure the controls are displayed.
    self.showSymbolControls(symbol);

    window.setTimeout(function() {
        // Click the "PUT" button.
        $('#assetID_10_' + symbol + ' .put_btn').click();

        window.setTimeout(function() {
            // Set the investment amount.
            self.setTradeInvestment(symbol, investment);

            window.setTimeout(function() {
                // Initiate trade.
                self.initiateTrade(symbol);
            }, 3);
        }, 3);
    }, 3);
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
    var balance = this.getBalance();
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

CTOption.prototype.getBalance = function() {
    return parseFloat($('#balance').text().replace(/[^0-9\.]/g, ''));
};

window.setTimeout(function() {
    // Cache credentials so the bot can automatically log in again if logged out.
    if (!$.cookie('username')) {
        $.cookie('username', prompt('Please enter your username'), { expires: 365 * 10, path: '/' });
    }
    if (!$.cookie('password')) {
        $.cookie('password', prompt('Please enter your password'), { expires: 365 * 10, path: '/' });
    }

    if (!$.cookie('username')) {
        console.error('[' + new Date() + '] No username provided; terminating bot');
        return;
    }
    if (!$.cookie('password')) {
        console.error('[' + new Date() + '] No password provided; terminating bot');
        return;
    }

    // Log in automatically if not logged in.
    if ($('.usernameval').length === 0) {
        $('#txtUsername').val($.cookie('username'));
        $('#txtPassword').val($.cookie('password'));
        $('#btnformLogin').click();
    }
    else {
        // Instantiate a new client, and make it available globally.
        window.bot = new CTOption();
    }
}, 5 * 1000);  // 5 seconds
