import { Amplify, Auth } from "aws-amplify";

import { CdkStackAuthStack65D3C934 } from "../../../cdk/outputs.json";

const userPoolId = CdkStackAuthStack65D3C934.UserPoolId;
const userPoolClientId = CdkStackAuthStack65D3C934.UserPoolClientId;


export default function AuthService() {

  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: "us-east-1",
      userPoolId: userPoolId,
      userPoolWebClientId: userPoolClientId,
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
