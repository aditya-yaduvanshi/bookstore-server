import { Response } from "express";
import { AuthRequest } from "@/types/auth";
import { PublishBookSchema } from "@/utils/validations";
import BookModel, { Book } from "@/models/books.model";

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
      data: {
        title: book.title,
        description: book.description,
        cover: book.cover,
        price: book.price,
        author: book.author,
        isPublised: book.isPublished,
        publishedBy: book.publishedBy,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      },
    });
  } catch (err) {
    console.log("Publish book error:", err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
