<template>
  <schema-input
    ref="schemaInput"
    v-if="schema === 'input'"
    v-bind="$props"
    :model-value="modelValue"
    @update:modelValue="onModelValueChange"
    @onChange="onChange">
    <template #vueCountryNoData><slot name="vueCountryNoData"></slot></template>
    <template #selected><slot name="selected"></slot></template>
  </schema-input>

  <schema-popover
    ref="schemaPopover"
    v-else-if="schema === 'popover'"
    v-bind="$props"
    :model-value="modelValue"
    @update:modelValue="onModelValueChange"
    v-model:visible="modalVisible"
    @onChange="onChange">
    <slot></slot>
    <template #vueCountryNoData><slot name="vueCountryNoData"></slot></template>
    <template #selected><slot name="selected"></slot></template>
  </schema-popover>

  <schema-modal
    ref="schemaModal"
    v-else-if="schema === 'modal'"
    v-bind="$props"
    :model-value="modelValue"
    @update:modelValue="onModelValueChange"
    v-model:visible="modalVisible"
    @onChange="onChange">
    <template #vueCountryNoData><slot name="vueCountryNoData"></slot></template>
    <template #selected><slot name="selected"></slot></template>
  </schema-modal>
</template>


<script>
import index from './vue3-country-intl';
export default index;
</script>

<style>
body.vue-country-ios{ /* 解决ios移动端document点击事件无效bug */
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
}
body.lock-scroll{
  overflow: hidden!important;
}
</style>
