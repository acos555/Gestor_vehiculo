import { Component, OnInit, ViewChild  } from '@angular/core';
import { ProcesoService } from '../../service/procesos/proceso.service';
import { MatDialog } from '@angular/material/dialog';
import { RouteConfigLoadStart } from '@angular/router';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CreateVehiculoComponent } from './create-vehiculo/create-vehiculo.component';
import { TipoVehiculoComponent } from '../tipo-vehiculo/tipo-vehiculo.component';
import { EditVehiculoComponent } from './edit-vehiculo/edit-vehiculo.component';
import { ViewVehiculoComponent } from './view-vehiculo/view-vehiculo.component';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.css'
})
export class VehiculoComponent implements OnInit{

  lista_vehiculos: any[] = []


  displayedColumns: string[] = ['placa', 'marca', 'vin', 'linea', 'cilindrada', 'chasis','tipo_vehiculo','acciones'];
  data_source_procesos = new MatTableDataSource(this.lista_vehiculos);
  @ViewChild('paginator_process', { static: false }) paginator_process !: MatPaginator;
  @ViewChild('process_sort', { static: false }) process_sort !: MatSort;

  apply_filter_process(event: any){
    const filterValue = event.target.value;
    this.data_source_procesos.filter = filterValue.trim().toLowerCase();
  }

  constructor(private proceso: ProcesoService, public dialog: MatDialog, private router: Router) {}
  
  ngOnInit(): void {
    this.get_vehiculos();
  }

  get_vehiculos() {
    let sub1: Subscription = this.proceso.get_vehiculos().subscribe((vehiculos: any) => {
        this.lista_vehiculos = vehiculos;
        this.data_source_procesos.data = this.lista_vehiculos;
        this.data_source_procesos.paginator = this.paginator_process;
        this.data_source_procesos.sort = this.process_sort;
        sub1.unsubscribe();
    });
  }

  create_vehiculo() {
    let sub: Subscription = this.dialog.open(CreateVehiculoComponent, {
      width: '70vw',
      disableClose: false,
    }).afterClosed().subscribe(_result => {
      sub.unsubscribe();
      this.get_vehiculos();
    });
  }

  editavehiculo(vehiculo: any) {
    this.proceso.set_placa(vehiculo);
    let sub: Subscription = this.dialog.open(EditVehiculoComponent, {
      width: '70vw',
      disableClose: false,
      data: vehiculo
    }).afterClosed().subscribe(_result => {
      sub.unsubscribe();
      this.get_vehiculos();
    });
  }

  viewvehiculo(vehiculo: any) {
    this.proceso.set_placa(vehiculo);
    let sub: Subscription = this.dialog.open(ViewVehiculoComponent, {
      width: '70vw',
      disableClose: false,
      data: vehiculo
    }).afterClosed().subscribe(_result => {
      sub.unsubscribe();
      this.get_vehiculos();
    });
  }

  tipo_vehiculo(){
    let sub: Subscription = this.dialog.open(TipoVehiculoComponent, {
      width: '40vw',
      disableClose: false,
    }).afterClosed().subscribe(_result => {
      sub.unsubscribe();
      this.get_vehiculos();
    });
  }

  delete_vehiculo(vehiculo: any) {
    let sub: Subscription = this.proceso.delete_vehiculo(vehiculo).subscribe((res: any) => {
      sub.unsubscribe();
      this.get_vehiculos();
    });
  }


}
