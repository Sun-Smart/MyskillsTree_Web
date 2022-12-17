export class dmsaudittrail {
public audittrailiddesc :string;public audittrailid :number;public documentid :number;public documentiddesc :string;public versionnumber :number;public userid :number;public useriddesc :string;public action :string;public actiondesc :string;public actiondate :Date;public actiondetails :string;public comment :string;public status :string;
constructor() {}
}
export interface IdmsaudittrailResponse {
total: number;
results: dmsaudittrail[];
}

