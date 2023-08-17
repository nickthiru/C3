import { Amplify, Auth } from "aws-amplify";

import { CdkStack } from "../../../cdk/outputs.json";

const userPoolId = CdkStack.AuthServiceUserPoolId68A34E5E;
const userPoolClientId = CdkStack.AuthServiceUserPoolClientId28CC5FDA;


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
