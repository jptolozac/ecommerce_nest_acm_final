import { Module } from '@nestjs/common';
import { CategoriaService } from './servicios/categoria.service';
import { CategoriaController } from './controladores/categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entidades/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriaController]
})
export class CategoriaModule {}
