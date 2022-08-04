const express = require('express')
const routes = express.Router()
const emailValidator = require('email-validator')
const mysql = require('../mysql').pool

let db = []

routes.get('/users', (request, response) => {
    return response.json(db)
})

routes.post('/users', (request, response) => {
    // const name = request.body.name
    // const  password = request.body.password
    // const { name, password } = request.body
    const body = request.body

    const camposPermitidos = ['name', 'password', 'email', 'telefone']

    for (const campo of camposPermitidos) {
        if (!body[campo]) {
            return response.status(400).json({
                error: `O campo "${campo}" deve ser preenchido`
            })
        }
    }

    const { password } = body

    if (password.length < 6) {
        return response.status(400).json({
            error: `O campo "password" deve ter no mínimo 6 caracteres`
        })
    }

    const { name } = body

    if (name.length < 3) {
        return response.status(400).json({
            error: `O campo "name" deve ser maior que 2 caracteres`
        })
    }

    const { telefone } = body

    if (telefone.length < 9) {
        return response.status(400).json({
            error: `O campo "telefoneDono" deve ser preenchido com no mínimo 9 números`
        })
    }

    const { email } = body
    
    if (!emailValidator.validate(email)) {
        return response.status(400).json({
            error: `O email inserido não é válido`
        })
    }
    
    body.id = db.length + 1

    mysql.getConnection((error, conn)=> {
        conn.query(
            'INSERT INTO produtos (id, name, email, password) VALUES (?,?)'
            [request.body.name, request.body.email, request.body.password],
            (error, resultados, field) => {
                conn.release()
                if (error) {
                   return response.status(500).send({
                        error: error,
                        responde: null 
                    })
                } 
                response.status(201).send({
                    id_usuario: resultados.insertID
                })
            }
        )
    })

    db.push(body)

    response.status(200).json(body)
})

routes.get('/users/:id', (request, response) => {
    const id = request.params.id

    let user = db.filter(item => {
        if (item.id == id) {
            return item
        }
    })
   
    return response.send(user[0] || null)

})

routes.delete('/users/:id', (request, response) => {
    const id = request.params.id

    const newDb = db.filter(item => {
        const  ehMesmoId = item.id == id
        if (!ehMesmoId) {
            return item
        }
    })
    db = newDb
    return response.send(newDb)

})

routes.put("/users/:id", function(request, response) {
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
        
        if (item.id == id ) {
            return item
        } 
    })
    if (user.length == 0) {
        return response.status(404).json({
            error: `Usuário não encontrado`
        })
    }
    body.id = user[0].id
    db[id -1] = body
    response.send(body)
  });
  

module.exports = routes
