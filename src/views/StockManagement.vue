<template>
  <masonry-layout-c title="Stock Management">

    <!-- Rescue Buttons -->
    <masonry-layout-tile-c section="Rescue Buttons">
      <div>All these buttons usually don't need to be pressed (only in case something break is broken with the beats)</div>
      <form>
        <!-- Rank Stock -->
        <div>Stocks will receive their current rank.</div>
        <button @click.prevent="rank" class="btn btn-outline-success m-10">Go!</button>
        <!-- Check Stock -->
        <div>Stocks will be checked for any errors and the number of updates needed will be presented below</div>
        <button @click.prevent="checkStock" class="btn btn-outline-success m-10">Go!</button>
        <b-alert v-model="showDismissibleAlert" dismissible>
          {{updatedText}} 
        </b-alert>
      </form>
    </masonry-layout-tile-c>

    <!--Adding Stock -->
    <masonry-layout-tile-c section="Adding Stock">
      <form  @submit.prevent="addStock">
        <!-- Type -->
        <div>Type</div>
        <div class="form-group form-row">
        <span class="mR-10 mL-50">Audio</span>
        <div class="custom-switch">
          <input 
            type="checkbox" 
            class="custom-control-input" 
            id="customSwitches"
            v-bind:checked="type"
            v-model="type"
          />
          <label class="custom-control-label" for="customSwitches">Beat</label>
        </div>
        </div>

        <!-- Name -->
        <div class="form-group">
          <label for="stock-name">Name</label>
          <input
            type="text"
            class="form-control"
            id="stock-name"
            name="stock-name"
            aria-describedby="name-help"
            placeholder="Enter name"
            required
          />
          <small id="name-help" class="form-text text-muted"
            >Try to come up with something iconic ;)</small
          >
        </div>

        <!-- Costum ID -->
         <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            id="stock-enter-costum-id-toggle"
            name="stock-checkbox-custom-id"
            class="peer"
            @click="isCustomIdDisabled=!isCustomIdDisabled"
            required
          />
          <label for="stock-checkbox-custom-id" class="peers peer-greed js-sb ai-c mB-15">
            <span class="peer peer-greed">Do you want to assign the stock a costum ID? </span>
          </label>
          <input
            type="text"
            class="form-control"
            id="stock-enter-costum-id"
            name="stock-text-custom-id"
            placeholder="Enter ID"
            v-bind:disabled="isCustomIdDisabled"
            required
          />
        </div>
        
        <!-- License Prices -->
        <div class="form-group">
          <label for="stock-mp3-price" class="peers peer-greed js-sb ai-c">
            MP3 license Price
          </label>
          <input
            type="text"
            class="form-control mB-15 mT-10"
            id="stock-mp3-price"
            name="stock-mp3-price"
            placeholder="Enter Price in € ... 9.99"
            required
          />
          <label for="stock-limited-price" class="peers peer-greed js-sb ai-c">
            Limited license Price
          </label>
          <input
            type="text"
            class="form-control mB-15 mT-10"
            id="stock-limited-price"
            name="stock-limited-price"
            placeholder="Enter Price in € ... 9.99"
            required
          />
          <label for="stock-unlimited-price" class="peers peer-greed js-sb ai-c">
            Unlimited license Price
          </label>
          <input
            type="text"
            class="form-control mB-15 mT-10"
            id="stock-unlimited-price"
            name="stock-unlimited-price"
            placeholder="Enter Price in € ... 9.99"
            required
          />
        </div>

        <!-- Producers -->
        <div class="form-group">
          <label for="stock-producers">Producers</label>
          <input
            type="text"
            class="form-control"
            id="stock-producers"
            name="stock-producers"
            aria-describedby="producers-help"
            placeholder="Enter full name of all producers"
            required
          />
          <small id="producers-help" class="form-text text-muted"
            >Please seperate all producers with a comma (,) or there won't be seen as seperate producers.</small
          >
        </div>

        <!-- Owner -->
        <div class="form-group">
          <label for="stock-owner">Owner</label>
          <input
            type="text"
            class="form-control"
            id="stock-owner"
            name="stock-owner"
            placeholder="Enter full name of the owner"
            required
          />
        </div>

        <!-- Watermarked -->
        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            class="peer"
            id="stock-watermarked"
            name="stock-watermarked"
            required
          />
          <label for="beat-watermarked">Schould the stock receive a watermark?</label>
        </div>

        <!-- Social links -->
        <div class="form-group">
          <label for="stock-youtube">Youtube URL</label>
          <input
            type="text"
            class="form-control"
            id="stock-youtube"
            name="stock-youtube"
            placeholder="Enter Youtube url"
            required
          />

          <label for="stock-soundcloud" class="mT-15">Soundcloud URL</label>
          <input
            type="text"
            class="form-control"
            id="stock-soundcloud"
            name="stock-soundcloud"
            placeholder="Enter Soundcloud url"
            required
          />
        </div>

        <!-- Rating -->
        <div class="form-group">
          <label for="rating-slider">Rate your own stock</label>
          <b-form-input 
            id="rating-slider" 
            v-model="rating" 
            type="range" 
            min="0" max="5" 
            required
          ></b-form-input>
          <div>Rating: {{ rating }}</div>
        </div>

        <!-- Beat Related -->
        <div class="form-group" v-if="type">
          <label for="beat-bpm">BPM</label>
          <input
            type="number"
            class="form-control"
            id="beat-bpm"
            name="beat-bpm"
            placeholder="Enter BPM of the beat"
            required
          />

          <label for="beat-moods">Moods</label>
          <input
            type="text"
            class="form-control"
            id="beat-moods"
            name="beat-moods"
            aria-describedby="moods-help"
            placeholder="Enter moods of the beat"
            required
          />
          <small id="moods-help" class="form-text text-muted"
            >Please seperate all moods with a comma (,) or there won't be seen as seperate.</small
          >

          <label for="beat-influences">Influences</label>
          <input
            type="text"
            class="form-control"
            id="beat-influences"
            name="beat-influences"
            aria-describedby="influences-help"
            placeholder="Enter influences"
            required
          />
          <small id="influences-help" class="form-text text-muted"
            >Please seperate all influences with a comma (,) or there won't be seen as seperate.</small
          >

          <label for="beat-genres">Genres</label>
          <input
            type="text"
            class="form-control"
            id="beat-genres"
            name="beat-genres"
            aria-describedby="genres-help"
            placeholder="Enter genres"
            required
          />
          <small id="genres-help" class="form-text text-muted"
            >Please seperate all genres with a comma (,) or there won't be seen as seperate.</small
          >

          <label for="beat-keys">Keys</label>
          <input
            type="text"
            class="form-control"
            id="beat-keys"
            name="beat-keys"
            aria-describedby="keys-help"
            placeholder="Enter keys"
            required
          />
          <small id="keys-help" class="form-text text-muted"
            > Possible keys are: D, DDUR, A, AMOLL, CMAJ, CMOLL.
            Please seperate all keys with a comma (,) or there won't be seen as seperate.</small
          >
        </div>

        <!-- Audio Related -->
        <div class="form-group" v-else>
          <label for="audio-moods">Moods</label>
          <input
            type="text"
            class="form-control"
            id="audio-moods"
            name="audio-moods"
            aria-describedby="moods-help"
            placeholder="Enter moods of the audio"
            required
          />
          <small id="moods-help" class="form-text text-muted"
            >Please seperate all moods with a comma (,) or there won't be seen as seperate.</small
          >
        </div>

        <!-- Associated Stock Sound -->

        <div class="mB-10">Sound Reference</div>
        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            id="stock-checkbox-existing-sound-ressource"
            name="stock-checkbox-existing-sound-ressource"
            class="peer"
            @click="isSoundUploadDisabled=!isSoundUploadDisabled"
            required
          />
          <label for="stock-checkbox-existing-sound-ressource" class="peers peer-greed js-sb ai-c mB-15">
            <span class="peer peer-greed">Do you reference an existing sound?</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="stock-enter-existing-sound-ressource"
            name="stock-text-existing-sound-ressource"
            placeholder="Enter ID"
            v-bind:disabled="!isSoundUploadDisabled"
          />
          <b-form-file v-model="soundUpload" class="mt-3" 
            v-bind:disabled="isSoundUploadDisabled" plain></b-form-file>
          <div class="mt-3">Selected file: {{ soundUpload ? soundUpload.name : '' }}</div>
        </div>

        <!-- Associated Stock Artwork -->
        <div class="mB-10">Artwork reference</div>
        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            id="stock-checkbox-existing-artwork-ressource"
            name="stock-checkbox-existing-artwork-ressource"
            class="peer"
            @click="isArtworkUploadDisabled=!isArtworkUploadDisabled"
            required
          />
          <label for="stock-checkbox-existing-artwork-ressource" class="peers peer-greed js-sb ai-c mB-15">
            <span class="peer peer-greed">Do you reference an existing artwork?</span>
          </label>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="stock-enter-existing-artwork-ressource"
            name="stock-text-existing-artwork-ressource"
            placeholder="Enter ID"
            v-bind:disabled="!isArtworkUploadDisabled"
          />
          <b-form-file v-model="artworkUpload" class="mt-3" 
            v-bind:disabled="isArtworkUploadDisabled" plain></b-form-file>
          <div class="mt-3">Selected file: {{ artworkUpload ? artworkUpload.name : '' }}</div>
        </div>
        

        <!-- Option strict -->
        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            id="stock-enter-strict-toggle"
            name="stock-checkbox-strict"
            class="peer"
            aria-describedby="strict-help"
          />
          <label for="stock-checkbox-strict" class="peers peer-greed js-sb ai-c mB-15">
            <span class="peer peer-greed">Should the upload be strict?</span>
          </label>
          <small id="strict-help" class="form-text text-muted">
            If stock's ID is set manually, strict is set to true and there is a conflict, nothing will be replaced and there will be an error.
          </small>
        </div>
        <button type="submit" class="btn btn-primary">Add Stock!</button>
      </form>
    </masonry-layout-tile-c>
  </masonry-layout-c>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MasonryLayoutC from "../components/MasonryLayout.vue";
