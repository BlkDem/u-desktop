export default {
  Random(min, max) {
    minValue = Math.ceil(min);
    maxValue = Math.floor(max);
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
}
