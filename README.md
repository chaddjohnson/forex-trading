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
2. Install `forever`: `npm install -g forever`.
3. Clone this repository using Git.
4. Open a terminal and go to the directory where you cloned this repository.
5. Install dependencies via `npm install`.
6. Install the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) Chrome extension.
7. Install the userscript for CTOption in Tampermonkey. This simply involves copying and pasting the entire
contents of `src/userscripts/build/ctoption.js` into a new Tampermonkey script. Now enable the script (a green
icon in the Tampermonkey dashboard means its enabled). Nothing else is required; when visiting ctoption.com,
the userscript will automatically run.
8. In the "Pop-ups" section of the Chrome Content settings page, add an allowed exception for "https://[*.]ctoption.com:443".
9. In the "On startup" section of the Chrome Settings page, select "Open the New Tab page."
10. Ensure your computer's time is exactly correct to the second. Make it sync with a time server.

### Usage

1. Open a terminal and go to the directory where you cloned this repository.
2. Run `npm start`.
3. Enter your credentials when prompted.
4. In the address bar, on the right side, you will likely see a gray shield icon. Click this, and a menu
will appear. In this menu, click the "Load unsafe scripts" button. This should cause the web page to reload.

Five seconds after the web page reloads, you should see "New connection" display in the terminal window.
If you see this, the bot is running successfully!
