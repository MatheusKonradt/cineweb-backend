import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly data: any;

  constructor() {
    const config = fs.readFileSync(process.env.CONFIG_FILE_PATH);
    this.data = JSON.parse(config.toString());
  }

  get<T>(name: string): T {
    const val = _.get(this.data, name);
    if (typeof val === 'undefined') {
      throw new Error(`[CONFIG] path "${name}" not found.`);
    }
    return val;
  }
}
