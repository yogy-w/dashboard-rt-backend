import { Controller, Get } from '@nestjs/common';
import { KasService } from './kas.service';

@Controller('kas')
export class KasController {
  constructor(private readonly service: KasService) {}
  @Get()
  getData() { return this.service.getData(); }

  @Get('detail')
  getDetail() { return this.service.getDetail(); }
}
