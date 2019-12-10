import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostEditorComponent } from './components/post-editor/post-editor.component';


const routes: Routes = [
  {
    path: 'edit',
    component: PostEditorComponent
  },
  {
    path: '',
    component: PostEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
