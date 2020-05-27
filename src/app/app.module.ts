import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { AutoSuggestComponent } from "./auto-suggest/auto-suggest.component";
import { SuggestionItemComponent } from "./suggestion-item/suggestion-item.component";
import { SwitchMapComponent } from "./switch-map/switch-map.component";
import { DebounceTimeComponent } from "./debounce-time/debounce-time.component";
import { CurrentComponent } from "./current/current.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    AutoSuggestComponent,
    SuggestionItemComponent,
    SwitchMapComponent,
    DebounceTimeComponent,
    CurrentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
