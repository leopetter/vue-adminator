import { ContentManagementClient } from "@/generated/models/grpc/CmsServiceClientPb";
import { StockQueryClient } from "@/generated/models/grpc/StockServiceClientPb";
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
  StockRequestAssets,
  AddStockResult,
  StockRequestAsset
} from "@/generated/models/grpc/cms_pb";
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
import { Error, Status, ClientReadableStream } from "grpc-web";
import { AuthModule } from "./auth";
import { MailData } from '@/generated/models/grpc/internal/mail_pb';
import { Empty } from '@/generated/models/grpc/results_pb';
import { StockItemDescriptor } from '@/generated/models/grpc/stock_pb';
import { Stock } from '@/generated/models/stock/stock_pb';

export interface IContentManagementState {
  client: ContentManagementClient;
  stockQueryClient: StockQueryClient;
}

@Module({ dynamic: true, store, name: "user" })
class ContentManagement extends VuexModule implements IContentManagementState {
  public client = new ContentManagementClient("/api/grpc/cms", null, null);
  public stockQueryClient = new StockQueryClient("/api/grpc/stock", null, null);

  /* Manage beats and audio stock data */
  @Action({ rawError: true })
  public async rankStock(): Promise<Empty> {
    return new Promise<Empty>((resolve, reject) => {
      this.client.rankStock(new Empty(), AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
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
      this.client.checkStock(new Empty(), AuthModule.authHeader, (err: any, response: CheckStockSummary | PromiseLike<CheckStockSummary> | undefined) => {
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

  // Query stock data in order to update
  @Action({ rawError: true })
  public async getStockItem(request: StockItemDescriptor): Promise<Stock> {
    return new Promise<Stock>((resolve, reject) => {
      this.stockQueryClient.getStockItem(request, AuthModule.authHeader, (err: any, response: Stock | PromiseLike<Stock> | undefined) => {
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
      this.client.updateStockMetadata(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
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
  public async listStockRequests(request: ListStockRequestsRequest): Promise<StockRequest[]> {
    return new Promise<StockRequest[]>((resolve, reject) => {
      const srl : StockRequest[] = [];
      const stream = this.client.listStockRequests(request, undefined);
      stream.on("data", (item: unknown) => {
        if(item instanceof StockRequest) srl.push(item);
      });
      stream.on("error", (err: Error) => {
        reject(err);
      });
      stream.on("end", () => {
        resolve(srl);
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
  public async downloadStockRequestAssets(request: DownloadStockRequestAssetsRequest): Promise<StockRequestAsset[]> {
    return new Promise<StockRequestAsset[]>((resolve, reject) => {
      const sral : StockRequestAsset[] = [];
      const stream = this.client.downloadStockRequestAssets(request, undefined);
      stream.on("data", (item: unknown) => {
        if(item instanceof StockRequestAsset) sral.push(item);
      });
      stream.on("error", (err: Error) => {
        reject(err);
      });
      stream.on("end", () => {
        resolve(sral);
      });
    });
  }

  /* Access orders */
  @Action({ rawError: true })
  public async listOrders(request: ListOrdersRequest): Promise<InternalOrder[]> {
    return new Promise<InternalOrder[]>((resolve, reject) => {
      const ol : InternalOrder[] = [];
      const stream = this.client.listOrders(request, undefined);
      stream.on("data", (item: unknown) => {
        if(item instanceof InternalOrder) ol.push(item);
      });
      stream.on("error", (err: Error) => {
        reject(err);
      });
      stream.on("end", () => {
        resolve(ol);
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
  public async listDownloadLinks(request: ListDownloadLinksRequest): Promise<Download[]> {
    return new Promise<Download[]>((resolve, reject) => {
      const dl : Download[] = [];
      const stream = this.client.listDownloadLinks(request, undefined);
      stream.on("data", (item: unknown) => {
        if(item instanceof Download) dl.push(item);
      });
      stream.on("error", (err: Error) => {
        reject(err);
      });
      stream.on("end", () => {
        resolve(dl);
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
      this.client.sendEmailToAllUsers(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
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
      this.client.sendOrderLicenseAgreements(request, AuthModule.authHeader, (err: any, response: Empty | PromiseLike<Empty> | undefined) => {
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