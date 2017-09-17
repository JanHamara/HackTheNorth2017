import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less']
})
export class RecordsComponent implements OnInit {
  recordsObservable: FirebaseListObservable<any[]>;
  records: any;

  constructor(db: AngularFireDatabase) {
    this.recordsObservable = db.list('/patients/0019203847528/records');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
  });
  }

}
