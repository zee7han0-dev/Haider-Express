// ============================================================
// SUPABASE CLIENT — shared across all pages
// Load AFTER the Supabase CDN <script> tag, BEFORE app.js
// ============================================================

const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co"; // <-- replace
const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY";             // <-- replace (safe to expose client-side)

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
