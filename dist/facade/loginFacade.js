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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const userMapper_1 = __importDefault(require("../db/userMapper"));
const { getUser: getUserFromDB } = userMapper_1.default;
const bcrypt_1 = require("bcrypt");
const logger_1 = __importDefault(require("../logger"));
const settings_1 = require("../settings");
/**
 * Used to login
 * @param user
 * @returns String | undefined
 * @success String
 * @failed undefined
 */
const login = (username, password) => __awaiter(this, void 0, void 0, function* () {
    let user;
    let token;
    try {
        user = yield getUserFromDB(username);
        if (user) {
            let correct = yield comparePassword(password, user.password);
            if (correct) {
                // todo: CREATE TOKEN
                token = yield createToken({
                    user: {
                        email: user.email,
                        username: user.username,
                        role: user.role
                    }
                });
                return Promise.resolve(token);
            }
            else {
                logFailedAttempt(user, { username, password }); // ? logs the failed password input and user
            }
        }
    }
    catch (err) {
        logger_1.default.log('error', JSON.stringify(err));
    }
});
exports.login = login;
/**
 * Log Failed Login Attempts
 * @param user Information from Database
 * @param userInput Input with body request
 */
const logFailedAttempt = (user, userInput) => {
    let { username, password } = userInput;
    logger_1.default.log('info', JSON.stringify({
        user: JSON.stringify({ id: user.id, username: user.username, email: user.email }),
        msg: 'Incorrect Login Credentials',
        input: JSON.stringify({ username, password })
    }));
};
/**
 * @param information object inserted in the token
 * @returns string
 */
const createToken = (information) => {
    return jsonwebtoken_1.sign(information, settings_1.secret, {
        expiresIn: '1h',
        algorithm: 'HS256'
    });
};
/**
 *
 * @param userPassword password from request
 * @param dbPassword encrypted password from database
 * @returns Promise<boolean> if correct = true else false
 */
const comparePassword = (userPassword, dbPassword) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.compare(userPassword, dbPassword, (err, same) => {
            if (err) {
                return reject(err);
            }
            return resolve(same);
        });
    }));
});
