import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGODB_CONNECTION_STRING)
    .then(() => {
        app.listen(port, () => {
            console.log("Server runnning on port " + port);
        })
    })
    .catch(console.error)