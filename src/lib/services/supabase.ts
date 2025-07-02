import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vsjgnkiftthohmzduevr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzamdua2lmdHRob2htemR1ZXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NTcwNTksImV4cCI6MjA2NjQzMzA1OX0.SdMiFdRH2dM2GvFW8gzQi1lLliQK-qimG0m7MdL2Shw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)