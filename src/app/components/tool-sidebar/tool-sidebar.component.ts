import { Component, OnInit } from '@angular/core';
import { ToolBarService } from 'src/app/services/tool-bar.service';

@Component({
  selector: 'app-tool-sidebar',
  templateUrl: './tool-sidebar.component.html',
  styleUrls: ['./tool-sidebar.component.scss']
})
export class ToolSidebarComponent implements OnInit {
  public rowColor: any;
  public colColor: any;
  public btnTextColor: any;
  public btnColor: any;
  public dividerColor: any;
  public bodyColor: any;
  public btnActionType = 'openWeb';
  public phoneBtn: any;
  constructor(public toolBarService: ToolBarService) {
  }

  ngOnInit(): void { }

  updateBodyColor(e: Event) {
    document.getElementById('emailTemplateHTML').style.backgroundColor = e + '';
    document.getElementById('mainTemplateBody').style.backgroundColor = e + '';
  }

  bodyWidth(s: string) {
    var btn = document.getElementById('mainTemplateBody');
    var style = window.getComputedStyle(btn);
    if (s == 'add') {
      btn.style.paddingLeft = parseInt(style.paddingLeft.split('px')[0]) - 20 + 'px';
      btn.style.paddingRight = parseInt(style.paddingRight.split('px')[0]) - 20 + 'px';
    }
    if (s == 'sub') {
      btn.style.paddingRight = parseInt(style.paddingRight.split('px')[0]) + 20 + 'px';
      btn.style.paddingLeft = parseInt(style.paddingLeft.split('px')[0]) + 20 + 'px';
    }
  }

  resize(e: Event) {
    console.log(e);
  }

}
