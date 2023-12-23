import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProcesoService } from '../../service/procesos/proceso.service';
import { Subscription } from 'rxjs';
import { PropietarioComponent } from '../propietario/propietario.component';
import { VehiculoComponent } from '../vehiculo/vehiculo.component';
import { ChangeDetectorRef } from '@angular/core';
import { DragdropComponent } from '../dragdrop/dragdrop.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  lista_procesos: any[] = []

  displayedColumns: string[] = ['identificacion', 'nombre', 'apellido', 'placa','marca', 'color'];
  data_source_procesos = new MatTableDataSource(this.lista_procesos);
  @ViewChild('paginator_process', { static: false }) paginator_process !: MatPaginator;
  @ViewChild('process_sort', { static: true }) process_sort !: MatSort;


  apply_filter_process(event: any){
    const filterValue = event.target.value;
    this.data_source_procesos.filter = filterValue.trim().toLowerCase();
  }

  constructor(private proceso: ProcesoService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.get_propietarios_and_vehiculos();
  }

  get_propietarios_and_vehiculos() {
   let sub1: Subscription = this.proceso.get_datos_propietarios_vehiculos().subscribe((propietarios_vehiculos: any) => {
        this.lista_procesos = propietarios_vehiculos;
        this.data_source_procesos.data = this.lista_procesos;
        this.data_source_procesos.paginator = this.paginator_process;
        this.data_source_procesos.sort = this.process_sort;
        sub1.unsubscribe();
    })
  }


  propietario() {
    let sub: Subscription = this.dialog.open(PropietarioComponent,{
      width: '90vw',
      disableClose: false,
    }).afterClosed().subscribe(_result => {
      sub.unsubscribe();
      this.get_propietarios_and_vehiculos();
    });
  }

  vehiculo(){
    let sub: Subscription = this.dialog.open(VehiculoComponent,{
      width: '70vw',
      disableClose: false,
    }).afterClosed().subscribe(_result => {
      sub.unsubscribe();
      this.get_propietarios_and_vehiculos();
    });
  }

  dragdrop(){
    let sub: Subscription = this.dialog.open(DragdropComponent,{
      width: '100vw',
      disableClose: false,
      }).afterClosed().subscribe(_result => {
        sub.unsubscribe();
        this.get_propietarios_and_vehiculos();
      });
  }

}
