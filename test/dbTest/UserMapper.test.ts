import * as mocha from 'mocha';
import { expect } from 'chai';
import colors from 'colors'

import connection from '../../src/models/dbConnector';
import UserMapper from '../../src/models/dataMappers/Users.Mapper';
import { IUser } from '../../src/interfaces/IUser';



describe(colors.blue('UserMapper functions Testing\n'), function () {

   this.timeout(5000); // ? Set Timeout to 5 sec.  
   var userMapper: UserMapper;

   before("Opening Connection to DB", function (next) {

      connection.connect(function (error) {
         if (error) {
            console.log(error)
         } else {
            userMapper = new UserMapper(connection);
            console.log(colors.green('Before All: connection Opened'))
            next();
         }
      })
   })

   it('Test AddUser()', async function () {
      let user = {
         email: "mocha.test@test.dk",
         password: 'secret',
      } as IUser;
      let result = await userMapper.addUser(user)
         .then((value) => {
            return value as any;
         })
         .catch((error) => { console.log(error) });

      expect(result.email, "email").to.be.equal(user.email as string, 'mocha.test@test.dk');
      expect(result.role, 'role').to.be.equal('user', 'user');
   })

   it('check UserExist() on exist', async function () {
      let result = await userMapper.UserExist("mocha.test@test.dk");
      expect(result, 'db user').to.be.true;
   })

   it('Test getUserByEmail() when exist', async function () {
      let result = await userMapper.getUserByEmail("mocha.test@test.dk");
      expect(result.email, 'user.email').to.be.equal('mocha.test@test.dk');
      expect(result.role, 'user.role').to.be.equal('user');
      expect(result.password, 'user.password').to.be.not.undefined;
   })

   it('Test DeleteUser()', async function () {
      let result = await userMapper.deleteUser("mocha.test@test.dk");
      expect(result, 'db result').to.be.true;
   })

   it('Test getUserByEmail() when deleted', async function () {
      let result = await userMapper.getUserByEmail("mocha.test@test.dk");
      expect(result, 'user').to.be.undefined;
   })

   it('check UserExist() on deleted', async function () {
      let result = await userMapper.UserExist("mocha.test@test.dk");
      expect(result, 'db user').to.be.false;
   })

})