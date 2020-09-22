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
            id="custom-stock-toggle"
            v-bind:checked="addStockForm.type"
            v-model="addStockForm.type"
          />
          <label class="custom-control-label" for="custom-stock-toggle">Beat</label>
        </div>
        </div>

        <!-- Name -->
        <div class="form-group">
          <label for="stock-name">Name</label>
          <input
            type="text"
            class="form-control"
            id="stock-name"
            v-model="addStockForm.name"
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
            v-model="addStockForm.costumId"
            @click="isCustomIdDisabled=!isCustomIdDisabled"
            required
          />
          <label for="stock-checkbox-custom-id" class="peers peer-greed js-sb ai-c mB-15">
            <span class="peer peer-greed">Do you want to assign the stock a costum ID? </span>
          </label>
          <input
            type="number"
            class="form-control"
            id="stock-enter-costum-id"
            name="stock-text-custom-id"
            placeholder="Enter ID"
            v-model="addStockForm.costumIdEnter"
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
            type="number"
            class="form-control mB-15 mT-10"
            id="stock-mp3-price"
            name="stock-mp3-price"
            placeholder="Enter Price in € ... 9.99"
            v-model="addStockForm.mp3Price"
            required
          />
          <label for="stock-limited-price" class="peers peer-greed js-sb ai-c">
            Limited license Price
          </label>
          <input
            type="number"
            class="form-control mB-15 mT-10"
            id="stock-limited-price"
            name="stock-limited-price"
            placeholder="Enter Price in € ... 9.99"
            v-model="addStockForm.limitedPrice"
            required
          />
          <label for="stock-unlimited-price" class="peers peer-greed js-sb ai-c">
            Unlimited license Price
          </label>
          <input
            type="number"
            class="form-control mB-15 mT-10"
            id="stock-unlimited-price"
            name="stock-unlimited-price"
            placeholder="Enter Price in € ... 9.99"
            v-model="addStockForm.unlimitedPrice"
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
            v-model="addStockForm.producers"
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
            v-model="addStockForm.owner"
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
            v-model="addStockForm.watermark"
            required
          />
          <label for="stock-watermarked">Schould the stock receive a watermark?</label>
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
            v-model="addStockForm.youtube"
            required
          />

          <label for="stock-soundcloud" class="mT-15">Soundcloud URL</label>
          <input
            type="text"
            class="form-control"
            id="stock-soundcloud"
            name="stock-soundcloud"
            placeholder="Enter Soundcloud url"
            v-model="addStockForm.soundcloud"
            required
          />
        </div>

        <!-- Rating -->
        <div class="form-group">
          <label for="rating-slider">Rate your own stock</label>
          <b-form-input 
            id="rating-slider" 
            v-model="addStockForm.rating" 
            type="range" 
            min="0" max="5" 
            required
          ></b-form-input>
          <div>Rating: {{ addStockForm.rating }}</div>
        </div>

        <!-- Beat Related -->
        <div class="form-group" v-if="addStockForm.type">
          <label for="beat-bpm">BPM</label>
          <input
            type="number"
            class="form-control"
            id="beat-bpm"
            name="beat-bpm"
            placeholder="Enter BPM of the beat"
            v-model="addStockForm.bpm"
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
            v-model="addStockForm.moods" 
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
            v-model="addStockForm.influences" 
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
            v-model="addStockForm.genres" 
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
            v-model="addStockForm.keys" 
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
            v-model="addStockForm.moods" 
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
            v-model="addStockForm.newSound" 
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
            v-model="addStockForm.newSoundId" 
            v-bind:disabled="!isSoundUploadDisabled"
          />
          <b-form-file v-model="addStockForm.newSoundUpload" class="mt-3" 
            v-bind:disabled="isSoundUploadDisabled" plain></b-form-file>
          <div class="mt-3">Selected file: {{ addStockForm.newSoundUpload ? addStockForm.newSoundUpload.name : '' }}</div>
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
            v-model="addStockForm.newArtwork" 
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
            v-model="addStockForm.newArtworkId" 
            v-bind:disabled="!isArtworkUploadDisabled"
          />
          <b-form-file v-model="addStockForm.newArtworkUpload" class="mt-3" 
            v-bind:disabled="isArtworkUploadDisabled" plain></b-form-file>
          <div class="mt-3">Selected file: {{ addStockForm.newArtworkUpload ? addStockForm.newArtworkUpload.name : '' }}</div>
        </div>
        

        <!-- Option strict -->
        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            id="stock-enter-strict-toggle"
            name="stock-checkbox-strict"
            class="peer"
            v-model="addStockForm.strict" 
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
        <b-alert v-model="showDismissibleAlertStock" dismissible>
          {{ stockUploadText }} 
        </b-alert>
      </form>
    </masonry-layout-tile-c>

    <!--Updating Stock -->
    <masonry-layout-tile-c section="Updating Stock MetaData">
      <form  @submit.prevent="receiveStockMetadata">
        <div class="mB-10">Which Stock do you want to update?</div>
        <!-- ID for associated stock to update -->
        <div class="form-group peers">
          <input
            type="number"
            class="form-control"
            id="update-stock-id"
            name="update-stock-id"
            placeholder="Enter ID"
            v-model="updateStockForm.id"
            v-bind:disabled="isUpdateIdDisabled"
            required
          />
        </div>
        <button type="submit" class="btn btn-outline-warning mB-30">Checkout Stock!</button>
        <b-alert v-model="isUpdateIdDisabled" dismissible>
          {{ stockLoadText }} 
        </b-alert>
      </form>

      <form  @submit.prevent="updateStockMetadata">
        <!-- Type -->
        <div>Type</div>
        <div class="form-group form-row">
        <span class="mR-10 mL-50">Audio</span>
        <div class="custom-switch">
          <input 
            type="checkbox" 
            class="custom-control-input" 
            id="custom-stock-update-toggle"
            v-bind:checked="updateStockForm.type"
            v-model="updateStockForm.type"
            v-bind:disabled="!isUpdateIdDisabled"
          />
          <label class="custom-control-label" for="custom-stock-update-toggle">Beat</label>
        </div>
        </div>

        <!-- Name -->
        <div class="form-group">
          <label for="stock-name">Name</label>
          <input
            type="text"
            class="form-control"
            id="stock-update-name"
            v-model="updateStockForm.name"
            name="stock-update-name"
            placeholder="Enter name"
            v-bind:disabled="!isUpdateIdDisabled"
            required
          />
        </div>
        
        <!-- License Prices -->
        <div class="form-group">
          <label for="stock-update-mp3-price" class="peers peer-greed js-sb ai-c">
            MP3 license Price
          </label>
          <input
            type="number"
            class="form-control mB-15 mT-10"
            id="stock-update-mp3-price"
            name="stock-update-mp3-price"
            placeholder="Enter Price in € ... 9.99"
            v-model="updateStockForm.mp3Price"
            v-bind:disabled="!isUpdateIdDisabled"
            required
          />
          <label for="stock-limited-price" class="peers peer-greed js-sb ai-c">
            Limited license Price
          </label>
          <input
            type="number"
            class="form-control mB-15 mT-10"
            id="stock-update-limited-price"
            name="stock-update-limited-price"
            placeholder="Enter Price in € ... 9.99"
            v-model="updateStockForm.limitedPrice"
            v-bind:disabled="!isUpdateIdDisabled"
            required
          />
          <label for="stock-unlimited-price" class="peers peer-greed js-sb ai-c">
            Unlimited license Price
          </label>
          <input
            type="number"
            class="form-control mB-15 mT-10"
            id="stock-update-unlimited-price"
            name="stock-update-unlimited-price"
            placeholder="Enter Price in € ... 9.99"
            v-model="updateStockForm.unlimitedPrice"
            v-bind:disabled="!isUpdateIdDisabled"
            required
          />
        </div>

        <!-- Producers -->
        <div class="form-group">
          <label for="stock-update-producers">Producers</label>
          <input
            type="text"
            class="form-control"
            id="stock-update-producers"
            name="stock-update-producers"
            aria-describedby="producers-help"
            placeholder="Enter full name of all producers"
            v-model="updateStockForm.producers"
            required
          />
          <small id="producers-help" class="form-text text-muted"
            >Please seperate all producers with a comma (,) or there won't be seen as seperate producers.</small
          >
        </div>

        <!-- Owner -->
        <div class="form-group">
          <label for="stock-update-owner">Owner</label>
          <input
            type="text"
            class="form-control"
            id="stock-update-owner"
            name="stock-update-owner"
            placeholder="Enter full name of the owner"
            v-model="updateStockForm.owner"
            required
          />
        </div>

        <!-- Watermarked -->
        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            class="peer"
            id="stock-update-watermarked"
            name="stock-update-watermarked"
            v-model="updateStockForm.watermark"
            required
          />
          <label for="stock-update-watermarked">Schould the stock receive a watermark?</label>
        </div>

        <!-- Social links -->
        <div class="form-group">
          <label for="stock-youtube">Youtube URL</label>
          <input
            type="text"
            class="form-control"
            id="stock-update-youtube"
            name="stock-update-youtube"
            placeholder="Enter Youtube url"
            v-model="updateStockForm.youtube"
            required
          />

          <label for="stock-update-soundcloud" class="mT-15">Soundcloud URL</label>
          <input
            type="text"
            class="form-control"
            id="stock-update-soundcloud"
            name="stock-update-soundcloud"
            placeholder="Enter Soundcloud url"
            v-model="updateStockForm.soundcloud"
            required
          />
        </div>

        <!-- Rating -->
        <div class="form-group">
          <label for="rating-update-slider">Rate your own stock</label>
          <b-form-input 
            id="rating-update-slider" 
            v-model="updateStockForm.rating" 
            type="range" 
            min="0" max="5" 
            required
          ></b-form-input>
          <div>Rating: {{ updateStockForm.rating }}</div>
        </div>

        <!-- Beat Related -->
        <div class="form-group" v-if="updateStockForm.type">
          <label for="beat-update-bpm">BPM</label>
          <input
            type="number"
            class="form-control"
            id="beat-update-bpm"
            name="beat-update-bpm"
            placeholder="Enter BPM of the beat"
            v-model="updateStockForm.bpm"
            required
          />

          <label for="beat-update-moods">Moods</label>
          <input
            type="text"
            class="form-control"
            id="beat-update-moods"
            name="beat-update-moods"
            aria-describedby="moods-help"
            placeholder="Enter moods of the beat"
            v-model="updateStockForm.moods" 
            required
          />
          <small id="moods-help" class="form-text text-muted"
            >Please seperate all moods with a comma (,) or there won't be seen as seperate.</small
          >

          <label for="beat-update-influences">Influences</label>
          <input
            type="text"
            class="form-control"
            id="beat-update-influences"
            name="beat-update-influences"
            aria-describedby="influences-help"
            placeholder="Enter influences"
            v-model="updateStockForm.influences" 
            required
          />
          <small id="influences-help" class="form-text text-muted"
            >Please seperate all influences with a comma (,) or there won't be seen as seperate.</small
          >

          <label for="beat-update-genres">Genres</label>
          <input
            type="text"
            class="form-control"
            id="beat-update-genres"
            name="beat-update-genres"
            aria-describedby="genres-help"
            placeholder="Enter genres"
            v-model="updateStockForm.genres" 
            required
          />
          <small id="genres-help" class="form-text text-muted"
            >Please seperate all genres with a comma (,) or there won't be seen as seperate.</small
          >

          <label for="beat-update-keys">Keys</label>
          <input
            type="text"
            class="form-control"
            id="beat-update-keys"
            name="beat-update-keys"
            aria-describedby="keys-help"
            placeholder="Enter keys"
            v-model="updateStockForm.keys" 
            required
          />
          <small id="keys-help" class="form-text text-muted"
            > Possible keys are: D, DDUR, A, AMOLL, CMAJ, CMOLL.
            Please seperate all keys with a comma (,) or there won't be seen as seperate.</small
          >
        </div>

        <!-- Audio Related -->
        <div class="form-group" v-else>
          <label for="audio-update-moods">Moods</label>
          <input
            type="text"
            class="form-control"
            id="audio-update-moods"
            name="audio-update-moods"
            aria-describedby="moods-help"
            placeholder="Enter moods of the audio"
            v-model="updateStockForm.moods" 
            required
          />
          <small id="moods-help" class="form-text text-muted"
            >Please seperate all moods with a comma (,) or there won't be seen as seperate.</small
          >
        </div>
        <button type="submit" class="btn btn-primary">Update Stock!</button>
      </form>
    </masonry-layout-tile-c>  

    <!--Updating Stock -->
    <masonry-layout-tile-c section="Reprocess Stock Data">
      <form  @submit.prevent="reprocessStockData">
        <div class="">Which stock do you want to reprocess?</div>
        <div class="mB-10">Leave Sound or Artwork empty when you only want to reprocess the other.</div>
        <!-- ID for associated stock to update -->
        <div class="form-group peers">
          <input
            type="number"
            class="form-control"
            id="reprocess-stock-id"
            name="reprocess-stock-id"
            placeholder="Enter ID"
            v-model="reprocessStockForm.id"
            required
          />
        </div>

        <!-- Associated Stock Sound -->
        <div class="mB-10">Sound Reference</div>
        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            id="stock-reprocess-existing-sound-ressource"
            name="stock-reprocess-existing-sound-ressource"
            class="peer"
            @click="isSoundReprocessDisabled=!isSoundReprocessDisabled"
            v-model="reprocessStockForm.newSound" 
            required
          />
          <label for="stock-reprocess-existing-sound-ressource" class="peers peer-greed js-sb ai-c mB-15">
            <span class="peer peer-greed">Do you reference an existing sound?</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="stock-reprocess-existing-sound-ressource-enter"
            name="stock-reprocess-existing-sound-ressource-enter"
            placeholder="Enter ID"
            v-model="reprocessStockForm.soundId" 
            v-bind:disabled="!isSoundReprocessDisabled"
          />
          <b-form-file v-model="reprocessStockForm.soundUpload" class="mt-3" 
            v-bind:disabled="isSoundReprocessDisabled" plain></b-form-file>
          <div class="mt-3">Selected file: {{ reprocessStockForm.soundUpload ? reprocessStockForm.soundUpload.name : '' }}</div>
        </div>

        <!-- Associated Stock Artwork -->
        <div class="mB-10">Artwork reference</div>
        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            id="stock-reprocess-existing-artwork-ressource"
            name="stock-reprocess-existing-artwork-ressource"
            class="peer"
            @click="isArtworkReprocessDisabled=!isArtworkReprocessDisabled"
            v-model="reprocessStockForm.newArtwork" 
            required
          />
          <label for="stock-reprocess-existing-artwork-ressource" class="peers peer-greed js-sb ai-c mB-15">
            <span class="peer peer-greed">Do you reference an existing artwork?</span>
          </label>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="stock-reprocess-existing-artwork-ressource-text"
            name="stock-reprocess-existing-artwork-ressource-text"
            placeholder="Enter ID"
            v-model="reprocessStockForm.artworkId" 
            v-bind:disabled="!isArtworkReprocessDisabled"
          />
          <b-form-file v-model="reprocessStockForm.artworkUpload" class="mt-3" 
            v-bind:disabled="isArtworkReprocessDisabled" plain></b-form-file>
          <div class="mt-3">Selected file: {{ reprocessStockForm.artworkUpload ? reprocessStockForm.artworkUpload.name : '' }}</div>
        </div>

        <button type="submit" class="btn btn-primary">Update Stock!</button>
      </form>
    </masonry-layout-tile-c>
  </masonry-layout-c>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MasonryLayoutC from "../components/MasonryLayout.vue";
import MasonryLayoutTileC from "../components/MasonryLayoutTile.vue";
import { ContentManagementModule } from "../store/modules/cms";
import { AddStockRequest, RawData, ReprocessStockRequest, UpdateStockMetadataRequest } from "../generated/models/grpc/internal/metronome_pb";
import { Stock, SocialLinks } from "../generated/models/stock/stock_pb";
import { License } from "../generated/models/stock/license_pb";
import { Price } from "../generated/models/payment/price_pb";
import { Currency } from "../generated/models/payment/currency_pb";
import {Timestamp} from 'google-protobuf/google/protobuf/timestamp_pb';
import { Beat } from "../generated/models/stock/beat_pb";
import { Key } from "../generated/models/stock/constants_pb";
import { Audio } from "../generated/models/stock/audio_pb";
import { ResourceIdentifier } from "../generated/models/grpc/results_pb";
import { StockItemDescriptor } from "../generated/models/grpc/stock_pb";
import { CheckStockSummary } from "../generated/models/grpc/internal/metronome_pb";
import { AddStockResult } from "../generated/models/grpc/cms_pb";

interface AddStockForm {
  type : boolean;
  name: string;
  costumId : boolean;
  costumIdEnter : number;
  mp3Price : number;
  limitedPrice : number;
  unlimitedPrice : number;
  producers : string;
  owner : string;
  watermark : boolean;
  youtube : string;
  soundcloud : string;
  rating? : number;
  bpm : number;
  moods? : string;
  influences? : string;
  genres ? : string;
  keys ? : string;
  newSound  : boolean;
  newSoundId : string;
  newSoundUpload? : File;
  newArtwork  : boolean;
  newArtworkId : string;
  newArtworkUpload? : File;
  strict : boolean;
}

interface UpdateStockForm {
  id : number;
  type : boolean;
  name : string;
  mp3Price : number;
  limitedPrice : number;
  unlimitedPrice : number;
  producers : string;
  owner : string;
  watermark: boolean;
  youtube : string;
  soundcloud : string;
  rating? : number;
  bpm : number;
  moods? : string;
  influences? : string;
  genres ? : string;
  keys ? : string;
}

interface ReprocessStockForm {
  id : number;
  newSound  : boolean;
  soundId : string;
  soundUpload? : File;
  newArtwork  : boolean;
  artworkId : string;
  artworkUpload? : File;
}

@Component({
  name: "StockManagement",
  components: {
    MasonryLayoutC,
    MasonryLayoutTileC
  }
})
export default class StockManagement extends Vue {
  protected updatedText = "";
  protected showDismissibleAlert = false;
  protected showDismissibleAlertStock = false;
  protected isCustomIdDisabled = true;
  protected isUpdateIdDisabled = false;
  protected isSoundUploadDisabled = false;
  protected isArtworkUploadDisabled = false;
  protected isSoundReprocessDisabled = false;
  protected isArtworkReprocessDisabled = false;
  protected stockUploadText = "";
  protected stockLoadText = "";
  protected soundUpload = null;
  protected artworkUpload = null;

  addStockForm: AddStockForm = {
    type: true,
    name: "",
    costumId: false,
    costumIdEnter: 0,
    mp3Price: 0,
    limitedPrice: 0,
    unlimitedPrice: 0,
    producers: "",
    owner: "",
    watermark: true,
    youtube: "",
    soundcloud: "",
    rating: 5,
    bpm: 0,
    moods: "",
    influences: "",
    genres: "",
    keys: "",
    newSound: false,
    newSoundId: "",
    newArtwork: false,
    newArtworkId: "",
    strict: false,
  };
  updateStockForm: UpdateStockForm = {
    id: 0,
    type: true,
    name: "",
    mp3Price: 0,
    limitedPrice: 0,
    unlimitedPrice: 0,
    producers: "",
    owner: "",
    watermark: false,
    youtube: "",
    soundcloud: "",
    rating: 0,
    bpm: 0,
    moods: "",
    influences: "",
    genres: "",
    keys: "",
  }

  reprocessStockForm: ReprocessStockForm = {
    id: 0,
    newSound: false,
    soundId: "",
    newArtwork: false, 
    artworkId: "",
  };

  rank() {
    ContentManagementModule.rankStock();
  }

  checkStock() {
    ContentManagementModule.checkStock().then(
      (result: CheckStockSummary) => {
        this.updatedText = result.getUpdated + "Stock Items updated";
      },
      (error) => {
        this.updatedText = error;
      }
    );
    this.showDismissibleAlert = true;
  }

  addStock(){
    // Generate StockItem
    var stock : Stock = new Stock();
    var stockId : Stock.ID = new Stock.ID();
    stockId.setType(this.addStockForm.type == true ? Stock.Type.BEAT : Stock.Type.AUDIO)
    if (this.addStockForm.costumId) stockId.setId(this.addStockForm.costumIdEnter);
    stock.setId(stockId);
    stock.setName(this.addStockForm.name);
    stock.setLicensesList(this.licenseList("add"));
    stock.setProducersList(this.addStockForm.producers.split(","));
    stock.setOwner(this.addStockForm.owner);
    stock.setWatermarked(this.addStockForm.watermark);
    stock.setSocial(new SocialLinks().setYoutube(this.addStockForm.youtube).setSoundcloud(this.addStockForm.soundcloud));
    // receive and set current time
    var time : Timestamp = new Timestamp();
    time.fromDate(new Date());
    stock.setDateAdded(time);

    if (this.addStockForm.type) {
      var beat : Beat = new Beat();
      beat.setBpm(this.addStockForm.bpm);
      beat.setMoodsList(this.addStockForm.moods?.split(",") ?? []);
      beat.setInfluencesList(this.addStockForm.influences?.split(",") ?? []);
      beat.setGenresList(this.addStockForm.genres?.split(",") ?? []);
      beat.setKeysList(this.extractKeys("add"));
      stock.setBeat(beat);
    } else {
      var audio : Audio = new Audio();
      audio.setMoodsList(this.addStockForm.moods?.split(",") ?? []);
      stock.setAudio(audio);
    }
    var request : AddStockRequest = new AddStockRequest();
    request.setStock(stock);
    if (this.addStockForm.newSound) {
      request.setAudioResource(new ResourceIdentifier().setObjectId(this.addStockForm.newSoundId));
    } else {
      request.setAudioData(new RawData().setData(this.convertFileToByteData(this.addStockForm.newSoundUpload)));
    }
    if (this.addStockForm.newArtwork) {
      request.setArtworkResource(new ResourceIdentifier().setObjectId(this.addStockForm.newArtworkId));
    } else {
      request.setArtworkData(new RawData().setData(this.convertFileToByteData(this.addStockForm.newArtworkUpload)));
    }
    request.setStrict(this.addStockForm.strict)

    // Send request
    ContentManagementModule.addStock(request).then(
      (result : AddStockResult) => {
        this.stockUploadText = result.getId + "successfully uploaded";
      },
      (error) => {
        this.stockUploadText = error;
      }
    );
    this.showDismissibleAlertStock = true;
  }

  licenseList(type: string): License[] {
    var interf;
    if (type == "add") {
      interf = this.addStockForm;
    } else {
      interf = this.updateStockForm;
    }

    let mp3License : License = new License()
      .setType(License.Type.MP3)
      .setPricesList([
        new Price()
        .setPrice(interf.mp3Price * 100)
        .setCurrency(Currency.EUR)
      ])

    let limitedLicense : License = new License()
      .setType(License.Type.LIMITED)
      .setPricesList([
        new Price()
        .setPrice(interf.limitedPrice * 100)
        .setCurrency(Currency.EUR)
      ])

    let unlimitedLicense : License = new License()
      .setType(License.Type.UNLIMITED)
      .setPricesList([
        new Price()
        .setPrice(interf.unlimitedPrice * 100)
        .setCurrency(Currency.EUR)
      ])

    return [mp3License, limitedLicense, unlimitedLicense]
  }

  extractKeys(type: string): Key[]{
    let keysString : string[] | undefined;
    if (type == "add"){
      keysString = this.addStockForm.keys?.split(",");
    } else {
      keysString = this.updateStockForm.keys?.split(",");
    }

    let keys : Key[] = [];

    keysString?.forEach(function (value) {
      value = value.toUpperCase();
      switch(value) {
        case "D": {
          keys.push(Key.D);
          break;
        }
        case "DDUR": {
          keys.push(Key.DDUR);
          break;
        }
        case "A": {
          keys.push(Key.A);
          break;
        }
        case "AMOLL": {
          keys.push(Key.AMOLL);
          break;
        }
        case "CMAJ": {
          keys.push(Key.CMAJ);
          break;
        }
        case "CMOLL": {
          keys.push(Key.CMOLL);
          break;
        }
      }
    });   

    return keys;
  }

  convertFileToByteData(file : File | undefined): Uint8Array {
    var array : Uint8Array = new Uint8Array();
    if (file instanceof File) {
      file.arrayBuffer().then(
        (result) => {
          array = new Uint8Array(result)
        }
      );
    }
    return array;
  }

  receiveStockMetaData() {
    // Build request 
    var request : StockItemDescriptor = new StockItemDescriptor();
    request.setId(new Stock.ID().setId(this.updateStockForm.id))

    // send request
    ContentManagementModule.getStockItem(request).then(
      (result : Stock) => {
        // fill form with queried data belonging to the id
        if (result.getId()?.getType() == Stock.Type.BEAT) {
          this.updateStockForm.type = true;
          this.updateStockForm.bpm = result.getBeat()?.getBpm() ?? 0;
          this.updateStockForm.moods = result.getBeat()?.getMoodsList()?.join(", ");
          this.updateStockForm.influences = result.getBeat()?.getInfluencesList()?.join(", ");
          this.updateStockForm.genres = result.getBeat()?.getGenresList()?.join(", ");
          this.updateStockForm.keys = result.getBeat()?.getKeysList()?.join(", ");
        } else {
          this.updateStockForm.type = false;
          this.updateStockForm.moods = result.getAudio()?.getMoodsList()?.join(", ");
        }
        this.updateStockForm.name = result.getName();
        result.getLicensesList().forEach((license) => {
          switch(license.getType()) {
            case License.Type.MP3: {
              this.updateStockForm.mp3Price = license.getPricesList()[0].getPrice() / 100;
              break;
            }
            case License.Type.LIMITED: {
              this.updateStockForm.limitedPrice = license.getPricesList()[0].getPrice() / 100;
              break;
            }
            case License.Type.UNLIMITED: {
              this.updateStockForm.unlimitedPrice = license.getPricesList()[0].getPrice() / 100;
              break;
            }
          }
        });
        this.updateStockForm.producers = result.getProducersList().join(", ");
        this.updateStockForm.owner = result.getOwner();
        this.updateStockForm.watermark = result.getWatermarked();
        this.updateStockForm.youtube = result.getSocial()?.getYoutube() ?? "";
        this.updateStockForm.soundcloud = result.getSocial()?.getSoundcloud() ?? "";
        this.updateStockForm.rating = result.getRating();
      },
      (error) => {
        this.stockLoadText = error;
      }
    );
    this.isUpdateIdDisabled = true;
  }

  updateStockMetaData() {
    // Build request 
    var request : UpdateStockMetadataRequest = new UpdateStockMetadataRequest();

    // Generate StockItem
    var stock : Stock = new Stock();
    var stockId : Stock.ID = new Stock.ID();
    stockId.setType(this.updateStockForm.type == true ? Stock.Type.BEAT : Stock.Type.AUDIO)
    stockId.setId(this.updateStockForm.id);
    stock.setName(this.updateStockForm.name);
    stock.setLicensesList(this.licenseList("update"));
    stock.setProducersList(this.updateStockForm.producers.split(","));
    stock.setOwner(this.updateStockForm.owner);
    stock.setWatermarked(this.updateStockForm.watermark);
    stock.setSocial(new SocialLinks().setYoutube(this.updateStockForm.youtube).setSoundcloud(this.updateStockForm.soundcloud));
    // receive and set current time
    var time : Timestamp = new Timestamp();
    time.fromDate(new Date());
    stock.setDateAdded(time);

    if (this.updateStockForm.type) {
      var beat : Beat = new Beat();
      beat.setBpm(this.updateStockForm.bpm);
      beat.setMoodsList(this.updateStockForm.moods?.split(",") ?? []);
      beat.setInfluencesList(this.updateStockForm.influences?.split(",") ?? []);
      beat.setGenresList(this.updateStockForm.genres?.split(",") ?? []);
      beat.setKeysList(this.extractKeys("update"));
      stock.setBeat(beat);
    } else {
      var audio : Audio = new Audio();
      audio.setMoodsList(this.updateStockForm.moods?.split(",") ?? []);
      stock.setAudio(audio);
    }

    // set new stock meta data
    request.setMetadata(stock)

    // send request
    ContentManagementModule.updateStockMetaData(request).then(
      (result) => {
        alert("Successfully updated.")
      },
      (error) => {
        alert("Error during update: " + error)
      }
    );
  }

  reprocessStockData() {
    // Build request 
    var request : ReprocessStockRequest = new ReprocessStockRequest();

    request.setId(new Stock.ID().setId(this.reprocessStockForm.id));

    if (this.reprocessStockForm.newSound) {
      request.setAudioResource(new ResourceIdentifier().setObjectId(this.reprocessStockForm.soundId))
    } else if (this.reprocessStockForm.soundUpload != undefined) {
      request.setAudioData(new RawData().setData(this.convertFileToByteData(this.reprocessStockForm.soundUpload)));
    }
    if (this.reprocessStockForm.newArtwork) {
      request.setArtworkResource(new ResourceIdentifier().setObjectId(this.reprocessStockForm.artworkId))
    } else if (this.reprocessStockForm.artworkUpload != undefined) {
      request.setArtworkData(new RawData().setData(this.convertFileToByteData(this.reprocessStockForm.artworkUpload)));
    }

    // Send request
    ContentManagementModule.reprocessStock(request).then(
      (result) => {
        alert("Successfully reprocessed.")
      },
      (error) => {
        alert("Error during reprocess: " + error)
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

