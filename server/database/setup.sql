DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS timetable;
DROP TABLE IF EXISTS Notes;
DROP TABLE IF EXISTS Token;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    users_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (users_id)
);

INSERT INTO users (username, password)
VALUES
('1','1'),
('2','2');

CREATE TABLE Notes(
    note_id INT GENERATED ALWAYS AS IDENTITY,
    note VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    dateposted TIMESTAMP NOT NULL,
    PRIMARY KEY (note_id)
);

INSERT INTO Notes (note, topic, dateposted)
VALUES
('This is the note text 1', 'Topic 1', CURRENT_TIMESTAMP),
('This is the note text 2', 'Topic 2', '2002-01-23 13:50:25.789');


CREATE TABLE Token(
    token_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (users_id) REFERENCES users(users_id)
);

CREATE TABLE Subjects(
    subject_id INT GENERATED ALWAYS AS IDENTITY,
    subjectname VARCHAR(255) NOT NULL,
    subjectdescription VARCHAR(255) NOT NULL,
    note_id INT NOT NULL,
    users_id INT NOT NULL,
    PRIMARY KEY (subject_id),
    FOREIGN KEY (note_id) REFERENCES Notes(note_id),
    FOREIGN KEY (users_id) REFERENCES users(users_id)
);

INSERT INTO Subjects (subjectname, subjectdescription, note_id, users_id)
VALUES
('Topic 1','This is my first subject',1,1),
('Topic 2','This is my second subject',2,1),
('Topic 1','This is my first subject',2,2);
