import { EcasEvents, type IEcasOptions, } from '@netent-tech/ecas-engine'
const options: IEcasOptions = {
  soundConfig: {
    settings: {
      sourcePaths: ['sounds'],
      targetPath: 'dist',
      formatPresets: [{
        package: 'main',
        presets: [{
          id: 'main',
          formats: [
            { bitrate: 112, channels: 2, format: 'webm' },
            { bitrate: 112, channels: 2, format: 'mp4' },
          ]
        }]
      }]
    },
    groups: [
      { id: 'music', format: 'main', bus: 'music', limit: 1 },
      { id: 'fx', format: 'main', bus: 'fx' }
    ],
    sounds: [
      { id: 'music', group: 'music' },
      { id: 'fx', group: 'fx' },
      { id: 'impulse', group: 'fx' },
    ],
    buses: [
      { id: 'music', destination: 'master' },
      { id: 'fx', destination: 'master' }
    ]
  },
  eventConfig: [
    {
      id: EcasEvents.Ready,
      actions: [
        { type: 'busAddFilter', args: [ { busId: 'master', id: 'lowpass', frequency: 20000, type: 'lowpass' } ], },
        { type: 'busAddConvolverReverb', args: [ { busId: 'master', id: 'reverb', impulseResponse: 'impulse', mix: 0 } ] }
      ]
    },
    {
      id: 'start', actions: [
        { type: 'playSound', args: ['music', { pitch: 0, volume: 0.2, loop: true }], },
        { type: 'playSound', args: ['fx', { pitch: -1200, volume: 0.2 }], }
      ]
    },
    { id: 'spin', actions: [ { type: 'playSound', args: ['fx', { }] }, ] },
    {
      id: 'inactive',
      actions: [{
        type: 'busApplyEnvelopeToFilter',
        args: [
          {
            busId: 'master',
            insertId: 'lowpass',
            paramId: 'frequency',
            points: [
              { pos: 0, val: 'current' },
              { pos: 400, val: 500, },
            ],
            curve: 'exponential'
          }
        ]
      }]
    },
    {
      id: 'active',
      actions: [{
        type: 'busApplyEnvelopeToFilter',
        args: [
          {
            busId: 'master',
            insertId: 'lowpass',
            paramId: 'frequency',
            points: [
              { pos: 0, val: 'current' },
              { pos: 400, val: 20000, },
            ],
            curve: 'exponential'
          }
        ]
      }]
    },
    { id: 'mute', actions: [ { type: 'mute', args: [] }, ] },
    { id: 'unmute', actions: [ { type: 'unmute', args: [] }, ] },
    { id: 'stop', actions: [ { type: 'stopAll', args: [] }, ] },
    { id: 'reverb_on', actions: [
      { type: 'busApplyEnvelopeToConvolverReverb', args: [{ busId: 'master', insertId: 'reverb', paramId: 'wet-gain', points: [{pos: 0, val: 'current'}, {pos: 500, val: 0.4 }] }] }
    ]},
    { id: 'reverb_off', actions: [
      { type: 'busApplyEnvelopeToConvolverReverb', args: [{ busId: 'master', insertId: 'reverb', paramId: 'wet-gain', points: [{pos: 0, val: 'current'}, {pos: 500, val: 0 }] }] }
    ]},
  ],
  stateConfig: {
    genesis: {
      events: {
        'start': 'start',
        'spin': 'spin',
        'inactive': 'inactive',
        'active': 'active',
        'mute': 'mute',
        'reverb_on': 'reverb_on',
        'reverb_off': 'reverb_off',
        'unmute': 'unmute',
        'stop': 'stop'
      },
      activatesOn: [],
      deactivatesOn: [],
      children: {}
    }
  },
  loadrConfig: {
    logger: 'console',
    packageToUse: 'main'
  }
}

export default options
