import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsinsurance } from '../model/hmsinsurance.model';
import { environment } from '../../environments/environment';
import { IhmsinsuranceResponse } from '../model/hmsinsurance.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsinsuranceService {
  formData: hmsinsurance;
  readonly rootURL = AppConstants.baseURL;
  list: hmsinsurance[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsinsurances() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsinsurance', body);
    }
  }

  saveOrUpdatehmsinsurancesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsinsurance', body);
    }
  }

  gethmsinsurancesList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsinsurance').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsinsurance' + '/param/' + key).toPromise();
    }
  }

  gethmsinsurancesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsinsurance' + '/' + id).toPromise();
    }
  }

  deletehmsinsurance(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsinsurance' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsinsurance')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsinsuranceResponse> {
    return this.http.get<IhmsinsuranceResponse>(AppConstants.ntirehospitalURL + '/hmsinsurance')
      .pipe(
        tap((response: IhmsinsuranceResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsinsurance => new hmsinsurance(hmsinsurance.insuranceid, hmsinsurance.patientid, hmsinsurance.insurancedperson, hmsinsurance.relationship, hmsinsurance.relationshipdesc, hmsinsurance.insuranceno, hmsinsurance.coverageamount, hmsinsurance.notes, hmsinsurance.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsinsurance => hmsinsurance.insurancedperson.includes(filter.name))

          return response;
        })
      );
  }



}

