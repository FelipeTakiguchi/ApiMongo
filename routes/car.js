const express = require('express');
const router = express.Router();

router
    .get('/api/cars', async (req, res) => {
        try {
            const car = await Car.find();
            return res.status(200).send({ data: car });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })
    .get('/api/cars/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const car = await Car.findById(id);

            if (!person)
                return res.status(404).send({ message: "Person not found" })
            return res.status(200).json(car);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })
    .post('/api/cars', async (req, res) => {
        const { nome, marca, preco } = req.body;

        if (!nome || !marca || !preco)
            return res.status(400).send({ message: "Dados inválidos" })

        const car = {
            nome: nome,
            marca: marca,
            preco: preco,
        }

        try {
            const c = await Car.create(car);
            return res.status(201).send({ message: "Carro inserido com sucesso", body: c });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })
    .patch('/api/cars/:id', async (req, res) => {
        const { id } = req.params;
        const car = req.body;

        if (!id)
            return res.status(400).send({ message: "No id provider" })

        if (!car.nome || !car.marca || !car.preco)
            return res.status(400).send({ message: "Dados inválidos" })

        try {
            const c = await Car.findByIdAndUpdate(id, car);
            return res.status(201).send({ message: `Carro no index ${id} atualizado!`, c });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })
    .delete('/api/cars/:id', async(req, res) => {
        const { id } = req.params;

        if (!id)
            return res.status(400).send({ message: "No id provider" })

        try {
            await Car.findByIdAndRemove(id);
            return res.status(200).send({ message: `Carro no index ${id} excluido!` });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Something failled" })
        }

    })

module.exports = router