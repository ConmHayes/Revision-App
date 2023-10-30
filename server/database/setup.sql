DROP TABLE IF EXISTS TimeTable;
DROP TABLE IF EXISTS Notes;
DROP TABLE IF EXISTS Token;
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    users_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (users_id)
);

CREATE TABLE Token(
    token_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (users_id) REFERENCES users(users_id)
);

CREATE TABLE Notes(
    note_id INT GENERATED ALWAYS AS IDENTITY,
    note VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    datePosted TIMESTAMP NOT NULL,
    PRIMARY KEY (note_id)
);

CREATE TABLE Subjects(
    subject_id INT GENERATED ALWAYS AS IDENTITY,
    subjectName VARCHAR(255) UNIQUE NOT NULL,
    subjectDescription VARCHAR(255) NOT NULL,
    note_id INT NOT NULL,
    PRIMARY KEY (subject_id),
    FOREIGN KEY (note_id) REFERENCES Notes(note_id)
);

CREATE TABLE TimeTable(
    timeTable_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    note_id INT NOT NULL,
    PRIMARY KEY (timeTable_id),
    FOREIGN KEY (users_id) REFERENCES users(users_id),  
    FOREIGN KEY (note_id) REFERENCES Notes(note_id)   
);