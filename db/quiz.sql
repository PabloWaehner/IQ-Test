DROP TABLE IF EXISTS quiz;

CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    question VARCHAR(100) NOT NULL,
    option VARCHAR(100),
    answer VARCHAR(100) NOT NULL
);

INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment1',
    '/images IQ test/5 copy.jpg',
    '/images IQ test/5.png',
    '3'
);

INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment2',
    '/images IQ test/7 copy.png',
    '/images IQ test/7.jpg',
    '5'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment3',
    '/images IQ test/9.png',
    '/images IQ test/9 copy.png',
    '2'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment4',
    '/images IQ test/11 copy.png',
    '/images IQ test/11.jpg',
    '5'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment5',
    '/images IQ test/13 copy.png',
    '/images IQ test/13.png',
    '4'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment6',
    '/images IQ test/15 copy.png',
    '/images IQ test/15.png',
    '2'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment7',
    '/images IQ test/17 copy.jpg',
    '/images IQ test/17.png',
    '1'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment8',
    '/images IQ test/19 copy.jpg',
    '/images IQ test/19.jpg',
    '3'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment9',
    '/images IQ test/21 copy.jpg',
    '/images IQ test/21.jpg',
    '3'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment10',
    '/images IQ test/23 copy.jpg',
    '/images IQ test/23.jpg',
    '2'
);
INSERT INTO quiz (name, question, option, answer) VALUES (
    'assessment11',
    '/images IQ test/25 copy.jpg',
    '/images IQ test/25.png',
    '2'
);
