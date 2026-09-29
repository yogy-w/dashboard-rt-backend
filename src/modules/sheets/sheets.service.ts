import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SheetsService {
  private client?: sheets_v4.Sheets;

  private async getClient() {
    if (this.client) return this.client;
    if (process.env.GOOGLE_SHEETS_ENABLED !== 'true') throw new InternalServerErrorException('Google Sheets disabled');
    const keyFile = path.resolve(process.cwd(), process.env.GOOGLE_SERVICE_ACCOUNT_KEY || './google-service-account.json');
    if (!fs.existsSync(keyFile)) throw new InternalServerErrorException(`Service account file not found: ${keyFile}`);
    const auth = new google.auth.GoogleAuth({ keyFile, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
    this.client = google.sheets({ version: 'v4', auth });
    return this.client;
  }

  async getValues(range: string) {
    const sheets = await this.getClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new InternalServerErrorException('GOOGLE_SHEET_ID is missing');
    const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    return result.data.values || [];
  }
}
