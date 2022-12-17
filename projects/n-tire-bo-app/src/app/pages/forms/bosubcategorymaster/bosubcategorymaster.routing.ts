import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bosubcategorymasterComponent } from './bosubcategorymaster.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bosubcategorymasters',children: [
{ path: '', component: bosubcategorymasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bosubcategorymasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
