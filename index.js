const { ApolloServer } = require("apollo-server");
//Token
const jwt = require('jsonwebtoken')
require('dotenv').config('variables.env')
// Apollo Setup
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
// Conectar DB
const conectarMongo = require("./config/db");


conectarMongo();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    // console.log(req.headers['authorization']);
    const token = req.headers['authorization'] || '';

    if (token) {
        try {
            const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA)
            // console.log(usuario);
            return { usuario }
        } catch (error) {
            console.log(error);
        }
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`✅ Server ready in port 4000`);
});
