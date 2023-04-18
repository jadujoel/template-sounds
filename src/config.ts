import { type IEcasOptions, EcasEvents,  } from '@netent-tech/ecas-engine'
const options: IEcasOptions = {
  soundConfig: {
    settings: {
      sourcePaths: ['sounds'],
      targetPath: 'dist',
      formatPresets: [
        { package: 'desktop', presets: [ { id: 'main', formats: [{ bitrate: 128, channels: 2, format: 'webm' }]}]},
        { package: 'mobile', presets: [ { id: 'main', formats: [{ bitrate: 96, channels: 2, format: 'webm' }]}]}
      ]
    },
    sounds: [
      { id: 'music', group: 'music' },
      { id: 'fx', group: 'fx' },
      { id: 'impulse', group: 'fx' },
    ],
    groups: [
      { id: 'music', format: 'main', bus: 'master', limit: 1 },
      { id: 'fx', format: 'main', bus: 'master' }
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
    { id: 'start', actions: [ { type: 'playSound', args: ['music'], } ] },
    { id: 'spin', actions: [ { type: 'playSound', args: ['fx'] }, ] },
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
    logger: 'console'
  }
}

export default options