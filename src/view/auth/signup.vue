<template>
  <div align="center">

    <Row justify="center" align="middle" type="flex">
      <Col span="8" :xs="24" :lg="12">
      <Card class="signup_card">


        <h2>Enter Your Email to Start</h2>


        <!--<Input v-model="email" placeholder="Please Enter your email, etc:example@gmail.com">-->
        <!--<Icon type="email" slot="prepend"></Icon>-->
        <!--</Input>-->


        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.email" placeholder="Email">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>

          <FormItem prop="rePwd">
            <Input type="password" v-model="formInline.rePwd" placeholder="Repeat Password" @on-enter="handleSubmit('formInline')">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>

          <FormItem>
            <Button type="primary" :loading="loading" :icon="loading?'checkmark-round':''"
                    @click="handleSubmit('formInline')">Signin
            </Button>
          </FormItem>
        </Form>
        <!--<Input v-model="password" type="password" placeholder="Password">-->
        <!--<Icon type="locked" slot="prepend"></Icon>-->
        <!--</Input>-->
        <!--</Col>-->
        <!--<Col span="12">-->
        <!--<Input v-model="rePassword" type="password" placeholder="Confirm Password">-->
        <!--<Icon type="locked" slot="prepend"></Icon>-->
        <!--</Input>-->

        <!--<Button :loading="loading" :icon="loading?'checkmark-round':''" @click="signup" type="info" size="large">-->
        <!--<span v-if="!loading">Sign up now!</span>-->
        <!--<span v-else>Loading...</span>-->
        <!--</Button>-->

      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import AV from 'leancloud-storage'

  export default {
    data () {

      return {
        loading: false,
        formInline: {
          email: '',
          password: '',
          rePwd: ''
        },
        ruleInline: {
          email: [
            {required: true, message: 'Please fill in the email', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ],
          rePwd: [
            {required: true, message: 'Please  repeat  the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ],
        }
      }
    },
    components: {},
    methods: {
      showDialog (error = false, code) {
        if (!error) {
          const title = 'Verification Email has been sent successfully'
          const content = `<p>Please check your email and click on the verification link.</p><p>If some error occurred，sign in your account and click on the resend button</p>`

          this.$Modal.success({
            title: title,
            content: content,
            okText: 'Go Check Email',
            onOk: this.toEmail
          })
        } else {
          const title = 'Error Occurred'
          switch (code) {
            case 203: {
              const content = `<p>Duplicate Email</p>`
              this.$Modal.error({
                title: title,
                content: content,
                okText: 'Try Another Email',
              })
            }

          }
        }

      },
      signup () {
        this.loading = true
        let user = new AV.User()
        // 设置用户名
        user.setUsername(this.formInline.email)
        // 设置密码
        user.setPassword(this.formInline.password)
        // 设置邮箱
        user.setEmail(this.formInline.email)
        user.set('addresses',[])
        user.signUp().then((loginedUser) => {
          console.log(loginedUser)
          console.log(loginedUser.code)
          this.loading = false
          this.showDialog(false)
          this.$store.commit('setUser', {user: loginedUser, logout: false})
          this.$router.push('/')
        }, (error) => {
          this.loading = false
          this.showDialog(true, error.code)

        })
      },
      toEmail () {
        let mailUrl = this.mailHash(this.formInline.email)
        console.log(mailUrl)
        window.location.href = `http://${mailUrl}`
      },
      mailHash (email) {
        let t = email.split('@')[1]
        t = t.toLowerCase()

        if (t == '163.com') {
          return 'mail.163.com'
        } else if (t == 'vip.163.com') {
          return 'vip.163.com'
        } else if (t == '126.com') {
          return 'mail.126.com'
        } else if (t == 'qq.com' || t == 'vip.qq.com' || t == 'foxmail.com') {
          return 'mail.qq.com'
        } else if (t == 'gmail.com') {
          return 'mail.google.com'
        } else if (t == 'sohu.com') {
          return 'mail.sohu.com'
        } else if (t == 'tom.com') {
          return 'mail.tom.com'
        } else if (t == 'vip.sina.com') {
          return 'vip.sina.com'
        } else if (t == 'sina.com.cn' || t == 'sina.com') {
          return 'mail.sina.com.cn'
        } else if (t == 'tom.com') {
          return 'mail.tom.com'
        } else if (t == 'yahoo.com.cn' || t == 'yahoo.cn') {
          return 'mail.cn.yahoo.com'
        } else if (t == 'tom.com') {
          return 'mail.tom.com'
        } else if (t == 'yeah.net') {
          return 'www.yeah.net'
        } else if (t == '21cn.com') {
          return 'mail.21cn.com'
        } else if (t == 'hotmail.com') {
          return 'www.hotmail.com'
        } else if (t == 'sogou.com') {
          return 'mail.sogou.com'
        } else if (t == '188.com') {
          return 'www.188.com'
        } else if (t == '139.com') {
          return 'mail.10086.cn'
        } else if (t == '189.cn') {
          return 'webmail15.189.cn/webmail'
        } else if (t == 'wo.com.cn') {
          return 'mail.wo.com.cn/smsmail'
        } else if (t == '139.com') {
          return 'mail.10086.cn'
        } else {
          return ''
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formInline.password === this.formInline.rePwd) {
              this.signup()
            } else {
              this.$Message.error('Please enter the same string for password and repeat password')
            }

          } else {
            this.$Message.error('Please enter the correct information')
          }
        })
      }
    },
    computed: {},
    mounted () {
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">


  @media (min-width: 768px) {
    .signup_card {
      margin: 1rem 0;
      padding: 0 9rem;
    }
  }

  @media (max-width: 768px) {
    .signup_card {
      margin: 1rem 0;

    }
  }

</style>
