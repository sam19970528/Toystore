import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/view/Layout.vue"),
    children: [
      {
        path: "Center",
        name: "Center",
        component: () => import("@/view/Center.vue"),
        meta: {
          title: "首頁",
        },
      },
      {
        path: "Grade8",
        name: "Grade8",
        component: () => import("@/view/Grade8.vue"),
        meta: {
          title: "8年級生區",
        },
      },
    ],
  },
  //   {
  //     path: "/Login",
  //     name: "Login",
  //     component: () => import("@/view/Login.vue"),
  //     meta: {
  //       title: "登入頁面",
  //     },
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Default Title";
  next();
});

export default router;
