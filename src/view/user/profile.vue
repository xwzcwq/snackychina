<template>
  <div>
    <Card style="width:100%">
      <div style="">
        <div class="user_info"><span class="key">Email:</span> <span class="value">{{email}}</span>

        </div>
        <div class="user_info"><span class="key">Email Verification:</span>

          <Icon type="android-alert" color="#ed3f14" v-if="!verified"></Icon>
          <span style="color: #ed3f14" v-if="!verified">Not Verified</span>
          <Icon type="checkmark-circled" color="#19be6b" v-if="verified"></Icon>
          <span style="color: #19be6b" v-if="verified">Verified</span>
          <div v-if="!verified">
            <a>Not receive the verification email? Please check the spam. You can click on the button to resend</a>
            <Button type="info" @click="reSend">Resend</Button>

          </div>
        </div>


        <div class="user_info">
          <!--<span class="key">Recent Subscription</span>-->
          <span class="value"></span>
        </div>

      </div>
    </Card>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import AV from 'leancloud-storage'
  import dateFormat from 'dateformat'

  export default {
    data () {
      return {}
    },
    components: {},
    methods: {
      reSend () {

        AV.User.requestEmailVerify(this.email).then(function (result) {
          console.log(JSON.stringify(result))
        }, function (error) {
          console.log(JSON.stringify(error))
        })
      },

    },
    computed: mapState({
      user: state => state.user,
      email: state => state.user ? state.user.attributes.email : '',
      verified: state => state.user ? state.user.attributes.emailVerified : '',
    }),
    mounted () {

    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .user_info {

    .key {
      font-size: 1.5rem;
    }
    .value {

    }
  }
</style>
