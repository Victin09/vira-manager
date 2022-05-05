import { User } from "@vira/models/user.model";
import { SignIn, SignUp } from "@vira/models/auth.model";

export interface AuthContextProps {
  error: string;
  getUser: () => User | void;
  signin: (data: SignIn) => void;
  signup: (data: SignUp) => void;
}
