// const link = 'http://127.0.0.1:8000/api/';
const link = 'https://iotman.blkdem.ru/api/';

export default {
  config: {
    headers: {
      Authorization: 'Bearer npFLOv5yRgtGA4wBhhAtPUnrS7RDXnkAeLtlr6el'
    },
  },

  restHost: link,

  paramLink: link + 'micro_params/read/page/1/20/',

  deviceLink: link + 'devices/lookup/1/10',

  microLink:  link + 'device_micros/read/page/1/10',


}
