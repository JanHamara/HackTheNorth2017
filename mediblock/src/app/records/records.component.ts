import {Component, Input, OnInit} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less']
})
export class RecordsComponent implements OnInit {
  recordsObservable: FirebaseListObservable<any[]>;
  records: any;
  @Input() data;

  constructor(db: AngularFireDatabase) {
    this.recordsObservable = db.list('/patients/0019203847528/records');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
  });
  }

  openRecord() {
    document.getElementById('patient-content').style.display = 'none';
    document.getElementById('report').style.display = 'block';
  };

}
