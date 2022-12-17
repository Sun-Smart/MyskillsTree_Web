export class hrmsitgeneralwaiver {
public gwaiveriddesc :string;public gwaiverid :number;public waivername :string;public gender :string;public genderdesc :string;public maximumamount :number;public docrequired :boolean;public status :string;
constructor() {}
}
export interface IhrmsitgeneralwaiverResponse {
total: number;
results: hrmsitgeneralwaiver[];
}

