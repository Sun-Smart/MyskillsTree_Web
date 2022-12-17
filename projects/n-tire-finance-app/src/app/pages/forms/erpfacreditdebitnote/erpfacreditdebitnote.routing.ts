import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfacreditdebitnoteComponent } from './erpfacreditdebitnote.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfacreditdebitnotes',children: [
{ path: '', component: erpfacreditdebitnoteComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfacreditdebitnoteComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
