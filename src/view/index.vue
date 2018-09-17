<template>
  <div :style="{backgroundColor:backgroundColor}" class="main_body">

    <div class="color_block" id="one">
      <div class="main_header">
        <h1 class="title">Try Delicious Chinese Snack</h1>
        <p class="text">
          Try Native Chinese Snack directly delivered from China. We prepare you three flavor for the same price</p>
        <p class="text">${{subscriptionPrice}} / month for snack delivery once a month and careful service</p>
        <Button type="warning" style="color: #fff; margin-left: 10px;" size="large" @click="toSignup">Create account
        </Button>

      </div>
    </div>

    <div class="flavor_block" @click="chooseFlavor('spicy')" id="two">
      <div class="item">
        <h1 class="title">Spicy</h1>
        <p class="text">Looking for a hot feeling? Spicy will burn your passion. </p>
        <p class="text">Looking for a good shape? Spicy will burn your fat. </p>
        <p class="text">Looking for a hot taste? Spicy will burn your tongue. </p>

        <p class="text">You may heard of famous 'la tiao'. We provide more and welcome to enjoy the spicy snacks we provide.Tap and buy</p>

      </div>
    </div>
    <div class="flavor_block" @click="chooseFlavor('sweet')" id="three">
      <div class="item">
        <h1 class="title">Sweet</h1>
        <p class="text">Our best sweet snacks will bring you lover-like enjoyment, wipe away all your troubles and let you experience the super-noble treatment on the tongue</p>
        <p class="text">Tap and buy</p>

      </div>
    </div>
    <div class="flavor_block" @click="chooseFlavor('mixed')" id="four">
      <div class="item">
        <h1 class="title">Mixed</h1>
        <p class="text">By choosing this, you may experience the most surprise.
          This flavor will contain not only the Spicy & Sweet snack,but also some mixed with salty and sour.
          Meantime, you will have the chance to try some 'strange' snack which even common chinese won't dare to eat.
          However, we promise you a excellent experience.
        </p>
        <p class="text">Tap and buy</p>

      </div>
    </div>


  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    components: {},
    methods: {
      chooseFlavor (f) {
        this.$store.commit('setCart', {
          type: 'subscription',
          data: {flavor: f, period: 1}
        })
        this.$router.push('/subscription')
      },
      handleRoute (idx) {
        console.log(idx)
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
      toSignup () {
        this.$router.push('/signup')
      },
      onScroll () {
        let blue = '#5cadff',
          purple = '#ff9b6a',
          orange = '#ef5464',
          pink = '#f1b8e4'
        let clientH = document.documentElement.clientHeight
        let scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        let one = document.getElementById('one')
        let two = document.getElementById('two')
        let three = document.getElementById('three')
        let four = document.getElementById('four')
        if (scrollT >= one.offsetTop) {
//          this.backgroundColor = blue
          this.$store.commit('setBkgc', blue)
        }

        if (scrollT >= two.offsetTop) {
//          this.backgroundColor = orange
          this.$store.commit('setBkgc', orange)

        }

        if (scrollT >= three.offsetTop) {
//          this.backgroundColor = pink
          this.$store.commit('setBkgc', pink)

        }

        if (scrollT >= four.offsetTop) {
//          this.backgroundColor = purple
          this.$store.commit('setBkgc', purple)

        }

        /*let green = "#10e88a",
          purple = "#7f3995",
          blue = "#0d78e7",
          orange = "#f88f18",
          pink = "#bb6774";
        let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
          //  console.log(distance)

        let one = document.getElementById('one')
        let d1 = one.scrollHeight
        let two = document.getElementById('two')
        let d2 = two.scrollHeight
        let three = document.getElementById('three')
        let d3 = three.scrollHeight

        let four = document.getElementById('four')
        let d4 = four.scrollHeight

        // console.log(one)
          if (distance >= d1) {
          this.color = blue
            console.log(this.color)
        };
        if (distance > d2) {
          this.color = pink
          console.log(this.color)

        };
        if (distance > d3) {
          this.color = green
          console.log(this.color)

        };
        if (distance > d4) {
          this.color = green
          console.log(this.color)

        }*/
      }
    },
    computed: mapState({
      subscriptionPrice: state => state.goodsPrice.subscription,
      backgroundColor: state => state.backgroundColor
    }),
    mounted () {
      window.addEventListener('scroll', this.onScroll)
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .main_body {
    transition: background 400ms;
    /*will-change: background;*/
  }

  @media (min-width: 768px) {

  }

  @media (max-width: 720px) {

  }

  // VARS
  $purple: #955fad;
  $orange: #da5b45;
  $paper: #f6efe9;

  $main-color: #5cadff;

  html, body {
    height: 100%;
  }

  .color_block {
    padding-bottom: 150px;
    .main_header {
      text-align: center;
      .title {
        font-size: 2.5rem;
        font-family: 'Roboto', sans-serif;
        color: #fff;
        padding-top: 100px;
        font-weight: normal;
      }

      .text {
        font-size: 1.5rem;
        font-family: 'Roboto', sans-serif;
        color: #fff;
        width: 60%;
        margin: 25px auto;
      }

    }
  }

  .flavor_block {
    cursor: pointer;
    height: 100vh;
    display: flex;
    align-items: center;
    margin-left: 2rem;
    cursor: pointer;
    .item {
      .title {
        font-size: 2.5rem;
        font-family: 'Roboto', sans-serif;
        color: #fff;
        font-weight: normal;
      }

      .text {
        font-size: 1.5rem;
        font-family: 'Roboto', sans-serif;
        color: #fff;
        width: 60%;
      }
    }
  }

  .footer {
    padding-top: 300px;

    .credits {
      text-align: center;
      color: #666;

      .link {
        color: $main-color;
        text-decoration: none;
      }

    }

  }
</style>
