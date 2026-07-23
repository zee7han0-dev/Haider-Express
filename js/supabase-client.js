// ============================================================
// SUPABASE CLIENT — shared across all pages
// Load AFTER the Supabase CDN <script> tag, BEFORE app.js
// ============================================================

const SUPABASE_URL = "https://zsnidblwlidwlpbxyvqm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZvJebDC8OWpWhyuQSZMx2w_S_g7nMZY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);
