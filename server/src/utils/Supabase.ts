import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env as Record<string, string>;

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
