import { Injectable, Output, Renderer2, RendererFactory2 } from '@angular/core';
import Redactor from '../../assets/redactor/redactor.usm.min.js';
import '../../assets/redactor/_plugins/alignment/alignment.js';
import '../../assets/redactor/_plugins/table/table.js';
import '../../assets/redactor/_plugins/fontcolor/fontcolor.js';
import '../../assets/redactor/_plugins/fontsize/fontsize.js';
import '../../assets/redactor/_plugins/fontfamily/fontfamily.js';
import '../../assets/redactor/_plugins/imagemanager/imagemanager.js';
import '../../assets/redactor/_plugins/filemanager/filemanager.js';

@Injectable({
  providedIn: 'root'
})
export class ToolBarService {
  public draggableItems = [{
    content: '',
    effectAllowed: "move",
    disable: false,
    handle: false,
  }];
  public numRows = 0;
  public selectedRow: string;
  public selectedCol: string;
  public selectedItem: string;
  public type: string;
  private renderer: Renderer2
  public textSelected = null;

  // Init's
  public initButton() {
    if (this.selectedCol != null && this.selectedRow != null) {
      this.replaceFromBody(
        this.selectedRow + '' + this.selectedCol + this.type,
        this.newButton(this.selectedRow + this.selectedCol)
      );
    } else {
      var row = this.newRow();
      row.id = 'CriRow' + this.numRows++;
      var col = document.createElement('div');
      col.className = 'col-md-12';
      col.id = row.id + 'CriCol' + 1;
      col = this.columnStyling(col);
      col.appendChild(this.newButton(col.id));
      row.appendChild(col);
      this.addToBody(row);
    }
    this.selectedRow = null;
    this.selectedCol = null;
  }
  public initImage() {
    if (this.selectedCol != null && this.selectedRow != null) {
      this.replaceFromBody(
        this.selectedRow + '' + this.selectedCol + this.type,
        this.newImage('../../assets/placeholderImage.png', this.selectedRow + this.selectedCol)
      );
    } else {
      var row = this.newRow();
      row.id = 'CriRow' + this.numRows++;
      var col = document.createElement('div');
      col.className = 'col-md-12';
      col.id = row.id + 'CriCol' + 1;
      col.appendChild(this.newImage('../../assets/placeholderImage.png', col.id));
      col = this.columnStyling(col);
      row.appendChild(col);
      this.addToBody(row);
    }
    this.selectedRow = null;
    this.selectedCol = null;
  }

  public initDivider() {
    if (this.selectedCol != null && this.selectedRow != null) {
      this.replaceFromBody(
        this.selectedRow + '' + this.selectedCol + this.type,
        this.newDivider(this.selectedRow + this.selectedCol)
      );
    } else {
      var row = this.newRow();
      row.id = 'CriRow' + this.numRows++;
      var col = document.createElement('div');
      col.className = 'col-md-12';
      col.id = row.id + 'CriCol' + 1;
      col = this.columnStyling(col);
      col.appendChild(this.newDivider(col.id));
      row.appendChild(col);
      this.addToBody(row);
    }
    this.selectedRow = null;
    this.selectedCol = null;
  }
  public initText() {
    if (this.selectedCol != null && this.selectedRow != null) {
      console.log(this.selectedCol + this.selectedRow + this.type)
      this.replaceFromBody(
        this.selectedRow + '' + this.selectedCol + this.type,
        this.newText(this.selectedRow + this.selectedCol)
      );
    } else {
      var row = this.newRow();
      row.id = 'CriRow' + this.numRows++;
      var col = document.createElement('div');
      col.className = 'col-md-12';
      col.id = row.id + 'CriCol' + 1;
      col = this.columnStyling(col);
      col.appendChild(this.newText(col.id));
      row.appendChild(col);
      this.addToBody(row);
    }
    this.selectedRow = null;
    this.selectedCol = null;
  }

  public initHTML() {
    var row = this.newRow();
    row.id = 'CriRow' + this.numRows++;
    var col = document.createElement('div');
    col.className = 'col-md-12';
    col.id = row.id + 'CriCol' + 1;
    col = this.columnStyling(col);
    col.appendChild(this.newHTML(col.id));
    row.appendChild(col);
    if (this.selectedCol == null && this.selectedRow == null)
      this.addToBody(row);
    else {
      this.replaceFromBody(
        this.selectedRow + '' + this.selectedCol + this.type,
        row
      );
      this.selectedRow = null;
      this.selectedCol = null;
    }
    this.setHTML(col.id)
  }




