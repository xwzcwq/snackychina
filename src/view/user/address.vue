<template>
    <div>
      <Card style="width:100%">
        <div>
          <h2>Your Address</h2>

          <div style="background:#eee">
            <Row :gutter="18">
              <Col span="12" :xs="24" :lg='12' v-for="address,index in addresses" :key="index"  v-if="address">
              <address-card :address="address" :edit="edit" :idx="index"/>
              </Col>
              <Spin v-else></Spin>

            </Row>

            <!--<Card :bordered="false" v-if="order.address">-->
            <!--<div slot="title" style="font-size: 1.5rem;font-weight: bold; display: flex; justify-content: space-between">-->
            <!--<div>-->
            <!--{{order.address.state}},{{order.address.country}} (-->
            <!--<span style="font-size: 1.2rem">To: {{order.address.firstName.toUpperCase()}} {{order.address.lastName.toUpperCase()}} )</span>-->
            <!--</div>-->
            <!--<div slot="extra">-->
            <!--{{order.address.phone}}-->
            <!--</div>-->
            <!--</div>-->
            <!--<div style="font-size: 1.2rem">-->
            <!--{{order.address.suite}},{{order.address.street}},{{order.address.city}}-->
            <!--</div>-->
            <!--</Card>-->
          </div>
          <!--<Collapse :v-model="0" v-if="addresses">-->
          <!--<Panel :name="idx.toString()" v-for="address, idx in addresses " :key="idx">-->
          <!--{{address.firstName}}.{{address.lastName}} <span> {{address.country}}</span>-->
          <!--<p slot="content">-->
          <!--<Form :label-width="80" :rules="ruleValidate" ref="formValidate1">-->
          <!--<FormItem label="Reciever">-->
          <!--<Row>-->
          <!--<Col span="11">-->
          <!--<FormItem prop=""></FormItem>-->
          <!--<Input v-model="address.firstName" placeholder="First Name"/>-->
          <!--</Col>-->
          <!--<Col span="11" offset="2">-->
          <!--<FormItem prop=""></FormItem>-->

          <!--<Input v-model="address.lastName" placeholder="Last Name"/>-->
          <!--</Col>-->
          <!--</Row>-->
          <!--</FormItem>-->

          <!--<FormItem label="详细">-->
          <!--<Row>-->
          <!--<Col span="14">-->
          <!--<Input v-model="address.street" placeholder="Street Address"/>-->
          <!--</Col>-->
          <!--<Col span="8" offset="2">-->
          <!--<Input v-model="address.suite" placeholder="Apt / Suite"/>-->
          <!--</Col>-->
          <!--</Row>-->
          <!--</FormItem>-->

          <!--<FormItem label="详细">-->
          <!--<Row>-->
          <!--<Col span="7">-->
          <!--<Input v-model="address.city" placeholder="City"/>-->
          <!--</Col>-->
          <!--<Col span="7" offset="1">-->
          <!--<Input v-model="address.state" placeholder="State"/>-->
          <!--</Col>-->
          <!--<Col span="8" offset="1">-->
          <!--<Input v-model="address.zip" placeholder="ZIP"/>-->
          <!--</Col>-->
          <!--</Row>-->
          <!--</FormItem>-->

          <!--<FormItem label="Country">-->
          <!--<Select v-model="address.country">-->
          <!--<Option value="beijing">New York</Option>-->
          <!--<Option value="shanghai">London</Option>-->
          <!--<Option value="shenzhen">Sydney</Option>-->

          <!--</Select>-->
          <!--</FormItem>-->


          <!--<FormItem>-->
          <!--<Button type="primary" @click="edit">Edit</Button>-->
          <!--</FormItem>-->
          <!--</Form>-->

          <!--</p>-->
          <!--</Panel>-->
          <!--</Collapse>-->
          <!--<div v-else>-->
          <!--<h2>You Don't have any address yet.</h2>-->
          <!--</div>-->
          <!--<div style="border: 1px solid #ccc; padding: 1rem; border-radius: 3px;margin-top: 3rem;">-->
          <!--<h2>New Address</h2>-->
          <!--<Form :label-width="80" :model="formValidate" :rules="ruleValidate">-->
          <!--<FormItem label="Reciever" prop="firstName">-->
          <!--<Row>-->
          <!--<Col span="11">-->
          <!--<FormItem prop="firstName">-->
          <!--<Input v-model="formValidate.firstName" placeholder="First Name"/>-->

          <!--</FormItem>-->
          <!--</Col>-->
          <!--<Col span="11" offset="2">-->
          <!--<FormItem prop="lastName">-->
          <!--<Input v-model="formValidate.lastName" placeholder="Last Name"/>-->
          <!--</FormItem>-->
          <!--<FormItem prop=""></FormItem>-->
          <!--</Col>-->
          <!--</Row>-->
          <!--</FormItem>-->

          <!--<FormItem label="详细">-->
          <!--<Row>-->
          <!--<Col span="14">-->
          <!--<FormItem prop="street">-->
          <!--<Input v-model="formValidate.street" placeholder="Street Address"/>-->
          <!--</FormItem>-->

          <!--</Col>-->
          <!--<Col span="8" offset="2">-->
          <!--<FormItem prop="suite">-->
          <!--<Input v-model="formValidate.suite" placeholder="Apt / Suite"/>-->
          <!--</FormItem>-->

          <!--</Col>-->
          <!--</Row>-->
          <!--</FormItem>-->

          <!--<FormItem label="详细">-->
          <!--<Row>-->
          <!--<Col span="7">-->
          <!--<FormItem prop="city">-->
          <!--<Input v-model="formValidate.city" placeholder="City"/>-->
          <!--</FormItem>-->

          <!--</Col>-->
          <!--<Col span="7" offset="1">-->
          <!--<FormItem prop="state">-->
          <!--<Input v-model="formValidate.state" placeholder="State"/>-->
          <!--</FormItem>-->

          <!--</Col>-->
          <!--<Col span="8" offset="1">-->
          <!--<FormItem prop="zip">-->
          <!--<Input v-model="formValidate.zip" placeholder="ZIP"/>-->
          <!--</FormItem>-->
          <!--</Col>-->
          <!--</Row>-->
          <!--</FormItem>-->

          <!--<FormItem label="Country" prop="country">-->
          <!--<Select v-model="formValidate.country">-->
          <!--<Option value="Australia">Australia</Option>-->
          <!--<Option value="America">America</Option>-->
          <!--<Option value="UK">UK</Option>-->
          <!--</Select>-->
          <!--</FormItem>-->


          <!--<FormItem>-->
          <!--<Button type="primary" @click="addNewAddress('formValidate1')">Save</Button>-->
          <!--</FormItem>-->
          <!--</Form>-->

          <!--</div>-->


        </div>

      </Card>
      <Modal v-model="editModal">
        <p slot="header" style="color:#ff9900;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>Edit address</span>
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

            <FormItem label="详细">
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

            <FormItem label="详细">
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
          <Button type="ghost" size="large" :loading="modal_loading" @click="cancel">Cancel</Button>
          <Button type="primary" size="large" :loading="modal_loading" @click="confirmEdit('formValidate')">Confirm
          </Button>
        </div>
      </Modal>


    </div>
