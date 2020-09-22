<template>
  <masonry-layout-c title="Order Management">
    <!-- List of orders -->
    <masonry-layout-tile-c section="List of orders">
      <form  @submit.prevent="listOrders">
        <div class="mB-10">Are you looking for any orders?</div>
        <div class="form-group peers">
          <input
            type="search"
            class="form-control"
            id="search-list-orders"
            name="search-list-orders"
            placeholder="Enter Search..."
            v-model="listOrdersForm.search"
            required
          />
        </div>

        <div class="form-group peers">
        <div class="">Start Date</div>
          <input
            type="date"
            class="form-control"
            id="date-start-list-orders"
            name="date-start-list-orders"
            v-model="listOrdersForm.dateStart"
            required
          />
        </div>

        <div class="form-group peers">
        <div class="">End Date</div>
          <input
            type="date"
            class="form-control"
            id="date-end-list-orders"
            name="date-end-list-orders"
            v-model="listOrdersForm.dateEnd"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">Show Orders!</button>
      </form>

      <ul class="listOrdersResult">
        <ul class="itemList" v-for="item in listOrdersForm.result" :key="item.id">
          <li>
            Internal ID (paypal): {{ item.paypalOrderId }}
          </li>
          <li>
            ID: {{ item.id }}
          </li>
          <li>
            Buyer: {{ item.buyer }}
          </li>
          <li>
            Cart: {{ item.cart }}
          </li>
          <li>
            Date: {{ item.date }}
          </li>
          <li>
            GTC: {{ item.confirmedGtc }}
          </li>
          <li>
            Newsletter: {{ item.subscribedNewsletter }}
          </li>
          <li>
            License Agreement sent?: {{ item.sentLicenseAgreements }}
          </li>
          <li>
            Confirmation sent?: {{ item.sentConfirmation }}
          </li>
          <li>
            Donload links sent?: {{ item.sentDownloadLinks }}
          </li>
        </ul>
      </ul>
    </masonry-layout-tile-c>

    <!-- Receive Order -->
    <masonry-layout-tile-c section="Receive Order">
      <form  @submit.prevent="getOrder">
        <div class="mB-10">Fill in a submitted order ID</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="get-order"
            name="get-order"
            placeholder="Enter Submission ID..."
            v-model="orderId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Get!</button>
      </form>

      <ul v-if="showGetOrderResult" class="listOrdersResult">
        <li>
          Internal ID (paypal): {{ orderResult.paypalOrderId }}
        </li>
        <li>
          ID: {{ orderResult.id }}
        </li>
        <li>
          Buyer: {{ orderResult.buyer }}
        </li>
        <li>
          Cart: {{ orderResult.cart }}
        </li>
        <li>
          Date: {{ orderResult.date }}
        </li>
        <li>
          GTC: {{ orderResult.confirmedGtc }}
        </li>
        <li>
          Newsletter: {{ orderResult.subscribedNewsletter }}
        </li>
        <li>
          License Agreement sent?: {{ orderResult.sentLicenseAgreements }}
        </li>
        <li>
          Confirmation sent?: {{ orderResult.sentConfirmation }}
        </li>
        <li>
          Donload links sent?: {{ orderResult.sentDownloadLinks }}
        </li>
      </ul>
    </masonry-layout-tile-c>

    <!-- Delete Order -->
    <masonry-layout-tile-c section="Delete Order">
      <form  @submit.prevent="deleteOrder">
        <div class="mB-10">Fill in a submitted order ID</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="delete-order"
            name="delete-order"
            placeholder="Enter Submission ID..."
            v-model="deleteOrderId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Delete!</button>
      </form>
    </masonry-layout-tile-c>
  </masonry-layout-c>
</template>

<script lang="ts">
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { Component, Vue } from "vue-property-decorator";
import MasonryLayoutC from "../components/MasonryLayout.vue";
import MasonryLayoutTileC from "../components/MasonryLayoutTile.vue";
import { DeleteOrderRequest, GetOrderRequest, ListOrdersRequest } from "../generated/models/grpc/cms_pb";
import { Buyer } from "../generated/models/payment/buyer_pb";
import { Cart, InternalOrder, Order } from "../generated/models/payment/order_pb";
import { ContentManagementModule } from "../store/modules/cms";

