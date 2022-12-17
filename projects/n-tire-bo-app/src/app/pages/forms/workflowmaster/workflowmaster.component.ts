import { workflowmasterService } from './../../../service/workflowmaster.service';
import { workflowmaster } from './../../../model/workflowmaster.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { bouserrolemaster, IbouserrolemasterResponse } from './../../../model/bouserrolemaster.model';
import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
import { bousermaster, IbousermasterResponse } from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../service/shared.service';

@Component({
  selector: 'app-workflowmaster',
  templateUrl: './workflowmaster.component.html',
  styles: []
})



export class workflowmasterComponent implements OnInit {
  pmenuid: any;
  pcurrenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = null;
  data: any;
  data3: any = [];
  bfilterPopulateworkflowmasters: boolean = false;
  dataworkflowmastersmenuid3: any = [];
  dataworkflowstepsapprovertype3: any = [];
  dataworkflowstepsapproverusertype3: any = [];
  dataworkflowstepsapprover3: any = [];
  bfilterPopulateworkflowsteps: boolean = false;
  dataworkflowscurrentapprovertype3: any = [];
  dataworkflowscurrentapproverusertype3: any = [];
  dataworkflowscurrentapprover3: any = [];
  dataworkflowsnextapprovertype3: any = [];
  dataworkflowsnextapproverusertype3: any = [];
  dataworkflowsnextapprover3: any = [];
  dataworkflowsstatus3: any = [];
  bfilterPopulateworkflows: boolean = false;
  dataworkflowhistoriescurrentapprovertype3: any = [];
  dataworkflowhistoriescurrentapproverusertype3: any = [];
  dataworkflowhistoriescurrentapprover3: any = [];
  dataworkflowhistoriesnextapprovertype3: any = [];
  dataworkflowhistoriesnextapproverusertype3: any = [];
  dataworkflowhistoriesnextapprover3: any = [];
  dataworkflowhistoriesstatus3: any = [];
  bfilterPopulateworkflowhistories: boolean = false;
  @ViewChild('tblworkflowstepssource', { static: false }) tblworkflowstepssource: Ng2SmartTableComponent;
  @ViewChild('tblworkflowssource', { static: false }) tblworkflowssource: Ng2SmartTableComponent;
  @ViewChild('tblworkflowhistoriessource', { static: false }) tblworkflowhistoriessource: Ng2SmartTableComponent;
  workflowmasterForm: FormGroup;
  menuidList: boconfigvalue[];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  formid: any;
  attachmentlist: any[] = []; DeletedworkflowstepIDs: string = "";
  workflowstepsID: string = "1";
  DeletedworkflowIDs: string = "";
  workflowsID: string = "2";
  DeletedworkflowhistoryIDs: string = "";
  workflowhistoriesID: string = "3";


