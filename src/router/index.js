import { useAuthStore } from "@/stores";
import HomeView from "@/views/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/patients",
      name: "patients",
      component: () => import("@/views/Pages/Patient/PatientList.vue"),
      meta: { requiresAuth: true, allowedRoles: ["admin", "superadmin"] },
    },
    {
      path: "/doctor-patients",
      name: "doctorPatients",
      component: () => import("@/views/Pages/Doctor/DoctorWaitingList.vue"),
      meta: { requiresAuth: true, allowedRoles: ["doctor"] },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Pages/Login.vue"),
      meta: { requiresAuth: false, layout: "none" },
    },
    {
      // path: "/unauthorized",
      // name: "unauthorized",
      // component: () => import("@/views/Unauthorized.vue"),
      // meta: { requiresAuth: false },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) return next("/login");
  if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(auth.role))
    return next("/unauthorized");
  next();
});

export default router;
