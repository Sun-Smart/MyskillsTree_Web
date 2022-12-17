import { hmswardService } from './../../../service/hmsward.service';
import { hmsward } from './../../../model/hmsward.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { TranslateService } from "@ngx-translate/core";
import { bousermaster } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { hmswardround } from './../../../model/hmswardround.model';
import { hmsbed, IhmsbedResponse } from './../../../model/hmsbed.model';
import { hmsbedService } from './../../../service/hmsbed.service';
import { hmsdoctor, IhmsdoctorResponse } from './../../../model/hmsdoctor.model';
import { hmsdoctorService } from './../../../service/hmsdoctor.service';
import { hmspatient, IhmspatientResponse } from './../../../model/hmspatient.model';
import { hmspatientService } from './../../../service/hmspatient.service';
import { hmswardroundComponent } from './hmswardround.component';

import { hmsbedComponent } from './hmsbed.component';
import { hmswardincharge } from './../../../model/hmswardincharge.model';
import { hmswardinchargeComponent } from './hmswardincharge.component';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
  selector: 'app-hmsward',
  templateUrl: './hmsward.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class hmswardComponent implements OnInit {
  shortcuts: ShortcutInput[] = [];
  showsubmit: boolean = true;
  showGoWorkFlow: boolean = false;
  toolbarvisible: boolean = true;
  customfieldservicelist: any;
  @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  pmenuid: any;
  pcurrenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  data3: any = [];
  bfilterPopulatehmswards: boolean = false;
  datahmswardsresponsibilityid3: any = [];
  datahmswardroundsbedid3: any = [];
  datahmswardroundsnurseid3: any = [];
  datahmswardroundsdoctorid3: any = [];
  datahmswardroundspatientid3: any = [];
  bfilterPopulatehmswardrounds: boolean = false;
  datahmsbedsbedtype3: any = [];
  bfilterPopulatehmsbeds: boolean = false;
  datahmswardinchargesincharge3: any = [];
  bfilterPopulatehmswardincharges: boolean = false;
  @ViewChild('tblhmswardroundssource', { static: false }) tblhmswardroundssource: Ng2SmartTableComponent;
  @ViewChild('tblhmsbedssource', { static: false }) tblhmsbedssource: Ng2SmartTableComponent;
  @ViewChild('tblhmswardinchargessource', { static: false }) tblhmswardinchargessource: Ng2SmartTableComponent;
  hmswardForm: FormGroup;
  responsibilityidList: bousermaster[];
  responsibilityid_bousermastersForm: FormGroup;
  responsibilityid_bousermastersoptions: any;
  responsibilityid_bousermastersformatter: any;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  formid: any;
  customfieldjson: any;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
  @ViewChild('imageurluploader', { static: false }) imageurluploader: FileUpload;
  DeletedhmswardroundIDs: string = "";
  hmswardroundsID: string = "1";
  hmswardroundsselectedindex: any;
  DeletedhmsbedIDs: string = "";
  hmsbedsID: string = "2";
  hmsbedsselectedindex: any;
  DeletedhmswardinchargeIDs: string = "";
  hmswardinchargesID: string = "3";
  hmswardinchargesselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private hmswardservice: hmswardService,
    private hmsbedservice: hmsbedService,
    private bousermasterservice: bousermasterService,
    private hmsdoctorservice: hmsdoctorService,
    private hmspatientservice: hmspatientService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private customfieldservice: customfieldconfigurationService,
    private currentRoute: ActivatedRoute) {
    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.pmenuid = sharedService.menuid;
    this.pcurrenturl = sharedService.currenturl;
    this.keyboard.add([
      {
        key: 'cmd l',
        command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
        preventDefault: true
      },
      {
        key: 'cmd s',
        command: () => this.onSubmitData(false),
        preventDefault: true
      },
      {
        key: 'cmd f',
        command: () => this.resetForm(),
        preventDefault: true
      }
    ]);
    this.hmswardForm = this.fb.group({
      wardid: [null],
      wardname: [null],
      responsibilityid: [null],
      responsibilityiddesc: [null],
      beds: [null],
      imageurl: [null],
      notes: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.hmswardForm.controls; }

  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
  ToolBar(prop:any) {
    this.toolbarvisible = prop;
  }
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.hmswardForm.dirty && this.hmswardForm.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }
  async ngOnInit() {
    debugger;
    let hmsward = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.wardid != null) {
      hmsward = this.data.wardid;
    }
    else
      hmsward = this.currentRoute.snapshot.paramMap.get('id');
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = hmsward;
    //this.sharedService.alert(hmsward);
    if (hmsward == null) {
      this.SethmswardroundsTableConfig();
      setTimeout(() => {
        this.SethmswardroundsTableddConfig();
      });
      this.SethmsbedsTableConfig();
      setTimeout(() => {
        this.SethmsbedsTableddConfig();
      });
      this.SethmswardinchargesTableConfig();
      setTimeout(() => {
        this.SethmswardinchargesTableddConfig();
      });
      this.FillCustomField();
      this.resetForm();
    }
    else {
      this.PopulateScreen(hmsward);
    }
    this.bousermasterservice.getbousermastersList().then((res:any) => this.responsibilityidList = res as bousermaster[]);
    this.responsibilityid_bousermastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.responsibilityidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.responsibilityid_bousermastersformatter = (result: any) => result.username;
    this.hmswardForm.markAsUntouched();
    this.hmswardForm.markAsPristine();
  }
  onSelectedresponsibilityid(responsibilityidDetail: any) {
    if (responsibilityidDetail) {
      this.hmswardForm.patchValue({ responsibilityid: responsibilityidDetail.item.userid });
      this.hmswardForm.patchValue({ responsibilityiddesc: responsibilityidDetail.item.username });
      responsibilityidDetail.preventDefault();

    }
  }




  imageurlFileSelected(e:any) {
    //console.log(this.imageurluploader[0].file);
    this.hmswardForm.patchValue({ imageurl: e.files[0].name });
  }
  resetForm() {
    if (this.hmswardForm != null)
      this.hmswardForm.reset();
    setTimeout(() => {
      this.hmswardservice.hmswardrounds = [];
      this.hmswardroundsLoadTable();
      this.hmswardservice.hmsbeds = [];
      this.hmsbedsLoadTable();
      this.hmswardservice.hmswardincharges = [];
      this.hmswardinchargesLoadTable();
    });
    this.customfieldservice.reset(document);
    if (this.data != null) {
      for (let key in this.data) {

        let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
        if (this.hmswardForm.controls[key] != null) {
          this.hmswardForm.patchValue(json);
          this.hmswardForm.controls[key].disable({ onlySelf: true });
        }
      }
    }
  }

  onDelete() {
    let wardid = this.hmswardForm.get('wardid')!.value;
    if (wardid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.hmswardservice.deletehmsward(wardid).then((res:any) => {
          this.resetForm();
        }
        );
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.hmswardForm.patchValue({
      wardid: null
    });
    this.hmswardservice.formData.wardid = null;
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("hmswards", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
      this.customfieldservicelist = res;
      return res;
    });


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
  responsibilityidonChange(evt:any) {
    let e = evt!.value;
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
  PopulateScreen(hmsward: any) {
    this.hmswardservice.gethmswardsByID(parseInt(hmsward)).then((res:any) => {

      this.FillData(res);
    });
  }
  FillData(res: any) {
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.hmswardForm.patchValue({
      wardid: res.hmsward.wardid,
      wardname: res.hmsward.wardname,
      responsibilityid: res.hmsward.responsibilityid,
      responsibilityiddesc: res.hmsward.responsibilityiddesc,
      beds: res.hmsward.beds,
      imageurl: res.hmsward.imageurl,
      notes: res.hmsward.notes,
      customfield: res.hmsward.customfield,
      attachment: res.hmsward.attachment,
      status: res.hmsward.status,
      statusdesc: res.hmsward.statusdesc,
    });
    if (this.hmswardForm.get('customfield')!.value != null && this.hmswardForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.hmswardForm.get('customfield')!.value);
    this.FillCustomField();
    if (this.hmswardForm.get('attachment')!.value != null && this.hmswardForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.hmswardForm.get('attachment')!.value);
    this.hmswardservice.hmswardrounds = res.hmswardround;
    this.SethmswardroundsTableConfig();
    this.hmswardroundsLoadTable();
    setTimeout(() => {
      this.SethmswardroundsTableddConfig();
    });
    this.hmswardservice.hmsbeds = res.hmsbed;
    this.SethmsbedsTableConfig();
    this.hmsbedsLoadTable();
    setTimeout(() => {
      this.SethmsbedsTableddConfig();
    });
    this.hmswardservice.hmswardincharges = res.hmswardincharge;
    this.SethmswardinchargesTableConfig();
    this.hmswardinchargesLoadTable();
    setTimeout(() => {
      this.SethmswardinchargesTableddConfig();
    });
  }
  validate() {
    let ret = true;
    return ret;
  }
  onSubmitData(bclear:any) {
    debugger;
    this.isSubmitted = true;
    if (!this.hmswardForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.hmswardservice.formData = this.hmswardForm!.value;
    if (this.data != null) {
      for (let key in this.data) {
        if (this.hmswardForm.controls[key] != null) {
          this.hmswardservice.formData[key] = this.hmswardForm.controls[key]!.value;
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    this.hmswardservice.formData.customfield = JSON.stringify(customfields);
    this.hmswardservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
    this.hmswardservice.formData.DeletedhmswardroundIDs = this.DeletedhmswardroundIDs;
    this.hmswardservice.formData.DeletedhmsbedIDs = this.DeletedhmsbedIDs;
    this.hmswardservice.formData.DeletedhmswardinchargeIDs = this.DeletedhmswardinchargeIDs;
    console.log(this.hmswardservice.formData);
    this.hmswardservice.saveOrUpdatehmswards().subscribe(
      (res:any) => {
        this.imageurluploader.upload();
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.hmswardservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result!.value.hmsward);
          }
          else {
            this.FillData((res as any).result!.value);
          }
        }
        this.hmswardForm.markAsUntouched();
        this.hmswardForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }



  AddOrEditresponsibilityid(userid) {
    let ScreenType = '2';
    /*this.dialog.open(bousermasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bousermasterservice.getbousermastersList().then((res:any) => this.responsibilityidList = res as bousermaster[]);
    });*/
  }

  AddOrEdithmswardround(event, wardroundid, wardid) {
    this.dialog.open(hmswardroundComponent,
      {
        data: { wardroundid, wardid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (wardroundid == null) {
        this.hmswardroundssource.add(res);
        this.hmswardroundssource.refresh();
      }
      else {
        this.hmswardroundssource.update(event.data, res);
      }
    });
  }
  onDeletehmswardround(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmswardroundIDs += childID + ",";
    this.hmswardservice.hmswardrounds.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmsbed(event, bedid, wardid) {
    this.dialog.open(hmsbedComponent,
      {
        data: { bedid, wardid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (bedid == null) {
        this.hmsbedssource.add(res);
        this.hmsbedssource.refresh();
      }
      else {
        this.hmsbedssource.update(event.data, res);
      }
    });
  }
  onDeletehmsbed(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmsbedIDs += childID + ",";
    this.hmswardservice.hmsbeds.splice(i, 1);
    //this.updateGrandTotal();
  }
  AddOrEdithmswardincharge(event, wardinchargeid, wardid) {
    this.dialog.open(hmswardinchargeComponent,
      {
        data: { wardinchargeid, wardid, ScreenType: 2 }
      }
    ).onClose.subscribe((res:any) => {
      if (wardinchargeid == null) {
        this.hmswardinchargessource.add(res);
        this.hmswardinchargessource.refresh();
      }
      else {
        this.hmswardinchargessource.update(event.data, res);
      }
    });
  }
  onDeletehmswardincharge(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedhmswardinchargeIDs += childID + ",";
    this.hmswardservice.hmswardincharges.splice(i, 1);
    //this.updateGrandTotal();
  }
  //start of Grid Codes hmswardrounds
  hmswardroundssettings: any;
  hmswardroundssource: any;

  showhmswardroundsCheckbox() {
    debugger;
    if (this.tblhmswardroundssource.settings['selectMode'] == 'multi') this.tblhmswardroundssource.settings['selectMode'] = 'single';
    else
      this.tblhmswardroundssource.settings['selectMode'] = 'multi';
    this.tblhmswardroundssource.initGrid();
  }
  deletehmswardroundsAll() {
    this.tblhmswardroundssource.settings['selectMode'] = 'single';
  }
  showhmswardroundsFilter() {
    setTimeout(() => {
      this.SethmswardroundsTableddConfig();
    });
    if (this.tblhmswardroundssource.settings != null) this.tblhmswardroundssource.settings['hideSubHeader'] = !this.tblhmswardroundssource.settings['hideSubHeader'];
    this.tblhmswardroundssource.initGrid();
  }
  showhmswardroundsInActive() {
  }
  enablehmswardroundsInActive() {
  }
  async SethmswardroundsTableddConfig() {
    if (!this.bfilterPopulatehmswardrounds) {

      this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => {
        var datadoctorid2 = res as any;
        for (let i = 0; i < datadoctorid2.length; i++) {
          var obj = { value: datadoctorid2[i].doctorid, title: datadoctorid2[i].doctorname };
          this.datahmswardroundsdoctorid3.push(obj);
        }
        var clone = this.clone(this.tblhmswardroundssource.settings);
        clone.columns['doctorid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardroundsdoctorid3)), }, };
        clone.columns['doctorid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardroundsdoctorid3)), }, };
        this.tblhmswardroundssource.settings = clone;
        this.tblhmswardroundssource.initGrid();
      });

      this.hmspatientservice.gethmspatientsList().then((res:any) => {
        var datapatientid2 = res as any;
        for (let i = 0; i < datapatientid2.length; i++) {
          var obj = { value: datapatientid2[i].patientid, title: datapatientid2[i].lastname };
          this.datahmswardroundspatientid3.push(obj);
        }
        var clone = this.clone(this.tblhmswardroundssource.settings);
        clone.columns['patientid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardroundspatientid3)), }, };
        clone.columns['patientid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardroundspatientid3)), }, };
        this.tblhmswardroundssource.settings = clone;
        this.tblhmswardroundssource.initGrid();
      });

      this.hmsbedservice.gethmsbedsList().then((res:any) => {
        var databedid2 = res as any;
        for (let i = 0; i < databedid2.length; i++) {
          var obj = { value: databedid2[i].bedid, title: databedid2[i].bedname };
          this.datahmswardroundsbedid3.push(obj);
        }
        var clone = this.clone(this.tblhmswardroundssource.settings);
        clone.columns['bedid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardroundsbedid3)), }, };
        clone.columns['bedid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardroundsbedid3)), }, };
        this.tblhmswardroundssource.settings = clone;
        this.tblhmswardroundssource.initGrid();
      });

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var datanurseid2 = res as any;
        for (let i = 0; i < datanurseid2.length; i++) {
          var obj = { value: datanurseid2[i].userid, title: datanurseid2[i].username };
          this.datahmswardroundsnurseid3.push(obj);
        }
        var clone = this.clone(this.tblhmswardroundssource.settings);
        clone.columns['nurseid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardroundsnurseid3)), }, };
        clone.columns['nurseid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardroundsnurseid3)), }, };
        this.tblhmswardroundssource.settings = clone;
        this.tblhmswardroundssource.initGrid();
      });
    }
    this.bfilterPopulatehmswardrounds = true;
  }
  async hmswardroundsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmswardroundsTableConfig() {
    this.hmswardroundssettings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        width: '300px',
        columnTitle: 'Actions',
        add: true,
        edit: true, // true,
        delete: true,
        custom: [
          // { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
          // { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
        ]
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        doctorid: {
          title: 'Doctor',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmswardroundsdoctorid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        doctorname: {
          title: 'doctorname',
          type: '',
          filter: true,
        },
        patientid: {
          title: 'Patient',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmswardroundspatientid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        bedid: {
          title: 'Bed',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmswardroundsbedid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        nurseid: {
          title: 'Nurse',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmswardroundsnurseid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        visitdate: {
          title: 'visitdate',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        visittime: {
          title: 'visittime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        postoperationday: {
          title: 'postoperationday',
          type: 'number',
          filter: true,
        },
        symptoms: {
          title: 'symptoms',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        examinations: {
          title: 'examinations',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        instructions: {
          title: 'instructions',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        assessment: {
          title: 'assessment',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        notes: {
          title: 'notes',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        customfield: {
          title: 'customfield',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            return cell;
            return cell.substr(15).split('"').join('').split('{').join('').split('}').join('');
          },
        },
        attachment: {
          title: 'attachment',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            return cell;
            return cell.substr(14).split('"').join('').split('{').join('').split('}').join('');
          },
        },
      },
    };
  }
  hmswardroundsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmswardroundsID) >= 0) {
      this.hmswardroundssource = new LocalDataSource();
      this.hmswardroundssource.load(this.hmswardservice.hmswardrounds as any as LocalDataSource);
      this.hmswardroundssource.setPaging(1, 20, true);
    }
  }
  hmswardroundsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmswardround(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmswardround(event, event.data.wardroundid, this.formid);
        break;
      case 'delete':
        this.onDeletehmswardround(event, event.data.wardroundid, ((this.hmswardroundssource.getPaging().page - 1) * this.hmswardroundssource.getPaging().perPage) + event.index);
        this.hmswardroundssource.refresh();
        break;
    }
  }
  hmswardroundsonDelete(obj) {
    let wardroundid = obj.data.wardroundid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmswardservice.deletehmsward(wardroundid).then((res:any) =>
        this.hmswardroundsLoadTable()
      );
    }
  }
  hmswardroundsPaging(val) {
    debugger;
    this.hmswardroundssource.setPaging(1, val, true);
  }
  handlehmswardroundsGridSelected(event) {
    this.hmswardroundsselectedindex = this.hmswardservice.hmswardrounds.findIndex(i => i.wardroundid === event.data.wardroundid);
  }
  IshmswardroundsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmswardroundsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmswardrounds
  //start of Grid Codes hmsbeds
  hmsbedssettings: any;
  hmsbedssource: any;

  showhmsbedsCheckbox() {
    debugger;
    if (this.tblhmsbedssource.settings['selectMode'] == 'multi') this.tblhmsbedssource.settings['selectMode'] = 'single';
    else
      this.tblhmsbedssource.settings['selectMode'] = 'multi';
    this.tblhmsbedssource.initGrid();
  }
  deletehmsbedsAll() {
    this.tblhmsbedssource.settings['selectMode'] = 'single';
  }
  showhmsbedsFilter() {
    setTimeout(() => {
      this.SethmsbedsTableddConfig();
    });
    if (this.tblhmsbedssource.settings != null) this.tblhmsbedssource.settings['hideSubHeader'] = !this.tblhmsbedssource.settings['hideSubHeader'];
    this.tblhmsbedssource.initGrid();
  }
  showhmsbedsInActive() {
  }
  enablehmsbedsInActive() {
  }
  async SethmsbedsTableddConfig() {
    if (!this.bfilterPopulatehmsbeds) {

      this.configservice.getList("bedtype").then((res:any) => {
        var databedtype2 = res as any;
        for (let i = 0; i < databedtype2.length; i++) {
          var obj = { value: databedtype2[i].configkey, title: databedtype2[i].configtext };
          this.datahmsbedsbedtype3.push(obj);
        }
        var clone = this.clone(this.tblhmsbedssource.settings);
        clone.columns['bedtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsbedsbedtype3)), }, };
        clone.columns['bedtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmsbedsbedtype3)), }, };
        this.tblhmsbedssource.settings = clone;
        this.tblhmsbedssource.initGrid();
      });
    }
    this.bfilterPopulatehmsbeds = true;
  }
  async hmsbedsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmsbedsTableConfig() {
    this.hmsbedssettings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        width: '300px',
        columnTitle: 'Actions',
        add: true,
        edit: true, // true,
        delete: true,
        custom: [
          // { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
          // { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
        ]
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        bedname: {
          title: 'bedname',
          type: '',
          filter: true,
        },
        bedtype: {
          title: 'Bed Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmsbedsbedtype3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        imageurl: {
          title: 'Image',
          type: '',
          filter: true,
        },
        roomlength: {
          title: 'roomlength',
          type: 'number',
          filter: true,
        },
        roomwidth: {
          title: 'roomwidth',
          type: 'number',
          filter: true,
        },
        facilities: {
          title: 'facilities',
          type: '',
          filter: true,
        },
        remarks: {
          title: 'Remarks',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        customfield: {
          title: 'customfield',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            return cell;
            return cell.substr(15).split('"').join('').split('{').join('').split('}').join('');
          },
        },
        attachment: {
          title: 'attachment',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            return cell;
            return cell.substr(14).split('"').join('').split('{').join('').split('}').join('');
          },
        },
      },
    };
  }
  hmsbedsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsbedsID) >= 0) {
      this.hmsbedssource = new LocalDataSource();
      this.hmsbedssource.load(this.hmswardservice.hmsbeds as any as LocalDataSource);
      this.hmsbedssource.setPaging(1, 20, true);
    }
  }
  hmsbedsroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmsbed(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmsbed(event, event.data.bedid, this.formid);
        break;
      case 'delete':
        this.onDeletehmsbed(event, event.data.bedid, ((this.hmsbedssource.getPaging().page - 1) * this.hmsbedssource.getPaging().perPage) + event.index);
        this.hmsbedssource.refresh();
        break;
    }
  }
  hmsbedsonDelete(obj) {
    let bedid = obj.data.bedid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmswardservice.deletehmsward(bedid).then((res:any) =>
        this.hmsbedsLoadTable()
      );
    }
  }
  hmsbedsPaging(val) {
    debugger;
    this.hmsbedssource.setPaging(1, val, true);
  }
  handlehmsbedsGridSelected(event) {
    this.hmsbedsselectedindex = this.hmswardservice.hmsbeds.findIndex(i => i.bedid === event.data.bedid);
  }
  IshmsbedsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsbedsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmsbeds
  //start of Grid Codes hmswardincharges
  hmswardinchargessettings: any;
  hmswardinchargessource: any;

  showhmswardinchargesCheckbox() {
    debugger;
    if (this.tblhmswardinchargessource.settings['selectMode'] == 'multi') this.tblhmswardinchargessource.settings['selectMode'] = 'single';
    else
      this.tblhmswardinchargessource.settings['selectMode'] = 'multi';
    this.tblhmswardinchargessource.initGrid();
  }
  deletehmswardinchargesAll() {
    this.tblhmswardinchargessource.settings['selectMode'] = 'single';
  }
  showhmswardinchargesFilter() {
    setTimeout(() => {
      this.SethmswardinchargesTableddConfig();
    });
    if (this.tblhmswardinchargessource.settings != null) this.tblhmswardinchargessource.settings['hideSubHeader'] = !this.tblhmswardinchargessource.settings['hideSubHeader'];
    this.tblhmswardinchargessource.initGrid();
  }
  showhmswardinchargesInActive() {
  }
  enablehmswardinchargesInActive() {
  }
  async SethmswardinchargesTableddConfig() {
    if (!this.bfilterPopulatehmswardincharges) {

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var dataincharge2 = res as any;
        for (let i = 0; i < dataincharge2.length; i++) {
          var obj = { value: dataincharge2[i].userid, title: dataincharge2[i].username };
          this.datahmswardinchargesincharge3.push(obj);
        }
        var clone = this.clone(this.tblhmswardinchargessource.settings);
        clone.columns['incharge'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardinchargesincharge3)), }, };
        clone.columns['incharge'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmswardinchargesincharge3)), }, };
        this.tblhmswardinchargessource.settings = clone;
        this.tblhmswardinchargessource.initGrid();
      });
    }
    this.bfilterPopulatehmswardincharges = true;
  }
  async hmswardinchargesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SethmswardinchargesTableConfig() {
    this.hmswardinchargessettings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        width: '300px',
        columnTitle: 'Actions',
        add: true,
        edit: true, // true,
        delete: true,
        custom: [
          // { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
          // { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
        ]
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        incharge: {
          title: 'Incharge',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.datahmswardinchargesincharge3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        starttime: {
          title: 'starttime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        endtime: {
          title: 'endtime',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
      },
    };
  }
  hmswardinchargesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmswardinchargesID) >= 0) {
      this.hmswardinchargessource = new LocalDataSource();
      this.hmswardinchargessource.load(this.hmswardservice.hmswardincharges as any as LocalDataSource);
      this.hmswardinchargessource.setPaging(1, 20, true);
    }
  }
  hmswardinchargesroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdithmswardincharge(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdithmswardincharge(event, event.data.wardinchargeid, this.formid);
        break;
      case 'delete':
        this.onDeletehmswardincharge(event, event.data.wardinchargeid, ((this.hmswardinchargessource.getPaging().page - 1) * this.hmswardinchargessource.getPaging().perPage) + event.index);
        this.hmswardinchargessource.refresh();
        break;
    }
  }
  hmswardinchargesonDelete(obj) {
    let wardinchargeid = obj.data.wardinchargeid;
    if (confirm('Are you sure to delete this record ?')) {
      this.hmswardservice.deletehmsward(wardinchargeid).then((res:any) =>
        this.hmswardinchargesLoadTable()
      );
    }
  }
  hmswardinchargesPaging(val) {
    debugger;
    this.hmswardinchargessource.setPaging(1, val, true);
  }
  handlehmswardinchargesGridSelected(event) {
    this.hmswardinchargesselectedindex = this.hmswardservice.hmswardincharges.findIndex(i => i.wardinchargeid === event.data.wardinchargeid);
  }
  IshmswardinchargesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmswardinchargesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes hmswardincharges

}



