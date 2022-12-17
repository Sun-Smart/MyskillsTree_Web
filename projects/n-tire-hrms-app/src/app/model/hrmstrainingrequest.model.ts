export class hrmstrainingrequest {
public requestiddesc :string;public requestid :number;public requestcode :string;public requestdate :Date;public employeeid :number;public category :number;public categorydesc :string;public subcategory :number;public trainingmode :string;public trainingmodedesc :string;public requiredbefore :Date;public reason :string;public status :string;
constructor() {}
}
export interface IhrmstrainingrequestResponse {
total: number;
results: hrmstrainingrequest[];
}

