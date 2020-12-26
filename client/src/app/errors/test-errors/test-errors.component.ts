import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {
   private baseUrl = 'https://localhost:5001/api/';
   public validationErrors: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe((response) =>  {
      console.log(response);
    }, (error)=> {
      console.log(error);      
    });
  }
  get400ValidationError() {
    this.http.get(this.baseUrl + 'buggy/register', {}).subscribe((response) =>  {
      console.log(response);
    }, (error)=> {
      console.log(error);
      this.validationErrors = error;
    });
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe((response) =>  {
      console.log(response);
    }, (error)=> {
      console.log(error);
    });
  }

}
