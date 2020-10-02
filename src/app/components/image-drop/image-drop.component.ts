import { Component, OnInit } from '@angular/core';
import { FileSystemFileEntry } from 'ngx-file-drop';
import { ToolBarService } from 'src/app/services/tool-bar.service';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-image-drop',
  templateUrl: './image-drop.component.html',
  styleUrls: ['./image-drop.component.scss']
})
export class ImageDropComponent implements OnInit {

  public imageUrls = new Array<SafeUrl>();

  private lastObjectUrl: string;


  constructor(private toolBarService: ToolBarService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  public dropped(files: any) {
    if (files[0].fileEntry) {
      var file = files[0].fileEntry as FileSystemFileEntry
      file.file((file: File) => {
        console.log(file)
        if (this.lastObjectUrl) {
          URL.revokeObjectURL(this.lastObjectUrl);
        }
        this.lastObjectUrl = URL.createObjectURL(file);
        this.toolBarService.updateImage(this.lastObjectUrl);
      })
    } else {
      if (this.lastObjectUrl) {
        URL.revokeObjectURL(this.lastObjectUrl);
      }
      this.lastObjectUrl = URL.createObjectURL(files[0]);
      this.toolBarService.updateImage(this.lastObjectUrl);
    }
    this.imageUrls.unshift(
      this.sanitizer.bypassSecurityTrustUrl(this.lastObjectUrl)
    );
  }
}
