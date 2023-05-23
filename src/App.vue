<template>
  <MasterSlaveLayout>
    <template v-slot:top>
      <TopNavbar

        @onMicroChange = "onMicroChange"
        @playStopAction = "playStopAction"
      ></TopNavbar>
    </template>

    <template v-slot:left>
      <LoadControllers ref="loadControllers"
        :microId="microId"
        @pushItem="pushItem"
      >
      </LoadControllers>
    </template>

    <template v-slot:center>
      <CommonCard
        :cardCaption="'Selected'"
        :cardCaptionAdd="deviceAddress"
        :isAdditionalCaption="true"
      >
        <SelectedParams ref="selectedParamsRef"
          :items="selectedParams"
          :logs="paramLogs"
          :uptime="uptime"
          @removeItem="removeItem"
          @setItemFrequency="setItemFrequency"
          @setLog="setLog"
          @syncParam="syncParam"
        >
        </SelectedParams>
      </CommonCard>

      <MyMqtt ref="myMqtt"
          :selectedParams="selectedParams"
          @onMessage="onMessage"
          @setLog="setLog"
      ></MyMqtt>

    </template>

    <template v-slot:bottom>
      <MainFooter></MainFooter>
    </template>

  </MasterSlaveLayout>
</template>

<script>
import MasterSlaveLayout from './components/MasterSlaveLayout.vue';
import TopNavbar from './components/TopNavbar.vue';
import MainFooter from './components/MainFooter.vue';
import LoadControllers from './components/LoadControllers.vue';
import CommonCard from './components/CommonCard.vue';
import SelectedParams from './components/SelectedParams.vue';
import MyMqtt from './components/MyMqtt.vue';
import Generators from './emulator/generators';

export default {
  name: 'App',
  components: {
    MasterSlaveLayout,
    TopNavbar,
    MainFooter,
    LoadControllers,
    CommonCard,
    SelectedParams,
    MyMqtt
  },

  data() {
    return {
      microId: '',
      deviceAddress: 'please select a device',

      selectedParams: [],
      paramLogs: 'Logs',

      timers: [],

      uptime: 0,

    }
  },

  mounted() {
    setInterval(() => {
      this.uptime++;
    }, 1000);
  },

  methods: {

    setLog(log_level=0, ...args) {
      //Max Log Size is 2 kB
      if (this.paramLogs.length > 2048) this.paramLogs = '';

      let log_level_text = 'undefined: ';
      switch (log_level) {
        case 0: log_level_text = 'info: '; break;
        case 1: log_level_text = 'warning: '; break;
        case 2: log_level_text = 'error: '; break;
      }

      //Clear init value
      if (this.paramLogs==='Logs') this.paramLogs = ''
      this.paramLogs += log_level_text + [...args].join(' ') + "\r\n";
    },

    startActions() {

      let freq = 0

      for (let item in this.selectedParams) {

        freq = this.selectedParams[item].frequency * 1000
        if (isNaN(freq)) continue;
        // console.log(freq)

        const gen = Generators.Factory[this.selectedParams[item].func].value(this.selectedParams[item].args);

        this.timers.push(
            setInterval(() => {

              var payload = (typeof gen === 'function')?gen().toString():gen.toString();

              this.$refs.myMqtt.doPublish(
                this.selectedParams[item].param_fullname,
                payload
              )
          }, freq)
        );
      }
      console.log(this.timers)
    },

    stopActions() {
      for (let item in this.timers) {
        clearInterval(this.timers[item]);
      }
      this.timers = []
    },

    playStopAction(isExecuted) {
      if (!isExecuted) {
        this.stopActions();
      } else {
        this.startActions();
      }
    },

    onMicroChange(id, deviceAddress) {
      this.$refs.loadControllers.clearItems();
      // this.$refs.selectedParamsRef.clearItems();
      this.microId = id;
      this.deviceAddress = deviceAddress;

      this.setLog(0, 'Micro selected: ', `(${id})`, deviceAddress);
    },

    syncParam(key, item) {
      this.selectedParams[key] = item;
      console.log(this.selectedParams[key])
    },

    //set the generator frequency for the current param
    setItemFrequency(item, interval) {
      item.frequency = interval;
    },

    pushItem(item){

      //Max generate param count is 5
      if (this.selectedParams.length > 4) {
        this.setLog(1, 'Max selected param count is 5')
        return;
      }

      //Ignore if exists
      if (!this.selectedParams.includes(item)) {

        //create param full path for MQTT
        item.param_fullname = '/' + item.device_micro_idx + '/' + item.param_name
        item.timerId = -1;

        this.setLog(0, 'Param added: ' + item.param_name + ': ' + item.param_fullname)
        console.log(item)
        this.selectedParams.push(item)
      }
    },

    //remove current param from the testing array
    removeItem(key) {
      this.selectedParams.splice(key, 1);
    },

    // MQTT messages event
    onMessage(topic, message) {
      for (let item in this.selectedParams) {
        if (this.selectedParams[item].param_fullname === topic) {
          this.selectedParams[item].param_value = message;
        }
      }
    }
  }

}
</script>
