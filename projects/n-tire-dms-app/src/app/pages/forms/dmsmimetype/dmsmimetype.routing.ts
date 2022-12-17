import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmsmimetypeComponent } from './dmsmimetype.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmsmimetypes',children: [
{ path: '', component: dmsmimetypeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmsmimetypeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
