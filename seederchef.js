const { Chef } = require('./server/models/Chef');
const { chefs } = require("./datachief")
const dotenv = require("dotenv");
const { connect } = require("./configdb/db")
dotenv.config();

//connectdb
connect();

//imports chefs
const imortchefs = async() => {
        try {

            await Chef.insertMany(chefs)
            console.log("chefs imported");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }


    }
    //remove chefs
const removechefs = async() => {
    try {

        await Chef.deleteMany();
        console.log("chefs removed");


    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}
if (process.argv[2] === "-import") {
    imortchefs();
} else if (process.argv[2] === "-remove") {
    removechefs();

}