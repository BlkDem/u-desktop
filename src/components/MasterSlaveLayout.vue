<template>
  <div class="row">
    <div>
      <slot name="top">

      </slot>
    </div>
  </div>
  <div class="row">

    <div class="col-3 h-100">
      <slot name="left">

      </slot>
    </div>

    <div class="col-3 h-100">
      <slot name="center">

      </slot>
    </div>

    <div class="col-6">
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
