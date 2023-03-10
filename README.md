# G1 Resume News - Chrome Extension

Welcome to G1 Resume News, a Chrome extension that allows you to easily capture and share the latest news from [G1](https://g1.com.br/), one of Brazil's largest news websites.

With G1 Resume News, you can quickly access a list of the most recent news articles, complete with titles and links. Simply click on an article to be taken directly to the source.

In addition to browsing the latest news, G1 Resume News also offers two convenient buttons for each article:

- **Copy**: Allows you to easily copy the list of articles for sharing or saving for later.
- **Share**: Opens a whatsapp with options for sharing the list of articles.

## How it works

This extension is built using HTML, CSS, and JavaScript, and is designed to be easy to use and lightweight.

`manifest.json` file is a crucial part of any Chrome extension. It contains important information about your extension, such as its name, version, and permissions. In the Content-scripts section we have a config for the content.js file.

`content.js` will be inject in the context of our destination page, allowing us to interact with the page and modify its content, in this case, scrapping the DOM and collecting the news.

`popup.js` is responsible for sending the request message to the active tab which at this moment already contains the script injected by `content.js` and collected part of the DOM of our interest, stored in the news[] array, and sends it as answer. Analisys a response this script will add the news list in our html page called `popup.html`, which is the page that appears in front end of our extension.


## Installation

To install G1 Resume News, follow these steps:

1. Download this repo and load the Path in Chrome Extension Manager.
2. Click on the G1 Resume News icon in your browser's toolbar.

## Usage

Using G1 Resume News is easy:

1. Click on the G1 Resume News icon in your browser's toolbar.
2. Browse the list of recent news articles.
3. Click on an article to be taken directly to the source.
4. Use the **Copy** and **Share** buttons to easily share or save a list of articles.


