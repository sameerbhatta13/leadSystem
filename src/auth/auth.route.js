const express = require("express");
const { postAuth, updateAuth } = require("./auth.controller");
const { userValidation, validation } = require("../validation/validator");

const router = express.Router();

router.post("/auth", userValidation, validation, postAuth);
router.put("/update/:id", updateAuth);

module.exports = router;
