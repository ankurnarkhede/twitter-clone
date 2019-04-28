/**
 * Created by ankur at 28/4/19 1:55 PM.
 */

import os from 'os'
import cluster from 'cluster'
import logger from './utils/logger'

logger.info(`NODE_ENV: ${process.env.NODE_ENV}`)

// enabling cluster in production
if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  logger.info(`Master process is running with pid: ${process.pid}`)
  // Count the machine's CPUs
  const cpuCount = os.cpus().length

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork()
  }

  // Listen for dying workers
  cluster.on('exit', (worker) => {
    logger.info(`Worker:${worker.process.pid} died. Spawning new worker.`)
    cluster.fork()
  })
} else {
  try {
    logger.info(
      `WORKER: ${cluster.worker.id} started with with PID: ${process.pid}`)
  } catch (l) {
    logger.info(`Express server started with with PID: ${process.pid}`)
  } finally {
    require('./bin/www')
  }
}
