<template>
  <MasterSlaveLayout>
    <template v-slot:top>
      <TopNavbar
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
      <CommonCard :cardCaption="'Selected'">
        <SelectedParams
          :items="selectedParams"
          @removeItem="removeItem"
          @setItemForm="setItemForm"
        >
        </SelectedParams>
      </CommonCard>

      <MyMqtt
          :selectedParams="selectedParams"
          @onMessage="onMessage"
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
// import HelloWorld from './components/HelloWorld.vue'
import MasterSlaveLayout from './components/MasterSlaveLayout.vue'
import TopNavbar from './components/TopNavbar.vue'
import MainFooter from './components/MainFooter.vue'
import LoadControllers from './components/LoadControllers.vue'
import CommonCard from './components/CommonCard.vue'
import SelectedParams from './components/SelectedParams.vue'
// import SetupParam from './components/SetupParam.vue'
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
    // SetupParam,
    MyMqtt
  },

  data() {
    return {
      microId: '',

      selectedParams: [],

      selectedParam: {
        id: 0,
        param_name: ''
      },

    }
  },

  methods: {
    onMicroChange(id) {
      this.microId = id;
      console.log('event: ', id);
    },

    pushItem(item){
      if (this.selectedParams.length > 4) return;
      if (!this.selectedParams.includes(item)) {

        item.param_fullname = '/' + item.device_micro_idx + '/' + item.param_name

        switch (item.type_name) {
          case 'SIMPLE': {
            item['new_value'] = 0;
            break;
          }
          case 'BUTTON': {
            item['new_value'] = 0;
            break;
          }
          case 'SWITCH': {
            item['new_value'] = 0;
            break;
          }
          case 'CHECK': {
            item['checked'] = false;
            break;
          }
          case 'COLOR': {
            item['new_color'] = 0;
            break;
          }
          case 'RANGE': {
            item['range_from'] = 0
            item['range_to'] = 100
            break;
          }
        }

        console.log(item)
        this.selectedParams.push(item)
      }
    },

    removeItem(key) {
      this.selectedParams.splice(key, 1);
    },

    setItemForm(item) {
      this.selectedParam = item;
    },

    setNewParamValue(newParam, value, item) {
      this.selectedParams[this.selectedParams.indexOf(item)][newParam] = value
    },

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

<style>
@import './assets/App.scss';

</style>
