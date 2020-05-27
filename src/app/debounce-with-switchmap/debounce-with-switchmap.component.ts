import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-debounce-with-switchmap',
  templateUrl: './debounce-with-switchmap.component.html',
  styleUrls: ['./debounce-with-switchmap.component.scss']
})
export class DebounceWithSwitchmapComponent implements OnInit {
  baseUrl = "https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=";
  subject = new Subject();
  debounceTime: string = "500";
  isLoading: boolean = false;
  users: any[] = [];
  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.subject.pipe(
      debounceTime(Number(this.debounceTime)),
      switchMap((text: string) => {
        this.isLoading = true;
        return this.onUserSearch(text);
      })
    ).subscribe((users: any[]) => {
      this.isLoading = false;
      this.users = users;
    })
  }

  onUserSearch(searchTerm) {
    return this.http.get(`${this.baseUrl}${searchTerm}`);
  }

  onDebounceChange() {
    this.subject = new Subject();
    this.ngOnInit();
  }


}
