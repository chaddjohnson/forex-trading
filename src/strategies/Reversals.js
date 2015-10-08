var Base = require('./Base');
var studies = require('../studies');

function Reversals(configuration) {
    this.constructor = Reversals;
    Base.call(this);

    this.configuration = configuration;

    this.prepareStudies(this.buildStudyDefinitions());
}

Reversals.prototype = Object.create(Base.prototype);

Reversals.prototype.buildStudyDefinitions = function() {
    var studyDefinitions = [];

    if (this.configuration.ema200) {
        studyDefinitions.push({
            study: studies.Ema,
            inputs: {
                length: 200
            },
            outputMap: {
                ema: 'ema200'
            }
        });
    }
    if (this.configuration.ema100) {
        studyDefinitions.push({
            study: studies.Ema,
            inputs: {
                length: 100
            },
            outputMap: {
                ema: 'ema100'
            }
        });
    }
    if (this.configuration.ema50) {
        studyDefinitions.push({
            study: studies.Ema,
            inputs: {
                length: 50
            },
            outputMap: {
                ema: 'ema50'
            }
        });
    }
    if (this.configuration.sma13) {
        studyDefinitions.push({
            study: studies.Sma,
            inputs: {
                length: 13
            },
            outputMap: {
                ema: 'sma13'
            }
        });
    }
    if (this.configuration.rsi) {
        studyDefinitions.push({
            study: studies.Rsi,
            inputs: {
                length: this.configuration.rsi.length
            },
            outputMap: {
                rsi: 'rsi'
            }
        });
    }
    if (this.configuration.prChannel) {
        studyDefinitions.push({
            study: studies.PolynomialRegressionChannel,
            inputs: {
                length: this.configuration.prChannel.length,
                degree: this.configuration.prChannel.degree,
                deviations: this.configuration.prChannel.deviations
            },
            outputMap: {
                regression: 'prChannel',
                upper: 'prChannelUpper',
                lower: 'prChannelLower'
            }
        });
    }
    if (this.configuration.trendPrChannel) {
        studyDefinitions.push({
            study: studies.PolynomialRegressionChannel,
            inputs: {
                length: this.configuration.trendPrChannel.length,
                degree: this.configuration.trendPrChannel.degree
            },
            outputMap: {
                regression: 'trendPrChannel'
            }
        });
    }

    return studyDefinitions;
};

Reversals.prototype.analyze = function(dataPoint) {
    var put = true;
    var call = true;

    var dataPoint = this.runStudies(dataPoint);

    if (this.configuration.ema200 && this.configuration.ema100) {
        if (!dataPoint.ema200 || !dataPoint.ema100) {
            put = false;
            call = false;
        }

        // Determine if a downtrend is not occurring.
        if (put && dataPoint.ema200 < dataPoint.ema100) {
            put = false;
        }

        // Determine if an uptrend is not occurring.
        if (call && dataPoint.ema200 > dataPoint.ema100) {
            call = false;
        }
    }
    if (this.configuration.ema100 && this.configuration.ema50) {
        if (!dataPoint.ema100 || !dataPoint.ema50) {
            put = false;
            call = false;
        }

        // Determine if a downtrend is not occurring.
        if (put && dataPoint.ema100 < dataPoint.ema50) {
            put = false;
        }

        // Determine if an uptrend is not occurring.
        if (call && dataPoint.ema100 > dataPoint.ema50) {
            call = false;
        }
    }
    if (this.configuration.ema50 && this.configuration.sma13) {
        if (!dataPoint.ema50 || !dataPoint.sma13) {
            put = false;
            call = false;
        }

        // Determine if a downtrend is not occurring.
        if (put && dataPoint.ema50 < dataPoint.sma13) {
            put = false;
        }

        // Determine if an uptrend is not occurring.
        if (call && dataPoint.ema50 > dataPoint.sma13) {
            call = false;
        }
    }
    if (this.configuration.rsi) {
        if (typeof dataPoint.rsi === 'number') {
            // Determine if RSI is not above the overbought line.
            if (put && dataPoint.rsi <= this.configuration.rsi.overbought) {
                put = false;
            }

            // Determine if RSI is not below the oversold line.
            if (call && dataPoint.rsi >= this.configuration.rsi.oversold) {
                call = false;
            }
        }
        else {
            put = false;
            call = false;
        }
    }
    if (this.configuration.prChannel) {
        if (dataPoint.prChannelUpper && dataPoint.prChannelLower) {
            // Determine if the upper regression bound was not breached by the high price.
            if (put && (!dataPoint.prChannelUpper || dataPoint.high <= dataPoint.prChannelUpper)) {
                put = false;
            }

            // Determine if the lower regression bound was not breached by the low price.
            if (call && (!dataPoint.prChannelLower || dataPoint.low >= dataPoint.prChannelLower)) {
                call = false;
            }
        }
        else {
            put = false;
            call = false;
        }
    }
    if (this.configuration.trendPrChannel) {
        if (this.previousDataPoint && dataPoint.trendPrChannel && this.previousDataPoint.trendPrChannel) {
            // Determine if a long-term downtrend is not occurring.
            if (put && dataPoint.trendPrChannel > this.previousDataPoint.trendPrChannel) {
                put = false;
            }

            // Determine if a long-term uptrend is not occurring.
            if (call && dataPoint.trendPrChannel < this.previousDataPoint.trendPrChannel) {
                call = false;
            }
        }
        else {
            put = false;
            call = false;
        }
    }

    // Determine if there is a significant gap (> 60 seconds) between the current timestamp and the previous timestamp.
    if ((put || call) && (!this.previousDataPoint || (dataPoint.timestamp - this.previousDataPoint.timestamp) !== 60 * 1000)) {
        put = false;
        call = false;
    }

    this.previousDataPoint = dataPoint;

    if (put) {
        return 'PUT';
    }
    else if (call) {
        return 'CALL';
    }

    return null;
};

module.exports = Reversals;
