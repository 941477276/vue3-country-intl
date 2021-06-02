<template>
  <div class="vue-country-popover-container" ref="popoverContainer" :id="id">
    <slot></slot>
    <div class="vue-country-intl-popover-content" ref="popoverContent">
      <div class="search-input-box">
        <input type="text" class="search-input" autocomplete="off" v-model="searchText"
               :placeholder="searchInputPlaceholder">
      </div>
      <country-list
        ref="countryList"
        v-model="schemaPopoverValue"
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
        <template slot="vueCountryNoData">
          <slot name="vueCountryNoData"></slot>
        </template>
      </country-list>
    </div>
  </div>
</template>

<script>
import index from './schema-popover';

export default index;
</script>

<style>
@import "schema-popover.css";
</style>
