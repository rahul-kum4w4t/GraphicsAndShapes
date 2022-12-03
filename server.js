import express from "express";

const app = express();

app.use(express.static('.'));

app.get("/", (req, res) => {
    res.send("Welcome to psShapes server");
});

// Starting server
app.listen(3000, err => {
    if (err) {
        return console.error("error" + err.stack);
    }
    console.info("Server started at port : 3000");
});