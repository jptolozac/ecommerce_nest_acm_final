import { Test, TestingModule } from '@nestjs/testing';
import { CarritoProductoService } from './carrito-producto.service';

describe('CarritoProductoService', () => {
  let service: CarritoProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarritoProductoService],
    }).compile();

    service = module.get<CarritoProductoService>(CarritoProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
