drop policy "Enable update for users based on owner_id in rooms" on "public"."tasks";

create policy "Enable update for users based on owner_id in rooms"
on "public"."tasks"
as permissive
for update
to public
using (true)
with check (true);



