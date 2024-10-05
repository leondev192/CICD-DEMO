import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new book', () => {
    const bookDto: CreateBookDto = {
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2023-01-01',
    };
    jest.spyOn(service, 'create').mockImplementation(() => ({
      id: 1,
      ...bookDto,
    }));
    expect(controller.create(bookDto)).toEqual({ id: 1, ...bookDto });
  });

  it('should return all books', () => {
    const result = [
      {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: '2023-01-01',
      },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);
    expect(controller.findAll()).toBe(result);
  });

  it('should return a single book by ID', () => {
    const bookDto = {
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2023-01-01',
    };
    jest.spyOn(service, 'findOne').mockImplementation(() => ({
      id: 1,
      ...bookDto,
    }));
    expect(controller.findOne('1')).toEqual({ id: 1, ...bookDto });
  });

  it('should update a book', () => {
    const bookDto = {
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2023-01-01',
    };
    jest.spyOn(service, 'update').mockImplementation(() => ({
      id: 1,
      ...bookDto,
    }));
    expect(controller.update('1', bookDto)).toEqual({ id: 1, ...bookDto });
  });

  it('should delete a book', () => {
    jest.spyOn(service, 'remove').mockImplementation(() => true);
    expect(controller.remove('1')).toBe(true);
  });
});
