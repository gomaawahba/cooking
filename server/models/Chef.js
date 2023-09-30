const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },
    category: {
        type: String,
        enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
        required: 'This field is required.'
    },
    image: {
        type: String,
        required: 'This field is required.'
    },
});

// recipeSchema.index({ name: 'text', description: 'text' });
// // WildCard Indexing
// //recipeSchema.index({ "$**" : 'text' });

const Chef = mongoose.model('Chef', chefSchema);

module.exports = {
    Chef
}