import dotenv from "dotenv";
import {connectDB} from "./database/dbConfig.js";
import {app} from "./app.js";


dotenv.config({
    path: "./.env"
});



// Connecting the database
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is runing at : ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDb connection failed !!", error);
})



