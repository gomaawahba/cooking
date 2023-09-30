const { Category } = require('./server/models/Category');
const { categoris } = require("./datactegory")
const dotenv = require("dotenv");
const { connect } = require("./configdb/db")
dotenv.config();

//connectdb
connect();

//imports categoris
const imortcategories = async() => {
        try {

            await Category.insertMany(categoris)
            console.log("categoris imported");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }


    }
    //remove book
const removecategories = async() => {
    try {

        await Category;
        console.log("categoris removed");


    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}
if (process.argv[2] === "-import") {
    imortcategories();
} else if (process.argv[2] === "-remove") {
    removecategories();

}