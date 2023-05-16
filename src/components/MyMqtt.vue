
<template>
  <div></div>
  <!-- <CommonCard
    :cardCaption="'MQTT (' + selectedParams.length + ')'"
  >
    <h4 class="text-warning"></h4>
    <div class="text-info" v-for="(item, key) in selectedParams" :key="key">
      {{ item.param_fullname }} -> {{ item.param_value }}
    </div>
  </CommonCard> -->
</template>

<script>
import * as mqtt from "mqtt/dist/mqtt";
import MakeID from '../helpers/makeid';
import Config from '../config';
import CommonCard from "./CommonCard.vue";
// import ParsingErrors from '../helpers/ParsingErrors';

/* eslint-disable */

export default {

    components: { CommonCard },

    name: 'MQTT',

    emits: ['onConnect', 'onMessage', 'onError', 'setLog' ],

    props: ['selectedParams'],

    data() {
        return {

            // mqtt_server: '',
            // mqtt_protocol: '',
            // mqtt_port: '',

            connection: {
                host: 'ice9.umolab.ru',
                port: 9883,
                endpoint: '/',
                clean: true,

                connectTimeout: 4000,
                reconnectPeriod: 4000,
                protocol: '',
                clientId: '',
                username: 'umolab',
                password: '',
            },

            subscribtion: {
                topic: '',
                qos: 0,
            },

            publish: {
                topic: '',
                qos: 0,
                payload: '',
                retain: true
            },

            client: {
                connected: false,
            },

            subscribeSuccess: false,
        }
    },

    created() {
        this.connection.clientId = MakeID.makeId(8, 'mqtt_umolab_')
    },

    mounted() {
        this.getMQTTParams()
    },

    beforeUnmount() {
        this.destroyConnection()
        console.log(this.client.connected)
    },

    watch: {
      selectedParams: {
        immediate: true,
        deep: true,
        handler(newValue, oldValue) {
          this.processParams()
          //console.log(newValue, oldValue)
        }
      }
    },

    methods: {

      setLog(log_level, log) {
        this.$emit('setLog', log_level, log)
      },

      async getMQTTParams() {

        try {

          await axios.get(Config.restHost + 'presets/group/MQTT', Config.config)
            .then(response => {
              const configMQTT = response.data.data

              for (let item in configMQTT) {
                if (configMQTT[item].preset_key === 'MQTT_SERVER') this.connection.host = configMQTT[item].preset_value
                if (configMQTT[item].preset_key === 'MQTT_PROTOCOL') this.connection.protocol = configMQTT[item].preset_value
                if (configMQTT[item].preset_key === 'MQTT_PORT') this.connection.port = configMQTT[item].preset_value
              }
              this.createConnection()
            })
        } catch (error) {
          console.log(error);
        }
      },

      processParams() {
        for (let item in this.selectedParams) {
          // console.log(item)
          if (this.selectedParams[item]['param_in'] <= 0) {
            this.doSubscribe(this.selectedParams[item]['param_fullname'])
            this.setLog(0, 'Topic: ' +this.selectedParams[item]['param_fullname'] + ' subscribed');
          }
        }
      },

        createConnection() {

            // Connect string, and specify the connection method used through protodiv
            // ws unencrypted WebSocket connection
            // wss encrypted WebSocket connection
            // mqtt unencrypted TCP connection
            // mqtts encrypted TCP connection
            // wxs WeChat mini app connection
            // alis Alipay mini app connection

            const {
                host,
                port,
                endpoint,
                ...options
            } = this.connection

            const connectUrl = this.connection.protocol + '://' + this.connection.host + ':' + this.connection.port
            // const connectUrl = 'wss://ice9.umolab.ru:9883'

            try {
                // console.log(options)
                this.client = mqtt.connect(connectUrl, options)
            } catch (error) {
                console.log('MQTT: connect error', error)
            }

            this.client.on('connect', () => {
                console.log('MQTT: Connection succeeded!')
                this.setLog(0, 'MQTT: Connection succeeded!')
                this.$emit('onConnect', true)
                this.processParams()
            })

            this.client.on('error', error => {
                console.log('MQTT: Connection failed', error)
                this.$emit('onError', error)
            })

            this.client.on('message', (topic, message) => {
                // console.log(topic, message)
                this.setLog(0, 'MQTT topic: ' + topic + ' message: ' + message.toString())
                this.$emit('onMessage', topic, message.toString())

            })
        },

        // subscribtions
        doSubscribe(topic) {
            //   const { topic, qos } = this.subscribtion
            const qos = 0

            this.client.subscribe(topic, {
                qos
            }, (error, res) => {
                if (error) {
                    console.log('MQTT: Subscribe to topics error', error)
                    return
                }
                this.subscribeSuccess = true
                if (!res) {
                  this.setLog(0, 'MQTT: Subscribe to topics ' + JSON.stringify(res))
                  console.log('MQTT: Subscribe to topics res', res)
                }
            })
        },
        // unsubsribtions
        doUnSubscribe() {
            const {
                topic
            } = this.subscribtion
            this.client.unsubscribe(topic, error => {
                if (error) {
                    console.log('MQTT: Unsubscribe error', error)
                }
            })
        },

        // publish
        doPublish(topic, payload) {
            const {
                // topic,
                qos,
                // payload,
                retain
            } = this.publish
            this.client.publish(topic, payload, {
                'qos': qos,
                'retain': retain
            }, error => {
                if (error) {
                    console.log('MQTT: Publish error', error)
                }
            })
        },

        // disconnect
        destroyConnection() {
            if (this.client.connected) {
                try {
                    this.client.end()
                    this.client = {
                        connected: false,
                    }
                    console.log('MQTT: Successfully disconnected!')
                } catch (error) {
                    console.log('MQTT: Disconnect failed', error.toString())
                }
            }
        },
    },
}
</script>

