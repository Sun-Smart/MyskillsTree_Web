import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmsconfigComponent } from './dmsconfig.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmsconfigs',children: [
{ path: '', component: dmsconfigComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmsconfigComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
