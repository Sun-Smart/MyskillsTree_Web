import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjconfigurationitemComponent } from './prjconfigurationitem.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjconfigurationitems',children: [
{ path: '', component: prjconfigurationitemComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjconfigurationitemComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
