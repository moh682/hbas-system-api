import * as mocha from 'mocha';
import { expect } from 'chai';
import colors from 'colors'

import AccountMapper from '../../src/models/dataMappers/Account.Mapper';
import { IUser } from '../../src/interfaces/IUser';

let user = {
   email: "mocha.test@test.dk",
   password: 'secret',
} as IUser;
describe(colors.blue('AccountMapper functions Testing\n'), function () {

   this.timeout(5000); // ? Set Timeout to 5 sec.  
   var accountMapper: AccountMapper = new AccountMapper();

   it('Test AddAccount()', function (done) {
      accountMapper.addAccount(user)
         .then((result) => {
            expect(result.email, "email").to.be.equal(user.email as string, 'mocha.test@test.dk');
            expect(result.role).to.be.equal('user');
            done();
         })
         .catch((error) => { console.log(error) });
   })

   it('check AccountExist() on exist', async function () {
      let result = await accountMapper.accountExist(user.email as string);
      expect(result, 'db user').to.be.true;
   })

   it('Test getAccountByEmail() when exist', async function () {
      let result = await accountMapper.getAccountByEmail(user.email as string);
      expect(result.email, 'user.email').to.be.equal(user.email);
      expect(result.role, 'user.role').to.be.equal('user');
      expect(result.password, 'user.password').to.be.not.undefined;
   })

   it('Test DeleteAccount() when exist', async function () {
      let confirmed: boolean = await accountMapper.deleteAccount(user.email as string);
      expect(confirmed).to.be.true;
      expect(confirmed).not.to.be.false;
   })

   it('Test DeleteAccount() when doesn\'t exist', async function () {
      let result = await accountMapper.deleteAccount("mocasdasdha.teasdadst@testasdasd.asaddk");
      expect(result, 'db result').to.be.false;
   })

   it('Test getAccountByEmail() when deleted', async function () {
      let result = await accountMapper.getAccountByEmail(user.email as string);
      expect(result, 'user').to.be.undefined;
   })

   it('check AccountExist() on deleted', async function () {
      let result = await accountMapper.accountExist(user.email as string);
      expect(result, 'db user').to.be.false;
   })

})