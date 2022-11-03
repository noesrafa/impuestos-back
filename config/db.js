const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true
        // useUnifiedTopology:true,
        // useFindAndModify: false,
        // useCreateIndex: true

    });
    console.log('✅ Mongo conectado');
  } catch (error) {
    console.log("❌ Error conectando: ", error);
    process.exit(1);
  }
};

module.exports = conectarMongo;
