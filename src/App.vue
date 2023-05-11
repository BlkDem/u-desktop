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
        >

        </SelectedParams>
      </CommonCard>
    </template>

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

export default {
  name: 'App',
  components: {
    MasterSlaveLayout,
    TopNavbar,
    MainFooter,
    LoadControllers,
    CommonCard,
    SelectedParams
  },

  data() {
    return {
      microId: '',

      selectedParams: [],

    }
  },

  methods: {
    onMicroChange(id) {
      this.microId = id;
      console.log('event: ', id);
    },

    pushItem(item){
      if (!this.selectedParams.includes(item))
        this.selectedParams.push(item)
    },

    removeItem(key) {
      this.selectedParams.splice(key, 1);
    }

  }

}
</script>

<style>
@import './assets/App.scss';

</style>
