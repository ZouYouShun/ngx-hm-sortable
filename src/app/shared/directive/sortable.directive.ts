import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { elementsFromPoint, insertAfter, removeElement } from '../ts';

@Directive({
  selector: '[hm-sortable]'
})
export class HmDirective implements AfterViewInit, OnDestroy {

  @Input('hm-sortable') sourceObj;
  @Input('hm-sortable-id') sourceId;

  // default is true
  private _enable = true;
  @Input('hm-sortable-enable')
  set SourceEnable(enable: boolean) {
    if (enable) {
      if (this.uniqueId) { // prevent get elms before ViewInit
        // switch enable, reget all elms and bind Hammer.js
        this.elms = this.setSelectorElm(this.parentELm.nativeElement);
        this.hms = this.bindHammer(this.getMoveSelector(this.parentELm.nativeElement));
      }
    } else {
      this.hms.forEach(hm => {
        hm.destroy();
      });
      this.hms.length = 0;
    }
    this._enable = enable;
  }
  get SourceEnable() {
    return this._enable;
  }

  @Input('elms-selector') elmsSelector: string;
  @Input('move-selector') moveSelector: string;
  @Input('select-style') selectStyle: any;
  @Input('moving-style') movingStyle: any;

  @Output('sort-complete') sortComplete = new EventEmitter();

  private elms;
  private storeStyle = {};
  private selectNode;
  // store the first select index
  private selectIndex;
  private nowIndex;
  private sort_clone_obj;

  private priAction;
  // use to save all hms data
  private hms: HammerManager[] = [];
  private uniqueId;

  constructor(private parentELm: ElementRef) { }

  ngAfterViewInit(): void {
    // console.log(this.SourceEnable);
    this.parentELm.nativeElement.id = this.uniqueId
      = `SortParent${this.sourceId || Math.ceil(Math.random() * 100000000)}`;

    // if init is true, get element and bind hammerJS
    if (this.SourceEnable) {
      this.elms = this.setSelectorElm(this.parentELm.nativeElement);
      this.hms = this.bindHammer(this.getMoveSelector(this.parentELm.nativeElement));
    }
  }

  ngOnDestroy() {
    this.hms.forEach(hm => {
      hm.destroy();
    });
  }

  private setSelectorElm(elm) {
    return Array.from(elm.querySelectorAll(`#${this.uniqueId}>${this.elmsSelector}`));
  }

  private getMoveSelector(elm) {
    return elm.querySelectorAll(`#${this.uniqueId}>${this.elmsSelector}>${this.moveSelector}`);
  }

  private bindHammer(elms) {
    return Array.from(elms).map((el: HTMLElement, index: number) => {
      const mc = new Hammer(el);
      // let the pan gesture support all directions.
      // this will block the vertical scrolling on a touch-device while on the element
      mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

      mc.on('panstart', (event: any) => {
        event.preventDefault();
        this.selectIndex = this.nowIndex = +event.target.parentNode.attributes.index.value;
        // set choiceNode to this start tag
        this.selectNode = this.elms[this.nowIndex];
        // get distance from this tag's origin
        // set this elem style
        Object.assign(this.selectNode.style, {
          pointerEvents: 'none'
        });

        // clone a new tag call sort_clone_obj and hidden it
        this.sort_clone_obj =
          this.createMovingTag(event.center,
            Math.abs(this.selectNode.getBoundingClientRect().top - event.center.y));

        // store the choiceTag original css
        Object.keys(this.selectStyle).forEach((key) => {
          this.storeStyle[key] = this.selectNode.style[key];
        });
        // change changeStyle
        Object.assign(this.selectNode.style, this.selectStyle);
      });

      mc.on('panmove', (event) => {
        event.preventDefault();

        Object.assign(this.sort_clone_obj.style, {
          transform: `translate(0px, ${event.deltaY}px`,
        });

        elementsFromPoint(event.center.x, event.center.y, (item: Element) => {
          return item.tagName === 'LI' && item.parentNode === this.parentELm.nativeElement;
        }).then((getElm: any) => {

          const toIndex = +getElm.attributes.index.value;
          if (this.nowIndex !== toIndex) {
            if (this.nowIndex > toIndex) {
              this.insertBefore(getElm);
            } else {
              this.insertAfter(getElm);
            }
          } else {
            switch (this.priAction) {
              case MOVE_TYPE.UP:
                this.insertAfter(getElm);
                break;
              case MOVE_TYPE.DOWN:
                this.insertBefore(getElm);
                break;
            }
          }
          this.nowIndex = toIndex;
        });
      });

      mc.on('panend', (event) => {
        this.selectNode.style.pointerEvents = '';
        removeElement(this.sort_clone_obj);
        Object.assign(this.elms[this.selectIndex].style, this.storeStyle);

        this.elms = this.setSelectorElm(this.parentELm.nativeElement);
        const id = this.elms.indexOf(this.selectNode);

        if (this.selectIndex !== id) {
          const tmp = this.sourceObj[this.selectIndex];
          this.sourceObj.splice(this.selectIndex, 1);
          this.sourceObj.splice(id, 0, tmp);

          this.sortComplete.emit(this.sourceObj);
        }

        // when move complete clear all unuse variable
        this.storeStyle = {};
        this.selectNode = undefined;
        this.sort_clone_obj = undefined;
        this.selectIndex = undefined;
        this.nowIndex = undefined;
        this.priAction = undefined;
      });
      return mc;
    });
  }

  private insertBefore(getElm: any) {
    this.priAction = MOVE_TYPE.UP;
    this.parentELm.nativeElement.insertBefore(this.selectNode, getElm);
  }

  private insertAfter(getElm: any) {
    this.priAction = MOVE_TYPE.DOWN;
    insertAfter(this.selectNode, getElm);
  }

  // clone a new tag call sort_clone_obj and hidden it
  private createMovingTag(position, disY) {
    const clnElm = this.selectNode.cloneNode(true);
    clnElm.id = 'sort_clone_obj';
    const style = {
      top: `${position.y - disY}px`,
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: '3',
    };
    Object.assign(clnElm.style, style, this.movingStyle);
    this.parentELm.nativeElement.appendChild(clnElm);
    return clnElm;
  }

}

enum MOVE_TYPE {
  UP = 'up',
  DOWN = 'down'
}
