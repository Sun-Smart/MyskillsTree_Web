export class boservice {
public serviceiddesc :string;public serviceid :number;public sourcefield :string;public sourcereference :number;public description :string;public category :string;public categorydesc :string;public owner :string;public parentid :number;public products :string;public servicestatus :string;public servicestatusdesc :string;public priority :string;public prioritydesc :string;public sla :number;public responsibilitity :number;public cost :number;public outsourcetosupplier :boolean;public preferredsupplierid :number;public remarks :string;public status :string;public DeletedhlpserviceavailabilityIDs :string;
constructor() {}
}
export interface IboserviceResponse {
total: number;
results: boservice[];
}

