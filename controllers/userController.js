const bcrypt = require("bcrypt");
const session = require("express-session");

const User = require('../models/user');
const userController = {

  register: async (req, res) => {
    try {
      const { username, password, medico } = req.body;

      // Check if the username is already taken
      const existing = await User.findOne({ username });

      if (existing) {
        return res.status(400).send({ message: "Username already taken." });
      }
      // Create a new user
      const user = new User({ username, password, medico });
      await user.save();

      res.status(201).send({ message: "User registered successfully." });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: "Authentication failed" });
      }

      // Set user information in session
      req.session.user = { id: user._id, username: user.username };
      res.status(200).send({ message: "Logged in successfully", id: user.medico }); // Set-Cookie header will be sent with the response
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  logout: (req, res) => {
    if (req.session) {
      // Destroying the session
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Could not log out, please try again" });
        } else {
          res.send({ message: "Logout successful" });
        }
      });
    } else {
      res.status(400).send({ message: "You are not logged in" });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.session.user.id;

      const admin = await User.findById(id);

      if (!admin || admin.role !== "admin") {
        return res.status(401).send({ message: "Unauthorized" });
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      await user.remove();

      res.send({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  }

}

module.exports = userController;