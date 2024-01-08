import { Response } from "express";
import { AuthRequest } from "@/types/auth";
import { Book } from "@/types/book";
import { PublishBookSchema } from "@/utils/validations";
import BookModel from "@/models/books.model";
import { getBookFields } from "@/utils/books";

export const publishBook = async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body as Pick<
      Book,
      "author" | "cover" | "description" | "price" | "title"
    >;
    const currentUser = req.user!;

    const { error } = PublishBookSchema.validate(body);
    if (error) return res.status(400).json({ error: error.message });

    const book = await BookModel.create({
      title: body.title,
      description: body.description,
      cover: body.cover,
      price: body.price,
      author: body.author,
      publishedBy: currentUser._id,
    });

    if (!book)
      return res.status(500).json({
        error: "Cannot publish at the moment. Please try again later.",
      });

    return res.status(201).json({
      data: getBookFields(book as unknown as Book),
    });
  } catch (err) {
    console.log("Publish book error:", err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

export const getPublishedBooks = async (_req: AuthRequest, res: Response) => {
  try {
    const books = await BookModel.find({ isPublished: true });
    return res.status(200).json({
      data: books.map((book) => getBookFields(book as unknown as Book)),
    });
  } catch (err) {
    console.log("Get published books error:", err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

export const getUserPublishedBooks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const currentUser = req.user!;
    const books = await BookModel.find({
      isPublished: true,
      publishedBy: currentUser._id,
    });
    return res.status(200).json({
      data: books.map((book) => getBookFields(book as unknown as Book)),
    });
  } catch (err) {
    console.log("Get user published books error:", err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

export const searchBooks = async (req: AuthRequest, res: Response) => {
  try {
    const title = req.query.title;
    if (!title || typeof title !== "string")
      return res.status(400).json({ error: "Title must be a valid string" });

    const books = await BookModel.find({
      isPublished: true,
      title: { $regex: new RegExp(title, "i") },
    });
    return res.status(200).json({
      data: books.map((book) => getBookFields(book as unknown as Book)),
    });
  } catch (err) {
    console.log("Search books error:", err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
