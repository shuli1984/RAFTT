# RAFTT
Restful API Fast Test Toolkit

## How to use it
1. Config router
   
    Edit router information look like router/router.json.
    name is api name.
   ```json
    {
        "router": [
            { "name": "demo1", "url": "demo1" },
            { "name": "demo2", "url": "demo2" }
        ]
    }
    ```
    </code>
2. Config response logical

    Config which response will be return by which case.

    Look like function/demo1_Fun.js. RAFTT will search response logical by api name.

    The file name must use api name.(I use "_Fun" tag for easily know this is function)

    This example will return response data "demo_OK1" when request's demo's value is "demo1".
    ```javascript
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
    ```
3. Config response data

    Just use json file for config response data. RAFTT will search response data from api name's folder.

    Look like response/demo1/demo_OK1.json.

    The folder name must same as the api name.
   ```json
    {
        "result": "demo_OK1"
    }