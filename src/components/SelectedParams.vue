<template>
    <div class="">
  <!-- <div class="p-2 border border-1 rounded-4"> -->
  <div class="flex-space m-1 py-1 px-2 border border-1 rounded-2 text-white" v-for="(item, key) in items" :key="key">
    <i class="fa-solid fa-microchip fa-2x text-info"></i>
    <div class="p-2">{{ item.id }}

      <a href="#" @click="setItemForm(key)">
        {{ item.param_name }}
      </a>

    <!-- </div> -->
    </div>
    <div>
      <a href="#" @click="removeItem(key)">
        <!-- <i class="fa-regular fa-trash-can fa-2x text-danger"></i> -->
        <i class="fa-solid fa-xmark fa-2x text-danger"></i>
      </a>
    </div>
  </div>
</div>

</template>

<script>

export default {

  emits: ['removeItem', 'setItemForm'],

  props: {
    items: {
      type: Array
    }
  },

  methods: {
    removeItem(key) {
      this.$emit('removeItem', key)
    },

    setItemForm(key) {
      this.$emit('setItemForm', this.items[key]);
    }
  }
}

</script>
