// dragdrop.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent {
  propietarios: string[] = ['Propietario 1', 'Propietario 2', 'Propietario 3'];
  vehiculos: string[] = ['Vehículo 1', 'Vehículo 2', 'Vehículo 3'];
  agregados: string[] = [];

  onDrop(event: any, list: string[]): void {
    const data = event.dataTransfer.getData('text/plain');
    const index = list.indexOf(data);

    if (index === -1) {
      list.push(data);
      this.removeFromAgregados(data);
    }
  }

  removeFromAgregados(data: string): void {
    const index = this.agregados.indexOf(data);

    if (index !== -1) {
      this.agregados.splice(index, 1);
    }
  }

  onDragStart(event: any, data: string): void {
    event.dataTransfer.setData('text/plain', data);
  }

  onAgregar(): void {
    if (this.agregados.length > 0) {
      this.propietarios = this.propietarios.concat(this.agregados);
      this.agregados = [];
    }
  }

  onDragOver(event: any): void {
    event.preventDefault();
  }
}
