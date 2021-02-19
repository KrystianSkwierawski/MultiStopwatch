import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    DragDropModule,
    MatProgressSpinnerModule,
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
