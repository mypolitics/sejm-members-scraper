# Sejm Members Scraper

> Get information about each member of the Polish parliament and save it to a JSON file for easy access and manipulation.

## Demo

https://sejm-members-scraper.vercel.app

## Requirements
- Node.js with top-level await support
- Internet access

## Usage
```bash
# Install the dependencies
$ npm install

# Run the scraper
$ node index.js
```

Once the script finishes, the saved data will be available in the `data.json` file, inside the `members` array.

## Troubleshooting

**The scraper hangs on `Scraping X`, where X is a number between 1 and 460.**

Restart the script.

## Notice

Please note that running the scraping frequently and/or on multiple instances may be considered harmful for the server and therefore is not recommended. This software is provided as is for education and research purposes, granted the fair-use.

## Authors

- [Antoni Kępiński (myPolitics)](https://github.com/xxczaki)

## License

MIT