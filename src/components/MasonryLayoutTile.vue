<template>
  <div v-masonry-tile :class="['item', layoutStyle]">
    <div class="shadow-tile">
      <h6>{{ section }}</h6>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "MasonryLayoutTileC",
  components: {}
})
export default class MasonryLayoutTileC extends Vue {
  @Prop() private section!: string;
  @Prop({
    default: () => {
      return { "col-md-6": true };
    }
  }) private layoutStyle!: string;
  @Prop({ default: true }) private wrap!: boolean;
}
</script>

<style scoped lang="sass">
@import '@/style/global.sass';
.shadow-tile
  +transition(all 0.1s ease-in)
  +theme-color-darken(background-color, bgc-body, 3)

  margin: 20px 30px
  padding: 20px
  border-radius: 5px
  box-shadow: 0 10px 20px rgba(0,0,0,0.04), 0 6px 6px rgba(0,0,0,0.04)
  &:hover
    box-shadow: 0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.1)

</style>
