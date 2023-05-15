import random from "../helpers/random"

export default {
  Gens: {
    F_RANGE: {
      FuncName: 'Range',
      value: (...args) => {
        return random.Random(args[0], args[1]);
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
      value: (...args) => {
        let i = parseInt(args[0])
        console.log('i: ', i, args);
        return ++i;
      },
    },

    F_RGB: {
      FuncName: 'RGB',
      value: () => {
        return random.Random(0, 255) * random.Random(0, 255) * random.Random(0, 255);
      }
    },
  }
}
