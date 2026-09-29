import { Module } from '@nestjs/common';
import { SheetsModule } from '../sheets/sheets.module';
import { KasService } from './kas.service';
import { KasController } from './kas.controller';

@Module({ imports: [SheetsModule], providers: [KasService], controllers: [KasController] })
export class KasModule {}
