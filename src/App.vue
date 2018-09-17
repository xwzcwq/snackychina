<template>
  <div class="layout" :style="{backgroundColor:backgroundColor}">
    <div class="header">
      <Menu mode="horizontal" theme="dark" active-name="1" @on-select="handleRoute"
            style="display: flex; justify-content: space-between; align-items: center; padding: 0 1rem; background-color: #5cadff;">
        <div class="logo" @click="toIndex">Snacky China</div>
        <!--<div class="layout-logo" @click="toIndex"></div>-->
        <div style="margin: 0 auto;" class="desk_menu">
          <MenuItem name="subscription" width="auto">
            <Icon type="beer"></Icon>
            <!--Enjoy [纯正中国味道]-->
            Subscription
          </MenuItem>

          <MenuItem name="market">
            <Icon type="bowtie"></Icon>
            <!--Send A Gift-->
            Market
          </MenuItem>
          <MenuItem name="help">
            <Icon type="help"></Icon>
            FAQ
          </MenuItem>
        </div>

        <Button v-if="!user" type="ghost" @click="handleRoute('signin')" style="color: #fff">Login</Button>
        <Button v-if="!user" type="warning" @click="handleRoute('signup')" style="color: #fff; margin-left: 10px;">
          Signup
        </Button>
        <div v-else>
          <Dropdown placement="bottom-end" @on-click="handleRoute" class="desk_menu">
            <a href="javascript:void(0)" style="color: #b2ebf2">
              {{ user | userAvatar}}
              <Icon type="arrow-down-b"></Icon>
              <!--<Avatar :style="{background: user?'#f56a00':''}" :icon="user? '':'person'">{{ user | userAvatar }}</Avatar>-->
            </a>
            <!--<DropdownMenu slot="list" v-if="!user">-->
            <!--<DropdownItem name="signup">Sign Up</DropdownItem>-->
            <!--<DropdownItem name="signin">Sign In</DropdownItem>-->
            <!--</DropdownMenu>-->
            <DropdownMenu slot="list">
              <DropdownItem name="user">My Account</DropdownItem>
              <DropdownItem name="logout">Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button type="primary" shape="circle" :icon="collapsed?'close':'navicon-round'" @click="toggleCollapse"
                  style="background-color: rgb(92, 173, 255); border-color: rgb(92, 173, 255)"
                  class="mobile_menu"></Button>
        </div>


      </Menu>
      <collapse-transition>
        <div v-if="collapsed" class="collapse_panel">
          <ul>
            <li @click="handleRoute('subscription')">
              <Icon type="beer"></Icon>
              Subscription
            </li>
            <li @click="handleRoute('market')">
              <Icon type="bowtie"></Icon>
              <!--Send A Gift-->
              Market
            </li>
            <li @click="handleRoute('help')">
              <Icon type="help"></Icon>
              FAQ
            </li>
            <li @click="handleRoute('user')">
              <Icon type="person"></Icon>
              My Account
            </li>
            <li @click="handleRoute('logout')">
              <Icon type="log-out"></Icon>
              Logout
            </li>
          </ul>
        </div>

      </collapse-transition>



    </div>


    <router-view class="center_router"></router-view>
    <div class="term_sheet">
      <router-link to="/term">Terms of Services</router-link>
      <router-link to="/term">Privacy Police</router-link>
    </div>


    <Modal v-model="signin_dialog" width="360">
      <p slot="header" style="color:#57a3f3;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>Sign in</span>
      </p>
      <div style="text-align:center">
        <Input v-model="email" style="padding-bottom: 1rem">
        <Icon type="email" slot="prepend"></Icon>
        </Input>
        <Input v-model="password" type="password" style="padding-bottom: 1rem" @on-enter="signin">

        <Icon type="locked" slot="prepend"></Icon>

        </Input>

        <a @click="reset">Forget Password？Enter the email above and then click here</a>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" :loading="sign_loading" @click="signin">Login</Button>
        <Button type="ghost" size="large" @click="toSignup">Sign up</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
  import AV from 'leancloud-storage'
  import { mapState } from 'vuex'
  import CollapseTransition from './components/collapse_transition'

  export default {
    components: {CollapseTransition},
    data () {
      return {
        signin_dialog: false,
        sign_loading: false,
        email: '',
        password: '',
        collapsed: false
      }
    },
    mounted () {
      let sessionToken = JSON.parse(localStorage.curUserSession)
      if (sessionToken) {
        AV.User.become(sessionToken).then(user => {
          // currentUser 已更新
          this.$Notice.success({
            title: 'Hi~ ' + user.attributes.email,
            desc: 'Welcome back to snackychina :p'
          })
          this.$store.commit('setUser', {user: user, logout: false})

        }, err => {
          console.log('Sign in information has time out, please re-signin')
        })
      }
      this.$store.dispatch('getSubscriptionPrice')

    },
    methods: {
      toggleCollapse () {
        this.collapsed = !this.collapsed
      },
      reset () {
        AV.User.requestPasswordReset(this.email).then((success) => {
          this.signin_dialog = false
          this.$Message.success('A reset email has been sent. Go check it')
        }, (error) => {
          this.signin_dialog = false
          this.$Message.error('Network error. Try again later')
        })
      },
      signError (error) {
        console.log(error.code)

        switch (error.code) {
          case 210: {
            this.$Message.error('Password mismatch')
            break
          }
          case 211: {
            // const content = `<p>Duplicate Email</p>`
            this.$Message.error('The email has not been sign up')
            break
          }
          case 219: {
            this.$Message.error('Failed too much. Try again later')
          }

        }

      },
      signin () {
        this.sign_loading = true

        AV.User.logIn(this.email, this.password).then((loginedUser) => {
          this.sign_loading = false
          this.signin_dialog = false
          this.$store.commit('setUser', {user: loginedUser, logout: false})
          this.$router.push('/')
          this.$Notice.success({
            title: 'Hi~ ' + user.attributes.email,
            desc: 'Welcome back to snackychina :p',
            duration: 3
          })

          // this.$router.push('/user/' + loginedUser.id)
        }, (error) => {
          this.sign_loading = false
          this.signin_dialog = false
          this.signError(error)
        })
      },
      toSignup () {
        console.log('fadsfadsf')
        this.signin_dialog = false
        this.$router.push('/signup')
      },
      handleRoute (idx) {
        console.log(idx)
        this.collapsed = false
        switch (idx) {
          case 'subscription':
            this.$router.push('/subscription')
            break
          case 'market':
            this.$router.push('/market')
            break
          case 'help':
            this.$router.push('/help')
            break

          case 'signup':
            this.$router.push('/signup')
            break
          case 'signin':
//            this.$router.push('/signin')
            this.signin_dialog = true
            break
          case 'user':
            this.$router.push('/user/' + this.$store.state.user.id)
            break
          case 'logout':
            AV.User.logOut()
            this.$store.commit('setUser', {user: null, logout: true})
            this.$router.push('/')
            break
        }
      },
      toIndex () {
        this.$router.push('/')
      }
    },
    filters: {
      userAvatar (user) {
        if (user) {
//          let u = user.attributes.username.slice(0, 2)
          let u = user.attributes.username
          return u
        } else {
          return 'Sign in'
        }
      }
    },
    computed: mapState({
      user: state => state.user,
      backgroundColor: function(state) {
        if(this.$route.path === '/'){
          return  state.backgroundColor
        } else {
          return '#f5f7f9'
        }

      }
    })
  }
</script>

<style scoped lang="scss">
  .header{
    /*position: fixed;*/
    width: 100%;
  }

  .layout {
    background: #f5f7f9;
    min-height: 100vh;
  }

  .logo {
    font-family: 'Pacifico', cursive;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
  }

  .term_sheet {
    margin-top: 4rem;
    text-align: center;
    padding: 1rem 2rem;
    color: #9ea7b4;
    > a {
      padding: 0 4px;
    }
  }

  .dropdown {
    .ivu-dropdown {
      .ivu-dropdown-rel {
        height: 32px
      }
    }

  }
  .center_router {
    /*margin-top: 60px;*/
    padding: 0;
  }
  @media (min-width: 768px) {
    .mobile_menu, .collapse_panel {
      display: none;
    }
    .center_router {

    }

  }

  @media (max-width: 720px) {
    .desk_menu {
      display: none;
    }
    .collapse_panel {
      background-color: #fff;
      color: #000;
      font-size: 1.2rem;
      ul li {
        padding: 1rem 1.5rem;
        border-bottom: 0.5px solid rgba(201, 201, 201, 0.92);
      }
    }


  }
</style>
