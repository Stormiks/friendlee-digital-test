<template functional>
  <button
    type="submit"
    class="btn"
    :class="{ loading: !!props.loading }"
    v-bind="$listeners"
  >
    <span>
      <slot />
    </span>
    <VueLoadingIndicator
      v-if="!!props.loading"
      style="--indicator-size: 21px"
    />
  </button>
</template>

<script>
export default {
  functional: true
}
</script>
