import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { SecondsToHHMMSSPipe } from './pipes/seconds-to-hhmmss.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { TypeofPipe } from './pipes/typeof.pipe.';
import { ConfirmDeleteDialogComponent } from './utilities/confirm-delete-dialog/confirm-delete-dialog.component';
import { ErrorMessageComponent } from './utilities/error-message/error-message.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { ItemsStatusSelectorComponent } from './utilities/items-status-selector/items-status-selector.component';
import { PaginatorComponent } from './utilities/paginator/paginator.component';
import { SearchItemByTitleComponent } from './utilities/search-item-by-title/search-item-by-title.component';
import { ThemeSelectorComponent } from './utilities/theme-selector/theme-selector.component';


@NgModule({
  declarations: [
    GenericListComponent,
    SearchItemByTitleComponent,
    PaginatorComponent,
    ConfirmDeleteDialogComponent,
    ThemeSelectorComponent,
    ShortenPipe,
    TypeofPipe,
    ItemsStatusSelectorComponent,
    SecondsToHHMMSSPipe,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    GenericListComponent,
    SearchItemByTitleComponent,
    PaginatorComponent,
    ConfirmDeleteDialogComponent,
    ThemeSelectorComponent,
    ShortenPipe,
    TypeofPipe,
    ItemsStatusSelectorComponent,
    SecondsToHHMMSSPipe,
    ErrorMessageComponent,
    MaterialModule
  ]
})
export class SharedModule { }