</template>
<script>
  import AddressCard from '@/components/address_card'
  import { mapState } from 'vuex'
  import AV from 'leancloud-storage'
  import dateFormat from 'dateformat'

  export default {
    data () {
      return {
        editModal: false,
        modal_loading: false,
        view: 'profile',
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
          phone_prefix: ''
        },
        ruleValidate: {
          phone: [{required: true, message: 'The phone number is required', trigger: 'blur'}],
          firstName: [
            {required: true, message: 'The firstname is required', trigger: 'blur'}
          ],
          lastName: [
            {required: true, message: 'The lastName  is required', trigger: 'blur'}
          ],
          street: [
            {required: true, message: 'The street is required', trigger: 'blur'}
          ],

          suite: [
            {required: true, message: 'The suite number is required', trigger: 'blur'}
          ],
          state: [
            {required: true, message: 'The state is required', trigger: 'blur'}
          ],
          city: [
            {required: true, message: 'The state is required', trigger: 'change'}
          ],
          zip: [
            {required: true, message: 'The zip is required', trigger: 'change'}
          ],
          country: [
            {required: true, message: 'The country is required', trigger: 'change'}
          ]
        }
      }
    },
    components: {
      'address-card': AddressCard

    },
    methods: {

      cancel () {
        this.editModal = false
      },
      edit (index) {
        // console.log(index)
        let currentUser = AV.User.current()
        let addresses = currentUser.attributes.addresses || []
        this.formValidate = addresses[index]
        this.editModal = true
      },

      addNewAddress (name) {
        let currentUser = AV.User.current()
        this.$refs[name].validate((valid) => {
          if (valid) {
            //  this.$Message.success('Success!');
            let addresses = currentUser.attributes.addresses || []
            let {
              firstName,
              lastName,
              street,
              suite,
              city,
              state,
              zip,
              country
            } = this.formValidate
            addresses.push({
              firstName,
              lastName,
              street,
              suite,
              city,
              state,
              zip,
              country
            })
            currentUser.set('addresses', addresses)
            console.log('fasdf')
            currentUser.save().then(res => {
              this.$Message.success('Saved Successfully')
//          console.log('fasdf',res)
              this.order.address = {
                firstName,
                lastName,
                street,
                suite,
                city,
                state,
                zip,
                country
              }
            }, error => {
              console.log(error)
            })
          } else {
            this.$Message.error('Please complete the form')
          }
        })

        let addresses = currentUser.attributes.addresses || []
        let {
          phone,
          firstName,
          lastName,
          street,
          suite,
          city,
          state,
          zip,
          country
        } = this.formValidate
        addresses.push({
          phone,
          firstName,
          lastName,
          street,
          suite,
          city,
          state,
          zip,
          country
        })
        currentUser.set('addresses', addresses)
        currentUser.save().then(res => {
          this.$Message.success('Saved Successfully')
//          console.log('fasdf',res)
        }, error => {
          console.log(error)
        })
      },
      confirmEdit (name) {
        let currentUser = AV.User.current()

        this.$refs[name].validate((valid) => {
          if (valid) {
            //  this.$Message.success('Success!');
            currentUser.set('addresses', this.addresses)
            currentUser.save().then(res => {
              this.$Message.success('Edit Successfully')
              this.editModal = false
            }, error => {
              console.log(error)
            })
          } else {
            this.$Message.error('Please complete the form')
          }
        })

      },
    },
    computed: mapState({
      addresses: state => state.user ? state.user.attributes.addresses : []
    }),
    mounted () {}
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
