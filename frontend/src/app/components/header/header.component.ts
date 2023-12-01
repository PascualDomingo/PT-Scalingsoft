import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',

  
})

export class HeaderComponent implements OnInit{

  username = '';
  public DataUser: any = {
    user_name: '1',
    password: ''
  }

  
  ngOnInit(): void {
    let userData = localStorage.getItem('user');
    this.DataUser = userData ? JSON.parse(userData) : null;
    if(this.DataUser !== null){
      this.username = this.DataUser.user_name;
    }
  }


  logout() {
    localStorage.removeItem('user');
    //this.router.navigate(['/login']);
    window.location.replace('/login');
  }

}
