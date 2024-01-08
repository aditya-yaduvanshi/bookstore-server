export interface Book {
  _id: string;
  title: string;
  cover: string;
  description: string;
  price: number;
  isPublished: boolean;
  publishedBy: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
