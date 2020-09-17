import {
  Metadata,
  Request,
  UnaryResponse,
  ClientReadableStream
} from "grpc-web";
import { AuthModule } from "./auth";

export class UnaryAuthInterceptor {
  intercept<REQ, RESP>(
    request: Request<REQ, RESP>,
    invoker: (request: Request<REQ, RESP>) => Promise<UnaryResponse<REQ, RESP>>
  ): Promise<UnaryResponse<REQ, RESP>> {
    // Update the request metdata before the RPC.
    const md = request.getMetadata() as Metadata;
    md["user-token"] = AuthModule.authToken ?? "";
    return invoker(request);
  }
}

export class StreamAuthInterceptor {
  intercept<REQ, RESP>(
    request: Request<REQ, RESP>,
    invoker: (request: Request<REQ, RESP>) => ClientReadableStream<RESP>
  ): ClientReadableStream<RESP> {
    // Update the request metdata before the RPC.
    const md = request.getMetadata() as Metadata;
    md["user-token"] = AuthModule.authToken ?? "";
    return invoker(request);
  }
}