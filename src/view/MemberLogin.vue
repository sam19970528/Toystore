<script setup></script>

<template>
  <div class="box1"></div>
  <div class="d-flex justify-content-center">
    <div class="bg-1 d-flex justify-content-center pt-160">
      <section class="section1 animate__animated animate__pulse">
        <div class="text-center fs-36 fw-bold text-green pt-50">會員登入</div>
        <div class="d-flex justify-content-center">
          <form class="formSet">
            <div class="mb-3 mt-40">
              <label for="account" class="form-label">帳號</label>
              <input
                type="text"
                class="form-control"
                id="account"
                placeholder="請輸入帳號"
                v-model="form.account"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密碼</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="請輸入密碼"
                v-model="form.password"
              />
            </div>
            <button type="submit" class="loginBtn btnSet fs-24 fw-bold mt-20" @click.prevent="login">
              登入
            </button>
            <div class="text-center fs-24 fw-bold pt-20 text-green">
              還不是會員?
            </div>
            <button
              type="submit"
              class="submitBtn btnSet fs-24 fw-bold mt-20"
              @click.prevent="register"
            >
              會員註冊
            </button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRegisterStore } from '@/store/register'

const router = useRouter()
const route = useRoute()
const { checkLogin } = useRegisterStore()

const form = reactive({
  account: '',
  password: ''
})

const login = () => {
  const res = checkLogin(form)
  if (res) {
    if (route.query.checkout) {
      router.push('/Cart')
    }
    else {
      router.push('/UserPage/UserInfo')
    }
  }
}
const register = () => {
  if (route.query.checkout) {
    router.push({
      path: '/MemberSign',
      query: {
        checkout: 'checkout'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.box1 {
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: var(--green-color2);
}
.section1 {
  border-radius: 10px;
  width: 600px;
  height: 600px;
  background-color: #fff;
  .formSet {
    width: 450px;
    .form-label {
      font-style: 24px;
      font-weight: bold;
      color: var(--green-color1);
    }
  }
  .btnSet {
    width: 440px;
    height: 60px;
    border-radius: 60px;
    color: #fff;
    border: 0px;
  }
  .loginBtn {
    background-color: var(--green-color2);
    &:hover {
      background-color: var(--green-color1);
    }
    &:active {
      background-color: var(--orange-color2);
    }
  }
  .submitBtn {
    background-color: var(--orange-color3);
    &:hover {
      background-color: var(--orange-color4);
    }
    &:active {
      background-color: var(--orange-color2);
    }
  }
}
.bg-1 {
  background-image: url(../assets/img/bg/member/member-bg.svg);
  width: 100%;
  height: 920px;
  background-repeat: no-repeat;
}

.phone {
  display: none;
}

@media (max-width: 375px) {
  .box1 {
    border-radius: 10px;
    width: 375px;
  }
  .web-cart {
    display: none;
  }
  .phone {
    display: block;
  }
  .phone-cart {
    margin-left: 30px;
  }
  .phone-logo {
    margin-left: 30px;
  }

  .box1 {
    background-color: var(--green-color2);
  }
  .box1 input,
  ul li,
  button {
    display: none;
  }
  .phone ul li {
    display: block;
  }
}
</style>
