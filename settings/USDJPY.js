var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "ema200" : true, "ema100" : true, "ema50" : false, "sma13" : true, "rsi" : { "rsi" : "rsi7", "overbought" : 77, "oversold" : 23 }, "stochastic" : { "K" : "stochastic5K", "D" : "stochastic5D", "overbought" : 77, "oversold" : 23 }, "prChannel" : { "upper" : "prChannelUpper350_2_19", "lower" : "prChannelLower350_2_19" } } ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.StochasticOscillator, inputs: {length: 5, averageLength: 3}, outputMap: {K: 'stochastic5K', D: 'stochastic5D'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 350, degree: 2, deviations: 1.9}, outputMap: {regression: 'prChannel350_2_19', upper: 'prChannelUpper350_2_19', lower: 'prChannelLower350_2_19'}},
    ]
};
