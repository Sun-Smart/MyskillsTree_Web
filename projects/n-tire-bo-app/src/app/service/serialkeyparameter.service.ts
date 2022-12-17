import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerialKeyParameter } from '../model/serialkeyparameter.model';
import { environment } from '../../environments/environment';
import { ISerialKeyParameterResponse } from '../model/serialkeyparameter.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SerialKeyParameterService {
    formData: SerialKeyParameter;
    readonly rootURL = 'http://108.60.219.44:5001/api';
    list: SerialKeyParameter[];

    constructor(private http: HttpClient) { }

    saveOrUpdateSerialKeyParameters() {
        var body = {
            ...this.formData,
        };
        return this.http.post(AppConstants.ntireboURL + '/SerialKeyParameter', body);
    }

    getSerialKeyParametersList() {
        return this.http.get(AppConstants.ntireboURL + '/SerialKeyParameter').toPromise();
    }

    getSerialKeyParametersByID(id: number): any {
        return this.http.get(AppConstants.ntireboURL + '/SerialKeyParameter/' + id).toPromise();
    }

    deleteSerialKeyParameter(id: number) {
        return this.http.delete(AppConstants.ntireboURL + '/SerialKeyParameter/' + id).toPromise();
    }
    refreshList() {
        this.http.get(AppConstants.ntireboURL + '/SerialKeyParameter')
            .toPromise()
            .then((res:any) => this.list = res as SerialKeyParameter[]);
    }

}

