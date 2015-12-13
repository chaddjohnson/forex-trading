var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : { "regression" : "trendPrChannel850_2" }, "prChannel" : { "lower" : "prChannelLower200_2_19", "upper" : "prChannelUpper200_2_19" }, "rsi" : { "oversold" : 23, "overbought" : 77, "rsi" : "rsi7" }, "sma13" : false, "ema50" : false, "ema100" : true, "ema200" : true }, { "trendPrChannel" : { "regression" : "trendPrChannel850_2" }, "prChannel" : { "lower" : "prChannelLower200_2_21", "upper" : "prChannelUpper200_2_21" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi7" }, "sma13" : true, "ema50" : false, "ema100" : true, "ema200" : false } ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 1.9}, outputMap: {regression: 'prChannel200_2_19', upper: 'prChannelUpper200_2_19', lower: 'prChannelLower200_2_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.1}, outputMap: {regression: 'prChannel200_2_21', upper: 'prChannelUpper200_2_21', lower: 'prChannelLower200_2_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 850, degree: 2}, outputMap: {regression: 'trendPrChannel850_2'}}
    ]
};
