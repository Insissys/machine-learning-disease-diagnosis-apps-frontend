import { useProfileStore } from "@/stores/user";
import { getToken } from "@/utils";
import { createRouter, createWebHistory } from "vue-router";
import { useUiStore } from "@/stores/ui";

import HomeView from "@/views/dashboard/DashboardView.vue";

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
      icon: "chart-line",
      title: "Dashboard",
    },
  },

  {
    path: "/patients",
    name: "patients",
    component: () => import("@/views/Patient/ListView.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
      showInDrawer: true,
      nameInDrawer: "Patients Management",
      icon: "user-injured",
      title: "Patients",
    },
  },

  {
    path: "/patients/create",
    name: "patients.create",
    component: () => import("@/views/Patient/FormView.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
      title: "Create Patients",
    },
  },

  {
    path: "/registrations",
    name: "registrations",
    component: () => import("@/views/Pages/Registration/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
      showInDrawer: true,
      nameInDrawer: "Registrations",
      icon: "clipboard-list",
      title: "Registrations",
    },
  },

  {
    path: "/registrations/create",
    name: "registrations.create",
    component: () => import("@/views/Pages/Registration/Form.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
    },
  },

  {
    path: "/queuing",
    name: "doctor.queuing",
    component: () => import("@/views/Pages/Doctor/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "doctor"],
      showInDrawer: true,
      nameInDrawer: "Patient Queuing",
      icon: "users",
      title: "Queuing",
    },
  },

  {
    path: "/queuing/input-symptom",
    name: "doctor.queuing.input-symptom",
    component: () => import("@/views/Pages/Doctor/Form.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "doctor"],
    },
  },

  {
    path: "/medical-records",
    name: "medical-records",
    component: () => import("@/views/Pages/MedicalRecord/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin", "doctor"],
      showInDrawer: true,
      nameInDrawer: "Medical Records",
      icon: "notes-medical",
      title: "Medical Records",
    },
  },

  {
    path: "/medical-records/info",
    name: "medicalrecords.info",
    component: () => import("@/views/Pages/MedicalRecord/Form.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin", "doctor"],
    },
  },

  {
    path: "/users",
    name: "users",
    component: () => import("@/views/Pages/Users/List.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
      showInDrawer: true,
      nameInDrawer: "Users",
      icon: "user-cog",
      title: "Users",
    },
  },

  {
    path: "/users/create",
    name: "users.create",
    component: () => import("@/views/Pages/Users/Form.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
      allowedRoles: ["superadmin", "admin"],
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
  const ui = useUiStore();
  ui.startLoading();

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

router.afterEach(() => {
  const ui = useUiStore();
  setTimeout(() => {
    ui.stopLoading();
  }, 300);
});


export default router;