interface ListOrdersForm {
  search: string;
  dateStart: Date;
  dateEnd: Date;
  result: Array<InternalOrderResult>;
}

interface InternalOrderResult {
  paypalOrderId: string, 
  sentConfirmation: boolean,
  sentDownloadLinks: boolean,
  sentLicenseAgreements: boolean,
  id: string,
  buyer: Buyer,
  cart: Cart,
  date: Date,
  confirmedGtc: boolean,
  subscribedNewsletter: boolean,
}

@Component({
  name: "OrderManagement",
  components: {
    MasonryLayoutC,
    MasonryLayoutTileC
  }
})
export default class OrderManagement extends Vue {
  protected orderId = "";
  protected showGetOrderResult = false;
  protected deleteOrderId = "";

  orderResult : InternalOrderResult = {
    paypalOrderId: "", 
    sentConfirmation: false,
    sentDownloadLinks: false,
    sentLicenseAgreements: false,
    id: "",
    buyer: new Buyer(),
    cart: new Cart(),
    date: new Date(),
    confirmedGtc: false,
    subscribedNewsletter: false,
  };

  listOrdersForm : ListOrdersForm = {
    search: "",
    dateStart: new Date(),
    dateEnd: new Date(),
    result: [],
  };

  listOrders() {
    // Build request 
    var request : ListOrdersRequest = new ListOrdersRequest();

    request.setSearch(this.listOrdersForm.search)

    var time : Timestamp = new Timestamp();
    time.fromDate(this.listOrdersForm.dateStart);
    request.setFrom(time);
    time.fromDate(this.listOrdersForm.dateEnd);
    request.setTo(time);


    // send request
    ContentManagementModule.listOrders(request).then(
      (result : InternalOrder[]) => {
        result.forEach((value: InternalOrder) => {
          let requestResult : InternalOrderResult = this.createInternalOrderResult(value);
          this.listOrdersForm.result.push(requestResult);
        });
        alert("Successfully queried")
      },
      (error) => {
        alert("Failed to query")
      }
    );
  }

  getOrder() {
    // Build request 
    var request : GetOrderRequest = new GetOrderRequest();
    request.setOrderId(this.orderId);

    // send request
    ContentManagementModule.getOrder(request).then(
      (result: InternalOrder) => {
        this.orderResult = this.createInternalOrderResult(result)
        this.showGetOrderResult = true;
        alert("Successfully queried")
      },
      (error) => {
        alert("Failed to query")
      }
    );
  }

  deleteOrder() {
    // Build request 
    var request : DeleteOrderRequest = new DeleteOrderRequest();
    request.setOrderId(this.orderId);

    // send request
    ContentManagementModule.deleteOrder(request).then(
      (result) => {
        alert("Successfully deleted")
      },
      (error) => {
        alert("Failed to delete")
      }
    );
  }

  createInternalOrderResult(value: InternalOrder): InternalOrderResult {
    var dateResult : Date = value?.getOrder()?.getDate()?.toDate() ?? new Date();

    return {
      paypalOrderId: value.getPaypalOrderId(),
      sentConfirmation: value.getSentConfirmation(),
      sentDownloadLinks: value.getSentDownloadLinks(),
      sentLicenseAgreements: value.getSentLicenseAgreements(),
      id: value?.getOrder()?.getId() ?? "",
      buyer: value?.getOrder()?.getBuyer() ?? new Buyer(),
      cart: value?.getOrder()?.getCart() ?? new Cart(),
      date: dateResult,
      confirmedGtc: value?.getOrder()?.getConfirmedGtc() ?? false,
      subscribedNewsletter: value?.getOrder()?.getSubscribedNewsletter() ?? false,
    }
  }

}
</script>

<style lang="sass" scoped>
  .listOrdersResult
    list-style-type: none
    margin: 0
    padding: 0
    list-style-position: outside

  .itemList
    border-bottom: 1px solid white
    padding: 10px  

</style>