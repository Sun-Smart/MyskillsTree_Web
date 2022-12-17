import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsquestioncategory } from '../model/umsquestioncategory.model';
import { environment } from '../../environments/environment';
import { IumsquestioncategoryResponse } from '../model/umsquestioncategory.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsquestioncategoryService {
  formData: umsquestioncategory;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsquestioncategory[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsquestioncategories() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsquestioncategory', body);
    }
  }

  saveOrUpdateumsquestioncategoriesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsquestioncategory', body);
    }
  }

  getumsquestioncategoriesList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsquestioncategory').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsquestioncategory' + '/param/' + key).toPromise();
    }
  }

  getumsquestioncategoriesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsquestioncategory' + '/' + id).toPromise();
    }
  }

  deleteumsquestioncategory(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsquestioncategory' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsquestioncategory')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsquestioncategoryResponse> {
    return this.http.get<IumsquestioncategoryResponse>(AppConstants.ntirelearnURL + '/umsquestioncategory')
      .pipe(
        tap((response: IumsquestioncategoryResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsquestioncategory => new umsquestioncategory(umsquestioncategory.categoryid, umsquestioncategory.categoryname, umsquestioncategory.maxquestions, umsquestioncategory.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsquestioncategory => umsquestioncategory.categoryname.includes(filter.name))

          return response;
        })
      );
  }



}

