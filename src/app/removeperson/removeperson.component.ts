import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { IPerson } from '../interfaces/iperson';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-removeperson',
  templateUrl: './removeperson.component.html',
  styleUrls: ['./removeperson.component.css']
})
export class RemovepersonComponent implements OnInit {
  baseURL = 'https://first-project-e1ab3.firebaseio.com/';
  remove: boolean = true;
  rootNode = 'people';

  peopleCollection: Array<IPerson> = [];
  
  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.loadData();

  }

  loadData(){
      this.dbService.getAllData(`${this.baseURL}/${this.rootNode}.json`)
     .subscribe(
       (response) => {
         this.peopleCollection = response;
        } ,
       (error) => console.log(error)
     );
  }

  deleteData(dataID) {
    if(confirm("Would you like to delete this record?")==true){
          alert("Record deleted!");
          this.dbService.deleteData(`${this.baseURL}/${this.rootNode}/${dataID}.json`).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );
        }
      else alert("Delete cancelled");
  }
}
