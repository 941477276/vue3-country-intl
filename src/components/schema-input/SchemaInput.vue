<template>
  <div
    class="vue-country-intl-inputer"
    ref="vueCountryIntlWrapper"
    :class="{
      'is-focused': inputFocused,
      'dropdown-list-on-bottom': listOnBottom,
      'dropdown-list-on-top': !listOnBottom,
      'vue-country-disabled': disabled,
      'vue-country-readonly': readonly,
      'is-static': static
    }">
    <div
      ref="inputWrap"
      class="country-intl-input-wrap"
      :class="{
        'no-data': !selected.item.name,
        'has-selected': selected.item.name
      }"
      @click="show">
      <input
        type="text"
        v-model="searchText"
        class="country-intl-input"
        autocomplete="off"
        ref="searchInput"
        @blur="hide"
        :aria-readonly="readonly"
        :aria-disabled="disabled"
        :placeholder="placeholder"
        :readonly="isIos && deviceWidth < 992 && iosMobileReadonly">
      <label class="country-intl-label">
        <span class="iti-flag" :class="selected.item.iso2" v-show="showLabelImg"></span>
        <span>{{viewText}}</span>
      </label>
      <label class="dropdown-flag"></label>
      <div class="prevent-click"></div>
    </div>
    <teleport to="body" :disabled="static || !appendToBody">
      <component
        :is="!static ? 'EasyestDropdownTransition' : 'div'"
        :will-visible="countryListWillShow"
        :reference-ref="inputWrap"
        :try-end-placement="false"
        :try-all-placement="false"
        :set-width="true"
        :customTransitionName="transitionName ? () => transitionName : undefined"
        @position-change="onPositionChange">
        <country-list
          class="vue-country-intl-inputer-dropdown"
          ref="countryList"
          v-if="countryListDisplay"
          v-show="countryListVisible"
          :model-value="modelValue"
          :search-text="searchText"
          :selectedText="selectedText"
          :show-selected-text="showSelectedText"
          :show-area-code="showAreaCode"
          :list-z-index="listZIndex"
          :type="type"
          :iso2="iso2"
          :search-able="searchAble"
          :disable-country="disableCountry"
          :only-country="onlyCountry"
          :no-data-text="noDataText"
          :use-chinese="useChinese"
          :root-slots="rootSlots"
          @onChange="onCountryChange"
          @update:modelValue="onModelValue">
        </country-list>
      </component>
    </teleport>
  </div>
</template>

<script>
  import index from './schema-input';
  export default index;
</script>

<style>
@import "schema-input.css";
</style>
