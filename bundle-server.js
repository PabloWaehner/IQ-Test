const express = require("express");
const app = express();
const ca = require("chalk-animation");

app.use(require("./build.js"));

// app.listen(8081, () => console.log(`Ready to compile and serve bundle.js`));
app.listen(process.env.PORT || 8081, () =>
    ca.rainbow(`Ready to compile and serve bundle.js. listening on port 8081`)
);
