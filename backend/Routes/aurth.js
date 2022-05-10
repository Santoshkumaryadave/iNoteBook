const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const { request } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewere/fetchuser");
const router = express.Router();

const JWT_SECRET = "skyisagood$boy";

//rout1:creat a user using :Post"/api/aurth/creatuser" no login requre
router.post(
  "/creatuser",
  [
    body("name", "Enter a vailied Name").isLength({ min: 3 }),
    body("email", "Enter a vailid email").isEmail(),
    body("password", "Set password more than 5 number").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success= false
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //creat a new uniqu user of uniqu email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      setPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: setPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const aurthtoken = jwt.sign(data, JWT_SECRET);
      success= true
      res.json({success,aurthtoken});
    } catch (error) {
      console.error(error.massage);
      res.status(500).send("Inernal surver error occured");
    }
  }
);
//route2:authoticat a user using :Post"/api/aurth/login" no login requre
router.post(
  "/login",
  [
    body("email", "Enter a vailid email").isEmail(),
    body("password", "password con not be blank").exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {

        return res
          .status(400)
          .json({  success, errors: "Please try  crrect crodentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        
        return res
          .status(400)
          .json({ success,errors: "Please try  crrect crodentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const aurthtoken = jwt.sign(data, JWT_SECRET);
        success=true;
      res.json({success,aurthtoken});
    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Inernal surver error occured");
    }
  }
);
//route3:get login a user details using :Post"/api/aurth/getuser" login requre
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.massage);
    res.status(500).send("Inernal surver error occured");
  }
});
module.exports = router;