  constructor(
    private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private workflowmasterservice: workflowmasterService,
    private bouserrolemasterservice: bouserrolemasterService,
    private bousermasterservice: bousermasterService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private currentRoute: ActivatedRoute) {
    this.data = dynamicconfig;
    this.pmenuid = sharedService.menuid;
    this.pcurrenturl = sharedService.currenturl;
    this.workflowmasterForm = this.fb.group({
      workflowmasterid: [null],
      description: [null, Validators.required],
      menuid: [null],
      menuidDesc: [null],
      status: [null],
      statusDesc: [null],
    });
  }
  get f() { return this.workflowmasterForm.controls; }

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
    let workflowmaster = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.workflowmasterid != null) {
      workflowmaster = this.data.workflowmasterid;
    }
    else
      workflowmaster = this.currentRoute.snapshot.paramMap.get('id');
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
    }
    this.formid = workflowmaster;
    //this.sharedService.alert(workflowmaster);
    if (workflowmaster == null) {
      this.SetworkflowstepsTableConfig();
      setTimeout(() => {
        this.bfilterPopulateworkflowsteps = !this.bfilterPopulateworkflowsteps;
        this.SetworkflowstepsTableddConfig();
      });
      this.SetworkflowsTableConfig();
      setTimeout(() => {
        this.bfilterPopulateworkflows = !this.bfilterPopulateworkflows;
        this.SetworkflowsTableddConfig();
      });
      this.SetworkflowhistoriesTableConfig();
      setTimeout(() => {
        this.bfilterPopulateworkflowhistories = !this.bfilterPopulateworkflowhistories;
        this.SetworkflowhistoriesTableddConfig();
      });
      this.resetForm();
    }
    else {
      this.workflowmasterservice.getworkflowmastersByID(parseInt(workflowmaster)).then(res => {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.workflowmasterForm.patchValue({
          workflowmasterid: res.workflowmaster.workflowmasterid,
          description: res.workflowmaster.description,
          menuid: res.workflowmaster.menuid,
          menuidDesc: res.workflowmaster.menuidDesc,
          status: res.workflowmaster.status,
          statusDesc: res.workflowmaster.statusDesc,
        });
        this.workflowmasterservice.workflowsteps = res.workflowstep;
        this.SetworkflowstepsTableConfig();
        this.workflowstepsLoadTable();
        setTimeout(() => {
          this.bfilterPopulateworkflowsteps = !this.bfilterPopulateworkflowsteps;
          this.SetworkflowstepsTableddConfig();
        });
        this.workflowmasterservice.workflows = res.workflow;
        this.SetworkflowsTableConfig();
        this.workflowsLoadTable();
        setTimeout(() => {
          this.bfilterPopulateworkflows = !this.bfilterPopulateworkflows;
          this.SetworkflowsTableddConfig();
        });
        this.workflowmasterservice.workflowhistories = res.workflowhistory;
        this.SetworkflowhistoriesTableConfig();
        this.workflowhistoriesLoadTable();
        setTimeout(() => {
          this.bfilterPopulateworkflowhistories = !this.bfilterPopulateworkflowhistories;
          this.SetworkflowhistoriesTableddConfig();
        });
      });
    }
    this.configservice.getList("workflowtable").then(res => this.menuidList = res as boconfigvalue[]);
  }



  resetForm() {
    if (this.workflowmasterForm != null)
      this.workflowmasterForm.reset();
    setTimeout(() => {
      this.workflowmasterservice.workflowsteps = [];
      this.workflowstepsLoadTable();
      this.workflowmasterservice.workflows = [];
      this.workflowsLoadTable();
      this.workflowmasterservice.workflowhistories = [];
      this.workflowhistoriesLoadTable();
    });
    if (this.data != null) {
      for (let key in this.data) {

        let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
        if (this.workflowmasterForm.controls[key] != null) this.workflowmasterForm.patchValue(json);
      }
    }
  }

  onDelete() {
    let workflowmasterid = this.workflowmasterForm.get('workflowmasterid').value;
    if (workflowmasterid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.workflowmasterservice.deleteworkflowmaster(workflowmasterid).then(res => {
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
    this.workflowmasterForm.patchValue({
      workflowmasterid: null
    });
    this.workflowmasterservice.formData.workflowmasterid = null;
  }
  onSubmitAndWait() {
    this.onSubmitData(false);
  }
  onSubmit() {
    this.onSubmitData(true);
  }
  onSubmitData(bclear) {
    //debugger;
    this.isSubmitted = true;
    if (!this.workflowmasterForm.valid)
      return;
    this.workflowmasterservice.formData = new workflowmaster(this.workflowmasterForm.get('workflowmasterid').value, this.workflowmasterForm.get('description').value, this.workflowmasterForm.get('menuid').value, this.workflowmasterForm.get('menuidDesc').value, this.workflowmasterForm.get('status').value, this.DeletedworkflowstepIDs, this.DeletedworkflowIDs, this.DeletedworkflowhistoryIDs);
    console.log(this.workflowmasterservice.formData);
    if (this.workflowmasterForm.get('workflowmasterid').value == null || this.workflowmasterForm.get('workflowmasterid').value == '' || this.workflowmasterForm.get('workflowmasterid').value == 0)
      this.insertRecord(bclear);
    else
      this.updateRecord(bclear);
    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.dialogRef.close();
    }
  }



  insertRecord(bclear) {
    this.workflowmasterservice.saveOrUpdateworkflowmasters().subscribe(
      res => {
        //debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        if (bclear) {
          this.workflowmasterservice.clearList();
          this.resetForm();
        }
      },
      err => {
        //debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }
  updateRecord(bclear) {
    this.workflowmasterservice.saveOrUpdateworkflowmasters().subscribe(
      res => {
        this.toastr.addSingle("success", "", "Successfully saved");
        if (bclear) {
          this.workflowmasterservice.clearList();
          this.resetForm();
        }
      },
      err => {
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }
  //start of Grid Codes workflowsteps
  workflowstepssettings: any;
  workflowstepssource: any;

  showworkflowstepsCheckbox() {
    //debugger;
    if (this.tblworkflowstepssource.settings['selectMode'] == 'multi') this.tblworkflowstepssource.settings['selectMode'] = 'single';
    else
      this.tblworkflowstepssource.settings['selectMode'] = 'multi';
    this.tblworkflowstepssource.initGrid();
  }
  deleteworkflowstepsAll() {
    this.tblworkflowstepssource.settings['selectMode'] = 'single';
  }
  showworkflowstepsFilter() {
    if (!this.bfilterPopulateworkflowsteps) {
      setTimeout(() => {
        this.bfilterPopulateworkflowsteps = !this.bfilterPopulateworkflowsteps;
        this.SetworkflowstepsTableddConfig();
      });
    }
    if (this.tblworkflowstepssource.settings != null) this.tblworkflowstepssource.settings['hideSubHeader'] = !this.tblworkflowstepssource.settings['hideSubHeader'];
    this.tblworkflowstepssource.initGrid();
  }
  showworkflowstepsInActive() {
  }
  enableworkflowstepsInActive() {
  }
  async SetworkflowstepsTableddConfig() {

    this.bousermasterservice.getbousermastersList().then(res => {
      var dataapprover2 = res as any;
      for (let i = 0; i < dataapprover2.length; i++) {
        var obj = { value: dataapprover2[i].userid, title: dataapprover2[i].username };
        this.dataworkflowstepsapprover3.push(obj);
      }
      var clone = this.clone(this.tblworkflowstepssource.settings);
      clone.columns['approver'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowstepsapprover3)), }, };
      clone.columns['approver'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowstepsapprover3)), }, };
      this.tblworkflowstepssource.settings = clone;
      this.tblworkflowstepssource.initGrid();
    });

    this.configservice.getList("workflowapprovertype").then(res => {
      var dataapprovertype2 = res as any;
      for (let i = 0; i < dataapprovertype2.length; i++) {
        var obj = { value: dataapprovertype2[i].configkey, title: dataapprovertype2[i].configtext };
        this.dataworkflowstepsapprovertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowstepssource.settings);
      clone.columns['approvertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowstepsapprovertype3)), }, };
      clone.columns['approvertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowstepsapprovertype3)), }, };
      this.tblworkflowstepssource.settings = clone;
      this.tblworkflowstepssource.initGrid();
    });

    this.bouserrolemasterservice.getbouserrolemastersList().then(res => {
      var dataapproverusertype2 = res as any;
      for (let i = 0; i < dataapproverusertype2.length; i++) {
        var obj = { value: dataapproverusertype2[i].userroleid, title: dataapproverusertype2[i].userrole };
        this.dataworkflowstepsapproverusertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowstepssource.settings);
      clone.columns['approverusertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowstepsapproverusertype3)), }, };
      clone.columns['approverusertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowstepsapproverusertype3)), }, };
      this.tblworkflowstepssource.settings = clone;
      this.tblworkflowstepssource.initGrid();
    });
  }
  SetworkflowstepsTableConfig() {
    this.workflowstepssettings = {
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
        stepno: {
          title: 'Step No',
          type: 'number',
          filter: true,
        },
        duedays: {
          title: 'Due Days',
          type: 'number',
          filter: true,
        },
        approver: {
          title: 'Approver',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowstepsapprover3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        approvertype: {
          title: 'Approver Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowstepsapprovertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        approverusertype: {
          title: 'Approver User Type',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowstepsapproverusertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
      },
    };
  }
  workflowstepsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.workflowstepsID) >= 0) {
      this.workflowstepssource = new LocalDataSource();
      this.workflowstepssource.load(this.workflowmasterservice.workflowsteps as any as LocalDataSource);
      this.workflowstepssource.setPaging(1, 20, true);
    }
  }
  workflowstepsroute(event, action) {
    this.tblworkflowstepssource.grid.createFormShown = true;
    this.tblworkflowstepssource.grid.getNewRow();
  }
  workflowstepsPaging(val) {
    //debugger;
    this.workflowstepssource.setPaging(1, val, true);
  }
  handleworkflowstepsGridSelected(event) {
  }
  IsworkflowstepsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.workflowstepsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes workflowsteps
  //start of Grid Codes workflows
  workflowssettings: any;
  workflowssource: any;

  showworkflowsCheckbox() {
    //debugger;
    if (this.tblworkflowssource.settings['selectMode'] == 'multi') this.tblworkflowssource.settings['selectMode'] = 'single';
    else
      this.tblworkflowssource.settings['selectMode'] = 'multi';
    this.tblworkflowssource.initGrid();
  }
  deleteworkflowsAll() {
    this.tblworkflowssource.settings['selectMode'] = 'single';
  }
  showworkflowsFilter() {
    if (!this.bfilterPopulateworkflows) {
      setTimeout(() => {
        this.bfilterPopulateworkflows = !this.bfilterPopulateworkflows;
        this.SetworkflowsTableddConfig();
      });
    }
    if (this.tblworkflowssource.settings != null) this.tblworkflowssource.settings['hideSubHeader'] = !this.tblworkflowssource.settings['hideSubHeader'];
    this.tblworkflowssource.initGrid();
  }
  showworkflowsInActive() {
  }
  enableworkflowsInActive() {
  }
  async SetworkflowsTableddConfig() {

    this.bousermasterservice.getbousermastersList().then(res => {
      var datacurrentapprover2 = res as any;
      for (let i = 0; i < datacurrentapprover2.length; i++) {
        var obj = { value: datacurrentapprover2[i].userid, title: datacurrentapprover2[i].username };
        this.dataworkflowscurrentapprover3.push(obj);
      }
      var clone = this.clone(this.tblworkflowssource.settings);
      clone.columns['currentapprover'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowscurrentapprover3)), }, };
      clone.columns['currentapprover'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowscurrentapprover3)), }, };
      this.tblworkflowssource.settings = clone;
      this.tblworkflowssource.initGrid();
    });

    this.configservice.getList("workflowapprovertype").then(res => {
      var datacurrentapprovertype2 = res as any;
      for (let i = 0; i < datacurrentapprovertype2.length; i++) {
        var obj = { value: datacurrentapprovertype2[i].configkey, title: datacurrentapprovertype2[i].configtext };
        this.dataworkflowscurrentapprovertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowssource.settings);
      clone.columns['currentapprovertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowscurrentapprovertype3)), }, };
      clone.columns['currentapprovertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowscurrentapprovertype3)), }, };
      this.tblworkflowssource.settings = clone;
      this.tblworkflowssource.initGrid();
    });

    this.bouserrolemasterservice.getbouserrolemastersList().then(res => {
      var datacurrentapproverusertype2 = res as any;
      for (let i = 0; i < datacurrentapproverusertype2.length; i++) {
        var obj = { value: datacurrentapproverusertype2[i].userroleid, title: datacurrentapproverusertype2[i].userrole };
        this.dataworkflowscurrentapproverusertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowssource.settings);
      clone.columns['currentapproverusertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowscurrentapproverusertype3)), }, };
      clone.columns['currentapproverusertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowscurrentapproverusertype3)), }, };
      this.tblworkflowssource.settings = clone;
      this.tblworkflowssource.initGrid();
    });

    this.bousermasterservice.getbousermastersList().then(res => {
      var datanextapprover2 = res as any;
      for (let i = 0; i < datanextapprover2.length; i++) {
        var obj = { value: datanextapprover2[i].userid, title: datanextapprover2[i].username };
        this.dataworkflowsnextapprover3.push(obj);
      }
      var clone = this.clone(this.tblworkflowssource.settings);
      clone.columns['nextapprover'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowsnextapprover3)), }, };
      clone.columns['nextapprover'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowsnextapprover3)), }, };
      this.tblworkflowssource.settings = clone;
      this.tblworkflowssource.initGrid();
    });

    this.configservice.getList("workflowapprovertype").then(res => {
      var datanextapprovertype2 = res as any;
      for (let i = 0; i < datanextapprovertype2.length; i++) {
        var obj = { value: datanextapprovertype2[i].configkey, title: datanextapprovertype2[i].configtext };
        this.dataworkflowsnextapprovertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowssource.settings);
      clone.columns['nextapprovertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowsnextapprovertype3)), }, };
      clone.columns['nextapprovertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowsnextapprovertype3)), }, };
      this.tblworkflowssource.settings = clone;
      this.tblworkflowssource.initGrid();
    });

    this.bouserrolemasterservice.getbouserrolemastersList().then(res => {
      var datanextapproverusertype2 = res as any;
      for (let i = 0; i < datanextapproverusertype2.length; i++) {
        var obj = { value: datanextapproverusertype2[i].userroleid, title: datanextapproverusertype2[i].userrole };
        this.dataworkflowsnextapproverusertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowssource.settings);
      clone.columns['nextapproverusertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowsnextapproverusertype3)), }, };
      clone.columns['nextapproverusertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowsnextapproverusertype3)), }, };
      this.tblworkflowssource.settings = clone;
      this.tblworkflowssource.initGrid();
    });

    this.configservice.getList("workflowstatus").then(res => {
      var datastatus2 = res as any;
      for (let i = 0; i < datastatus2.length; i++) {
        var obj = { value: datastatus2[i].configkey, title: datastatus2[i].configtext };
        this.dataworkflowsstatus3.push(obj);
      }
      var clone = this.clone(this.tblworkflowssource.settings);
      clone.columns['status'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowsstatus3)), }, };
      clone.columns['status'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowsstatus3)), }, };
      this.tblworkflowssource.settings = clone;
      this.tblworkflowssource.initGrid();
    });
  }
  SetworkflowsTableConfig() {
    this.workflowssettings = {
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
        currentstepno: {
          title: 'Current Step No',
          type: 'number',
          filter: true,
        },
        pkvalue: {
          title: 'P K',
          type: 'number',
          filter: true,
        },
        currentapprover: {
          title: 'Current Approver',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowscurrentapprover3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        currentapprovertype: {
          title: 'Current Approver Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowscurrentapprovertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        currentapproverusertype: {
          title: 'Current Approver User Type',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowscurrentapproverusertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        currentapproved: {
          title: 'Current Approved',
          type: 'number',
          filter: true,
        },
        nextapprover: {
          title: 'Next Approver',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowsnextapprover3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        nextapprovertype: {
          title: 'Next Approver Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowsnextapprovertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        nextapproverusertype: {
          title: 'Next Approver User Type',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowsnextapproverusertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
      },
    };
  }
  workflowsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.workflowsID) >= 0) {
      this.workflowssource = new LocalDataSource();
      this.workflowssource.load(this.workflowmasterservice.workflows as any as LocalDataSource);
      this.workflowssource.setPaging(1, 20, true);
    }
  }
  workflowsroute(event, action) {
    this.tblworkflowssource.grid.createFormShown = true;
    this.tblworkflowssource.grid.getNewRow();
  }
  workflowsPaging(val) {
    //debugger;
    this.workflowssource.setPaging(1, val, true);
  }
  handleworkflowsGridSelected(event) {
  }
  IsworkflowsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.workflowsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes workflows
  //start of Grid Codes workflowhistories
  workflowhistoriessettings: any;
  workflowhistoriessource: any;

  showworkflowhistoriesCheckbox() {
    //debugger;
    if (this.tblworkflowhistoriessource.settings['selectMode'] == 'multi') this.tblworkflowhistoriessource.settings['selectMode'] = 'single';
    else
      this.tblworkflowhistoriessource.settings['selectMode'] = 'multi';
    this.tblworkflowhistoriessource.initGrid();
  }
  deleteworkflowhistoriesAll() {
    this.tblworkflowhistoriessource.settings['selectMode'] = 'single';
  }
  showworkflowhistoriesFilter() {
    if (!this.bfilterPopulateworkflowhistories) {
      setTimeout(() => {
        this.bfilterPopulateworkflowhistories = !this.bfilterPopulateworkflowhistories;
        this.SetworkflowhistoriesTableddConfig();
      });
    }
    if (this.tblworkflowhistoriessource.settings != null) this.tblworkflowhistoriessource.settings['hideSubHeader'] = !this.tblworkflowhistoriessource.settings['hideSubHeader'];
    this.tblworkflowhistoriessource.initGrid();
  }
  showworkflowhistoriesInActive() {
  }
  enableworkflowhistoriesInActive() {
  }
  async SetworkflowhistoriesTableddConfig() {

    this.bousermasterservice.getbousermastersList().then(res => {
      var datacurrentapprover2 = res as any;
      for (let i = 0; i < datacurrentapprover2.length; i++) {
        var obj = { value: datacurrentapprover2[i].userid, title: datacurrentapprover2[i].username };
        this.dataworkflowhistoriescurrentapprover3.push(obj);
      }
      var clone = this.clone(this.tblworkflowhistoriessource.settings);
      clone.columns['currentapprover'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriescurrentapprover3)), }, };
      clone.columns['currentapprover'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriescurrentapprover3)), }, };
      this.tblworkflowhistoriessource.settings = clone;
      this.tblworkflowhistoriessource.initGrid();
    });

    this.configservice.getList("workflowapprovertype").then(res => {
      var datacurrentapprovertype2 = res as any;
      for (let i = 0; i < datacurrentapprovertype2.length; i++) {
        var obj = { value: datacurrentapprovertype2[i].configkey, title: datacurrentapprovertype2[i].configtext };
        this.dataworkflowhistoriescurrentapprovertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowhistoriessource.settings);
      clone.columns['currentapprovertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriescurrentapprovertype3)), }, };
      clone.columns['currentapprovertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriescurrentapprovertype3)), }, };
      this.tblworkflowhistoriessource.settings = clone;
      this.tblworkflowhistoriessource.initGrid();
    });

    this.bouserrolemasterservice.getbouserrolemastersList().then(res => {
      var datacurrentapproverusertype2 = res as any;
      for (let i = 0; i < datacurrentapproverusertype2.length; i++) {
        var obj = { value: datacurrentapproverusertype2[i].userroleid, title: datacurrentapproverusertype2[i].userrole };
        this.dataworkflowhistoriescurrentapproverusertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowhistoriessource.settings);
      clone.columns['currentapproverusertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriescurrentapproverusertype3)), }, };
      clone.columns['currentapproverusertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriescurrentapproverusertype3)), }, };
      this.tblworkflowhistoriessource.settings = clone;
      this.tblworkflowhistoriessource.initGrid();
    });

    this.bousermasterservice.getbousermastersList().then(res => {
      var datanextapprover2 = res as any;
      for (let i = 0; i < datanextapprover2.length; i++) {
        var obj = { value: datanextapprover2[i].userid, title: datanextapprover2[i].username };
        this.dataworkflowhistoriesnextapprover3.push(obj);
      }
      var clone = this.clone(this.tblworkflowhistoriessource.settings);
      clone.columns['nextapprover'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriesnextapprover3)), }, };
      clone.columns['nextapprover'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriesnextapprover3)), }, };
      this.tblworkflowhistoriessource.settings = clone;
      this.tblworkflowhistoriessource.initGrid();
    });

    this.configservice.getList("workflowapprovertype").then(res => {
      var datanextapprovertype2 = res as any;
      for (let i = 0; i < datanextapprovertype2.length; i++) {
        var obj = { value: datanextapprovertype2[i].configkey, title: datanextapprovertype2[i].configtext };
        this.dataworkflowhistoriesnextapprovertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowhistoriessource.settings);
      clone.columns['nextapprovertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriesnextapprovertype3)), }, };
      clone.columns['nextapprovertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriesnextapprovertype3)), }, };
      this.tblworkflowhistoriessource.settings = clone;
      this.tblworkflowhistoriessource.initGrid();
    });

    this.bouserrolemasterservice.getbouserrolemastersList().then(res => {
      var datanextapproverusertype2 = res as any;
      for (let i = 0; i < datanextapproverusertype2.length; i++) {
        var obj = { value: datanextapproverusertype2[i].userroleid, title: datanextapproverusertype2[i].userrole };
        this.dataworkflowhistoriesnextapproverusertype3.push(obj);
      }
      var clone = this.clone(this.tblworkflowhistoriessource.settings);
      clone.columns['nextapproverusertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriesnextapproverusertype3)), }, };
      clone.columns['nextapproverusertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriesnextapproverusertype3)), }, };
      this.tblworkflowhistoriessource.settings = clone;
      this.tblworkflowhistoriessource.initGrid();
    });

    this.configservice.getList("workflowstatus").then(res => {
      var datastatus2 = res as any;
      for (let i = 0; i < datastatus2.length; i++) {
        var obj = { value: datastatus2[i].configkey, title: datastatus2[i].configtext };
        this.dataworkflowhistoriesstatus3.push(obj);
      }
      var clone = this.clone(this.tblworkflowhistoriessource.settings);
      clone.columns['status'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriesstatus3)), }, };
      clone.columns['status'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataworkflowhistoriesstatus3)), }, };
      this.tblworkflowhistoriessource.settings = clone;
      this.tblworkflowhistoriessource.initGrid();
    });
  }
  SetworkflowhistoriesTableConfig() {
    this.workflowhistoriessettings = {
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
        workflowid: {
          title: 'Work Flow',
          type: 'number',
          filter: true,
        },
        currentstepno: {
          title: 'Current Step No',
          type: 'number',
          filter: true,
        },
        pkvalue: {
          title: 'P K',
          type: 'number',
          filter: true,
        },
        currentapprover: {
          title: 'Current Approver',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowhistoriescurrentapprover3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        currentapprovertype: {
          title: 'Current Approver Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowhistoriescurrentapprovertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        currentapproverusertype: {
          title: 'Current Approver User Type',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowhistoriescurrentapproverusertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        currentapproved: {
          title: 'Current Approved',
          type: 'number',
          filter: true,
        },
        nextapprover: {
          title: 'Next Approver',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowhistoriesnextapprover3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        nextapprovertype: {
          title: 'Next Approver Type',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowhistoriesnextapprovertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        nextapproverusertype: {
          title: 'Next Approver User Type',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.dataworkflowhistoriesnextapproverusertype3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
      },
    };
  }
  workflowhistoriesLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.workflowhistoriesID) >= 0) {
      this.workflowhistoriessource = new LocalDataSource();
      this.workflowhistoriessource.load(this.workflowmasterservice.workflowhistories as any as LocalDataSource);
      this.workflowhistoriessource.setPaging(1, 20, true);
    }
  }
  workflowhistoriesroute(event, action) {
    this.tblworkflowhistoriessource.grid.createFormShown = true;
    this.tblworkflowhistoriessource.grid.getNewRow();
  }
  workflowhistoriesPaging(val) {
    //debugger;
    this.workflowhistoriessource.setPaging(1, val, true);
  }
  handleworkflowhistoriesGridSelected(event) {
  }
  IsworkflowhistoriesVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.workflowhistoriesID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes workflowhistories

}



