import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  users : User [] = []

  constructor(private userService : UserServiceService){}

}
