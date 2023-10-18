const express = require("express");

const uploadbylinkMiddleware = express.static((__dirname + '/routes/uploads'));

module.exports = uploadbylinkMiddleware;
