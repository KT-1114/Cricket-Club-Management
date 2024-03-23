import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rdquiblqymwujjgwhwwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcXVpYmxxeW13dWpqZ3dod3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjU4MjAsImV4cCI6MjAyNjAwMTgyMH0.w_ccwqsC3Vq-HIDMkQSzl5LhM5DsDo3t2qeeSWg0UOg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;