import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmslinkeddocumentComponent } from './dmslinkeddocument.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmslinkeddocuments',children: [
{ path: '', component: dmslinkeddocumentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmslinkeddocumentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
