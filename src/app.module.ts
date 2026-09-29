import { Module } from '@nestjs/common';
import { SheetsModule } from './modules/sheets/sheets.module';
import { KasModule } from './modules/kas/kas.module';
import { JimpitanModule } from './modules/jimpitan/jimpitan.module';

@Module({ imports: [SheetsModule, KasModule, JimpitanModule] })
export class AppModule {}
