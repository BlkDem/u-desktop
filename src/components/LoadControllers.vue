<template>
  <CommonCard :cardCaption="'Params'">
    <div class="">
      <div class="m-1 py-1 px-2 border border-1 rounded-2 text-white row" v-for="(item, key) in params" :key="key">
        <div class="col-1">
          <i class="fa-solid fa-microchip text-info"></i>
        </div>
        <div class="col-3 text-center">{{ item.id }}</div>
        <div class="col-6">

          <a href="#" @click.prevent="pushParam(item)">
            {{ item.param_name }}
          </a>
        </div>
        <div class="col-1">
          <a href="#" @click.prevent="pushParam(item)">
            <i class="fa-regular fa-circle-right"></i>
          </a>
        </div>
      </div>
    </div>
  </CommonCard>
</template>

<script>

import axios from 'axios';
import CommonCard from './CommonCard.vue'
import Config from '@/config';

export default {

  components: { CommonCard },

  emits: ['pushItem'],

  props: {
    microId: {
      default: undefined,
    }
  },

  data() {
    return {

      params: [],

    }
  },

  mounted() {
    //this.getDevices()
  },

  watch: {
    microId() {
      this.getParams(this.microId);
    }
  },

  methods: {
    async getParams(id) {

      const paramsData = await axios.get(
        Config.paramLink + id,
        Config.config
      )

      this.params = paramsData.data.data

      // console.log(this.params)

    },

    pushParam(item) {
      this.$emit('pushItem', item)
    },

    clearItems() {
      this.params = []
    }

  }
}

</script>

<style scoped>
.params-panel {
  position: absolute;
    left: 20px;
    top: 56px;
    /* max-height: 50vh; */
    bottom: 64px;
    width: 25vw;
    overflow-y: auto;
}




</style>
