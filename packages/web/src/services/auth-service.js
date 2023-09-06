import { Amplify, Auth } from "aws-amplify";
import { CognitoStack } from "../../../cdk/outputs.json";

export default function AuthService() {

  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: "us-east-1",
      userPoolId: CognitoStack.UserPoolId,
      userPoolWebClientId: CognitoStack.UserPoolClientId,
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
