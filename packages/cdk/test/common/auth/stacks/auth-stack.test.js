const { AuthService } = require("../../../lib/common/auth/src/auth-service");

async function testAuth() {
  const authServ = new AuthService();
  const loginResult = authServ.login("username", "password");

  console.log(`(+) loginResult: ${loginResult}`);
}