  // Rows
  private newRow(): Element {
    this.selectColumn(this.selectedCol, this.selectedRow);
    var row = document.createElement('div');
    row.className = 'row';
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.marginRight = '0px';
    row.style.marginLeft = '0px';
    row.style.marginBottom = '10px';
    // row.setAttribute("draggable", "true");
    return row;
  }




  // Row Properties
  removeRow() { document.getElementById(this.selectedRow).remove(); }

  public rowColor(color: Event) {
    document.getElementById(this.selectedRow).style.backgroundColor =
      color + '';
  }

  public rowWidth(s: string) {
    var btn = document.getElementById(this.selectedRow);
    var style = window.getComputedStyle(btn);
    if (s == 'add') {
      btn.style.paddingLeft = parseInt(style.paddingLeft.split('px')[0]) - 10 + 'px';
      btn.style.paddingRight = parseInt(style.paddingRight.split('px')[0]) - 10 + 'px';
    }
    if (s == 'sub') {
      btn.style.paddingRight = parseInt(style.paddingRight.split('px')[0]) + 10 + 'px';
      btn.style.paddingLeft = parseInt(style.paddingLeft.split('px')[0]) + 10 + 'px';
    }
  }
  rowHeight(s: string) {
    var btn = document.getElementById(this.selectedRow);
    var style = window.getComputedStyle(btn);
    if (s == 'sub') {
      btn.style.paddingTop = parseInt(style.paddingTop.split('px')[0]) - 10 + 'px';
      btn.style.paddingBottom = parseInt(style.paddingBottom.split('px')[0]) - 10 + 'px';
    }
    if (s == 'add') {
      btn.style.paddingTop = parseInt(style.paddingBottom.split('px')[0]) + 10 + 'px';
      btn.style.paddingBottom = parseInt(style.paddingTop.split('px')[0]) + 10 + 'px';
    }
  }






  // Columns
  initColumn() { this.column('CriRow' + this.numRows++, 1, 'col-md-12', true) }

  column(id: string, numCol: number, colClassName: string, add: boolean) {
    var row = this.newRow();
    row.id = id;
    for (let i = 0; i < numCol; i++) {
      var col = document.createElement('div');
      col.className = colClassName;
      col.id = id + 'CriCol' + (i + 1);
      col = this.columnStyling(col);
      if (i < numCol - 1 && document.getElementById(id).children[i]) {
        if (document.getElementById(id).children[i].children[0].className == 'placeholder')
          col.appendChild(this.noContent(i + 1, id));
        else
          col.appendChild(document.getElementById(id).children[i].children[0])
      } else col.appendChild(this.noContent(i + 1, id));
      row.appendChild(col)
    }
    if (add) this.addToBody(row);
    else this.replaceFromBody(id, row);
  }






  // Column Properties
  columnStyling(col: HTMLDivElement): HTMLDivElement {
    col.style.position = 'relative';
    col.style.width = '100%';
    col.style.paddingRight = '15px';
    col.style.paddingLeft = '15px';
    return col;
  }

  public colColor(color: Event) {
    if (document.getElementById(
      this.selectedRow + '' + this.selectedCol + 'Placeholder'
    )) {
      document.getElementById(
        this.selectedRow + '' + this.selectedCol + 'Placeholder'
      ).style.backgroundColor = color + '';
    }
  }

  public colWidth(s: string) {
    var btn = document.getElementById(this.selectedRow + this.selectedCol);
    var style = window.getComputedStyle(btn);
    if (s == 'add') {
      btn.style.paddingLeft = parseInt(style.paddingLeft.split('px')[0]) - 10 + 'px';
      btn.style.paddingRight = parseInt(style.paddingRight.split('px')[0]) - 10 + 'px';
    }
    if (s == 'sub') {
      btn.style.paddingRight = parseInt(style.paddingRight.split('px')[0]) + 10 + 'px';
      btn.style.paddingLeft = parseInt(style.paddingLeft.split('px')[0]) + 10 + 'px';
    }
  }






  // Button

