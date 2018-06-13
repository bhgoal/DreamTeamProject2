var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

// HTML ROUTES
// get route -> index
router.get("/", function (req, res) {
  // send us to the next get function instead.
  return res.render("index");
});

// get route -> my-garden
router.get("/my-garden", function (req, res) {
  // .findAll sequelize function
  db.Plants.findAll()
    // use promise method to pass the plants...
    .then(function (dbp) {
      // console.log(dbp);
      // into the main index, updating the page
      var hbsObject = { plant: dbp, layout: "garden" };
      return res.render("garden", hbsObject);
    });
});


// get route -> plants
router.get("/plants", function (req, res) {
  // .findAll sequelize function
  db.Plants.findAll({ limit: 25 })
    // use promise method to pass the plants...
    .then(function (dbp) {
      // console.log(dbp);
      // into the main index, updating the page
      var hbsObject = { plant: dbp, layout: "main" };
      return res.render("plants", hbsObject);
    });

});

// get route -> survey
router.get("/survey", function (req, res) {
  return res.render("survey");
});

// get route -> badges
router.get("/badges", function (req, res) {
  return res.render("badges");
});


// CHAT ROUTES

// get route -> chat
router.get("/chat", function (req, res) {
  return res.render("chat", { layout: 'chat' });
});

// GET route for retrieving all messages
router.get("/api/chat", function (req, res) {
  db.Chat.findAll({
    include: [db.User],
    order: [['updatedAt', 'ASC']]
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});

// POST route for saving a new message
router.post("/api/chat", function (req, res) {
  db.Chat.create({
    body: req.body.body,
    UserId: req.body.UserId
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});

// get route -> chat
router.get("/create", function (req, res) {
  return res.render("create");
});
module.exports = router;
