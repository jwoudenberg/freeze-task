import test from 'ava'
import Task from 'data.task'
import freezeTaskInit from '../'
import { forkToPromise as fork } from 'fork-future'

const freeze = freezeTaskInit(Task)

const incrementingTask = () => {
  var counter = 0
  return new Task((reject, resolve) => resolve(counter++))
}

test('ordinary task gets executed each time it is forked', async t => {
  const task = incrementingTask()
  t.not(
    await fork(task),
    await fork(task)
  )
})

test('freezed task gets executed only once', async t => {
  const frozenTask = freeze(incrementingTask())
  t.is(
    await fork(frozenTask),
    await fork(frozenTask)
  )
})
