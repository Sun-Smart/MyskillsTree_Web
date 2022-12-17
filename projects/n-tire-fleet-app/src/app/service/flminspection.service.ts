import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flminspection } from '../model/flminspection.model';
import { environment } from '../../environments/environment';
import { IflminspectionResponse } from '../model/flminspection.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flminspectionService {
  formData: flminspection;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flminspection[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflminspections() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flminspection', body);
    }
  }

  saveOrUpdateflminspectionsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flminspection', body);
    }
  }

  getflminspectionsList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flminspection').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flminspection' + '/param/' + key).toPromise();
    }
  }

  getflminspectionsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flminspection' + '/' + id).toPromise();
    }
  }

  deleteflminspection(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flminspection' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flminspection')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflminspectionResponse> {
    return this.http.get<IflminspectionResponse>(AppConstants.ntirefleetURL + '/flminspection')
      .pipe(
        tap((response: IflminspectionResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flminspection => new flminspection(flminspection.inspectionid, flminspection.vehicleid, flminspection.description, flminspection.odometerreading, flminspection.odometerreadingremarks, flminspection.interiorcleanliness, flminspection.interiorcleanlinessdesc, flminspection.interiorcleanlinessremarks, flminspection.engine, flminspection.enginedesc, flminspection.engineremarks, flminspection.oillife, flminspection.oillifedesc, flminspection.oilliferemarks, flminspection.fuellevel, flminspection.fuelleveldesc, flminspection.fuellevelremarks, flminspection.transmission, flminspection.transmissiondesc, flminspection.transmissionremarks, flminspection.clutch, flminspection.clutchdesc, flminspection.clutchremarks, flminspection.steeringmechanism, flminspection.steeringmechanismdesc, flminspection.steeringmechanismremarks, flminspection.horn, flminspection.horndesc, flminspection.hornremarks, flminspection.windshield, flminspection.windshielddesc, flminspection.windshieldremarks, flminspection.wipers, flminspection.wipersdesc, flminspection.wipersremarks, flminspection.washers, flminspection.washersdesc, flminspection.washersremarks, flminspection.rearvisionmirrors, flminspection.rearvisionmirrorsdesc, flminspection.rearvisionmirrorsremarks, flminspection.lighting, flminspection.lightingdesc, flminspection.lightingremarks, flminspection.reflector, flminspection.reflectordesc, flminspection.reflectorremarks, flminspection.parkingbrake, flminspection.parkingbrakedesc, flminspection.parkingbrakeremarks, flminspection.servicebrake, flminspection.servicebrakedesc, flminspection.servicebrakeremarks, flminspection.airlines, flminspection.airlinesdesc, flminspection.airlinesremarks, flminspection.couplingdevice, flminspection.couplingdevicedesc, flminspection.couplingdeviceremarks, flminspection.tyres, flminspection.tyresdesc, flminspection.tyresremarks, flminspection.wheels, flminspection.wheelsdesc, flminspection.wheelsremarks, flminspection.rims, flminspection.rimsdesc, flminspection.rimsremarks, flminspection.emergencyequipment, flminspection.emergencyequipmentdesc, flminspection.emergencyequipmentremarks, flminspection.vehiclecondition, flminspection.vehicleconditiondesc, flminspection.remarks, flminspection.drivernotes, flminspection.driversignature, flminspection.attachment, flminspection.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flminspection => flminspection.description.includes(filter.name))

          return response;
        })
      );
  }



}

