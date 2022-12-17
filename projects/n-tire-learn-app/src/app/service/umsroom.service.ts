import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsroom } from '../model/umsroom.model';
import { environment } from '../../environments/environment';
import { IumsroomResponse } from '../model/umsroom.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsroomService {
  formData: umsroom;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsroom[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsrooms() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsroom', body);
    }
  }

  saveOrUpdateumsroomsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsroom', body);
    }
  }

  getumsroomsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsroom').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsroom' + '/param/' + key).toPromise();
    }
  }

  getumsroomsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsroom' + '/' + id).toPromise();
    }
  }

  deleteumsroom(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsroom' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsroom')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsroomResponse> {
    return this.http.get<IumsroomResponse>(AppConstants.ntirelearnURL + '/umsroom')
      .pipe(
        tap((response: IumsroomResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsroom => new umsroom(umsroom.roomid, umsroom.code, umsroom.description, umsroom.maxstudents, umsroom.customfield, umsroom.attachment, umsroom.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsroom => umsroom.code.includes(filter.name))

          return response;
        })
      );
  }



}