  public newButton(ID: string): Element {
    var newButton = document.createElement('a');
    var buttonContainer = document.createElement('div');
    newButton.className = 'btn';
    newButton.style.fontWeight = '400';
    newButton.style.padding = '.375rem .75rem';
    newButton.style.fontSize = '1rem';
    newButton.style.lineHeight = '1.5';
    newButton.style.borderRadius = '.25rem';
    newButton.style.color = 'white';
    newButton.style.backgroundColor = '#48cae4';
    newButton.innerHTML = "New Button"
    newButton.id = ID + 'button';
    newButton.addEventListener(
      'click',
      this.selectElement.bind(this, newButton.id, 'button')
    );
    buttonContainer.style.textAlign = "center";
    buttonContainer.appendChild(newButton);
    // this.selectElement(newButton.id, 'btn');
    return buttonContainer;
  }


  // Button Properties
  public linkTo(value: string, type: string) {
    if (type == 'web') {
      document.getElementById(this.selectedItem).setAttribute('href', value)
      document.getElementById(this.selectedItem).setAttribute('target', '_blank')
    }
    if (type == 'phone') {
      document.getElementById(this.selectedItem).setAttribute("href", 'tel:' + value)
      document.getElementById(this.selectedItem).removeAttribute('target');
    }
    if (type == 'email') {
      document.getElementById(this.selectedItem).setAttribute("href", "mailto:" + value)
      document.getElementById(this.selectedItem).removeAttribute('target');
    }
  }

  public btnTextColor(e: Event) {
    document.getElementById(this.selectedItem).style.color = e + '';
  }

  public btnButtonColor(e: Event) {
    document.getElementById(this.selectedItem).style.backgroundColor = e + '';
  }

  public btnWidth(s: string) {
    var btn = document.getElementById(this.selectedItem);
    if (s == 'add')
      btn.style.width = btn.clientWidth + 20 + 'px';
    if (s == 'sub')
      btn.style.width = btn.clientWidth - 20 + 'px';
  }

  public btnBorderRadius(s: string) {
    var btn = document.getElementById(this.selectedItem);
    var style = window.getComputedStyle(btn);
    var current = style.borderRadius.split('px')[0];
    if (s == 'add')
      btn.style.borderRadius = parseInt(current) + 1 + 'px';
    if (s == 'sub')
      btn.style.borderRadius = parseInt(current) - 1 + 'px';
  }

  public btnPadding(s: string) {
    var btn = document.getElementById(this.selectedItem);
    var style = window.getComputedStyle(btn).padding;
    var currentHor = style.split('px')[0];
    var currentVert = style.split('px')[1];
    if (s == 'add') {
      btn.style.paddingRight = parseInt(currentHor) + 5 + 'px';
      btn.style.paddingLeft = parseInt(currentHor) + 5 + 'px';
      btn.style.paddingTop = parseInt(currentVert) + 5 + 'px';
      btn.style.paddingBottom = parseInt(currentVert) + 5 + 'px';
    }
    if (s == 'sub') {
      btn.style.paddingRight = parseInt(currentHor) - 5 + 'px';
      btn.style.paddingLeft = parseInt(currentHor) - 5 + 'px';
      btn.style.paddingTop = parseInt(currentVert) - 5 + 'px';
      btn.style.paddingBottom = parseInt(currentVert) - 5 + 'px';
    }
  }

  public btnTextSize(s: string) {
    var btn = document.getElementById(this.selectedItem);
    var style = window.getComputedStyle(btn).fontSize;

    if (s == 'add')
      btn.style.fontSize = parseInt(style.split('px')[0]) + 2 + 'px';
    if (s == 'sub')
      btn.style.fontSize = parseInt(style.split('px')[0]) - 2 + 'px';
  }

  public updateBtnText(s: string) {
    document.getElementById(this.selectedItem).innerHTML = s;
  }






  // Divider
  public newDivider(ID: string): Element {
    var newDivider = document.createElement('hr');
    // var textContainer = document.createElement('div');
    newDivider.style.borderTop = "8px solid #bbb";
    newDivider.id = ID + 'divider';
    newDivider.className = 'divider';
    newDivider.addEventListener(
      'click',
      this.selectElement.bind(this, newDivider.id, 'divider')
    );
    // this.selectElement(newDivider.id, 'divider');
    return newDivider;
  }


  // Divider Properties
  public updateDividerLine(s: string) {
    var btn = document.getElementById(this.selectedItem);
    btn.style.borderTopStyle = s;
    if (s == 'dotted') {
      btn.style.borderRadius = 0 + 'px';
    }
  }

