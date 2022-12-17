import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmvehicle } from '../model/flmvehicle.model';
import { flmrelatedvehicle } from '../model/flmrelatedvehicle.model';
import { flmassignment } from '../model/flmassignment.model';
import { flmvehicleissue } from '../model/flmvehicleissue.model';
import { flmvehicleusage } from '../model/flmvehicleusage.model';
import { flmaccident } from '../model/flmaccident.model';
import { flmvehiclepermit } from '../model/flmvehiclepermit.model';
import { flmexpense } from '../model/flmexpense.model';
import { flminsurance } from '../model/flminsurance.model';
import { flmservicerequest } from '../model/flmservicerequest.model';
import { flminspection } from '../model/flminspection.model';
import { environment } from '../../environments/environment';
import { IflmvehicleResponse } from '../model/flmvehicle.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmvehicleService {
  formData: flmvehicle;
  readonly rootURL = AppConstants.ntirefleetURL;
  flmrelatedvehicles: flmrelatedvehicle[] = [];
  Insertflmrelatedvehicles: flmrelatedvehicle[] = [];
  flmassignments: flmassignment[] = [];
  flmvehicleissues: flmvehicleissue[] = [];
  flmvehicleusages: flmvehicleusage[] = [];
  Insertflmvehicleusages: flmvehicleusage[] = [];
  flmaccidents: flmaccident[] = [];
  flmvehiclepermits: flmvehiclepermit[] = [];
  flmexpenses: flmexpense[] = [];
  flminsurances: flminsurance[] = [];
  flmservicerequests: flmservicerequest[] = [];
  flminspections: flminspection[] = [];
  list: flmvehicle[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmvehicles() {
    {
      var body = {
        ...this.formData,
        flmrelatedvehicles: this.Insertflmrelatedvehicles.filter(function (el) { return Object.keys(el).length != 0; }),
        flmassignments: this.flmassignments.filter(function (el) { return Object.keys(el).length != 0; }),
        flmvehicleissues: this.flmvehicleissues.filter(function (el) { return Object.keys(el).length != 0; }),
        flmvehicleusages: this.Insertflmvehicleusages.filter(function (el) { return Object.keys(el).length != 0; }),
        flmaccidents: this.flmaccidents.filter(function (el) { return Object.keys(el).length != 0; }),
        flmvehiclepermits: this.flmvehiclepermits.filter(function (el) { return Object.keys(el).length != 0; }),
        flmexpenses: this.flmexpenses.filter(function (el) { return Object.keys(el).length != 0; }),
        flminsurances: this.flminsurances.filter(function (el) { return Object.keys(el).length != 0; }),
        flmservicerequests: this.flmservicerequests.filter(function (el) { return Object.keys(el).length != 0; }),
        flminspections: this.flminspections.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmvehicle', body);
    }
  }

  saveOrUpdateflmvehiclesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmvehicle', body);
    }
  }

  getflmvehiclesList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicle').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicle' + '/param/' + key).toPromise();
    }
  }

  getflmvehiclesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicle' + '/' + id).toPromise();
    }
  }

  deleteflmvehicle(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmvehicle' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.flmrelatedvehicles = [];
    this.flmassignments = [];
    this.flmvehicleissues = [];
    this.flmvehicleusages = [];
    this.flmaccidents = [];
    this.flmvehiclepermits = [];
    this.flmexpenses = [];
    this.flminsurances = [];
    this.flmservicerequests = [];
    this.flminspections = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmvehicle')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmvehicleResponse> {
    return this.http.get<IflmvehicleResponse>(AppConstants.ntirefleetURL + '/flmvehicle')
      .pipe(
        tap((response: IflmvehicleResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmvehicle => new flmvehicle(flmvehicle.vehicleid, flmvehicle.description, flmvehicle.groupid, flmvehicle.groupiddesc, flmvehicle.imageurl, flmvehicle.vehicletype, flmvehicle.vehicletypedesc, flmvehicle.make, flmvehicle.makedesc, flmvehicle.model, flmvehicle.modeldesc, flmvehicle.licenseplateno, flmvehicle.engineno, flmvehicle.chassisno, flmvehicle.color, flmvehicle.cost, flmvehicle.year, flmvehicle.specification, flmvehicle.maxpersons, flmvehicle.registrationdetails, flmvehicle.responsibilityid, flmvehicle.responsibilityiddesc, flmvehicle.ownership, flmvehicle.ownershipdesc, flmvehicle.width, flmvehicle.height, flmvehicle.length, flmvehicle.volume, flmvehicle.passengervolume, flmvehicle.cargovolume, flmvehicle.groundclearance, flmvehicle.bedlength, flmvehicle.curbweight, flmvehicle.vehicleweight, flmvehicle.towingcapacity, flmvehicle.maxpayload, flmvehicle.fuelnormal, flmvehicle.fuelcity, flmvehicle.fuelhighway, flmvehicle.enginesummary, flmvehicle.enginebrand, flmvehicle.aspiration, flmvehicle.blocktype, flmvehicle.bore, flmvehicle.camtype, flmvehicle.camtypedesc, flmvehicle.compression, flmvehicle.cylinders, flmvehicle.displacement, flmvehicle.fuelinduction, flmvehicle.fuelinductiondesc, flmvehicle.fuelquality, flmvehicle.maxhp, flmvehicle.maxtorque, flmvehicle.redlinerpm, flmvehicle.stroke, flmvehicle.valves, flmvehicle.transmission, flmvehicle.transmissionbrand, flmvehicle.transmissionbranddesc, flmvehicle.transmissiontype, flmvehicle.transmissiontypedesc, flmvehicle.transmissiongears, flmvehicle.drivetype, flmvehicle.drivetypedesc, flmvehicle.brakesystem, flmvehicle.brakesystemdesc, flmvehicle.fronttrackwidth, flmvehicle.reartrackwidth, flmvehicle.wheelbase, flmvehicle.frontwheeldiameter, flmvehicle.rearwheeldiameter, flmvehicle.rearaxle, flmvehicle.fronttyretype, flmvehicle.fronttirepsi, flmvehicle.reartyretype, flmvehicle.reartyrepsi, flmvehicle.fueltype, flmvehicle.fueltypedesc, flmvehicle.tank1capacity, flmvehicle.tank2capacity, flmvehicle.oilcapacity, flmvehicle.primarymetermeasurementtype, flmvehicle.primarymetermeasurementtypedesc, flmvehicle.pmcurrentreading, flmvehicle.pmaverageusageperday, flmvehicle.pmcalculateautomatically, flmvehicle.secondarymeter, flmvehicle.secondarymetermeasurementtype, flmvehicle.smcurrentreading, flmvehicle.smaverageusageperday, flmvehicle.smcalculateautomatically, flmvehicle.fuelunit, flmvehicle.fuelunitdesc, flmvehicle.status, "", "", "", "", "", "", "", "", "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmvehicle => flmvehicle.description.includes(filter.name))

          return response;
        })
      );
  }



}

