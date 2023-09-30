const express = require("express");
const router = express.Router();
const recipeControllers = require("../controllers/recipeControllers");
const { verifyToken, verifyTokenandadmin } = require("../middelwares/verifyToken")

/**
 * App Routes
 */


router.get('/', recipeControllers.homepage);
router.get('/categories', recipeControllers.exploreCategories);
router.get('/recipe/:id', recipeControllers.exploreRecipe);
router.get('/categories/:id', recipeControllers.exploreCategoriesById);
router.post('/search', recipeControllers.searchRecipe);
router.get('/explore-latest', recipeControllers.exploreLatest);
router.get('/explore-random', recipeControllers.exploreRandom);
router.get('/submit-recipe', recipeControllers.submitRecipe);
router.post('/submit-recipe', recipeControllers.submitRecipeOnPost);
router.get('/about', recipeControllers.aboutPage);
router.get('/about/:id', recipeControllers.aboutPagebyid);
router.get('/contact', recipeControllers.contactPage);






module.exports = router