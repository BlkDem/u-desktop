<template>
    <div class="">
  <!-- <div class="p-2 border border-1 rounded-4"> -->
  <div class="flex-left m-1 p-1 border border-1 rounded-2 text-white" v-for="(item, key) in items" :key="key">
    <i class="fa-solid fa-microchip fa-2x text-info"></i>
    <div class="p-2">{{ item.id }}</div>
    <div>

      <a href="#" @click="removeItem(key)"

      >
        {{ item.param_name }}
      </a>
    <!-- </div> -->
    </div>
  </div>
</div>

</template>

<script>

export default {

  emits: ['removeItem'],

  props: {
    items: {
      type: Array
    }
  },

  methods: {
    removeItem(key) {
      this.$emit('removeItem', key)
    }
  }
}

</script>
