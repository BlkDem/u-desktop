<template>
  <div class="row">
    <div>
      <slot name="top">

      </slot>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      left
    </div>
    <div class="col-8">
      <MyMqtt />
    </div>
  </div>
  <div class="row">
    <div>
      <slot name="bottom">

      </slot>
    </div>
  </div>
</template>

<script>

import MyMqtt from './MyMqtt.vue';

export default {
  components: {
    MyMqtt
  }
}

</script>
