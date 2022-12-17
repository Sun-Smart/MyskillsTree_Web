export class bonotificationsetting {
public notificationmasteriddesc :string;public notificationmasterid :number;public notificationcode :string;public notificationname :string;public mode :string;public modedesc :string;public condition :string;public scheduleeveryhours :string;public schedulemonthdays :string;public status :string;
constructor() {}
}
export interface IbonotificationsettingResponse {
total: number;
results: bonotificationsetting[];
}

