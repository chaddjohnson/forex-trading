var studies = require('./src/lib/studies');

module.exports = {
    combinations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel550_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_19",
                "upper": "prChannelUpper250_2_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel450_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_195",
                "upper": "prChannelUpper250_2_195"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_19",
                "upper": "prChannelUpper250_2_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel450_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_19",
                "upper": "prChannelUpper250_2_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_19",
                "upper": "prChannelUpper250_2_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel550_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_19",
                "upper": "prChannelUpper300_2_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel450_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_3_19",
                "upper": "prChannelUpper300_3_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel550_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_195",
                "upper": "prChannelUpper300_2_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_195",
                "upper": "prChannelUpper300_2_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel450_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_19",
                "upper": "prChannelUpper300_2_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel400_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_195",
                "upper": "prChannelUpper250_2_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel450_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_215",
                "upper": "prChannelUpper300_2_215"
            },
            "rsi": {
                "oversold": 5,
                "overbought": 95,
                "rsi": "rsi2"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel400_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_3_19",
                "upper": "prChannelUpper300_3_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        }
    ],

    studies: [
        {
            study: studies.Ema,
            inputs: {
                length: 200
            },
            outputMap: {
                ema: 'ema200'
            }
        },{
            study: studies.Ema,
            inputs: {
                length: 100
            },
            outputMap: {
                ema: 'ema100'
            }
        },{
            study: studies.Ema,
            inputs: {
                length: 50
            },
            outputMap: {
                ema: 'ema50'
            }
        },{
            study: studies.Sma,
            inputs: {
                length: 13
            },
            outputMap: {
                sma: 'sma13'
            }
        },{
            study: studies.Rsi,
            inputs: {
                length: 2
            },
            outputMap: {
                rsi: 'rsi2'
            }
        },{
            study: studies.Rsi,
            inputs: {
                length: 5
            },
            outputMap: {
                rsi: 'rsi5'
            }
        },{
            study: studies.Rsi,
            inputs: {
                length: 7
            },
            outputMap: {
                rsi: 'rsi7'
            }
        },
        {study: studies.PolynomialRegressionChannel, inputs: {length: 400, degree: 2}, outputMap: {regression: 'trendPrChannel400_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 450, degree: 2}, outputMap: {regression: 'trendPrChannel450_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 500, degree: 2}, outputMap: {regression: 'trendPrChannel500_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 550, degree: 2}, outputMap: {regression: 'trendPrChannel550_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel250_2_195', upper: 'prChannelUpper250_2_195', lower: 'prChannelLower250_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 2, deviations: 1.9}, outputMap: {regression: 'prChannel250_2_19', upper: 'prChannelUpper250_2_19', lower: 'prChannelLower250_2_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel300_2_195', upper: 'prChannelUpper300_2_195', lower: 'prChannelLower300_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 1.9}, outputMap: {regression: 'prChannel300_2_19', upper: 'prChannelUpper300_2_19', lower: 'prChannelLower300_2_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 2.15}, outputMap: {regression: 'prChannel300_2_215', upper: 'prChannelUpper300_2_215', lower: 'prChannelLower300_2_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel300_3_19', upper: 'prChannelUpper300_3_19', lower: 'prChannelLower300_3_19'}}
    ]
};
