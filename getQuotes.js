const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));

const hobbitRegex = /“[A-Z]([ ,\w!?,])*[!?.,]”/g;
const lotrRegex = /'[A-Z]([ ,\w!?,])*[!?.,]' /g;

const getQuotes = (previous, filePath, regex) =>
  fs.readFileAsync(`${process.cwd()}/${filePath}`, "utf8").then(txt =>
    txt
      .replace(/\n/g, "")
      .match(regex)
      .filter(str => str.length < 280)
      .map(str => str.slice(1, -1))
      .map(str => (str.slice(-1) === "'" ? str.slice(0, -1) : str))
      .map(str => (str.slice(-1) === "," ? str.slice(0, -1) + "" : str))
      .concat(previous)
  );

getQuotes([], "text/hobbit.txt", hobbitRegex)
  .then(data => getQuotes(data, "text/lotr1.txt", lotrRegex))
  .then(data => getQuotes(data, "text/lotr2.txt", lotrRegex))
  .then(data => getQuotes(data, "text/lotr3.txt", lotrRegex))
  .then(data =>
    fs
      .writeFileAsync(
        `${process.cwd()}/quotes.json`,
        JSON.stringify({ data }, null, 2)
      )
      .then(console.log("quotes written to file"))
  )
  .catch(console.log);
