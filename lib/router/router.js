const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const appDir = path.dirname(require.main.filename);
const routerConf = require(appDir +
  "/" +
  process.env.ROUTER_PATH +
  "/" +
  process.env.ROUTER);

let callbacks = {};
/**
 * @param  {} funcModule
 * @param  {} responseData
 * @param  {} req
 * @param  {} res
 */
exports.router = async function router(funcModule, responseData, req, res) {
  // init router
  callbacks = {};
  routerConf.router.forEach((api) => {
    try {
      if (api.type === "BOTH") {
        addRouterCase("/" + api.url + "GET", function () {
          funcModule[api.name + "Fun"].exec(req, res, responseData[api.name]);
        });
        addRouterCase("/" + api.url + "POST", function () {
          funcModule[api.name + "Fun"].exec(req, res, responseData[api.name]);
        });
      } else {
        addRouterCase("/" + api.url + api.type, function () {
          if (req.method === api.type) {
            funcModule[api.name + "Fun"].exec(req, res, responseData[api.name]);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  execRouter(req.path + req.method);
};

/**
 * @param  {} value
 */
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

/**
 * @param  {} _case
 * @param  {} fn
 */
function addRouterCase(_case, fn) {
  callbacks[_case] = callbacks[_case] || [];
  callbacks[_case].push(fn);
}
