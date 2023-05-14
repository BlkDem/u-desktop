<template>
  <div class="m-1 py-1 px-2 border border-1 rounded-2 text-white" v-for="(item, key) in items" :key="key">

    <div class="row">

      <div class="col-1">
        <i class="fa-solid fa-microchip text-success"></i>
      </div>

      <div class="col-1 text-info">
        {{ item.id }}
      </div>

      <div class="col-2">
        {{ item.type_name }}
      </div>

      <div class="col-2">
        {{ item.param_name }}
      </div>

      <div class="col-2 text-info">
        {{ item.param_value }}
      </div>

      <div class="col-2">
        gen
      </div>

      <div class="col-1">
        freq
      </div>

      <div class="col-1">
        <a href="#" @click="removeItem(key)">
          <i class="fa-solid fa-xmark text-danger"></i>
        </a>
      </div>

    </div>

    <!-- <i class="fa-solid fa-microchip fa-2x text-success"></i>
    <div class="p-2"><span class="mx-2">{{ item.id }}</span>

      <a href="#" @click="setItemForm(key)">
        {{ item.param_name }}
      </a>

    </div>
    <div>
      {{ item?.param_value }}
    </div>
    <div>
      <a href="#" @click="removeItem(key)">
        <i class="fa-solid fa-xmark fa-2x text-danger"></i>
      </a>
    </div> -->


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
