const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const appDir = path.dirname(require.main.filename);
const routerConf = require(appDir +
  "/" +
  process.env.ROUNTER_PATH +
  "/" +
  process.env.ROUTER);

let callbacks = {};

exports.router = async function router(funcModule, responseData, req, res) {
  // init router
  callbacks = {};
  routerConf.router.forEach((api) => {
    try {
      addRouterCase("/" + api.name, function () {
        funcModule[api.name + "Fun"].exec(req, res, responseData[api.name]);
      });
    } catch (error) {
      console.error(error);
    }
  });

  execRouter(req.originalUrl);
};

function execRouter(value) {
  if (callbacks[value]) {
    callbacks[value].forEach(function (fn) {
      try {
        return fn();
      } catch (error) {
        console.error(error);
      }
    });
  }
}

function addRouterCase(_case, fn) {
  callbacks[_case] = callbacks[_case] || [];
  callbacks[_case].push(fn);
}
