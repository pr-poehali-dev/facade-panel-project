CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    house_type VARCHAR(255),
    wall_material VARCHAR(255),
    area VARCHAR(50),
    color VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);