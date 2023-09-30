const { Recipe } = require('./server/models/Recipe');
const { recipes } = require("./datarecipe")
const dotenv = require("dotenv");
const { connect } = require("./configdb/db")
dotenv.config();

//connectdb
connect();

//imports recipe
const imortrecips = async() => {
        try {

            await Recipe.insertMany(recipes)
            console.log("recipes imported");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }


    }
    //remove recipe
const removerecipe = async() => {
    try {

        await Recipe.deleteMany();
        console.log("recipes removed");


    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}
if (process.argv[2] === "-import") {
    imortrecips();
} else if (process.argv[2] === "-remove") {
    removerecipe();

}