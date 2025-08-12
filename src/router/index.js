import { useProfileStore } from "@/stores/user";
import { getToken } from "@/utils/util";
import HomeView from "@/views/index.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin", "doctor"],
        showInDrawer: true,
        nameInDrawer: "Dashboard",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Pages/Profile.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin", "doctor"],
      },
    },
    {
      path: "/patients",
      name: "patients",
      component: () => import("@/views/Pages/Patient/List.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin"],
        showInDrawer: true,
        nameInDrawer: "Patients Management",
      },
    },
    {
      path: "/patients/create",
      name: "patients.create",
      component: () => import("@/views/Pages/Patient/Form.vue"),
      meta: { requiresAuth: true, allowedRoles: ["superadmin", "admin"] },
    },
    {
      path: "/registrations",
      name: "registrations",
      component: () => import("@/views/Pages/Registration/List.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin"],
        showInDrawer: true,
        nameInDrawer: "Registrations Management",
      },
    },
    {
      path: "/registrations/create",
      name: "registrations.create",
      component: () => import("@/views/Pages/Registration/Form.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin"],
      },
    },
    {
      path: "/queuing",
      name: "doctor.queuing",
      component: () => import("@/views/Pages/Doctor/List.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "doctor"],
        showInDrawer: true,
        nameInDrawer: "Patient's Queuing",
      },
    },
    {
      path: "/queuing/input-symptom",
      name: "doctor.queuing.input-symptom",
      component: () => import("@/views/Pages/Doctor/Form.vue"),
      meta: { requiresAuth: true, allowedRoles: ["superadmin", "doctor"] },
    },
    {
      path: "/medical-records",
      name: "medicalrecords",
      component: () => import("@/views/Pages/MedicalRecord/List.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin", "doctor"],
        showInDrawer: true,
        nameInDrawer: "Medical Records",
      },
    },
    {
      path: "/medical-records/info",
      name: "medicalrecords.info",
      component: () => import("@/views/Pages/MedicalRecord/Form.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin", "doctor"],
      },
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/Pages/Users/List.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin"],
        showInDrawer: true,
        nameInDrawer: "Users Management",
      },
    },
    {
      path: "/users/create",
      name: "users.create",
      component: () => import("@/views/Pages/Users/Form.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin"],
      },
    },
    // {
    //   path: "/reports",
    //   name: "reports",
    //   component: () => import("@/views/Pages/Reports/Report.vue"),
    //   meta: {
    //     requiresAuth: true,
    //     allowedRoles: ["superadmin", "admin"],
    //     showInDrawer: true,
    //     nameInDrawer: "Reports",
    //   },
    // },
    {
      path: "/help",
      name: "help",
      component: () => import("@/views/Pages/Footer/Help.vue"),
      meta: {
        requiresAuth: true,
        allowedRoles: ["superadmin", "admin"],
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Pages/Auth/Login.vue"),
      meta: { whileLoggedIn: true, requiresAuth: false, layout: "none" },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Pages/Auth/Register.vue"),
      meta: { requiresAuth: false, layout: "none" },
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("@/views/Pages/Auth/Unauthorized.vue"),
      meta: { requiresAuth: false, layout: "none" },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useProfileStore();

  // Case 1: not logged in but route requires auth
  if (to.meta.requiresAuth && !getToken()) {
    return next("/login");
  }

  // Case 3: logged in not allowing re-login
  if (to.meta.whileLoggedIn && getToken()) {
    return next("/");
  }

  // Case 3: Role-based access
  if (to.meta.allowedRoles?.length) {
    if (!userStore.user) {
      try {
        await userStore.fetchProfile();
      } catch (err) {
        return next("/login");
      }
    }

    if (!to.meta.allowedRoles.includes(userStore.user?.role.name)) {
      return next("/unauthorized");
    }
  }

  next();
});

export default router;
