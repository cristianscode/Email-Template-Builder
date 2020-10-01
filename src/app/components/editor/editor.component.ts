import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { ToolBarService } from 'src/app/services/tool-bar.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private selectedDraggable: string;
  public templateHTML: string;
  onDragStart(event: DragEvent) {
    event["path"].forEach(e => {
      if (e.id != undefined) { if (e.id.includes("draggableListItem")) this.selectedDraggable = e.id; }
    });
  }

  setIndex(num: string){
    document.getElementById("canvas").style.zIndex = num;
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {
      let index = event.index;
      if (typeof index === "undefined") index = list.length;
      var draggedElement = document.getElementById(this.selectedDraggable)
      var replaceElement = document.getElementById('draggableListItem' + index)
      this.toolBarService.dropped(this.selectedDraggable, index, draggedElement, replaceElement);
    }
  }


  ngOnInit(): void {
    var body = document.getElementById('mainTemplateBody');
    body.style.maxWidth = '1000px';
    body.style.width = '100%';
    body.style.marginRight = 'auto';
    body.style.marginLeft = 'auto';
    this.toolBarService.initColumn();
  }

  constructor(public toolBarService: ToolBarService) {}

  getHTML(bol: boolean) {
    this.templateHTML = this.toHTML();
  }


  preview() {
    var myWindow = window.open('', '_blank');
    var doc = myWindow.document;
    doc.open();
    doc.write(this.toHTML());
    doc.close();
  }

  toHTML(): string {
    var html = document.createElement("html") as HTMLElement;
    var head = document.createElement("head") as HTMLHeadElement;
    var body = document.createElement("body") as HTMLBodyElement;
    html.style.padding = '20px';
    html.style.backgroundColor = document.getElementById('emailTemplateHTML').style.backgroundColor;
    body.style.backgroundColor = document.getElementById('mainTemplateBody').style.backgroundColor;
    body.style.width = '100%';
    body.style.maxWidth = '1000px';
    body.style.paddingBottom = '25px';
    body.style.marginRight = 'auto';
    body.style.marginLeft = 'auto';
    html.lang = 'en';
    var meta1 = document.createElement('meta');
    var meta2 = document.createElement('meta');
    var style = document.createElement('style');
    meta1.setAttribute('charset', 'UTF-8');
    meta2.name = 'viewport';
    meta2.content = 'width=device-width, initial-scale=1.0';
    style.media
    head.innerHTML += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"> <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script> <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script> <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>' +
      "<style type='text/css'> h1{font-size: 5rem;} h2{font-size: 4rem;} h3{font-size: 3rem;} h4{font-size: 2.5rem;} " +
      "h5{font-size: 2rem;} h6{font-size: 1.75rem;} .row { display: flex; flex-wrap: wrap; margin-right: 0px; margin-left: 0px;}" +
      " .center { display: block; margin-left: auto; margin-right: auto; width: 50%;} .col-md-1 .col-md-2 .col-md-3 .col-md-4 " +
      " @media (min-width: 768px) { .col-md-12 { flex: 0 0 100%; max-width: 100%; } .col-md-6 { flex: 0 0 50%; max-width: 50%; } .col-md-4 { flex: 0 0 33.33333%; max-width: 33.33333%; } .col-md-3 { flex: 0 0 25%; max-width: 25%; } } " +
      " li{ list-style-type: none;} </style>"
    head.appendChild(meta1);
    head.appendChild(meta2);

    var htmlBody = document.getElementById('emailTemplateBody').children;
    for (let i = 0; i < htmlBody.length; i++) {
      var row = htmlBody[i].children[0];
      if (row && row.children[0].children[0].className != 'placeholder')
        body.innerHTML = body.innerHTML + htmlBody[i].innerHTML;
    }
    if (body.getElementsByClassName("html").length != 0) {
      for (let i = 0; i < body.getElementsByClassName("html").length; i++) {
        let id = body.getElementsByClassName("html")[i].id.split('html');
        console.log(document.getElementById(id[1] + 'htmlContainer').children[0].className)
        body.getElementsByClassName(document.getElementById(id[1] + 'htmlContainer').children[0].className)[0].replaceWith(body.getElementsByClassName("html")[i])
        body.getElementsByClassName('html')[i].setAttribute("contenteditable", "false")
      }
    }
    while (body.getElementsByClassName("re-button-tooltip").length != 0)
      body.getElementsByClassName('re-button-tooltip')[0].remove();
    html.appendChild(head);
    html.appendChild(body);
    return html.outerHTML;
  }

  public restart() {
    location.reload();
  }

}
