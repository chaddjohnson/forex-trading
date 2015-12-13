var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : { "regression" : "trendPrChannel850_2" }, "prChannel" : { "lower" : "prChannelLower200_2_215", "upper" : "prChannelUpper200_2_215" }, "rsi" : { "oversold" : 5, "overbought" : 95, "rsi" : "rsi2" }, "sma13" : false, "ema50" : false, "ema100" : true, "ema200" : false }, { "trendPrChannel" : { "regression" : "trendPrChannel800_2" }, "prChannel" : { "lower" : "prChannelLower200_2_215", "upper" : "prChannelUpper200_2_215" }, "rsi" : { "oversold" : 5, "overbought" : 95, "rsi" : "rsi2" }, "sma13" : false, "ema50" : false, "ema100" : true, "ema200" : true } ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Rsi, inputs: {length: 2}, outputMap: {rsi: 'rsi2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.15}, outputMap: {regression: 'prChannel200_2_215', upper: 'prChannelUpper200_2_215', lower: 'prChannelLower200_2_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 800, degree: 2}, outputMap: {regression: 'trendPrChannel800_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 850, degree: 2}, outputMap: {regression: 'trendPrChannel850_2'}}
    ]
};
