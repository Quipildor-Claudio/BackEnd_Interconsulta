const bcrypt = require("bcrypt");
const session = require("express-session");

const User = require('../models/user');
const userController = {

  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const items = await User.find()
        .populate('medico')
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });
      const totalItems = await User.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);
      res.json({
        items,
        totalItems,
        totalPages,
        currentPage: page
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const item = await User.findById(req.params.id);
      if (item == null) {
        return res.status(404).json({ message: 'Item no encontrado' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  register: async (req, res) => {
    try {

      const { username, password, medico } = req.body;
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
  update: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const newUser = req.body;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.password = newUser.password;
      user.username = newUser.username;
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

  },

  delete: async (req, res) => {
    try {
      const deletedItem = await User.findByIdAndDelete(req.params.id);
      if (deletedItem == null) {
        return res.status(404).json({ message: 'Item no encontrado' });
      }
      res.json({ message: 'Item eliminado' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}

module.exports = userController;