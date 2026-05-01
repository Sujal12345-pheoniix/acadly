const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    if (!process.env.MONGODB_URL) {
        console.log("MONGODB_URL is missing. Add it in server/.env before starting backend.");
        process.exit(1);
    }

    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};