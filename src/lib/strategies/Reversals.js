var Base = require('./Base');

function Reversals(symbol, settings) {
    this.constructor = Reversals;

    Base.call(this, symbol, settings);
}

// Create a copy of the base "class" prototype for use in this "class."
Reversals.prototype = Object.create(Base.prototype);

Reversals.prototype.analyze = function(dataPoint) {
    var self = this;
    var put = false;
    var call = false;
    var putThisConfiguration = false;
    var callThisConfiguration = false;

    // Process studies.
    self.tick(dataPoint);

    // For every configuration...
    self.getSettings().configurations.forEach(function(configuration) {
        putThisConfiguration = true;
        callThisConfiguration = true;

        if (configuration.ema200 && configuration.ema100) {
            if (!dataPoint.ema200 || !dataPoint.ema100) {
                putThisConfiguration = false;
                callThisConfiguration = false;
            }

            // Determine if a downtrend is not occurring.
            if (putThisConfiguration && dataPoint.ema200 < dataPoint.ema100) {
                putThisConfiguration = false;
            }

            // Determine if an uptrend is not occurring.
            if (callThisConfiguration && dataPoint.ema200 > dataPoint.ema100) {
                callThisConfiguration = false;
            }
        }
        if (configuration.ema100 && configuration.ema50) {
            if (!dataPoint.ema100 || !dataPoint.ema50) {
                putThisConfiguration = false;
                callThisConfiguration = false;
            }

            // Determine if a downtrend is not occurring.
            if (putThisConfiguration && dataPoint.ema100 < dataPoint.ema50) {
                putThisConfiguration = false;
            }

            // Determine if an uptrend is not occurring.
            if (callThisConfiguration && dataPoint.ema100 > dataPoint.ema50) {
                callThisConfiguration = false;
            }
        }
        if (configuration.ema50 && configuration.sma13) {
            if (!dataPoint.ema50 || !dataPoint.sma13) {
                putThisConfiguration = false;
                callThisConfiguration = false;
            }

            // Determine if a downtrend is not occurring.
            if (putThisConfiguration && dataPoint.ema50 < dataPoint.sma13) {
                putThisConfiguration = false;
            }

            // Determine if an uptrend is not occurring.
            if (callThisConfiguration && dataPoint.ema50 > dataPoint.sma13) {
                callThisConfiguration = false;
            }
        }
        if (configuration.rsi) {
            if (typeof dataPoint[configuration.rsi.rsi] === 'number') {
                // Determine if RSI is not above the overbought line.
                if (putThisConfiguration && dataPoint[configuration.rsi.rsi] <= configuration.rsi.overbought) {
                    putThisConfiguration = false;
                }

                // Determine if RSI is not below the oversold line.
                if (callThisConfiguration && dataPoint[configuration.rsi.rsi] >= configuration.rsi.oversold) {
                    callThisConfiguration = false;
                }
            }
            else {
                putThisConfiguration = false;
                callThisConfiguration = false;
            }
        }
        if (configuration.stochastic) {
            if (typeof dataPoint[configuration.stochastic.K] === 'number' && typeof dataPoint[configuration.stochastic.D] === 'number') {
                // Determine if stochastic is not above the overbought line.
                if (putThisConfiguration && (dataPoint[configuration.stochastic.K] <= configuration.stochastic.overbought || dataPoint[configuration.stochastic.D] <= configuration.stochastic.overbought)) {
                    putThisConfiguration = false;
                }

                // Determine if stochastic is not below the oversold line.
                if (callThisConfiguration && (dataPoint[configuration.stochastic.K] >= configuration.stochastic.oversold || dataPoint[configuration.stochastic.D] >= configuration.stochastic.oversold)) {
                    callThisConfiguration = false;
                }
            }
            else {
                putThisConfiguration = false;
                callThisConfiguration = false;
            }
        }
        if (configuration.prChannel) {
            if (dataPoint[configuration.prChannel.upper] && dataPoint[configuration.prChannel.lower]) {
                // Determine if the upper regression bound was not breached by the high price.
                if (putThisConfiguration && (!dataPoint[configuration.prChannel.upper] || dataPoint.high <= dataPoint[configuration.prChannel.upper])) {
                    putThisConfiguration = false;
                }

                // Determine if the lower regression bound was not breached by the low price.
                if (callThisConfiguration && (!dataPoint[configuration.prChannel.lower] || dataPoint.low >= dataPoint[configuration.prChannel.lower])) {
                    callThisConfiguration = false;
                }
            }
            else {
                putThisConfiguration = false;
                callThisConfiguration = false;
            }
        }
        if (configuration.trendPrChannel) {
            if (self.previousDataPoint && dataPoint[configuration.trendPrChannel.regression] && self.previousDataPoint[configuration.trendPrChannel.regression]) {
                // Determine if a long-term downtrend is not occurring.
                if (putThisConfiguration && dataPoint[configuration.trendPrChannel.regression] > self.previousDataPoint[configuration.trendPrChannel.regression]) {
                    putThisConfiguration = false;
                }

                // Determine if a long-term uptrend is not occurring.
                if (callThisConfiguration && dataPoint[configuration.trendPrChannel.regression] < self.previousDataPoint[configuration.trendPrChannel.regression]) {
                    callThisConfiguration = false;
                }
            }
            else {
                putThisConfiguration = false;
                callThisConfiguration = false;
            }
        }

        // Don't trade minute ticks with large wicks.
        if (putThisConfiguration && (dataPoint.high - Math.max(dataPoint.close, dataPoint.open)) / dataPoint.close >= 0.00018) {
            putThisConfiguration = false;
        }

        if (callThisConfiguration && (Math.min(dataPoint.close, dataPoint.open) - dataPoint.low) / dataPoint.close >= 0.00018) {
            callThisConfiguration = false;
        }

        // Determine whether to trade next tick.
        put = put || putThisConfiguration;
        call = call || callThisConfiguration;
    });

    // Track the current data point as the previous data point for the next tick.
    self.previousDataPoint = dataPoint;

    if (put) {
        return 'PUT';
    }

    if (call) {
        return 'CALL';
    }

    return null;
};

module.exports = Reversals;
