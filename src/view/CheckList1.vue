<script setup></script>

<template>
  <div class="box1"></div>
  <section class="section1">
    <div class="container">
      <ul class="row d-flex justify-content-center align-items-center">
        <li class="col-md-4">1.訂單資料</li>
        <li class="col-md-4">2.付款方式</li>
        <li class="col-md-4">3.完成訂單</li>
      </ul>
    </div>
  </section>

  <section class="section2 d-flex justify-content-center pt-40">
    <div class="header">
      <div>商品內容</div>
      <div>數量</div>
      <div>總計</div>
    </div>
  </section>

  <section class="section3 pt-40">
    <div
      v-for="product in isDirect ? getDirectPurchase : getSelectedCartList"
      class="shopping-card"
    >
      <div>
        <img :src="product.picture" />
        <div>{{ product.name }}</div>
      </div>

      <div>{{ product.qty }}</div>
      <div>{{ `$${product.price * product.qty}` }}</div>
    </div>
    <div class="d-flex justify-content-center">
      <hr />
    </div>
  </section>

  <section class="section4">
    <div class="bottom">
      <div>{{ `商品總數:${getSelectedProductAllQty}` }}</div>
      <div class="text-orange">
        {{
          `總計$${
            isDirect
              ? getDirectPurchaseAmountTotal
              : getSelectedCartListAmountTotal
          }`
        }}
      </div>
    </div>
  </section>

  <section class="section5">
    <div class="container">
      <form class="row g-3 d-flex">
        <div class="col-md-12">訂購人資訊</div>
        <div class="col-md-6">
          <label for="name" class="form-label">姓名</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="請輸入姓名"
            v-model="form.name"
          />
        </div>
        <div class="col-md-6">
          <label for="phone" class="form-label">行動電話</label>
          <input
            type="tel"
            id="phone"
            class="form-control"
            placeholder="請輸入行動電話"
            v-model="form.phone"
          />
        </div>
        <div class="col-12">
          <label for="address" class="form-label">住址</label>
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="請輸入住址"
            v-model="form.address"
          />
        </div>
        <div class="col-12">
          <label for="email" class="form-label">信箱</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="請輸入信箱"
            v-model="form.email"
          />
        </div>
        <div class="col-12">
          <div class="form-check mb-4">
            <input
              class="form-check-input"
              type="radio"
              name="invoiceType"
              :value="1"
              v-model="form.invoiceType"
            />
            <input
              type="text"
              placeholder="請輸入載具"
              class="form-control"
              @click="form.invoiceType = 1"
              v-model="form.vehicle"
            />
          </div>
          <div class="form-check">
            <label for="paper">紙本發票</label>
            <input
              class="form-check-input"
              type="radio"
              name="invoiceType"
              id="paper"
              :value="2"
              v-model="form.invoiceType"
            />
          </div>
        </div>
        <hr>
        <h4 class="fw-bold">配送方式</h4>
        <div class="form-check mb-4">
          <label for="store">到店取貨</label>
          <input
            class="form-check-input"
            type="radio"
            name="delivery"
            id="store"
            :value="1"
            v-model="form.deliveryType"
          />
        </div>
          <div class="form-check">
            <label for="deliveryToHome" class="mb-3">宅配到府</label>
            <input
              class="form-check-input"
              type="radio"
              name="delivery"
              id="deliveryToHome"
              :value="2"
              v-model="form.deliveryType"
            />
            <input
              v-if="form.deliveryType === 2"
              type="text"
              placeholder="請輸入地址"
              class="form-control"
            />
          </div>
      </form>
    </div>
  </section>

  <section class="section6">
    <div class="all-button">
      <router-link to="/Cart" class="text-decoration-none text-white">
        <div>
          <button class="btn1">取消</button>
        </div>
      </router-link>
      <a class="text-decoration-none text-white">
        <div>
          <button class="btn2" @click="submitInfo">下一步</button>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/cart";
