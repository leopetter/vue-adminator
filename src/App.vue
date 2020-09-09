<template>
  <div id="app">
    <!-- Progress bar -->
    <nprogress-container></nprogress-container>
    <!-- Main views -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NprogressContainer from "vue-nprogress/src/NprogressContainer.vue";
import { COOKIE_THEME } from "./constants";
import { AppModule } from "./store/modules/app";

@Component({
  name: "App",
  components: {
    NprogressContainer
  }
})
export default class App extends Vue {
  mounted() {
    const theme: number = parseInt(
      (this.$cookies.get(COOKIE_THEME) ?? "").toString()
    );
    if (!isNaN(theme)) {
      AppModule.setTheme(theme);
    }
  }
}
</script>

<style lang="sass">
@import "@/style/global.sass"
@import "@/style/spec/index.sass"
@import "@/style/vendor/index.sass" 
@import ~bootstrap
@import ~bootstrap-vue

@import "~themify-icons-sass/themify-icons/variables"
@import "~themify-icons-sass/themify-icons/mixins"
@import "~themify-icons-sass/themify-icons/core"
@import "~themify-icons-sass/themify-icons/extras"
@import "~themify-icons-sass/themify-icons/icons"

@font-face
  font-family: "themify"
  src: url(~themify-icons/themify-icons/fonts/themify.eot?-fvbane)
  src: url(~themify-icons/themify-icons/fonts/themify.eot?#iefix-fvbane) format("embedded-opentype"), url(~themify-icons/themify-icons/fonts/themify.woff?-fvbane) format("woff"), url(~themify-icons/themify-icons/fonts/themify.ttf?-fvbane) format("truetype"), url(~themify-icons/themify-icons/fonts/themify.svg?-fvbane#themify) format("svg")
  font-weight: normal
  font-style: normal

@include scrollbars(.3em, slategray)

.ps__rail-y
  right: 0 !important
  left: auto !important

.nprogress-container
  height: 3px
  top: 0
  z-index: 9999999
  position: fixed
  width: 100%

#nprogress .bar
  +theme(background-color, bgc-progressbar)
  height: 3px

#app
  height: 100%
  +theme(background-color, bgc-body)
  +theme(color, c-default-text)

</style>
