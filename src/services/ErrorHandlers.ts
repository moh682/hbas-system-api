import { ErrorHandlerBase } from '../interfaces/ErrorHandler.Interface';
import logger from '../logger';

class ErrorHandler {

   public mySqlQueryErrorHandler(name: string, location: string, exception: any) {
      let object: ErrorHandlerBase = {
         name,
         location,
         exception
      }
      logger.error(object);
   }

   public logFailedAttempt(user: any, userInput: { email: string; password: string; }): void {
      let { email, password } = userInput;
      logger.log(
         'info',
         JSON.stringify({
            user: JSON.stringify({ id: user.id, email: user.email }),
            msg: 'Incorrect Login Credentials',
            input: JSON.stringify({ email, password })
         })
      );
   };

}

let ExceptionHandler = new ErrorHandler();
export default ExceptionHandler;