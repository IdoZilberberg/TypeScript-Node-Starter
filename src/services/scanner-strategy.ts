import {constants} from "./constants";
import {logger} from "../util/logger";
import {Detection} from "../models/Detection";

const rp = require("request-promise");

export const callScanner = (input: string, strategy?: string): Promise<Detection[]> => {

  const selectedStrategy = strategy || constants.scannerStrategy;

  switch (selectedStrategy) {
    case "node":
      return callNodeScanner(input);
    // case "elastic":
    //   return callElasticScanner(input);
    case "mock":
      return callMockScanner(input);
    default:
      throw new Error(`Unrecognized scanner strategy: ${constants.scannerStrategy}`);
  }
};

function callNodeScanner(input: string) {
  const options = {
    method: "POST",
    uri: `${constants.NODE_SCANNER_URL}`,
    body: input,
    headers: {
      "Content-Type": "text/plain"
    },
    json: true
  };

  console.log("Calling scanner");
  return rp(options)
    .then((results: any) => {
      logger.info(`Results: ${results}`);
      return <Detection[]>results;
    });
}

// For testing only
function callMockScanner(input?: string) {
  return Promise.resolve([<Detection>{name: "SSN", index: 40}]);
}

