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
      meta: {
        requiresAuth: true,
        allowedRoles: ["doctor", "admin", "superadmin"],
      },
    },
    {
      path: "/patients",
      name: "patients",
      component: () => import("@/views/Pages/Patient/PatientList.vue"),
      meta: { requiresAuth: true, allowedRoles: ["admin", "superadmin"] },
    },
    {
      path: "/patients/create",
      name: "patientsCreate",
      component: () => import("@/views/Pages/Patient/PatientForm.vue"),
      meta: { requiresAuth: true, allowedRoles: ["admin", "superadmin"] },
    },
    {
      path: "/users-management",
      name: "usersManagement",
      component: () => import("@/views/Pages/UserManagement.vue"),
      meta: { requiresAuth: true, allowedRoles: ["admin", "superadmin"] },
    },
    {
      path: "/waiting-list",
      name: "waitingList",
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
      path: "/logout",
      component: () => import("@/views/Pages/Logout.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Pages/Register.vue"),
      meta: { requiresAuth: false, layout: "none" },
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("@/views/Pages/Unauthorized.vue"),
      meta: { requiresAuth: false, layout: "none" },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  // Case 1: not logged in but route requires auth
  if (to.meta.requiresAuth && !auth.token) {
    return next("/login");
  }

  console.log(auth.user);

  // Case 2: logged in but role is not allowed
  if (
    to.meta.allowedRoles &&
    (!auth.user || !to.meta.allowedRoles.includes(auth.user.role))
  ) {
    return next("/unauthorized");
  }

  next();
});

export default router;
