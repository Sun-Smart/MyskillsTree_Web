export class vmsevent {
public eventiddesc :string;public eventid :number;public eventreference :string;public loginimage :string;public loginpage :string;public notes :string;public status :string;
constructor() {}
}
export interface IvmseventResponse {
total: number;
results: vmsevent[];
}

