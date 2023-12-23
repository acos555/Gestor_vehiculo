import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProcesoService } from '../../service/procesos/proceso.service';
import { CreatePropietarioComponent } from './create-propietario/create-propietario.component';
import { EditPropietarioComponent } from './edit-propietario/edit-propietario.component';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.css'
})
export class PropietarioComponent implements OnInit {

  lista_propietarios: any[] = []

  displayedColumns: string[] = ['identificacion', 'nombre', 'apellido', 'fecha_nacimiento', 'direccion', 'telefono','email','acciones'];
  data_source_procesos = new MatTableDataSource(this.lista_propietarios);
  @ViewChild('paginator_process', { static: false }) paginator_process !: MatPaginator;
  @ViewChild('process_sort', { static: true }) process_sort !: MatSort;

  apply_filter_process(event: any){
    const filterValue = event.target.value;
    this.data_source_procesos.filter = filterValue.trim().toLowerCase();
  }

  constructor(private proceso: ProcesoService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.get_propietarios();
  }

  get_propietarios() {
    let sub1: Subscription = this.proceso.get_propietarios().subscribe((propietarios: any) => {
        this.lista_propietarios = propietarios;
        this.data_source_procesos.data = this.lista_propietarios;
        this.data_source_procesos.paginator = this.paginator_process;
        this.data_source_procesos.sort = this.process_sort;
        sub1.unsubscribe();
    })
  }

  create_propietario() {
    let sub: Subscription = this.dialog.open(CreatePropietarioComponent, {
      width: '70vw',
      disableClose: false,
    }).afterClosed().subscribe(_result => {
      sub.unsubscribe();
      this.get_propietarios();
    });
  }

  eliminarPropietario(id: number) {
    let sub: Subscription = this.proceso.delete_propietario(id).subscribe((res: any) => {
      sub.unsubscribe();
      this.get_propietarios();
    });
  }

  editarPropietario(id: number) {
    this.proceso.set_identificacion(id);
    let sub: Subscription = this.dialog.open(EditPropietarioComponent, {
      width: '70vw',
      disableClose: false,
      }).afterClosed().subscribe(_result => {
        sub.unsubscribe();
        this.get_propietarios();
    });
  }

}
