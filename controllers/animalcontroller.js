const express = require("express");
const router = express.Router();
const { Animal } = require("../models");
// const validateJWT = require("../middleware/validate-jwt");

//! Find/get all animals
router.get("/", async (req, res) => {
    try {
        const animalEntries = await Animal.findAll();
        res.status(200).json(animalEntries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//! Create Animal
router.post("/create", async (req, res) => {
    const { name, legNumber, predator } = req.body.animal;
    // const { id } = req.user
    const animalEntry = {
        name,
        legNumber,
        predator
        // owner: id
    }
    try {
        const newAnimal = await Animal.create(animalEntry);
        res.status(200).json({newAnimal, message: "animal created"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
    Animal.create(animalEntry)
});

//! Delete an entry
router.delete("/delete/:id", async (req, res) => {
    const animalId = req.params.id;
    console.log(animalId)
    try {
        const query = {
            where: {
                id: animalId
            }
        };

        await Animal.destroy(query);
        res.status(200).json({ message: "Animal Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//! Update an animal
router.put("/update/:id",  async (req, res) => {
    const { name, legNumber, predator } = req.body.animal;
    const animalId = req.params.id;

    const query = {
        where: {
            id: animalId,
        }
    };

    const updatedAnimal = {
        name: name,
        legNumber: legNumber,
        predator: predator
    };

    try {
        const update = await Animal.update(updatedAnimal, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;