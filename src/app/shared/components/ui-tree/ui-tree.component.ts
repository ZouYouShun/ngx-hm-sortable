import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-tree',
  templateUrl: './ui-tree.component.html',
  styleUrls: ['./ui-tree.component.css']
})
export class UiTreeComponent {

  @Input('searchText') searchText = '';
  @Input('nodes') nodes: Array<any>;
  @Input('key') key = 'children';

  enable = true;
  selectStyle = {
    opacity: 0.5,
    color: 'blue'
  };
  movingStyle = {
    color: 'red',
  };

  constructor() { }

  complete(event) {
  }
}
