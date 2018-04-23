// const Request = express.Request;
import {Detection} from "../models/Detection";

const path = require("path");
import {Request, Response, NextFunction} from "express";
import {logger} from "../util/logger";
import * as _ from "lodash";

// const express = require("express");
const processTxtFile = require("../services/txt-file-processor").processTxtFile;
const scannerStrategy = require("../services/scanner-strategy");

const scanFile = (req: Request, res: Response) => {
  const localPath = req.query["localpath"];
  const gdrivePath = req.query["gdrivepath"];
  const strategy = req.query["strategy"];

  logger.info(`scanFile(): path=${localPath}`);

  const extension = path.extname(localPath);
  let func;
  switch (extension) {
    case ".txt":
      func = processTxtFile.bind(null, localPath, strategy || null);
      break;
    case ".xls": // TODO: Parse it to text, then run txtFileProcessor as in .txt case
    default:
      throw new Error(`Extension ${extension} is not supported yet, open a Github issue to the developer!`);
  }

  return func()
    .then((response: Response) => {
      const finalResponse = _.filter(response, item => {
        return item.length > 0;
      });
      return res.status(200).json(finalResponse);
    })
    .catch((err: Error) => res.status(500).send(err.message));
};

/**
 * POST /login
 * Sign in using email and password.
 */
const scanString = (req: Request, res: Response, next: NextFunction) => {
  const input = req.body;

  return scannerStrategy.callScanner(input)
    .then((detections: Detection[]) => {
      const names = _.map(detections, "name");
      // const parsedScannerResponse = scannerResponseParser.parseScannerResponse(parsedBody);
      return res.status(200).json(names);
    })
    .catch((err: Error) => res.status(500).send(err.message));
};

module.exports = {
  scanFile: scanFile,
  scanString: scanString
};