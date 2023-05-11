<template>
  <CommonCard :cardCaption="'Params'">
  <div class="">
  <!-- <div class="p-2 border border-1 rounded-4"> -->
  <div class="flex-left m-1 p-1 border border-1 rounded-2 text-white" v-for="(item, key) in params" :key="key">
    <i class="fa-solid fa-microchip fa-2x text-info"></i>
    <div class="p-2">{{ item.id }}</div>
    <div>

      <a href="#"
        @click.prevent="pushParam(item)">
        {{ item.param_name }}
      </a>
    <!-- </div> -->
    </div>
  </div>
</div>
</CommonCard>
</template>

<script>

import axios from 'axios';
import CommonCard from './CommonCard.vue'

export default {

  components: { CommonCard },

  emits: ['pushItem'],

  props: {
    microId: {
      type: String,
    }
  },

  data() {
    return {

      // token: 'npFLOv5yRgtGA4wBhhAtPUnrS7RDXnkAeLtlr6el',

      config: {
        headers: {
          Authorization: 'Bearer npFLOv5yRgtGA4wBhhAtPUnrS7RDXnkAeLtlr6el'
        },
      },

      // deviceLink: 'http://127.0.0.1:8000/api/devices/lookup/1/10',
      paramLink: 'http://127.0.0.1:8000/api/micro_params/read/page/1/20/',

      params: [],

    }
  },

  mounted() {
    //this.getDevices()
  },

  watch: {
    microId() {
      console.log('micro id')
      this.getParams(this.microId);
    }
  },

  methods: {
    async getParams(id) {

      const paramsData = await axios.get(
        this.paramLink + id,
        this.config
      )

      this.params = paramsData.data.data

      console.log(this.params)

    },

    pushParam(item) {
      this.$emit('pushItem', item)
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
