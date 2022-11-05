const { gql } = require("apollo-server");

// Puedo definir que datos necesito
const typeDefs = gql`
  type Query {
    obtenerAnalisis: [Analisis]
  }

  type Analisis {
    id: ID!
    mes: String!
    year: Int!
    ingresosTotales: Float!
    gastosTotales: Float!
    isr: Float!
    iva: Float!
    isrRetenido: Float!
    ivaRetenido: Float!
  }
  
  type Token {
    token: String
  }

  input UserInput {
    nombre: String!
    token: String!
  }

  input AuthInput {
    token: String!
  }

  input AnalisisInput {
    mes: String!
    year: Int!
    ingresosTotales: Float!
    gastosTotales: Float!
    isr: Float!
    iva: Float!
    isrRetenido: Float!
    ivaRetenido: Float!
  }

  type Mutation {
    createUser(input: UserInput): String
    authUser(input: AuthInput): Token
    nuevoAnalisis(input: AnalisisInput): Analisis
  }



`;

module.exports = typeDefs;