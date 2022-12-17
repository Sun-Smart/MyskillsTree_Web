import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmstreatment } from '../model/hmstreatment.model';
import { environment } from '../../environments/environment';
import { IhmstreatmentResponse } from '../model/hmstreatment.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmstreatmentService {
  formData: hmstreatment;
  readonly rootURL = AppConstants.baseURL;
  list: hmstreatment[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmstreatments() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmstreatment', body);
    }
  }

  saveOrUpdatehmstreatmentsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmstreatment', body);
    }
  }

  gethmstreatmentsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstreatment').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstreatment' + '/param/' + key).toPromise();
    }
  }

  gethmstreatmentsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstreatment' + '/' + id).toPromise();
    }
  }

  deletehmstreatment(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmstreatment' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmstreatment')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmstreatmentResponse> {
    return this.http.get<IhmstreatmentResponse>(AppConstants.ntirehospitalURL + '/hmstreatment')
      .pipe(
        tap((response: IhmstreatmentResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmstreatment => new hmstreatment(hmstreatment.treatmentid, hmstreatment.treatmentname, hmstreatment.visittype, hmstreatment.visittypedesc, hmstreatment.wardroundid, hmstreatment.wardroundiddesc, hmstreatment.visitid, hmstreatment.patientid, hmstreatment.treatmentcategory, hmstreatment.treatmentcategorydesc, hmstreatment.treatmenttype, hmstreatment.treatmenttypedesc, hmstreatment.medicine, hmstreatment.externalmedicine, hmstreatment.dosage, hmstreatment.numberofdays, hmstreatment.morning, hmstreatment.afternoon, hmstreatment.night, hmstreatment.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmstreatment => hmstreatment.treatmentname.includes(filter.name))

          return response;
        })
      );
  }



}

