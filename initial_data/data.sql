--
-- Dump tables with csv
--

COPY "User"(id, name, email, password, location) FROM '/initial_data/user.csv' DELIMITER ',' CSV HEADER;
COPY "PetShop"(id, name, userId, phone, location) FROM '/initial_data/petshop.csv' DELIMITER ',' CSV HEADER;
