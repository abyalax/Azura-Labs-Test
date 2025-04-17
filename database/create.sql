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
    books (status, title, author, publisher, price, pages, category_id)
VALUES
    ("publish", "JavaScript Mastery", "Ethan Walker", "TechVerse Publishing", 499000, 320, 1),
    ("unpublish", "The Art of UX Design", "Lara Hopkins", "DesignCraft Media", 379000, 220, 2),
    ("draft", "Data Structures in Depth", "Michael Tan", "AlgoBooks", 589000, 400, 3),
    ("publish", "Next.js untuk Pemula", "Rizky Aditya", "IndoDev Press", 299000, 180, 4),
    ("publish", "Database Optimization Techniques", "Samantha Lee", "QueryBooks Co.", 459000, 310, 5),
    ("draft", "Mastering Tailwind CSS", "Kevin Zhou", "CSSFactory", 349000, 210, 6),
    ("publish", "Building RESTful APIs with Node.js", "Nina Arias", "BackendPro Publishing", 519000, 330, 7),
    ("publish", "React State Management Guide", "Denny Hartono", "JS Dev Works", 429000, 280, 8),
    ("unpublish", "Agile Project Management", "Jonathan Kim", "SoftWorks Media", 389000, 240, 9),
    ("unpublish", "Machine Learning", "Angela Park", "AIBridge Media", 649000, 370, 10);