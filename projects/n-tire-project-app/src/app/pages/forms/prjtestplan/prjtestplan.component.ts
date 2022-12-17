import { prjtestplanService } from './../../../service/prjtestplan.service';
import { prjtestplan } from './../../../model/prjtestplan.model';
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
import { prjtestcase } from './../../../model/prjtestcase.model';
//FK services
import { prjtestcaseComponent } from './prjtestcase.component';
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
  selector: 'app-prjtestplan',
  templateUrl: './prjtestplan.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class prjtestplanComponent implements OnInit {
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
  bfilterPopulateprjtestplans: boolean = false;
  bfilterPopulateprjtestcases: boolean = false;
  @ViewChild('tblprjtestcasessource', { static: false }) tblprjtestcasessource: Ng2SmartTableComponent;
  prjtestplanForm: FormGroup;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showformtype: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user
  sessiondata: any;



  prjtestcasesvisiblelist: any;
  prjtestcaseshidelist: any;

  DeletedprjtestcaseIDs: string = "";
  prjtestcasesID: string = "1";
  prjtestcasesselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private prjtestplanservice: prjtestplanService,
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
    this.prjtestplanForm = this.fb.group({
      pk: [null], projectid: [null],
      planid: [null],
      parentid: [null],
      sequence: [null],
      details: [null],
      notes: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.prjtestplanForm.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop:any) {
    this.toolbarvisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.prjtestplanForm.dirty && this.prjtestplanForm.touched) {
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
    let pos = this.pkList.map(function (e:any) { return e.planid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.planid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.planid && pkDetail) {
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
    let prjtestplanid = null;

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
    this.formid = prjtestplanid;
    //this.sharedService.alert(prjtestplanid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.SetprjtestcasesTableConfig();
      setTimeout(() => {
        this.SetprjtestcasesTableddConfig();
      });

      this.resetForm();
    }
    else {
      await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }

    //autocomplete
    this.prjtestplanservice.getprjtestplansList().then((res:any) => {
      this.pkList = res as prjtestplan[];
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
    this.prjtestplanForm.markAsUntouched();
    this.prjtestplanForm.markAsPristine();
  }



  resetForm() {
    if (this.prjtestplanForm != null)
      this.prjtestplanForm.reset();
    this.prjtestplanForm.patchValue({
    });
    setTimeout(() => {
      this.prjtestplanservice.prjtestcases = [];
      this.prjtestcasesLoadTable();
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let planid = this.prjtestplanForm.get('planid')!.value;
    if (planid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.prjtestplanservice.deleteprjtestplan(planid).then((res:any) => {
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
    this.prjtestplanForm.patchValue({
      planid: null
    });
    if (this.prjtestplanservice.formData.planid != null) this.prjtestplanservice.formData.planid = null;
    for (let i = 0; i < this.prjtestplanservice.prjtestcases.length; i++) {
      this.prjtestplanservice.prjtestcases[i].testcaseid = null;
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
            if (this.prjtestplanForm.controls[key] != null) {
              this.prjtestplanForm.patchValue(json);
              if (bdisable) this.prjtestplanForm.controls[key].disable({ onlySelf: true });
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
    this.prjtestplanservice.getprjtestplansByEID(pkcol).then((res:any) => {

      this.formdata = res;
      let formproperty = res.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.pkcol;
      this.formid = res.prjtestplan.planid;
      this.FillData(res);
    });
  }

  FillData(res: any) {
    this.formid = res.prjtestplan.planid;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.prjtestplanForm.patchValue({
      projectid: res.prjtestplan.projectid,
      planid: res.prjtestplan.planid,
      parentid: res.prjtestplan.parentid,
      sequence: res.prjtestplan.sequence,
      details: res.prjtestplan.details,
      notes: JSON.parse(res.prjtestplan.notes),
      status: res.prjtestplan.status,
      statusdesc: res.prjtestplan.statusdesc,
    });
    this.prjtestcasesvisiblelist = res.prjtestcasesvisiblelist;
    //Child Tables if any
    this.prjtestplanservice.prjtestcases = res.prjtestcase;
    this.SetprjtestcasesTableConfig();
    this.prjtestcasesLoadTable();
    setTimeout(() => {
      this.SetprjtestcasesTableddConfig();
    });
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.prjtestplanForm.controls) {
      if (this.prjtestplanForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjtestplanForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    if (!this.prjtestplanForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.prjtestplanForm!.value;
    obj.notes = JSON.stringify(this.prjtestplanForm.get('notes')!.value);
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
    Object.keys(this.prjtestplanForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.prjtestplanForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.prjtestplanForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.prjtestplanservice.formData = this.prjtestplanForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.prjtestplanForm.controls[key] != null) {
            this.prjtestplanservice.formData[key] = this.prjtestplanForm.controls[key]!.value;
          }
        }
      }
    }
    this.prjtestplanservice.formData.notes = JSON.stringify(this.prjtestplanForm.get('notes')!.value);
    this.prjtestplanservice.formData.DeletedprjtestcaseIDs = this.DeletedprjtestcaseIDs;
    console.log(this.prjtestplanservice.formData);
    this.prjtestplanservice.saveOrUpdateprjtestplans().subscribe(
      async (res:any) => {
        if (this.prjtestcasessource.data) {
          for (let i = 0; i < this.prjtestcasessource.data.length; i++) {
            if (this.prjtestcasessource.data[i].fileattachmentlist) await this.sharedService.upload(this.prjtestcasessource.data[i].fileattachmentlist);
          }
        }
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        document.getElementById("contentArea1").scrollTop = 0;
        if (this.dynamicconfig.data != undefined && this.dynamicconfig.data.save) {
          this.dialogRef.close((res as any).result!.value.prjtestplan);
          return;
        }
        else {
          document.getElementById("contentArea1").scrollTop = 0;
        }
        this.prjtestplanservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result!.value.prjtestplan);
          }
          else {
            this.FillData((res as any).result!.value);
          }
        }
        this.prjtestplanForm.markAsUntouched();
        this.prjtestplanForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer

  AddOrEditprjtestcase(event, testcaseid, planid) {
    let add = false;
    if (event == null) add = true;
    this.dialog.open(prjtestcaseComponent,
      {
        data: { showview: this.showview, save: false, event, testcaseid, planid, visiblelist: this.prjtestcasesvisiblelist, hidelist: this.prjtestcaseshidelist, ScreenType: 2 },
        header: 'Test Cases'
      }
    ).onClose.subscribe((res:any) => {
      if (add) {
        this.prjtestcasessource.add(res);
        this.prjtestcasessource.refresh();
      }
      else {
        this.prjtestcasessource.update(event.data, res);
      }
    });
  }

  onDeleteprjtestcase(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedprjtestcaseIDs += childID + ",";
    this.prjtestplanservice.prjtestcases.splice(i, 1);
    //this.updateGrandTotal();
  }

  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes prjtestcases
  prjtestcasessettings: any;
  prjtestcasessource: any;

  showprjtestcasesCheckbox() {
    debugger;
    if (this.tblprjtestcasessource.settings['selectMode'] == 'multi') this.tblprjtestcasessource.settings['selectMode'] = 'single';
    else
      this.tblprjtestcasessource.settings['selectMode'] = 'multi';
    this.tblprjtestcasessource.initGrid();
  }
  deleteprjtestcasesAll() {
    this.tblprjtestcasessource.settings['selectMode'] = 'single';
  }
  showprjtestcasesFilter() {
    setTimeout(() => {
      this.SetprjtestcasesTableddConfig();
    });
    if (this.tblprjtestcasessource.settings != null) this.tblprjtestcasessource.settings['hideSubHeader'] = !this.tblprjtestcasessource.settings['hideSubHeader'];
    this.tblprjtestcasessource.initGrid();
  }
  showprjtestcasesInActive() {
  }
  enableprjtestcasesInActive() {
  }
  async SetprjtestcasesTableddConfig() {
    if (!this.bfilterPopulateprjtestcases) {
    }
    this.bfilterPopulateprjtestcases = true;
  }
  async prjtestcasesbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetprjtestcasesTableConfig() {
    this.prjtestcasessettings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        width: '300px',
        columnTitle: 'Actions',
        add: !this.showview,
        edit: true, // true,
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
        projectid: {
          title: 'Project',
          type: 'number',
          filter: true,
        },
        parentid: {
          title: 'Parent',
          type: 'number',
          filter: true,
        },
        details: {
          title: 'Details',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        notes: {
          title: 'Notes',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            return this.sharedService.ParseComment(cell);
          },
        },
      },
    };
  }
  prjtestcasesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.prjtestcasesID) >= 0) {
      this.prjtestcasessource = new LocalDataSource();
      this.prjtestcasessource.load(this.prjtestplanservice.prjtestcases as any as LocalDataSource);
      this.prjtestcasessource.setPaging(1, 20, true);
    }
  }
  prjtestcasesroute(event, action) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEditprjtestcase(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEditprjtestcase(event, event.data.testcaseid, this.formid);
        break;
      case 'delete':
        this.onDeleteprjtestcase(event, event.data.testcaseid, ((this.prjtestcasessource.getPaging().page - 1) * this.prjtestcasessource.getPaging().perPage) + event.index);
        this.prjtestcasessource.refresh();
        break;
    }
  }
  prjtestcasesonDelete(obj) {
    let testcaseid = obj.data.testcaseid;
    if (confirm('Are you sure to delete this record ?')) {
      this.prjtestplanservice.deleteprjtestplan(testcaseid).then((res:any) =>
        this.prjtestcasesLoadTable()
      );
    }
  }
  prjtestcasesPaging(val) {
    debugger;
    this.prjtestcasessource.setPaging(1, val, true);
  }

  handleprjtestcasesGridSelected(event) {
    this.prjtestcasesselectedindex = this.prjtestplanservice.prjtestcases.findIndex(i => i.testcaseid === event.data.testcaseid);
  }
  IsprjtestcasesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.prjtestcasesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes prjtestcases

}



