export class hrmssectionwaiver {
public swaiveriddesc :string;public swaiverid :number;public sectionname :string;public gender :string;public genderdesc :string;public maximumamount :number;public docrequired :boolean;public taxortaxableincome :string;public taxortaxableincomedesc :string;public status :string;
constructor() {}
}
export interface IhrmssectionwaiverResponse {
total: number;
results: hrmssectionwaiver[];
}

