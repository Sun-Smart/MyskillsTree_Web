import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsvaccinationmaster } from '../model/hmsvaccinationmaster.model';
import { environment } from '../../environments/environment';
import { IhmsvaccinationmasterResponse } from '../model/hmsvaccinationmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsvaccinationmasterService {
  formData: hmsvaccinationmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hmsvaccinationmaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsvaccinationmasters() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsvaccinationmaster', body);
    }
  }

  saveOrUpdatehmsvaccinationmastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsvaccinationmaster', body);
    }
  }

  gethmsvaccinationmastersList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsvaccinationmaster').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsvaccinationmaster' + '/param/' + key).toPromise();
    }
  }

  gethmsvaccinationmastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsvaccinationmaster' + '/' + id).toPromise();
    }
  }

  deletehmsvaccinationmaster(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsvaccinationmaster' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsvaccinationmaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsvaccinationmasterResponse> {
    return this.http.get<IhmsvaccinationmasterResponse>(AppConstants.ntirehospitalURL + '/hmsvaccinationmaster')
      .pipe(
        tap((response: IhmsvaccinationmasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsvaccinationmaster => new hmsvaccinationmaster(hmsvaccinationmaster.vaccinationid, hmsvaccinationmaster.vaccinationname, hmsvaccinationmaster.frequency, hmsvaccinationmaster.frequencyunit, hmsvaccinationmaster.frequencyunitdesc, hmsvaccinationmaster.deviationpercentage, hmsvaccinationmaster.priority, hmsvaccinationmaster.prioritydesc, hmsvaccinationmaster.remindertype, hmsvaccinationmaster.remindertypedesc, hmsvaccinationmaster.templateid, hmsvaccinationmaster.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsvaccinationmaster => hmsvaccinationmaster.vaccinationname.includes(filter.name))

          return response;
        })
      );
  }



}

