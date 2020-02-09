export default class DelayedPromise {
  constructor(fn, delay = 3000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    }).then(() => {
      return new Promise(fn);
    });
  }
};
