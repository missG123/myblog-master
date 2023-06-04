<template>
  <div class="login_main">
    <div class="login_div">
      <transition leave-active-class="animate__animated animate__fadeOutDown"
        enter-active-class="animate__animated animate__fadeInUp">
        <div class="login_left" v-if="isLogin">
          <h1 class="login_title">登 录</h1>
          <p><input type="text" class="number" placeholder="账号" v-model="userInfo.number" /></p>
          <p><input type="password" class="pwd" placeholder="密码" v-model="userInfo.pwd"></p>
          <p class="note"><a>忘记密码?</a></p>
          <button class="login_btn" @click="goLogin()">登录</button>
        </div>
      </transition>
      <transition leave-active-class='animate__animated animate__fadeOutLeft'
        enter-active-class="animate__animated animate__fadeInLeft">
        <div class="login_right" v-if="isLogin">
          <p class="no_number">没有账号？</p>
          <p class="go_register">立即注册吧😃</p>
          <button class="register" @click="isLogin = !isLogin">注册</button>
        </div>
      </transition>
    </div>
    <div class="register_div">
      <transition enter-active-class='animate__animated animate__fadeInRight'
        leave-active-class="animate__animated animate__fadeOutRight">
        <div class="register_left" v-if="!isLogin">
          <p class="no_number">已有账号？</p>
          <p class="go_register">请登录😃</p>
          <button class="register" @click="isLogin = !isLogin">登录</button>
        </div>
      </transition>
      <transition enter-active-class='animate__animated animate__fadeInLeft'
        leave-active-class="animate__animated animate__fadeOutLeft">
        <div class="register_right" v-if="!isLogin">
          <h1 class="login_title">注册</h1>
          <p><input type="text" class="number" placeholder="账号" v-model="userInfo.number" /></p>
          <p><input type="text" class="nickname" placeholder="昵称" v-model="userInfo.name" /></p>
          <p><input type="password" class="pwd" placeholder="密码" v-model="userInfo.pwd"></p>
          <button class="login_btn" @click="goRegister()">注册</button>
        </div>
      </transition>
    </div>


  </div>
</template>

<script setup lang="ts">
import 'animate.css'
import { reqHasUser, reqRegister } from '@/api/user';
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUser } from '@/store/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
let store = useUser()
const { token } = storeToRefs(store)
const router = useRouter()

let isLogin = ref(true)
const userInfo = ref<UserContent>({
  number: '',
  pwd: '',
  name: '',
  imgUrl: '',
})


const goLogin = () => {
  store.login(userInfo.value.number, userInfo.value.pwd);
  console.log(token, '==========')
  if (token) {
    router.push('/home')
  } else {
    ElMessage({
      type: 'warning',
      message: '登录失败，请检查账号或密码是否有误'
    })
  }
  userInfo.value = {
    number: '',
    pwd: '',
    name: '',
    imgUrl: '',
  }
}
const goRegister = async () => {
  let res = await reqHasUser({ number: userInfo.value.number })
  if ((res as any).code == 200 && (res as any).message == 'ok') {
    let num = Math.floor(Math.random() * 10) + 1
    let imgUrl = `bg${num}.png`;
    userInfo.value.imgUrl = imgUrl
    let res1 = await reqRegister(userInfo.value);
    if ((res1 as any).code == 200) {
      isLogin.value = true;
      ElMessage({
        type: 'success',
        message: '注册成功'
      })
    } else {
      ElMessage({
        type: 'warning',
        message: '注册失败'
      })
      userInfo.value = {
        number: '',
        pwd: '',
        name: '',
        imgUrl: '',
      }
    }
  } else {
    ElMessage({
      type: 'warning',
      message: '已有账号，请重新注册'
    })
    userInfo.value = {
      number: '',
      pwd: '',
      name: '',
      imgUrl: '',
    }
  }
}


</script>

<style lang="less">
.login_main {
  width: 710px;
  height: 450px;
  border-radius: 15px;
  box-shadow: 0px 10px 15px gray;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  .login_div {
    display: flex;

    .login_left {
      width: 375px;
      height: 450px;
      border-bottom-left-radius: 15px;
      border-top-left-radius: 15px;
      background-color: rgb(238, 233, 233);
      text-align: center;

      .login_title {
        margin-top: 90px;
        margin-bottom: 10px;
        color: rgb(50, 54, 68);
      }

      p {
        margin-top: 15px;

        input {
          width: 300px;
          height: 40px;
        }
      }

      .note {
        font-size: 12px;
        margin-bottom: 20px;
        color: rgb(50, 54, 68);

        a {
          cursor: pointer;
        }
      }

      .login_btn {
        width: 126px;
        height: 45px;
        border-radius: 15px;
        background-color: rgb(50, 54, 68);
        color: #fff;
        font-size: 16px;
        font-weight: 700;
      }

    }

    .login_right {
      width: 335px;
      height: 450px;
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      background-color: rgb(50, 54, 68);
      text-align: center;
      color: rgb(238, 233, 233);

      .no_number {
        margin-top: 120px;
        font-size: 32px;
        font-weight: 700;
      }

      .go_register {
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 12px;
      }

      .register {
        width: 127px;
        height: 46px;
        border-radius: 23px;
        font-weight: 700;
        color: rgb(238, 233, 233);
        border: 1px solid rgb(238, 233, 233);
        background-color: rgb(50, 54, 68);
      }
    }
  }

  .register_div {
    display: flex;
    position: absolute;
    top: 0;

    .register_left {
      width: 335px;
      height: 450px;
      border-bottom-left-radius: 15px;
      border-top-left-radius: 15px;
      background-color: rgb(50, 54, 68);
      text-align: center;
      color: rgb(238, 233, 233);

      .no_number {
        margin-top: 120px;
        font-size: 32px;
        font-weight: 700;
      }

      .go_register {
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 12px;
      }

      .register {
        width: 127px;
        height: 46px;
        border-radius: 23px;
        font-weight: 700;
        color: rgb(238, 233, 233);
        border: 1px solid rgb(238, 233, 233);
        background-color: rgb(50, 54, 68);
      }
    }

    .register_right {
      width: 375px;
      height: 450px;
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      background-color: rgb(238, 233, 233);
      text-align: center;

      .login_title {
        margin-top: 90px;
        margin-bottom: 10px;
        color: rgb(50, 54, 68);
      }

      p {
        margin-top: 15px;

        input {
          width: 300px;
          height: 40px;
        }
      }

      .note {
        font-size: 12px;
        margin-bottom: 20px;
        color: rgb(50, 54, 68);

        a {
          cursor: pointer;
        }
      }

      .login_btn {
        width: 126px;
        height: 45px;
        border-radius: 15px;
        margin-top: 20px;
        background-color: rgb(50, 54, 68);
        color: #fff;
        font-size: 16px;
        font-weight: 700;
      }

    }
  }
}
</style>