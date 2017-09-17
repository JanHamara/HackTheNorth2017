import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  searchterm: string;
  searchstate = 'empty';
  patients: string[] = [];
  patientName: string;
  patientId: string;

  recordsObservable: FirebaseListObservable<any[]>;
  records: any;


  constructor(db: AngularFireDatabase, private modalService: BsModalService) {
    this.recordsObservable = db.list('/patients');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
      this.records.forEach((record) => {
        this.patients.push(record.patientData.firstName);
      });
    });
  }

  search() {
    if (this.searchterm == null) {
      this.searchstate = 'empty';
      console.log('Input is empty');
    } else {
      this.searchstate = 'searching';
      console.log('searching');
      this.patients.forEach((patient) => {
        if (patient === this.searchterm) {
          this.searchstate = 'found';
          this.patientName = patient;
        }
      })
    }
  }

  addPatient() {
    document.getElementById('add-patient').style.display = 'block';
    document.getElementById('patient-content').style.display = 'none';
  }

}
