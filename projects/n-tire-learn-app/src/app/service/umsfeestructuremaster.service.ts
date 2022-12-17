import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsfeestructuremaster } from '../model/umsfeestructuremaster.model';
import { umsfeestructuredetail } from '../model/umsfeestructuredetail.model';
import { environment } from '../../environments/environment';
import { IumsfeestructuremasterResponse } from '../model/umsfeestructuremaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsfeestructuremasterService {
  formData: umsfeestructuremaster;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsfeestructuredetails: umsfeestructuredetail[] = [];
  list: umsfeestructuremaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsfeestructuremasters() {
    {
      var body = {
        ...this.formData,
        umsfeestructuredetails: this.umsfeestructuredetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsfeestructuremaster', body);
    }
  }

  saveOrUpdateumsfeestructuremastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsfeestructuremaster', body);
    }
  }

  getumsfeestructuremastersList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeestructuremaster').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeestructuremaster' + '/param/' + key).toPromise();
    }
  }

  getumsfeestructuremastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeestructuremaster' + '/' + id).toPromise();
    }
  }

  deleteumsfeestructuremaster(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsfeestructuremaster' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsfeestructuredetails = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsfeestructuremaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsfeestructuremasterResponse> {
    return this.http.get<IumsfeestructuremasterResponse>(AppConstants.ntirelearnURL + '/umsfeestructuremaster')
      .pipe(
        tap((response: IumsfeestructuremasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsfeestructuremaster => new umsfeestructuremaster(umsfeestructuremaster.feeid, umsfeestructuremaster.description, umsfeestructuremaster.courseid, umsfeestructuremaster.courseiddesc, umsfeestructuremaster.semesterid, umsfeestructuremaster.semesteriddesc, umsfeestructuremaster.totalfee, umsfeestructuremaster.startdate, umsfeestructuremaster.enddate, umsfeestructuremaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsfeestructuremaster => umsfeestructuremaster.Description.includes(filter.name))

          return response;
        })
      );
  }



}

