var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "ema200" : false, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi7", "overbought" : 80, "oversold" : 20 }, "prChannel" : { "upper" : "prChannelUpper300_3_19", "lower" : "prChannelLower300_3_19" } }, { "ema200" : true, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi7", "overbought" : 80, "oversold" : 20 }, "prChannel" : { "upper" : "prChannelUpper200_2_21", "lower" : "prChannelLower200_2_21" } }, { "ema200" : true, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi2", "overbought" : 95, "oversold" : 5 }, "prChannel" : { "upper" : "prChannelUpper200_2_21", "lower" : "prChannelLower200_2_21" } } ],
    studies: [
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Rsi, inputs: {length: 2}, outputMap: {rsi: 'rsi2'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.1}, outputMap: {regression: 'prChannel200_2_21', upper: 'prChannelUpper200_2_21', lower: 'prChannelLower200_2_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel300_3_19', upper: 'prChannelUpper300_3_19', lower: 'prChannelLower300_3_19'}}
    ]
};
