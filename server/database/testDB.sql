TRUNCATE Badges RESTART IDENTITY CASCADE;
TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE Notes RESTART IDENTITY CASCADE;
TRUNCATE Subjects RESTART IDENTITY CASCADE;
TRUNCATE Token RESTART IDENTITY CASCADE;

INSERT INTO Badges (streak, badge_link)
VALUES
(1,'calendar-date-1.png'),
(2,'calendar-date-2.png'),
(3,'calendar-date-3.png'),
(4,'calendar-date-4.png'),
(5,'calendar-date-5.png');

INSERT INTO users (username, password)
VALUES
('1','1'),
('2','2');

INSERT INTO Notes (note, topic, datePosted, users_id)
VALUES
('This is the note text 1', 'Topic 1', CURRENT_TIMESTAMP, 1),
('This is the note text 2', 'Topic 2', '2024-01-23 13:50:25.789', 2);



INSERT INTO Subjects (subjectname, subjectdescription, note_id, users_id)
VALUES
('Topic 1','This is my first subject',1,1),
('Topic 2','This is my second subject',2,1),
('Topic 1','This is my first subject',2,2);

INSERT INTO Token(users_id, token)
VALUES (1,'tokenTest1'),
       (2,'tokenTest2');