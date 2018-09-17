<template>
  <div class="main">
    <div class="item">
      <div class="item_title">1.Flavors and difference
      </div>
      <div class="item_content">
        <ul>
          <li>
            <span>
              Sweet:
            </span>
            smooth texture,tastes crisp.
          </li>
          <li>
            <span>
              Spicy:
            </span>
            could be very spicy,please be careful to choose.
          </li>
          <li>
            <span>
              Mixed:
            </span>

            contains different kinds of snacks including sweet and spicy,many other fantastic flavors（e.g sour）could be a surprise.
          </li>
        </ul>


      </div>
    </div>
    <div class="item">
      <div class="item_title">2. How many snacks can I get in a single monthly package？
      </div>
      <div class="item_content">
        We will choose the most popular and delicious native chinese snacks. One package will contain at lest 1.2 lb(0.54 kg) snacks.
      </div>
    </div>
    <div class="item">
      <div class="item_title">3. Payment Method
      </div>
      <div class="item_content">
        Support most of credit cards like Visa, Mastercard, American Express, Discover,JCB, DinersClub and Union Pay(银联).
      </div>
    </div>
    <div class="item">
      <div class="item_title">4. Do I have any other fee for snack subscription?
      </div>
      <div class="item_content">
        Totally <span>
        NONE
      </span>, only you have to do is place an order，complete the payment and we will deliver the package at the fixed time of the month. You will receive an e-mail when package is out for delivery.
      </div>
    </div>
    <div class="item">
      <div class="item_title">5. How do I check my multi-month subscriptions?
      </div>
      <div class="item_content">
        You can log in the system and then follow My Account -> Order -> your subscription order -> check for payment and shipping message.
      </div>
    </div>
    <div class="item">
      <div class="item_title">6. Shipment
      </div>
      <div class="item_content">
        Packages are delivered from China by international express companies, so it will take some time to arrive(mostly 3-5 days).
        If you have any questions about your package,please contact us on <span>
        snackychina@gmail.com.
      </span>
      </div>
    </div>
    <div class="item">
      <div class="item_title">7. Refund
      </div>
      <div class="item_content">
        If you want to refund, please contact us on <span>
        snackychina@gmail.com
      </span>
        <div class="sub_title">
          We will refund <span>
          full amount
        </span> under these circumstances:
        </div>
        <ul>
          <li> 1.Single-month subscription and the package have not been sent yet
          </li>
          <li> 2.Multi-month subscription and the first month package have not been sent yet
          </li>
        </ul>
        <div class="sub_title">
          We will refund <span>
          a part of the money
        </span> under these circumstances:

        </div>
        <ul>
          <li>
            1.Multi-month subscription leaves some packages have not been sent yet, we will refund the rest amount of the subscription.
          </li>
        </ul>
        <span>
          Before your refund, please check your order and confirm that your circumstance is one of the above.
        </span>
      </div>
      <div style="font-size: 2rem; margin-top: 20px;">Thank you for subscription for snackychina, any question is welcomed. Conatact us: snackychina@gmail.com. ^_^</div>
    </div>


  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    components: {},
    methods: {},
    computed: {},
    mounted () {}
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .main {
    font-size: 16px;
    padding: 1rem 2rem;
    .item {
      padding: 1rem 0;
      .item_title {
        font-size: 1.7rem;
        font-weight: bold;
      }
      .sub_title {
        font-size: 1.6rem;
      }

      ul {
        margin: 1rem 0;
      }
      ul li {
        font-size: 1.4rem;
        span {
          font-weight: bold;

        }
      }
      .item_content {
        font-size: 1.5rem;
      }
      span {
        font-weight: bold;
      }
    }
  }
</style>
