const asynchandler = require("express-async-handler");
const { Category } = require('../models/Category');
const { Recipe } = require('../models/Recipe');
const { Chef } = require("../models/Chef")

/**
 * 
 * Get Page
 * Home page
 */

exports.homepage = asynchandler(async(req, res) => {

    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

        const food = { latest, thai, american, chinese };
        res.render('index', { title: 'Cooking Blog - Home', categories, food });

    } catch (error) {
        res.status(500).send({ message: `Error Occured` });
    }


});

/**
 * GET /categories
 * Categories 
 */
exports.exploreCategories = async(req, res) => {
        try {
            const limitNumber = 20;
            const categories = await Category.find({}).limit(limitNumber);
            res.render('categories', { title: 'Cooking Blog - Categoreis', categories });
        } catch (error) {
            res.satus(500).send({ message: "Error Occured" });
        }
    }
    /**
     * GET /recipe/:id
     * Recipe 
     */
exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', { title: 'Cooking Blog - Recipe', recipe });
    } catch (error) {
        res.satus(500).send({ message: "Error Occured" });
    }
}

/**
 * GET /categories/:id
 * Categories By Id
 */
exports.exploreCategoriesById = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categoreis', categoryById });
    } catch (error) {
        res.satus(500).send({ message: "Error Occured" });
    }
}

/**
 * POST /search
 * Search 
 */
exports.searchRecipe = async(req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render('search', { title: 'Cooking Blog - Search', recipe });
    } catch (error) {
        res.status(500).send({ message: "Error Occured" });
    }

}


/**
 * GET /explore-latest
 * Explplore Latest 
 */
exports.exploreLatest = async(req, res) => {
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', recipe });
    } catch (error) {
        res.satus(500).send({ message: "Error Occured" });
    }
}



/**
 * GET /explore-random
 * Explore Random as JSON
 */
exports.exploreRandom = async(req, res) => {
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render('explore-random', { title: 'Cooking Blog - Explore Latest', recipe });
    } catch (error) {
        res.satus(500).send({ message: "Error Occured" });
    }
}

/**
 * GET /submit-recipe
 * Submit Recipe
 */
exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj });
}

/**
 * POST /submit-recipe
 * Submit Recipe
 */
exports.submitRecipeOnPost = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No Files where uploaded.');
        } else {

            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, function(err) {
                if (err) return res.satus(500).send(err);
            })

        }

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        });

        await newRecipe.save();

        req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/submit-recipe');
    } catch (error) {
        // res.json(error);
        req.flash('infoErrors', error);
        res.redirect('/submit-recipe');
    }
}

//aboutPage

/**
 * Get page about
 * what the about 
 * chife
 */


exports.aboutPage = async(req, res) => {
    try {
        const limitNumber = 5;
        const chefs = await Chef.find({}).limit(limitNumber);
        res.render('about', { title: 'Cooking Blog - about', chefs });

    } catch (error) {
        res.status(500).send({ message: `Error Occured` });
    }
}

//aboutPage

/**
 * Get page about
 * what the about 
 * GET about/:id
 * chife
 */


exports.aboutPagebyid = async(req, res) => {
    try {
        let chefId = req.params.id;
        const chef = await Chef.findById(chefId);
        res.render('aboutid', { title: 'Cooking Blog - about', chef });
    } catch (error) {
        res.satus(500).send({ message: "Error Occured" });
    }
}


//contactPage


//Contanct page

/**
 * Get page about
 * what the about 
 * chife
 */


exports.contactPage = async(req, res) => {
    try {
        res.render('contact', { title: 'Cooking Blog - about' });

    } catch (error) {
        res.status(500).send({ message: `Error Occured` });
    }
};




/**
 *  <% if(locals.errors){ %>
 *  <%- errors.forEach(function(error) { %>
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <%= error.msg %>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <% }); %>
                                        <% if(success_msg != ''){ %>
                                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                                <%= success_msg %>
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                            </div>
                                            <% } %>
                                                <% if(error_msg != ''){ %>
                                                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <%= error_msg %>
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                                    </div>
                                                    <% } %>
                                                        <% if(error != ''){ %>
                                                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <%= error %>
                                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                                            </div>
                                                            <% } %>
 */