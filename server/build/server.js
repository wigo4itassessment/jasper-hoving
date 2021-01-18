"use strict";
const express = require("express");
const app = express();
const port = 8000;
app.use((req, res) => {
    res.send({ hoi: "doei" });
});
app.listen(port, () => console.log(`Listening on port ${port}!`));
