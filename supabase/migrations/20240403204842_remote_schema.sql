alter table "public"."tasks" alter column "results" set data type jsonb using "results"::jsonb;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_results(task_id uuid, player_id uuid, player_name text, value text)
 RETURNS SETOF tasks
 LANGUAGE plpgsql
AS $function$
BEGIN
  update tasks set "results"=jsonb_set("results"::jsonb, ('{' || player_id || '}')::text[], ('{"name":"' || player_name || '","value":"' || value || '","playerId":"' || player_id || '"}')::jsonb) where id=task_id;
  RETURN;
END;
$function$
;


