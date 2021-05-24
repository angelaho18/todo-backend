-- select*from tasktodo

-- show DATABASE

-- CREATE TABLE daftartodo(
--     id int NOT NULL AUTO_INCREMENT,
--     catatan VARCHAR(100),
--     PRIMARY KEY(id)
-- );

CREATE TABLE user(
    userid int NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY(userid)
);