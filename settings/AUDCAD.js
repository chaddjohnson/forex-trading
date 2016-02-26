var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "ema200" : false, "ema100" : false, "ema50" : false, "sma13" : false, "rsi" : { "rsi" : "rsi7", "overbought" : 80, "oversold" : 20 }, "prChannel" : { "upper" : "prChannelUpper450_5_205", "lower" : "prChannelLower450_5_205" } } ],
    studies: [
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 450, degree: 5, deviations: 2.05}, outputMap: {regression: 'prChannel450_5_205', upper: 'prChannelUpper450_5_205', lower: 'prChannelLower450_5_205'}}
    ]
};
