import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,  // An array of authors to support multiple authors
        required: true
    },

    genre: {
        type: [String],  // An array of genres to support multiple categories
        required: true
    },
    summary: {
        type: String,
        trim: true
    },
    pages: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        trim: true,
        default: ""
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
}, { timestamps: true });

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;
