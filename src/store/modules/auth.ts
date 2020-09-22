import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { AuthenticationClient } from "@/generated/models/grpc/AuthServiceClientPb";
import store from "@/store";
import router from "@/router";
import Vue from "vue";
import { Error, StatusCode } from "grpc-web";
import { UserManagementModule } from "./usermgmt";
import {
  LoginRequest,
  Token
} from "@/generated/models/grpc/auth_pb";
import { UnaryAuthInterceptor, StreamAuthInterceptor } from "./interceptor";

export interface IAuthState {
  client: AuthenticationClient;
  authToken: string;
  userID: string;
  authState: AuthenticationState | null;
  appAllowsRegister: boolean;
}

enum AuthenticationState {
  Loading,
  Failed,
  Authenticated
}

@Module({ dynamic: true, store, name: "auth" })
class Auth extends VuexModule implements IAuthState {
  public client = new AuthenticationClient("/api/grpc/auth", null, {
    unaryInterceptors: [new UnaryAuthInterceptor()],
    streamInterceptors: [new StreamAuthInterceptor()]
  });
  public appAllowsRegister = false;
  public authToken = "";
  public userID = "";
  public authState: AuthenticationState | null = null;

  get isAuthenticated(): boolean {
    return !!this.authToken;
  }

  get authHeader(): { Authorization: string } {
    return { Authorization: `Bearer ${this.authToken}` };
  }

  @Mutation
  private setAuthState(status: AuthenticationState | null): void {
    this.authState = status;
  }

  @Mutation
  public setAuthToken(token: string): void {
    this.authToken = token;
    Vue.cookies.set("user-token", token, { expires: Infinity });
  }

  @Mutation
  public setUserID(userID: string): void {
    this.userID = userID;
  }

  @Action({ rawError: true })
  public async authRequest(
    request: LoginRequest
  ): Promise<Token> {
    return new Promise<Token>((resolve, reject) => {
      this.setAuthState(AuthenticationState.Loading);
      this.client.login(request, null, (err: any, response: { getToken: () => any; getUserId: () => any; getExpiration: () => any; getEmail: () => any; }) => {
        if (err) {
          this.setAuthState(AuthenticationState.Failed);
          Vue.cookies.remove("user-token");
          Vue.cookies.remove("user-id");
          Vue.cookies.remove("user-email");
          reject(err);
        } else {
          let token = response.getToken();
          let userID = response.getUserId();
          this.setAuthToken(token);
          this.setUserID(userID?.getId() ?? "");
          this.setAuthState(AuthenticationState.Authenticated);
          if (request.getRemember() == true) {
            Vue.cookies.set("user-token", token, {
              expires: response.getExpiration()
            });
            Vue.cookies.set("user-email", response.getEmail(), {
              expires: response.getExpiration()
            });
            Vue.cookies.set("user-id", userID?.getId() ?? "", {
              expires: response.getExpiration()
            });
          }
          Vue.axios.defaults.headers.common["Authorization"] = token;
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public authLogout() {
    Vue.cookies.remove("user-token");
    Vue.cookies.remove("user-email");
    Vue.cookies.remove("user-id");
    delete Vue.axios.defaults.headers.common["Authorization"];
    this.setAuthToken("");
    this.setUserID("");
    UserManagementModule.setCurrentUserEmail("");
    this.setAuthState(null);
    router.push({ name: "login" });
  }
}

export const AuthModule = getModule(Auth);