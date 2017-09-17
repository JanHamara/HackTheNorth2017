import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/http-service/http.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less']
})
export class RecordsComponent implements OnInit {
  recordsObservable: FirebaseListObservable<any[]>;
  records: any;

  constructor(private httpService: HttpService, db: AngularFireDatabase) {
    this.recordsObservable = db.list('/patients');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
      console.log(this.records);
  });
  }

}
