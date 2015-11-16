var Base = require('./Base');

function CTOption() {
    this.constructor = CTOption;

    var self = this;
    var symbols = ['EURGBP', 'AUDNZD', 'NZDUSD', 'AUDCAD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'EURUSD', 'CADJPY', 'AUDJPY'];

    Base.call(self, symbols);

    // Remove flag since reauthentication is done.
    delete localStorage.reauthenticating;

    // Select the 5-minute "Hyper" tab.
    $('#bnmain .tabs .tab')[3].click();
    $('#bnmain .hyperfilter li')[3].click()

    // Show controls for all symbols.
    symbols.forEach(function(symbol) {
        self.showSymbolControls(symbol);
    });
}

// Create a copy of the base "class" prototype for use in this "class."
CTOption.prototype = Object.create(Base.prototype);

CTOption.prototype.piggybackDataFeed = function() {
    var self = this;

    console.log(new Date() + ' Piggybacking on data socket');

    // Get a reference to the socket object.
    var dataSocket = io.sockets['https://client.ctoption.com:443'].transport.websocket;

    // Get references to the original callbacks for the socket.
    var originalOnOpen = dataSocket.onopen;
    var originalOnMessage = dataSocket.onmessage;
    var originalOnClose = dataSocket.onclose;
    var originalOnError = dataSocket.onerror;

    dataSocket.onopen = function() {
        console.log('Data socket opened');
        originalOnOpen();
    };

    dataSocket.onmessage = function(event) {
        try {
            var data = JSON.parse(event.data.replace('5:::', ''));
            var dataPoint;
            var quotes = [];
            var tradingMessageTypes = self.getTradingMessageTypes();
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
            //console.error('DATA ERROR: ' + (error.message || error), event.data);
        }

        // Call the original callback.
        originalOnMessage(event);
    };

    dataSocket.onclose = function() {
        console.error(new Date() + ' Data socket closed');
        originalOnClose();
    };

    dataSocket.onerror = function(error) {
        console.error('ERROR: ' + (error.message || error));
        originalOnError();
    };

    dataSocket.piggybacked = true;
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
        console.error('No symbol provided');
    }
    if (!investment) {
        console.error('No investment provided');
    }
    if (localStorage.reauthenticating) {
        console.log('Reauthentication in progress; trade aborted');
        return;
    }

    // Verify payout is high enough to trade.
    if (!this.payoutIsHighEnough(symbol)) {
        return;
    }

    // Ensure UI for symbol is present.
    if ($('#assetID_10_' + symbol).length === 0) {
        return;
    }

    console.log('Attempting CALL for ' + symbol + ' at ' + new Date() + ' for $' + investment + '.');

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
        console.error('No symbol provided');
    }
    if (!investment) {
        console.error('No investment provided');
    }
    if (localStorage.reauthenticating) {
        console.log('Reauthentication in progress; trade aborted');
        return;
    }

    // Verify payout is high enough to trade.
    if (!this.payoutIsHighEnough(symbol)) {
        return;
    }

    // Ensure UI for symbol is present.
    if ($('#assetID_10_' + symbol).length === 0) {
        return;
    }

    console.log('Attempting PUT for ' + symbol + ' at ' + new Date() + ' for $' + investment + '.');

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
    return parseInt($('#assetID_10_' + symbol + ' .box_header li').get(2).innerText) >= 70;
};

CTOption.prototype.setTradeInvestment = function(symbol, investment) {
    $('#assetID_10_' + symbol + ' .mount').val(investment);
    $('#assetID_10_' + symbol + ' .mount').trigger('keyup');
};

CTOption.prototype.initiateTrade = function(symbol) {
    $('#assetID_10_' + symbol + ' .apply_button').click();

    console.log('Trade placed.');

    // Automatically log in again if necessary.
    window.setTimeout(function() {
        // Check whether the Login dialog is shown.
        if ($('#iPopUp').length > 0) {
            console.log('Logged out. Logging in again...');

            // Fill in the form.
            $('#iPopUp').contents().find('#popuptxtUsername').val(localStorage.username);
            $('#iPopUp').contents().find('#popuptxtPassword').val(localStorage.password);

            // Click the Login button.
            $('#iPopUp').contents().find('#popupbtnformLogin').click();
        }
    }, 2 * 1000);
};

window.setTimeout(function() {
    var client;

    // Cache credentials so the bot can automatically log in again if logged out.
    localStorage.username = localStorage.username || prompt('Please enter your username');
    localStorage.password = localStorage.password || prompt('Please enter your password');

    // Log in automatically if not logged in.
    if ($('.usernameval').length === 0) {
        $('#txtUsername').val(localStorage.username);
        $('#txtPassword').val(localStorage.password);
        $('#btnformLogin').click();
    }
    else if (localStorage.signOutOnLoad) {
        // Remove the flag.
        delete localStorage.signOutOnLoad;

        // Initiate logout.
        $('.btnLogout').click();
    }
    else {
        client = new CTOption();
    }
}, 5 * 1000);

// Re-authenticate every two hours.
window.setTimeout(function() {
    var tempWindow;

    // Set a flag instructing the new window to automatically sign out on load.
    localStorage.signOutOnLoad = 'true';

    // Set a flag designating that reauthentication is taking place.
    localStorage.reauthenticating = 'true';

    tempWindow = window.open('https://ctoption.com');

    // Close the temporary window after a bit and reload the current page.
    window.setTimeout(function() {
        tempWindow.close();
        window.location.reload();
    }, 30 * 1000)
}, 2 * 60 * 60 * 1000);
