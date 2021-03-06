import { Highlightable } from '@angular/cdk/a11y';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'suggestion-item',
  templateUrl: './suggestion-item.component.html',
  styleUrls: ['./suggestion-item.component.scss']
})
export class SuggestionItemComponent implements Highlightable {

  @Input() suggestionItem: object;
  @Output() focusInput = new EventEmitter
  private _isActive = false;

  @HostBinding("tabindex")
  @HostBinding('class.is-active') get isActive() {
    return this._isActive;
  }

  constructor(private element: ElementRef) {
  }

  setActiveStyles() {
    this.element.nativeElement.focus();
    this.focusInput.emit();
    this._isActive = true;
  };

  setInactiveStyles() {
    this._isActive = false;
  }
}
