import { prjprojectbillingService } from './../../../service/prjprojectbilling.service';
import { prjprojectbilling } from './../../../model/prjprojectbilling.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { prjprojectbillingdetail } from './../../../model/prjprojectbillingdetail.model';
//FK services
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
  selector: 'app-prjprojectbilling',
  templateUrl: './prjprojectbilling.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class prjprojectbillingComponent implements OnInit {
  viewhtml: any = '';//stores html view of the screen
  showview: boolean = false;//view or edit mode
  theme: string = "";//current theme
  formdata: any;//current form data
  shortcuts: ShortcutInput[] = [];//keyboard keys
  showsubmit: boolean = true;//button to show
  showGoWorkFlow: boolean = false;
  pkList: any;//stores values - used in search, prev, next
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
  pk_tblForm: FormGroup;//pk - autocomplete
  pk_tbloptions: any;//pk - autocomplete
  pk_tblformatter: any;//pk - autocomplete
  toolbarvisible: boolean = true;
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  pmenuid: any;
  pcurrenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  data3: any = [];
  bfilterPopulateprjprojectbillings: boolean = false;
  dataprjprojectbillingdetailsuserid3: any = [];
  bfilterPopulateprjprojectbillingdetails: boolean = false;
  @ViewChild('tblprjprojectbillingdetailssource', { static: false }) tblprjprojectbillingdetailssource: Ng2SmartTableComponent;
  prjprojectbillingForm: FormGroup;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showformtype: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user
  sessiondata: any;



  prjprojectbillingdetailsvisiblelist: any;
  prjprojectbillingdetailshidelist: any;

  DeletedprjprojectbillingdetailIDs: string = "";
  prjprojectbillingdetailsID: string = "1";
  prjprojectbillingdetailsselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private prjprojectbillingservice: prjprojectbillingService,
    private bousermasterservice: bousermasterService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
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
    this.prjprojectbillingForm = this.fb.group({
      pk: [null], billid: [null],
      billreference: [null],
      projectid: [null],
      totalworkinghrs: [null],
      totalbillablehrs: [null],
      totalbillableamount: [null],
      totalcostingamount: [null],
      notes: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.prjprojectbillingForm.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop:any) {
    this.toolbarvisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.prjprojectbillingForm.dirty && this.prjprojectbillingForm.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields

  //navigation buttons
  first() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
  }

  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }

  prev() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.billid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.billid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.billid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    //session & theme
    this.sessiondata = this.sessionService.getSession();
    if (this.sessiondata != null) {
      this.SESSIONUSERID = this.sessiondata.userid;
    }

    this.theme = this.sessionService.getItem('selected-theme');

    debugger;
    let prjprojectbillingid = null;

    //getting data - from list page, from other screen through dialog
    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.showview != undefined && this.data.showview != null) this.showview = this.data.showview;
    if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    //if view button(eye) is clicked
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      this.viewhtml = this.sessionService.getViewHtml();
    }
    else if (this.data != null && this.data.pkcol != null) {
      this.pkcol = this.data.pkcol;
    }
    else {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    //copy the data from previous dialog 
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = prjprojectbillingid;
    //this.sharedService.alert(prjprojectbillingid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.SetprjprojectbillingdetailsTableConfig();
      setTimeout(() => {
        this.SetprjprojectbillingdetailsTableddConfig();
      });

      this.resetForm();
    }
    else {
      await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }

    //autocomplete
    this.prjprojectbillingservice.getprjprojectbillingsList().then((res:any) => {
      this.pkList = res as prjprojectbilling[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

    //setting the flag that the screen is not touched 
    this.prjprojectbillingForm.markAsUntouched();
    this.prjprojectbillingForm.markAsPristine();
  }



  resetForm() {
    if (this.prjprojectbillingForm != null)
      this.prjprojectbillingForm.reset();
    this.prjprojectbillingForm.patchValue({
    });
    setTimeout(() => {
      this.prjprojectbillingservice.prjprojectbillingdetails = [];
      this.prjprojectbillingdetailsLoadTable();
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let billid = this.prjprojectbillingForm.get('billid')!.value;
    if (billid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.prjprojectbillingservice.deleteprjprojectbilling(billid).then((res:any) => {
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
    this.prjprojectbillingForm.patchValue({
      billid: null
    });
    if (this.prjprojectbillingservice.formData.billid != null) this.prjprojectbillingservice.formData.billid = null;
    for (let i = 0; i < this.prjprojectbillingservice.prjprojectbillingdetails.length; i++) {
      this.prjprojectbillingservice.prjprojectbillingdetails[i].billdetailid = null;
    }
  }
  PopulateFromMainScreen(mainscreendata:any, bdisable:any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "notes")
            json = '{"' + key + '": ' + mainscreendata[key] + ' }';
          else if (ctrltype == "string") {
            jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
            json = JSON.parse(jsonstring);
          }
          else {
            jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
            json = JSON.parse(jsonstring);
          }
          {
            if (this.prjprojectbillingForm.controls[key] != null) {
              this.prjprojectbillingForm.patchValue(json);
              if (bdisable) this.prjprojectbillingForm.controls[key].disable({ onlySelf: true });
            }
          }
        }
      }
    }
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmitAndWait() {
    if (this.data.save == true) {
      this.onSubmitData(false);
    }
    else if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.onSubmitDataDlg(false);
    }
    else {
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }

  async PopulateScreen(pkcol: any) {
    this.prjprojectbillingservice.getprjprojectbillingsByEID(pkcol).then((res:any) => {

      this.formdata = res;
      let formproperty = res.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.pkcol;
      this.formid = res.prjprojectbilling.billid;
      this.FillData(res);
    });
  }

  FillData(res: any) {
    this.formid = res.prjprojectbilling.billid;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.prjprojectbillingForm.patchValue({
      billid: res.prjprojectbilling.billid,
      billreference: res.prjprojectbilling.billreference,
      projectid: res.prjprojectbilling.projectid,
      totalworkinghrs: res.prjprojectbilling.totalworkinghrs,
      totalbillablehrs: res.prjprojectbilling.totalbillablehrs,
      totalbillableamount: res.prjprojectbilling.totalbillableamount,
      totalcostingamount: res.prjprojectbilling.totalcostingamount,
      notes: JSON.parse(res.prjprojectbilling.notes),
      status: res.prjprojectbilling.status,
      statusdesc: res.prjprojectbilling.statusdesc,
    });
    this.prjprojectbillingdetailsvisiblelist = res.prjprojectbillingdetailsvisiblelist;
    //Child Tables if any
    this.prjprojectbillingservice.prjprojectbillingdetails = res.prjprojectbillingdetail;
    this.SetprjprojectbillingdetailsTableConfig();
    this.prjprojectbillingdetailsLoadTable();
    setTimeout(() => {
      this.SetprjprojectbillingdetailsTableddConfig();
    });
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.prjprojectbillingForm.controls) {
      if (this.prjprojectbillingForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjprojectbillingForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    if (!this.prjprojectbillingForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.prjprojectbillingForm!.value;
    obj.notes = JSON.stringify(this.prjprojectbillingForm.get('notes')!.value);
    console.log(obj);
    this.dialogRef.close(obj);
  }

  //This has to come from bomenuactions & procedures
  afteraction(mode: any) {
    let formname = "";
    let query = "";
    if (mode == "new")
      this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if (mode == "refresh")
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
  }

  async onSubmitData(bclear:any) {
    debugger;
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.prjprojectbillingForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.prjprojectbillingForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.prjprojectbillingForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.prjprojectbillingservice.formData = this.prjprojectbillingForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.prjprojectbillingForm.controls[key] != null) {
            this.prjprojectbillingservice.formData[key] = this.prjprojectbillingForm.controls[key]!.value;
          }
        }
      }
    }
    this.prjprojectbillingservice.formData.notes = JSON.stringify(this.prjprojectbillingForm.get('notes')!.value);
    this.prjprojectbillingservice.formData.DeletedprjprojectbillingdetailIDs = this.DeletedprjprojectbillingdetailIDs;
    console.log(this.prjprojectbillingservice.formData);
    this.prjprojectbillingservice.saveOrUpdateprjprojectbillings().subscribe(
      async (res:any) => {
        if (this.prjprojectbillingdetailssource.data) {
          for (let i = 0; i < this.prjprojectbillingdetailssource.data.length; i++) {
            if (this.prjprojectbillingdetailssource.data[i].fileattachmentlist) await this.sharedService.upload(this.prjprojectbillingdetailssource.data[i].fileattachmentlist);
          }
        }
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        document.getElementById("contentArea1").scrollTop = 0;
        if (this.dynamicconfig.data != undefined && this.dynamicconfig.data.save) {
          this.dialogRef.close((res as any).result!.value.prjprojectbilling);
          return;
        }
        else {
          document.getElementById("contentArea1").scrollTop = 0;
        }
        this.prjprojectbillingservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result!.value.prjprojectbilling);
          }
          else {
            this.FillData((res as any).result!.value);
          }
        }
        this.prjprojectbillingForm.markAsUntouched();
        this.prjprojectbillingForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer

  onDeleteprjprojectbillingdetail(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedprjprojectbillingdetailIDs += childID + ",";
    this.prjprojectbillingservice.prjprojectbillingdetails.splice(i, 1);
  }

  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes prjprojectbillingdetails
  prjprojectbillingdetailssettings: any;
  prjprojectbillingdetailssource: any;

  showprjprojectbillingdetailsCheckbox() {
    debugger;
    if (this.tblprjprojectbillingdetailssource.settings['selectMode'] == 'multi') this.tblprjprojectbillingdetailssource.settings['selectMode'] = 'single';
    else
      this.tblprjprojectbillingdetailssource.settings['selectMode'] = 'multi';
    this.tblprjprojectbillingdetailssource.initGrid();
  }
  deleteprjprojectbillingdetailsAll() {
    this.tblprjprojectbillingdetailssource.settings['selectMode'] = 'single';
  }
  showprjprojectbillingdetailsFilter() {
    setTimeout(() => {
      this.SetprjprojectbillingdetailsTableddConfig();
    });
    if (this.tblprjprojectbillingdetailssource.settings != null) this.tblprjprojectbillingdetailssource.settings['hideSubHeader'] = !this.tblprjprojectbillingdetailssource.settings['hideSubHeader'];
    this.tblprjprojectbillingdetailssource.initGrid();
  }
  showprjprojectbillingdetailsInActive() {
  }
  enableprjprojectbillingdetailsInActive() {
  }
  async SetprjprojectbillingdetailsTableddConfig() {
    if (!this.bfilterPopulateprjprojectbillingdetails) {

      this.bousermasterservice.getbousermastersList().then((res:any) => {
        var datauserid2 = res as any;
        var defaultobj = { value: "", title: "Select..." };
        this.dataprjprojectbillingdetailsuserid3.push(defaultobj);
        for (let i = 0; i < datauserid2.length; i++) {
          var obj = { value: datauserid2[i].userid, title: datauserid2[i].username };
          this.dataprjprojectbillingdetailsuserid3.push(obj);
        }
        if ((this.tblprjprojectbillingdetailssource.settings as any).columns['userid']) {
          (this.tblprjprojectbillingdetailssource.settings as any).columns['userid'].editor.config.list = JSON.parse(JSON.stringify(this.dataprjprojectbillingdetailsuserid3));
          this.tblprjprojectbillingdetailssource.initGrid();
        }
      });
    }
    this.bfilterPopulateprjprojectbillingdetails = true;
  }
  async prjprojectbillingdetailsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetprjprojectbillingdetailsTableConfig() {
    this.prjprojectbillingdetailssettings = {
      hideSubHeader: true,
      mode: 'inline',
      selectMode: 'single',
      actions: {
        width: '300px',
        columnTitle: 'Actions',
        add: !this.showview,
        edit: !this.showview, // true,
        delete: !this.showview,
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
        timecardid: {
          title: 'Time Card',
          type: 'number',
          filter: true,
        },
        deliverableid: {
          title: 'Deliverable',
          type: 'number',
          filter: true,
        },
        taskid: {
          title: 'Task',
          type: 'number',
          filter: true,
        },
        userid: {
          title: 'User',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid: 'e99kq', reportcode: 'e99kq', id: "value", desc: "title", list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataprjprojectbillingdetailsuserid3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        startdate: {
          title: 'Start Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        todate: {
          title: 'To Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        totalhours: {
          title: 'Total Hours',
          type: 'number',
          filter: true,
        },
        billableamount: {
          title: 'Billable Amount',
          type: 'number',
          filter: true,
        },
      },
    };
  }
  prjprojectbillingdetailsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.prjprojectbillingdetailsID) >= 0) {
      this.prjprojectbillingdetailssource = new LocalDataSource();
      this.prjprojectbillingdetailssource.load(this.prjprojectbillingservice.prjprojectbillingdetails as any as LocalDataSource);
      this.prjprojectbillingdetailssource.setPaging(1, 20, true);
    }
  }
  prjprojectbillingdetailsroute(event, action) {
    switch (action) {
      case 'create':
        if (this.prjprojectbillingservice.prjprojectbillingdetails.length == 0) {
          this.tblprjprojectbillingdetailssource.grid.createFormShown = true;
        }
        else {
          let obj = new prjprojectbillingdetail();
          this.prjprojectbillingservice.prjprojectbillingdetails.push(obj);
          this.prjprojectbillingdetailssource.refresh();
          if ((this.prjprojectbillingservice.prjprojectbillingdetails.length / this.prjprojectbillingdetailssource.getPaging().perPage).toFixed(0) + 1 != this.prjprojectbillingdetailssource.getPaging().page) {
            this.prjprojectbillingdetailssource.setPage((this.prjprojectbillingservice.prjprojectbillingdetails.length / this.prjprojectbillingdetailssource.getPaging().perPage).toFixed(0) + 1);
          }
          setTimeout(() => {
            this.tblprjprojectbillingdetailssource.grid.edit(this.tblprjprojectbillingdetailssource.grid.getLastRow());
          });
        }
        break;
      case 'delete':
        let index = this.prjprojectbillingdetailssource.data.indexOf(event.data);
        this.onDeleteprjprojectbillingdetail(event, event.data.billdetailid, ((this.prjprojectbillingdetailssource.getPaging().page - 1) * this.prjprojectbillingdetailssource.getPaging().perPage) + index);
        this.prjprojectbillingdetailssource.refresh();
        break;
    }
  }
  prjprojectbillingdetailsPaging(val) {
    debugger;
    this.prjprojectbillingdetailssource.setPaging(1, val, true);
  }

  handleprjprojectbillingdetailsGridSelected(event) {
    this.prjprojectbillingdetailsselectedindex = this.prjprojectbillingservice.prjprojectbillingdetails.findIndex(i => i.billdetailid === event.data.billdetailid);
  }
  IsprjprojectbillingdetailsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.prjprojectbillingdetailsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes prjprojectbillingdetails

}



