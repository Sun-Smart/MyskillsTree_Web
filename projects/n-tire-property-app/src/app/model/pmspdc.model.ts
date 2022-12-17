export class pmspdc {
public pdciddesc :string;public pdcid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public tenantid :number;public tenantiddesc :string;public ownerid :number;public owneriddesc :string;public currentdate :Date;public categoryid :number;public categoryiddesc :string;public subcategoryid :number;public subcategoryiddesc :string;public paymenttype :string;public paymenttypedesc :string;public collectionmode :string;public collectionmodedesc :string;public duedate :Date;public reference :string;public amount :number;public status :string;
constructor() {}
}
export interface IpmspdcResponse {
total: number;
results: pmspdc[];
}