  public updateDividerColor(e: Event) {
    var btn = document.getElementById(this.selectedItem);
    btn.style.borderTopColor = e + '';
  }
  public updateDividerHeight(s: string) {
    var btn = document.getElementById(this.selectedItem);
    var style = window.getComputedStyle(btn).borderTopWidth;
    if (s == 'add')
      btn.style.borderTopWidth = parseInt(style.split('px')[0]) + 1 + 'px';
    if (s == 'sub')
      btn.style.borderTopWidth = parseInt(style.split('px')[0]) - 1 + 'px';
  }

  public updateDividerBorder(s: string) {
    var btn = document.getElementById(this.selectedItem);
    var style = window.getComputedStyle(btn).borderRadius;
    if (s == 'add')
      btn.style.borderRadius = parseInt(style.split('px')[0]) + 1 + 'px';
    if (s == 'sub')
      btn.style.borderRadius = parseInt(style.split('px')[0]) - 1 + 'px';
  }






  // HTML
  public newHTML(ID: string): Element {
    var newHtml = document.createElement('div');
    var HtmlContainer = document.createElement('div');
    // newHtml.setAttribute('contenteditable', 'true')
    newHtml.id = 'html' + ID;
    newHtml.className = 'html';
    newHtml.innerHTML = "<h6>Click '<>' above to insert raw HTML<h6>"
    newHtml.style.width = '100%';
    newHtml.style.minWidth = '100%';
    HtmlContainer.style.marginLeft = 'auto';
    HtmlContainer.style.marginRight = 'auto';
    HtmlContainer.style.display = 'block';
    HtmlContainer.style.width = '100%';
    HtmlContainer.style.minWidth = '100%';
    HtmlContainer.id = ID + 'htmlContainer';
    HtmlContainer.appendChild(newHtml);
    return HtmlContainer;
  }






  // Image
  public newImage(src: string, ID: string): Element {
    var newImage = document.createElement('img');
    var imageContainer = document.createElement('div');
    newImage.src = src;
    newImage.className = 'img center';
    newImage.id = ID + 'img';
    newImage.style.width = '300px';
    newImage.style.maxWidth = '100%';
    newImage.style.height = 'auto';
    newImage.style.maxHeight = '500px';
    newImage.addEventListener(
      'click',
      this.selectElement.bind(this, newImage.id, 'img')
    );
    imageContainer.style.marginLeft = 'auto';
    imageContainer.style.marginRight = 'auto';
    imageContainer.style.display = 'block';
    imageContainer.style.width = '100%';
    imageContainer.appendChild(newImage);
    // this.selectElement(newImage.id, 'img');
    return imageContainer;
  }

  public updateImage(src: string) {
    let newImage = document.createElement('img');
    newImage.src = src;
    newImage.className = 'img center';
    newImage.id = this.selectedItem;
    newImage.style.width = 'auto';
    newImage.style.maxWidth = '100%';
    newImage.style.height = 'auto';
    newImage.style.maxHeight = '500px';

    if (
      document.getElementById(
        this.selectedRow + '' + this.selectedCol + 'Placeholder'
      )
    ) {
      let imageContainer = document.createElement('div');
      imageContainer.style.marginLeft = 'auto';
      imageContainer.style.marginRight = 'auto';
      imageContainer.style.display = 'block';
      imageContainer.style.width = '100%';
      imageContainer.appendChild(newImage);
      newImage.id = this.selectedRow + '' + this.selectedCol + 'img';
      newImage.addEventListener(
        'click',
        this.selectElement.bind(this, newImage.id, 'img')
      );
      this.replaceFromBody(
        this.selectedRow + '' + this.selectedCol + this.type,
        imageContainer
      );
    } else {
      newImage.addEventListener(
        'click',
        this.selectElement.bind(this, newImage.id, 'img')
      );
      this.replaceFromBody(this.selectedItem, newImage);
    }
  }





  // Image Properties
  public float(float: string) {
    document.getElementById(this.selectedItem).style.float = float;
  }

  public imgWidth(s: string) {
    var btn = document.getElementById(this.selectedItem);
    var style = window.getComputedStyle(btn).width;
    if (s == 'add')
      btn.style.width = parseInt(style.split('px')[0]) + 10 + 'px';
    if (s == 'sub')
      btn.style.width = parseInt(style.split('px')[0]) - 10 + 'px';
    btn.style.maxHeight = "none";
  }

