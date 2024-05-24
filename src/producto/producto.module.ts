import { Module } from '@nestjs/common';
import { ProductoController } from './controladores/producto.controller';
import { ProductoService } from './servicios/producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entidades/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService]
})
export class ProductoModule {}
