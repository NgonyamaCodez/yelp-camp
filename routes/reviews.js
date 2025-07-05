const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn,ReviewAuthor } = require('../middle.js')
const Campground = require('../model/campground');
const Review = require('../model/review');
const campgrounds = require('../controllers/reviews.js')
const catchAsync = require("../utility/catcjAysnc");
const campground = require("../model/campground");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(campgrounds.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  ReviewAuthor,
  catchAsync(campgrounds.updateReviews)
);

module.exports = router