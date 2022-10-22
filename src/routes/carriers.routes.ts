// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Carrier from "../models/carrier";

// Global Config
export const carriersRouter = express.Router();

carriersRouter.use(express.json());

// GET
carriersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const carriers = (await collections.carriers.find({}).toArray()) as Carrier[];

        res.status(200).send(carriers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

carriersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const carrier = (await collections.carriers.findOne(query)) as Carrier;

        if (carrier) {
            res.status(200).send(carrier);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
carriersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const result = await collections.carriers.insertOne(newCarrier);

        result
            ? res.status(201).send(`Successfully created a new carrier with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new carrier.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
carriersRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCarrier: Carrier = req.body as Carrier;
        const query = { _id: new ObjectId(id) };

        const result = await collections.carriers.updateOne(query, { $set: updatedCarrier });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
carriersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.carriers.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed carrier with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove carrier with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Carrier with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
