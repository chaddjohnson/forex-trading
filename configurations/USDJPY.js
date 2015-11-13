var studies = require('./src/lib/studies');

module.exports = {
    combinations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_3_19",
                "upper": "prChannelUpper200_3_19"
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
                "regression": "trendPrChannel400_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_2_21",
                "upper": "prChannelUpper100_2_21"
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
                "lower": "prChannelLower200_3_19",
                "upper": "prChannelUpper200_3_19"
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
            "trendPrChannel": null,
            "prChannel": {
                "lower": "prChannelLower300_2_215",
                "upper": "prChannelUpper300_2_215"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": null,
            "prChannel": {
                "lower": "prChannelLower300_2_21",
                "upper": "prChannelUpper300_2_21"
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
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_4_20",
                "upper": "prChannelUpper250_4_20"
            },
            "rsi": {
                "oversold": 5,
                "overbought": 95,
                "rsi": "rsi2"
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
                "lower": "prChannelLower250_4_19",
                "upper": "prChannelUpper250_4_19"
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
                "regression": "trendPrChannel400_2"
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
                "lower": "prChannelLower200_3_215",
                "upper": "prChannelUpper200_3_215"
            },
            "rsi": {
                "oversold": 5,
                "overbought": 95,
                "rsi": "rsi2"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel700_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_3_19",
                "upper": "prChannelUpper200_3_19"
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
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel700_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_20",
                "upper": "prChannelUpper200_2_20"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
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
        }
    ]
};,
