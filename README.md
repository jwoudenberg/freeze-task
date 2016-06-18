# Freeze Task
[![NPM version](http://img.shields.io/npm/v/freeze-task.svg?style=flat-square)](https://www.npmjs.com/package/freeze-task) [![Build status](http://img.shields.io/travis/jwoudenberg/freeze-task/master.svg?style=flat-square)](https://travis-ci.org/jwoudenberg/freeze-task) [![Dependencies](https://img.shields.io/david/jwoudenberg/freeze-task.svg?style=flat-square)](https://david-dm.org/jwoudenberg/freeze-task)

Ensure a tasks computation is executed at most once, returning the same result each time it is forked.

When a task is forked twice its default behavior is two execute its computation twice.
A frozen task computes once when fork is called the first time, caching the result for later forks.

```js
var Task = require('data.task'); // Use any Task library here.
var freeze = require('freeze-task')(Task);

var counter = 0;
var task = new Task((reject, resolve) => resolve(counter++))

// Each time task is forked it's computation is executed.
task.fork(console.log, console.log) // => 0
task.fork(console.log, console.log) // => 1

// The computation of a freezed task is only executed a single time.
var frozenTask = freeze(task)
frozenTask.fork(console.log, console.log) // => 2
frozenTask.fork(console.log, console.log) // => 2
```

Note that the above example is meant merely to illustrate what the library does.
The case where you're expecting different results when forking a task multiple times is most likely precisely the sort of situation where you do not want to freeze.
