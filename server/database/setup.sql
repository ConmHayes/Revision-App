
DROP TABLE IF EXISTS Notes CASCADE;
DROP TABLE IF EXISTS Token CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS Badges CASCADE;


CREATE TABLE Badges(
    badges_id INT GENERATED ALWAYS AS IDENTITY,
    streak INT UNIQUE NOT NULL,
    badge_link VARCHAR(200) NOT NULL,
    PRIMARY KEY (badges_id)
);

INSERT INTO Badges (streak, badge_link)
VALUES
(1,'calendar-date-1.png'),
(2,'calendar-date-2.png'),
(3,'calendar-date-3.png'),
(4,'calendar-date-4.png'),
(5,'calendar-date-5.png');

CREATE TABLE users(
    users_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    lastLoggedIn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    streak INT NOT NULL DEFAULT 1,
    PRIMARY KEY (users_id),
    FOREIGN KEY (streak) REFERENCES Badges(streak)
);

INSERT INTO users (username, password)
VALUES
('1','1'),
('2','2');

CREATE TABLE Notes(
    note_id INT GENERATED ALWAYS AS IDENTITY,
    note VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    datePosted TIMESTAMP NOT NULL,
    users_id INT NOT NULL,
    PRIMARY KEY (note_id),
    FOREIGN KEY (users_id) REFERENCES users(users_id)
);

INSERT INTO Notes (note, topic, datePosted, users_id)
VALUES
('This is the note text 1', 'Topic 1', CURRENT_TIMESTAMP, 1),
('This is the note text 2', 'Topic 2', '2024-01-23 13:50:25.789', 2);


CREATE TABLE Token(
    token_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (users_id) REFERENCES users(users_id)
);

