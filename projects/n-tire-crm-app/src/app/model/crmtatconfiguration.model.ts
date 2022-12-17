export class crmtatconfiguration {
public configiddesc :string;public configid :number;public parentindex :number;public parentindexdesc :string;public sub1index :number;public sub1indexdesc :string;public sub2index :number;public sub2indexdesc :string;public sub3index :number;public sub3indexdesc :string;public criticality :string;public criticalitydesc :string;public source :string;public sourcedesc :string;public tathours :string;public status :string;
constructor() {}
}
export interface IcrmtatconfigurationResponse {
total: number;
results: crmtatconfiguration[];
}

