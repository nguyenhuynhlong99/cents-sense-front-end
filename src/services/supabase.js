import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dspzraeqpzqhturbzmbq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcHpyYWVxcHpxaHR1cmJ6bWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4OTEyNjUsImV4cCI6MjAxOTQ2NzI2NX0.FS2R5X6uO4IMcygDPmc4o7vCOoTnJsMmrOi3Ph7Hgm0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
