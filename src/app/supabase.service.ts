import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  [x: string]: any;
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ywvtpkjbdyxyirhewdtz.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dnRwa2piZHl4eWlyaGV3ZHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NDYyMzEsImV4cCI6MjA0NjAyMjIzMX0.8l6Y3JbIsuGj_Jx1dFfMu2_vhYQmF7dS3PMm-C10RrY'
    );
  }

  get client() {
    return this.supabase;
  }

  async signUp(email: string, password: string, clubName: string, league: string, phoneNumber: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          clubName,
          league,
          phoneNumber,
        },
      },
    })
    return { user: data, error };
  }

  async signInWithPassword(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { user: data, error };
  }

  async addMatch(date: string, name: string, description: string, createdBy: string, league: string) {
    const { data, error } = await this.supabase
      .from('zapasy')
      .insert([{ date, name, description, created_by: createdBy, league: league }]);
    return { data, error };
  }

  async getMatches() {
    const { data, error } = await this.supabase
      .from('zapasy')
      .select('*')
      .order('date', { ascending: true });
    return { data, error };
  }
}
