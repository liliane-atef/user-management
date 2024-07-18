import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = true;
  searchTerm = '';
  currentPage = 1;
  usersPerPage = 5;
  isSortedByName: boolean = false;
  isSortedByUsername: boolean = false;
  isSortedByEmail: boolean = false;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
      this.isLoading = false;
    });
  }

  search(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.usersPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  sortByName() {
    if (!this.isSortedByName) {
      this.users.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
      this.users.sort((a, b) => a.id - b.id);
      this.filteredUsers.sort((a, b) => a.id - b.id);
    }
    this.isSortedByName =!this.isSortedByName ;
  }

  sortByUsername() {
    if (!this.isSortedByUsername) {
      this.users.sort((a, b) => a.username.localeCompare(b.username));
      this.filteredUsers.sort((a, b) => a.username.localeCompare(b.username));
    }
    else {
      this.users.sort((a, b) => a.id - b.id);
      this.filteredUsers.sort((a, b) => a.id - b.id);
    }
    this.isSortedByUsername=!this.isSortedByUsername;
  }

  sortByEmail() {
    if (!this.isSortedByEmail) {
      this.users.sort((a, b) => a.email.localeCompare(b.email));
      this.filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
    }
    else {
      this.users.sort((a, b) => a.id - b.id);
      this.filteredUsers.sort((a, b) => a.id - b.id);
    }
    this.isSortedByEmail =!this.isSortedByEmail ;
  }
}
