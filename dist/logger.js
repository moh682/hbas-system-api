"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const { combine, timestamp, prettyPrint } = winston_1.format;
const app_root_path_1 = __importDefault(require("app-root-path"));
const logger = winston_1.default.createLogger({
    exceptionHandlers: new winston_1.default.transports.File({ filename: 'exceptions.log', dirname: app_root_path_1.default + '/logs' }),
    transports: [
        new winston_1.default.transports.File({
            filename: 'error.log',
            dirname: app_root_path_1.default.path + '/logs',
            level: 'error',
            format: combine(timestamp(), prettyPrint())
        }),
        new winston_1.default.transports.File({
            filename: 'info.log',
            dirname: app_root_path_1.default.path + '/logs',
            level: 'info',
            format: combine(timestamp(), prettyPrint())
        }),
        new winston_1.default.transports.File({
            filename: 'debug.log',
            dirname: app_root_path_1.default.path + '/logs',
            level: 'debug',
            format: combine(timestamp(), prettyPrint())
        })
    ]
});
exports.default = logger;
