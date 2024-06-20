import { Category } from "./category";

export interface Book {
    id: number;
    bookName: string;
    author: string;
    category: Category;
    numberOfPages: number;
    description: string;
    imgUrl: string;

}