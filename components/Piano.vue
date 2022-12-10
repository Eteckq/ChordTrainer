<template>
  <div class="m-auto" style="width: -moz-min-content; width: min-content">
    <!-- Piano -->
    <div class="flex">
      <!-- Center -->
      <div v-if="pianoNotes.length > 0" class="flex relative">
        <div v-if="!isLoaded" class="absolute inset-0 z-50">
          <p class="text-center py-48">Loading...</p>
        </div>
        <div v-for="(note, index) of pianoNotes" :key="index" class="relative">
          <div
            class="key"
            :class="[
              isSharp(note.name) ? 'black' : 'white',
              isPressed(note) ? 'pressed' : '',
              isHighlighted(note.name) ? 'light' : '',
            ]"
            @mousedown="pressNote(note)"
            @mouseup="removeNote(note)"
          >
            <span class="absolute inset-x-0" style="bottom: 15px">
              <span v-if="displayNotes">{{ note.name }}{{ note.octave }}</span>
              <span v-else-if="note.number % 12 === 0"
                >{{ note.name }}{{ note.octave }}</span
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    highlightedNotes: {
      type: Array,
      default: [],
    },
    pressedNotes: {
      type: Array,
      default: [],
    },
    displayNotes: {
      type: Boolean,
      default: false,
    },
    octaveLenght: {
      type: Number,
      default: 1,
    },
    startingOctave: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      pianoNotes: [],
      isLoaded: false,
    };
  },
  created() {
    this.buildPianoNotes();
  },
  methods: {
    buildPianoNotes() {
      const notes = [];
      for (let i = 0; i < this.octaveLenght; i++) {
        for (let j = 0; j < 12; j++) {
          let number = (this.startingOctave + 1 + i) * 12 + j;
          notes.push({
            number: number,
            name: this.getNameFromNumber(number),
            octave: this.startingOctave + i,
          });
        }
      }
      // Add last C
      let number = (this.octaveLenght + this.startingOctave + 1) * 12;
      notes.push({
        number: number,
        name: this.getNameFromNumber(number),
        octave: this.octaveLenght + this.startingOctave,
      });
      this.pianoNotes = notes;
      this.isLoaded = true;
    },
    isPressed(n) {
      return this.pressedNotes.some((note) => {
        return note.number === n.number;
      });
    },
    isHighlighted(name) {
      if(this.highlightedNotes.length == 0) return false
      return this.highlightedNotes.some((n) => {
        return n === name;
      });
    },
    isSharp(name) {
      return name[1] && name[1] === "#";
    },
    getNameFromNumber(number) {
      return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][
        Math.abs(number) % 12
      ];
    },
    pressNote(note) {
      this.$emit("onClickNote", note);
    },
    removeNote(note) {
      this.$emit("onReleaseNote", note);
    },
  },
};
</script>

<style scoped>
.key {
  transition: all 0.1s;
  text-align: center;
  font-size: 10px;
  color: rgb(167, 167, 167);
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
.key.white {
  color: black;
  width: 40px;
  height: 300px;
  z-index: 1;
  border-left: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset,
    0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #eee 0%, #fff 100%);
}
.key.black {
  position: absolute;
  color: white;
  left: -10px;
  width: 25px;
  height: 170px;
  z-index: 2;
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #222 0%, #555 100%);
}
.key.light.white {
  background: linear-gradient(rgb(228 255 77) 30%, rgb(255 253 225) 100%);
}
.key.light.black {
  background: linear-gradient(rgb(0 0 0) -40%, rgb(142 158 54) 100%);
}
.key.pressed.white {
  height: 295px;
  border-top: 1px solid #777;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset,
    -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
}
.key.pressed.black {
  height: 168px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
}
#rightPiano,
#leftPiano {
  height: 310px;
}
.pianoPart {
  background-color: #222;
}
input[type="range"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
}
</style>
