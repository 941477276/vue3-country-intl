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
        :name="name"
        :aria-readonly="readonly"
        :aria-disabled="disabled"
        :placeholder="placeholder"
        :readonly="isIos && deviceWidth < 992 && iosMobileReadonly">
      <label class="country-intl-label">
        <span class="iti-flag" :class="selected.item.iso2" v-show="showLabelImg"></span>
        <SlotRender slot-name="customInputLabel" :out-slots="rootSlots" :slot-data="Object.assign({}, selected.item)">
          <span class="country-intl-label-text">{{viewText}}</span>
        </SlotRender>
      </label>
      <label class="dropdown-flag"></label>
      <span v-if="!disabled && !!modelValue && clearable" class="clear-button" @click.stop="clear">
        <SlotRender slot-name="clear" :out-slots="rootSlots">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" ariaHidden="true" focusable="false"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
        </SlotRender>
      </span>
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
          :sort="sort"
          :filter="filter"
          :transform="transform"
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
