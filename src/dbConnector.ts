import mongoose from 'mongoose';
import colors from 'colors';
import { MongoError } from 'mongodb';

const connect = (uri: string) => {
  return mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
}

mongoose.connection.on('connected', () => {
  console.log(colors.bgGreen('Mongoose Connected'));
});

mongoose.connection.on('disconnected', () => {
  console.log(colors.bgYellow('Mongoose Disconnected'));
})

mongoose.connection.once('error', (error) => {
  console.log(colors.bgRed('Mongoose default connection error: ') + error);
});

export default connect;