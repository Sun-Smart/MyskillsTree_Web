import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsdoctor } from '../model/hmsdoctor.model';
import { environment } from '../../environments/environment';
import { IhmsdoctorResponse } from '../model/hmsdoctor.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsdoctorService {
  formData: hmsdoctor;
  readonly rootURL = AppConstants.baseURL;
  list: hmsdoctor[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsdoctors() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsdoctor', body);
    }
  }

  saveOrUpdatehmsdoctorsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsdoctor', body);
    }
  }

  gethmsdoctorsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsdoctor').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsdoctor' + '/param/' + key).toPromise();
    }
  }

  gethmsdoctorsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsdoctor' + '/' + id).toPromise();
    }
  }

  deletehmsdoctor(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsdoctor' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsdoctor')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsdoctorResponse> {
    return this.http.get<IhmsdoctorResponse>(AppConstants.ntirehospitalURL + '/hmsdoctor')
      .pipe(
        tap((response: IhmsdoctorResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsdoctor => new hmsdoctor(hmsdoctor.doctorid, hmsdoctor.doctorname, hmsdoctor.imageurl, hmsdoctor.oncall, hmsdoctor.designation, hmsdoctor.designationdesc, hmsdoctor.specialization, hmsdoctor.specializationdesc, hmsdoctor.contactno, hmsdoctor.contactnoh, hmsdoctor.email, hmsdoctor.customfield, hmsdoctor.attachment, hmsdoctor.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsdoctor => hmsdoctor.doctorname.includes(filter.name))

          return response;
        })
      );
  }



}

