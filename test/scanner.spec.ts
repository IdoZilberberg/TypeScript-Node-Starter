const txtFileProcessor = require("../src/services/txt-file-processor");

describe("Chunker", () => {

  it("should chunk the file nothing.txt", () => {
    return txtFileProcessor.processTxtFile("test/files/nothing.txt", "mock");
  });

  it("should chunk the file ssn.txt", () => {
    return txtFileProcessor.processTxtFile("test/files/ssn.txt", "mock");
  });


});