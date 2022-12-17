export class vmssetting {
public settingiddesc :string;public settingid :number;public welcomeemail :string;public welcomeguide :string;public welcomemessage :string;public welcomeaction :string;public welcomeactiondesc :string;public visitorbadgelogo :string;public status :string;
constructor() {}
}
export interface IvmssettingResponse {
total: number;
results: vmssetting[];
}

