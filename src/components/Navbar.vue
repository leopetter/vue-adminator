<template>
  <div class="header navbar">
    <div class="header-container">
      <!-- Leftmost search bar and sidebar toggle -->
      <ul class="nav-left">
        <li>
          <a
            id="sidebar-toggle"
            class="sidebar-toggle"
            @click.prevent="toggleSidebar"
          >
            <i class="icon-menu"></i>
          </a>
        </li>
        <!-- Search -->
        <li class="search-box" :class="{ active: searchToggled }">
          <a class="search-toggle no-pdd-right" @click.prevent="toggleSearch">
            <i class="search-icon icon-search pdd-right-10"></i>
            <i class="search-icon-close icon-close pdd-right-10"></i>
          </a>
        </li>
        <li class="search-input" :class="{ active: searchToggled }">
          <input
            class="form-control"
            ref="searchInput"
            v-model="search"
            type="text"
            placeholder="Search..."
          />
        </li>
      </ul>
      <!-- Rightmost notifications and account -->
      <!-- Notifications -->
      <ul class="nav-right">
        <!-- User account -->
        <account-dropdown-c
          username="Admin"
          picture="https://randomuser.me/api/portraits/lego/5.jpg"
        />

        <!--
        <notification-dropdown-c
          title="Notifications"
          :number="2"
          more="notifications"
        >
          <template v-slot:icon>
            <i class="icon-bell"></i>
          </template>
          <template v-slot:entries>
            <notification-dropdown-element-c
              headline="A notification..."
              sub-headline="13 mins ago"
            />
            <notification-dropdown-element-c
              headline="Another notification in your inbox"
              sub-headline="20 mins ago"
            />
          </template>
        </notification-dropdown-c>
        -->

        <li>
          <a
            title="Change theme"
            id="themeToggleBtn"
            @click="toggleTheme"
            class="btn"
          >
            <span class="icon icon-palette"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NotificationDropdownC from "../components/NotificationsDropdown.vue";
import NotificationDropdownElementC from "../components/NotificationDropdownElement.vue";
import EmailDropdownElementC from "../components/EmailDropdownElement.vue";
import AccountDropdownC from "../components/AccountDropdown.vue";
import { AppModule } from "../store/modules/app";

@Component({
  name: "NavigationBarC",
  components: {
    NotificationDropdownC,
    NotificationDropdownElementC,
    EmailDropdownElementC,
    AccountDropdownC
  }
})
export default class NavigationBarC extends Vue {
  protected searchToggled = false;
  protected search: boolean | null = null;

  toggleTheme() {
    AppModule.toggleTheme();
  }

  toggleSearch() {
    this.searchToggled = !this.searchToggled;
    window.setTimeout(() => {
      // Focus the input
      (this.$refs["searchInput"] as HTMLElement).focus();
    }, 0);
  }

  toggleSidebar() {
    AppModule.toggleCollapse();
    this.$redrawVueMasonry();
    setTimeout(() => {
      this.$redrawVueMasonry();
    }, 0.2 * 500);
  }
}
</script>

<style scoped lang="sass">
@import '@/style/global.sass';

.header
  z-index: 1001 !important

.inline-spinner
  display: inline-block
  position: relative

.header
  +theme(background-color, bgc-navbar)
  border-bottom-width: 1px
  border-bottom-style: solid
  +theme-color-diff(border-bottom-color, bgc-navbar, 6)
  display: block
  margin-bottom: 0
  padding: 0
  transition: all 0.2s ease
  position: fixed
  // transition: all 0.2s ease
  width: calc(100% - #{$offscreen-size})
  //width: 100%
  z-index: 800

  +to($breakpoint-md)
    width: 100%

  .header-container
    +clearfix

    .btn
      color: inherit
      height: calc(#{$header-height} / 2)

    .nav-left,
    .nav-right
      list-style: none
      margin-bottom: 0
      padding-left: 0
      position: relative

      > li
        float: right
        transition: all 0.1s ease-in-out
        line-height: $header-height

        > a
          display: block
          line-height: $header-height
          height: $header-height
          padding: 0 15px

          i
            font-size: 17px

          +to($breakpoint-md)
            padding: 0 15px

        &:hover,
        &:focus
          +theme(color, c-accent-text)
          text-decoration: none

    .nav-left
      float: left
      width: calc(100% - 200px)
      padding-left: 15px
      transition: 0.2s ease
      li
        float: left

      .sidebar-toggle
        .icon-menu
          cursor: pointer

    .nav-right
      float: right
      width: 200px
      padding-right: 10px

  .search-box
    cursor: pointer
    .search-icon-close
      display: none

    &.active
      .search-icon
        display: none

      .search-icon-close
        display: inline-block

  .search-input
    display: none

    &.active
      display: inline-block

    input
      +theme(color, c-default-text)
      background-color: transparent
      border: 0
      box-shadow: none
      font-size: 18px
      height: 40px
      margin-top: 12px
      outline: none
      padding: 5px
      width: 200px

      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

      +between($breakpoint-o, $breakpoint-xs)
        width: 90vw

      +placeholder
        color: lighten($default-text-color, 20%)
        font-style: italic

    .search-context
      padding-bottom: 15px
      .icon
        font-size: 0.7rem
      .results, .hints
        list-style: none
        width: 100%
        display: inline-block
        text-decoration: none
        margin: 0
        padding: 0

      .results>li, .hints>li>div
          +transition(all 0.2s ease-in)
          line-height: 20px
          vertical-align: middle
          padding: 2px 6px
          border-radius: 8px
          margin: 2px
          float: left
          cursor: pointer

    .search-context
      .results
        li
          +theme-color-diff(background-color, bgc-navbar, 10)
          &:hover
            +theme-color-diff(background-color, bgc-navbar, 20)

      .hints>li
        div
          border: 1px solid transparent
          +transition(all 0.2s ease-in)
          display: inline-block
          .icon
            opacity: 0
        &:hover
          div
            +theme-color-diff(border-color, bgc-navbar, 20)
            .icon
              opacity: 1

  #formControlRange
    appearance: none
    width: 100%
    height: 5px
    background: #d3d3d3
    outline: none
    opacity: 0.7
    -webkit-transition: .2s
    transition: opacity .2s

    &:hover
      opacity: 1

    &::-webkit-slider-thumb
      appearance: none
      width: 15px
      height: 15px
      border-radius: 50%
      background: #353535
      cursor: pointer

    &::-moz-range-thumb
      width: 15px
      height: 15px
      border-radius: 50%
      background: #353535
      cursor: pointer

// ---------------------------------------------------------
// @Collapsed State
// ---------------------------------------------------------

.is-collapsed
  .header
    width: calc(100% - #{$collapsed-size})

    +to($breakpoint-md)
      width: 100%

</style>
