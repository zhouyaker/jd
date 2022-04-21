<template>
  <div id="register">
    <div class="pic">
      <img src="../../assets/img/login/login.png" alt="">
    </div>
    <div class="input">
      <input type="text" class="usernamae" placeholder="请输入手机号" v-model="data.phone">
      <input type="text" class="password" placeholder="请输入密码" v-model="data.password">
      <input type="text" class="password" placeholder="请确认密码" v-model="data.confirmPassword">
    </div>
    <div class="button">
      <button class="regBtn" @click="register">注册</button>
    </div>
    <div class="link">
      <a href="javascript:;" class="toLogin" @click="toLogin">已有帐号 去登录</a>
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
 * 注册页面相关
 */
const registerEffect = showToast => {
  const data = reactive({
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const router = useRouter()
  // 点击注册
  const register = async () => {
    try {
      // 表单输入验证
      if (data.phone == '') {
        showToast('手机号不能为空')
        return
      }
      if (data.password == '') {
        showToast('请输入密码')
        return
      }
      // 前端表单验证判断两次密码是否一致
      if (data.password !== data.confirmPassword) {
        showToast('两次密码不一致')
      }

      // 请求接口
      let res = await post('/api/user/register', { phone: data.phone, password: data.password })
      if (res.data.code === 0) {
        showToast('注册成功')
        setTimeout(() => {
          localStorage.setItem('isLogin', 'true')
          router.replace({ name: 'Home' })
        }, 2000)
      } else {
        showToast('注册失败')
      }
    } catch (error) {
      showToast('发送请求失败')
    }
  }
  // 跳转登录页面
  const toLogin = () => {
    router.replace({ name: 'Login' })
  }
  return { toLogin, data, register }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup() {
    const { toastData, showToast } = showToastEffect()
    const { data, register, toLogin } = registerEffect(showToast)
    return { register, toLogin, data, toastData }
  }
}
</script>

<style lang="scss" scoped>
#register {
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
    .regBtn {
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
    .toLogin {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>