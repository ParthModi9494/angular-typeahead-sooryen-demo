import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SuggestionItemComponent } from '../suggestion-item/suggestion-item.component';
@Component({
  selector: 'app-auto-suggest',
  templateUrl: './auto-suggest.component.html',
  styleUrls: ['./auto-suggest.component.scss']
})
export class AutoSuggestComponent implements OnInit, AfterViewInit {
  searchInput = new FormControl("");
  isLoading = false;
  users = [];
  keyManager: ActiveDescendantKeyManager<SuggestionItemComponent>;
  @ViewChild("input") input: ElementRef;
  @ViewChild("suggestions") suggestions: ElementRef;
  @ViewChildren(SuggestionItemComponent) items: QueryList<SuggestionItemComponent>;
  @Output() search = new EventEmitter();
  @Input() set usersIn(users) {
    if (users?.length > 0) {
      this.users = users;
    }
  };
  constructor() { }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
    this.keyManager.setFirstItemActive();
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.subscribe((queryText: String) => {
      if (queryText.length > 0) {
        this.search.emit(queryText);
      }
    })
  }

  styleSet() {
    this.input.nativeElement.focus();
  }

}
