<template>
    <div>
        <div class="row">
            <div v-for="institution in (this.$store.state.institutions || [])" :key="institution.id"
                 class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <Counter
                        :team="false"
                        :name="institution.name"
                        :logo="institution.logo"
                        :count="institution.count"
                        :color="institution.color"
                        :details="{increment: institution.details.increment}"
                        :loading="!institution.loaded"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import Counter from "@/components/Counter";

    export default {
        components: {
            Counter
        }
    }
</script>
