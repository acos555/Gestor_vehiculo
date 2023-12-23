import { Component } from '@angular/core';
import { ProcesoService } from '../../../service/procesos/proceso.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tipo',
  templateUrl: './create-tipo.component.html',
  styleUrl: './create-tipo.component.css'
})
export class CreateTipoComponent {

  form: FormGroup;

  constructor(
    private proceso: ProcesoService,
    private dialogRef: MatDialogRef<CreateTipoComponent>,
  
  ) {
    this.form = new FormGroup({
      tipo_vehiculo: new FormControl('', Validators.required),

    });
  }

  onSubmit() {
      let data : any = {
        tipo_vehiculo: this.form.get('tipo_vehiculo')?.value,
    }
    console.log(data);
    this.proceso.create_tipo_vehiculo(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
      });
  }

}
