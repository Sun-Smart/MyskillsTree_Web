import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmusage } from '../model/flmusage.model';
import { environment } from '../../environments/environment';
import { IflmusageResponse } from '../model/flmusage.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmusageService {
  formData: flmusage;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmusage[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmusages() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmusage', body);
    }
  }

  saveOrUpdateflmusagesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmusage', body);
    }
  }

  getflmusagesList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmusage').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmusage' + '/param/' + key).toPromise();
    }
  }

  getflmusagesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmusage' + '/' + id).toPromise();
    }
  }

  deleteflmusage(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmusage' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmusage')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmusageResponse> {
    return this.http.get<IflmusageResponse>(AppConstants.ntirefleetURL + '/flmusage')
      .pipe(
        tap((response: IflmusageResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmusage => new flmusage(flmusage.usageid, flmusage.description, flmusage.notes, flmusage.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmusage => flmusage.description.includes(filter.name))

          return response;
        })
      );
  }



}

