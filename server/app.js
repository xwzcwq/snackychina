'use strict'
// Grabs our environment letiables from the .env file

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const AV = require('leanengine')
// const stripe = require('stripe')('sk_live_JMAr5SVT1HmkaeJlsDYpatSo')
let local_env = require('./env.js').NODE_ENV

const stripe = local_env === "development"? require('stripe')('sk_test_W64k2FNdT2mRtPLvdwT2prUF'):
  require('stripe')('sk_live_JMAr5SVT1HmkaeJlsDYpatSo')

// Environment configuration
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
let port = process.env.PORT || 3000

// Create a server side router
let router = express.Router()

// Configure express to handle HTTP requests
app.use(cors())
app.use(AV.express())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Configure our Stripe secret key and object

// Define the route endpoints for our application

// Create a new charge
router.post('/charge/subscription', function (req, res) {
  let {userId, address, email, type, specific, amount} = req.body
  let token = req.body.stripeToken
  console.log(token)
  // amount of subscription

  let Order = AV.Object.extend('Order')
  let nOrder = new Order()

  // nOrder.save({
  //   type: 'subscription',
  //   userId,
  //   subscriptionPeriod,
  //   amount,
  //   address,
  //   email,
  //   finished: false
  // }).then( order => {
  //   console.log(order)
  // })

// new order with payed false,
  // for safety only user can read but not can write
  let acl = new AV.ACL()
  acl.setReadAccess(userId, true)
  acl.setWriteAccess(userId, true)
  nOrder.setACL(acl)

  let i = 0, list = []
  for (; i < specific.period; i++) {
    list.push({
      time: i,
      shipping_code: ''
    })
  }

  nOrder.save({
    shippingDetail: list,
    userId,
    specific,
    type,
    amount: amount,
    address,
    email,
    payed: false,
    currency: 'usd',
  })
  // first class promise
    .then(
      // save order in leancloud with payed false
      savedOrder => {
        // after the order  has been saved ,then charge
        let newCharge = {
          amount: parseInt(amount),
          currency: 'usd',
          source: token, // obtained with Stripe.js on the client side
          description: 'subscription for ' + specific.period + 'month',
          receipt_email: email,
          statement_descriptor: 'snackychina.com',
          metadata: {
            'orderId': savedOrder.id
          }
        }
        stripe.charges.create(newCharge, (err, charge) => {
          //console.log(charge)
          // console.log(userId)
          if (err) {
            outcomeChecker(err, res)
          } else {
            if (charge) {
              console.info('charge')
              //  console.log(charge)
              nOrder.save({
                userId,
                specific,
                type,
                amount: charge.amount,
                address,
                email,
                payed: true,
                chargeId: charge.id
              }).then(order => {
                res.json({
                  error_code: 200,
                  msg: 'charge success'
                })
                //console.log(order)
              }, err => {
                // console.log(err)
              })
            }
          }
        })
        //   // second class promise send token to stripe
        //   .then( success => {
        //     // 1 2 3 class promise had been reslove, order complete
        //   // res.json({
        //   //   errorCode: 100,
        //   //   msg: 'charge success'
        //   // })
        // }, err => {res.json({errorCode: 100, msg: 'leancloud error'})
        //
        // })
      }, err => {
        // console.log(err)
        res.json({
          errorCode: 101,
          msg: 'leancloud error，try again'
        })
      })

  // // create the charge for specific peirod
  // stripe.charges.create(newCharge, (err, charge) => {
  //   //console.log(charge)
  //   // console.log(userId)
  //   if (err) {
  //     outcomeChecker(err)
  //   } else {
  //     console.log(charge)
  //     return nOrder.save({
  //       userId,
  //       spcific,
  //       type,
  //       amount: charge.amount,
  //       address,
  //       email,
  //       payed: false,
  //       chargeId: charge.id
  //     })
  //   }
  // }).then(order => {
  //   res.json('success')
  // })
})

function outcomeChecker (err, res) {
    console.log(err.type)
  switch (err.type) {
    case 'StripeCardError':
      // A declined card error
      res.json({
        error_code: 601,
        msg: err.message
      })  // => e.g. "Your card's expiration year is invalid."
      break
    case 'RateLimitError':
      // Too many requests made to the API too quickly
      res.json({
        error_code: 602,
        msg: err.message
      })
      break
    case 'StripeInvalidRequestError':
      // Invalid parameters were supplied to Stripe's API
      res.json({
        error_code: 602,
        msg: err.message
      })
      break
    case 'StripeAPIError':
      // An error occurred internally with Stripe's API
      res.json({
        error_code: 602,
        msg: err.message
      })
      break
    case 'StripeConnectionError':
      // Some kind of error occurred during the HTTPS communication
      res.json({
        error_code: 602,
        msg: err.message
      })
      break
    case 'StripeAuthenticationError':
      // You probably used an incorrect API key
      res.json({
        error_code: 602,
        msg: err.message
      })
      break
    default:
      // Handle any other types of unexpected errors
      res.json({
        error_code: 608,
        msg: 'Unknown error, please contact us'
      })
      break
  }

}

/*router.post('/charge', function (req, res) {
  // Create the charge object with data from the Vue.js client
  // console.log(req)
  // let newCharge = {
  //   amount: 23500,
  //   currency: 'usd',
  //   source: req.body.stripeToken, // obtained with Stripe.js on the client side
  //   description: req.body.specialNote,
  //   receipt_email: req.body.email,
  //   shipping: {
  //     name: req.body.name,
  //     address: {
  //       line1: req.body.address.street,
  //       city: req.body.address.city,
  //       state: req.body.address.state,
  //       postal_code: req.body.address.zip,
  //       country: 'US'
  //     }
  //   }
  // }

// Charge the user's card:
  let token = req.body.stripeToken // Using Express
  let userId = req.body.userId

  stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    description: 'Example charge',
    statement_descriptor: 'snackychina.com', //公司名称或网站域名
    source: token,
  }, function (err, charge) {
    //console.log(charge)
    // console.log(userId)
    if (charge) {
      res.json('sucess')
    }
  })
})*/

// Route to get the data for a charge filtered by the charge's id
// router.get('/charge/:id', function (req, res) {
//   stripe.charges.retrieve(req.params.id, function (err, charge) {
//     if (err) {
//       res.json({error: err, charge: false})
//     } else {
//       res.json({error: false, charge: charge})
//     }
//   })
// })

// Register the router
app.use('/', router)

module.exports = app
