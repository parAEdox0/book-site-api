import express from "express";
import bookModel from "../models/books.js";
import mongoose from "mongoose";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await bookModel.find();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("No books matched your request")
        }
        const book = await bookModel.findById(req.params.id)
        if (!book) {
            throw new Error("Book not found")
        }
        res.json(book)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

});

router.post("/", async (req, res) => {
    const { title, author, genre, summary, pages, rating } = req.body;
    try {
        const book = await bookModel.create({
            title,
            author,
            genre,
            summary,
            pages,
            rating
        });
        res.status(200).json(book);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Book not found to delete")
        }
        const bookToDelete = await bookModel.findByIdAndDelete(req.params.id);
        if (!bookToDelete) {
            throw new Error("Book not found")
        }
        res.json({ deleted: bookToDelete })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

router.patch("/:id", async (req, res) => {

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Book not found to update")
        }
        const updatedBook = await bookModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
        if (!updatedBook) {
            throw new Error("Book not found")
        }
        res.json(updatedBook)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

export default router;