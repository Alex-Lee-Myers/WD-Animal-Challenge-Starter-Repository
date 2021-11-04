const express = require("express");
const router = express.Router();
const { Animal } = require("../models");
let validateJWT = require("../middleware/validateSession");

//! Find/get all animals
router.get("/", validateJWT, async (req, res) => {
    const { id } = req.user
    try {
        const query = {
            where: {
                userID: id
            }
        };
        const animalEntries = await Animal.findAll();
        res.status(200).json(animalEntries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// validateJWT
//! Create Animal
router.post("/create", validateJWT, async (req, res) => {
    const { name, legNumber, predator } = req.body.animal;
    const { id } = req.user
    console.log(id)
    const animalEntry = {
        name,
        legNumber,
        predator,
        userID: id
    }
    try {
        const newAnimal = await Animal.create(animalEntry);
        res.status(200).json({newAnimal, message: "animal created"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
    // Animal.create(animalEntry)
});

//! Delete an entry
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const animalId = req.params.id;
    const { id } = req.user
    console.log(id)
    console.log(animalId)
    try {
        const query = {
            where: {
                id: animalId,
                userID: id
            }
        };

        await Animal.destroy(query);
        res.status(200).json({ message: "Animal Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//! Update an animal
router.put("/update/:id", validateJWT, async (req, res) => {
    const { name, legNumber, predator } = req.body.animal;
    const animalId = req.params.id;
    const { id } = req.user
    
    const query = {
        where: {
            id: animalId,
            userID: id
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