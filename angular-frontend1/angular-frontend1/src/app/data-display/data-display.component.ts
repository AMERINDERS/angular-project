import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-display',
  standalone: false,
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit {
  data : any;
  constructor(private dataService :DataService){}
 ngOnInit(): void {
   this.dataService.getData().subscribe((data:any)=>{
    this.data=data;
   
   });
   
   
 }
}
