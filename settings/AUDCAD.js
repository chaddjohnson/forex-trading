var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : null, "prChannel" : { "lower" : "prChannelLower300_3_195", "upper" : "prChannelUpper300_3_195" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi7" }, "sma13" : true, "ema50" : false, "ema100" : true, "ema200" : true }, { "trendPrChannel" : null, "prChannel" : { "lower" : "prChannelLower100_3_19", "upper" : "prChannelUpper100_3_19" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi7" }, "sma13" : true, "ema50" : true, "ema100" : false, "ema200" : false }, { "trendPrChannel" : null, "prChannel" : { "lower" : "prChannelLower300_3_21", "upper" : "prChannelUpper300_3_21" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi7" }, "sma13" : false, "ema50" : true, "ema100" : true, "ema200" : false }, { "trendPrChannel" : null, "prChannel" : { "lower" : "prChannelLower100_4_19", "upper" : "prChannelUpper100_4_19" }, "rsi" : { "oversold" : 23, "overbought" : 77, "rsi" : "rsi7" }, "sma13" : false, "ema50" : false, "ema100" : true, "ema200" : true }, { "trendPrChannel" : null, "prChannel" : { "lower" : "prChannelLower100_3_195", "upper" : "prChannelUpper100_3_195" }, "rsi" : { "oversold" : 23, "overbought" : 77, "rsi" : "rsi7" }, "sma13" : true, "ema50" : true, "ema100" : true, "ema200" : true } ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel100_3_19', upper: 'prChannelUpper100_3_19', lower: 'prChannelLower100_3_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 4, deviations: 1.9}, outputMap: {regression: 'prChannel100_4_19', upper: 'prChannelUpper100_4_19', lower: 'prChannelLower100_4_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 1.95}, outputMap: {regression: 'prChannel100_3_195', upper: 'prChannelUpper100_3_195', lower: 'prChannelLower100_3_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 1.95}, outputMap: {regression: 'prChannel300_3_195', upper: 'prChannelUpper300_3_195', lower: 'prChannelLower300_3_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 2.1}, outputMap: {regression: 'prChannel300_3_21', upper: 'prChannelUpper300_3_21', lower: 'prChannelLower300_3_21'}}
    ]
};
