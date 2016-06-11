module.exports = init

function init (Task) {
  return function freeze (task) {
    // A promise is perfect to use as a cache, because it already has the 'compute once' behavior we need.
    var promise = null
    return new Task((taskReject, taskResolve) => {
      if (!promise) {
        promise = new Promise((resolve, reject) => task.fork(reject, resolve))
      }
      promise.then(taskResolve, taskReject)
    })
  }
}
