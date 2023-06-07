const router = require("express").Router();
const isAuthenticated = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const List = require("../models/List.model")

//http://localhost:5005/users/:username
router.get("/:username", (req, res, next) => {
  //removed isAuthenticated because needs to be accessible from other users as well changeLater
  let { username } = req.params;
  User.findOne({ username: username })
    //populate friends, events & store in payload changeLater
    .populate("friendsConfirmed")
    .populate("inviteLists")
    .populate("friendsPending")
    .populate("notifications")
    .populate("eventsCreated")
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => next(err));
});

//http://localhost:5005/users/:userId/edit
router.post("/:userId/edit", (req, res, next) => {
  //isAuthenticated changeLater
  let { userId } = req.params;
  // let { userId } = req.payload;
  let { user } = req.body;

  User.findByIdAndUpdate(userId, user)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => next(err));
});

module.exports = router;
