const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);

/**
 * @param  {} routerConf
 * @param  {} funcModule
 * @param  {} responseData
 */
exports.importDate = async function importDate(
  routerConf,
  funcModule,
  responseData
) {
  routerConf.router.forEach((api) => {
    try {
      funcModule[api.name + "Fun"] = require(appDir +
        "/" +
        process.env.FUNCTION_PATH +
        "/" +
        api.name +
        process.env.FUNC_TAG +
        ".js");
      fs.readdir(process.env.RESPONSE_PATH + "/" + api.name, (err, files) => {
        let resPath =
          appDir + "/" + process.env.RESPONSE_PATH + "/" + api.name + "/";
        if (files != null) {
          responseData[api.name] = [];
          files.forEach((file) => {
            let filename = file.split(".");
            try {
              responseData[api.name][filename[0]] = require(resPath + file);
            } catch (error) {
              console.error(error);
            }
            console.log(resPath + file);
          });
        } else {
          console.log("Can't find function file");
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
};
