<template>
  <masonry-layout-c title="User Submissions">
    <!-- List of all user stock requests -->
    <masonry-layout-tile-c section="List of stock requests">
      <form  @submit.prevent="listStockRequests">
        <div class="mB-10">Are you looking for any request someone send you?</div>
        <div class="form-group peers">
          <input
            type="search"
            class="form-control"
            id="search-list-stock-request"
            name="search-list-stock-request"
            placeholder="Enter Search..."
            v-model="listStockRequestsForm.search"
            required
          />
        </div>

        <div class="form-group peers">
        <div class="">Start Date</div>
          <input
            type="date"
            class="form-control"
            id="date-start-list-stock-request"
            name="date-start-list-stock-request"
            v-model="listStockRequestsForm.dateStart"
            required
          />
        </div>

        <div class="form-group peers">
        <div class="">End Date</div>
          <input
            type="date"
            class="form-control"
            id="date-end-list-stock-request"
            name="date-end-list-stock-request"
            v-model="listStockRequestsForm.dateEnd"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">Show Stock Requests!</button>
      </form>

      <ul class="listStockRequestResult">
        <ul class="itemList" v-for="item in listStockRequestsForm.result" :key="item.id">
          <li>
            ID: {{ item.id }}
          </li>
          <li>
            Subject: {{ item.subject }}
          </li>
          <li>
            Message: {{ item.message }}
          </li>
          <li>
            E-mail: {{ item.email }}
          </li>
          <li>
            Date: {{ item.date }}
          </li>
        </ul>
      </ul>
    </masonry-layout-tile-c>

    <!-- Delete user stock requests -->
    <masonry-layout-tile-c section="Delete stock request">
      <form  @submit.prevent="deleteStockRequest">
        <div class="mB-10">Fill in the submission ID of a send request</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="delete-stock-request"
            name="delete-stock-request"
            placeholder="Enter Submission ID..."
            v-model="deleteStockRequestId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Delete!</button>
      </form>
    </masonry-layout-tile-c>

    <!-- Download stock request assets -->
    <masonry-layout-tile-c section="Download stock request assets">
      <form  @submit.prevent="downloadStockRequest">
        <div class="mB-10">Fill in the submission ID of a send request for downloading all assets</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="download-stock-request"
            name="download-stock-request"
            placeholder="Enter Submission ID..."
            v-model="downloadStockRequestId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Download!</button>
      </form>
    </masonry-layout-tile-c>
  </masonry-layout-c>
</template>

<script lang="ts">
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { Component, Vue } from "vue-property-decorator";
import { Dictionary } from "vue-router/types/router";
import { Stock } from "..//generated/models/stock/stock_pb";
import MasonryLayoutC from "../components/MasonryLayout.vue";
import MasonryLayoutTileC from "../components/MasonryLayoutTile.vue";
import { DeleteStockRequestRequest, DownloadStockRequestAssetsRequest, ListStockRequestsRequest, StockRequestAsset } from "../generated/models/grpc/cms_pb";
import { StockRequest } from "../generated/models/submission/submission_pb";
import { ContentManagementModule } from "../store/modules/cms";

interface ListStockRequestsForm {
  search: string;
  dateStart: Date;
  dateEnd: Date;
  result: Array<StockRequestResult>;
}

interface StockRequestResult {
  id: string, 
  subject: string,
  message: string,
  email: string,
  date: Date,
}

@Component({
  name: "UserSubmission",
  components: {
    MasonryLayoutC,
    MasonryLayoutTileC
  }
})
export default class UserSubmission extends Vue {
protected deleteStockRequestId = "";
protected downloadStockRequestId = "";

listStockRequestsForm : ListStockRequestsForm = {
  search: "",
  dateStart: new Date(),
  dateEnd: new Date(),
  result: [],
};

listStockRequests() {
  // Build request 
  var request : ListStockRequestsRequest = new ListStockRequestsRequest();

  request.setSearch(this.listStockRequestsForm.search)

  var time : Timestamp = new Timestamp();
  time.fromDate(this.listStockRequestsForm.dateStart);
  request.setFrom(time);
  time.fromDate(this.listStockRequestsForm.dateEnd);
  request.setTo(time);


  // send request
  ContentManagementModule.listStockRequests(request).then(
    (result : StockRequest[]) => {
      result.forEach((value: StockRequest) => {
        var dateResult : Date = value?.getDate()?.toDate() ?? new Date();

        let requestResult : StockRequestResult = {
          id: value.getId(),
          subject: value.getSubject(),
          message: value.getMessage(),
          email: value.getMessage(),
          date: dateResult,
        }
        this.listStockRequestsForm.result.push(requestResult);
      });
      alert("Successfully queried")
    },
    (error) => {
      alert("Failed to query")
    }
  );
}

deleteStockRequest() {
  // Build request 
  var request : DeleteStockRequestRequest = new DeleteStockRequestRequest();
  request.setSubmissionId(this.deleteStockRequestId);

  // send request
  ContentManagementModule.deleteStockRequests(request).then(
    (result) => {
      alert("Successfully deleted")
    },
    (error) => {
      alert("Failed to delete")
    }
  );
}

downloadStockRequest() {
  // Build request 
  var request : DownloadStockRequestAssetsRequest = new DownloadStockRequestAssetsRequest();
  request.setSubmissionId(this.downloadStockRequestId);

  // send request
  ContentManagementModule.downloadStockRequestAssets(request).then(
    (result: StockRequestAsset[]) => {
      result.forEach((item) => {
        if (item.getData() instanceof Uint8Array) {
          var blob = new Blob([item.getData()], {type: item.getContentType()});
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = item.getFilename();
          link.click();
        }
      });

      alert("Successfully downloaded")
    },
    (error) => {
      alert("Failed to query")
    }
  );
}

}
</script>

<style lang="sass" scoped>
  .listStockRequestResult
    list-style-type: none
    margin: 0
    padding: 0
    list-style-position: outside

  .itemList
    border-bottom: 1px solid white
    padding: 10px  

</style>