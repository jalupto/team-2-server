require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use("/test", (req, res) => {
    res.send("This is a message from the test endpoint on the server!");
});

app.use(require("./middleware/headers"));

const controllers = require("./controllers");
app.use(Express.json());

app.use("/user", controllers.userController);
app.use("/favs", controllers.favController);

dbConnection
    .authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Sever crashed. Error: ${err}`);
    });
