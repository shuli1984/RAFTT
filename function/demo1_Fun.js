module.exports = {
  exec: function (req, res, responseData) {
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
  },
};
