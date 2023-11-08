<template>
  <div
    class="vue-country-intl-schema-popover"
    ref="popoverContainer">
    <slot></slot>
    <teleport :disabled="!appendToBody" to="body">
      <EasyestDropdownTransition
        :reference-ref="popoverContainer"
        :will-visible="popoverWillVisible"
        :customTransitionName="() => transitionName">
        <div
          v-if="popoverDisplay"
          v-show="popoverVisible"
          class="vue-country-intl-popover"
          :class="popoverClass"
          ref="popover">
          <div class="search-input-box">
            <input type="text" class="search-input" autocomplete="off" v-model="searchText" :placeholder="searchInputPlaceholder">
          </div>
          <country-list
            ref="countryList"
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
            @update:modelValue="onModelValueChange"
            @onChange="onCountryChange">
          </country-list>
          <div class="vue-country-intl-popover-arrow"></div>
        </div>
      </EasyestDropdownTransition>
    </teleport>
  </div>
</template>

<script>
import index from './schema-popover';

export default index;
</script>

<style>
@import "schema-popover.css";
</style>
