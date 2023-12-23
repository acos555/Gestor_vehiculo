import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProcesoService } from '../../service/procesos/proceso.service';
import { CreateTipoComponent } from './create-tipo/create-tipo.component';
import { EditTipoComponent } from './edit-tipo/edit-tipo.component';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrl: './tipo-vehiculo.component.css'
})
export class TipoVehiculoComponent implements OnInit {

  lista_tipo: any[] = []


  displayedColumns: string[] = ['id','tipo_vehiculo','acciones'];
  data_source_procesos = new MatTableDataSource(this.lista_tipo);
  @ViewChild('paginator_process', { static: false }) paginator_process !: MatPaginator;
  @ViewChild('process_sort', { static: false }) process_sort !: MatSort;

  apply_filter_process(event: any){
    const filterValue = event.target.value;
    this.data_source_procesos.filter = filterValue.trim().toLowerCase();
  }

  constructor(private proceso: ProcesoService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.get_tipo_vehiculo()
  }

  get_tipo_vehiculo() {
    let sub1: Subscription = this.proceso.get_tipo_vehiculo().subscribe((tipo: any) => {
        this.lista_tipo = tipo;
        this.data_source_procesos.data = this.lista_tipo;
        this.data_source_procesos.paginator = this.paginator_process;
        this.data_source_procesos.sort = this.process_sort;
        sub1.unsubscribe();
    })
  }

  create_tipo_vehiculo() {
    let sub: Subscription = this.dialog.open(CreateTipoComponent, {
      width: '30vw',
      disableClose: false,
    }).afterClosed().subscribe(_result => {
      sub.unsubscribe();
      this.get_tipo_vehiculo();
     
    })
  }

  editartipo(id: number) {
    this.proceso.set_tipo_vehiculo(id);
    let sub: Subscription = this.dialog.open(EditTipoComponent, {
      width: '70vw',
      disableClose: false,
      }).afterClosed().subscribe(_result => {
        sub.unsubscribe();
        this.get_tipo_vehiculo();
     })
    }

  eliminartipo(id: number) {
    let sub: Subscription = this.proceso.delete_tipo_vehiculo(id).subscribe((res: any) => {
      sub.unsubscribe();
      this.get_tipo_vehiculo();
    });
  }

}
