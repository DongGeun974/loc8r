const express = require("express");
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
 secret: process.env.JWT_SECRET,
 algorithms: ['HS256'],
 userProperty: 'payload'
});

const ctrlLocation = require("../controllers/locations");
const ctrlReviews = require("../controllers/reviews");
const ctrlAuth = require('../controllers/authentication');

// locations
router
  .route("/locations")
  .get(ctrlLocation.locationsListByDistance)
  .post(ctrlLocation.locationsCreate);
router
  .route("/locations/:locationid")
  .get(ctrlLocation.locationsReadOne)
  .put(ctrlLocation.locationsUpdateOne)
  .delete(ctrlLocation.locationsDeleteOne);

// reviews
router
  .route("/locations/:locationid/reviews")
  .post(auth, ctrlReviews.reviewsCreate);
router
  .route("/locations/:locationid/reviews/:reviewid")
  .get(ctrlReviews.reviewsReadOne)
  .put(auth, ctrlReviews.reviewsUpdateOne)
  .delete(auth, ctrlReviews.reviewsDeleteOne);

  router.post('/register', ctrlAuth.register);
  router.post('/login', ctrlAuth.login);

module.exports = router;
