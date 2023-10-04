ALTER USER 'root'@'localhost' IDENTIFIED WITH 'caching_sha2_password' BY '123';


use pro

CREATE TABLE testimonials (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  quote TEXT,
  image VARCHAR(255),
  date DATE
);



CREATE TABLE yoga_classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  img VARCHAR(255),
  start_date DATETIME,
  end_date DATETIME,
  fees DECIMAL(10, 2),
  duration VARCHAR(50),
  schedule VARCHAR(255),
  location VARCHAR(255),
  level VARCHAR(50),
  max_students INT,
  class_size INT,
  class_type VARCHAR(50),
  instructor_name VARCHAR(255),
  instructor_email VARCHAR(255),
  ratings DECIMAL(3, 1),
  reviews JSON,
  url VARCHAR(255) UNIQUE
);

show databases;

use pro;

select * from yoga_classes;