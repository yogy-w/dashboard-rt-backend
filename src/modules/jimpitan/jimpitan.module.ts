import { Module } from '@nestjs/common';
import { SheetsModule } from '../sheets/sheets.module';
import { JimpitanService } from './jimpitan.service';
import { JimpitanController } from './jimpitan.controller';

@Module({ imports: [SheetsModule], providers: [JimpitanService], controllers: [JimpitanController] })
export class JimpitanModule {}