import MasonryLayoutTileC from "../components/MasonryLayoutTile.vue";
import { ContentManagementModule } from "../store/modules/cms";
import { AddStockRequest } from "../../../frontend/src/generated/models/grpc/internal/metronome_pb";
import { Stock } from "../../../frontend/src/generated/models/stock/stock_pb";

interface AddStockForm {
  name?: string;
}

@Component({
  name: "Forms",
  components: {
    MasonryLayoutC,
    MasonryLayoutTileC
  }
})
export default class Forms extends Vue {
  protected updatedText = "";
  protected showDismissibleAlert = false;
  protected isCustomIdDisabled = true;
  protected isSoundUploadDisabled = false;
  protected isArtworkUploadDisabled = false;
  protected rating = 5;
  protected stockUploadText = "";
  protected type = true;
  protected soundUpload = null;
  protected artworkUpload = null;
  addStockForm: AddStockForm = {
    name: "",
  };

  rank() {
    ContentManagementModule.rankStock();
  }

  checkStock() {
    ContentManagementModule.checkStock().then(
      (result) => {
        this.updatedText = result.updated + "Stock Items updated";
      },
      (error) => {
        this.updatedText = error;
      }
    );
    this.showDismissibleAlert = true;
  }

  addStock(){
    var stock : Stock = new Stock();
    const request : AddStockRequest = new AddStockRequest();
    request.setStock(stock ?? null);

    ContentManagementModule.addStock(request).then(
      (result) => {
        this.stockUploadText = result.id + "successfully uploaded";
      },
      (error) => {
        this.stockUploadText = error;
      }
    );
  }
}
</script>

<style lang="sass" scoped>
  .custom-control-label
    vertical-align: bottom

  #rating-slider::-webkit-slider-runnable-track 
    background: #888   
</style>

