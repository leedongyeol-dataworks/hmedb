<template>
    <nav class="header integration">
    <!-- <nav class="header"> -->
        <div class="header_top">
            <h1 class="menu_title">Integration View</h1>
            <ul class="function">
                <li>
                    <img src="@/assets/img/h_profile_icon.svg" alt="">
                </li>
                <li>
                    <img src="@/assets/img/h_alert_icon.svg" alt="">
                </li>
                <li>
                    <img src="@/assets/img/h_config_icon.svg" alt="">
                </li>
            </ul>
        </div>
        <!-- .header.integration -->
        <div class="integration_bottom">
            <div class="resource">
                <span>Resource +</span>
                <ul class="resource_list">
                    <li>
                        <span class="resource_condition error"></span>
                        <span class="resource_name">[MDM] X 230dws</span>
                    </li>
                    <li>
                        <span class="resource_condition active"></span>
                        <span class="resource_name">[MDM] X 230dws</span>
                    </li>
                    <li>
                        <span class="resource_condition warning"></span>
                        <span class="resource_name">[MDM] X 230dws</span>
                    </li>
                </ul>
            </div>
            <div class="agent">
                <span class="title">Agent</span>
                <ul class="agent_list">
                    <li>
                        <span class="agent_condition error"></span>
                        <span class="agent_name">[MDM] X 230dws</span>
                    </li>
                    <li>
                        <span class="agent_condition active"></span>
                        <span class="agent_name">[MDM] X 230dws</span>
                    </li>
                    <li>
                        <span class="agent_condition warning"></span>
                        <span class="agent_name">[MDM] X 230dws</span>
                    </li>
                </ul>
                <span class="full_mode"></span>
            </div>
        </div>
        <!-- <div class="header_bottom">

        </div> -->
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>