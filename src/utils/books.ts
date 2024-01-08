import { Book } from "@/types/book";

export const getBookFields = (book: Book) => ({
  _id: book._id,
  title: book.title,
  description: book.description,
  cover: book.cover,
  price: book.price,
  author: book.author,
  isPublised: book.isPublished,
  publishedBy: book.publishedBy,
  createdAt: book.createdAt,
  updatedAt: book.updatedAt,
});
