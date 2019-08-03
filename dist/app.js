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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const colors_1 = __importDefault(require("colors"));
const body_parser_1 = __importDefault(require("body-parser"));
const ENV = __importStar(require("dotenv"));
let env;
if (ENV.config().parsed)
    env = ENV.config().parsed;
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
// import userRouter from './routes/userRouter';
const dbConnector_1 = __importDefault(require("./dbConnector"));
const AuthenticationService_1 = require("./authentication/AuthenticationService");
const logger_1 = __importDefault(require("./logger"));
let connection = dbConnector_1.default.getPool();
connection.getConnection((err) => {
    if (err)
        logger_1.default.error(err);
    console.log(colors_1.default.green('SQL Connection has been Established!'));
});
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use('/login', loginRouter_1.default);
app.use(AuthenticationService_1.authenticate);
app.use('/', indexRouter_1.default);
// app.use('/login', loginRouter);
// app.use('/users', userRouter);
app.listen(env.PORT ? env.PORT : 5000, () => console.log(`Running on port: ${env.PORT ? env.PORT : 5000} `));
