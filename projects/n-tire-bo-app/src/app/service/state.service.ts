import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { Injectable } from '@angular/core';
import { State } from '../model/state.model';
import { environment } from '../../environments/environment';
import { IStateResponse } from '../model/state.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    formData: State;
    readonly rootURL = 'http://108.60.219.44:5001/api';
    list: State[];

    constructor(private http: HttpClient) { }

    saveOrUpdateStates() {
        var body = {
            ...this.formData,
        };
        return this.http.post(AppConstants.ntireboURL + '/State', body);
    }

    getStatesList() {
        return this.http.get(AppConstants.ntireboURL + '/State').toPromise();
    }

    getStatesByID(id: number): any {
        return this.http.get(AppConstants.ntireboURL + '/State/' + id).toPromise();
    }

    deleteState(id: number) {
        return this.http.delete(AppConstants.ntireboURL + '/State/' + id).toPromise();
    }
    refreshList() {
        this.http.get(AppConstants.ntireboURL + '/State')
            .toPromise()
            .then((res:any) => this.list = res as any[]);
    }

}

