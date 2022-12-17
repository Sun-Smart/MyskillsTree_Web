import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bobarcodeComponent } from './bobarcode.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
path: 'bobarcodes',children: [
{ path: '', component: bobarcodeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bobarcodeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
