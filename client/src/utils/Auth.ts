import { createClient as client } from "@/lib/supabase/client";
import { createClient as server } from "@/lib/supabase/server";

const createClient = () => client();

const createServer = async () => await server();

export { createClient, createServer };
