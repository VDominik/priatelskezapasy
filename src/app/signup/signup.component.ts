import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  clubName: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  phoneNumber: string = '';
  selectedOption: string = '';
  dropdownOptions: string[] = ['IV. liga', 'V. liga', 'VI. liga', 'VII. liga'];


  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const { user, error } = await this.supabaseService.signUp(this.email, this.password, this.clubName, this.selectedOption, this.phoneNumber);
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('Signed up successfully:', user);
      this.router.navigate(['/signin']);
      
      // Additional logic to handle successful signup, e.g., saving clubName and phoneNumber
    }
  }
}