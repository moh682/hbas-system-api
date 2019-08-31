import * as mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { IUser } from '../src/interfaces/IUser';
import app from '../src/app';
import UserMapper from '../src/models/dataMappers/Account.Mapper';
import AccountMapper from '../src/models/dataMappers/Account.Mapper';
/**
 * Authentication Testing 
 * Logic regarding Authentication testing
 * ! node dist/app.js & npm run build;
 */

chai.use(chaiHttp);
var { expect } = chai;
const user: IUser = {
   email: 'test@authentication.test',
   password: 'secret'
}
describe("Authentication Testing ", function (this: mocha.Suite) {
   this.timeout('5s');

   it('Test for Forbidden Access', function (done) {
      chai.request(app)
         .get('/')
         .end(function (error, response) {
            expect(response).to.have.status(403);
            done();
         }
         );
   });

   it('Test for forbidden login attempt', function (done) {
      // Test login
      chai.request(app)
         .post('/auth/login')
         .send(user)
         .end(
            function (error, response) {
               expect(response).to.have.status(404);
               done();
            }
         )
   });

   it('Test Registration of new user', function (done) {
      chai.request(app)
         .post('/auth/register')
         .set('Content-Type', "application/json")
         .send(user)
         .end(
            function (error, response) {
               expect(response.body.token).to.not.be.null;
               expect(response).to.have.status(200);
               done();
            }
         )
   })

   it('Test for Successfull login attempt', function (done) {
      // Test login
      chai.request(app)
         .post('/auth/login')
         .send(user)
         .end(
            function (error, response) {
               let { token } = response.body;
               expect(response).to.have.status(200);
               expect(token).not.to.be.undefined
               done();
            }
         )
   });

   it('deletes test user', async function () {
      const accountMapper = new AccountMapper();
      let confirmed = await accountMapper.deleteAccount(user.email as string);
      expect(confirmed).to.be.true;
   })
});