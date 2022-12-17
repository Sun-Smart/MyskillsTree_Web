export class SerialKeyParameter {
    constructor(public SerialKeyID: number, public Company: number, public TableName: string, public ColumnName: string, public SerialKeyLogic: string) { }
}
export interface ISerialKeyParameterResponse {
    total: number;
    results: SerialKeyParameter[];
}

