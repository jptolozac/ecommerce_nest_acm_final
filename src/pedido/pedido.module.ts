import { Module, forwardRef } from '@nestjs/common';
import { PedidoController } from './controladores/pedido.controller';
import { PedidoService } from './servicios/pedido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entidades/pedido.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { CarritoModule } from 'src/carrito/carrito.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]), 
    UsuarioModule, 
    forwardRef(() => CarritoModule)
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService]
})
export class PedidoModule {}
