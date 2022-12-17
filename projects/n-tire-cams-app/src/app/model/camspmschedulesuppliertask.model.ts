export class camspmschedulesuppliertask {
public schedulesupplieriddesc :string;public schedulesupplierid :number;public scheduleid :number;public scheduleiddesc :string;public pmid :number;public pmiddesc :string;public supplierid :number;public supplieriddesc :string;public taskdescription :string;public tasktype :string;public tasktypedesc :string;public notes :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspmschedulesuppliertaskResponse {
total: number;
results: camspmschedulesuppliertask[];
}

