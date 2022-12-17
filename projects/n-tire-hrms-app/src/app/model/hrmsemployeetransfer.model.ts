export class hrmsemployeetransfer {
public transferiddesc :string;public transferid :number;public referenceno :string;public referencedate :Date;public employeeid :number;public transfertype :string;public transfertypedesc :string;public transferreason :string;public transferreasondesc :string;public effectivedate :Date;public currentrole :number;public currentroledesc :string;public newrole :number;public newroledesc :string;public currentdesignation :string;public currentdesignationdesc :string;public newdesignation :string;public newdesignationdesc :string;public reportingto :number;public reportingtodesc :string;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeetransferResponse {
total: number;
results: hrmsemployeetransfer[];
}

