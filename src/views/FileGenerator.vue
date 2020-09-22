<template>
  <masonry-layout-c title="File Generator">
    <!-- Generate Order License Agreements -->
    <masonry-layout-tile-c section="Generate Order License Agreements">
      <form  @submit.prevent="generateOrderLicenseAgreements">
        <div class="mB-10">Fill in an order ID</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="generate-license-id"
            name="generate-license-id"
            placeholder="Enter Order ID..."
            v-model="genLicenseId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Generate!</button>
      </form>

      <ul class="listPDFResult" v-for="item in multPdfs" :key="item.getFileName">
        <li class="itemList">
          {{ generatePDF(item) }}
        </li>
      </ul>

    </masonry-layout-tile-c>

    <!-- Generate Order Receipt -->
    <masonry-layout-tile-c section="Generate Order Receipt">
      <form  @submit.prevent="generateOrderReceipt">
        <div class="mB-10">Fill in an order ID</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="generate-receipt-id"
            name="generate-receipt-id"
            placeholder="Enter Order ID..."
            v-model="genReceiptId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Generate!</button>
      </form>

      <div class="listPDFResult">
        {{ generatePDF(receiptPDF) }}
      </div>

    </masonry-layout-tile-c>
  </masonry-layout-c>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MasonryLayoutC from "../components/MasonryLayout.vue";
import MasonryLayoutTileC from "../components/MasonryLayoutTile.vue";
import { GenerateOrderLicenseAgreementsRequest, GenerateOrderReceiptRequest, MultiplePDFResult, SinglePDFResult } from "../generated/models/grpc/cms_pb";
import { ContentManagementModule } from "../store/modules/cms";

@Component({
  name: "FileGenerator",
  components: {
    MasonryLayoutC,
    MasonryLayoutTileC
  }
})
export default class FileGenerator extends Vue {
  protected genLicenseId : string = "";
  protected genReceiptId : string = "";
  protected receiptPDF: SinglePDFResult = new SinglePDFResult();
  protected multPdfs : SinglePDFResult[] = [];

  generateOrderLicenseAgreements() {
    // Build request 
    var request : GenerateOrderLicenseAgreementsRequest = new GenerateOrderLicenseAgreementsRequest();
    request.setOrderId(this.genLicenseId);

    // send request
    ContentManagementModule.generateOrderLicenseAgreements(request).then(
      (result: MultiplePDFResult) => {
        this.multPdfs = result.getPdfsList();
        alert("Successfully generated")
      },
      (error) => {
        alert("Failed to generate Licenses")
      }
    );
  }

  generateOrderReceipt() {
    // Build request 
    var request : GenerateOrderReceiptRequest = new GenerateOrderReceiptRequest();
    request.setOrderId(this.genReceiptId);

    // send request
    ContentManagementModule.generateOrderReceipt(request).then(
      (result: SinglePDFResult) => {
        this.receiptPDF = result;
        alert("Successfully generated")
      },
      (error) => {
        alert("Failed to generate Receipt")
      }
    );
  }

  generatePDF(item: SinglePDFResult) {
    if (item.getData() instanceof Uint8Array) {
      var blob = new Blob([item.getData()], {type: "application/pdf"});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = item.getFilename();
      return link;
    }
    return null;
  }
}
</script>

<style lang="sass" scoped>
  .listPDFResult
    list-style-type: none
    margin: 0
    padding: 0
    list-style-position: outside

  .itemList
    border-bottom: 1px solid white
    padding: 10px  

</style>
