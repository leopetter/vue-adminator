<template>
  <masonry-layout-c title="Download Management">
    <!-- List of orders -->
    <masonry-layout-tile-c section="List of download Links">
      <form  @submit.prevent="listDownloadLinks">
        <div class="mB-10">Are you looking for any downloads links?</div>
        <div class="form-group peers">
          <input
            type="search"
            class="form-control"
            id="search-list-download-links"
            name="search-list-download-links"
            placeholder="Enter Search..."
            v-model="listDownloadLinksForm.search"
            required
          />
        </div>

        <div class="form-group peers">
        <div class="">Start Date</div>
          <input
            type="date"
            class="form-control"
            id="date-start-list-download-links"
            name="date-start-list-download-links"
            v-model="listDownloadLinksForm.dateStart"
            required
          />
        </div>

        <div class="form-group peers">
        <div class="">End Date</div>
          <input
            type="date"
            class="form-control"
            id="date-end-list-download-links"
            name="date-end-list-download-links"
            v-model="listDownloadLinksForm.dateEnd"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">Show Download Links!</button>
      </form>

      <ul class="listDownloadLinksResult">
        <ul class="itemList" v-for="item in listDownloadLinksForm.result" :key="item.getOrderId()">
          <li>
            Token: {{ item.getToken() }}
          </li>
          <li>
            Order ID: {{ item.getOrderId() }}
          </li>
          <li>
            Issued: {{ getIssueDate(item.getIssued()) }}
          </li>
          Items:
          <ul v-for="dItem in item.Items " :key="dItem.getToken()">
            <li>
              Token: {{ dItem.getToken() }}
            </li>
            <li>
              RemainingDownloads: {{ dItem.getRemainingDownloads() }}
            </li>
            <li>
              Item: 
              {{ dItem.getItem().getType() }}, 
              {{ dItem.getItem().getPrice() }}, 
              {{ dItem.getItem().getItem() }}
            </li>
          </ul>
        </ul>
      </ul>
    </masonry-layout-tile-c>

    <!-- Receive Download Link -->
    <masonry-layout-tile-c section="Receive Download Link">
      <form  @submit.prevent="getDownloadLink">
        <div class="mB-10">Fill in a token associated to the download link you are looking for</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="get-download-link"
            name="get-download-link"
            placeholder="Enter Token..."
            v-model="downloadToken"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Get!</button>
      </form>

      <ul class="listDownloadLinksResult" v-if="showGetDownloadLinkResult">
        <li>
          Token: {{ downloadLink.getToken() }}
        </li>
        <li>
          Order ID: {{ downloadLink.getOrderId() }}
        </li>
        <li>
          Issued: {{ getIssueDate(downloadLink.getIssued()) }}
        </li>
        Items:
        <ul v-for="dItem in downloadLink.Items " :key="dItem.getToken()">
          <li>
            Token: {{ dItem.getToken() }}
          </li>
          <li>
            RemainingDownloads: {{ dItem.getRemainingDownloads() }}
          </li>
          <li>
            Item: 
            {{ dItem.getItem().getType() }}, 
            {{ dItem.getItem().getPrice() }}, 
            {{ dItem.getItem().getItem() }}
          </li>
        </ul>
      </ul>
    </masonry-layout-tile-c>

    <!-- Set Remaining Downloads -->
    <masonry-layout-tile-c section="Set Remaining Downloads">
      <form  @submit.prevent="setRemainingDownloads">
        <div class="mB-10">Fill in a token associated to the download link you are looking for and set a new limit for the remaining downloads</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="set-remaining-downloads-token"
            name="set-remaining-downloads-token"
            placeholder="Enter Token..."
            v-model="setRemainingToken"
            required
          />
        </div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="set-remaining-downloads"
            name="set-remaining-downloads"
            placeholder="Enter remaining download number..."
            v-model="setRemainingNumber"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Get!</button>
      </form>
    </masonry-layout-tile-c>
  </masonry-layout-c>
</template>

<script lang="ts">
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { Component, Vue } from "vue-property-decorator";
import MasonryLayoutC from "../components/MasonryLayout.vue";
import MasonryLayoutTileC from "../components/MasonryLayoutTile.vue";
import { Download } from "../generated/models/download/download_pb";
import { GetDownloadLinkRequest, ListDownloadLinksRequest, SetRemainingDownloadsRequest } from "../generated/models/grpc/cms_pb";
import { ContentManagementModule } from "../store/modules/cms";

interface ListDownloadLinksForm {
  search: string;
  dateStart: Date;
  dateEnd: Date;
  result: Array<Download>;
}

@Component({
  name: "DownloadManagement",
  components: {
    MasonryLayoutC,
    MasonryLayoutTileC
  }
})
export default class DownloadManagement extends Vue {
  protected downloadLink : Download = new Download();
  protected downloadToken : string = "";
  protected showGetDownloadLinkResult : boolean = false;
  protected setRemainingToken : string = "";
  protected setRemainingNumber : number = 0;

  listDownloadLinksForm : ListDownloadLinksForm = {
    search: "",
    dateStart: new Date(),
    dateEnd: new Date(),
    result: [],
  };

  listDownloadLinks() {
    // Build request 
    var request : ListDownloadLinksRequest = new ListDownloadLinksRequest();

    request.setSearch(this.listDownloadLinksForm.search)

    var time : Timestamp = new Timestamp();
    time.fromDate(this.listDownloadLinksForm.dateStart);
    request.setFrom(time);
    time.fromDate(this.listDownloadLinksForm.dateEnd);
    request.setTo(time);


    // send request
    ContentManagementModule.listDownloadLinks(request).then(
      (result : Download[]) => {
        result.forEach((value: Download) => {
          this.listDownloadLinksForm.result.push(value);
        });
        alert("Successfully queried")
      },
      (error) => {
        alert("Failed to query")
      }
    );
  }

  getDownloadLink() {
    // Build request 
    var request : GetDownloadLinkRequest = new GetDownloadLinkRequest();
    request.setToken(this.setRemainingToken);

    // send request
    ContentManagementModule.getDownloadLink(request).then(
      (result: Download) => {
        this.downloadLink = result
        this.showGetDownloadLinkResult = true;
        alert("Successfully queried")
      },
      (error) => {
        alert("Failed to query")
      }
    );
  }

  setRemainingDownloads() {
    // Build request 
    var request : SetRemainingDownloadsRequest = new SetRemainingDownloadsRequest();
    request.setToken(this.downloadToken);
    request.setRemaining(this.setRemainingNumber)

    // send request
    ContentManagementModule.setRemainingDownloads(request).then(
      (result) => {
        alert("Successfully updated")
      },
      (error) => {
        alert("Failed to update")
      }
    );
  }

  getIssueDate(date: Timestamp) {
    return date?.toDate() ?? new Date() 
  }

}
</script>

<style lang="sass" scoped>
  .listDownloadLinksResult
    list-style-type: none
    margin: 0
    padding: 0
    list-style-position: outside

  .itemList
    border-bottom: 1px solid white
    padding: 10px  

</style>
