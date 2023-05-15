<template>
  <MasterSlaveLayout>
    <template v-slot:top>
      <TopNavbar
        :paramsCount="selectedParams.length"
        @onMicroChange = "onMicroChange"
      ></TopNavbar>
    </template>

    <template v-slot:left>
      <LoadControllers
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
        <SelectedParams
          :items="selectedParams"
          :logs="paramLogs"
          @removeItem="removeItem"
          @setItemFrequency="setItemFrequency"
          @setLog="setLog"
        >
        </SelectedParams>
      </CommonCard>

      <MyMqtt
          :selectedParams="selectedParams"
          @onMessage="onMessage"
          @setLog="setLog"
      ></MyMqtt>

    </template>

    <!-- <template v-slot:right>

      <CommonCard :cardCaption="'Setup'">
        <SetupParam
          :item="selectedParam"
          @setNewParamValue="setNewParamValue"
        >

        </SetupParam>
      </CommonCard>

    </template> -->

    <template v-slot:bottom>
      <MainFooter></MainFooter>
    </template>

  </MasterSlaveLayout>
</template>

<script>
import MasterSlaveLayout from './components/MasterSlaveLayout.vue'
import TopNavbar from './components/TopNavbar.vue'
import MainFooter from './components/MainFooter.vue'
import LoadControllers from './components/LoadControllers.vue'
import CommonCard from './components/CommonCard.vue'
import SelectedParams from './components/SelectedParams.vue'
import MyMqtt from './components/MyMqtt.vue';

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

      selectedParam: {
        id: 0,
        param_name: ''
      },

    }
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

    onMicroChange(id, deviceAddress) {
      this.microId = id;
      this.deviceAddress = deviceAddress;
      this.setLog(0, 'Micro selected: ', `(${id})`, deviceAddress);
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

        this.setLog(0, 'Param added: ' + item.param_name + ': ' + item.param_fullname)
        this.selectedParams.push(item)
      }
    },

    //remove current param from the testing array
    removeItem(key) {
      this.selectedParams.splice(key, 1);
    },

    //set the generator frequency for the current param
    setItemFrequency(item, interval) {
      item.frequency = interval;
    },


    // setNewParamValue(newParam, value, item) {
    //   this.selectedParams[this.selectedParams.indexOf(item)][newParam] = value
    // },

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
