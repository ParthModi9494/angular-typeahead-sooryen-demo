import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentComponent } from './current/current.component';
import { DebounceTimeComponent } from './debounce-time/debounce-time.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { DebounceWithSwitchmapComponent } from './debounce-with-switchmap/debounce-with-switchmap.component';


const routes: Routes = [
  { path: "switch-map", component: SwitchMapComponent },
  { path: "debounce", component: DebounceTimeComponent },
  { path: "current", component: CurrentComponent },
  { path: "debounce-with-switch-map", component: DebounceWithSwitchmapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
