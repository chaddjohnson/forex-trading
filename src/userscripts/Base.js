function Base(symbols) {
    var self = this;

    self.symbols = symbols;
    self.minimumInvestment = 5;
    self.maximumInvestment = 10000;
    self.investmentBalancePercentage = 0.01;
    self.tradableSeconds = [59];  // [14, 29, 56, 57, 58, 59, 0];

    self.initializeTradingSocket();

    // Begin piggybacking on data feed.
    self.piggybackDataFeed();

    // Keep piggybacking active.
    window.setInterval(function() {
        if (!io.sockets['https://client.ctoption.com:443'].transport.websocket.piggybacked) {
            self.piggybackDataFeed();
        }
    }, 5000);
}

Base.prototype.getTradingMessageTypes = function() {
    return {
        QUOTE: 1,
        CALL: 2,
        PUT: 3,
        CONNECTED: 4,
        DISCONNECTED: 5,
        DISALLOWED: 6
    };
};

Base.prototype.getSymbols = function() {
    return this.symbols;
};

Base.prototype.getTradingSocket = function() {
    return this.tradingSocket;
};

Base.prototype.initializeTradingSocket = function() {
    var self = this;
    var tradingMessageTypes = self.getTradingMessageTypes();

    self.attemptReconnection = true;
    self.tradingSocket = new WebSocket('ws://localhost:8080');

    console.log('[' + new Date() + '] Trading socket connected');

    // Watch for messages from the trading socket.
    self.tradingSocket.onmessage = function(event) {
        try {
            var message = JSON.parse(event.data);
            var second = new Date().getSeconds();
            var investment = 0;
            var balance = self.getBalance();

            switch (message.type) {
                case tradingMessageTypes.CALL:
                    // Prevent trading on emergency stop.
                    if ($.cookie('stopTrading')) {
                        return;
                    }
                    // Only trade whitelisted symbols.
                    if (self.symbols.indexOf(message.data.symbol) === -1) {
                        return;
                    }
                    // Only trade whitelisted seconds.
                    if (self.tradableSeconds.indexOf(second) === -1) {
                        return;
                    }

                    investment = self.getInvestment() * message.data.count;

                    // Ensure there is sufficient balance to trade.
                    if (balance < investment) {
                        console.error('[' + new Date() + '] Insufficient balance');
                        return;
                    }

                    self.callTrade(message.data.symbol, investment);

                    break;

                case tradingMessageTypes.PUT:
                    // Prevent trading on emergency stop.
                    if ($.cookie('stopTrading')) {
                        return;
                    }
                    // Only trade whitelisted symbols.
                    if (self.symbols.indexOf(message.data.symbol) === -1) {
                        return;
                    }
                    // Only trade whitelisted seconds.
                    if (self.tradableSeconds.indexOf(second) === -1) {
                        return;
                    }

                    investment = self.getInvestment() * message.data.count;

                    // Ensure there is sufficient balance to trade.
                    if (balance < investment) {
                        console.error('[' + new Date() + '] Insufficient balance');
                        return;
                    }

                    self.putTrade(message.data.symbol, investment);

                    break;

                case tradingMessageTypes.DISALLOWED:
                    self.attemptReconnection = false;
                    console.error('[' + new Date() + '] Second client disallowed');

                    break;
            }
        }
        catch (error) {
            console.error('[' + new Date() + '] TRADING SOCKET ERROR: ' + (error.message || error));
        }
    };

    self.tradingSocket.onclose = function(event) {
        if (!self.attemptReconnection) {
            return;
        }

        console.log('[' + new Date() + '] Trading socket disconnected; reconnecting...');

        // Reopen the trading socket if it closes.
        window.setTimeout(function() {
            self.initializeTradingSocket();
        }, 5 * 1000);  // 5 seconds
    };
};

Base.prototype.piggybackDataFeed = function() {
    throw 'piggybackDataFeed() not implemented';
};

Base.prototype.showSymbolControls = function() {
    throw 'showSymbolControls() not implemented';
};

Base.prototype.callTrade = function(symbol, investment) {
    throw 'callTrade() not implemented';
};

Base.prototype.putTrade = function(symbol, investment) {
    throw 'putTrade() not implemented';
};

Base.prototype.payoutIsHighEnough = function(symbol) {
    throw 'payoutIsHighEnough() not implemented';
};

Base.prototype.tradeMakesBalanceTooHigh = function(investment) {
    throw 'tradeMakesBalanceTooHigh() not implemented';
};

Base.prototype.setTradeInvestment = function(symbol, investment) {
    throw 'setTradeInvestment() not implemented';
};

Base.prototype.initiateTrade = function(symbol) {
    throw 'initiateTrade() not implemented';
};

Base.prototype.getBalance = function() {
    throw 'getBalance() not implemented';
};

Base.prototype.updateStartingBalance = function(newBalance) {
    // Get the current balance.
    var balance = parseFloat($.cookie('startingBalance'));

    if (newBalance || newBalance === 0) {
        // Update balance.
        balance = newBalance;
    }

    if (isNaN(balance)) {
        console.log('[' + new Date() + '] Invalid account balance')
        return;
    }

    $.cookie('startingBalance', balance, { expires: 365 * 10, path: '/' });
    $.cookie('startingBalanceLastUpdatedAt', new Date().getTime(), { expires: 365 * 10, path: '/' });

    console.log('[' + new Date() + '] Updated starting balance');
};

Base.prototype.getInvestment = function() {
    var startingBalance = parseInt($.cookie('startingBalance'));

    if (!startingBalance) {
        // Default to small trades if no account balance is available.
        return 5;
    }

    investment = Math.round(startingBalance * this.investmentBalancePercentage);

    // Enforce minimum trade size.
    if (investment < this.minimumInvestment) {
        investment = this.minimumInvestment;
    }

    // Enforce maximum trade size.
    if (investment > this.maximumInvestment) {
        investment = this.maximumInvestment;
    }

    // Disallow trading more than 4% of the account balance.
    if (investment > startingBalance * 0.04) {
        investment = startingBalance * 0.04;
    }

    return investment;
};

Base.prototype.setTradableSeconds = function(tradableSeconds) {
    this.tradableSeconds = tradableSeconds;
};

Base.prototype.setInvestmentBalancePercentage = function(investmentBalancePercentage) {
    this.investmentBalancePercentage = investmentBalancePercentage;
};

module.exports = Base;
