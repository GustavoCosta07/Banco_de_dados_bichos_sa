const BuilderValidator = require('../validators/BuilderValidator')

class UserController {
    // constructor() {
    //     console.log('invocando construtor')
    // }
    async createUser(request, response) {
        
        const dataType = {
            name: {
                required: true,
                minLength: 3
            },
            password: {
                required: true
            },
            email: {
                required: true
            },
            telefone: {
                required: true,
                minLength: 9
            }
        }
        const body = request.body

        const builderValidator = new BuilderValidator(dataType)
        const error = builderValidator.validate(body)

        if (error) {
            return response.status(400).json({ error: error.message })
        }


        // const { password } = body


        // const { telefone } = body

        // if (telefone.length < 9) {
        //     return response.status(400).json({
        //         error: `O campo "telefone" deve ser preenchido com no mínimo 9 números`
        //     })
        // }

        // const { email } = body

        // if (!emailValidator.validate(email)) {
        //     return response.status(400).json({
        //         error: `O email inserido não é válido`
        //     })
        // }
        // mysql.getConnection((error, conn) => {

        //     if (error) {
        //         return response.send("error")
        //     }

        //     const { name, email, password } = request.body;

        //     conn.query(
        //         'INSERT INTO user SET ?',
        //         {
        //             nome: name,
        //             email,
        //             password
        //         },
        //         (error, user, field) => {
        //             conn.release()
        //             if (error) {
        //                 return response.status(500).send({
        //                     error: error,
        //                     response: null
        //                 })
        //             }
        //             response.status(200).send({
        //                 id_usuario: user.insertID
        //             })
        //         }
        //     )
        // })
    }
}
module.exports = new UserController()