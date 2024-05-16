const mongoose = require("mongoose");
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
  .connect(process.env.DB_URL, connectionParams)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err, "err"));