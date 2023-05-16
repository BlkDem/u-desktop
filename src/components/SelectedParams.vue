<template>
  <div class=" max-height-70vh">
  <div class="m-1 py-1 px-2 border border-1 rounded-2 text-whites"
    v-for="(item, key) in items" :key="key">

    <div class="row  text-vertical-center">

      <div class="col-1">
        <i class="fa-solid fa-microchip text-success mx-1"></i>
      </div>

      <!-- <div class="col-1 text-info">
        {{ item.id }}
      </div> -->

      <div class="col-2">
        ({{ item.id }})
        {{ item.type_name }}
      </div>

      <div class="col-2">
        {{ item.param_name }}
      </div>

      <div class="col-2 text-info">
        {{ item.param_value }}
      </div>

      <div class="col-3">
        <div class="dropdown">
          <button class="btn btn-success btn-sm dropdown-toggle w-100" type="button" id="dropdownMenuButton1"
            data-bs-toggle="dropdown" aria-expanded="false">
            {{ paramFunc[key].FuncName }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" @click="setFunction(key, 'F_RANGE', -10, 0)" href="#">Range (-10 0)</a></li>
            <li><a class="dropdown-item" @click="setFunction(key, 'F_RANGE', 0, 100)" href="#">Range (0 100)</a></li>
            <li><a class="dropdown-item" @click="setFunction(key, 'F_TIME')" href="#">Time</a></li>
            <li><a class="dropdown-item" @click="setFunction(key, 'F_COUNTER')" href="#">Counter</a></li>
            <li><a class="dropdown-item" @click="setFunction(key, 'F_RGB')" href="#">RGB</a></li>
            <li><a class="dropdown-item" @click="setFunction(key, 'F_SWITCH')" href="#">Switch (0-1)</a></li>
          </ul>
        </div>
      </div>

      <div class="col-1">
        <div class="dropdown">
          <button class="btn btn-info btn-sm dropdown-toggle w-100" type="button" id="dropdownMenuButton1"
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


      <div class="col-1 text-end">
        <a href="#" @click="removeItem(key)">
          <i class="fa-solid fa-xmark text-danger"></i>
        </a>
      </div>

    </div>

  </div>
  <textarea class="form-control stick-bottom bg-dark text-info" :value="logs" rows="8" id="textarea_id"></textarea>
  <div class="bottom-controls"><input type="checkbox" class="" id="autoscroll" v-model="autoscroll">
    <label for="autoscroll" class="mx-2">auto scroll</label> </div>
</div>

</template>

<script>

import Generators from '../emulator/generators';

export default {

  emits: ['removeItem', 'setLog', 'setItemFrequency', 'syncParam'],

  props: {
    items: {
      type: Array
    },

    logs: {
      type: String
    },

    uptime: {
      type: Number
    }
  },

  data() {
    return {
      paramFunc: [],
      autoscroll: true,
    }
  },

  created(){
    this.paramFunc = this.items
  },

  mounted() {
    this.textareaScrollBottom();
  },

  methods: {

    getParamNameID(key) {
      return this.items[key].param_name + ' (' + this.items[key].id + ')';
    },

    textareaScrollBottom() {
      var textarea = document.getElementById('textarea_id');
      setInterval(() => {
        if (this.autoscroll) {
          textarea.scrollTop = textarea.scrollHeight;
        }
      }, 1000);
    },

    removeItem(key) {
      this.setLog(1, 'Item removed: ' + this.getParamNameID(key));
      this.$emit('removeItem', key);
    },

    updateParamValue(key, value) {
      this.paramFunc[key].param_value = value
    },

    setFunction(key, func, ...args) {
      console.log(args.length)
      this.paramFunc[key].func = func;
      this.paramFunc[key].args = args;
      this.paramFunc[key].FuncName = Generators.Factory[func].FuncName
      this.paramFunc[key].FuncName += (args.length>0)?' (' + [...args].join(' ') + ')':'';

      this.$emit('syncParam', key, this.paramFunc[key]);

      console.log('paramFunc: ', this.paramFunc)
      // console.log(key, Generators.Gens[func].value(...args));
    },

    setFrequency(key, interval){
      this.setLog(0,
        'Set Frequency for Item: ' + this.getParamNameID(key) +
        ' - Interval: ' + interval
      );
      // this.$emit('setItemFrequency', this.items[key], interval)
      this.paramFunc[key].frequency = interval;
      this.$emit('syncParam', key, this.items[key]);
    },

    setLog(log_level, log){
      this.$emit('setLog', log_level, log)
    }
  }
}

</script>

<style scoped>
.max-height-70vh {
  height: 70vh;
}
.stick-bottom {
  position: absolute;
  bottom: 32px;
  max-height: 200px;
  max-width: 99%;
}
.bottom-controls {
  position: absolute;
  bottom: 8px;
  max-height: 20px;
  width: 99%;
}
.text-vertical-center {
  flex-direction: row;
  align-items: center;
}
</style>
