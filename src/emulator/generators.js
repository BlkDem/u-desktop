import random from "../helpers/random"

// function* counter(start) {
//   // let from = start;
//   // while (true) {
//   //   yield from++;
//   // }
//   while (true) {
//     yield start++
//   }
// }

export default {

  Gens: {
    F_RANGE: {
      FuncName: 'Range',
      value: (...args) => {
        console.log('range: ', args[0])
        return random.Random(
          parseInt(args[0][0]),
          parseInt(args[0][1])
        );
      }
    },

    F_SWITCH: {
      FuncName: 'Switch',
      value: () => {
        return random.Random(0, 1);
      },
    },

    F_TIME: {
      FuncName: 'Time',
      value: () => {
        let date = new Date();
        return date.toLocaleTimeString();
      },
    },

    F_COUNTER: {
      FuncName: 'Counter',
      value: () => {
        return Math.round(new Date().getTime() / 1000);
      },
    },

    F_RGB: {
      FuncName: 'RGB',
      value: () => {
        return random.Random(0, 255) * 65536 + random.Random(0, 255) * 256 + random.Random(0, 255)
      }
    },
  }
}
