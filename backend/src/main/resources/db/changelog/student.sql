CREATE TABLE IF NOT EXISTS student (
    student_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob DATE,
    qualification VARCHAR(255)
);
