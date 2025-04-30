import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})


export class UserFormComponent {
userForm:FormGroup
users:any=[]

constructor(private fb:FormBuilder,private userService:UserService){
  this.userForm = this.fb.group({
    email:[''],
    name:[''],
    password:['']
  }) 
}

addUser(){
  this.userService.addUser(this.userForm.value).subscribe(()=>{
  this.userForm.reset()
  this.getUsers()
  })
}

getUsers(){
  this.userService.getUsers().subscribe((data:any)=>{
    this.users = data
  })
}
}
