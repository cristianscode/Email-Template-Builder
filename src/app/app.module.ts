import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolSidebarComponent } from './components/tool-sidebar/tool-sidebar.component';
import { EditorComponent } from './components/editor/editor.component';

// NPM Modules
import { NgxFileDropModule } from 'ngx-file-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import { DndModule } from 'ngx-drag-drop';
import { ImageDropComponent } from './components/image-drop/image-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolSidebarComponent,
    EditorComponent,
    ImageDropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DndModule,
    ColorPickerModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
