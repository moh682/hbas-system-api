"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
let pool;
exports.default = {
    getPool: () => {
        if (pool)
            return pool;
        pool = mysql_1.default.createPool({
            host: 'localhost',
            user: 'hbas',
            password: 'salah',
            database: 'hbas_system'
        });
        return pool;
    }
};
