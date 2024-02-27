import { Router } from "express";
import { Voiture } from "..";

export const voitureRouter = Router();

voitureRouter.get("/", async (req, res) => {
    const voitures = await Voiture.findAll();
    res.json(voitures);
});

voitureRouter.get("/:id", async (req, res) => {
    const voiture = await Voiture.findOne({ where: { id: req.params.id } });
    if (voiture) {
        res.json(voiture);
    }
    else {
        res.status(404).send("Car not found");
    }
});

voitureRouter.post("/", async (req, res) => {
    console.log('post a voiture');
    
    const { marque, modele, annee, couleur } = req.body.data;
    if(!marque || !modele || !annee|| !couleur){
        res.status(400).send("Missing required information");
    }
    else {
        const newVoiture = await Voiture.create({ marque, modele, annee, couleur });
        res.json(newVoiture);
    }
});

voitureRouter.put("/:id", async (req, res) => {
    const { marque, modele, annee, couleur } = req.body.data;
    const actual = await Voiture.findOne({ where: { id: req.params.id } });
    if (actual) {
        const newVoiture = await actual.update({ marque, modele, annee, couleur });
        res.json(actual);
    }
    else {
        res.status(404).send("Car not found");
    }
});

voitureRouter.delete("/:id", async (req, res) => {
    const actual = await Voiture.findOne({ where: { id: req.params.id } });
    if (actual) {
        await actual.destroy();
        res.json(actual);
    }
    else {
        res.status(404).send("Car not found");
    }
});