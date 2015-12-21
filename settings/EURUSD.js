var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : { "regression" : "trendPrChannel400_2" }, "prChannel" : { "lower" : "prChannelLower200_2_215", "upper" : "prChannelUpper200_2_215" }, "rsi" : { "oversold" : 23, "overbought" : 77, "rsi" : "rsi7" }, "sma13" : false, "ema50" : true, "ema100" : false, "ema200" : true } ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.15}, outputMap: {regression: 'prChannel200_2_215', upper: 'prChannelUpper200_2_215', lower: 'prChannelLower200_2_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 400, degree: 2}, outputMap: {regression: 'trendPrChannel400_2'}}
    ]
};
