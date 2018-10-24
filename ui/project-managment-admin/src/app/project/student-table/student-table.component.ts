import {Component, OnInit} from '@angular/core';
import {filter, tap} from "rxjs/operators";
import {StudentTableService} from "../../services/student-table.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  id: string
  available
  data

  displayedColumns: string[] = ['group', 'stu1', 'stu2', 'stu3', 'stu4'];
  constructor(private st: StudentTableService, public route: ActivatedRoute, private prService: ProjectService) {
  }


  ngOnInit() {
    this.route.params.pipe(
      filter(next => next.id != undefined),
      tap(value => {
          this.prService.getOriginalProjectId(Number(value.id)).subscribe(next => {
            this.st.getTable(next).subscribe(next => {
              this.available = true
              this.data = next.data().students
            })

          })
        }
      )).subscribe()




  }

  printTable() {

  }


}
