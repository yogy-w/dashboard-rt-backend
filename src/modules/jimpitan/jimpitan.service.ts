import { Injectable } from '@nestjs/common';
import { SheetsService } from '../sheets/sheets.service';

@Injectable()
export class JimpitanService {
  constructor(private readonly sheets: SheetsService) {}

  async getData() {
    const values = await this.sheets.getValues(process.env.GOOGLE_SHEET_JIMPITAN_RANGE || 'DATA_JIMPITAN!A:G');
    const rows = values.slice(1).map((r: any[]) => ({
      tanggal: this.parseDate(r[0]), tahun: Number(r[1]) || 0, bulan: String(r[2] || ''),
      kategori: String(r[3] || ''), keterangan: String(r[4] || ''), tipe: String(r[5] || '').toUpperCase(),
      total: this.toNumber(r[6]),
    })).filter((r: any) => r.tanggal || r.tahun || r.bulan || r.kategori || r.keterangan || r.total);
    return { rows, years: [...new Set(rows.map(r => r.tahun).filter(Boolean))].sort((a,b)=>b-a) };
  }

  private parseDate(v: any) {
    if (v === '' || v == null) return null;
    if (typeof v === 'number') return new Date(Date.UTC(1899, 11, 30) + v * 86400000).toISOString().slice(0,10);
    const d = new Date(v); return isNaN(d.getTime()) ? String(v) : d.toISOString().slice(0,10);
  }
  private toNumber(v: any) {
    if (typeof v === 'number') return v;
    const s = String(v ?? '').replace(/[^0-9-]/g, ''); return Number(s) || 0;
  }
}
