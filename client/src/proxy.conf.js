  const PROXY_CONFIG = {
    "/backend": {
        "target": "http://api:3000",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/backend": ""
        },
        "bypass": function (req, res, proxyOptions) {
            req.headers["Authorization"] = "dwdwd";
        }
    }
}

module.exports = PROXY_CONFIG;