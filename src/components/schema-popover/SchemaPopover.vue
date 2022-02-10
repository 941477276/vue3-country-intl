<template>
  <div class="vue-country-intl-schema-popover" ref="popoverContainer" :id="id">
    <slot></slot>
    <teleport to="body">
      <transition :name="transitionName">
        <div
          v-if="popoverDisplay"
          v-show="visible"
          class="vue-country-intl-popover"
          :class="[{'list-on-top': !listOnBottom, 'list-on-bottom': listOnBottom}, popoverClass]"
          ref="popover"
          :style="{left: popoverPosition.left, top: popoverPosition.top, maxWidth: popoverMaxWidth}">
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
          <div class="vue-country-intl-popover-arrow"></div>
        </div>
      </transition>
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
