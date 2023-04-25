const blacklist = require("metro-config/src/defaults/exclusionList");

module.exports = {
  resolver: {
    blacklistRE: blacklist([
      // /\/delivery-app\/.*\/node_modules/,
      // /delivery-app\/.*\/package.json/,
      /delivery-app\/sanity\/package.json/,
    ]),
  },
};

// module.exports = {
//   // ...
//   resolver: {
//     // ...
//     blacklistRE: /node_modules\/.*\/node_modules\/(?!@?delivery-app)/,
//   },
// };
