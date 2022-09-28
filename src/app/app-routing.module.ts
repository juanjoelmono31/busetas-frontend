import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent } from './page/vehiculos/vehiculos.component';
import { ConductorComponent } from './page/conductor/conductor.component';
import { ControlVehiculosComponent } from './page/control-vehiculos/control-vehiculos.component';
import { ListCoductoresComponent } from './page/list-coductores/list-coductores.component';
import { ListVehiculosComponent } from './page/list-vehiculos/list-vehiculos/list-vehiculos.component';
import { LoginComponent } from './page/login/login/login.component';
import { DashBoardComponent } from './page/dash-board/dash-board.component';
import { ConfigVariablesComponent } from './page/config-variables/config-variables/config-variables.component';
import { RodamientosComponent } from './page/rodamientos/rodamientos/rodamientos.component';
import { CalendarioComponent } from './page/calendario/calendario.component';
import { ListRodaminetoComponent } from './page/list-rodamineto/list-rodamineto.component';

const routes: Routes = [
  
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashBoardComponent},
  {path:'vehiculos', component:VehiculosComponent},
  {path: 'conductor', component: ConductorComponent},
  //{path: 'control', component: ControlVehiculosComponent},
  {path: 'lista', component: ListCoductoresComponent},
  {path: 'listavehiculos', component: ListVehiculosComponent},
  {path: 'variables', component: ConfigVariablesComponent},
  //{path: 'rodamiento', component: RodamientosComponent},
  {path: 'calendario', component: CalendarioComponent},/*  */
  {path: 'listarodamiento', component: ListRodaminetoComponent},/*  */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
