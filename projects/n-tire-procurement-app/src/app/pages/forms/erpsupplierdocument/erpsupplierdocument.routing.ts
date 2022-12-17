import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsupplierdocumentComponent } from './erpsupplierdocument.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsupplierdocuments',children: [
{ path: '', component: erpsupplierdocumentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsupplierdocumentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
