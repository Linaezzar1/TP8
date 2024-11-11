import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../../services/employe.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.css'
})
export class EmployeListComponent implements OnInit{

  public employeService: EmployeService;

  constructor(employeService: EmployeService){
    this.employeService = employeService;
  }

  ngOnInit(): void {
    this.employeService.getEmployes().subscribe(employes => this.employeService.employes = employes);
  }

}
