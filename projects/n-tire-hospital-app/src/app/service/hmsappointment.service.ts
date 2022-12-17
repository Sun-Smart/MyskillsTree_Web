import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsappointment } from '../model/hmsappointment.model';
import { environment } from '../../environments/environment';
import { IhmsappointmentResponse } from '../model/hmsappointment.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsappointmentService {
  formData: hmsappointment;
  readonly rootURL = AppConstants.baseURL;
  list: hmsappointment[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsappointments() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsappointment', body);
    }
  }

  saveOrUpdatehmsappointmentsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsappointment', body);
    }
  }

  gethmsappointmentsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsappointment').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsappointment' + '/param/' + key).toPromise();
    }
  }

  gethmsappointmentsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsappointment' + '/' + id).toPromise();
    }
  }

  deletehmsappointment(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsappointment' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsappointment')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsappointmentResponse> {
    return this.http.get<IhmsappointmentResponse>(AppConstants.ntirehospitalURL + '/hmsappointment')
      .pipe(
        tap((response: IhmsappointmentResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsappointment => new hmsappointment(hmsappointment.appointmentid, hmsappointment.patientid, hmsappointment.doctorid, hmsappointment.doctoriddesc, hmsappointment.appointmentdate, hmsappointment.appointmenttime, hmsappointment.appointmenttype, hmsappointment.appointmenttypedesc, hmsappointment.reason, hmsappointment.tokenno, hmsappointment.customfield, hmsappointment.attachment, hmsappointment.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsappointment => hmsappointment.reason.includes(filter.name))

          return response;
        })
      );
  }



}

