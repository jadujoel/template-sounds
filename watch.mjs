import { run } from '@netent-tech/ecas-encoder-cli'
import { watch } from 'chokidar'

const startTime = new Date().getTime() / 1000
function currentTime() {
  return new Date().getTime() / 1000 - startTime
}

run({
  config: 'config/index.ts',
  outfile: './dist/config.json',
  logger: 'console',
  checkVersion: false,
  validate: false,
  all: true,
}).then(() => {
  watch(['config', 'sounds'], { recursive: true })
  .on('change', path => {
      const changeTime = currentTime()
      run({
        config: 'config/index.ts',
        outfile: './dist/config.json',
        logger: 'none',
        checkVersion: false,
        validate: false,
        all: false,
      }).then(() => {
        console.log('[watch] took', currentTime() - changeTime, 'seconds')
      })
    })
  }
)
