export class hrmstraining {
public trainingiddesc :string;public trainingid :number;public trainingtitle :string;public details :string;public jobfield :string;public jobfielddesc :string;public organizationname :string;public location :string;public trainingstartdate :Date;public trainingenddate :Date;public trainer :string;public color :string;public colordesc :string;public attachment :string;public status :string;public DeletedhrmsemployeetrainingIDs :string;
constructor() {}
}
export interface IhrmstrainingResponse {
total: number;
results: hrmstraining[];
}

