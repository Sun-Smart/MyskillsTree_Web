export class systemcolumn {
public syscolumniddesc :string;public syscolumnid :number;public tablename :string;public columnname :string;public pk :boolean;public fk :boolean;public fktablename :string;public fkidentityid :string;public fkdescription :string;public fkwhere :string;public canshow :boolean;public reportid :string;public helptext :string;public status :string;
constructor() {}
}
export interface IsystemcolumnResponse {
total: number;
results: systemcolumn[];
}

