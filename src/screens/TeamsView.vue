<template>
    <keep-alive>
        <div class="row">
            <div v-for="team in (this.$store.state.teams || [])" :key="team.id"
                 class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <router-link :to="'/team/' + team.id" style="text-decoration: none;">
                    <Counter
                            :team="true"
                            :name="team.name"
                            :logo="team.logo"
                            :count="team.count"
                            :color="team.color"
                            :loading="!team.loaded"
                            :details="$store.state.teamDetails[team.id]"
                    />
                </router-link>
            </div>
        </div>
    </keep-alive>
</template>
<script>
    import Counter from '@/components/Counter';

    export default {
        components: {
            Counter
        }
    }
</script>
