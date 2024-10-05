import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should create a new book', () => {
    const bookDto: CreateBookDto = {
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2023-01-01',
    };
    const book = service.create(bookDto);
    expect(book).toHaveProperty('id');
    expect(book.title).toBe(bookDto.title);
  });

  it('should return all books', () => {
    service.create({
      title: 'Test Book 1',
      author: 'Test Author 1',
      publishedDate: '2023-01-01',
    });
    service.create({
      title: 'Test Book 2',
      author: 'Test Author 2',
      publishedDate: '2023-01-01',
    });
    const books = service.findAll();
    expect(books.length).toBe(2);
  });

  it('should return a single book by ID', () => {
    const bookDto = {
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2023-01-01',
    };
    const book = service.create(bookDto);
    const foundBook = service.findOne(book.id);
    expect(foundBook).toEqual(book);
  });

  it('should update a book', () => {
    const bookDto = {
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2023-01-01',
    };
    const book = service.create(bookDto);
    const updatedBook = service.update(book.id, {
      title: 'Updated Book',
      author: 'Updated Author',
      publishedDate: '2023-01-02',
    });
    expect(updatedBook.title).toBe('Updated Book');
  });

  it('should delete a book', () => {
    const bookDto = {
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2023-01-01',
    };
    const book = service.create(bookDto);
    const result = service.remove(book.id);
    expect(result).toBe(true);
  });
});
