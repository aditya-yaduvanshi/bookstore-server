import mongoose from "mongoose";

export interface Book {
  _id: string;
  title: string;
  cover: string;
  description: string;
  price: number;
  isPublished: boolean;
  publishedBy: string;
  author: string;
}

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 200,
    },
    cover: String,
    description: {
      type: String,
      maxLength: 2000,
    },
    author: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 64,
    },
    price: {
      type: Number,
      min: 0,
      max: 9999999999
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("books", BookSchema);

export default BookModel;
