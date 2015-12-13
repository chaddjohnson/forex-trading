var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : null, "prChannel" : { "lower" : "prChannelLower300_3_20", "upper" : "prChannelUpper300_3_20" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi7" }, "sma13" : true, "ema50" : true, "ema100" : true, "ema200" : false }, { "trendPrChannel" : { "regression" : "trendPrChannel550_2" }, "prChannel" : { "lower" : "prChannelLower250_3_19", "upper" : "prChannelUpper250_3_19" }, "rsi" : { "oversold" : 5, "overbought" : 95, "rsi" : "rsi2" }, "sma13" : true, "ema50" : true, "ema100" : true, "ema200" : false }, { "trendPrChannel" : { "regression" : "trendPrChannel550_2" }, "prChannel" : { "lower" : "prChannelLower200_4_195", "upper" : "prChannelUpper200_4_195" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi5" }, "sma13" : false, "ema50" : false, "ema100" : false, "ema200" : false } ],
    studies: [
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.Rsi, inputs: {length: 5}, outputMap: {rsi: 'rsi5'}},
        {study: studies.Rsi, inputs: {length: 2}, outputMap: {rsi: 'rsi2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 4, deviations: 1.95}, outputMap: {regression: 'prChannel200_4_195', upper: 'prChannelUpper200_4_195', lower: 'prChannelLower200_4_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel250_3_19', upper: 'prChannelUpper250_3_19', lower: 'prChannelLower250_3_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 2.0}, outputMap: {regression: 'prChannel300_3_20', upper: 'prChannelUpper300_3_20', lower: 'prChannelLower300_3_20'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 550, degree: 2}, outputMap: {regression: 'trendPrChannel550_2'}}
    ]
};
