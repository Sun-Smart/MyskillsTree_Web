import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmshospitalnetwork } from '../model/hmshospitalnetwork.model';
import { hmsdoctornetwork } from '../model/hmsdoctornetwork.model';
import { environment } from '../../environments/environment';
import { IhmshospitalnetworkResponse } from '../model/hmshospitalnetwork.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmshospitalnetworkService {
  formData: hmshospitalnetwork;
  readonly rootURL = AppConstants.baseURL;
  hmsdoctornetworks: hmsdoctornetwork[] = [];
  list: hmshospitalnetwork[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmshospitalnetworks() {
    {
      var body = {
        ...this.formData,
        hmsdoctornetworks: this.hmsdoctornetworks.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmshospitalnetwork', body);
    }
  }

  saveOrUpdatehmshospitalnetworksList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmshospitalnetwork', body);
    }
  }

  gethmshospitalnetworksList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmshospitalnetwork').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmshospitalnetwork' + '/param/' + key).toPromise();
    }
  }

  gethmshospitalnetworksByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmshospitalnetwork' + '/' + id).toPromise();
    }
  }

  deletehmshospitalnetwork(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmshospitalnetwork' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.hmsdoctornetworks = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmshospitalnetwork')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmshospitalnetworkResponse> {
    return this.http.get<IhmshospitalnetworkResponse>(AppConstants.ntirehospitalURL + '/hmshospitalnetwork')
      .pipe(
        tap((response: IhmshospitalnetworkResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmshospitalnetwork => new hmshospitalnetwork(hmshospitalnetwork.hospitalid, hmshospitalnetwork.hospitalname, hmshospitalnetwork.specialization, hmshospitalnetwork.address1, hmshospitalnetwork.address2, hmshospitalnetwork.countryid, hmshospitalnetwork.countryiddesc, hmshospitalnetwork.stateid, hmshospitalnetwork.stateiddesc, hmshospitalnetwork.cityid, hmshospitalnetwork.cityiddesc, hmshospitalnetwork.location, hmshospitalnetwork.pincode, hmshospitalnetwork.contactno1, hmshospitalnetwork.contactno2, hmshospitalnetwork.email, hmshospitalnetwork.contactperson, hmshospitalnetwork.cpmobile, hmshospitalnetwork.cpemail, hmshospitalnetwork.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmshospitalnetwork => hmshospitalnetwork.hospitalname.includes(filter.name))

          return response;
        })
      );
  }



}

