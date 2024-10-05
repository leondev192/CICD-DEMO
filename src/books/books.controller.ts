import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BooksService, Book } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book {
    return this.booksService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto): Book {
    return this.booksService.update(Number(id), updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.booksService.remove(Number(id));
  }
}
