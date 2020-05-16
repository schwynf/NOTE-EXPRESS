const express = require("express");
const app = express();
var colors = require("colors");
const htmlRoutes = require("./routes/html-routes.js");
const apiRoutes = require("./routes/api-routes.js");
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is listening ` + `http://localhost:${PORT}`.red)
});

