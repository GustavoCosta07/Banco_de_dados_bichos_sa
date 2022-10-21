const express = require('express')
const routes = express.Router()
const UserController = require('../controllers/UserController')


routes.post('/users', UserController.createUser)
  


routes.delete('/users/:id', (request, response) => {
    const id = request.params.id

    const newDb = db.filter(item => {
        const ehMesmoId = item.id == id
        if (!ehMesmoId) {
            return item
        }
    })
    db = newDb
    return response.send(newDb)

})

routes.put("/users/:id", function (request, response) {
    const body = request.body

    const camposPermitidos = ['name', 'password', 'email']

    for (const campo of camposPermitidos) {
        if (!body[campo]) {
            return response.status(400).json({
                error: `O campo "${campo}" deve ser preenchido`
            })
        }
    }

    const { name } = body

    if (name.length < 3) {
        return response.status(400).json({
            error: `O campo "name" deve ser maior que 2 caracteres`
        })
    }

    let { id } = request.params

    const user = db.filter(item => {

        if (item.id == id) {
            return item
        }
    })
    if (user.length == 0) {
        return response.status(404).json({
            error: `Usuário não encontrado`
        })
    }
    body.id = user[0].id
    db[id - 1] = body
    response.send(body)
});


module.exports = routes
