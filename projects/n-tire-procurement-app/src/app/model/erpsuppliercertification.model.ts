export class erpsuppliercertification {
public supplierid :number;public supplieriddesc :string;public certificationiddesc :string;public certificationid :number;public certificatecategory :string;public certificatecategorydesc :string;public certificatename :string;public issuedate :Date;public expirydate :Date;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IerpsuppliercertificationResponse {
total: number;
results: erpsuppliercertification[];
}

