CREATE TABLE
    books (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        status VARCHAR(50) NOT NULL,
        title VARCHAR(200) NOT NULL,
        author VARCHAR(100) NOT NULL,
        publisher VARCHAR(100),
        price DECIMAL(10, 2) NOT NULL,
        pages INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        publishAt DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    categories (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(255) NOT NULL,
        slug VARCHAR(90) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO
    categories (name, description, slug)
VALUES
    ("Programming", "Programming books", "programming"),
    ("Design", "Design books", "design"),
    ("Computer Science", "Computer Science books", "computer-science"),
    ("Web Development", "Web Development books", "web-development"),
    ("Database", "Database books", "database"),
    ("Frontend", "Frontend books", "frontend"),
    ("Backend", "Backend books", "backend"),
    ("Artificial Intelligence", "Artificial Intelligence books", "artificial-intelligence"),
    ("Project Management", "Project Management books", "project-management"),
    ("Machine Learning", "Machine Learning books", "machine-learning");

INSERT INTO
    books (status, title, author, publisher, price, pages, category_id, publishAt)
VALUES
    ("publish", "JavaScript Mastery", "Ethan Walker", "TechVerse Publishing", 499000, 320, 1, '2024-04-17 10:30:00'),
    ("unpublish", "The Art of UX Design", "Lara Hopkins", "DesignCraft Media", 379000, 220, 2, '2023-04-17 10:30:00'),
    ("draft", "Data Structures in Depth", "Michael Tan", "AlgoBooks", 519000, 400, 3, '2022-04-17 10:30:00'),
    ("publish", "Next.js untuk Pemula", "Rizky Aditya", "IndoDev Press", 299000, 180, 4, '2021-04-17 10:30:00'),
    ("publish", "Database Optimization Techniques", "Samantha Lee", "QueryBooks Co.", 459000, 310, 5, '2025-04-17 10:30:00'),
    ("draft", "Mastering Tailwind CSS", "Kevin Zhou", "CSSFactory", 349000, 210, 6, '2021-04-17 10:30:00'),
    ("publish", "Building RESTful APIs with Node.js", "Nina Arias", "BackendPro Publishing", 519000, 330, 7, '2022-04-17 10:30:00'),
    ("publish", "React State Management Guide", "Denny Hartono", "JS Dev Works", 429000, 280, 8, '2023-04-17 10:30:00'),
    ("unpublish", "Agile Project Management", "Jonathan Kim", "SoftWorks Media", 389000, 240, 9, '2024-04-17 10:30:00'),
    ("unpublish", "Machine Learning", "Angela Park", "AIBridge Media", 249000, 370, 10, '2020-04-17 10:30:00'),

    ("publish", "Get Started with Typescript", "Ethan Walker", "TechVerse Publishing", 299000, 320, 1, '2019-04-17 10:30:00'),
    ("unpublish", "Pattern UI/UX Design", "Lara Hopkins", "DesignCraft Media", 379000, 220, 2, '2022-04-17 10:30:00'),
    ("draft", "Data Structures Beginner", "Michael Tan", "AlgoBooks", 389000, 400, 3, '2023-04-17 10:30:00'),
    ("publish", "Next.js Advanced", "Rizky Aditya", "IndoDev Press", 279000, 180, 4, '2025-04-17 10:30:00'),
    ("publish", "Database SQL", "Samantha Lee", "QueryBooks Co.", 459000, 310, 5, '2024-04-17 10:30:00'),
    ("draft", "Mastering Bootstrap CSS", "Kevin Zhou", "CSSFactory", 149000, 210, 6, '2021-04-17 10:30:00'),
    ("publish", "Building MERN app with Node.js", "Nina Arias", "BackendPro Publishing", 519000, 330, 7, '2023-04-17 10:30:00'),
    ("publish", "React State For Beginners", "Denny Hartono", "JS Dev Works", 129000, 280, 8, '2022-04-17 10:30:00'),
    ("unpublish", "Metodology Project Development", "Jonathan Kim", "SoftWorks Media", 389000, 240, 9, '2024-04-17 10:30:00'),
    ("unpublish", "Deep Learning", "Angela Park", "AIBridge Media", 749000, 370, 10, '2024-04-17 10:30:00'),

    ("publish", "Typescript Mastery", "Ethan Walker", "TechVerse Publishing", 265000, 320, 1, '2023-04-17 10:30:00'),
    ("unpublish", "Create Mockups with Adobe XD", "Lara Hopkins", "DesignCraft Media", 349000, 220, 2, '2025-04-17 10:30:00'),
    ("draft", "Djikstra Algorithms in Java", "Michael Tan", "AlgoBooks", 319000, 400, 3, '2025-04-17 10:30:00'),
    ("publish", "Next.js 15", "Rizky Aditya", "IndoDev Press", 179000, 180, 4, '2021-04-17 10:30:00'),
    ("publish", "Database No SQL", "Samantha Lee", "QueryBooks Co.", 559000, 310, 5, '2025-04-17 10:30:00'),
    ("draft", "Mastering Base CSS", "Kevin Zhou", "CSSFactory", 139000, 210, 6, '2024-12-17 10:30:00'),
    ("publish", "Building Robust APIs with Node.js", "Nina Arias", "BackendPro Publishing", 319000, 330, 7, '2022-01-17 10:30:00'),
    ("publish", "Best Practices in React", "Denny Hartono", "JS Dev Works", 179000, 280, 8, '2021-03-17 10:30:00'),
    ("unpublish", "Software Development Process", "Jonathan Kim", "SoftWorks Media", 319000, 240, 9, '2024-04-17 10:30:00'),
    ("unpublish", "Artificial Intelligence", "Angela Park", "AIBridge Media", 779000, 370, 10, '2024-02-17 10:30:00');