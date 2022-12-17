import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { bomenumasterService } from '../../../../n-tire-biz-app/src/app/service/bomenumaster.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
    selector: 'ngx-pages',
    template: `
      <router-outlet></router-outlet>
  `,
})

export class PagesComponent implements OnInit {
    menu = [];
    menulist: MenuItem[];
    private menuService1: bomenumasterService;



    constructor(private menuService: bomenumasterService) {
        //debugger;
        // this.menuService.refreshList();
        // this.menulist=convert(this.menuService.list);

        /*
          //  //debugger;
            this.menuService.getbomenumastersList().then((res:any) => {
              ////debugger;
              this.menulist = convert(res);
            //  console.log(this.menulist);
            //  console.log(MENU_ITEMS);
             // this.nbmenuservice.addItems(MENU_ITEMS);
              this.nbmenuservice.addItems(this.menulist);
        
          //    //debugger;
             
            });
            
        */


    }
    ngOnInit(): void {
    }

}


function convert(array) {
    //  //debugger;
    var map = {};
    for (var i = 0; i < array.length; i++) {
        var obj: MenuItem;
        //obj = new MenuItem();
        obj.id = array[i].menuid;
        obj.label = array[i].menudescription;
        //  obj.icon = array[i].IconName;
        obj.url = array[i].menuurl;
        // obj.expanded = true;
        // obj.children = [];

        map[obj.id] = obj;

        var parent = array[i].parentid || '-';
        if (!map[parent]) {
            map[parent] = {
                children: []
            };
        }
        if (map[parent].children == undefined || map[parent].children == null) map[parent].children = [];
        map[parent].children.push(obj);
    }
    // //debugger;
    return map['-'].children;

}