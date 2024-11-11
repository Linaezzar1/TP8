import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-game-add',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './game-add.component.html',
  styleUrl: './game-add.component.css'
})
export class GameAddComponent implements OnInit {
  categories = Object.values(Category);
  gameService: GameService = inject(GameService);

  games: Game[] = [];
  // ngOnInit(): void {
  //   this.gameService.getGames().subscribe(games => this.games = games);
  // }

  fb: FormBuilder = inject(FormBuilder);
  gameForm!: FormGroup ;

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
    this.gameForm = this.fb.nonNullable.group({
      id: [2],
      name: ["", [Validators.required, Validators.pattern('[A-Z](.)+')]],
      price: [0, [Validators.required , Validators.min(0.1)]],
      madeIn: ["Tunisie"],
      category: [Category.BoardGames],
      isNew: [true],
      shops: this.fb.array([])
    });

    // this.gameForm.get('name')?.valueChanges.subscribe(value => {
    //   console.log(value);
    // });
  }

  public get gameShops() {
    return this.gameForm.get('shops') as FormArray; 
  } 

  addShop(){
    this.gameShops.push(this.fb.control('', [Validators.required, Validators.minLength(2)]));
  }
  

  // gameForm: FormGroup=new FormGroup({
  //   id: new FormControl(2,{nonNullable: true}),
  //   name: new FormControl("echec",{nonNullable: true}),
  //   price: new FormControl(46.3,{nonNullable: true}),
  //   madeIn: new FormControl("Tunisie",{nonNullable: true}),
  //   category: new FormControl(Category.BoardGames,{nonNullable: true}),
  //   isNew: new FormControl(true,{nonNullable: true}), 
  // });

  onSubmit(){
    console.log(this.gameForm.value);
    console.log(parseInt(this.gameForm.get('id')?.value));
    console.log(this.gameForm.get('name')?.value);
    console.log(this.gameForm.get('price')?.value);
    console.log(this.gameForm.get('madeIn')?.value);
    console.log(this.gameForm.get('category')?.value);
    console.log(this.gameForm.get('isNew')?.value);
    console.log(this.gameForm.get('shops')?.value);

    this.gameService.addGame(this.gameForm.value).subscribe(() => {
      this.gameService.getGames().subscribe(games => this.games = games);
      this.gameForm.get('id')?.setValue(this.games.length + 1);
    });
  }

  onresetform(){
    this.gameForm.reset();
    this.gameForm.get('id')?.setValue(this.games.length + 1);
    this.gameShops.clear();
  }

  public get gameName(){
    return this.gameForm.get("name");
  }

  public isValidValue(){
    return this.gameForm.get('price')?.errors?.['min'] && this.gameForm.get('price')?.dirty && this.gameForm.get('price')?.invalid;
  }
}
