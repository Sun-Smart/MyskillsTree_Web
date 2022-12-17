import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boreportcolumnComponent } from './boreportcolumn.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boreportcolumns',children: [
{ path: '', component: boreportcolumnComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boreportcolumnComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
