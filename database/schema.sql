-- ColBee Database Schema (PostgreSQL)

-- 1. Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Refrigerators table
CREATE TABLE refrigerators (
    refrigerator_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) DEFAULT 'My Refrigerator',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Ingredients table
CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    refrigerator_id INTEGER REFERENCES refrigerators(refrigerator_id) ON DELETE CASCADE,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50), -- dairy, vegetable, meat, frozen, etc.
    quantity INTEGER DEFAULT 1,
    unit VARCHAR(20), -- 개, g, ml 등
    purchase_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, consumed, disposed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Shopping Lists table
CREATE TABLE shopping_lists (
    item_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    product_name VARCHAR(100) NOT NULL,
    is_auto_generated BOOLEAN DEFAULT FALSE,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Statistics (Summary) table
CREATE TABLE monthly_statistics (
    stat_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    year_month CHAR(7) NOT NULL, -- e.g., '2024-01'
    total_purchases INTEGER DEFAULT 0,
    total_consumed INTEGER DEFAULT 0,
    total_disposed INTEGER DEFAULT 0,
    waste_rate NUMERIC(5, 2) DEFAULT 0.00,
    waste_cost INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, year_month)
);

-- 6. Notifications table
CREATE TABLE notifications (
    notif_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(ingredient_id) ON DELETE SET NULL,
    title VARCHAR(200),
    message TEXT,
    notification_type VARCHAR(50), -- warning_7d, warning_3d, urgent_0d, etc.
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
