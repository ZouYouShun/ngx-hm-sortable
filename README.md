# ngx-hm-sortable

Angular sortable with hammerjs, support SSR(server side rendering).

## Install

1. install

```bash
npm install ngx-hm-sortable
```

## Example

1. Module

```ts
import { SortableModule } from './sortable/sortable.module';

@NgModule({
  declarations: [ ...something... ],
  imports: [ ...something... , SortableModule],
  providers: [ ...something... ],
  bootstrap: [ ...something... ]
})
export class YourModule {
  ...something...
}
```

2. TS

```typescript
import { Component } from '@angular/core';

@Component({
  ... something ...
})
export class YourComponent {
  list = [1, 2, 3, 4, 5];
}
```

3. HTML

```html
<table>
  <tbody
    [ngx-hm-sortable]="list"
    elms-selector=".item"
    move-selector=".drag"
    selected-class="color-blue"
    moving-class="color-red"
    (sort-complete)="complete($event)">
    <tr>
      <th>sortable</th>
      <th>number</th>
    </tr>
    <tr *ngFor="let item of list; let i = index;" [attr.index]="i" class="item">
      <td>
        <span class="drag">dragMe!</span>
      </td>
      <td>{{item}}</td>
    </tr>
  </tbody>
</table>
```

## Attribute

| Attribute | necessary(default) | type | position | description |
| --------- | --------- | ---- | -------- | ----------- |
| [ngx-hm-sortable] | yes | Array | container | add sortable by item array. |
| [elms-selector] | yes | String | container | the sortable items selector |
| [move-selector] | no (elms-selector) | String | container | the move Anchor |
| [sortable-id]  | no / (random) | String | container | the container unique id |
| [sortable-enable] | no / (true) | Boolean | container | sortable enable state, default |
| [moving-class] | no | string | container | add class with selected new element |
| [selected-class] | no | string | container | add class with selected origin element. |
| (sort-complete) | no | (Array)=>void | container | when sortable complete, emit this new array |
| [attr.index] | yes | Number(Integer) | item | the index of array |
