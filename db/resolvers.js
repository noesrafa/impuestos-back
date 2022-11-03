const Usuarios = require('../models/Usuario')
const Analisis = require('../models/Analisis')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})

//Crea y firma JWT
const crearToken = (usuario, secreta) => {
    // console.log(usuario);
    const { token, nombre, id } = usuario
    return jwt.sign({ nombre, token, id}, secreta)
}


const resolvers = {
    Query: {
        obtenerAnalisis: async (_, {}, ctx) => {
            const analisis = await Analisis.find({ cliente: ctx.usuario.id })
            return analisis
        }
    },
    Mutation: {
        createUser: async(_, {input}) => {
            const { nombre, token } = input;

            const existeUsuario = await Usuarios.findOne({ token })

            if (existeUsuario) {
                throw new Error('Este token ya existe')
            }

            try {
                const nuevoUsuario = new Usuarios(input);
                console.log(nuevoUsuario);

                nuevoUsuario.save()
                return "Usuario creado 🥳: " + "token: " + token + ", " + nombre
            } catch (error) {
                console.log(error);
            }
        },
        authUser: async(_, {input}) => {
            const { token } = input;

            // 1 El token existe
            const existeUsuario = await Usuarios.findOne({ token })

            if (!existeUsuario) {
                throw new Error('El token es incorrecto.')
            }

            return {
                token: crearToken(existeUsuario, process.env.SECRETA)
            }
        },
        nuevoAnalisis: async(_, {input}, ctx) => {
            
            try {
                const analisis = new Analisis(input);

                // Asociamos el id del cliente
                analisis.cliente = ctx.usuario.id;

                // Guardamos en la DB
                const resultado = await analisis.save()
                return resultado
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers