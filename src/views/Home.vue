<template>
  <masonry-layout-c title="Overview">
    <!-- Site Visits -->
    <masonry-layout-tile-c
      section="Site Visits"
    >
      <div class="peer">
        <div class="layers">
          <div class="layer w-100">
            <!-- Progress Bars -->
            <div class="layers">
              <div class="layer w-100">
                <h5 class="mB-5">100k</h5>
                <small class="fw-600 c-grey-700">Visitors From USA</small>
                <span class="pull-right c-grey-600 fsz-sm">50%</span>
                <div class="progress mT-10">
                  <div
                    class="progress-bar bgc-deep-purple-500"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width:50%;"
                  >
                    <span class="sr-only">50% Complete</span>
                  </div>
                </div>
              </div>
              <div class="layer w-100 mT-15">
                <h5 class="mB-5">1M</h5>
                <small class="fw-600 c-grey-700">Visitors From Europe</small>
                <span class="pull-right c-grey-600 fsz-sm">80%</span>
                <div class="progress mT-10">
                  <div
                    class="progress-bar bgc-green-500"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width:80%;"
                  >
                    <span class="sr-only">80% Complete</span>
                  </div>
                </div>
              </div>
              <div class="layer w-100 mT-15">
                <h5 class="mB-5">450k</h5>
                <small class="fw-600 c-grey-700">Visitors From Australia</small>
                <span class="pull-right c-grey-600 fsz-sm">40%</span>
                <div class="progress mT-10">
                  <div
                    class="progress-bar bgc-light-blue-500"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width:40%;"
                  >
                    <span class="sr-only">40% Complete</span>
                  </div>
                </div>
              </div>
              <div class="layer w-100 mT-15">
                <h5 class="mB-5">1B</h5>
                <small class="fw-600 c-grey-700">Visitors From India</small>
                <span class="pull-right c-grey-600 fsz-sm">90%</span>
                <div class="progress mT-10">
                  <div
                    class="progress-bar bgc-blue-grey-500"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width:90%;"
                  >
                    <span class="sr-only">90% Complete</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pie Charts -->
            <div class="peers pT-20 mT-20 bdT fxw-nw@lg+ jc-sb ta-c gap-10">
              <div class="peer">
                <tachometer-chart-c
                  :size="80"
                  :percent="75"
                  fillColor="#f44336"
                />
                <h6 class="fsz-sm">New Users</h6>
              </div>
              <div class="peer">
                <tachometer-chart-c
                  :size="80"
                  :percent="50"
                  fillColor="#2196f3"
                />
                <h6 class="fsz-sm">New Purchases</h6>
              </div>
              <div class="peer">
                <tachometer-chart-c
                  :size="80"
                  :percent="90"
                  fillColor="#ff9800"
                />
                <h6 class="fsz-sm">Bounce Rate</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </masonry-layout-tile-c>
  </masonry-layout-c>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { COLORS } from "../colors";

import TachometerChartC from "../components/TachoChart.vue";

import MasonryLayoutC from "../components/MasonryLayout.vue";
import MasonryLayoutTileC from "../components/MasonryLayoutTile.vue";

@Component({
  name: "Home",
  components: {
    MasonryLayoutTileC,
    MasonryLayoutC,
    TachometerChartC,
  }
})
export default class Home extends Vue {
}
</script>