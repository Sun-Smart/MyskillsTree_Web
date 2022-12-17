import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { flminspection } from './../../../model/flminspection.model';
import { NgForm } from '@angular/forms';
import { flmvehicleService } from './../../../service/flmvehicle.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-flminspections',
    templateUrl: './flminspection.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class flminspectionComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    flminspectionForm: FormGroup;
    interiorcleanlinessList: boconfigvalue[]=[];
    engineList: boconfigvalue[]=[];
    oillifeList: boconfigvalue[]=[];
    fuellevelList: boconfigvalue[]=[];
    transmissionList: boconfigvalue[]=[];
    clutchList: boconfigvalue[]=[];
    steeringmechanismList: boconfigvalue[]=[];
    hornList: boconfigvalue[]=[];
    windshieldList: boconfigvalue[]=[];
    wipersList: boconfigvalue[]=[];
    washersList: boconfigvalue[]=[];
    rearvisionmirrorsList: boconfigvalue[]=[];
    lightingList: boconfigvalue[]=[];
    reflectorList: boconfigvalue[]=[];
    parkingbrakeList: boconfigvalue[]=[];
    servicebrakeList: boconfigvalue[]=[];
    airlinesList: boconfigvalue[]=[];
    couplingdeviceList: boconfigvalue[]=[];
    tyresList: boconfigvalue[]=[];
    wheelsList: boconfigvalue[]=[];
    rimsList: boconfigvalue[]=[];
    emergencyequipmentList: boconfigvalue[]=[];
    vehicleconditionList: boconfigvalue[]=[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private flmvehicleservice: flmvehicleService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.dialogRef.close(),
                preventDefault: true
            },
            {
                key: 'cmd s',
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd c',
                command: () => this.dialogRef.close(null),
                preventDefault: true
            }
        ]);
        this.flminspectionForm = this.fb.group({
            inspectionid: [null],
            vehicleid: [null],
            description: [null],
            odometerreading: [null],
            odometerreadingremarks: [null],
            interiorcleanliness: [null],
            interiorcleanlinessdesc: [null],
            interiorcleanlinessremarks: [null],
            engine: [null],
            enginedesc: [null],
            engineremarks: [null],
            oillife: [null],
            oillifedesc: [null],
            oilliferemarks: [null],
            fuellevel: [null],
            fuelleveldesc: [null],
            fuellevelremarks: [null],
            transmission: [null],
            transmissiondesc: [null],
            transmissionremarks: [null],
            clutch: [null],
            clutchdesc: [null],
            clutchremarks: [null],
            steeringmechanism: [null],
            steeringmechanismdesc: [null],
            steeringmechanismremarks: [null],
            horn: [null],
            horndesc: [null],
            hornremarks: [null],
            windshield: [null],
            windshielddesc: [null],
            windshieldremarks: [null],
            wipers: [null],
            wipersdesc: [null],
            wipersremarks: [null],
            washers: [null],
            washersdesc: [null],
            washersremarks: [null],
            rearvisionmirrors: [null],
            rearvisionmirrorsdesc: [null],
            rearvisionmirrorsremarks: [null],
            lighting: [null],
            lightingdesc: [null],
            lightingremarks: [null],
            reflector: [null],
            reflectordesc: [null],
            reflectorremarks: [null],
            parkingbrake: [null],
            parkingbrakedesc: [null],
            parkingbrakeremarks: [null],
            servicebrake: [null],
            servicebrakedesc: [null],
            servicebrakeremarks: [null],
            airlines: [null],
            airlinesdesc: [null],
            airlinesremarks: [null],
            couplingdevice: [null],
            couplingdevicedesc: [null],
            couplingdeviceremarks: [null],
            tyres: [null],
            tyresdesc: [null],
            tyresremarks: [null],
            wheels: [null],
            wheelsdesc: [null],
            wheelsremarks: [null],
            rims: [null],
            rimsdesc: [null],
            rimsremarks: [null],
            emergencyequipment: [null],
            emergencyequipmentdesc: [null],
            emergencyequipmentremarks: [null],
            vehiclecondition: [null],
            vehicleconditiondesc: [null],
            remarks: [null],
            drivernotes: [null],
            driversignature: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.flminspectionForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.inspectionid != null && this.data.inspectionid != undefined) ppk = this.data.inspectionid;


        if (ppk == null) {
            this.flminspectionForm.patchValue({
            });
        }
        else {
            let obj = this.flmvehicleservice.flminspections.filter(x => x.inspectionid == ppk)[0];
            this.flminspectionForm.patchValue({
                inspectionid: obj.inspectionid,
                vehicleid: obj.vehicleid,
                description: obj.description,
                odometerreading: obj.odometerreading,
                odometerreadingremarks: obj.odometerreadingremarks,
                interiorcleanliness: obj.interiorcleanliness,
                interiorcleanlinessdesc: obj.interiorcleanlinessdesc,
                interiorcleanlinessremarks: obj.interiorcleanlinessremarks,
                engine: obj.engine,
                enginedesc: obj.enginedesc,
                engineremarks: obj.engineremarks,
                oillife: obj.oillife,
                oillifedesc: obj.oillifedesc,
                oilliferemarks: obj.oilliferemarks,
                fuellevel: obj.fuellevel,
                fuelleveldesc: obj.fuelleveldesc,
                fuellevelremarks: obj.fuellevelremarks,
                transmission: obj.transmission,
                transmissiondesc: obj.transmissiondesc,
                transmissionremarks: obj.transmissionremarks,
                clutch: obj.clutch,
                clutchdesc: obj.clutchdesc,
                clutchremarks: obj.clutchremarks,
                steeringmechanism: obj.steeringmechanism,
                steeringmechanismdesc: obj.steeringmechanismdesc,
                steeringmechanismremarks: obj.steeringmechanismremarks,
                horn: obj.horn,
                horndesc: obj.horndesc,
                hornremarks: obj.hornremarks,
                windshield: obj.windshield,
                windshielddesc: obj.windshielddesc,
                windshieldremarks: obj.windshieldremarks,
                wipers: obj.wipers,
                wipersdesc: obj.wipersdesc,
                wipersremarks: obj.wipersremarks,
                washers: obj.washers,
                washersdesc: obj.washersdesc,
                washersremarks: obj.washersremarks,
                rearvisionmirrors: obj.rearvisionmirrors,
                rearvisionmirrorsdesc: obj.rearvisionmirrorsdesc,
                rearvisionmirrorsremarks: obj.rearvisionmirrorsremarks,
                lighting: obj.lighting,
                lightingdesc: obj.lightingdesc,
                lightingremarks: obj.lightingremarks,
                reflector: obj.reflector,
                reflectordesc: obj.reflectordesc,
                reflectorremarks: obj.reflectorremarks,
                parkingbrake: obj.parkingbrake,
                parkingbrakedesc: obj.parkingbrakedesc,
                parkingbrakeremarks: obj.parkingbrakeremarks,
                servicebrake: obj.servicebrake,
                servicebrakedesc: obj.servicebrakedesc,
                servicebrakeremarks: obj.servicebrakeremarks,
                airlines: obj.airlines,
                airlinesdesc: obj.airlinesdesc,
                airlinesremarks: obj.airlinesremarks,
                couplingdevice: obj.couplingdevice,
                couplingdevicedesc: obj.couplingdevicedesc,
                couplingdeviceremarks: obj.couplingdeviceremarks,
                tyres: obj.tyres,
                tyresdesc: obj.tyresdesc,
                tyresremarks: obj.tyresremarks,
                wheels: obj.wheels,
                wheelsdesc: obj.wheelsdesc,
                wheelsremarks: obj.wheelsremarks,
                rims: obj.rims,
                rimsdesc: obj.rimsdesc,
                rimsremarks: obj.rimsremarks,
                emergencyequipment: obj.emergencyequipment,
                emergencyequipmentdesc: obj.emergencyequipmentdesc,
                emergencyequipmentremarks: obj.emergencyequipmentremarks,
                vehiclecondition: obj.vehiclecondition,
                vehicleconditiondesc: obj.vehicleconditiondesc,
                remarks: obj.remarks,
                drivernotes: obj.drivernotes,
                driversignature: obj.driversignature,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.flminspectionForm.get('attachment').value != "" && this.flminspectionForm.get('attachment').value != null) this.attachmentfieldjson = JSON.parse(this.flminspectionForm.get('attachment').value);
        }
        this.configservice.getList("rating").then((res:any) => this.interiorcleanlinessList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.engineList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.oillifeList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.fuellevelList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.transmissionList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.clutchList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.steeringmechanismList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.hornList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.windshieldList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.wipersList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.washersList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.rearvisionmirrorsList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.lightingList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.reflectorList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.parkingbrakeList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.servicebrakeList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.airlinesList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.couplingdeviceList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.tyresList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.wheelsList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.rimsList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.emergencyequipmentList = res as boconfigvalue[]);
        this.configservice.getList("rating").then((res:any) => this.vehicleconditionList = res as boconfigvalue[]);
    }


    attachmentuploader(e:any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.flminspectionForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.flminspectionForm.value;
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    onClose() {
        this.dialogRef.close();
    }

    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    interiorcleanlinessonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ interiorcleanlinessdesc: evt.options[evt.options.selectedIndex].text });
    }
    engineonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ enginedesc: evt.options[evt.options.selectedIndex].text });
    }
    oillifeonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ oillifedesc: evt.options[evt.options.selectedIndex].text });
    }
    fuellevelonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ fuelleveldesc: evt.options[evt.options.selectedIndex].text });
    }
    transmissiononChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ transmissiondesc: evt.options[evt.options.selectedIndex].text });
    }
    clutchonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ clutchdesc: evt.options[evt.options.selectedIndex].text });
    }
    steeringmechanismonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ steeringmechanismdesc: evt.options[evt.options.selectedIndex].text });
    }
    hornonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ horndesc: evt.options[evt.options.selectedIndex].text });
    }
    windshieldonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ windshielddesc: evt.options[evt.options.selectedIndex].text });
    }
    wipersonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ wipersdesc: evt.options[evt.options.selectedIndex].text });
    }
    washersonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ washersdesc: evt.options[evt.options.selectedIndex].text });
    }
    rearvisionmirrorsonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ rearvisionmirrorsdesc: evt.options[evt.options.selectedIndex].text });
    }
    lightingonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ lightingdesc: evt.options[evt.options.selectedIndex].text });
    }
    reflectoronChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ reflectordesc: evt.options[evt.options.selectedIndex].text });
    }
    parkingbrakeonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ parkingbrakedesc: evt.options[evt.options.selectedIndex].text });
    }
    servicebrakeonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ servicebrakedesc: evt.options[evt.options.selectedIndex].text });
    }
    airlinesonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ airlinesdesc: evt.options[evt.options.selectedIndex].text });
    }
    couplingdeviceonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ couplingdevicedesc: evt.options[evt.options.selectedIndex].text });
    }
    tyresonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ tyresdesc: evt.options[evt.options.selectedIndex].text });
    }
    wheelsonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ wheelsdesc: evt.options[evt.options.selectedIndex].text });
    }
    rimsonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ rimsdesc: evt.options[evt.options.selectedIndex].text });
    }
    emergencyequipmentonChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ emergencyequipmentdesc: evt.options[evt.options.selectedIndex].text });
    }
    vehicleconditiononChange(evt:any) {
        let e = evt.value;
        this.flminspectionForm.patchValue({ vehicleconditiondesc: evt.options[evt.options.selectedIndex].text });
    }

}


