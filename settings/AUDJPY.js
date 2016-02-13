var studies = require('../src/lib/studies');

module.exports = {
    configurations: [ { "ema200" : false, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi7", "overbought" : 80, "oversold" : 20 }, "stochastic" : null, "prChannel" : { "upper" : "prChannelUpper200_2_195", "lower" : "prChannelLower200_2_195" } }, { "ema200" : false, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi7", "overbought" : 80, "oversold" : 20 }, "stochastic" : null, "prChannel" : { "upper" : "prChannelUpper200_2_205", "lower" : "prChannelLower200_2_205" } }, { "ema200" : false, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi9", "overbought" : 77, "oversold" : 23 }, "stochastic" : null, "prChannel" : { "upper" : "prChannelUpper200_2_205", "lower" : "prChannelLower200_2_205" } }, { "ema200" : false, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi9", "overbought" : 77, "oversold" : 23 }, "stochastic" : null, "prChannel" : { "upper" : "prChannelUpper200_2_185", "lower" : "prChannelLower200_2_185" } }, { "ema200" : false, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi9", "overbought" : 77, "oversold" : 23 }, "stochastic" : null, "prChannel" : { "upper" : "prChannelUpper200_2_185", "lower" : "prChannelLower200_2_185" } }, { "ema200" : true, "ema100" : true, "ema50" : true, "sma13" : false, "rsi" : { "rsi" : "rsi7", "overbought" : 80, "oversold" : 20 }, "stochastic" : null, "prChannel" : { "upper" : "prChannelUpper200_2_205", "lower" : "prChannelLower200_2_205" } } ],
    studies: [
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.Rsi, inputs: {length: 9}, outputMap: {rsi: 'rsi9'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 1.85}, outputMap: {regression: 'prChannel200_2_185', upper: 'prChannelUpper200_2_185', lower: 'prChannelLower200_2_185'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel200_2_195', upper: 'prChannelUpper200_2_195', lower: 'prChannelLower200_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.05}, outputMap: {regression: 'prChannel200_2_205', upper: 'prChannelUpper200_2_205', lower: 'prChannelLower200_2_205'}},
    ]
};
