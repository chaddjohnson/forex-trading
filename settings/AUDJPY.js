var studies = require('../src/lib/studies');

module.exports = {
    configurations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel550_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_195",
                "upper": "prChannelUpper200_2_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": true,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_2_20",
                "upper": "prChannelUpper100_2_20"
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
                "regression": "trendPrChannel650_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_21",
                "upper": "prChannelUpper300_2_21"
            },
            "rsi": {
                "oversold": 5,
                "overbought": 95,
                "rsi": "rsi2"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_2_19",
                "upper": "prChannelUpper100_2_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_4_19",
                "upper": "prChannelUpper250_4_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_195",
                "upper": "prChannelUpper200_2_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_2_19",
                "upper": "prChannelUpper100_2_19"
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
                "regression": "trendPrChannel750_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_3_195",
                "upper": "prChannelUpper200_3_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
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
                "lower": "prChannelLower300_3_19",
                "upper": "prChannelUpper300_3_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel850_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_21",
                "upper": "prChannelUpper300_2_21"
            },
            "rsi": {
                "oversold": 5,
                "overbought": 95,
                "rsi": "rsi2"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_2_215",
                "upper": "prChannelUpper100_2_215"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_3_21",
                "upper": "prChannelUpper300_3_21"
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
                "lower": "prChannelLower200_2_195",
                "upper": "prChannelUpper200_2_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_21",
                "upper": "prChannelUpper200_2_21"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
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
                "lower": "prChannelLower300_2_195",
                "upper": "prChannelUpper300_2_195"
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
                "regression": "trendPrChannel450_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_3_21",
                "upper": "prChannelUpper100_3_21"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel550_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_195",
                "upper": "prChannelUpper200_2_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": true,
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
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2}, outputMap: {regression: 'trendPrChannel300_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 450, degree: 2}, outputMap: {regression: 'trendPrChannel450_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 500, degree: 2}, outputMap: {regression: 'trendPrChannel500_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 550, degree: 2}, outputMap: {regression: 'trendPrChannel550_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 650, degree: 2}, outputMap: {regression: 'trendPrChannel650_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 750, degree: 2}, outputMap: {regression: 'trendPrChannel750_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 850, degree: 2}, outputMap: {regression: 'trendPrChannel850_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 2, deviations: 1.9}, outputMap: {regression: 'prChannel100_2_19', upper: 'prChannelUpper100_2_19', lower: 'prChannelLower100_2_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 2, deviations: 2.0}, outputMap: {regression: 'prChannel100_2_20', upper: 'prChannelUpper100_2_20', lower: 'prChannelLower100_2_20'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 2, deviations: 2.15}, outputMap: {regression: 'prChannel100_2_215', upper: 'prChannelUpper100_2_215', lower: 'prChannelLower100_2_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 2.1}, outputMap: {regression: 'prChannel100_3_21', upper: 'prChannelUpper100_3_21', lower: 'prChannelLower100_3_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel200_2_195', upper: 'prChannelUpper200_2_195', lower: 'prChannelLower200_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.1}, outputMap: {regression: 'prChannel200_2_21', upper: 'prChannelUpper200_2_21', lower: 'prChannelLower200_2_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 3, deviations: 1.95}, outputMap: {regression: 'prChannel200_3_195', upper: 'prChannelUpper200_3_195', lower: 'prChannelLower200_3_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 4, deviations: 1.9}, outputMap: {regression: 'prChannel250_4_19', upper: 'prChannelUpper250_4_19', lower: 'prChannelLower250_4_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel300_2_195', upper: 'prChannelUpper300_2_195', lower: 'prChannelLower300_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 2.1}, outputMap: {regression: 'prChannel300_2_21', upper: 'prChannelUpper300_2_21', lower: 'prChannelLower300_2_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel300_3_19', upper: 'prChannelUpper300_3_19', lower: 'prChannelLower300_3_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 2.1}, outputMap: {regression: 'prChannel300_3_21', upper: 'prChannelUpper300_3_21', lower: 'prChannelLower300_3_21'}}
    ]
};
