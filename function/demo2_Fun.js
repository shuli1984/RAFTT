module.exports = {
  exec: function (req, res, responseData) {
    switch (req.body.demo) {
      case "demo1":
        res.json(responseData.demo_OK1);
        break;
      case "demo2":
        res.json(responseData.demo_OK2);
        break;
      default:
        res.json(responseData.demo_NG);
    }
  },
};
