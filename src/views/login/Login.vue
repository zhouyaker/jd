<template>
  <div id="login">
    <div class="pic">
      <img src="../../assets/img/login/login.png" alt="">
    </div>
    <div class="input">
      <input type="text" class="usernamae" placeholder="请输入手机号" v-model="data.phone">
      <input type="text" class="password" placeholder="请输入密码" v-model="data.password">
    </div>
    <div class="button">
      <button class="loginBtn" @click="login">登录</button>
    </div>
    <div class="link">
      <a href="javascript:;" class="toReg" @click="toReg">立即注册</a>
      <span class="gap">|</span>
      <a href="" class="forget">忘记密码</a>
    </div>
  </div>
  <toast v-if="toastData.toastShow">{{toastData.toastMessage}}</toast>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Toast, { showToastEffect } from '../../components/toast/Toast.vue'

import { post } from '../../utils/request.js'
/**
 * 登录页面相关
 */
const loginEffect = showToast => {
  const data = reactive({
    phone: '',
    password: ''
  })
  const router = useRouter()
  // 点击登录
  const login = async () => {
    // 表单输入验证
    if (data.phone == '') {
      showToast('手机号不能为空')
      return
    }
    if (data.password == '') {
      showToast('请输入密码')
      return
    }
    try {
      // 请求接口
      let res = await post('/api/user/login', { phone: data.phone, password: data.password })
      if (res.data.code === '0') {
        localStorage.setItem('isLogin', 'true')
        router.replace({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (error) {
      showToast('发送请求失败')
    }
  }
  // 跳转到注册页面
  const toReg = () => {
    console.log('注册页面')
    router.replace({ name: 'Register' })
  }
  return { login, data, toReg }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup() {
    const { toastData, showToast } = showToastEffect()
    const { data, login, toReg } = loginEffect(showToast)
    return { login, toReg, data, toastData }
  }
}
</script>

<style lang="scss" scoped>
#login {
  .pic {
    text-align: center;
    margin-top: 120rem;
    margin-bottom: 40rem;
    img {
      width: 66rem;
      height: 66rem;
    }
  }
  .input {
    text-align: center;
    margin-bottom: 16rem;
    input {
      width: 295rem;
      height: 48rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: #f9f9f9;
      border-radius: 6rem;
      margin-bottom: 16rem;
      font-size: 16rem;
      padding-left: 16rem;
    }
  }
  .button {
    text-align: center;
    margin-bottom: 16rem;
    .loginBtn {
      width: 295rem;
      height: 48rem;
      background-color: #0091ff;
      color: #fff;
      font-size: 16rem;
      box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
      border-radius: 4rem;
    }
  }
  .link {
    text-align: center;
    .toReg,
    .forget {
      font-size: 14rem;
      color: rgba(0, 0, 0, 0.5);
    }
    .gap {
      margin: 0 12rem;
    }
  }
}
</style>