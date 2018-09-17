<template>
    <div>
      <Card style="width:100%">
        <div>
          <h2>Your Order</h2>
          <Table border :columns="tableHead" :data="tableOrder" v-if="tableOrder !== null"></Table>
          <Spin v-else></Spin>

        </div>
      </Card>
      <Modal v-model="specificModal" width="450">
        <p slot="header" style="color:#5cadff;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>Shipping Information</span>
        </p>
        <div style="padding: 1rem 2rem">
          <div>Type: <Tag color="green">{{specificOrder.type}}</Tag></div>
          <Table :columns="shippingHead" :data="specificOrder.shippingDetail"></Table>
        </div>
      </Modal>

    </div>
</template>
<script>
  import { mapState } from 'vuex'
  import AV from 'leancloud-storage'
  import dateFormat from 'dateformat'

  export default {
    data () {
      return {
        shippingHead: [
          {
            title: 'Time',
            key: 'time'
          },
          {
            title: 'Shipping Code',
            key: 'shipping_code',
            render: (h, params) => {
              return h('div',{

              }, params.row.shipping_code === ''? 'Not shipping': params.row.shipping_code)
            }
          }
        ],
        specificModal: false,
        specificOrder: {},
        tableHead: [
          {
            title: 'Type',
            key: 'type',
            width: 130,
            render: (h, params) => {
              return h('div',[
                h('Tag', {
                  props: {
                    color: 'green',
                  },
                }, params.row.type),
              ])
            }
          },
          {
            title: 'CreateAt',
            key: 'createat',
            width: 120,
          },
          {
            title: 'Cost',
            key: 'cost',
            width: 120,
          },
          {
            title: 'Address',
            key: 'address',
            width: 120,
          },
          {
            title: 'Payment',
            key: 'payment',
            width: 120,
          },
          {
            title: 'Shipping',
            key: 'shipping',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                    color: 'primary'
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.index)
                    }
                  }
                }, 'Detail'),
              ]);
            }
          }
        ],
        tableOrder: [],
      }
    },
    components: {},
    methods: {
      showDetail (index) {
        this.specificOrder = this.tableOrder[index]
        this.specificModal = true
      },
      fetchOrder () {
        let uid = this.$route.params.id
        let query = new AV.Query('Order')
        query.equalTo('userId', uid)
        query.find().then((results) => {
          // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
//          console.log(results)
          results.map(order => {
//            console.log(order)
            this.tableOrder.splice(0,0,{
              type: order.attributes.type,
              address: this.addressFormat(order.attributes.address),
              shipping: order.attributes.shipping || 'no',
              cost: order.attributes.currency + (order.attributes.amount / 100).toString() + '.' + (order.attributes.amount % 100),
              createat: dateFormat(order.createdAt, 'fullDate'),
              payment: order.attributes.payed ? 'Yes' : 'No',
              id: order.id,
              shippingDetail: order.attributes.shippingDetail
            })
          })
        }, (error) => {
          this.$Message.error('Network error. Try again')
        })
      },
      addressFormat (address) {
        return `${address.city},${address.state},${address.country}`
      }
    },
    computed: {},
    mounted () {
      this.fetchOrder()
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
