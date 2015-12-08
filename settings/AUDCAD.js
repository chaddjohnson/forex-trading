var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : { "regression" : "trendPrChannel500_2" }, "prChannel" : { "lower" : "prChannelLower200_2_20", "upper" : "prChannelUpper200_2_20" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi7" }, "sma13" : false, "ema50" : false, "ema100" : false, "ema200" : false }, { "trendPrChannel" : { "regression" : "trendPrChannel700_2" }, "prChannel" : { "lower" : "prChannelLower200_2_195", "upper" : "prChannelUpper200_2_195" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi5" }, "sma13" : true, "ema50" : true, "ema100" : true, "ema200" : false }, { "trendPrChannel" : { "regression" : "trendPrChannel600_2" }, "prChannel" : { "lower" : "prChannelLower250_2_215", "upper" : "prChannelUpper250_2_215" }, "rsi" : { "oversold" : 23, "overbought" : 77, "rsi" : "rsi7" }, "sma13" : false, "ema50" : false, "ema100" : false, "ema200" : false } ],
    studies: [
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.Rsi, inputs: {length: 5}, outputMap: {rsi: 'rsi5'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel200_2_195', upper: 'prChannelUpper200_2_195', lower: 'prChannelLower200_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.0}, outputMap: {regression: 'prChannel200_2_20', upper: 'prChannelUpper200_2_20', lower: 'prChannelLower200_2_20'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 2, deviations: 2.15}, outputMap: {regression: 'prChannel250_2_215', upper: 'prChannelUpper250_2_215', lower: 'prChannelLower250_2_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 500, degree: 2}, outputMap: {regression: 'trendPrChannel500_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 600, degree: 2}, outputMap: {regression: 'trendPrChannel600_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 700, degree: 2}, outputMap: {regression: 'trendPrChannel700_2'}}
    ]
};
