<template>
  <div
    class="input-wrapper"
    :class="{
      'input-wrapper--sum': !controls,
      disabled: disabled
    }"
  >
    <label :for="id" class="input__label">
      <slot name="label" />
    </label>
    <div class="input-container" :class="{ 'input-container--inputs': controls }">
      <template v-if="controls">
        <input
          type="number"
          class="input--sum"
          :id="id"
          :name="`wanted${id}`"
          :min="rangeMin"
          :max="rangeMax"
          v-model.number="rangeValue"
          @keydown="onInputNumber($event, rangeValue)"
        >
        <label :for="id" class="input__label-aux" :class="{ 'label-aux--accent': auxAccent }">
          <slot name="labelAux" />
        </label>
        <input
          class="input__range"
          type="range"
          :name="`range${id}`"
          :id="`range${id}`"
          :min="rangeMin"
          :max="rangeMax"
          :step="rangeStep"
          v-model.number="rangeValue"
        >
        <div class="slider-runnable-track-container" v-if="!disabled">
          <div class="runnable-track-custom" :style="{ width: runnableTrackStyles }"></div>
        </div>
      </template>
      <template v-else>
        <slot name="content" />
      </template>
    </div>
  </div>
</template>

<script>
const ALLOW_KEY_CODE_ARROWS = ['ArrowUp', 'ArrowDown']

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    controls: {
      type: Boolean,
      default: true
    },
    rangeMin: {
      type: Number,
      default: 0.1
    },
    rangeMax: {
      type: Number,
      default: 1.0
    },
    rangeStep: {
      type: Number,
      default: 0.1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0.1
    },
    auxAccent: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      rangeValue: 0,
      runnableTrackStyles: '0%'
    }
  },
  watch: {
    rangeMin: {
      handler: 'onChangeWidthTrack',
    },
    rangeMax: {
      handler: 'onChangeWidthTrack',
    },
    rangeStep: {
      handler: 'onChangeWidthTrack',
    },
    rangeValue: {
      handler: function(curVal) {
        this.onChangeWidthTrack();
        if (curVal < this.rangeMin || curVal > this.rangeMax) {
          return;
        }

        this.$emit('input', curVal);
      },
      immediate: true
    }
  },
  methods: {
    onChangeWidthTrack() {
      let runnableTrackWidth = ((this.rangeValue - this.rangeMin) / (this.rangeMax - this.rangeMin) * 100).toFixed(2);

      if (this.rangeValue < this.rangeMin) {
        runnableTrackWidth = '0%';
      } else if (this.rangeValue > this.rangeMax) {
        runnableTrackWidth = '100%';
      }

      this.runnableTrackStyles = `${runnableTrackWidth}%`;
    },
    onInputNumber(e, val) {
      if (ALLOW_KEY_CODE_ARROWS.includes(e.code)) {
        e.preventDefault()
      }

      switch (e.code) {
        case ALLOW_KEY_CODE_ARROWS[0]:
          val += this.rangeStep;
          break
        case ALLOW_KEY_CODE_ARROWS[1]:
          val -= this.rangeStep;
          break
      }

      if (val < this.rangeMin) {
        val = this.rangeMin
      } else if (val > this.rangeMax) {
        val = this.rangeMax
      }

      this.rangeValue = val;
    }
  },
  created() {
    this.rangeValue = this.value;
  }
}
</script>
