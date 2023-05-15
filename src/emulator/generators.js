import random from "../helpers/random"

function* counter(start) {
  // let from = start;
  // while (true) {
  //   yield from++;
  // }
  while (true) {
    yield start++
  }
}

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
      value: (...args) => {
        let i = counter(parseInt(args[0][0]))
        // i.next()
        console.log('generated', i.next());
        // parseInt(args[0])
        // console.log('i: ', i, args);
        return parseInt(i.next().value);
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
