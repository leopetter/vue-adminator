import { ContentManagementClient } from "@/generated/models/grpc/CmsServiceClientPb";
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
  ListDownloadLinksRequest,
  GetDownloadLinkRequest,
  SetRemainingDownloadsRequest,
  ListOrdersRequest,
  DeleteOrderRequest,
  GetOrderRequest,
  SendOrderConfirmationRequest,
  SendOrderDownloadLinksRequest,
  SendOrderLicenseAgreementsRequest,
  GenerateOrderLicenseAgreementsRequest,
  GenerateOrderReceiptRequest,
  SinglePDFResult,
  MultiplePDFResult,
  EmailMessage,
  ListStockRequestsRequest,
  DeleteStockRequestRequest,
  DownloadStockRequestAssetsRequest,
  StockRequestAsset,
  StockRequestAssets,
  AddStockResult
} from "@/generated/models/grpc/CmsServiceClientPb";
import {
  CheckStockSummary,
  AddStockRequest,
  UpdateStockMetadataRequest,
  ReprocessStockRequest,
  UpdateArtworkRequest
} from "@/generated/models/grpc/internal/metronome_pb";
import {
  StockRequest
} from "@/generated/models/submission/submission_pb";
import {
  InternalOrder
} from "@/generated/models/payment/order_pb";
import {
  Download
} from "@/generated/models/download/download_pb";
import { Error, StatusCode } from "grpc-web";
import { AuthModule } from "./auth";
import { MailData } from '@/generated/models/grpc/internal/mail_pb';
import { Empty } from '@/generated/models/grpc/results_pb';

export interface IContentManagementState {
  client: ContentManagementClient;
}

@Module({ dynamic: true, store, name: "user" })
class ContentManagement extends VuexModule implements IContentManagementState {
  public client = new ContentManagementClient("/api/grpc/cms", null, null);

  /* Manage beats and audio stock data */
  @Action({ rawError: true })
  public async rankStock(): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.rankStock(AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async checkStock(): Promise<CheckStockSummary> {
    return new Promise<CheckStockSummary>((resolve, reject) => {
      this.client.checkStock(AuthModule.authHeader, (err: any, response: CheckStockSummary | PromiseLike<CheckStockSummary> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async addStock(request: AddStockRequest): Promise<AddStockResult> {
    return new Promise<AddStockResult>((resolve, reject) => {
      this.client.addStock(request, AuthModule.authHeader, (err: any, response: AddStockResult | PromiseLike<AddStockResult> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async updateStockMetaData(request: UpdateStockMetadataRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.updateStockMetaData(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async reprocessStock(request: ReprocessStockRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.reprocessStock(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async updateArtwork(request: UpdateArtworkRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.updateArtwork(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
  
  /* Access user submission */
  @Action({ rawError: true })
  public async listStockRequests(request: ListStockRequestsRequest): Promise<StockRequest> {
    return new Promise<StockRequest>((resolve, reject) => {
      this.client.listStockRequests(request, AuthModule.authHeader, (err: any, response: StockRequest | PromiseLike<StockRequest> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async deleteStockRequests(request: DeleteStockRequestRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.deleteStockRequests(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async downloadStockRequestAssets(request: DownloadStockRequestAssetsRequest): Promise<StockRequestAsset> {
    return new Promise<StockRequestAsset>((resolve, reject) => {
      this.client.downloadStockRequestAssets(request, AuthModule.authHeader, (err: any, response: StockRequestAsset | PromiseLike<StockRequestAsset> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  /* Access orders */
  @Action({ rawError: true })
  public async listOrders(request: ListOrdersRequest): Promise<InternalOrder> {
    return new Promise<InternalOrder>((resolve, reject) => {
      this.client.listOrders(request, AuthModule.authHeader, (err: any, response: InternalOrder | PromiseLike<InternalOrder> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async getOrder(request: GetOrderRequest): Promise<InternalOrder> {
    return new Promise<InternalOrder>((resolve, reject) => {
      this.client.getOrder(request, AuthModule.authHeader, (err: any, response: InternalOrder | PromiseLike<InternalOrder> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async deleteOrder(request: DeleteOrderRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.deleteOrder(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  /* Access download links */
  @Action({ rawError: true })
  public async listDownloadLinks(request: ListDownloadLinksRequest): Promise<Download> {
    return new Promise<Download>((resolve, reject) => {
      this.client.listDownloadLinks(request, AuthModule.authHeader, (err: any, response: Download | PromiseLike<Download> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async getDownloadLink(request: GetDownloadLinkRequest): Promise<Download> {
    return new Promise<Download>((resolve, reject) => {
      this.client.getDownloadLink(request, AuthModule.authHeader, (err: any, response: Download | PromiseLike<Download> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }


  @Action({ rawError: true })
  public async setRemainingDownloads(request: SetRemainingDownloadsRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.setRemainingDownloads(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  /* Generate licenses, order receipts etc. on demand */
  @Action({ rawError: true })
  public async generateOrderLicenseAgreements(request: GenerateOrderLicenseAgreementsRequest): Promise<MultiplePDFResult> {
    return new Promise<MultiplePDFResult>((resolve, reject) => {
      this.client.generateOrderLicenseAgreements(request, AuthModule.authHeader, (err: any, response: MultiplePDFResult | PromiseLike<MultiplePDFResult> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async generateOrderReceipt(request: GenerateOrderReceiptRequest): Promise<SinglePDFResult> {
    return new Promise<SinglePDFResult>((resolve, reject) => {
      this.client.generateOrderReceipt(request, AuthModule.authHeader, (err: any, response: SinglePDFResult | PromiseLike<SinglePDFResult> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  /* Send Emails */
  @Action({ rawError: true })
  public async sendEmailToAllUsers(request: EmailMessage): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.setRemainingDownloads(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async sendEmail(request: MailData): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.sendEmail(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async sendOrderConfirmation(request: SendOrderConfirmationRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.sendOrderConfirmation(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async sendOrderDownloadLinks(request: SendOrderDownloadLinksRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.sendOrderDownloadLinks(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  @Action({ rawError: true })
  public async sendOrderLicenseAgreement(request: SendOrderLicenseAgreementsRequest): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.sendOrderLicenseAgreement(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }


}

export const ContentManagementModule = getModule(ContentManagement);