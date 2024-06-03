import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_CLIENT } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_CLIENT) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(
        this.ordersClient.send({ cmd: 'createOrder' }, createOrderDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send({ cmd: 'findAllOrders' }, orderPaginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.ordersClient.send({ cmd: 'findOneOrder' }, id),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return await firstValueFrom(
        this.ordersClient.send(
          { cmd: 'changeOrderStatus' },
          { id, status: statusDto.status },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
