const dotenv = require("dotenv");
dotenv.config();

const io = require("./lib/io/io");
const router = require("./lib/router/router");
const jsonServer = require("json-server");
const server = jsonServer.create();
const routerConf = require("./router/" + process.env.ROUTER + ".json");

let responseData = {};
let funcModule = [];

io.importDate(routerConf, funcModule, responseData);

main();

function main() {
  server.use(jsonServer.bodyParser);
  server.use((req, res) => {
    if (req.method === "POST") {
      console.log("headers:");
      console.log(req.headers);
      try {
        router.router(funcModule, responseData, req, res);
      } catch (error) {
        console.error(error);
      }
    }
  });

  server
    .listen(process.env.PORT, () => {
      console.log(`Restful API Fast Test Toolkit is running.`);
      console.log(`You can visit it by http://127.0.0.1:${process.env.PORT}`);
    })
    .on("error", function (err) {
      console.log(err);
    });
}
