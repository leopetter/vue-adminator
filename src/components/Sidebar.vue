<template>
  <div class="sidebar pB-40">
    <div class="sidebar-inner">
      <!-- Sidebar Header -->
      <div class="sidebar-logo">
        <div class="peers ai-c fxw-nw">
          <div class="peer peer-greed">
            <router-link class="sidebar-link td-n centerX" to="/">
              <div class="peers ai-c fxw-nw">
                <div class="peer">
                  <div class="logo">
                    <img
                      :src="theme == 1 ? require(`../assets/images/logo_white.png`) : require(`../assets/images/logo_gray.png`)"
                      alt="Logo"
                    />
                  </div>
                </div>
                <div class="peer peer-greed">
                  <h6 class="lh-1 mB-0 logo-text">{{ title }}</h6>
                </div>
              </div>
            </router-link>
          </div>
          <div class="peer">
            <div class="mobile-toggle sidebar-toggle">
              <a class="td-n" @click.prevent="toggleSidebar">
                <i class="icon-arrow-circle-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu pos-r">
        <sidebar-element-c title="Home" :route="{ name: 'home' }">
          <template v-slot:icon>
            <i class="c-blue-500 icon-home"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Stock Management" :route="{ name: 'stockmgmt' }">
          <template v-slot:icon>
            <i class="c-purple-500 icon-music-alt"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="User Submissions" :route="{ name: 'usersubmissions' }">
          <template v-slot:icon>
            <i class="c-red-500 icon-user"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Order Management" :route="{ name: 'ordermgmt' }">
          <template v-slot:icon>
            <i class="c-orange-500 icon-package"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Download Management" :route="{ name: 'downloadmgmt' }">
          <template v-slot:icon>
            <i class="c-yellow-500 icon-download"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Generate Files" :route="{ name: 'filegenerator' }">
          <template v-slot:icon>
            <i class="c-green-500 icon-files"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="E-mails" :route="{ name: 'emails' }">
          <template v-slot:icon>
            <i class="c-light-blue-500 icon-email"></i>
          </template>
        </sidebar-element-c>
        <!--

        <sidebar-element-c title="Dashboard" :route="{ name: 'dashboard' }">
          <template v-slot:icon>
            <i class="c-blue-500 icon-home"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Email" :route="{ name: 'inbox' }">
          <template v-slot:icon>
            <i class="c-brown-500 icon-email"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Compose" :route="{ name: 'compose' }">
          <template v-slot:icon>
            <i class="c-blue-500 icon-share"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Calendar" :route="{ name: 'calendar' }">
          <template v-slot:icon>
            <i class="c-deep-orange-500 icon-calendar"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Chat" :route="{ name: 'chat' }">
          <template v-slot:icon>
            <i class="c-deep-purple-500 icon-comment-alt"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Charts" :route="{ name: 'charts' }">
          <template v-slot:icon>
            <i class="c-indigo-500 icon-bar-chart"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="Forms" :route="{ name: 'forms' }">
          <template v-slot:icon>
            <i class="c-light-blue-500 icon-pencil"></i>
          </template>
        </sidebar-element-c>

        <sidebar-element-c title="UI Elements" :route="{ name: 'ui' }">
          <template v-slot:icon>
            <i class="c-pink-500 icon-palette"></i>
          </template>
        </sidebar-element-c>

        <sidebar-dropdown-c title="Tables">
          <template v-slot:icon>
            <i class="c-pink-500 icon-palette"></i>
          </template>
          <template v-slot:entries>
            <sidebar-dropdown-element-c
              title="Basic Tables"
              :route="{ name: 'basictables' }"
            />
            <sidebar-dropdown-element-c
              title="Data Tables"
              :route="{ name: 'datatables' }"
            />
          </template>
        </sidebar-dropdown-c>

        <sidebar-dropdown-c title="Maps">
          <template v-slot:icon>
            <i class="c-purple-500 icon-map"></i>
          </template>
          <template v-slot:entries>
            <sidebar-dropdown-element-c
              title="Open Street Map"
              :route="{ name: 'openstreetmap' }"
            />
          </template>
        </sidebar-dropdown-c>

        <sidebar-dropdown-c title="Pages">
          <template v-slot:icon>
            <i class="c-red-500 icon-files"></i>
          </template>
          <template v-slot:entries>
            <sidebar-dropdown-element-c
              title="Blank"
              :route="{ name: 'blank' }"
            />
            <sidebar-dropdown-element-c
              title="404 Error"
              :route="{ name: 'error404' }"
            />
            <sidebar-dropdown-element-c
              title="500 Error"
              :route="{ name: 'error500' }"
            />
            <sidebar-dropdown-element-c
              title="Log In"
              :route="{ name: 'login' }"
            />
            <sidebar-dropdown-element-c
              title="Sign Up"
              :route="{ name: 'signup' }"
            />
          </template>
        </sidebar-dropdown-c>

        <sidebar-dropdown-c title="Multiple Levels">
          <template v-slot:icon>
            <i class="c-teal-500 icon-view-list-alt"></i>
          </template>
          <template v-slot:entries>
            <sidebar-dropdown-element-c title="Menu Item" route="#menu1" />
            <sidebar-dropdown-c title="Menu Item">
              <template v-slot:entries>
                <sidebar-dropdown-element-c title="Menu Item" route="#menu2" />
                <sidebar-dropdown-element-c title="Menu Item" route="#menu3" />
              </template>
            </sidebar-dropdown-c>
          </template>
        </sidebar-dropdown-c>
        -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SidebarElementC from "./SidebarElement.vue";
