import * as Tone from 'tone'
let sampler

export const state = () => ({
  volume: 0.8,
  instrument: 'piano',
  instruments: [
    'bass-electric',
    'bassoon',
    'cello',
    'clarinet',
    'contrabass',
    'flute',
    'french-horn',
    'guitar-acoustic',
    'guitar-electric',
    'guitar-nylon',
    'harmonium',
    'harp',
    'organ',
    'piano',
    'saxophone',
    'trombone',
    'trumpet',
    'tuba',
    'violin',
    'xylophone',
  ],
  loaded: false,
})

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function getNoteFromNumber(number) {
  return {
    name: notes[number % 12],
    octave: Math.floor(number / 12)-1,
    number,
  }
}

function getNumberFromName(name) {
  let note = name[0]
  let octave = name[1]
  if (name.length === 3) {
    note += name[1]
    octave = name[2]
  }
  const i = notes.indexOf(note)
  const number = i + octave * 12
  return number
}

function getNameMinusOctave(name, octave) {
  let note = name[0]
  let o = name[1] - octave
  if (name.length === 3) {
    note += name[1]
    o = name[2] - octave
  }
  return note + o
}

export const actions = {
  init({ state, dispatch }) {
    document.addEventListener(
      'click',
      async () => {
        await Tone.start()
        dispatch('loadSounds', 'piano')
      },
      { once: true }
    )
  },
  loadSounds({ state, commit }, instrument) {
    if (sampler) sampler.dispose()
    commit('setIsLoaded', false)
    commit('setIntrument', instrument)

    sampler = new Tone.Sampler({
      urls: instruments[instrument],
      release: 1,
      baseUrl: `/samples/${instrument}/`,
    }).toDestination()

    Tone.loaded().then(() => {
      commit('setIsLoaded', true)
    })
  },
  playAndReleaseNote({ dispatch }, { note, duration, velocity }) {
    sampler.triggerAttackRelease(note, duration, undefined, velocity)
  },
  playTrack({ dispatch }, track) {
    const now = Tone.now() + 0.5
    track.notes.forEach((note) => {
      const number = getNumberFromName(note.name)
      setTimeout(() => {
        sampler.triggerAttackRelease(
          getNameMinusOctave(note.name, 1),
          note.duration,
          undefined,
          note.velocity
        )
        this.dispatch('inputs/pushNoteFromMidi', {
          number: number,
          duration: note.duration,
        })
      }, (note.time + now) * 1000)
    })
  },
  reload({ dispatch }) {
    console.log('reload')
    dispatch('loadSounds', 'piano')
  },
  playNote({ state }, { number, velocity }) {
    if (!state.loaded) return
    const note = getNoteFromNumber(number)
    // this.dispatch('midi/sendPlayNoteToOutputs', {
    //   note: note.name + note.octave,
    //   velocity,
    // })
    sampler.triggerAttack(note.name + note.octave, undefined, velocity)
  },
  stopNote({ state }, number) {
    const note = getNoteFromNumber(number)
    // this.dispatch('midi/sendStopNoteToOutputs', {
    //   note: note.name + note.octave,
    // })
    sampler.triggerRelease(note.name + note.octave)
  },
}

export const mutations = {
  setIsLoaded(state, loaded) {
    state.loaded = loaded
  },
  setVolume(state, volume) {
    state.volume = volume
    let db = (volume - 0.8) * 30
    if (volume == 0) {
      db = -Infinity
    }
    Tone.getDestination().volume.rampTo(db)
  },
  setIntrument(state, instrument) {
    state.instrument = instrument
  },
}

