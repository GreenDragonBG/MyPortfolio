import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfipbnielirbnelwfqwl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmaXBibmllbGlyYm5lbHdmcXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTgyMDYsImV4cCI6MjA2NzUzNDIwNn0.RXt9YQtSc7r--AOkkXHY0fUhBc0VVzeIMWZrlTuMNSk'
const supabase = createClient(supabaseUrl, supabaseKey)