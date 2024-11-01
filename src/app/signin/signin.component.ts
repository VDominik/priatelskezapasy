import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async onSubmit() {
    const { user, error } = await this.supabaseService.signInWithPassword(this.email, this.password);
    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      console.log('Signed in successfully:', user);
      // Redirect to home page
      this.router.navigate(['/home']);
    }
  }
}