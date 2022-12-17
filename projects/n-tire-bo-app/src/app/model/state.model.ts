export class State {
    constructor(public StateID: number, public Company: number, public StateName: string, public StateCode: string) { }
}
export interface IStateResponse {
    total: number;
    results: State[];
}

