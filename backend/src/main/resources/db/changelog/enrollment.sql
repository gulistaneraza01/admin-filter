CREATE TABLE IF NOT EXISTS enrollment (
    enrollment_id UUID PRIMARY KEY,
    student_id UUID NOT NULL,
    course_id UUID NOT NULL,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES student(student_id),
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);