  public textAlign(align: string) {
    document.getElementById(this.selectedItem).style.textAlign = align;
  }







  // Text
  public newText(ID: string): Element {
    var newText = document.createElement('div');
    var textContainer = document.createElement('div');
    newText.id = ID + 'txt';
    newText.className = 'txt';
    newText.innerHTML = "Click to edit"
    // newText.style.fontSize = '50px'
    newText.style.cursor = "text"
    newText.style.width = '100%';
    newText.style.minWidth = '100%';
    newText.addEventListener(
      'click',
      this.selectText.bind(this, newText.id, 'txt')
    );
    textContainer.style.marginLeft = 'auto';
    textContainer.style.marginRight = 'auto';
    // textContainer.style.display = 'block';
    textContainer.style.width = '100%';
    // Vertical align
    // textContainer.style.height = '100%';
    // textContainer.style.display = 'flex';
    // textContainer.style.alignItems = 'center';
    textContainer.style.minWidth = '100%';
    textContainer.id = ID + 'txtContainer';
    textContainer.appendChild(newText);
    // this.selectElement(newText.id, 'txt');
    return textContainer;
  }







  // Body (Add/Remove)
  private addToBody(element: Element) {
    this.draggableItems.push({
      content: this.numRows + '',
      effectAllowed: "move",
      disable: false,
      handle: false,
    })
    if (document.getElementById('draggableListItem' + (this.numRows - 1)))
      document.getElementById('draggableListItem' + (this.numRows - 1)).appendChild(element);
  }

  public replaceFromBody(id: string, row: Element) {
    if (id == null)
      this.addToBody(row)
    else
      document.getElementById(id).replaceWith(row);
  }

  removeColContent() {
    if (this.selectedCol != null && this.selectedRow != null) {
      if (this.type == 'txt') {
        this.replaceFromBody(
          this.selectedRow + '' + this.selectedCol + this.type + 'Container',
          this.noContent(this.selectedCol, this.selectedRow)
        );
        this.textSelected = null;
      } else {
        this.replaceFromBody(
          this.selectedRow + '' + this.selectedCol + this.type,
          this.noContent(this.selectedCol, this.selectedRow)
        );

      }
      this.selectedRow = null;
      this.selectedCol = null;
    }
  }

  insertRowToCol() {
    var childs = document.getElementById(this.selectedRow + this.selectedCol).children.length
    var col = document.createElement('div');
    col.id = this.selectedRow + 'SubCol' + childs;
    col.style.marginTop = "10px";
    col = this.columnStyling(col);
    col.appendChild(this.noContent(1, col.id));
    document.getElementById(this.selectedRow + this.selectedCol).appendChild(col);
  }

  public updateCol(numCol: number) {
    if (this.selectedRow) {

      if (!this.selectedRow.includes('SubCol')) {
        if (numCol == 1) this.column(this.selectedRow, numCol, 'col-md-12', false);
        if (numCol == 2) this.column(this.selectedRow, numCol, 'col-md-6', false);
        if (numCol == 3) this.column(this.selectedRow, numCol, 'col-md-4', false);
        if (numCol == 4) this.column(this.selectedRow, numCol, 'col-md-3', false);
        this.selectColumn(this.selectedCol, this.selectedRow);
      }
      else {
        console.log("Cannot divide sub rows")
      }
    }
    else {
      this.initColumn();
      if (numCol == 1) this.column('CriRow' + (this.numRows - 1), numCol, 'col-md-12', false);
      if (numCol == 2) this.column('CriRow' + (this.numRows - 1), numCol, 'col-md-6', false);
      if (numCol == 3) this.column('CriRow' + (this.numRows - 1), numCol, 'col-md-4', false);
      if (numCol == 4) this.column('CriRow' + (this.numRows - 1), numCol, 'col-md-3', false);
      this.selectColumn(this.selectedCol, this.selectedRow);
    }
  }







