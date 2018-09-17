<template>
  <div style="margin: 1rem;">
    <Card :bordered="false" v-if="address">
      <div slot="title" style="font-size: 1.5rem;font-weight: bold; display: flex; justify-content: space-between">
        <div>
          {{address.state}},{{address.country}} (
          <span
            style="font-size: 1.2rem">To: {{address.firstName.toUpperCase()}} {{address.lastName.toUpperCase()}} )</span>
        </div>
        <div slot="extra">
        </div>
      </div>
      <div style="font-size: 1.2rem">
        <div>Address: {{address.suite}},{{address.street}},{{address.city}}</div>
        <div>Phone: {{address.phone}}</div>

      </div>
      <Button type="ghost" ghost icon="edit" @click="edit(idx)">Edit</Button>

    </Card>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      address: {},
      edit: {
        required: true,
        type: Function
      },
      idx: {}
    },
    components: {},
    methods: {},
    computed: {},
    mounted () {}
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
