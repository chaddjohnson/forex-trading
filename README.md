Forex Trading
=============
This provides bots for trading against Binary Options trading web sites.

### Components

This project consists of two components.

1. A [Tampermonkey](https://tampermonkey.net/) userscript that runs
2. A web socket service which receives data from the userscript.

Trading web sites always use web sockets to deliver real time data to web sites. This data
is then displayed on web pages in, for instance, charts, which help users make decisions
as to whether to trade. The userscript (1) piggybacks on this web socket and covertly
accesses this data. As data comes in through the web socket to the web page, the userscript,
now hooked into the web socket, forwards the data to our own web socket service (2) which
then analyzes the data against a strategy and various studies and makes decisions as to whether
to instruct the userscript to place trades (CALLs and PUTs).

### Available bots

Currently only one bot exists, and that is for [CTOption](https://ctoption.com/).

### Setup

1. Install Node.js.
2. Clone this repository using Git.
3. Open a terminal and go to the directory where you cloned this repository.
4. Install dependencies via `npm install`.
5. Install the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) Chrome extension.
6. Install the userscript for CTOption in Tampermonkey. This simply involves copying and pasting the entire
contents of `src/userscripts/build/ctoption.js` into a new Tampermonkey script. Now enable the script (a green
icon in the Tampermonkey dashboard means its enabled). Nothing else is required; when visiting ctoption.com,
the userscript will automatically run.

### Usage

1. Open a terminal and go to the directory where you cloned this repository.
2. Run the web socket service: `node src/server/app`.
3. Open Google Chrome and visit https://ctoption.com/.
4. Sign into your CTOption trading account.
5. ~~In the address bar, on the right side, you will likely see a gray shield icon. Click this, and a menu
will appear. In this menu, click the "Load unsafe scripts" button. This should cause the web page to reload.~~
6. Go to https://localhost:8080.
    1. Follow the stops [here](https://www.accuweaver.com/2014/09/19/make-chrome-accept-a-self-signed-certificate-on-osx/) to trust the self-signed certificate system-wide.
    2. Click the link to proceed.

Five seconds after the web page reloads, you should see "New connection" display in the terminal window.
If you see this, the bot is running successfully!

To change the investment dollar amount per trade, edit `src/server/app.js` and change the `investment` variable
to a different value (e.g. 100 for $100 per trade).
