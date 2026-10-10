-- Catalog of comparable objects. Unowned / world-writable (auth off).
create table if not exists comparison_objects (
  id            serial primary key,
  slug          text not null unique,
  name          text not null,
  category      text not null,
  subcategory   text not null default '',
  width_m       double precision not null,
  height_m      double precision not null,
  depth_m       double precision not null,
  visual_kind   text not null default 'box',
  color         text not null default '#c8ccd4',
  source_note   text,
  is_seed       boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists comparison_objects_category_idx
  on comparison_objects (category, subcategory, name);
create index if not exists comparison_objects_created_at_idx
  on comparison_objects (created_at);
create index if not exists comparison_objects_height_idx
  on comparison_objects (height_m);

insert into comparison_objects
  (slug, name, category, subcategory, width_m, height_m, depth_m, visual_kind, color, source_note, is_seed, created_at)
values
  ('average-man', 'Average Man', 'Humans', '', 0.46, 1.75, 0.28, 'average-man', '#c4b8a8', 'Mean adult male stature ~175 cm', true, '2024-01-02T12:00:00Z'),
  ('housecat', 'Housecat', 'Animals', 'Mammals', 0.46, 0.25, 0.12, 'housecat', '#c9b39a', 'Domestic cat, standing shoulder height', true, '2024-01-03T12:00:00Z'),
  ('earth', 'Earth', 'Celestial Objects', 'Planets', 12742000, 12742000, 12742000, 'earth', '#3d7cc9', 'Equatorial diameter', true, '2024-01-04T12:00:00Z'),
  ('average-semi-truck', 'Average Semi Truck', 'Miscellaneous Objects', '', 22.0, 4.1, 2.6, 'semi-truck', '#c9ced6', 'Class 8 tractor + 53 ft trailer', true, '2024-01-05T12:00:00Z'),
  ('atari-800', 'Atari 800', 'Miscellaneous Objects', '', 0.406, 0.114, 0.305, 'atari-800', '#6e6458', 'Original 1979 8-bit home computer', true, '2024-01-06T12:00:00Z'),
  ('mercury', 'Mercury', 'Celestial Objects', 'Planets', 4879400, 4879400, 4879400, 'mercury', '#9a9088', 'Equatorial diameter', true, '2024-01-07T12:00:00Z'),
  ('venus', 'Venus', 'Celestial Objects', 'Planets', 12103600, 12103600, 12103600, 'venus', '#d9c08a', 'Equatorial diameter', true, '2024-01-08T12:00:00Z'),
  ('mars', 'Mars', 'Celestial Objects', 'Planets', 6779000, 6779000, 6779000, 'mars', '#c46a4a', 'Equatorial diameter', true, '2024-01-09T12:00:00Z'),
  ('jupiter', 'Jupiter', 'Celestial Objects', 'Planets', 139822000, 139822000, 139822000, 'jupiter', '#d7b48a', 'Equatorial diameter', true, '2024-01-10T12:00:00Z'),
  ('saturn', 'Saturn', 'Celestial Objects', 'Planets', 116464000, 116464000, 116464000, 'saturn', '#e6d3a8', 'Equatorial diameter (body; rings drawn to scale around it)', true, '2024-01-11T12:00:00Z'),
  ('uranus', 'Uranus', 'Celestial Objects', 'Planets', 50724000, 50724000, 50724000, 'uranus', '#9fd0d6', 'Equatorial diameter', true, '2024-01-12T12:00:00Z'),
  ('neptune', 'Neptune', 'Celestial Objects', 'Planets', 49244000, 49244000, 49244000, 'neptune', '#3b6ccc', 'Equatorial diameter', true, '2024-01-13T12:00:00Z'),
  ('the-sun', 'The Sun', 'Celestial Objects', 'Stars', 1392700000, 1392700000, 1392700000, 'the-sun', '#ffcc66', 'Photospheric diameter', true, '2024-01-14T12:00:00Z'),
  ('empire-state-building', 'Empire State Building', 'Buildings', 'Skyscrapers', 57.6, 443.2, 50.0, 'empire-state', '#b9bcc4', 'Height to antenna tip', true, '2024-01-15T12:00:00Z'),
  ('willis-tower', 'Willis Tower', 'Buildings', 'Skyscrapers', 68.9, 442.1, 68.9, 'willis-tower', '#9aa0aa', 'Height to roof (antennas drawn above)', true, '2024-01-16T12:00:00Z'),
  ('burj-khalifa', 'Burj Khalifa', 'Buildings', 'Skyscrapers', 90.0, 828.0, 90.0, 'burj-khalifa', '#c5c9d2', 'Architectural height to spire tip', true, '2024-01-17T12:00:00Z'),
  ('sirius', 'Sirius', 'Celestial Objects', 'Stars', 2382909700, 2382909700, 2382909700, 'sirius', '#e8f2ff', 'Sirius A diameter (~1.71 R☉)', true, '2024-01-18T12:00:00Z'),
  ('vega', 'Vega', 'Celestial Objects', 'Stars', 3289557400, 3289557400, 3289557400, 'vega', '#dce9ff', 'Diameter (~2.36 R☉)', true, '2024-01-19T12:00:00Z'),
  ('pollux', 'Pollux', 'Celestial Objects', 'Stars', 12500000000, 12500000000, 12500000000, 'pollux', '#ffc07a', 'Orange giant, ~12.5 million km diameter', true, '2024-01-20T12:00:00Z'),
  ('arcturus', 'Arcturus', 'Celestial Objects', 'Stars', 35000000000, 35000000000, 35000000000, 'arcturus', '#ff8a3d', 'K-giant, ~35 million km diameter', true, '2024-01-21T12:00:00Z')
on conflict (slug) do nothing;
