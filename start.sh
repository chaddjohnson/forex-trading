#!/bin/bash

# Start Chrome.
if hash google-chrome 2>/dev/null; then
    google-chrome --allow-running-insecure-content https://ctoption.com &> /dev/null &
else
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-running-insecure-content https://ctoption.com &> /dev/null &
fi

# Start the trading service.
forever -f ./src/server/app.js
