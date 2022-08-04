const express = require('express')
const routes = express.Router()
const obterCep = require ('cep-promise')

let db = []

routes.get('/pets', (request, response) => {
    return response.json(db)
})

routes.get('/pets/:id', (request, response) => {
    const id = request.params.id

    let user = db.filter(item => {
        if (item.idAnimal == id) {
            return item
        }
    })

    return response.send(user[0] || null)

})


routes.post('/pets', (request, response) => {
    const body = request.body

    const camposPermitidos = ['especie', 'nome', 'descricao', 'idade']

    for (const campo of camposPermitidos) {
        if (!body[campo]) {
            return response.status(400).json({
                error: `O campo "${campo}" deve ser preenchido`
            })
        }
    }

    const { nome } = body

    if (nome.length < 1) {
        return response.status(400).json({
            error: `O campo "nome" deve ser maior que 1 caracteres`
        })
    }

    let { especie } = body

    const especiesPermitidas = ["cachorro", "gato", "passaro"]

    if (!especiesPermitidas.includes(especie)) {
        return response.status(400).json({
            error: `O campo "espécie" deve ser preenchido com uma espécie válida, são elas: cachorro, gato, passaro`
        })
    }

    const { descricao } = body

    if (descricao.length < 10) {
        return response.status(400).json({
            error: `detalhe mais sobre o animal`
        })
    }


    body.id = db.length + 1


    db.push(body)

    response.status(200).json(body)

})

routes.delete('/pets/:id', (request, response) => {
    const id = request.params.id

    const newDb = db.filter(item => {
        const ehMesmoId = item.idAnimal == id
        if (!ehMesmoId) {
            return item
        }
    })
    db = newDb
    return response.send(newDb)

})

routes.get('/cep/:cep', async (req, res) => {
    const cep = req.params.cep;

    const VerificaSeNaoEnumero = isNaN(cep)

    if (VerificaSeNaoEnumero) {
        return res.status(400).json({
            error: `O cep deve conter apenas números`
        })
    }
    
    if (cep.length != 8) {
        return res.status(400).json({
            error: `O cep deve conter 8 números`
        })
    }

    let resposta = null

    try {
        const result = await obterCep(cep)
        resposta = result
    } catch (error) {
        resposta = {
            error: 'CEP nao encontrado'
        }
    }

    res.status(200).json(resposta)

})

routes.put("/pets/:id", function(request, response) {
    const body = request.body

    const camposPermitidos = ['especie', 'nome', 'descricao', 'idade', 'cep']

    for (const campo of camposPermitidos) {
        if (!body[campo]) {
            return response.status(400).json({
                error: `O campo "${campo}" deve ser preenchido`
            })
        }
    }

    const { nome } = body

    if (nome.length < 1) {
        return response.status(400).json({
            error: `O campo "nome" deve ser maior que 1 caracteres`
        })
    }

    let { especie } = body

    const especiesPermitidas = ["cachorro", "gato", "passaro"]

    if (!especiesPermitidas.includes(especie)) {
        return response.status(400).json({
            error: `O campo "espécie" deve ser preenchido com uma espécie válida, são elas: cachorro, gato, passaro`
        })
    }

    const { descricao } = body

    if (descricao.length < 10) {
        return response.status(400).json({
            error: `detalhe mais sobre o animal`
        })
    }

   

    let { id } = request.params

    const animal = db.filter(item => {
        
        if (item.id == id ) {
            return item
        } 
    })

    if (animal.length == 0) {
        return response.status(404).json({
            error: `Usuário não encontrado`
        })
    }
    body.id = animal[0].id
    db[id -1] = body
    response.send(body)
  });



module.exports = routes