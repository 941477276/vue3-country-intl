<template>
  <teleport :disabled="!appendToBody" to="body">
    <transition :name="transitionName">
      <div class="vue-country-intl-modal" ref="intlModal" :class="modalClass" :style="{zIndex: listZIndex != 0 ? listZIndex : ''}" v-if="modalDisplay" v-show="modalVisible">
        <div class="country-modal-content">
          <div class="country-modal-search-box">
            <div class="modal-search-wrap">
              <input type="text" v-model="searchText" autocomplete="off" class="country-modal-search-input" :placeholder="searchInputPlaceholder"/>
              <span class="country-modal-search-cancel" @click="hide"><!--取消-->{{cancelText}}</span>
            </div>
          </div>
          <country-list
            v-show="countryListVisible"
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
            :transform="transform"
            @onChange="onCountryChange"
            @update:modelValue="onModelValueChange">
          </country-list>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
  import index from './schema-modal';

  export default index;
</script>

<style>
  @import "schema-modal.css";
</style>
