import { useProfileStore } from "@/stores/user";
import { getToken } from "@/utils";
import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/index.vue";

const routes = [
  // ===== PRIVATE ROUTES =====
  {
    path: "/",
    name: "dashboard",
    component: HomeView,
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin", "doctor"],
      showInDrawer: true,
      nameInDrawer: "Dashboard",
      title: "Dashboard",
    },
  },

  {
    path: "/patients",
    component: () => import("@/views/Pages/Patient/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
      showInDrawer: true,
      nameInDrawer: "Patients Management",
      title: "Patients",
    },
  },

  {
    path: "/registrations",
    component: () => import("@/views/Pages/Registration/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
      showInDrawer: true,
      nameInDrawer: "Registrations",
      title: "Registrations",
    },
  },

  {
    path: "/queuing",
    component: () => import("@/views/Pages/Doctor/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "doctor"],
      showInDrawer: true,
      nameInDrawer: "Patient Queuing",
      title: "Queuing",
    },
  },

  {
    path: "/medical-records",
    component: () => import("@/views/Pages/MedicalRecord/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin", "doctor"],
      showInDrawer: true,
      nameInDrawer: "Medical Records",
      title: "Medical Records",
    },
  },

  {
    path: "/users",
    component: () => import("@/views/Pages/Users/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
      showInDrawer: true,
      nameInDrawer: "Users",
      title: "Users",
    },
  },

  // ===== AUTH ROUTES =====
  {
    path: "/login",
    component: () => import("@/views/auth/LoginView.vue"),
    meta: {
      layout: "auth",
      guestOnly: true,
      image: "/src/assets/images/ilusstration.svg",
      credit: {
        text: "Mobile illustrations by Storyset",
        link: "https://storyset.com/mobile",
      },
    },
  },
  {
    path: "/register",
    component: () => import("@/views/auth/RegisterView.vue"),
    meta: {
      layout: "auth",
      guestOnly: true,
      image: "/src/assets/images/ilusstration2.svg",
      credit: {
        text: "Phone illustrations by Storyset",
        link: "https://storyset.com/phone",
      },
    },
  },

  // ===== ERROR ROUTES =====
  {
    path: "/unauthorized",
    component: () => import("@/views/auth/UnauthorizedView.vue"),
    meta: { layout: "none" },
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = getToken();
  const userStore = useProfileStore();

  // 1️⃣ Guest only pages (login/register)
  if (to.meta.guestOnly && token) {
    return next("/");
  }

  // 2️⃣ Route requires login
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // 3️⃣ Fetch profile if not loaded
  if (token && !userStore.user) {
    try {
      await userStore.fetchProfile();
    } catch (err) {
      return next("/login");
    }
  }

  // 4️⃣ Role based guard
  if (to.meta.allowedRoles?.length) {
    const role = userStore.user?.role?.name;
    if (!to.meta.allowedRoles.includes(role)) {
      return next("/unauthorized");
    }
  }

  next();
});

export default router;