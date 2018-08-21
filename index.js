const express = require("express");
const app = express();
const compression = require("compression");
//
const bodyParser = require("body-parser");
const ca = require("chalk-animation");
const db = require("./db/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const path = require("path");

//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(
    // goes before the csurf
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// app.get("/", (req, res) => {
//     res.redirect("/welcome");
// }); //for heroku

app.post("/login", (req, res) => {
    if (req.session.userID) {
        res.redirect("/");
    }
    if (!req.body.email && !req.body.password) {
        res.json({
            error: "All fields are required"
        });
    } else {
        db.getUsers().then(loggingin => {
            for (var i = 0; i < loggingin.length; i++) {
                if (loggingin[i].email == req.body.email) {
                    var compare = loggingin[i].hashed_password;
                    var userID = loggingin[i].id;
                }
            }
            if (!compare) {
                res.json({
                    error: "Invalid username or password"
                });
            } else {
                db.checkPassword(req.body.password, compare)
                    .then(passwordMatch => {
                        console.log(
                            "is the password correct?: ",
                            passwordMatch
                        );
                        if (passwordMatch) {
                            req.session.userID = userID;
                            console.log("userIDinlogin: ", userID);
                            // console.log("loggingin: ", loggingin);
                            res.json(loggingin);
                        } else {
                            res.json({
                                error: "Invalid username or password" //both have the same error message. This prevents attackers from enumerating valid usernames without knowing their passwords.
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    }
});

app.post("/registration", (req, res) => {
    console.log("inside POST /registration", req.body);
    if (req.session.userID) {
        res.redirect("/");
    }

    if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        !req.body.password
    ) {
        res.json({
            error: "All fields are required"
        });
    } else {
        db.getUsers().then(loggingin => {
            for (var i = 0; i < loggingin.length; i++) {
                if (loggingin[i].email == req.body.email) {
                    var compare = true;
                }
            }
            if (compare) {
                res.json({
                    error: "That email is already taken"
                });
            } else {
                db.hashPassword(req.body.password).then(hashedPassword => {
                    db.register(
                        req.body.firstname,
                        req.body.lastname,
                        req.body.email,
                        hashedPassword
                    )
                        .then(signedup => {
                            req.session.userID = signedup.id;
                            console.log(
                                "userID-registration: ",
                                req.session.userID
                            );
                            res.json({ success: true });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            }
        });
    }
});

app.get("/welcome", (req, res, next) => {
    console.log("req.session: ", req.session);
    if (!req.session.userID) {
        res.redirect("/registration");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

// app.get("/user", (req, res) => {
app.get("/", (req, res) => {
    console.log("user1");
    if (!req.session.userID) {
        res.redirect("/registration");
        // res.redirect("/");
    }
    db.getUserById(req.session.userID)
        .then(data => {
            console.log("user2: ", data);
            res.json({
                ...data
            });
            // res.json(data);
        })
        .catch(err => {
            console.log("logging error", err);
            res.sendStatus(500);
        });
});

app.get("/questions", function(req, res) {
    console.log("questionsIQ: ", req.session.userID);
    db.getListOfQuestions().then(results => {
        // console.log("getListOfQuestions: ", results);
        res.json({ results });
    });
});

app.post("/finalscore", (req, res) => {
    console.log("final score");
    console.log("req.session.userID", req.session.userID);
    console.log("req.body: ", req.body.score); //req.body because it comes from an axios
    db.insertFinalScore(req.session.userID, req.body.score)
        .then(results => {
            res.json({
                success: true
            });
        })
        .catch(err => {
            res.sendStatus(500);
            console.log(err);
        });
});

app.get("*", function(req, res) {
    if (!req.session.userID) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(process.env.PORT || 8080, () =>
    ca.rainbow("listening on port 8080")
);
