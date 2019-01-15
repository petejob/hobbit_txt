const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const Twit = require("twit");
const {
  api_key,
  api_secret,
  access_token,
  access_secret
} = require("./config/config");

const T = new Twit({
  consumer_key: api_key,
  consumer_secret: api_secret,
  access_token: access_token,
  access_token_secret: access_secret,
  timeout_ms: 60 * 1000, // optional
  strictSSL: true // optional
});

exports.handler = () => {
  fs.readFileAsync(`${__dirname}/quotes.json`, "utf8")
    .then(txt => {
      const { data } = JSON.parse(txt);
      const i = Math.floor(Math.random() * data.length);
      return data[i];
    })
    .then(quote => {
      console.log(quote);
      return T.post("statuses/update", { status: quote });
    })
    .then(res => console.log(`posted!`))
    .catch(console.log);
};
