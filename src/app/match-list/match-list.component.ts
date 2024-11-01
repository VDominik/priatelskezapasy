import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent {
  @Input() matches: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    const { data, error } = await this.supabaseService.getMatches();
    if (error) {
      console.error('Error fetching matches:', error.message);
    } else {
      this.matches = data ?? [];
    }
  }
}
