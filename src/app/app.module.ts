import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';


import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './page/menu/menu.component';
import { ConductorComponent } from './page/conductor/conductor.component';
import { ControlVehiculosComponent } from './page/control-vehiculos/control-vehiculos.component';
import { VehiculosComponent } from './page/vehiculos/vehiculos.component';
import { ListCoductoresComponent } from './page/list-coductores/list-coductores.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardComponent } from './page/dash-board/dash-board.component';
import {MatCardModule} from '@angular/material/card';
import { ListVehiculosComponent } from './page/list-vehiculos/list-vehiculos/list-vehiculos.component';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './page/login/login/login.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConfigVariablesComponent } from './page/config-variables/config-variables/config-variables.component';
import { RodamientosComponent } from './page/rodamientos/rodamientos/rodamientos.component';
import { CalendarioComponent } from './page/calendario/calendario.component';
import { ListRodaminetoComponent } from './page/list-rodamineto/list-rodamineto.component';
import { InfoVehiculosComponent } from './page/info-vehiculos/info-vehiculos/info-vehiculos.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AsignarPicoPlacaComponent } from './page/asignar-pico-placa/asignar-pico-placa.component';
import { BryntumCalendarModule } from '@bryntum/calendar-angular';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ConductorComponent,
    ControlVehiculosComponent,
    VehiculosComponent,
    ListCoductoresComponent,
    DashBoardComponent,
    ListVehiculosComponent,
    LoginComponent,
    ConfigVariablesComponent,
    RodamientosComponent,
    CalendarioComponent,
    ListRodaminetoComponent,
    InfoVehiculosComponent,
    AsignarPicoPlacaComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
   
   
   

  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
