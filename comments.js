// Create web server application with Node.js
// Comments
// 1. Include http module.
var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");
var qs = require("querystring");

// 2. Create http server.
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    if (pathname == "/") {
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile("./index.html", "utf-8", function (error, data) {
            if (error) {
                response.writeHead(404);
                response.write("File not found!");
            } else {
                response.write(data);
            }
            response.end();
        });
    } else if (pathname == "/api/comments") {
        if (request.method == "POST") {
            var comment = "";
            request.on("data", function (data) {
                comment += data;
            });
            request.on("end", function () {
                comment = qs.parse(comment);
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write("Your comment has been saved successfully!");
                response.write("<br>");
                response.write("Name: " + comment["name"]);
                response.write("<br>");
                response.write("Comment: " + comment["comment"]);
                response.end();
            });
        } else if (request.method == "GET") {
            response.writeHead(200, { "Content-Type": "text/html" });
            fs.readFile("./comments.json", "utf-8", function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write("File not found!");
                } else {
                    response.write(data);
                }
                response.end();
            });
        }
    } else {
        response.writeHead(404);
        response.write("File not found!");
        response.end();
    }
}).listen(8080);
// 3. Write web page to response.
// 4. Make web server listen on port 8080.
console.log("Server is listening on port 8080...");
