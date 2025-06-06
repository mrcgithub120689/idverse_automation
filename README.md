
## Tech Stack
- WebdriverIo
- Node.js
- Mocha
- Chai
- Axios

## Commands

```
// run specific test file by default from wdio.conf.js
npx wdio run wdio.conf.js --spec ./test/*web.spec.js

// run specific test file in firefox
BROWSER=firefox npx wdio run wdio.conf.js --spec ./test/*web.spec.js

// show report generated by allure-report base on script
npm run report
```

## For Enhancement
- implementation of data with respect to environment
- data driven approach where you can test multiple data for 1 test
- integration with cicd
- env files for sensitive information
- date picker for more future dates
- enhance search flights with more options
- implement allure reporter for api as well