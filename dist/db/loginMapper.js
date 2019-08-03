"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dbConnector_1 = __importDefault(require("../dbConnector"));
const connection = dbConnector_1.default.getPool();
const createUser = (user) => __awaiter(this, void 0, void 0, function* () {
    let { username, password } = user;
    connection.query(`
    INSERT INTO USERS username = ? , password = ?;`, [username, password], (error, result, fields) => {
        if (error)
            console.log('error', error);
        if (result)
            console.log('result', result);
        if (fields)
            console.log('fields', fields);
    });
    return user;
});
const getUser = (user) => {
    let { username, password } = user;
    connection.query(` 
    INSERT INTO USERS username = ? , password = ?;`, [username, password], (error, result, fields) => {
        if (error)
            console.log('error', error);
        if (result)
            console.log('result', result);
        if (fields)
            console.log('fields', fields);
    });
    return null;
};
module.exports = {
    createUser,
    getUser
};
