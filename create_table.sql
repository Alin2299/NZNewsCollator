-- SQL file that creates the table for the news collator
CREATE TABLE nz_news_collator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publishDate DATETIME,
    link VARCHAR(255)
);
