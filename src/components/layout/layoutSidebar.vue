<template>
    <nav>
        <h1 class="company_name">H
            <span>anamonEDB</span>
        </h1>
        <ul class="board">
            <li :class="{active : listSwitchState === 'menu'}" @click="listSwitch('menu')">Menu</li>
            <li :class="{active : listSwitchState === 'server'}" @click="listSwitch('server')">Server List</li>
            <li class="switch" @click="menuSwitch">
                <i class="ri-contract-right-line"></i>
            </li>
        </ul>
        <ul class="menu_1depth">
            <li :class="{active : listFocusState === 'dashboard'}" @click="listFocus('dashboard')">
                <i class="ri-dashboard-line"></i>
                <span>Dashboard</span>
                <ul class="menu_2depth">
                    <li>Integration view</li>
                    <li>Server view</li>
                </ul>
            </li>
            <li :class="{active : listFocusState === 'timeline'}" @click="listFocus('timeline')">
                <i class="ri-hourglass-2-fill"></i>
                <span>Timeline</span>
                <ul class="menu_2depth">
                    <li></li>
                </ul>
            </li>
            <li :class="{active : listFocusState === 'analysis'}" @click="listFocus('analysis')">
                <i class="ri-bar-chart-fill"></i>
                <span>Analysis</span>
                <ul class="menu_2depth">
                    <li></li>
                </ul>
            </li>
            <li :class="{active : listFocusState === 'operation'}" @click="listFocus('operation')">
                <i class="ri-draft-line"></i>
                <span>Operation</span>
                <ul class="menu_2depth">
                    <li></li>
                </ul>
            </li>
            <li :class="{active : listFocusState === 'report'}" @click="listFocus('report')">
                <i class="ri-search-2-line"></i>
                <span>Report</span>
                <ul class="menu_2depth">
                    <li></li>
                </ul>
            </li>
            <li :class="{active : listFocusState === 'config'}" @click="listFocus('config')">
                <i class="ri-settings-4-line"></i>
                <span>Config</span>
                <ul class="menu_2depth">
                    <li></li>
                </ul>
            </li>
        </ul>
        <div class="quick_menu">
            <i class="ri-grid-fill"></i>
        </div>
    </nav>
</template>
<script>
export default {
    props: ['sidestate'],
    data() {
        return {
            listSwitchState : 'menu',
            listFocusState: null
        }
    },
    methods: {
        menuSwitch() {
            this.$emit('sideToggle')
        },
        listSwitch(state) {
            this.listSwitchState = state
        },
        listFocus(focus) {
            this.listFocusState = focus
        }
    }
}
</script>

<style>

</style>