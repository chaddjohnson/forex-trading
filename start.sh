#!/bin/bash

# Start Chrome.
if hash google-chrome 2>/dev/null; then
    google-chrome https://ctoption.com &> /dev/null &
else
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome https://ctoption.com &> /dev/null &
fi

# Start the trading service.
node ./src/server/app
