export class ltyreward {
public rewardiddesc :string;public rewardid :number;public name :string;public rewardtype :number;public rewardtypedesc :string;public rewardsubtype :number;public rewardcategory :string;public rewardcategorydesc :string;public claimbuttonlabel :string;public imageurl :string;public startdate :Date;public enddate :Date;public applicabledays :string;public validdaysfrompublishdate :number;public displaycomingsoon :boolean;public displaycountdown :boolean;public eventname :string;public pointvalue :number;public totallimit :number;public limitpercustomer :number;public minordervalue :number;public excludeddeliverycosts :number;public multiplier :number;public referrerpoint :number;public customersegmentid :string;public productsegmentid :string;public usedbycustomers :number;public totalpointsearned :number;public publishdate :Date;public rewardstatus :string;public rewardstatusdesc :string;public redeeminstructions :string;public terms :string;public status :string;public DeletedltycustomerrewardIDs :string;
constructor() {}
}
export interface IltyrewardResponse {
total: number;
results: ltyreward[];
}

