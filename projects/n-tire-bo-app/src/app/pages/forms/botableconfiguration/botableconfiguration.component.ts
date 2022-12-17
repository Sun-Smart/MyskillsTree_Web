import { botableconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/botableconfiguration.service';
import { botableconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/botableconfiguration.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { botable } from '../../../../../../n-tire-bo-app/src/app/model/botable.model';
import { botableService } from '../../../../../../n-tire-bo-app/src/app/service/botable.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';

@Component({
  selector: 'app-botableconfiguration',
  templateUrl: './botableconfiguration.component.html',
  styles: []
})



export class botableconfigurationComponent implements OnInit {
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  data3: any = [];
  bfilterPopulatebotableconfigurations: boolean = false;
  databotableconfigurationsmaintableid3: any = [];
  bfilterPopulatebotbldetailmainaccessess: boolean = false;
  @ViewChild('tblbotbldetailmainaccessesssource', { static: false }) tblbotbldetailmainaccessesssource: Ng2SmartTableComponent;
  botableconfigurationForm: FormGroup;
  maintableidList: botable[];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  formid: any;
  attachmentlist: any[] = []; DeletedbotbldetailmainaccessIDs: string = "";
  botbldetailmainaccessessID: string = "1";


  constructor(
    private router: Router,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private botableconfigurationservice: botableconfigurationService,
    private botableservice: botableService,
    private fb: FormBuilder,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private currentRoute: ActivatedRoute) {
    this.data = dynamicconfig;
    this.botableconfigurationForm = this.fb.group({
      tableconfigid: [null],
      templateid: [null],
      description: [null],
      company: [null],
      listhtml: [null],
      maintableid: [null],
      maintableidDesc: [null],
      type: [null],
      usertype: [null],
      addrecord: [null],
      editrecord: [null],
      viewrecord: [null],
      deleterecord: [null],
      hasheader: [null],
      hascontent: [null],
      hasfooter: [null],
      headerheight: [null],
      contentheight: [null],
      footerheight: [null],
      columnlist: [null],
      tablestyletype: [null],
      remarks: [null],
      status: [null],
      statusDesc: [null],
    });
  }
  get f() { return this.botableconfigurationForm.controls; }

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
    let botableconfiguration = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.tableconfigid != null) {
      botableconfiguration = this.data.tableconfigid;
    }
    else
      botableconfiguration = this.currentRoute.snapshot.paramMap.get('id');
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = botableconfiguration;
    //this.sharedService.alert(botableconfiguration);
    if (botableconfiguration == null) {
      this.SetbotbldetailmainaccessessTableConfig();
      this.resetForm();
    }
    else {
      this.botableconfigurationservice.getbotableconfigurationsByID(parseInt(botableconfiguration)).then((res:any) => {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.botableconfigurationForm.patchValue({
          tableconfigid: res.botableconfiguration.tableconfigid,
          templateid: res.botableconfiguration.templateid,
          description: res.botableconfiguration.description,
          company: res.botableconfiguration.company,
          listhtml: res.botableconfiguration.listhtml,
          maintableid: res.botableconfiguration.maintableid,
          maintableidDesc: res.botableconfiguration.maintableidDesc,
          type: res.botableconfiguration.type,
          usertype: res.botableconfiguration.usertype,
          addrecord: res.botableconfiguration.addrecord,
          editrecord: res.botableconfiguration.editrecord,
          viewrecord: res.botableconfiguration.viewrecord,
          deleterecord: res.botableconfiguration.deleterecord,
          hasheader: res.botableconfiguration.hasheader,
          hascontent: res.botableconfiguration.hascontent,
          hasfooter: res.botableconfiguration.hasfooter,
          headerheight: res.botableconfiguration.headerheight,
          contentheight: res.botableconfiguration.contentheight,
          footerheight: res.botableconfiguration.footerheight,
          columnlist: res.botableconfiguration.columnlist,
          tablestyletype: res.botableconfiguration.tablestyletype,
          remarks: res.botableconfiguration.remarks,
          status: res.botableconfiguration.status,
          statusDesc: res.botableconfiguration.statusDesc,
        });
        this.botableconfigurationservice.botbldetailmainaccessess = res.botbldetailmainaccess;
        this.SetbotbldetailmainaccessessTableConfig();
        this.botbldetailmainaccessessLoadTable();
        setTimeout(() => {
          this.bfilterPopulatebotbldetailmainaccessess = !this.bfilterPopulatebotbldetailmainaccessess;
          this.SetbotbldetailmainaccessessTableddConfig();
        });
        this.botableconfigurationservice.Insertbotbldetailmainaccessess = [];
      });
    }
    this.botableservice.getbotablesList().then((res:any) => this.maintableidList = res as botable[]);
  }



  resetForm() {
    if (this.botableconfigurationForm != null)
      this.botableconfigurationForm.reset();
    setTimeout(() => {
      this.botableconfigurationservice.botbldetailmainaccessess = [];
      this.botableconfigurationservice.Insertbotbldetailmainaccessess = [];
      this.botbldetailmainaccessessLoadTable();
    });
  }

  onDelete() {
    let tableconfigid = this.botableconfigurationForm.get('tableconfigid').value;
    if (tableconfigid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.botableconfigurationservice.deletebotableconfiguration(tableconfigid).then((res:any) => {
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
    this.botableconfigurationForm.patchValue({
      tableconfigid: null
    });
    this.botableconfigurationservice.formData.tableconfigid = null;
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
    if (!this.botableconfigurationForm.valid)
      return;
    this.botableconfigurationservice.formData = new botableconfiguration(this.botableconfigurationForm.get('tableconfigid').value, this.botableconfigurationForm.get('templateid').value, this.botableconfigurationForm.get('description').value, this.botableconfigurationForm.get('company').value, this.botableconfigurationForm.get('listhtml').value, this.botableconfigurationForm.get('maintableid').value, this.botableconfigurationForm.get('maintableidDesc').value, this.botableconfigurationForm.get('type').value, this.botableconfigurationForm.get('usertype').value, this.botableconfigurationForm.get('addrecord').value, this.botableconfigurationForm.get('editrecord').value, this.botableconfigurationForm.get('viewrecord').value, this.botableconfigurationForm.get('deleterecord').value, this.botableconfigurationForm.get('hasheader').value, this.botableconfigurationForm.get('hascontent').value, this.botableconfigurationForm.get('hasfooter').value, this.botableconfigurationForm.get('headerheight').value, this.botableconfigurationForm.get('contentheight').value, this.botableconfigurationForm.get('footerheight').value, this.botableconfigurationForm.get('columnlist').value, this.botableconfigurationForm.get('tablestyletype').value, this.botableconfigurationForm.get('remarks').value, this.botableconfigurationForm.get('status').value, this.DeletedbotbldetailmainaccessIDs);
    console.log(this.botableconfigurationservice.formData);
    if (this.botableconfigurationForm.get('tableconfigid').value == null || this.botableconfigurationForm.get('tableconfigid').value == '' || this.botableconfigurationForm.get('tableconfigid').value == 0)
      this.insertRecord(bclear);
    else
      this.updateRecord(bclear);
    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.dialogRef.close();
    }
  }



  insertRecord(bclear:any) {
    this.botableconfigurationservice.saveOrUpdatebotableconfigurations().subscribe(
      (res:any) => {
        //debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        if (bclear) {
          this.botableconfigurationservice.clearList();
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
    this.botableconfigurationservice.saveOrUpdatebotableconfigurations().subscribe(
      (res:any) => {
        this.toastr.addSingle("success", "", "Successfully saved");
        if (bclear) {
          this.botableconfigurationservice.clearList();
          this.resetForm();
        }
      },
      (err:any) => {
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }
  AddOrEditmaintableid(tableid) {
    let ScreenType = '2';
    /*this.dialog.open(botableComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.botableservice.getbotablesList().then((res:any) => this.maintableidList = res as botable[]);
    });*/
  }

  //start of Grid Codes botbldetailmainaccessess
  botbldetailmainaccessesssettings: any;
  botbldetailmainaccessesssource: any;

  showbotbldetailmainaccessessCheckbox() {
    //debugger;
    if (this.tblbotbldetailmainaccessesssource.settings['selectMode'] == 'multi') this.tblbotbldetailmainaccessesssource.settings['selectMode'] = 'single';
    else
      this.tblbotbldetailmainaccessesssource.settings['selectMode'] = 'multi';
    this.tblbotbldetailmainaccessesssource.initGrid();
  }
  deletebotbldetailmainaccessessAll() {
    this.tblbotbldetailmainaccessesssource.settings['selectMode'] = 'single';
  }
  showbotbldetailmainaccessessFilter() {
    if (!this.bfilterPopulatebotbldetailmainaccessess) {
      setTimeout(() => {
        this.bfilterPopulatebotbldetailmainaccessess = !this.bfilterPopulatebotbldetailmainaccessess;
        this.SetbotbldetailmainaccessessTableddConfig();
      });
    }
    if (this.tblbotbldetailmainaccessesssource.settings != null) this.tblbotbldetailmainaccessesssource.settings['hideSubHeader'] = !this.tblbotbldetailmainaccessesssource.settings['hideSubHeader'];
    this.tblbotbldetailmainaccessesssource.initGrid();
  }
  showbotbldetailmainaccessessInActive() {
  }
  enablebotbldetailmainaccessessInActive() {
  }
  async SetbotbldetailmainaccessessTableddConfig() {
  }
  SetbotbldetailmainaccessessTableConfig() {
    this.botbldetailmainaccessesssettings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'multi',
      actions: {
        width: '300px',
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        maindetailaccessid: {
          title: 'Main Detail Access',
          type: '',
        },
        tableid: {
          title: 'Table',
          type: '',
        },
        tablename: {
          title: 'Tablename',
          type: '',
        },
      },
    };
  }
  botbldetailmainaccessessLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.botbldetailmainaccessessID) >= 0) {
      this.botbldetailmainaccessesssource = new LocalDataSource();
      this.botbldetailmainaccessesssource.load(this.botableconfigurationservice.botbldetailmainaccessess as any as LocalDataSource);
      setTimeout(() => {
        if (this.tblbotbldetailmainaccessesssource != null) {
          this.tblbotbldetailmainaccessesssource.grid.getRows().forEach((row: any) => {
            if (row.data.maindetailaccessid != null && row.data.maindetailaccessid != "") {
              this.botableconfigurationservice.Insertbotbldetailmainaccessess.push(row.data);
              this.tblbotbldetailmainaccessesssource.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }
  botbldetailmainaccessessPaging(val) {
    //debugger;
    this.botbldetailmainaccessesssource.setPaging(1, val, true);
  }
  handlebotbldetailmainaccessessGridSelected(event) {
    //debugger;

    if (event.isSelected) {
      if (event.data.maindetailaccessid == null || event.data.maindetailaccessid == "") {
        var obj = { tableconfigid: this.formid, showdetailtableid: event.data.tableid }
        this.botableconfigurationservice.Insertbotbldetailmainaccessess.push(obj as any);
      }
      else {
        var deletedids = this.DeletedbotbldetailmainaccessIDs.split(',');

        let i: number = 0;
        deletedids.forEach(id => {
          if (id == event.data.maindetailaccessid) {
            deletedids.splice(i, 1);
          }
          i++;
        });
        deletedids.join(",");
      }
    }
    else {
      if (event.data.maindetailaccessid != null && event.data.maindetailaccessid != "") this.DeletedbotbldetailmainaccessIDs += event.data.maindetailaccessid + ",";
    }
  }
  IsbotbldetailmainaccessessVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.botbldetailmainaccessessID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes botbldetailmainaccessess

}



