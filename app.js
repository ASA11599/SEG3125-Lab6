const http = require('http');
const fs = require("fs");

const HOSTNAME = "localhost";
const PORT = 3000;

const SURVEY_PATH = "./data/survey.json";
const INDEX_PATH = "./public/index.html";
const ASSETS_PATH = "./public/assets/";
const SCRIPTS_PATH = "./public/scripts/";
const STYLES_PATH = "./public/styles/";
const ANALYSIS_PATH = "./public/analysis.html";

const ASSETS = [
    "amazon_cart.png",
    "amazon_help.png",
    "amazon_main.png"
];

const STYLES = [
    "styles.css"
];

const SCRIPTS = [
    "main.js",
    "action.js"
];

function parseURL(url) {
    return url.split("/").filter((value) => {return value.length > 0});
}

function fileToString(path) {
    return fs.readFileSync(path).toString();
}

function fileToBuffer(path) {
    return fs.readFileSync(path);
}

function getSurvey() {
    return fileToString(SURVEY_PATH);
}

function updateSurvey(data) {
    const newSurvey = JSON.parse(getSurvey());
    const jsonData = JSON.parse(data);
    for (let i = 0; i < 6; i++) {
        newSurvey[i]["answers"].push(jsonData[i]["answer"]);
    }
    fs.writeFileSync(SURVEY_PATH, JSON.stringify(newSurvey));
}

http.createServer((req, res) => {
    const urlPath = parseURL(req.url);
    switch (req.method) {
        case "GET":
            if (urlPath.length == 1) {
                if (urlPath[0] == "api") {
                    res.setHeader("Content-Type", "application/json");
                    res.write(getSurvey());
                    res.statusCode = 200;
                    res.end();
                } else if (urlPath[0] == "analysis") {
                    res.setHeader("Content-Type", "text/html");
                    res.write(fileToString(ANALYSIS_PATH));
                    res.statusCode = 200;
                    res.end();
                } else {
                    // 404 not found
                    res.setHeader("Content-Type", "application/json");
                    res.statusCode = 404;
                    res.end(JSON.stringify({statusCode: 404, message: "Not found"}));
                }
            } else if (urlPath.length == 0) {
                res.setHeader("Content-Type", "text/html");
                res.write(fileToString(INDEX_PATH));
                res.statusCode = 200;
                res.end();
            } else if (urlPath.length == 2) {
                if (urlPath[0] == "assets") {
                    if (ASSETS.includes(urlPath[1])) {
                        res.setHeader("Content-Type", "image/png");
                        res.write(fileToBuffer(ASSETS_PATH + urlPath[1]));
                        res.statusCode = 200;
                        res.end();
                    } else {
                        // 404 not found
                        res.setHeader("Content-Type", "application/json");
                        res.statusCode = 404;
                        res.end(JSON.stringify({statusCode: 404, message: "Not found"}));
                    }
                } else if (urlPath[0] == "styles") {
                    if (STYLES.includes(urlPath[1])) {
                        res.setHeader("Content-Type", "text/css");
                        res.write(fileToString(STYLES_PATH + urlPath[1]));
                        res.statusCode = 200;
                        res.end();
                    } else {
                        res.statusCode = 404;
                        res.end(JSON.stringify({statusCode: 404, message: "Not found"}));
                    }
                } else if (urlPath[0] == "scripts") {
                    if (SCRIPTS.includes(urlPath[1])) {
                        res.setHeader("Content-Type", "text/javascript");
                        res.write(fileToString(SCRIPTS_PATH + urlPath[1]));
                        res.statusCode = 200;
                        res.end();
                    } else {
                        // 404 not found
                        res.setHeader("Content-Type", "application/json");
                        res.statusCode = 404;
                        res.end(JSON.stringify({statusCode: 404, message: "Not found"}));
                    }
                } else {
                    // 404 not found
                    res.setHeader("Content-Type", "application/json");
                    res.statusCode = 404;
                    res.end(JSON.stringify({statusCode: 404, message: "Not found"}));
                }
            } else {
                // 404 not found
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 404;
                res.end(JSON.stringify({statusCode: 404, message: "Not found"}));
            }
            break;
        case "POST":
            // update survey
            if (urlPath.length == 1 && urlPath[0] == "api") {
                let body = "";
                req.on("data", (chunk) => {body += chunk});
                req.on("end", () => {
                    res.setHeader("Content-Type", "application/json");
                    res.statusCode = 200;
                    updateSurvey(body);
                    res.end(JSON.stringify(getSurvey()));
                });
            } else {
                // 404 not found
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 404;
                res.end(JSON.stringify({statusCode: 404, message: "Not found"}));
            }
            break;
        default:
            // 405 method not allowed
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 405;
            res.end(JSON.stringify({statusCode: 405, message: "Method not allowed"}));
            break;
    }
}).listen(PORT, HOSTNAME);
