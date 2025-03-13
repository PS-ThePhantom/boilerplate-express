require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
}
);

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}
, function(req, res) {
    res.json({time: req.time});
}
);

app.use(bodyParser.urlencoded({extended: false}));

app.get("/name", function(req, res) {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({name: `${firstName} ${lastName}`});
}
);

app.post("/name", function(req, res) {
    let string = req.body.first + " " + req.body.last;
    res.json({name: string});
}
);

app.get("/:word/echo", function(req, res) {
    res.json({echo: req.params.word});
}
);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {

    const message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": message.toUpperCase()})
    }
    else {
        res.json({"message": message});
    }
});

app.use("/public", express.static(__dirname + "/public"));

































 module.exports = app;
