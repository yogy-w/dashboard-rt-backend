import { Injectable } from '@nestjs/common';
import { SheetsService } from '../sheets/sheets.service';

@Injectable()
export class KasService {
  constructor(private readonly sheets: SheetsService) {}

  async getDetail() {
    const values = await this.sheets.getValues('DETAIL!A:E');
    const rows = values.slice(1).map((r: any[]) => ({ bulan: String(r[0] || ''), tanggal: String(r[1] || ''), kategori: String(r[2] || ''), keterangan: String(r[3] || ''), total: this.toNumber(r[4]) })).filter((r:any)=>r.tanggal || r.kategori || r.keterangan || r.total);
    return { rows };
  }

  async getData() {
    const values = await this.sheets.getValues(process.env.GOOGLE_SHEET_RANGE || 'DATA!A:E');
    const rows = values.slice(1).map((r: any[]) => ({
      tahun: Number(r[0]) || 0,
      bulan: String(r[1] || ''),
      kategori: String(r[2] || ''),
      tipe: String(r[3] || '').toUpperCase(),
      total: this.toNumber(r[4]),
    })).filter((r: any) => r.tahun || r.bulan || r.kategori || r.total);
    return { rows, years: [...new Set(rows.map(r => r.tahun).filter(Boolean))].sort((a,b)=>b-a) };
  }

  private toNumber(v: any) {
    if (typeof v === 'number') return v;
    const s = String(v ?? '').replace(/[^0-9-]/g, '');
    return Number(s) || 0;
  }
}
