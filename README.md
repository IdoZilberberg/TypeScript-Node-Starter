# ProofPoint DLP Exercise - API service

# General

This service is the entry point for clients.

# Running
- Clone the repo
- Install TypeScript (tsc) globally by running `npm install -g typescript`
- Run `cd pp-dlp-api`
- Run `npm install`
- Run Typescript compiler: `tsc`. This generates the `dist` folder with vanilla .js files.
- Run the Node.js server: `node dist/app.js`. <p>Make sure you don't run app.ts by mistake!

The service will start listening on port 3111 by default, and call the Scanner service on port 3222.

## Responsibility
Read an input file and chunk it into strings of upper-bounded length.
Read proprietary format files such as .xlsx and convert to text, then send to Scanner service.

## Flow
If input is string, it is passed as-is to the Scanner service.
If input is a file, it is first chunked into pieces with overlapping parts, then passed to the Scanner service.

# Scanner Strategy

The file `services/scanner-strategy.ts` decides where to process the string chunk - on another Node service or hosted Elastic service.
