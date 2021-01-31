# RAFTT
Restful API Fast Test Toolkit

## How to install
Download and install node.js.
You can find install package from https://nodejs.org/en/download/.


After installed node.js, execute this CMD for install require model.
```shell
npm install dotenv json-server
```

Execute this CMD for verify install.
```shell
node raftt.js 
```

You can see the boot information.
```shell
Restful API Fast Test Toolkit is running.
You can visit it by http://127.0.0.1:8080
```

## How to use it
1. Config router
   
    Edit router information such as router/router.json.
    "name" is api name.
    
    Example: 
   ```json
    {
        "router": [
            { "name": "demo1", "url": "demo1url", "type": "POST" },
            { "name": "demo2", "url": "demo2url", "type": "GET" },
            { "name": "demo3", "url": "demo3url", "type": "BOTH" }
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

    You can use "req.query" for get parameter when use GET method.

    Example: 
    ```javascript
        module.exports = {
            exec: function (req, res, responseData) {
                switch (req.query.demo) {
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