import { OverlayModule } from "@angular/cdk/overlay";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AutoSuggestComponent } from "./auto-suggest/auto-suggest.component";
import { SuggestionItemComponent } from "./auto-suggest/suggestion-item/suggestion-item.component";
import { CurrentComponent } from "./current/current.component";
import { DebounceTimeComponent } from "./debounce-time/debounce-time.component";
import { SwitchMapComponent } from "./switch-map/switch-map.component";
import { PortalModule } from "@angular/cdk/portal";
import { DebounceWithSwitchmapComponent } from "./debounce-with-switchmap/debounce-with-switchmap.component";

@NgModule({
  declarations: [
    AppComponent,
    AutoSuggestComponent,
    SuggestionItemComponent,
    SwitchMapComponent,
    DebounceTimeComponent,
    CurrentComponent,
    DebounceWithSwitchmapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    PortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
