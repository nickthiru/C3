// export default function AuthService() {
//   // To do

//   return {
//     // API
//   };
// }

import { Amplify, Auth } from "aws-amplify";

export default function AuthService() {

  Amplify.configure({
    Auth: {
      region: "us-east-1",
      userPoolId: "us-east-1_39qiGdVu3",
      userPoolWebClientId: "31j5srsrau4faftut5sfnskm9j",
      authenticationFlowType: "USER_PASSWORD_AUTH"
    }
  })

  async function login(username, password) {
    const result = await Auth.signIn(username, password);
    return result;
  }

  return ({
    login
  });
}
