alter table comparison_objects
  add column if not exists image_data bytea;
alter table comparison_objects
  add column if not exists image_mime text;
alter table comparison_objects
  add column if not exists image_aspect double precision;