  //Other
  //Placeholder
  private noContent(colID: any, rowID: any): Element {
    var placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.id = rowID + 'CriCol' + colID + 'Placeholder';
    var message = document.createElement('div');
    placeholder.style.padding = '20px';
    placeholder.style.backgroundColor = 'rgba(222, 242, 250, 0.85);';
    placeholder.style.outline = '#2faade dashed 1px';
    placeholder.style.minInlineSize = '100px';
    placeholder.style.fontSize = '13px';
    placeholder.style.color = '#2faade';
    placeholder.style.textAlign = 'center';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.cursor = 'pointer';
    message.innerHTML = 'No content here. Click to edit.';
    placeholder.appendChild(message);
    placeholder.addEventListener(
      'click',
      this.selectColumn.bind(this, 'CriCol' + colID, rowID)
    );
    return placeholder;
  }



  //Select
  private selectColumn(colID: string, rowID: string) {
    if (
      document.getElementById(
        this.selectedRow + '' + this.selectedCol + 'Placeholder'
      )
    ) {
      document.getElementById(
        this.selectedRow + '' + this.selectedCol + 'Placeholder'
      ).style.border = 'none';
    }
    if (this.selectedRow != rowID || this.selectedCol != colID) {
      this.selectElement(rowID + colID + 'Placeholder', 'Placeholder')
      this.selectedRow = rowID;
      this.selectedCol = colID;
      this.type = "Placeholder"
      document.getElementById(
        rowID + '' + colID + 'Placeholder'
      ).style.border = '5px #48bfe3 solid';
    }
    else {
      this.selectedRow = null;
      this.selectedCol = null;
      this.type = null;
    }
    if (this.textSelected != null) {
      console.log(document.getElementById('textbox'))
    }
  }

  public selectElement(id: string, type: string) {
    if (
      document.getElementById(
        this.selectedRow + '' + this.selectedCol + 'Placeholder'
      )
    ) {
      document.getElementById(
        this.selectedRow + '' + this.selectedCol + 'Placeholder'
      ).style.backgroundColor = 'trasparent';
    }
    if (document.getElementById(this.selectedItem) && this.type != 'divider')
      document.getElementById(this.selectedItem).style.border = "none";
    if (document.getElementById(this.selectedItem) && this.type == 'divider')
      document.getElementById(this.selectedItem).style.borderBottom = "none";
    if (this.selectedItem != id) {
      if (type != 'divider')
        setTimeout(() => { document.getElementById(id).style.border = "5px #48bfe3 solid" }, 50)
      if (type == 'divider')
        setTimeout(() => { document.getElementById(id).style.borderBottom = "5px #48bfe3 solid" }, 50)
      this.type = type;
      this.selectedItem = id;
      this.selectedRow = 'CriRow' + id.split('CriRow')[1].split('CriCol')[0]
      this.selectedCol = 'CriCol' + id.split('CriRow')[1].split('CriCol')[1].split(type)[0];
    } else {
      this.type = null;
      this.selectedItem = null;
      this.selectedRow = null;
      this.selectedCol = null;
    }
  }




  //Set
  private setTextbox(id: string) {
    Redactor('#textbox' + id, {
      minHeight: 75 + "px",
      maxHeight: 'auto',
      air: false,
      plugins: ['fontfamily', 'fontsize', 'fontcolor', 'alignment', 'format'],
      buttons: ['fontfamily', 'fontsize', 'fontcolor', 'bold', 'italic', 'underline', 'format'],
      imageResizable: true,
      imagePosition: false,
      alignment: true,
      breakline: true,
      clickToEdit: false,
      clickToSave: { title: 'Save' },
      clickToCancel: { title: 'Cancel' },
      callbacks: {
        clickSave: function (html) {
          alert(html);
        }
      }
    });
  }

  public setHTML(id: string) {
    var textbox = document.getElementById("html")
    Redactor('#html' + id, {
      minHeight: 100 + "px",
      maxHeight: 'auto',
      air: false,
      plugins: [],
      buttons: ['html'],
      imageResizable: true,
      imagePosition: false,
      alignment: true,
      breakline: true,
      clickToEdit: false,
      clickToSave: { title: 'Save' },
      clickToCancel: { title: 'Cancel' },
      callbacks: {
        clickSave: function (html) {
          alert(html);
        }
      }
    });
  }

  // Text Box
  public selectText(id: string) {
    console.log(id)
    this.selectedRow = 'CriRow' + id.split('CriRow')[1].split('CriCol')[0]
    this.selectedCol = 'CriCol' + id.split('CriRow')[1].split('CriCol')[1].split('txt')[0]
    if (this.textSelected !== null && this.textSelected != id)
      this.revertText()
    if (this.textSelected !== id) {
      console.log(id)
      document.getElementById(id).id = "textbox" + id;
      this.textSelected = id;
      this.type = 'txt';
      this.setTextbox(id);
    }
  }

