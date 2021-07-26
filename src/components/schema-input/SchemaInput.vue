<template>
  <div class="vue-country-intl-input"
       ref="vueCountryIntlWrapper"
       :class="{'focused': inputFocused, 'list-on-bottom': listOnBottom, 'list-on-top': !listOnBottom, 'vue-country-disabled': disabled, 'vue-country-readonly': readonly, 'static': static}">
    <div class="country-intl-input-wrap" ref="inputWrap" :class="{'no-data': !selected.item.name, 'has-selected': selected.item.name}" @click="show">
      <input type="text"
             v-model="searchText"
             class="country-intl-input"
             autocomplete="off"
             ref="searchInput"
             @blur="hide"
             :aria-readonly="readonly"
             :aria-disabled="disabled"
             :id="id + '-input'"
             :placeholder="placeholder"
             :readonly="isIos && deviceWidth < 992 && iosMobileReadonly">
      <label class="country-intl-label">
        <span class="iti-flag" :class="selected.item.iso2" v-show="showLabelImg"></span>
        <span>{{viewText}}</span>
      </label>
      <label class="dropdown-flag"></label>
      <div class="prevent-click"></div>
    </div>
    <transition :name="transitionName">
      <country-list
        ref="countryList"
        v-show="countryListVisible"
        v-model="schemaInputValue"
        :search-text="searchText"
        :selectedText="selectedText"
        :show-selected-text="showSelectedText"
        :type="type"
        :iso2="iso2"
        :search-able="searchAble"
        :disable-country="disableCountry"
        :only-country="onlyCountry"
        :no-data-text="noDataText"
        :use-chinese="useChinese"
        @onChange="onCountryChange">
        <template slot="vueCountryNoData"><slot name="vueCountryNoData"></slot></template>
      </country-list>
    </transition>

  </div>
</template>

<script>
  import index from './schema-input';
  export default index;
</script>

<style>
@import "schema-input.css";
</style>
