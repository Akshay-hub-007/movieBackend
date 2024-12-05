const mongoose = require("mongoose");

function connect() {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log("MongoDB is connected");
        })
        .catch((err) => {
            console.error("Error in connecting MongoDB:", err);
        });
}

module.exports = connect;
