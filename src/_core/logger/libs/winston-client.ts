import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { inspect, InspectOptions } from 'util';
import { EnvNameEnum } from '../../common/env-name.enum';

const CONSOLE_LOG_INSPECT_OPTIONS: InspectOptions = {
  colors: true,
  depth: null,
  showHidden: false,
};

const FILE_LOG_INSPECT_OPTS: InspectOptions = {
  depth: 5,
  compact: true,
};

const fileLogFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(entry => {
    return `[[${entry.timestamp}|${entry.level}|${entry.context}]]\n${inspect(
      entry.message,
      FILE_LOG_INSPECT_OPTS,
    )}`;
  }),
);

const consoleLogFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(entry => {
    return `\n[${entry.level}] ${entry.timestamp} - ${entry.context}\n${inspect(
      entry.message,
      CONSOLE_LOG_INSPECT_OPTIONS,
    )}`;
  }),
);

const transports: any[] = [
  new DailyRotateFile({
    filename: 'logs/server-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    format: fileLogFormat,
  }),
];

if (process.env.NODE_ENV === EnvNameEnum.DEVELOPMENT) {
  transports.push(
    new winston.transports.Console({
      format: consoleLogFormat,
    }),
  );
}
export const winstonClient = winston.createLogger({
  transports,
});
