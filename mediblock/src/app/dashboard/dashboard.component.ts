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
  newPatientId: any;

  recordsObservable: FirebaseListObservable<any[]>;
  reportObservable: FirebaseListObservable<any[]>;
  records: any;
  report: any;


  constructor(public db: AngularFireDatabase, private modalService: BsModalService) {
    this.recordsObservable = db.list('/patients');
    this.reportObservable = db.list('/patients/0019203847528');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
      this.records.forEach((record) => {
        this.patients.push(record.patientData.firstName);
      });
    });

    this.reportObservable.subscribe((response) => {
      this.report = response;
      console.log('Repoooort:', this.report[1][1]);
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

  closeAddPatient() {
    document.getElementById('add-patient').style.display = 'none';
    document.getElementById('patient-content').style.display = 'block';
    this.newPatientId = '';
  }

  postPatient() {
    const patientsArray = this.db.list('/patients/' + this.newPatientId);
    patientsArray.push({patientData: '', records: ''});
    this.closeAddPatient();
  }

  closeReport() {
    document.getElementById('patient-content').style.display = 'block';
    document.getElementById('report').style.display = 'none';
  }
}
