# hobbit_txt

[hobbit_txt](https://twitter.com/hobbit_txt) is a twitter bot posting quotes from The Hobbit and The Lord Of The Rings series.

Written in node and uses npm package [twit](https://www.npmjs.com/package/twit) for calls to the twitter api.

Source text is from archive.org

- [The Hobbit](https://archive.org/details/TheHobbitByJ.R.RTolkien)
- [The Lord Of The Rings](https://archive.org/details/TheLordOfTheRing1TheFellowshipOfTheRing)

This app is hosted on AWS Lambda. To host a project like this on Lambda, zip the contents of the project and upload. On AWS define the entry point (index.handler) and an event trigger (such as a time interval).

_"Come along in, and have some tea!"_
