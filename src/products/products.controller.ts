import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  createProduct() {
    return 'crea un producto';
  }

  @Get()
  findAllProducts() {
    return '';
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return '';
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return '';
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string) {
    return '';
  }
}
