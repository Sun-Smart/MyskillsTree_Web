import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umssectionmaster } from '../model/umssectionmaster.model';
import { umssectionstudent } from '../model/umssectionstudent.model';
import { environment } from '../../environments/environment';
import { IumssectionmasterResponse } from '../model/umssectionmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umssectionmasterService {
  formData: umssectionmaster;
  readonly rootURL = AppConstants.ntirelearnURL;
  umssectionstudents: umssectionstudent[] = [];
  Insertumssectionstudents: umssectionstudent[] = [];
  list: umssectionmaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumssectionmasters() {
    {
      var body = {
        ...this.formData,
        umssectionstudents: this.Insertumssectionstudents.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umssectionmaster', body);
    }
  }

  saveOrUpdateumssectionmastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umssectionmaster', body);
    }
  }

  getumssectionmastersList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssectionmaster').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssectionmaster' + '/param/' + key).toPromise();
    }
  }

  getumssectionmastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssectionmaster' + '/' + id).toPromise();
    }
  }

  deleteumssectionmaster(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umssectionmaster' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umssectionstudents = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umssectionmaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumssectionmasterResponse> {
    return this.http.get<IumssectionmasterResponse>(AppConstants.ntirelearnURL + '/umssectionmaster')
      .pipe(
        tap((response: IumssectionmasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umssectionmaster => new umssectionmaster(umssectionmaster.sectionid, umssectionmaster.sectionname, umssectionmaster.maxstrength, umssectionmaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umssectionmaster => umssectionmaster.sectionname.includes(filter.name))

          return response;
        })
      );
  }



}

