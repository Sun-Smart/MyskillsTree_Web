import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bosubconfigvalueComponent } from './bosubconfigvalue.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bosubconfigvalues',children: [
{ path: '', component: bosubconfigvalueComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bosubconfigvalueComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
