import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { PropietarioComponent } from './component/propietario/propietario.component';
import { VehiculoComponent } from './component/vehiculo/vehiculo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from "@angular/material/card";
import { CreatePropietarioComponent } from './component/propietario/create-propietario/create-propietario.component';
import { EditPropietarioComponent } from './component/propietario/edit-propietario/edit-propietario.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { CreateVehiculoComponent } from './component/vehiculo/create-vehiculo/create-vehiculo.component';
import { EditVehiculoComponent } from './component/vehiculo/edit-vehiculo/edit-vehiculo.component';
import { TipoVehiculoComponent } from './component/tipo-vehiculo/tipo-vehiculo.component';
import { CreateTipoComponent } from './component/tipo-vehiculo/create-tipo/create-tipo.component';
import { EditTipoComponent } from './component/tipo-vehiculo/edit-tipo/edit-tipo.component';
import { ViewVehiculoComponent } from './component/vehiculo/view-vehiculo/view-vehiculo.component';
import { DragdropComponent } from './component/dragdrop/dragdrop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropietarioComponent,
    VehiculoComponent,
    CreatePropietarioComponent,
    EditPropietarioComponent,
    CreateVehiculoComponent,
    EditVehiculoComponent,
    TipoVehiculoComponent,
    CreateTipoComponent,
    EditTipoComponent,
    ViewVehiculoComponent,
    DragdropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    DragDropModule,
    
  ],
  providers: [
    provideClientHydration(),
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