  public revertText() {
    var tempRow = 'CriRow' + this.textSelected.split('CriRow')[1].split('CriCol')[0]
    var tempCol = 'CriCol' + this.textSelected.split('CriRow')[1].split('CriCol')[1].split('txt')[0]
    var innerHTML = this.newText(tempRow + tempCol);
    innerHTML.children[0].innerHTML = '';
    var element = document.getElementById('textbox' + this.textSelected).childNodes;
    element.forEach(e => {
      innerHTML.children[0].appendChild(e);

    });
    this.replaceFromBody(tempRow + tempCol + 'txtContainer', innerHTML)
    this.textSelected = null;
    this.selectedRow = null;
    this.selectedItem = null;
    this.selectedCol = null;
    document.getElementsByClassName('redactor-context-toolbar')[0].remove();
    document.getElementsByClassName('redactor-context-toolbar')[0].remove();
    if (document.getElementsByClassName('redactor-dropdown')) {
      var dropdowns = document.getElementsByClassName('redactor-dropdown').length;
      for (let i = 0; i < dropdowns; i++) {
        document.getElementsByClassName('redactor-dropdown')[0].remove();
      }
    }
  }

  removeAllPlaceholders() {
    while (document.getElementsByClassName('placeholder').length != 0)
      document.getElementsByClassName('placeholder')[0].remove();
    while (document.getElementsByClassName("re-button-tooltip").length != 0)
      document.getElementsByClassName('re-button-tooltip')[0].remove();
  }

  dropped(idDragged: string, idReplace: number, draggedElement: Element, replaceElement: Element) {
    document.getElementById('emailTemplateBody').insertBefore(draggedElement, document.getElementById('emailTemplateBody').children[idReplace]);
    for (let i = 0; i < document.getElementById('emailTemplateBody').children.length; i++) {
      if (document.getElementById('emailTemplateBody').children[i].children.length == 0)
        document.getElementById('emailTemplateBody').children[i].remove();
    }

  }



  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.textSelected) {
        var temp = false;
        e['path'].forEach(el => {
          if (this.selectedRow.includes("SubCol")) {
            if (el == document.getElementById(this.selectedRow)) temp = true;
          }
          else
            if (el == document.getElementById(this.selectedRow + this.selectedCol)) temp = true;
        });
        e['path'].forEach(el => {
          if (el.classList != undefined)
            el.classList.forEach(i => { if (i == 'redactor-dropdown') temp = true; });
        })
        if (temp == false) {
          this.revertText();
        }
      }
    })
  }


  loadHTML(el: Element) {
    var tempArray = new Array<any>();
    if (el.getElementsByClassName('row').length == 0) {
      this.initHTML();
      document.getElementById('htmlCriRow' + (this.numRows - 1) + 'CriCol1').innerHTML = el.getElementsByTagName('body')[0].innerHTML;
    } else {
      for (let i = 0; i < el.getElementsByClassName("btn").length; i++) {
        let temp = el.getElementsByClassName("btn")[i];
        temp.addEventListener('click', this.selectElement.bind(this, temp.id, 'button'))
      }
      for (let i = 0; i < el.getElementsByClassName("divider").length; i++) {
        let temp = el.getElementsByClassName("divider")[i];
        temp.addEventListener('click', this.selectElement.bind(this, temp.id, 'divider'))
      }
      for (let i = 0; i < el.getElementsByClassName("img center").length; i++) {
        let temp = el.getElementsByClassName("img center")[i];
        temp.addEventListener('click', this.selectElement.bind(this, temp.id, 'img'))
      }
      for (let i = 0; i < el.getElementsByClassName("txt").length; i++) {
        let temp = el.getElementsByClassName("txt")[i];
        temp.addEventListener('click', this.selectText.bind(this, temp.id, 'txt'))
      }
      for (let i = 0; i < el.getElementsByTagName("body")[0].getElementsByClassName("row").length; i++) {
        tempArray.push(el.getElementsByTagName("body")[0].getElementsByClassName("row")[i])
      }

      tempArray.forEach(e => {
        setTimeout(() => { this.addToBody(e); this.numRows++ }, 500);
      });
    }
  }
}
