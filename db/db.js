const spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg(
        "postgres:pablomartinwaehner:password@localhost:5432/spicedlastweek"
    );
}

exports.getListOfQuestions = function() {
    return db.query("SELECT * FROM quiz;").then(results => {
        // console.log("getquiz: ", results.rows);
        return results.rows;
    });
};

exports.getUsers = function() {
    return db.query("SELECT * FROM users;").then(results => {
        // console.log("getUsers: ", results.rows);
        return results.rows;
    });
};

exports.register = function(firstName, lastName, email, password) {
    const q = `INSERT INTO users (first_name, last_name, email, hashed_password )
    VALUES($1, $2, $3, $4)
    RETURNING *`;

    const params = [firstName, lastName, email, password];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getUserById = function(id) {
    const params = [id];
    return db
        .query(`SELECT * FROM users WHERE id= $1;`, params)
        .then(results => {
            return results.rows[0];
        });
};

exports.insertFinalScore = function(id, score) {
    const q = `UPDATE users
    SET final_score = $2
    WHERE ID = $1`; //it's update because insert is to insert new rows, I have a row here already, i want to update the row
    const params = [id, score];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.hashPassword = function(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

exports.checkPassword = function(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};
