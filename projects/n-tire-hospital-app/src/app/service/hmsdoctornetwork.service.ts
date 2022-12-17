import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsdoctornetwork } from '../model/hmsdoctornetwork.model';
import { environment } from '../../environments/environment';
import { IhmsdoctornetworkResponse } from '../model/hmsdoctornetwork.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsdoctornetworkService {
  formData: hmsdoctornetwork;
  readonly rootURL = AppConstants.baseURL;
  list: hmsdoctornetwork[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsdoctornetworks() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsdoctornetwork', body);
    }
  }

  saveOrUpdatehmsdoctornetworksList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsdoctornetwork', body);
    }
  }

  gethmsdoctornetworksList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsdoctornetwork').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsdoctornetwork' + '/param/' + key).toPromise();
    }
  }

  gethmsdoctornetworksByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsdoctornetwork' + '/' + id).toPromise();
    }
  }

  deletehmsdoctornetwork(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsdoctornetwork' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsdoctornetwork')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsdoctornetworkResponse> {
    return this.http.get<IhmsdoctornetworkResponse>(AppConstants.ntirehospitalURL + '/hmsdoctornetwork')
      .pipe(
        tap((response: IhmsdoctornetworkResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsdoctornetwork => new hmsdoctornetwork(hmsdoctornetwork.hospitalid, hmsdoctornetwork.doctorid, hmsdoctornetwork.doctorname, hmsdoctornetwork.designation, hmsdoctornetwork.designationdesc, hmsdoctornetwork.specialization, hmsdoctornetwork.specializationdesc, hmsdoctornetwork.contactno, hmsdoctornetwork.email, hmsdoctornetwork.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsdoctornetwork => hmsdoctornetwork.doctorname.includes(filter.name))

          return response;
        })
      );
  }



}

