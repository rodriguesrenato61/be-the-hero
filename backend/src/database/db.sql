CREATE TABLE ongs(
	id VARCHAR(10),
      nome VARCHAR(50),
      email VARCHAR(30),
      whatsapp VARCHAR(11),
      city VARCHAR(50),
      uf VARCHAR(2),
      PRIMARY KEY(id)
);

CREATE TABLE incidents(
      id INTEGER AUTO_INCREMENT,
      title VARCHAR(50),
      description VARCHAR(1000),
      valor DOUBLE,
      ong_id VARCHAR(10),
      PRIMARY KEY(id),
      FOREIGN KEY(ong_id) REFERENCES ongs(id)
);

INSERT INTO ongs(id, nome, email, whatsapp, city, uf)
      VALUES("34de223", "Amada Pets", "amadapets@gmail.com", "98999854471", "São Luís", "MA");

INSERT INTO incidents(title, description, valor, ong_id)
      VALUES("Cirurgia cahorro Rex","O pequeno cachorro Rex precisa ser operado pois tem um problema sério no estômago",
      180.00, "34de223");

CREATE VIEW vw_incidents AS SELECT incidents.id AS id, title, description, valor, ong_id, ongs.nome AS ong FROM incidents
INNER JOIN ongs ON ong_id = ongs.id;


