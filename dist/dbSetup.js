"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnector_1 = __importDefault(require("./dbConnector"));
const colors_1 = __importDefault(require("colors"));
let pool = dbConnector_1.default.getPool();
const startSetup = () => {
    let sql = `USE hbas_systems;`;
    pool.query(sql, (err, result) => {
        if (err.errno === 1049) {
            // -- if unknown database
            let sql = `CREATE DATABASE hbas_system;`;
            pool.query(sql, (err, result) => {
                if (err && err.errno !== 1007)
                    console.log(err);
            });
        }
        else {
            console.log(colors_1.default.green('Table USERS Created! '));
        }
    });
};
exports.default = startSetup;
