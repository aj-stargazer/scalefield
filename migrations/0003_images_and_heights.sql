alter table comparison_objects
  add column if not exists image_key text not null default '';

-- Tail-up housecat photo: overall height ~38 cm
update comparison_objects
set height_m = 0.38,
    width_m = 0.50,
    source_note = 'Domestic cat, walking with tail raised (~38 cm)'
where slug = 'housecat';

-- Match Empire State: height to tip (antennas), not roof
update comparison_objects
set height_m = 527,
    source_note = 'Height to antenna tip'
where slug = 'willis-tower';

-- Photo includes the ring system
update comparison_objects
set width_m = 273550000,
    source_note = 'Body diameter 116,464 km; width spans the rings'
where slug = 'saturn';

update comparison_objects set image_key = slug
where slug in (
  'atari-800',
  'burj-khalifa',
  'housecat',
  'earth',
  'empire-state-building',
  'jupiter',
  'average-man',
  'mars',
  'mercury',
  'neptune',
  'saturn',
  'the-sun',
  'average-semi-truck',
  'venus',
  'willis-tower'
);
