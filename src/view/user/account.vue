<template>
  <div class="account">
    <Alert type="warning" show-icon v-if="!verified">
      <Icon type="alert" slot="alert"></Icon>
      Please Verify Email.
    </Alert>

    <Menu mode="horizontal" theme="light" active-name="profile" class="mobileMenu">
      <router-link :to="`/user/${user.id}/profile`">
        <MenuItem name="profile">

          <Icon type="person"></Icon>
          Profile

        </MenuItem>
      </router-link>


      <router-link :to="`/user/${user.id}/address`">
        <MenuItem name="address">
          <Icon type="home"></Icon>
          Address


        </MenuItem>
      </router-link>


      <router-link :to="`/user/${user.id}/order`">
        <MenuItem name="order">
          <Icon type="clipboard"></Icon>
          Order
        </MenuItem>
      </router-link>
    </Menu>

    <Row>

      <Col span="4" :xs="4" :lg="6">

      <Menu theme="light" active-name="profile" class="deskMenu">
        <router-link :to="`/user/${user.id}/profile`">
          <MenuItem name="profile">

            <Icon type="person"></Icon>
            Profile

          </MenuItem>
        </router-link>


        <router-link :to="`/user/${user.id}/address`">
          <MenuItem name="address">
            <Icon type="home"></Icon>
            Address


          </MenuItem>
        </router-link>


        <router-link :to="`/user/${user.id}/order`">
          <MenuItem name="order">
            <Icon type="clipboard"></Icon>
            Order
          </MenuItem>
        </router-link>

      </Menu>


      </Col>
      <Col span="20" :xs="24" :lg="18">
      <router-view></router-view>






      </Col>

    </Row>


  </div>

</template>
<script>
  import { mapState } from 'vuex'
  import AV from 'leancloud-storage'
  import dateFormat from 'dateformat'

  export default {
    data () {
      return {


      }
    },
    components: {
    },
    methods: {


    },
    computed: mapState({
      user: state => state.user,
      email: state => state.user ? state.user.attributes.email : '',
      verified: state => state.user ? state.user.attributes.emailVerified : '',
      addresses: state => state.user ? state.user.attributes.addresses : []
    }),
    mounted () {

    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">



  @media (min-width: 768px) {
    .deskMenu {
      display: block;
    }
    .mobileMenu {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .deskMenu {
      display: none;
    }
    .mobileMenu {
      display: block;
    }
  }
</style>
