var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : { "regression" : "trendPrChannel300_2" }, "prChannel" : { "lower" : "prChannelLower100_2_20", "upper" : "prChannelUpper100_2_20" }, "rsi" : { "oversold" : 5, "overbought" : 95, "rsi" : "rsi2" }, "sma13" : false, "ema50" : false, "ema100" : true, "ema200" : true }, { "trendPrChannel" : { "regression" : "trendPrChannel400_2" }, "prChannel" : { "lower" : "prChannelLower100_3_215", "upper" : "prChannelUpper100_3_215" }, "rsi" : { "oversold" : 5, "overbought" : 95, "rsi" : "rsi2" }, "sma13" : true, "ema50" : true, "ema100" : true, "ema200" : false } ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 2}, outputMap: {rsi: 'rsi2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 2, deviations: 2.0}, outputMap: {regression: 'prChannel100_2_20', upper: 'prChannelUpper100_2_20', lower: 'prChannelLower100_2_20'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 2.15}, outputMap: {regression: 'prChannel100_3_215', upper: 'prChannelUpper100_3_215', lower: 'prChannelLower100_3_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2}, outputMap: {regression: 'trendPrChannel300_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 400, degree: 2}, outputMap: {regression: 'trendPrChannel400_2'}}
    ]
};
