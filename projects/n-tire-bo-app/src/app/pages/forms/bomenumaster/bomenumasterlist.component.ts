import { bomenumaster } from '../../../../../../n-tire-bo-app/src/app/model/bomenumaster.model';
import { bomenumasterService } from '../../../../../../n-tire-bo-app/src/app/service/bomenumaster.service';
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-bomenumasterList',
  templateUrl: './bomenumasterList.component.html',
  styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class bomenumasterListComponent implements OnInit {
  @ViewChild('tblbomenumasterssource', { static: false }) tblbomenumasterssource: Ng2SmartTableComponent; data3: any = [];
  bfilterPopulatebomenumasters: boolean = false;
  databomenumastersparentid3: any = [];
  data: any;
  bomenumasterssettings: any;
  bomenumasterssource: any;

  showbomenumastersCheckbox() {
    //debugger;
    if (this.tblbomenumasterssource.settings['selectMode'] == 'multi') this.tblbomenumasterssource.settings['selectMode'] = 'single';
    else
      this.tblbomenumasterssource.settings['selectMode'] = 'multi';
    this.tblbomenumasterssource.initGrid();
  }
  deletebomenumastersAll() {
    this.tblbomenumasterssource.settings['selectMode'] = 'single';
  }
  showbomenumastersFilter() {
    if (!this.bfilterPopulatebomenumasters) {
      setTimeout(() => {
        this.bfilterPopulatebomenumasters = !this.bfilterPopulatebomenumasters;
        this.SetbomenumastersTableddConfig();
      });
    }
    if (this.tblbomenumasterssource.settings != null) this.tblbomenumasterssource.settings['hideSubHeader'] = !this.tblbomenumasterssource.settings['hideSubHeader'];
    this.tblbomenumasterssource.initGrid();
  }
  showbomenumastersInActive() {
  }
  enablebomenumastersInActive() {
  }
  async SetbomenumastersTableddConfig() {

    this.bomenumasterservice.getbomenumastersList().then((res:any) => {
      var dataparentid2 = res as any;
      for (let i = 0; i < dataparentid2.length; i++) {
        var obj = { value: dataparentid2[i].menuid, title: dataparentid2[i].menudescription };
        this.databomenumastersparentid3.push(obj);
      }
      var clone = this.clone(this.tblbomenumasterssource.settings);
      clone.columns['parentid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databomenumastersparentid3)), }, };
      clone.columns['parentid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.databomenumastersparentid3)), }, };
      this.tblbomenumasterssource.settings = clone;
      this.tblbomenumasterssource.initGrid();
    });
  }
  SetbomenumastersTableConfig() {
    this.bomenumasterssettings = {
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
        menudescription: {
          title: 'Menu Description',
          type: '',
          filter: true,
        },
        menuurl: {
          title: 'Menu U R L',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        iconname: {
          title: 'Icon Name',
          type: '',
          filter: true,
        },
        helpurl: {
          title: 'Help U R L',
          type: 'string',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        parentid: {
          title: 'Parent',
          type: 'number',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell) => {
            var element = this.databomenumastersparentid3.find(c => c.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        orderno: {
          title: 'Order No',
          type: 'number',
          filter: true,
        },
      },
    };
  }
  bomenumastersLoadTable() {
    this.bomenumasterservice.getbomenumastersList().then((data) => {
      //debugger;
      this.bomenumasterservice.list = data as bomenumaster[];
      this.bomenumasterssource = new LocalDataSource();
      this.bomenumasterssource.load(this.bomenumasterservice.list as any as LocalDataSource);
      this.bomenumasterssource.setPaging(1, 20, true);
    });
  }
  bomenumastersroute(event, action) {
    this.tblbomenumasterssource.grid.createFormShown = true;
    this.tblbomenumasterssource.grid.getNewRow();
  }
  bomenumastersPaging(val) {
    //debugger;
    this.bomenumasterssource.setPaging(1, val, true);
  }
  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private bomenumasterservice: bomenumasterService,
    private toastr: ToastService,
    private configservice: boconfigvalueService,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    public dialogRef: DynamicDialogRef) {
  }

  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
  onSubmit() {
    //debugger;
    this.bomenumasterservice.saveOrUpdatebomenumastersList().subscribe(
      (res:any) => {
        //debugger;
        this.toastr.addSingle("success", "", "Successfully saved");

      },
      (err:any) => {
        //debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  } ngOnInit() {
    this.SetbomenumastersTableConfig();
    this.bomenumastersLoadTable();
    setTimeout(() => {
      this.bfilterPopulatebomenumasters = !this.bfilterPopulatebomenumasters;
      this.SetbomenumastersTableddConfig();
    });
  }

  populateForm(pd: bomenumaster) {
    if (this.data.ScreenType == 1 || this.data.ScreenType == 2) {
      this.dialogRef.close(pd);
    }
    else {
      this.bomenumasterservice.formData = Object.assign({}, pd);
    }
    // 

  }


}

