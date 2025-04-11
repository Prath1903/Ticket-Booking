CREATE TABLE IF NOT EXISTS seats (
  id SERIAL PRIMARY KEY,
  seat_number INTEGER NOT NULL,
  is_reserved BOOLEAN DEFAULT FALSE
);

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM seats) THEN
    FOR i IN 1..80 LOOP
      INSERT INTO seats (seat_number, is_reserved) VALUES (i, FALSE);
    END LOOP;
  END IF;
END $$;
