const express = require("express");

const uploadMiddleware = express.static((__dirname + '/uploads'));

module.exports = uploadMiddleware;
