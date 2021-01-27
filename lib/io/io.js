const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);

exports.importDate = async function importDate(
  routerObject,
  funcDateSet,
  resDateSet
) {
  routerObject.router.forEach((api) => {
    try {
      funcDateSet[api.name + "Fun"] = require(appDir +
        "/" +
        process.env.FUNCTION_PATH +
        "/" +
        api.name +
        "_Fun.js");
      fs.readdir(process.env.RESPONSE_PATH + "/" + api.name, (err, files) => {
        let resPath =
          appDir + "/" + process.env.RESPONSE_PATH + "/" + api.name + "/";
        if (files != null) {
          resDateSet[api.name] = [];
          files.forEach((file) => {
            let filename = file.split(".");
            try {
              resDateSet[api.name][filename[0]] = require(resPath + file);
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
