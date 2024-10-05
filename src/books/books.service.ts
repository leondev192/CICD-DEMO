import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private idCounter = 1;

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.idCounter++,
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    return this.books.find((book) => book.id === id);
  }

  update(id: number, updateBookDto: CreateBookDto): Book {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex > -1) {
      this.books[bookIndex] = { id, ...updateBookDto };
      return this.books[bookIndex];
    }
    return null;
  }

  remove(id: number): boolean {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex > -1) {
      this.books.splice(bookIndex, 1);
      return true;
    }
    return false;
  }
}
