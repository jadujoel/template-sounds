import { exec } from 'child_process'
import { watch } from 'chokidar'

const config = 'config/index.ts'
const outfile = 'dist/config.json'
const command = `npx ecas-encoder --config=${config} --outfile=${outfile} --writeSoundsDataFile=false`

const run = () => {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return
    }
    stdout && console.log(stdout)
    stderr && console.error(stderr)
  })
}

watch(['config', 'sounds'], { recursive: true })
.on('change', () => {
  run()
})
run()
