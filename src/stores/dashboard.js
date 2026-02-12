import { defineStore } from "pinia";
import { fetchDashboardStatsService } from "@/api";
import { useProfileStore } from "./user";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    stats: {
      todayQueue: 0,
      totalPatients: 0,
      totalStaff: 0,
      registrationsToday: 0,
    },
    todayQueueList: [],
    registrationsChart: [],
    isLoading: false,
  }),
  

  actions: {
    async fetchDashboard() {
        if (this.isLoading) return;
      this.isLoading = true;
      const userStore = useProfileStore();

      try {
        const res = await fetchDashboardStatsService(userStore.user.id);

        const queueRaw = res.queueToday?.data || [];
        const patientsRaw = res.patients?.data || [];
        const usersRaw = res.users || [];
        const registerRaw = res.register?.data || [];

        this.stats.todayQueue = queueRaw.length;
        this.stats.registrationsToday = queueRaw.length;
        this.stats.totalPatients = patientsRaw.length;
        this.stats.totalStaff = usersRaw.length;

        this.todayQueueList = queueRaw;

        const now = new Date();
        const today = new Date(now.getTime() + (7 * 60 * 60 * 1000));
        let todayIndex = today.getDay();
        todayIndex = todayIndex === 0 ? 6 : todayIndex - 1;
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - todayIndex);
        startOfWeek.setHours(0,0,0,0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23,59,59,999);

        const days = [0,0,0,0,0,0,0];
        
        registerRaw.forEach(item => {
            const utcDate = new Date(item.created_at);
            const localDate = new Date(
                utcDate.getTime() + (7 * 60 * 60 * 1000)
            );
            if (localDate < startOfWeek || localDate > endOfWeek) return;
            let dayIndex = localDate.getDay();
            dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

            days[dayIndex] += 1;
        });
        
        this.registrationsChart = days;

      } finally {
        this.isLoading = false;
      }
    },
  },
});
