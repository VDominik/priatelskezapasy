import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  date: string = '';
  name: string = '';
  description: string = '';
  matches: any[] = [];
  filteredMatches: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    const { data, error } = await this.supabaseService.getMatches();
    if (error) {
      console.error('Error fetching matches:', error.message);
    } else {
      this.matches = data ?? [];
      this.filteredMatches = data ?? [];
    }
  }

  async onSubmit() {
    const {
      data: { user },
    } = (await this.supabaseService.client.auth.getUser());
    let clubName = user?.user_metadata['clubName'];
    let league = user?.user_metadata['league'];

    const { data, error } = await this.supabaseService.addMatch(this.date, this.name, this.description, clubName, league);
    if (error) {
      console.error('Error adding match:', error.message);
    } else {
      console.log('Match added successfully:', data);
      if (data) {
        this.matches.push(data[0]);
        this.filteredMatches.push(data[0]);
      }
    }
  }

  filterMatches() {
    if (this.date) {
      this.filteredMatches = this.matches.filter(match => match.date === this.date);
    } else {
      this.filteredMatches = this.matches;
    }
  }
}