import SidebarDropdownC from "./SidebarDropdown.vue";
import SidebarDropdownElementC from "./SidebarDropdownElement.vue";
import { AppModule } from "../store/modules/app";

@Component({
  name: "SidebarC",
  components: {
    SidebarElementC,
    SidebarDropdownC,
    SidebarDropdownElementC
  }
})
export default class SidebarC extends Vue {
  @Prop({ default: "Vue Adminator" }) private title!: string;

  toggleSidebar() {
    AppModule.toggleCollapse();
  }

  get theme() {
    return AppModule.theme;
  }
}
</script>

<style lang="sass">
@import '@/style/global.sass';

// Hotfix for problems with scrollbar when all elements are unfolded
// .sidebar-menu has to be set to overflow-x: hidden on revert of this fix
.is-collapsed
  .sidebar-menu
    overflow: auto !important

.sidebar
  +theme(background-color, bgc-sidebar)
  bottom: 0
  overflow: hidden
  position: fixed
  top: 0
  transition: all 0.2s ease
  width: $offscreen-size
  z-index: 1002

  // Custom icon coloring
  .sidebar-icon-dashboard
    +theme(color, c-sidebar-icon-dashboard)
  .sidebar-icon-manage
    +theme(color, c-sidebar-icon-manage)
  .sidebar-icon-feed
    +theme(color, c-sidebar-icon-feed)
  .sidebar-icon-map
    +theme(color, c-sidebar-icon-map)

  ul
    list-style-type: none

  +between($breakpoint-md, $breakpoint-xl)
    &:hover
      width: $offscreen-size

      .sidebar-inner
        .sidebar-logo
          border-bottom-width: 1px
          border-bottom-style: solid
          +theme-color-diff(border-bottom-color, bgc-navbar, 6)
          padding: 0 20px

        .sidebar-menu
          > li
            > a
              .title
                display: inline-block

          li
            &.dropdown
              .arrow
                opacity: 1

            &.open
              > ul.dropdown-menu
                display: block !important


  +to($breakpoint-md)
    left: -$offscreen-size
    width: calc(#{$offscreen-size} - 30px)

// ---------------------------------------------------------
// @Sidebar Inner
// ---------------------------------------------------------

.sidebar-inner
  position: relative
  height: 100%

// ---------------------------------------------------------
// @Sidebar Header
// ---------------------------------------------------------

.sidebar-logo
  border-bottom-width: 1px
  border-bottom-style: solid
  +theme-color-diff(border-bottom-color, bgc-navbar, 6)
  border-right-width: 1px
  border-right-style: solid
  +theme-color-diff(border-right-color, bgc-navbar, 6)
  line-height: 0
  padding: 0
  transition: all 0.2s ease
  height: $header-height
  position: relative
  width: 100%

  a 
    position: absolute

  .logo
    height: $header-height

    img
      position: relative
      top: 20%
      height: 60%

  .logo-text
    +theme(color, c-logo-text)
    padding-left: 15px
    overflow: hidden
    white-space: nowrap

  .mobile-toggle
    display: none
    float: right
    font-size: 18px
    padding-right: 25px
    line-height: calc(#{$header-height} - 1px)

    a
      +theme(color, c-default-text)

    +to($breakpoint-md)
      display: inline-block


    +between($breakpoint-md, $breakpoint-xl)
      display: none

// ---------------------------------------------------------
// @Sidebar Menu
// ---------------------------------------------------------

.sidebar-menu
  border-right-width: 1px
  border-right-style: solid
  +theme-color-diff(border-right-color, bgc-navbar, 6)
  height: calc(100vh - #{$header-height})
  list-style: none
  margin: 0
  overflow: auto
  padding: 0
  position: relative

  &::after
    // Leave some space at the bottom of the sidebar
    height: 20vh
    width: 100%

  .dropdown-toggle::after
    display: none

  .sidebar-link
    &.router-link-exact-active,
    &.router-link-active
      +theme(background-color, bgc-sidebar-active)
      .dot-holder
        +theme(background, c-sidebar-dot)
        border-radius: 50%
        font-size: 10px
        line-height: 45px
        content: ''
        display: block
        height: 8px
        left: -4px
        position: absolute
        top: calc(50% - 4px)
        width: 8px
        +theme(color, c-sidebar-icon-active)

      .icon-holder i
        +theme(color, c-sidebar-icon-active)

      .title
        +theme(color, c-sidebar-text)
        text-decoration: none
        font-weight: bold

  li
    position: relative

    &.dropdown
      .arrow
        line-height: 35px
        height: auto
        right: 20px
        position: absolute
        transition: all 0.05s ease-in

        +to($breakpoint-md)
          right: 25px

      .dropdown-menu
        +clearfix
        position: relative
        display: block

    a
      +theme-color-diff(color, c-default-text, 50)
      transition: all 0.3s ease

      &:hover,
      &:focus
        +theme(color, c-default-text)
        text-decoration: none

        .icon-holder
          color: $default-info

  li
    &.dropdown
      ul
        &.dropdown-menu
          background-color: inherit
          border-radius: 0
          border: 0
          box-shadow: none
          float: none
          padding-top: 0
          position: relative
          width: 100%

          > li
            .dropdown-menu
              > li > a
                padding: 10px 15px 10px 85px
            > a
              display: block
              padding: 10px 15px 10px 70px

              &:hover,
              &:focus
                background-color: transparent
                color: $default-dark

            &.active
              a
                color: $default-dark

          .icon-holder
            display: none

          .arrow
            margin-top: -7px

    a
      display: block
      font-size: 15px
      font-weight: 500
      padding: 0px 15px
      position: relative
      white-space: nowrap

      .icon-holder
        border-radius: 6px
        display: inline-block
        font-size: 17px
        height: 35px
        left: 0
        line-height: 35px
        margin-right: 14px
        position: relative
        text-align: center
        transition: all 0.3s ease
        width: 35px

// ---------------------------------------------------------
// @Sidebar Collapsed
// ---------------------------------------------------------

.is-collapsed
  .sidebar
    +from($breakpoint-md)
      width: $collapsed-size

      .sidebar-inner
        .sidebar-logo
          border-bottom: 1px solid transparent
          .logo-text
            display: none

      .sidebar-menu
        overflow: hidden

        > li
          > a
            .title
              display: none

        li
          &.dropdown
            .arrow
              opacity: 0

            &.open
              ul.dropdown-menu
                display: none !important

      &:hover
        width: $offscreen-size

        .sidebar-inner
          .sidebar-logo
            border-bottom-width: 1px
            border-bottom-style: solid
            +theme-color-diff(border-bottom-color, bgc-navbar, 6)
            padding: 0 20px

          .sidebar-menu
            > li
              > a
                .title
                  display: inline-block

            li
              &.dropdown
                .arrow
                  opacity: 1

              &.open
                > ul.dropdown-menu
                  display: block !important

    +to($breakpoint-md)
      left: 0
</style>
