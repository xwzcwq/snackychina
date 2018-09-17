<template>
  <div>
    <Row type="flex" justify="center">
      <Col :xs="24" :sm="21" :md="21" :lg="21">
      <Card>
        <div class="title">Choose Your Flavor</div>
        <RadioGroup v-model="flavor" size="large" class="sub_title">
          <Radio label="spicy">
            <Icon type="fireball"></Icon>
            <span>Spicy</span>
          </Radio>
          <Radio label="sweet">
            <Icon type="icecream"></Icon>
            <span>Sweet</span>
          </Radio>
          <Radio label="mixed">
            <Icon type="erlenmeyer-flask"></Icon>
            <span>Mixed</span>
          </Radio>
        </RadioGroup>
        <div class="title">How long will you subscription?</div>
        <RadioGroup v-model="period" size="large" type="button">
          <Radio label="1"></Radio>
          <Radio label="3"></Radio>
          <Radio label="6"></Radio>
          <Radio label="12"></Radio>
        </RadioGroup>
        month

        <div class="title">Order Information</div>
        <div>
          <div class="flavor">Flavor: {{flavor}}</div>
          <div class="cost_num">
            <span class="item">Cost:</span>
            <Icon type="social-usd"></Icon>
            <span class="number">{{ costCalu(period)}}</span>
            <Tooltip content="Currency:USD" style="font-size: 1rem;color: #495060">
              <Icon type="information-circled"></Icon>
            </Tooltip>
          </div>
        </div>
        <Button type="primary" @click="goBilling">Go billing</Button>


        <div style="text-align:center">
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        flavor: null,
        period: 0
      }
    },
    components: {},
    methods: {
      goBilling () {
        let {flavor, period} = this
        if (flavor && period) {
          this.$store.commit('setCart', {
            type: 'subscription',
            data: {flavor, period}
          })
          this.$router.push('/checkout')
        } else {
          this.$Message.warning({
            duration: 4,
            content: 'Please choose a flavor and the peroid of subscription'
          })

        }

      },
      costCalu (period) {
        if (isNaN(period)) {
          return 0
        } else {
          return parseInt(period) * this.subscriptionPrice
        }

      }
    },
    computed: mapState({
      subscriptionPrice: state => state.goodsPrice.subscription
    }),
    mounted () {
      let subscription = this.$store.state.cart.subscription
      if (subscription) {
        this.flavor = subscription.flavor
        this.period = subscription.period
      }
    },
    filters: {}
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .title {
    font-size: 2rem;
    /*font-weight: bold;*/
  }

  .sub_title {
    font-size: 2rem;
    font-weight: bold;
  }

  .cost_num {
    color: #fa755a;
    font-size: 2.5rem;

    .item {
      color: #495060;
      font-weight: bold;
      font-size: 2rem;
    }
    .number {
      font-weight: bold;
    }
  }

  .flavor {
    font-size: 2rem;
  }
</style>
