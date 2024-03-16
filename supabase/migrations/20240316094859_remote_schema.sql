alter table "public"."rooms" add column "current_task_id" uuid;

alter table "public"."rooms" add constraint "public_rooms_current_task_id_fkey" FOREIGN KEY (current_task_id) REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."rooms" validate constraint "public_rooms_current_task_id_fkey";


