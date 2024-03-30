alter table "public"."rooms" add column "moderators" uuid[] not null default '{}'::uuid[];


