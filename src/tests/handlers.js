import { http, HttpResponse } from 'msw';
import { supabaseUrl } from '../services/supabase';

export const handlers = [
  http.get(`${supabaseUrl}/rest/v1/accounts`, () => {
    return HttpResponse.json({ name: 'John' });
  }),
];
