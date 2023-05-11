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
      >
      </LoadControllers>
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

export default {
  name: 'App',
  components: {
    MasterSlaveLayout,
    TopNavbar,
    MainFooter,
    LoadControllers
    // HelloWorld
  },

  data() {
    return {
      microId: '',
    }
  },

  methods: {
    onMicroChange(id) {
      this.microId = id;
      console.log('event: ', id);
    }
  }

}
</script>

<style>
@import './assets/App.scss';
#app {
  font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
