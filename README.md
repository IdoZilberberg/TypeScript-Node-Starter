# ProofPoint DLP Exercise - API service

# General

This service is the entry point for clients.

# Running
- Clone the repo: `git clone https://github.com/IdoZilberberg/pp-dlp-api.git`
- Install TypeScript (tsc) globally by running `npm install -g typescript`
- Run `cd pp-dlp-api`
- Run `npm install`
- Run Typescript compiler: `tsc`. This generates the `dist` folder with vanilla .js files.
- Run the Node.js server: `node dist/app.js`. <p>Make sure you don't run app.ts by mistake!

The service will start listening on port 3111 by default, and call the Scanner service on port 3222.

## Responsibility
Read files, split their contents into strings of some length, then send the strings to Scanner service.
It can read text files, non-text files (such as .xlsx), or directly receive strings for processing.


## Flow
If input is string, it is passed as-is to the Scanner service.
If input is a file, it is first chunked into pieces with overlapping parts, then passed to the Scanner service.

# Scanner Strategy

The file `services/scanner-strategy.ts` decides where to process the string chunk - on another Node service or hosted Elastic service.
Processing on Elasticsearch service is not implemented.

# Dev notes
- I decided to write it in Node.js + Typescript. Node.js is for rapid development as this is the server side technology I've been using lately.
Typescript is to show some Object Oriented approach especially on the Scanner service side - users can implement the Detector interface to detect new types of data.

# Incomplete stuff
- Ignore the index field in the response.
- Bonus tasks not completed.  