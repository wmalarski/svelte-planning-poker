import { supabase } from '$lib/supabase/client';

export async function load() {
	const { data } = await supabase.from('countries').select();
	return { countries: data ?? [] };
}
