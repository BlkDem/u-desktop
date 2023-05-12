<template>
    <div class="p-1">
      <strong class="text-info">Name: </strong>{{ item?.param_name }} ({{ item?.id }})
      <strong class="text-info">Type: </strong>{{ item?.type_name }}
    </div>

    <!-- <div class="p-1">
      <strong class="text-info">Type: </strong>{{ item?.type_name }}
    </div> -->

    <div v-if="item?.type_name==='SIMPLE'" class="p-1">
      <strong class="text-info">Gen:</strong> Simple values 1-10
    </div>

    <div v-if="item?.type_name==='RANGE'" class="p-1">
      <div>
        <strong class="text-info">Gen:</strong> min-max
      </div>

      <div class="py-1">
        <strong class="text-info"> From </strong>(0-100)
        <strong class="text-info"> To </strong>(0-100)
        <div class="flex-space">
          <input type="number" class="form-control input-sm" :id="'from'+item?.id" name="rangeFrom" min="0" max="100"
            @change="setParamValue('range_from', $event.target.value, item)"
            :value="item.range_from"
          >
          <span class="mx-2">:</span>
          <input type="number" class="form-control input-sm" :id="'to'+item?.id" name="rangeTo" min="0" max="100"
            @change="setParamValue('range_to', $event.target.value, item)"
            :value="item.range_to"
          >
        </div>
      </div>
    </div>

</template>

<script>

export default {

  emits: ['setParam', 'setNewParamValue'],

  props: {
    item: {
      type: Object
    }
  },

  data() {
    return {
      setupParams: [],
      param: ''
    }
  },

  methods: {
    removeItem(item) {
      this.$emit('setParam', item)
    },

    setParamValue(newParam, value, item) {
      //'range_from' - param
      this.$emit('setNewParamValue', newParam, value, item)
    }

  }
}

</script>

<style scoped>
.input-sm {
  padding: 4px;
}
</style>
