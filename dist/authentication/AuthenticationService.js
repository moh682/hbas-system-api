"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
let env = dotenv.config().parsed;
const logger_1 = __importDefault(require("../logger"));
let authenticate = (request, response, next) => {
    let token;
    token = request.header('hbas_authentication');
    if (token === "")
        response.sendStatus(403);
    if ((typeof token) === 'string') {
        let obj;
        try {
            obj = jsonwebtoken_1.default.verify(token, env.SECRET);
        }
        catch (error) {
            if (error)
                logger_1.default.error(error);
            response.sendStatus(403);
        }
        if (obj) {
            next();
        }
    }
};
exports.authenticate = authenticate;
