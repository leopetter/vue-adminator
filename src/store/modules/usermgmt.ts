import { UserManagementClient } from "@/generated/models/grpc/UsermgmtServiceClientPb";
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import router from "@/router";
import Vue from "vue";
import {
  GetUserRequest,
  UpdateUserRequest,
  AddUserRequest,
  RemoveUserRequest
} from "@/generated/models/grpc/usermgmt_pb";
import { User } from "@/generated/models/internal/user_pb";
import { Error, StatusCode } from "grpc-web";
import { AuthModule } from "./auth";
import { Empty } from '@/generated/models/grpc/results_pb';

export interface IUserManagementState {
  client: UserManagementClient;
  currentUser?: User | null;
}

@Module({ dynamic: true, store, name: "user" })
class UserManagement extends VuexModule implements IUserManagementState {
  public client = new UserManagementClient("/api/grpc/usermgmt", null, null);
  public currentUser?: User | null = null;

  @Mutation
  public setCurrentUserEmail(email: string | null): void {
    if (email && email != "") {
      if (this.currentUser == undefined) {
        this.currentUser = new User();
      }
      this.currentUser.setEmail(email);
    } else {
      this.currentUser = undefined;
    }
  }

  @Action({ rawError: true })
  public async addUser(request: AddUserRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.addUser(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async updateUser(request: UpdateUserRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.updateUser(
        request,
        AuthModule.authHeader,
        (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  @Action({ rawError: true })
  public async getUser(request: GetUserRequest): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.client.getUser(request, AuthModule.authHeader, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async loadCurrentUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.currentUser == undefined) {
        reject({ code: StatusCode.UNAUTHENTICATED, message: "Not logged in" });
      } else {
        let req = new GetUserRequest();
        req.setEmail(this.currentUser.getEmail());
        this.getUser(req)
          .then(user => resolve(user))
          .catch(err => reject(err));
      }
    });
  }

  @Action({ rawError: true })
  public async removeUser(request: RemoveUserRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.removeUser(
        request,
        AuthModule.authHeader,
        (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        }
      );
    });
  }
}

export const UserManagementModule = getModule(UserManagement);