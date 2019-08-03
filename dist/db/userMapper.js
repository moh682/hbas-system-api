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
const db = dbConnector_1.default.getPool();
const colors_1 = __importDefault(require("colors"));
const logger_1 = __importDefault(require("../logger"));
const createUser = (user) => __awaiter(this, void 0, void 0, function* () {
    let sql = 'INSERT INTO USERS SET username=?, password=?, email=?';
    const { username, password, email } = user;
    try {
        let result = yield queryExecutor(sql, [username, password, email]);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
});
const getUser = (username) => __awaiter(this, void 0, void 0, function* () {
    let user;
    let sql = 'SELECT * FROM `USERS` WHERE username=?';
    let post = [username];
    try {
        user = yield queryExecutor(sql, post).then((users) => {
            user = users.length !== 0 ? (user = users[0]) : undefined;
            return user;
        });
        return Promise.resolve(user);
    }
    catch (err) {
        console.log('err in getUser', colors_1.default.red(err));
        return Promise.reject(err);
    }
});
const getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
    let sql = 'SELECT * FROM `USERS`';
    let array = [];
    try {
        array = yield queryExecutor(sql);
        return array;
    }
    catch (err) {
        Promise.reject(err);
        return array;
    }
});
const queryExecutor = (sqlStatement, input) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            db.query(sqlStatement, input, (err, result) => {
                if (err)
                    reject(mysqlErrorHandler(err));
                resolve(result);
            });
        }
        catch (err) {
            throw new Error(err);
        }
    });
});
/**
 *
 * @param err MYSQL ERROR
 * @returns Error Code Number
 * ? Example: 1062 --> Duplicate
 */
const mysqlErrorHandler = (err) => {
    logger_1.default.log('error', JSON.stringify(err));
    return err.errno;
};
module.exports = {
    createUser,
    getUser,
    getAllUsers
};
