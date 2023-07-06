// export default function AuthService() {
//   // To do

//   return {
//     // API
//   };
// }

import { Amplify, Auth } from "aws-amplify";
import { CdkStackUserMgmtStackAuthStack14D453C0 as AuthStack } from "../../../cdk/outputs.json";

export default function AuthService() {

  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: "us-east-1",
      userPoolId: AuthStack.C3UserPoolId,
      userPoolWebClientId: AuthStack.C3UserPoolClientId,
      authenticationFlowType: "USER_PASSWORD_AUTH"
    }
  })

  async function login(username, password) {
    try {
      const result = await Auth.signIn(username, password);
      return result;
    } catch (error) {
      console.error(error)
      return undefined;
    }
  }

  return ({
    login
  });
}
