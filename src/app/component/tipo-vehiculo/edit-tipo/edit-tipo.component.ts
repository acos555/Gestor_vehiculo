import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../service/procesos/proceso.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrl: './edit-tipo.component.css'
})
export class EditTipoComponent implements OnInit {

  form: FormGroup;
  tipoid: number = 0;

  constructor(
    private proceso: ProcesoService,
    private dialogRef: MatDialogRef<EditTipoComponent>,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      id: new FormControl(this.tipoid, Validators.required),
      tipo_vehiculo: new FormControl('', Validators.required),
 
    });
  }

  ngOnInit(): void {
    this.get_data_tipo();
  }

  get_data_tipo() {
    this.tipoid = this.proceso.get_tipo_vehiculo_id()
    this.proceso.get_tipo_by_id(this.tipoid).subscribe(
      (response: any) => {
        this.form.patchValue(response);
    });
  }

  onSubmit() {
    let data: any = {
      id: this.form.get('id')?.value,
      tipo_vehiculo: this.form.get('tipo_vehiculo')?.value,
    };

    let sub: Subscription = this.proceso.update_tipo_vehiculo(this.tipoid, data).subscribe(
      (response: any) => {
        sub.unsubscribe();
        this.dialogRef.close();
      });
  }

}
