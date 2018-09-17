<template>
  <div>

    <Row type="flex" justify="center" align="top" class="code-row-bg" :gutter="16">

      <Col span="8" :xs="24" :sm='24' :lg="8">
      <Card style="width: 100%">
        <div slot="title" style="display: flex; justify-content: space-between">
          <h2> Order summary</h2>
          <h2>Total:
            <Icon type="social-usd"></Icon>
            <span style="color: #ff0036;">{{ costCalu(subscription.period)}}</span>
          </h2>


        </div>

        <!--<p slot="extra" style="font-size: 2rem;vertical-align: center">-->
        <!--Total:-->
        <!--<Icon type="social-usd"></Icon>-->
        <!--<span style="color: #ff0036;">{{subscription.period | costCalu}}</span>-->
        <!--</p>-->

        <ul class="order_list">
          <li style="display: flex; justify-content: space-between">
            <div> Snack</div>
            <span><Icon type="social-usd"></Icon>{{subscriptionPrice}}/month</span>
          </li>
          <li style="display: flex; justify-content: space-between">
            <div>Order period</div>
            <span>{{subscription.period}} month</span>
          </li>
          <li style="display: flex; justify-content: space-between">
            <div>Price</div>
            <span><Icon type="social-usd"></Icon>{{ costCalu(subscription.period)}}</span>
          </li>
          <li style="display: flex; justify-content: space-between">
            <div>Shipping fee</div>
            <span><Icon type="social-usd"></Icon>0</span>
          </li>
          <li style="display: flex; justify-content: space-between">
            <div>Flavor: </div>
            <span><Icon :type="subscription.flavor | flavorIcon"></Icon>{{subscription.flavor}}</span>
          </li>

        </ul>
        <Button type="info" icon="arrow-return-left" large @click="back">Back to choose</Button>

      </Card>
      </Col>
      <Col span="16" :xs="24" :sm='24' :lg="16">
      <Card>

        <div slot="title">
          <h2>Shipping address & Billing</h2>
        </div>


        <form action="/charge" method="post" id="payment-form" class="billing_info">

          <div class="form-row">
            <label for="address">
            </label>
            <div id="address">
              <!--<Select v-model="order.address" style="width:100%" v-if="addresses" placeholder="Please choose a address">-->
              <!--<Option v-for="item, index in addresses" :value="item" :key="index">{{ item.country }}</Option>-->
              <!--</Select>-->

              <Dropdown v-if="addresses === undefined || addresses.length != 0 " @on-click="chooseAddress">
                <a href="javascript:void(0)">
                  Choose address
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="item, index in addresses" :name="index" :key="index">
                    {{ item.country}} {{ item.firstName + '.' + item.lastName}}
                  </DropdownItem>
                  <DropdownItem name="new_address"> New Address</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div v-else>
                You don not have a address yet. Create one.
                <Form :label-width="80" :model="formValidate" :rules="ruleValidate" ref="formValidate">
                  <FormItem label="Reciever" prop="firstName">
                    <Row>
                      <Col span="11">
                      <FormItem prop="firstName">
                        <Input v-model="formValidate.firstName" placeholder="First Name"/>

                      </FormItem>
                      </Col>
                      <Col span="11" offset="2">
                      <FormItem prop="lastName">
                        <Input v-model="formValidate.lastName" placeholder="Last Name"/>
                      </FormItem>
                      <FormItem prop=""></FormItem>
                      </Col>
                    </Row>
                  </FormItem>

                  <FormItem label="Spicific">
                    <Row>
                      <Col span="14">
                      <FormItem prop="street">
                        <Input v-model="formValidate.street" placeholder="Street Address"/>
                      </FormItem>

                      </Col>
                      <Col span="8" offset="2">
                      <FormItem prop="suite">
                        <Input v-model="formValidate.suite" placeholder="Apt / Suite"/>
                      </FormItem>

                      </Col>
                    </Row>
                  </FormItem>

                  <FormItem label="Specific">
                    <Row>
                      <Col span="7">
                      <FormItem prop="city">
                        <Input v-model="formValidate.city" placeholder="City"/>
                      </FormItem>

                      </Col>
                      <Col span="7" offset="1">
                      <FormItem prop="state">
                        <Input v-model="formValidate.state" placeholder="State"/>
                      </FormItem>

                      </Col>
                      <Col span="8" offset="1">
                      <FormItem prop="zip">
                        <Input v-model="formValidate.zip" placeholder="ZIP"/>
                      </FormItem>
                      </Col>
                    </Row>
                  </FormItem>

                  <FormItem label="Country" prop="country">
                    <Select v-model="formValidate.country">
                      <Option value="Austraila">Austraila</Option>
                      <Option value="America">America</Option>
                      <Option value="UK">UK</Option>
                    </Select>
                  </FormItem>

                  <FormItem prop="phone" label="Phone">
                    <Input v-model="formValidate.phone" placeholder="Phone number">
                    <Select v-model="formValidate.phone_prefix" slot="prepend" style="width: 80px">
                      <Option value="1">USA/Canada +1</Option>
                      <Option value="44">UK +44</Option>
                      <Option value="61">Australia +61</Option>
                      <Option value="81">Japan +81</Option>

                    </Select>
                    </Input>
                  </FormItem>

                  <FormItem>
                    <Button @click="addNewAddress('formValidate')">Save</Button>

                  </FormItem>
                </Form>
              </div>


              <div>
                <div style="background:#eee;padding: 2rem">
                  <Card :bordered="false" v-if="order.address">
                    <div slot="title"
                         style="font-size: 1.5rem;font-weight: bold; display: flex; justify-content: space-between">
                      <div>
                        {{order.address.state}},{{order.address.country}} (
                        <span
                          style="font-size: 1.2rem">To: {{order.address.firstName.toUpperCase()}} {{order.address.lastName.toUpperCase()}} )</span>
                      </div>
                      <div slot="extra">
                      </div>
                    </div>
                    <div style="font-size: 1.2rem">
                      <div>Address: {{order.address.suite}},{{order.address.street}},{{order.address.city}}</div>
                      <div>Phone: +{{order.address.phone_prefix}} {{order.address.phone}}</div>
                    </div>
                  </Card>
                </div>

              </div>


            </div>
          </div>
          <div style="margin: 2rem 0">
            <label for="card-element">
              Credit or debit card
            </label>
            <div id="card-element">
              <!-- a Stripe Element will be inserted here. -->
            </div>

            <!-- Used to display Element errors -->
            <div id="card-errors" role="alert"></div>
          </div>
          <h5>Powered by Stripe</h5>
          <ul class="PricingDetailsRow-cardBrands">
            <li class="cardBrand-visa">Visa</li>
            <li class="cardBrand-masterCard">Master Card</li>
            <li class="cardBrand-americanExpress">American Express</li>
            <li class="cardBrand-discover">Discover</li>
            <li class="cardBrand-jcb">JCB</li>
            <li class="cardBrand-dinersClub">Diners Club</li>
            <li class="cardBrand-chinaUnion">China Union Pay</li>
          </ul>

          <div class="form-row" style="display: flex; align-items: flex-end; justify-content: center;padding: 2rem 0">
            <!--<button class="ivu-btn ivu-btn-primary ivu-btn-large" >Submit Payment</button>-->
            <Button type="success" large @click.prevent="submitCharge" :loading="charging">Submit Payment</Button>
          </div>


        </form>

      </Card>
      </Col>
    </Row>

    <Modal v-model="newAddressModal" width="360">
      <p slot="header" style="color:#2d8cf0;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>Add new address</span>
      </p>
      <div style="text-align:center">
        <Form :label-width="80" :model="formValidate" :rules="ruleValidate" ref="formValidate">
          <FormItem label="Reciever" prop="firstName">
            <Row>
              <Col span="11">
              <FormItem prop="firstName">
                <Input v-model="formValidate.firstName" placeholder="First Name"/>

              </FormItem>
              </Col>
              <Col span="11" offset="2">
              <FormItem prop="lastName">
                <Input v-model="formValidate.lastName" placeholder="Last Name"/>
              </FormItem>
              <FormItem prop=""></FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="Specific" prop="city">
            <Row>
              <Col span="14">
              <FormItem prop="street">
                <Input v-model="formValidate.street" placeholder="Street Address"/>
              </FormItem>

              </Col>
              <Col span="8" offset="2">
              <FormItem prop="suite">
                <Input v-model="formValidate.suite" placeholder="Apt / Suite"/>
              </FormItem>

              </Col>
            </Row>
          </FormItem>

          <FormItem label="More" prop="suite">
            <Row>
              <Col span="7">
              <FormItem prop="city">
                <Input v-model="formValidate.city" placeholder="City"/>
              </FormItem>

              </Col>
              <Col span="7" offset="1">
              <FormItem prop="state">
                <Input v-model="formValidate.state" placeholder="State"/>
              </FormItem>

              </Col>
              <Col span="8" offset="1">
              <FormItem prop="zip">
                <Input v-model="formValidate.zip" placeholder="ZIP"/>
              </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="Country" prop="country">
            <Select v-model="formValidate.country">
              <Option value="Australia">Australia</Option>
              <Option value="America">America</Option>
              <Option value="UK">UK</Option>
              <Option value="Canada">Canada</Option>
              <Option value="Japan">Japan</Option>
            </Select>
          </FormItem>
          <FormItem prop="phone" label="Phone">
            <Input v-model="formValidate.phone" placeholder="Phone number">
            <Select v-model="formValidate.phone_prefix" slot="prepend" style="width: 80px">
              <Option value="1">USA/Canada +1</Option>
              <Option value="44">UK +44</Option>
              <Option value="61">Australia +61</Option>
              <Option value="81">Japan +81</Option>

            </Select>
            </Input>
          </FormItem>
        </Form>

      </div>
      <div slot="footer">
        <Button type="primary" @click="addNewAddress('formValidate')" :loading="savingAddress">Save</Button>
      </div>
    </Modal>

  </div>
