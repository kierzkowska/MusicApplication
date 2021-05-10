const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// register

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify, displayName } = req.body;

    // validation

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ msg: "Nie wszystkie pola zostały uzupełnione" });

    if (password.length < 5)
      return res.status(400).json({
        msg: "Hasło musi składać się z minimum 5 znaków",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        msg: "Hasła muszą się ze sobą zgadzać",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        msg: "Konto o tym emailu już istnieje",
      });

    if (!displayName) displayName = email;

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new User({
      email,
      passwordHash,
      displayName,
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).json({ error: err.message });

  }
});

// log in

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Nie wszystkie pola zostały uzupełnione" });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res
        .status(401)
        .json({ msg: "Nie ma konta o tym emailu" });

    const passwordCorrect = await bcrypt.compare(
      password.toString(),
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ msg: "Nieprawidłowe uwierzytelnienie" });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).json({ error: err.message });

  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

router.get("/all", async (req, res) => {
  User.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("blad: ", daerrorta);
    });
});

// router.get("/", async (req, res) => {
//   const user = await User.findById(req.user);
//   res.json({
//     id: user.id,
//   });
// });

module.exports = router;
