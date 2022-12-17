export class camsassettransfer {
public transferiddesc :string;public transferid :number;public transferdate :Date;public transfertype :string;public transfertypedesc :string;public reference :string;public fromdepartment :number;public fromdepartmentdesc :string;public currentlocation :number;public currentlocationdesc :string;public fromemployee :number;public fromemployeedesc :string;public building :string;public room :string;public todepartment :number;public todepartmentdesc :string;public newlocation :number;public newlocationdesc :string;public toemployee :number;public toemployeedesc :string;public tobuilding :string;public toroom :string;public transferreason :string;public remarks :string;public customfield :string;public attachment :string;public status :string;public DeletedcamsassettransferdetailIDs :string;
constructor() {}
}
export interface IcamsassettransferResponse {
total: number;
results: camsassettransfer[];
}