const cartStore = useCartStore();
const { updateCustomerInfo } = cartStore;
const {
  getSelectedCartList,
  getSelectedCartListAmountTotal,
  getDirectPurchase,
  getDirectPurchaseAmountTotal,
  getSelectedProductAllQty,
} = storeToRefs(cartStore);

const router = useRouter();
const route = useRoute();
const isDirect = route.query.isDirect;

const form = reactive({
  name: "Tom",
  phone: "0987717171",
  address: "新北市",
  email: "Tom123@gmail.com",
  invoiceType: 1,
  vehicle: "",
  deliveryType: 1,
});

const submitInfo = () => {
  if (form.invoiceType === 1) {
    if (!form.vehicle) {
      errorAlert("請輸入載具編號");
      return;
    }
  }
  updateCustomerInfo(form);
  if (isDirect) {
    router.push({
      path: "/CheckList2",
      query: {
        isDirect: "direct",
      },
    });
  } else {
    router.push("/CheckList2");
  }
};
</script>

<style scoped lang="scss">
.section6 {
  padding-top: 40px;
  padding-bottom: 200px;
  .all-button {
    display: flex;
    justify-content: center;
    .btn1 {
      font-weight: bold;
      background-color: var(--orange-color1);
      color: #fff;
      padding: 15px 40px;
      margin-right: 25px;
      border-radius: 10px;
      border: 0px solid;
      &:hover {
        background-color: var(--orange-color4);
      }
    }
    .btn2 {
      font-weight: bold;
      background-color: var(--orange-color3);
      color: #fff;
      padding: 15px 40px;
      margin-right: 10px;
      border-radius: 10px;
      border: 0px solid;
      &:hover {
        background-color: var(--orange-color4);
      }
    }
  }
}
.section5 {
  padding-top: 60px;
  display: flex;
  justify-content: center;
  .form-label {
    font-weight: bold;
  }
  .container {
    width: 900px;
  }
  .col-md-12 {
    font-weight: bold;
  }
  .form-check-label {
    input {
      width: 10em;
    }
  }
  .form-check {
    margin-top: 10px;
    input {
      border-radius: 3px;
      border: rgba(135, 135, 135, 0.612) 1px solid;
    }
  }
}
.section4 {
  .bottom {
    font-weight: bold;
    display: flex;
    justify-content: center;
    > div:nth-child(1) {
      margin-right: 440px;
    }

    > div:nth-child(2) {
      margin-right: 160px;
    }

    > div:nth-child(3) {
      margin-left: 150px;
      color: var(--orange-color1);
    }
  }
}
.section3 {
  .shopping-card {
    display: flex;
    align-items: center;
    justify-content: center;
    > div:nth-child(1) {
      margin-right: 440px;
    }

    > div:nth-child(2) {
      margin-right: 160px;
    }

    > div:nth-child(3) {
      margin-left: 150px;
    }
  }
}
hr {
  margin-top: 40px;
  width: 1100px;
  border: 3px gray solid;
  border-radius: 5px;
}
.section2 {
  .header {
    height: 50px;
    width: 1150px;
    background-color: var(--green-color2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    color: #fff;
    font-weight: bold;
    > div:nth-child(1) {
      padding-left: 50px;
    }

    > div:nth-child(2) {
      margin-left: 600px;
    }

    > div:nth-child(3) {
      margin-left: 320px;
    }
  }
}
.section1 {
  padding-top: 80px;
  height: 200px;
  ul {
    li {
      padding-top: 25px;
      text-align: center;
      width: 375px;
      height: 70px;
      border-radius: 100px;
      font-weight: bold;
      margin: 40px 20px;
      &:nth-child(1) {
        background: var(--orange-color3);
        color: #fff;
      }

      &:nth-child(2) {
        background-color: var(--orange-color2);
      }

      &:nth-child(3) {
        background-color: var(--orange-color2);
      }
    }
  }
}

.box1 {
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: var(--green-color2);
}
</style>
