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
const express_1 = __importDefault(require("express"));
const router = express_1.default();
// ! LoginFacade
const loginFacade_1 = require("../facade/loginFacade");
router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let { username, password } = req.body;
    let token;
    token = yield loginFacade_1.login(username, password);
    if (token !== undefined) {
        res.json({ token });
    }
    else {
        res.sendStatus(401);
    }
}));
exports.default = router;