</template>


<script>
  import Axios from 'axios'
  import AV from 'leancloud-storage'
  import { mapState } from 'vuex'
  import client from '@/utils/client'

  let stripe = process.env.NODE_ENV === 'production' ?  Stripe('pk_live_KRDNcvxY6nnZI3Avp7oYOdlU'):Stripe('pk_test_yzHvB940NqxS8gMPcAIKOzhm')
  let elements = stripe.elements()

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  let style = {
    base: {
      color: '#32325d',
      lineHeight: '24px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }

  // Create an instance of the card Element
  let card = elements.create('card', {style: style})

  // Add an instance of the card Element into the `card-element` <div>

  export default {
    data () {
      return {
        savingAddress: false,
        newAddressModal: false,
        order: {
          address: null,
        },
        formValidate: {
          firstName: '',
          lastName: '',
          street: '',
          suite: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          phone: '',
          phone_prefix: '86'
        },
        ruleValidate: {
          firstName: [
            {required: true, message: 'The name cannot be firstname', trigger: 'blur'}
          ],
          lastName: [
            {required: true, message: 'The name cannot be lastname', trigger: 'blur'}
          ],
          street: [
            {required: true, message: 'The name cannot be street', trigger: 'blur'}
          ],

          suite: [
            {required: true, message: 'The name cannot be suite', trigger: 'blur'}
          ],
          state: [
            {required: true, message: 'The name cannot be state', trigger: 'blur'}
          ],
          city: [
            {required: true, message: 'Please select the city', trigger: 'change'}
          ],
          zip: [
            {required: true, message: 'Please select the zip', trigger: 'change'}
          ],
          country: [
            {required: true, message: 'Please select the country', trigger: 'change'}
          ],
          phone: [
            {required: true, message: 'Please enter your phone number', trigger: 'change'}
          ]
        },
        charging: false
      }
    },
    mounted () {
      this.initialStripe()
    },
    components: {},
    methods: {
      chooseAddress (idx) {
        console.log(idx)
        if (idx === 'new_address') {
          this.newAddressModal = true
        }
        this.order.address = this.addresses[idx]
      },

      back () {
        this.$router.push('/subscription')
      },
      addNewAddress (name) {
        // this.$Message.info('Clicked ok');
        this.savingAddress = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            //  this.$Message.success('Success!');
            let currentUser = AV.User.current()
            let addresses = currentUser.attributes.addresses || []
            addresses.push(this.formValidate)
            currentUser.set('addresses', addresses)
            currentUser.save().then(res => {
              this.savingAddress = false
              this.newAddressModal = false
              this.$Message.success('Saved Successfully')
              this.order.address = this.formValidate
            }, error => {
              this.$Message.error('Network error. Try again')
            })
          } else {
            this.$Message.error('Please complete the form')
          }
        })
      },
      initialStripe () {

        card.mount('#card-element')

        card.addEventListener('change', (event) => {
          let displayError = document.getElementById('card-errors')
          if (event.error) {
            displayError.textContent = event.error.message
          } else {
            displayError.textContent = ''
          }
          if (!this.subscription) {
            this.$Message.error('This is an error tip')
          }
        })
        let form = document.getElementById('payment-form')
//        form.addEventListener('submit', (event) => {
//          event.preventDefault()
//
//          stripe.createToken(card).then((result) => {
//            if (result.error) {
//              // Inform the customer that there was an error
//              let errorElement = document.getElementById('card-errors')
//              errorElement.textContent = result.error.message
//            } else {
//              // Send the token to your server
//              this.stripeTokenHandler(result.token)
//
//            }
//          })
//        })
      },
      submitCharge () {
        console.log(this.subscription)
        this.charging = true
        if (!this.verified) {
          this.$Message.error('Please verify email')
          this.charging = false

        }
        else if (!this.order.address) {
          this.$Message.error('Please select a address')
          this.charging = false

        }
        else {
          stripe.createToken(card).then((result) => {
            if (result.error) {
              // Inform the customer that there was an error
              let errorElement = document.getElementById('card-errors')
              errorElement.textContent = result.error.message
              this.charging = false
            } else {
              // Send the token to your server
              console.log('charge to server')
              this.stripeTokenHandler(result.token)
            }
          })
        }

      },

      stripeTokenHandler (token) {
        let userId = this.user.id

        let subscription = this.$store.state.cart.subscription
        let data = {
          stripeToken: token.id,
          userId,
          address: this.order.address,
          email: this.user.attributes.email,
          type: 'subscription',
          specific: subscription,
          amount: this.costCalu(subscription.period)  * 100
        }

        client({
          url: '/subscription',
          method: 'POST',
          data

        }).then(res => {
          this.charging = false
          if (res.error_code === 200) {
            this.$Notice.success({
              title: 'Charge success~ ',
              duration: 10,
              desc: 'Check the order in your account. In order tab,you can check the specific information. Also,We will update the shipping information there.'
            })
             this.$router.push('/user/' + this.user.id)
          }
          else{
            this.$Message.error({
              content: res.msg,
              duration: 6
            });
          }
        }, err => {
          this.charging = false
          this.$Message.error('Network error. Try again')

        })

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
      user: state => state.user,
      addresses: state => state.user ? state.user.attributes.addresses : '',
      subscription: state => state.cart.subscription,
      verified: state => state.user ? state.user.attributes.emailVerified : false,
      subscriptionPrice: state => state.goodsPrice.subscription
    }),
    filters: {
      flavorIcon (type) {
        switch (type) {
          case 'spicy':
            return 'fireball'
          case 'sweet':
            return 'icecream'
          case 'mixed':
            return 'erlenmeyer-flask'
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
   .PricingDetailsRow-cardBrands{
     list-style: none;
     padding: 0;
     margin: 5px 0 0 -1px;
     li {
       background-image: url('../../assets/card-brands.svg?2');
       height: 25px;
       margin: 15px 20px 0 0;
       display: inline-block;
       overflow: hidden;
       text-indent: -500px;
     }
     .cardBrand-visa{
       width: 44px;
     }
     .cardBrand-masterCard{
       background-position: -48px 0;
       width: 84px;
     }
     .cardBrand-americanExpress{
       background-position: -138px 0;
       width: 52px;
     }

     .cardBrand-discover{
       background-position: -274px 0;
       width: 56px;
     }
     .cardBrand-jcb{
       background-position: -357px 0;
       width: 28px;
     }
     .cardBrand-dinersClub{
       background-position: -217px 0;
       width: 29px;
     }
     .cardBrand-chinaUnion{
       background-position: -408px 0;
       width: 31px;
     }

   }
  .StripeElement {
    background-color: white;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

  #payment_button {
    box-shadow: 0 7px 14px rgba(50, 50, 93, .10), 0 3px 6px rgba(0, 0, 0, .08);
    background-color: #43458b;
    border: none;
    border-radius: 4px;
    outline: none;
    text-decoration: none;
    color: #fff;
    white-space: nowrap;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.025em;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
    float: left;
  }

  .order_list {
    font-size: 1.8rem;
    li {
      /*border-bottom: 1px solid #dde7f4;*/
    }
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }

  @media (min-width: 720px) {
    .billing_info {
      padding: 0 8rem;
    }
  }

  @media (max-width: 720px) {
    .billing_info {
      padding: 0;
    }
  }


</style>
