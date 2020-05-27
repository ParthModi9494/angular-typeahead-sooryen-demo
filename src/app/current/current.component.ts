import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  baseUrl = "https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=";
  subject = new Subject();
  users: any[] = [];
  isLoading: boolean;
  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.subject.subscribe((text) => {
      this.isLoading = true;
      this.onUserSearch(text).subscribe((users: any) => {
        this.isLoading = false;
        this.users = users;
      })
    })
  }

  onUserSearch(searchTerm) {
    return this.http.get(`${this.baseUrl}${searchTerm}`);
  }

  onDebounceChange() {
    this.ngOnInit();
  }
}
