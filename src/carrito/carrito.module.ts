import { Module } from '@nestjs/common';
import { CarritoController } from './controladores/carrito.controller';
import { CarritoService } from './servicios/carrito.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entidades/carrito.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { CarritoProducto } from './entidades/carritoProducto.entity';
import { CarritoProductoService } from './servicios/carrito-producto.service';
import { PedidoModule } from 'src/pedido/pedido.module';
import { ProductoModule } from 'src/producto/producto.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, CarritoProducto]), UsuarioModule, PedidoModule, ProductoModule],
  controllers: [CarritoController],
  providers: [CarritoService, CarritoProductoService]
})
export class CarritoModule {}
