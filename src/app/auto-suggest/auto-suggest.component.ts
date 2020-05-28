import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW, ESCAPE } from "@angular/cdk/keycodes";
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SuggestionItemComponent } from "./suggestion-item/suggestion-item.component";
@Component({
  selector: 'app-auto-suggest',
  templateUrl: './auto-suggest.component.html',
  styleUrls: ['./auto-suggest.component.scss']
})
export class AutoSuggestComponent implements OnInit, AfterViewInit {
  suggestionItems: object[] = [];
  overlayRef: OverlayRef;
  searchInput = new FormControl("");
  keyManager: ActiveDescendantKeyManager<SuggestionItemComponent>;
  @Input() enterToSelect: boolean = true;
  @Input() escapeToCancel: boolean = true;
  @Input() suggestionItemTemplate: TemplateRef<any>;
  @Input() isLoading: boolean = true;
  @Input() set suggestions(items: object[]) {
    this.suggestionItems = items;
    if (items && items.length > 0) {
      this.showSuggestions();
    } else {
      this.closeSuggestions();
    }
  };
  @Output() search = new EventEmitter();
  @Output() suggestionSelected = new EventEmitter();
  @ViewChild("input") input: ElementRef;
  @ViewChildren(SuggestionItemComponent) items: QueryList<SuggestionItemComponent>;
  @ViewChild("overlayTemplate") overlayTemplate: TemplatePortalDirective;

  constructor(
    private overlay: Overlay,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
    this.items.changes.subscribe(() => {
      this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
      this.keyManager.setFirstItemActive();
      this.cdRef.detectChanges();
    });
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.subscribe((queryText: String) => {
      if (queryText.length > 0) {
        this.search.emit(queryText);
      } else {
        this.closeSuggestions();
      }
    })
  }

  onKeydown(event) {

    switch (event.keyCode) {
      case UP_ARROW:
        this.keyManager.onKeydown(event);
        break;
      case DOWN_ARROW:
        this.keyManager.onKeydown(event);
        break;
      case ENTER:
        if (this.enterToSelect) {
          this.onSuggestionSelected(this.keyManager.activeItem.suggestionItem);
        }
        break;
      case ESCAPE:
        if (this.escapeToCancel) {
          this.closeSuggestions();
        }
        break;
      default:
        break;
    }

    if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
    } else if (event.keyCode === ENTER) {

    } else if (event.keyCode === ESCAPE) {
      this.closeSuggestions();
    }
  }
  onSuggestionSelected(selectedItem) {
    this.suggestionSelected.emit(selectedItem);
    this.closeSuggestions();
  }

  showSuggestions() {
    this.closeSuggestions();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.input)
      .withPositions([
        {
          originX: "start",
          originY: "bottom",
          overlayX: "start",
          overlayY: "top"
        }
      ])
      .withFlexibleDimensions(false)
      .withPush(false);

    const overlayConfig = new OverlayConfig({
      positionStrategy
    });

    overlayConfig.hasBackdrop = true;
    overlayConfig.backdropClass = "popover-backdrops";

    this.overlayRef = this.overlay.create(overlayConfig);

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
      this.overlayRef = null;
    });

    this.overlayRef.attach(this.overlayTemplate);
  }

  closeSuggestions() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
