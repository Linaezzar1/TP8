  import { Component, inject, OnInit } from '@angular/core';
import { EmployeListComponent } from "../employe-list/employe-list.component";
import { EmployeService } from '../../services/employe.service';
import { Poste } from '../../model/types';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-employe-add',
  standalone: true,
  imports: [EmployeListComponent, ReactiveFormsModule],
  templateUrl: './employe-add.component.html',
  styleUrl: './employe-add.component.css'
})
export class EmployeAddComponent implements OnInit{

  fonctions: string[] = Object.values(Poste);

  constructor(private employeService: EmployeService){}

  ajoutEmployeForm!:FormGroup;
  readonly formBuilder : FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.ajoutEmployeForm = this.formBuilder.nonNullable.group({
      matricule:['matricule'],
      name:['name'],
      departement:["TI"],
      poste:[Poste.Sec],
      diplomes: this.formBuilder.array([])
    })
  }

  public get lesDiplomes() {
    return this.ajoutEmployeForm.get('diplomes') as FormArray; 
  } 

  addDiplome(){
    this.lesDiplomes.push(this.formBuilder.control(''));
  }

  onSubmit(){
    this.employeService.addEmploye(this.ajoutEmployeForm.value).subscribe(() => {
      this.employeService.getEmployes().subscribe(employes => this.employeService.employes = employes);
    }); 
  }

  onReset(){
    this.ajoutEmployeForm.reset();
    this.lesDiplomes.clear();
  }

  deleteDiplome(index: number){
    this.lesDiplomes.removeAt(index);
  }

}
