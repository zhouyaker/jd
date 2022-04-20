<template>
  <div id="login">
    <div class="pic">
      <img src="../../assets/img/login/login.png" alt="">
    </div>
    <div class="input">
      <input type="text" class="usernamae" placeholder="请输入手机号">
      <input type="text" class="password" placeholder="请输入密码">
    </div>
    <div class="button">
      <button class="loginBtn">登录</button>
    </div>
    <div class="link">
      <a href="" class="toReg">立即注册</a>
      <span class="gap">|</span>
      <a href="" class="forget">忘记密码</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
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
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
    }
    .gap {
      margin: 0 12rem;
    }
  }
}
</style>