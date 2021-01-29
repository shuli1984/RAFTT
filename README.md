# RAFTT
Restful API Fast Test Toolkit

## How to use it
1. Config router
   
    Edit router information such as router/router.json.
    "name" is api name.
    
    Example: 
   ```json
    {
        "router": [
            { "name": "demo1", "url": "demo1" },
            { "name": "demo2", "url": "demo2" }
        ]
    }
    ```
    You can access this api by http://127.0.0.1:8080/demo1. (You can config port with the .evn file). 
    
    RAFTT will search and loading logical and response data by api name.
    
2. Config response logical

    Config which response will be return by which case.

    Such asfunction/demo1_Fun.js. RAFTT will search response logical by api name.

    The file name must use api name.(I use "_Fun" tag for easily know this is function)

    This example will return response data "demo_OK1" when request's demo's value is "demo1".

    Example: 
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

    Such as response/demo1/demo_OK1.json.

    The folder name must same as the api name.

    Example: 
   ```json
    {
        "result": "demo_OK1"
    }