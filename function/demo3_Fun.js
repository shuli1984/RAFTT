module.exports = {
  exec: function (req, res, responseData) {
    switch (req.method) {
      case "POST":
        switch (req.body.demo) {
          case "demo1":
            res.jsonp(responseData.demo_OK1);
            break;
          case "demo2":
            res.jsonp(responseData.demo_OK2);
            break;
          default:
            res.jsonp(responseData.demo_NG);
        }
        break;
      case "GET":
        switch (req.query.demo) {
          case "demo3":
            res.jsonp(responseData.demo_OK3);
            break;
          case "demo4":
            res.jsonp(responseData.demo_OK4);
            break;
          default:
            res.jsonp(responseData.demo_NG);
        }
        break;
    }
  },
};
