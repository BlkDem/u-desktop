<template>
  <div class="border-bottom border-2 border-secondary">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark p-2">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Umolab Devices</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="hide">
          <button class="btn btn-primary" id="toggle-dark-mode">Toggle Dark Mode</button>
          <button class="btn btn-primary" id="reset-to-system">Reset to System Theme</button>
        </div>



        <div class="collapse navbar-collapse" id="navbarCollapse">

          <!-- Devices -->
          <div class="dropdown px-2">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false">
              {{ selectedDevice }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(device, key) in devices" :key="key">

                <a class="dropdown-item" href="#" :class="{'disabled': device.micros_count<=0}"
                  @click="setDevice(device.id, device.device_name)">{{ device.device_name }}

                </a>
              </li>
            </ul>
          </div>
          <!-- end devices -->

          <!-- Micros -->
          <div class="dropdown px-2">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false">
              {{ selectedMicro }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(micro, key) in micros" :key="key">

                <a class="dropdown-item" href="#" @click="setMicro(micro)">{{ micro.micro_name }}

                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button v-if="!isExecuted" class="btn btn-primary"
            @click="isExecuted=!isExecuted">
            <i class="fa-solid fa-play text-success"></i>
          </button>
          <button v-if="isExecuted" class="btn btn-primary"
            @click="isExecuted=!isExecuted">
            <i class="fa-solid fa-stop text-danger"></i>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import axios from 'axios';
import Config from '@/config';

export default {

  emits: ['onMicroChange', 'playStopAction'],

  props: ['paramsCount'],

  data () {
    return {

      devices: [],
      micros: [],

      selectedDevice: 'Select Device',
      selectedDeviceID: 0,

      selectedMicro: 'Select Micro',
      selectedMicroID: 0,

      deviceAddress: '',

      isExecuted: false
    }
  },

  mounted() {
    this.getDevices()
  },

  watch: {
    isExecuted() {
      this.$emit('playStopAction', this.isExecuted)
    }
  },

  methods: {
    async getDevices() {

      const devicesData = await axios.get(
        Config.deviceLink,
        Config.config
      )

      this.devices = devicesData.data.data

      // console.log(this.devices)

    },

    async getMicros(id) {

      // console.log('getMicros')
      const microsData = await axios.get(
        Config.microLink + '/' + id,
        Config.config
      )

      this.micros = microsData.data.data

      return this.micros

    },

    setDevice(id, device_name) {
      this.selectedDevice = device_name
      this.selectedDeviceID = id
      this.getMicros(id)
    },

    setMicro(item) {
      this.selectedMicro = item.micro_name
      this.selectedMicroID = item.id
      this.deviceAddress = item.device_micro_idx + ' - ' + item.device_micro_desc
      this.$emit('onMicroChange', item.id, this.deviceAddress);
    },

    setParam(id) {
      console.log(id);
    }

  }
}

</script>

<style>
@import '../assets/App.scss';
</style>
