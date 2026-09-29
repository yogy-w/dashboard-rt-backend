import { Controller, Get } from '@nestjs/common';
import { JimpitanService } from './jimpitan.service';

@Controller('jimpitan')
export class JimpitanController {
  constructor(private readonly service: JimpitanService) {}
  @Get()
  getData() { return this.service.getData(); }
}
