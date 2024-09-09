<template>
    <div class="warp" :class="{ active: sideState }">
      <Sidebar
        class="sidebar"
        :sideState="sideState"
        @sideToggle="sideToggle"
      ></Sidebar>
      <div class="layout">
        <layoutHeader />
        <main>
          <router-view />
        </main>
      </div>
    </div>
  </template>
  <script setup>
  import layoutHeader from "@/components/samples/sample_layout/layoutHeader.vue"
  import Sidebar from "@/components/samples/sample_layout/layoutSidebar.vue"
  </script>
  <script>
  export default {
    data() {
      return {
        sideState: false,
      }
    },
    methods: {
      sideToggle() {
        this.sideState = !this.sideState
      },
    },
  }
  </script>
  
  <style lang="scss">
  </style>
  