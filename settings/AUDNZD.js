var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : { "regression" : "trendPrChannel550_2" }, "prChannel" : { "lower" : "prChannelLower250_3_19", "upper" : "prChannelUpper250_3_19" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi5" }, "sma13" : false, "ema50" : true, "ema100" : true, "ema200" : false }, { "trendPrChannel" : { "regression" : "trendPrChannel400_2" }, "prChannel" : { "lower" : "prChannelLower100_3_195", "upper" : "prChannelUpper100_3_195" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi5" }, "sma13" : false, "ema50" : true, "ema100" : true, "ema200" : true } ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Rsi, inputs: {length: 5}, outputMap: {rsi: 'rsi5'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 1.95}, outputMap: {regression: 'prChannel100_3_195', upper: 'prChannelUpper100_3_195', lower: 'prChannelLower100_3_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel250_3_19', upper: 'prChannelUpper250_3_19', lower: 'prChannelLower250_3_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 400, degree: 2}, outputMap: {regression: 'trendPrChannel400_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 550, degree: 2}, outputMap: {regression: 'trendPrChannel550_2'}}
    ]
};
