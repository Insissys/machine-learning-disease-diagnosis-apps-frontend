import { fetchAllQueueService } from "./queue.api";
import { fetchAllPatientsService } from "./patient.api";
import { fetchAllUserService } from "./user.api";
import { fetchAllRegisterService } from "./registration.api";

export async function fetchDashboardStatsService(userId) {
  try {
    const [queue, patients, users, register] = await Promise.all([
      fetchAllQueueService(userId),
      fetchAllPatientsService(),
      fetchAllUserService(),
      fetchAllRegisterService()
    ]);

    return {
      queueToday: queue ?? [],
      patients: patients ?? [],
      users: users ?? [],
      register: register ?? [],
    };
  } catch (error) {
    throw error;
  }
}
