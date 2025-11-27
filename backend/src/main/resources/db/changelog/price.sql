CREATE TABLE IF NOT EXISTS price (
    price_id UUID PRIMARY KEY,
    amount NUMERIC(10,2),
    course_id UUID UNIQUE,
    CONSTRAINT fk_price_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);