const instruments = {
  'bass-electric': {
    'A#2': 'As2.mp3',
    'A#3': 'As3.mp3',
    'A#4': 'As4.mp3',
    'A#5': 'As5.mp3',
    'C#2': 'Cs2.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    'C#5': 'Cs5.mp3',
    E2: 'E2.mp3',
    E3: 'E3.mp3',
    E4: 'E4.mp3',
    E5: 'E5.mp3',
    G2: 'G2.mp3',
    G3: 'G3.mp3',
    G4: 'G4.mp3',
    G5: 'G5.mp3',
  },

  bassoon: {
    A3: 'A3.mp3',
    C2: 'C2.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    E3: 'E3.mp3',
    G1: 'G1.mp3',
    G2: 'G2.mp3',
    G3: 'G3.mp3',
    A1: 'A1.mp3',
    A2: 'A2.mp3',
  },

  cello: {
    E3: 'E3.mp3',
    E4: 'E4.mp3',
    F2: 'F2.mp3',
    F3: 'F3.mp3',
    F4: 'F4.mp3',
    'F#3': 'Fs3.mp3',
    'F#4': 'Fs4.mp3',
    G2: 'G2.mp3',
    G3: 'G3.mp3',
    G4: 'G4.mp3',
    'G#2': 'Gs2.mp3',
    'G#3': 'Gs3.mp3',
    'G#4': 'Gs4.mp3',
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    'A#2': 'As2.mp3',
    'A#3': 'As3.mp3',
    'A#4': 'As4.mp3',
    B2: 'B2.mp3',
    B3: 'B3.mp3',
    B4: 'B4.mp3',
    C2: 'C2.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    D4: 'D4.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
    'D#4': 'Ds4.mp3',
    E2: 'E2.mp3',
  },

  clarinet: {
    D3: 'D3.mp3',
    D4: 'D4.mp3',
    D5: 'D5.mp3',
    F2: 'F2.mp3',
    F3: 'F3.mp3',
    F4: 'F4.mp3',
    'F#5': 'Fs5.mp3',
    'A#2': 'As2.mp3',
    'A#3': 'As3.mp3',
    'A#4': 'As4.mp3',
    D2: 'D2.mp3',
  },

  contrabass: {
    C1: 'C1.mp3',
    'C#2': 'Cs2.mp3',
    D1: 'D1.mp3',
    E1: 'E1.mp3',
    E2: 'E2.mp3',
    'F#0': 'Fs0.mp3',
    'F#1': 'Fs1.mp3',
    G0: 'G0.mp3',
    'G#1': 'Gs1.mp3',
    'G#2': 'Gs2.mp3',
    A1: 'A1.mp3',
    'A#0': 'As0.mp3',
    B2: 'B2.mp3',
  },

  flute: {
    A5: 'A5.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
    E3: 'E3.mp3',
    E4: 'E4.mp3',
    E5: 'E5.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
  },

  'french-horn': {
    D2: 'D2.mp3',
    D4: 'D4.mp3',
    'D#1': 'Ds1.mp3',
    F2: 'F2.mp3',
    F4: 'F4.mp3',
    G1: 'G1.mp3',
    A0: 'A0.mp3',
    A2: 'A2.mp3',
    C1: 'C1.mp3',
    C3: 'C3.mp3',
  },

  'guitar-acoustic': {
    F3: 'F3.mp3',
    'F#1': 'Fs1.mp3',
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
    G1: 'G1.mp3',
    G2: 'G2.mp3',
    G3: 'G3.mp3',
    'G#1': 'Gs1.mp3',
    'G#2': 'Gs2.mp3',
    'G#3': 'Gs3.mp3',
    A1: 'A1.mp3',
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    'A#1': 'As1.mp3',
    'A#2': 'As2.mp3',
    'A#3': 'As3.mp3',
    B1: 'B1.mp3',
    B2: 'B2.mp3',
    B3: 'B3.mp3',
    C2: 'C2.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    'C#2': 'Cs2.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    D1: 'D1.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    D4: 'D4.mp3',
    'D#1': 'Ds1.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
    E1: 'E1.mp3',
    E2: 'E2.mp3',
    E3: 'E3.mp3',
    F1: 'F1.mp3',
    F2: 'F2.mp3',
  },

  'guitar-electric': {
    'D#3': 'Ds3.mp3',
    'D#4': 'Ds4.mp3',
    'D#5': 'Ds5.mp3',
    E2: 'E2.mp3',
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
    'F#4': 'Fs4.mp3',
    'F#5': 'Fs5.mp3',
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    A5: 'A5.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
    'C#2': 'Cs2.mp3',
  },

  'guitar-nylon': {
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
    'F#4': 'Fs4.mp3',
    'F#5': 'Fs5.mp3',
    G3: 'G3.mp3',
    G5: 'G5.mp3',
    'G#2': 'Gs2.mp3',
    'G#4': 'Gs4.mp3',
    'G#5': 'Gs5.mp3',
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    A5: 'A5.mp3',
    'A#5': 'As5.mp3',
    B1: 'B1.mp3',
    B2: 'B2.mp3',
    B3: 'B3.mp3',
    B4: 'B4.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    'C#5': 'Cs5.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    D5: 'D5.mp3',
    'D#4': 'Ds4.mp3',
    E2: 'E2.mp3',
    E3: 'E3.mp3',
    E4: 'E4.mp3',
    E5: 'E5.mp3',
  },

  harmonium: {
    C2: 'C2.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    'C#2': 'Cs2.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    'C#5': 'Cs5.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    D4: 'D4.mp3',
    D5: 'D5.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
    'D#4': 'Ds4.mp3',
    E2: 'E2.mp3',
    E3: 'E3.mp3',
    E4: 'E4.mp3',
    F2: 'F2.mp3',
    F3: 'F3.mp3',
    F4: 'F4.mp3',
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
    G2: 'G2.mp3',
    G3: 'G3.mp3',
    G4: 'G4.mp3',
    'G#2': 'Gs2.mp3',
    'G#3': 'Gs3.mp3',
    'G#4': 'Gs4.mp3',
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    'A#2': 'As2.mp3',
    'A#3': 'As3.mp3',
    'A#4': 'As4.mp3',
  },

  harp: {
    C5: 'C5.mp3',
    D2: 'D2.mp3',
    D4: 'D4.mp3',
    D6: 'D6.mp3',
    D7: 'D7.mp3',
    E1: 'E1.mp3',
    E3: 'E3.mp3',
    E5: 'E5.mp3',
    F2: 'F2.mp3',
    F4: 'F4.mp3',
    F6: 'F6.mp3',
    F7: 'F7.mp3',
    G1: 'G1.mp3',
    G3: 'G3.mp3',
    G5: 'G5.mp3',
    A2: 'A2.mp3',
    A4: 'A4.mp3',
    A6: 'A6.mp3',
    B1: 'B1.mp3',
    B3: 'B3.mp3',
    B5: 'B5.mp3',
    B6: 'B6.mp3',
    C3: 'C3.mp3',
  },

  organ: {
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
    'D#1': 'Ds1.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
    'D#4': 'Ds4.mp3',
    'D#5': 'Ds5.mp3',
    'F#1': 'Fs1.mp3',
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
    'F#4': 'Fs4.mp3',
    'F#5': 'Fs5.mp3',
    A1: 'A1.mp3',
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    A5: 'A5.mp3',
    C1: 'C1.mp3',
    C2: 'C2.mp3',
  },

  piano: {
    A0: 'A0.mp3',
    A1: 'A1.mp3',
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    A5: 'A5.mp3',
    A6: 'A6.mp3',
    'A#0': 'As0.mp3',
    'A#1': 'As1.mp3',
    'A#2': 'As2.mp3',
    'A#3': 'As3.mp3',
    'A#4': 'As4.mp3',
    'A#5': 'As5.mp3',
    'A#6': 'As6.mp3',
    B0: 'B0.mp3',
    B1: 'B1.mp3',
    B2: 'B2.mp3',
    B3: 'B3.mp3',
    B4: 'B4.mp3',
    B5: 'B5.mp3',
    B6: 'B6.mp3',
    C0: 'C0.mp3',
    C1: 'C1.mp3',
    C2: 'C2.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
    C7: 'C7.mp3',
    'C#0': 'Cs0.mp3',
    'C#1': 'Cs1.mp3',
    'C#2': 'Cs2.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    'C#5': 'Cs5.mp3',
    'C#6': 'Cs6.mp3',
    D0: 'D0.mp3',
    D1: 'D1.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    D4: 'D4.mp3',
    D5: 'D5.mp3',
    D6: 'D6.mp3',
    'D#0': 'Ds0.mp3',
    'D#1': 'Ds1.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
    'D#4': 'Ds4.mp3',
    'D#5': 'Ds5.mp3',
    'D#6': 'Ds6.mp3',
    E0: 'E0.mp3',
    E1: 'E1.mp3',
    E2: 'E2.mp3',
    E3: 'E3.mp3',
    E4: 'E4.mp3',
    E5: 'E5.mp3',
    E6: 'E6.mp3',
    F0: 'F0.mp3',
    F1: 'F1.mp3',
    F2: 'F2.mp3',
    F3: 'F3.mp3',
    F4: 'F4.mp3',
    F5: 'F5.mp3',
    F6: 'F6.mp3',
    'F#0': 'Fs0.mp3',
    'F#1': 'Fs1.mp3',
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
    'F#4': 'Fs4.mp3',
    'F#5': 'Fs5.mp3',
    'F#6': 'Fs6.mp3',
    G0: 'G0.mp3',
    G1: 'G1.mp3',
    G2: 'G2.mp3',
    G3: 'G3.mp3',
    G4: 'G4.mp3',
    G5: 'G5.mp3',
    G6: 'G6.mp3',
    'G#0': 'Gs0.mp3',
    'G#1': 'Gs1.mp3',
    'G#2': 'Gs2.mp3',
    'G#3': 'Gs3.mp3',
    'G#4': 'Gs4.mp3',
    'G#5': 'Gs5.mp3',
    'G#6': 'Gs6.mp3',
  },

  saxophone: {
    'D#4': 'Ds4.mp3',
    E2: 'E2.mp3',
    E3: 'E3.mp3',
    E4: 'E4.mp3',
    F2: 'F2.mp3',
    F3: 'F3.mp3',
    F4: 'F4.mp3',
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
    'F#4': 'Fs4.mp3',
    G2: 'G2.mp3',
    G3: 'G3.mp3',
    G4: 'G4.mp3',
    'G#2': 'Gs2.mp3',
    'G#3': 'Gs3.mp3',
    'G#4': 'Gs4.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    'A#2': 'As2.mp3',
    'A#3': 'As3.mp3',
    B2: 'B2.mp3',
    B3: 'B3.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    'C#2': 'Cs2.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    D4: 'D4.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
  },

  trombone: {
    'A#2': 'As2.mp3',
    C2: 'C2.mp3',
    C3: 'C3.mp3',
    'C#1': 'Cs1.mp3',
    'C#3': 'Cs3.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    'D#1': 'Ds1.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
    F1: 'F1.mp3',
    F2: 'F2.mp3',
    F3: 'F3.mp3',
    'G#1': 'Gs1.mp3',
    'G#2': 'Gs2.mp3',
    'A#0': 'As0.mp3',
    'A#1': 'As1.mp3',
  },

  trumpet: {
    C5: 'C5.mp3',
    D4: 'D4.mp3',
    'D#3': 'Ds3.mp3',
    F2: 'F2.mp3',
    F3: 'F3.mp3',
    F4: 'F4.mp3',
    G3: 'G3.mp3',
    A2: 'A2.mp3',
    A4: 'A4.mp3',
    'A#3': 'As3.mp3',
    C3: 'C3.mp3',
  },

  tuba: {
    'A#1': 'As1.mp3',
    'A#2': 'As2.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    'D#1': 'Ds1.mp3',
    F0: 'F0.mp3',
    F1: 'F1.mp3',
    F2: 'F2.mp3',
    'A#0': 'As0.mp3',
  },

  violin: {
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    A5: 'A5.mp3',
    A6: 'A6.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
    C7: 'C7.mp3',
    E4: 'E4.mp3',
    E5: 'E5.mp3',
    E6: 'E6.mp3',
    G4: 'G4.mp3',
    G5: 'G5.mp3',
    G6: 'G6.mp3',
  },

  xylophone: {
    C7: 'C7.mp3',
    G3: 'G3.mp3',
    G4: 'G4.mp3',
    G5: 'G5.mp3',
    G6: 'G6.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
  },
}