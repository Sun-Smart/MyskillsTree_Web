import { botableService } from '../../../../../../n-tire-bo-app/src/app/service/botable.service';
import { botable } from '../../../../../../n-tire-bo-app/src/app/model/botable.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';

@Component({
  selector: 'app-botable',
  templateUrl: './botable.component.html',
  styles: []
})



export class botableComponent implements OnInit {
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  data3: any = [];
  bfilterPopulatebotables: boolean = false;
  databotablemasterdetailmapsdetailtableid3: any = [];
  bfilterPopulatebotablemasterdetailmaps: boolean = false;
  @ViewChild('tblbotablemasterdetailmapssource', { static: false }) tblbotablemasterdetailmapssource: Ng2SmartTableComponent;
  botableForm: FormGroup;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  formid: any;
  attachmentlist: any[] = []; DeletedbotablemasterdetailmapIDs: string = "";
  botablemasterdetailmapsID: string = "1";


  constructor(
    private router: Router,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private botableservice: botableService,
    private fb: FormBuilder,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private currentRoute: ActivatedRoute) {
    this.data = dynamicconfig;
    this.botableForm = this.fb.group({
      tableid: [null],
      tablename: [null],
      status: [null],
      statusDesc: [null],
    });
  }
  get f() { return this.botableForm.controls; }

  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
  ngOnInit() {
    //debugger;
    let botable = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.tableid != null) {
      botable = this.data.tableid;
    }
    else
      botable = this.currentRoute.snapshot.paramMap.get('id');
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = botable;
    //this.sharedService.alert(botable);
    if (botable == null) {
      this.SetbotablemasterdetailmapsTableConfig();
      this.resetForm();
    }
    else {
      this.botableservice.getbotablesByID(parseInt(botable)).then((res:any) => {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.botableForm.patchValue({
          tableid: res.botable.tableid,
          tablename: res.botable.tablename,
          status: res.botable.status,
          statusDesc: res.botable.statusDesc,
        });
        this.botableservice.botablemasterdetailmaps = res.botablemasterdetailmap;
        this.SetbotablemasterdetailmapsTableConfig();
        this.botablemasterdetailmapsLoadTable();
        setTimeout(() => {
          this.bfilterPopulatebotablemasterdetailmaps = !this.bfilterPopulatebotablemasterdetailmaps;
          this.SetbotablemasterdetailmapsTableddConfig();
        });
      });
    }
  }



  resetForm() {
    if (this.botableForm != null)
      this.botableForm.reset();
    setTimeout(() => {
      this.botableservice.botablemasterdetailmaps = [];
      this.botablemasterdetailmapsLoadTable();
    });
  }

  onDelete() {
    let tableid = this.botableForm.get('tableid').value;
    if (tableid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.botableservice.deletebotable(tableid).then((res:any) => {
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
    this.botableForm.patchValue({
      tableid: null
    });
    this.botableservice.formData.tableid = null;
  }
  onSubmitAndWait() {
    this.onSubmitData(false);
  }
  onSubmit() {
    this.onSubmitData(true);
  }
  onSubmitData(bclear:any) {
    //debugger;
    this.isSubmitted = true;
    if (!this.botableForm.valid)
      return;
    this.botableservice.formData = new botable(this.botableForm.get('tableid').value, this.botableForm.get('tablename').value, this.botableForm.get('status').value, this.DeletedbotablemasterdetailmapIDs);
    console.log(this.botableservice.formData);
    if (this.botableForm.get('tableid').value == null || this.botableForm.get('tableid').value == '' || this.botableForm.get('tableid').value == 0)
      this.insertRecord(bclear);
    else
      this.updateRecord(bclear);
    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.dialogRef.close();
    }
  }



  insertRecord(bclear:any) {
    this.botableservice.saveOrUpdatebotables().subscribe(
      (res:any) => {
        //debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        if (bclear) {
          this.botableservice.clearList();
          this.resetForm();
        }
      },
      (err:any) => {
        //debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }
  updateRecord(bclear:any) {
    this.botableservice.saveOrUpdatebotables().subscribe(
      (res:any) => {
        this.toastr.addSingle("success", "", "Successfully saved");
        if (bclear) {
          this.botableservice.clearList();
          this.resetForm();
        }
      },
      (err:any) => {
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }
  //start of Grid Codes botablemasterdetailmaps
  botablemasterdetailmapssettings: any;
  botablemasterdetailmapssource: any;

  showbotablemasterdetailmapsCheckbox() {
    //debugger;
    if (this.tblbotablemasterdetailmapssource.settings['selectMode'] == 'multi') this.tblbotablemasterdetailmapssource.settings['selectMode'] = 'single';
    else
      this.tblbotablemasterdetailmapssource.settings['selectMode'] = 'multi';
    this.tblbotablemasterdetailmapssource.initGrid();
  }
  deletebotablemasterdetailmapsAll() {
    this.tblbotablemasterdetailmapssource.settings['selectMode'] = 'single';
  }
  showbotablemasterdetailmapsFilter() {
    if (!this.bfilterPopulatebotablemasterdetailmaps) {
      setTimeout(() => {
        this.bfilterPopulatebotablemasterdetailmaps = !this.bfilterPopulatebotablemasterdetailmaps;
        this.SetbotablemasterdetailmapsTableddConfig();
      });
    }
    if (this.tblbotablemasterdetailmapssource.settings != null) this.tblbotablemasterdetailmapssource.settings['hideSubHeader'] = !this.tblbotablemasterdetailmapssource.settings['hideSubHeader'];
    this.tblbotablemasterdetailmapssource.initGrid();
  }
  showbotablemasterdetailmapsInActive() {
  }
  enablebotablemasterdetailmapsInActive() {
  }
  async SetbotablemasterdetailmapsTableddConfig() {

    this.botableservice.getbotablesList().then((res:any) => {
      var datadetailtableid2 = res as any;
      for (let i = 0; i < datadetailtableid2.length; i++) {
        var obj = { value: datadetailtableid2[i].tableid, title: datadetailtableid2[i].tablename };
        this.databotablemasterdetailmapsdetailtableid3.push(obj);
      }
      var clone = this.clone(this.tblbotablemasterdetailmapssource.settings);
      clone.columns['detailtableid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databotablemasterdetailmapsdetailtableid3)), }, };
      clone.columns['detailtableid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databotablemasterdetailmapsdetailtableid3)), }, };
      this.tblbotablemasterdetailmapssource.settings = clone;
      this.tblbotablemasterdetailmapssource.initGrid();
    });
  }
  SetbotablemasterdetailmapsTableConfig() {
    this.botablemasterdetailmapssettings = {
      hideSubHeader: true,
      mode: 'inline',
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
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        detailtableid: {
          title: 'Detail Table',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.databotablemasterdetailmapsdetailtableid3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
      },
    };
  }
  botablemasterdetailmapsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.botablemasterdetailmapsID) >= 0) {
      this.botablemasterdetailmapssource = new LocalDataSource();
      this.botablemasterdetailmapssource.load(this.botableservice.botablemasterdetailmaps as any as LocalDataSource);
      this.botablemasterdetailmapssource.setPaging(1, 20, true);
    }
  }
  botablemasterdetailmapsroute(event, action) {
    this.tblbotablemasterdetailmapssource.grid.createFormShown = true;
    this.tblbotablemasterdetailmapssource.grid.getNewRow();
  }
  botablemasterdetailmapsPaging(val) {
    //debugger;
    this.botablemasterdetailmapssource.setPaging(1, val, true);
  }
  handlebotablemasterdetailmapsGridSelected(event) {
  }
  IsbotablemasterdetailmapsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.botablemasterdetailmapsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes botablemasterdetailmaps

}



