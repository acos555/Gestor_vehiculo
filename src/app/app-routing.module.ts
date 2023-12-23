import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DragdropComponent } from './component/dragdrop/dragdrop.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dragdrop', component: DragdropComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
