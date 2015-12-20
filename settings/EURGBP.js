var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "trendPrChannel" : { "regression" : "trendPrChannel400_2" }, "prChannel" : { "lower2" : "prChannelLower100_3_215-2", "upper2" : "prChannelUpper100_3_215-2", "lower" : "prChannelLower100_3_215", "upper" : "prChannelUpper100_3_215" }, "rsi" : { "oversold" : 5, "overbought" : 95, "rsi" : "rsi2" }, "sma13" : false, "ema50" : false, "ema100" : true, "ema200" : false }, { "trendPrChannel" : { "regression" : "trendPrChannel750_2" }, "prChannel" : { "lower2" : "prChannelLower300_2_195-2", "upper2" : "prChannelUpper300_2_195-2", "lower" : "prChannelLower300_2_195", "upper" : "prChannelUpper300_2_195" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi5" }, "sma13" : true, "ema50" : true, "ema100" : false, "ema200" : true }, { "trendPrChannel" : { "regression" : "trendPrChannel700_2" }, "prChannel" : { "lower2" : "prChannelLower300_2_195-2", "upper2" : "prChannelUpper300_2_195-2", "lower" : "prChannelLower300_2_195", "upper" : "prChannelUpper300_2_195" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi5" }, "sma13" : true, "ema50" : true, "ema100" : false, "ema200" : true }, { "trendPrChannel" : { "regression" : "trendPrChannel650_2" }, "prChannel" : { "lower2" : "prChannelLower300_2_195-2", "upper2" : "prChannelUpper300_2_195-2", "lower" : "prChannelLower300_2_195", "upper" : "prChannelUpper300_2_195" }, "rsi" : { "oversold" : 20, "overbought" : 80, "rsi" : "rsi5" }, "sma13" : true, "ema50" : true, "ema100" : false, "ema200" : true } ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.Rsi, inputs: {length: 5}, outputMap: {rsi: 'rsi5'}},
        {study: studies.Rsi, inputs: {length: 2}, outputMap: {rsi: 'rsi2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 2.15}, outputMap: {regression: 'prChannel100_3_215', upper: 'prChannelUpper100_3_215', lower: 'prChannelLower100_3_215', upper2: 'prChannelUpper100_3_215-2', lower2: 'prChannelLower100_3_215-2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel300_2_195', upper: 'prChannelUpper300_2_195', lower: 'prChannelLower300_2_195', upper2: 'prChannelUpper300_2_195-2', lower2: 'prChannelLower300_2_195-2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 400, degree: 2}, outputMap: {regression: 'trendPrChannel400_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 650, degree: 2}, outputMap: {regression: 'trendPrChannel650_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 700, degree: 2}, outputMap: {regression: 'trendPrChannel700_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 750, degree: 2}, outputMap: {regression: 'trendPrChannel750_2'}}
    ]
};
