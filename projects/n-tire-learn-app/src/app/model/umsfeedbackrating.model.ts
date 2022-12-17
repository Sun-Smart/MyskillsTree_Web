export class umsfeedbackrating {
    public feebackratingid: number; public feedbackid: number; public studentid: number; public courseid: number; public ratingtype: string; public ratingtypedesc: string; public rating: string; public ratingdesc: string; public status: string;
    constructor() { }
}
export interface IumsfeedbackratingResponse {
    total: number;
    results: umsfeedbackrating[];
}

