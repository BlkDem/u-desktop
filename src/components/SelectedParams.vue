<template>
  <div class=" max-height-76vh">
  <div class="m-1 py-1 px-2 border border-1 rounded-2 text-whites" v-for="(item, key) in items" :key="key">

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
        <div class="dropdown">
          <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1"
            data-bs-toggle="dropdown" aria-expanded="false">
            {{ items[key].frequency }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" @click="setFrequency(key, 1)" href="#">1s</a></li>
            <li><a class="dropdown-item" @click="setFrequency(key, 2)" href="#">2s</a></li>
            <li><a class="dropdown-item" @click="setFrequency(key, 3)" href="#">3s</a></li>
            <li><a class="dropdown-item" @click="setFrequency(key, 5)" href="#">5s</a></li>
            <li><a class="dropdown-item" @click="setFrequency(key, 10)" href="#">10s</a></li>
          </ul>
        </div>
      </div>


      <div class="col-1">
        <a href="#" @click="removeItem(key)">
          <i class="fa-solid fa-xmark text-danger"></i>
        </a>
      </div>

    </div>

  </div>
  <textarea class="form-control stick-bottom bg-dark text-info" v-bind:value="logs" rows="8" id="textarea_id"></textarea>
</div>

</template>

<script>

export default {

  emits: ['removeItem', 'setLog', 'setItemFrequency'],

  props: {
    items: {
      type: Array
    },

    logs: {
      type: String
    }
  },

  data() {
    return {
      paramFunc: []
    }
  },

  created(){
    this.paramFunc = this.items
  },

  mounted() {
    this.setTextareaScroll();
  },

  methods: {

    getParamNameID(key) {
      return this.items[key].param_name + ' (' + this.items[key].id + ')';
    },

    setTextareaScroll() {
      var textarea = document.getElementById('textarea_id');
      setInterval(() => {
        textarea.scrollTop = textarea.scrollHeight;
      }, 1000);
    },

    removeItem(key) {
      this.setLog(1, 'Item removed: ' + this.getParamNameID(key));
      this.$emit('removeItem', key);
    },

    setFrequency(key, interval){
      this.setLog(0,
        'Set Frequency for Item: ' + this.getParamNameID(key) +
        ' - Interval: ' + interval
      );
      this.$emit('setItemFrequency', this.items[key], interval)
    },

    setLog(log_level, log){
      this.$emit('setLog', log_level, log)
    }
  }
}

</script>

<style scoped>
.ul-top {
  z-index: 101;
  position: fixed;
  /* margin-top: -4px; */
}
.max-height-76vh {
  height: 76vh;
}
.stick-bottom {
  position: absolute;
  bottom: 32px;
  max-height: 200px;
  max-width: 99%;
}
</style>
