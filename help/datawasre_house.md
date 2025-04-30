CREATE DATABASE RetailSales_DW;
USE RetailSales_DW;

CREATE TABLE DimCustomer (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerName VARCHAR(100),
    Gender VARCHAR(10),
    City VARCHAR(50)
);

CREATE TABLE DimProduct (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2)
);

CREATE TABLE DimStore (
    StoreID INT PRIMARY KEY AUTO_INCREMENT,
    StoreName VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50)
);

CREATE TABLE DimDate (
    DateID INT PRIMARY KEY,
    FullDate DATE,
    Year INT,
    Month INT,
    Day INT,
    Weekday VARCHAR(20)
);

CREATE TABLE DimSalesPerson (
    SalesPersonID INT PRIMARY KEY AUTO_INCREMENT,
    SalesPersonName VARCHAR(100),
    StoreID INT,
    FOREIGN KEY (StoreID) REFERENCES DimStore(StoreID)
);

CREATE TABLE FactSales (
    SalesID BIGINT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    ProductID INT,
    StoreID INT,
    DateID INT,
    SalesPersonID INT,
    QuantitySold INT,
    TotalAmount DECIMAL(10,2),
    FOREIGN KEY (CustomerID) REFERENCES DimCustomer(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES DimProduct(ProductID),
    FOREIGN KEY (StoreID) REFERENCES DimStore(StoreID),
    FOREIGN KEY (DateID) REFERENCES DimDate(DateID),
    FOREIGN KEY (SalesPersonID) REFERENCES DimSalesPerson(SalesPersonID)
);

INSERT INTO DimCustomer (CustomerName, Gender, City) VALUES
('Rahul Sharma', 'Male', 'Mumbai'),
('Anjali Verma', 'Female', 'Delhi'),
('Amit Singh', 'Male', 'Bangalore'),
('Priya Desai', 'Female', 'Pune');

INSERT INTO DimProduct (ProductName, Category, Price) VALUES
('Laptop', 'Electronics', 55000.00),
('Smartphone', 'Electronics', 30000.00),
('T-shirt', 'Clothing', 800.00),
('Shoes', 'Footwear', 2200.00);

INSERT INTO DimStore (StoreName, City, State) VALUES
('Reliance Digital', 'Mumbai', 'Maharashtra'),
('Croma', 'Delhi', 'Delhi'),
('Big Bazaar', 'Bangalore', 'Karnataka'),
('V-Mart', 'Pune', 'Maharashtra');

INSERT INTO DimDate (DateID, FullDate, Year, Month, Day, Weekday) VALUES
(20240425, '2024-04-25', 2024, 4, 25, 'Thursday'),
(20240426, '2024-04-26', 2024, 4, 26, 'Friday'),
(20240427, '2024-04-27', 2024, 4, 27, 'Saturday'),
(20240428, '2024-04-28', 2024, 4, 28, 'Sunday');

INSERT INTO DimSalesPerson (SalesPersonName, StoreID) VALUES
('Ravi Kumar', 1),
('Sunita Joshi', 2),
('Aakash Mehta', 3),
('Neha Sharma', 4);

INSERT INTO FactSales (CustomerID, ProductID, StoreID, DateID, SalesPersonID, QuantitySold, TotalAmount) VALUES
(1, 1, 1, 20240425, NULL, 1, 55000.00),
(2, 2, 2, 20240426, NULL, 1, 30000.00),
(3, 3, 3, 20240427, NULL, 2, 1600.00),
(4, 4, 4, 20240428, NULL, 1, 2200.00);


select * from FactSales



------------------end---------------------------











----------------------------start-------------------------

CREATE DATABASE Sales_DW;
USE Sales_DW;

-- Create Dimension Tables
CREATE TABLE DimCustomer (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerAltID VARCHAR(10) NOT NULL,
    CustomerName VARCHAR(50),
    Gender VARCHAR(20)
);

CREATE TABLE DimProduct (
    ProductKey INT PRIMARY KEY AUTO_INCREMENT,
    ProductAltKey VARCHAR(10) NOT NULL,
    ProductName VARCHAR(100),
    ProductActualCost DECIMAL(10,2),
    ProductSalesCost DECIMAL(10,2)
);

CREATE TABLE DimStores (
    StoreID INT PRIMARY KEY AUTO_INCREMENT,
    StoreAltID VARCHAR(10) NOT NULL,
    StoreName VARCHAR(100),
    StoreLocation VARCHAR(100),
    City VARCHAR(100),
    State VARCHAR(100),
    Country VARCHAR(100)
);

CREATE TABLE DimDate (
    DateKey INT PRIMARY KEY,
    FullDate DATE NOT NULL,
    Year INT NOT NULL,
    Month INT NOT NULL,
    MonthName VARCHAR(20) NOT NULL,
    Day INT NOT NULL,
    Weekday VARCHAR(20) NOT NULL
);

CREATE TABLE DimTime (
    TimeKey INT PRIMARY KEY,      
    TimeAltKey VARCHAR(6) NOT NULL, 
    FullTime TIME NOT NULL,       
    Hour INT NOT NULL,            
    Minute INT NOT NULL,          
    AMPM VARCHAR(2) NOT NULL,     
    TimeBucket VARCHAR(20) NOT NULL
);

-- Insert Date records first
INSERT INTO DimDate (DateKey, FullDate, Year, Month, MonthName, Day, Weekday) VALUES
(20130101, '2013-01-01', 2013, 1, 'January', 1, 'Tuesday'),
(20130102, '2013-01-02', 2013, 1, 'January', 2, 'Wednesday'),
(20130103, '2013-01-03', 2013, 1, 'January', 3, 'Thursday');

-- Stored procedure for Time dimension
DELIMITER $$

CREATE PROCEDURE PopulateDimTime()
BEGIN
    DECLARE h INT DEFAULT 0;
    DECLARE m INT DEFAULT 0;
    DECLARE time_val TIME;
    DECLARE time_key INT;
    DECLARE time_alt_key VARCHAR(6);
    DECLARE ampm VARCHAR(2);
    DECLARE time_bucket VARCHAR(20);

    WHILE h < 24 DO
        SET m = 0;
        WHILE m < 60 DO
            SET time_val = MAKETIME(h, m, 0);
            SET time_key = (h * 3600) + (m * 60);  -- Convert to seconds since midnight
            SET time_alt_key = CONCAT(LPAD(h,2,'0'), LPAD(m,2,'0'), '00');

            -- Set AM/PM
            IF h < 12 THEN
                SET ampm = 'AM';
            ELSE
                SET ampm = 'PM';
            END IF;

            -- Define time buckets
            IF h BETWEEN 0 AND 5 THEN
                SET time_bucket = 'Night';
            ELSEIF h BETWEEN 6 AND 11 THEN
                SET time_bucket = 'Morning';
            ELSEIF h BETWEEN 12 AND 17 THEN
                SET time_bucket = 'Afternoon';
            ELSE
                SET time_bucket = 'Evening';
            END IF;

            -- Insert into table
            INSERT INTO DimTime (TimeKey, TimeAltKey, FullTime, Hour, Minute, AMPM, TimeBucket)
            VALUES (time_key, time_alt_key, time_val, h, m, ampm, time_bucket);

            SET m = m + 1;
        END WHILE;
        SET h = h + 1;
    END WHILE;
END $$

DELIMITER ;

-- Insert specific time records needed for sample data
INSERT INTO DimTime (TimeKey, TimeAltKey, FullTime, Hour, Minute, AMPM, TimeBucket) VALUES
    (44347, '121907', '12:19:07', 12, 19, 'PM', 'Afternoon'),  
    (44519, '122159', '12:21:59', 12, 21, 'PM', 'Afternoon'),  
    (52415, '143335', '14:33:35', 14, 33, 'PM', 'Afternoon'),  
    (59326, '162846', '16:28:46', 16, 28, 'PM', 'Afternoon'),  
    (67390, '184310', '18:43:10', 18, 43, 'PM', 'Evening'),  
    (74877, '204757', '20:47:57', 20, 47, 'PM', 'Evening');

-- Insert store data
INSERT INTO DimStores (StoreAltID, StoreName, StoreLocation, City, State, Country) VALUES
('LOC-A1', 'X-Mart', 'S.P. Ring Road', 'Ahmedabad', 'Guj', 'India'),
('LOC-A2', 'X-Mart', 'Maninagar', 'Ahmedabad', 'Guj', 'India'),
('LOC-A3', 'X-Mart', 'Shivranjani', 'Ahmedabad', 'Guj', 'India'),
('LOC-B1', 'X-Mart', 'MG Road', 'Bangalore', 'Karnataka', 'India'),
('LOC-B2', 'X-Mart', 'Koramangala', 'Bangalore', 'Karnataka', 'India'),
('LOC-B3', 'X-Mart', 'Whitefield', 'Bangalore', 'Karnataka', 'India'),
('LOC-C1', 'X-Mart', 'Connaught Place', 'Delhi', 'Delhi', 'India'),
('LOC-C2', 'X-Mart', 'Saket', 'Delhi', 'Delhi', 'India'),
('LOC-D1', 'X-Mart', 'Gariahat', 'Kolkata', 'West Bengal', 'India'),
('LOC-D2', 'X-Mart', 'Salt Lake', 'Kolkata', 'West Bengal', 'India'),
('LOC-E1', 'X-Mart', 'Marine Drive', 'Mumbai', 'Maharashtra', 'India'),
('LOC-E2', 'X-Mart', 'Andheri', 'Mumbai', 'Maharashtra', 'India');

-- Insert customer data
INSERT INTO DimCustomer (CustomerAltID, CustomerName, Gender) VALUES
('IMI-001', 'Rahul Sharma', 'M'),
('IMI-002', 'Amit Patel', 'M'),
('IMI-003', 'Priya Iyer', 'F'),
('IMI-004', 'Arjun Verma', 'M'),
('IMI-005', 'Neha Singh', 'F'),
('IMI-006', 'Vikram Malhotra', 'M'),
('IMI-007', 'Sanjay Mehta', 'M'),
('IMI-008', 'Anjali Nair', 'F'),
('IMI-009', 'Pooja Reddy', 'F'),
('IMI-010', 'Kunal Joshi', 'M'),
('IMI-011', 'Meera Desai', 'F'),
('IMI-012', 'Rajesh Khanna', 'M'),
('IMI-013', 'Siddharth Kulkarni', 'M'),
('IMI-014', 'Komal Choudhary', 'F'),
('IMI-015', 'Rakesh Gupta', 'M'),
('IMI-016', 'Swati Saxena', 'F'),
('IMI-017', 'Abhishek Rao', 'M'),
('IMI-018', 'Manisha Pillai', 'F'),
('IMI-019', 'Yashwant Dubey', 'M'),
('IMI-020', 'Simran Kapoor', 'F');

-- Insert product data
INSERT INTO DimProduct (ProductAltKey, ProductName, ProductActualCost, ProductSalesCost) VALUES
('ITM-001', 'Wheat Flour 1kg', 5.50, 6.50),
('ITM-002', 'Rice Grains 1kg', 22.50, 24.00),
('ITM-003', 'Sunflower Oil 1L', 42.00, 43.50),
('ITM-004', 'Nirma Soap', 18.00, 20.00),
('ITM-005', 'Ariel Washing Powder 1kg', 135.00, 139.00),
('ITM-006', 'Fortune Basmati Rice 5kg', 450.00, 480.00),
('ITM-007', 'Tata Salt 1kg', 25.00, 28.00),
('ITM-008', 'Patanjali Honey 500g', 120.00, 135.00),
('ITM-009', 'Maggi Noodles 280g', 50.00, 55.00),
('ITM-010', 'Amul Butter 500g', 245.00, 260.00),
('ITM-011', 'Parle-G Biscuits 800g', 90.00, 100.00),
('ITM-012', 'Dove Shampoo 650ml', 330.00, 349.00),
('ITM-013', 'Colgate Toothpaste 200g', 120.00, 130.00),
('ITM-014', 'Bru Instant Coffee 100g', 160.00, 175.00),
('ITM-015', 'Britannia Cake 250g', 85.00, 95.00);

-- Create DimSalesPerson table (after DimStores is created and populated)
CREATE TABLE DimSalesPerson (
    SalesPersonID INT PRIMARY KEY AUTO_INCREMENT,
    SalesPersonAltID VARCHAR(10) NOT NULL,
    SalesPersonName VARCHAR(100),
    StoreID INT,
    City VARCHAR(100),
    State VARCHAR(100),
    Country VARCHAR(100),
    FOREIGN KEY (StoreID) REFERENCES DimStores(StoreID) ON DELETE CASCADE
);

-- Insert sales person data
INSERT INTO DimSalesPerson (SalesPersonAltID, SalesPersonName, StoreID, City, State, Country) VALUES
('SP-DMSPR1', 'Ashish', 1, 'Ahmedabad', 'Guj', 'India'),
('SP-DMSPR2', 'Ketan', 1, 'Ahmedabad', 'Guj', 'India'),
('SP-DMNGR1', 'Srinivas', 2, 'Ahmedabad', 'Guj', 'India'),
('SP-DMNGR2', 'Saad', 2, 'Ahmedabad', 'Guj', 'India'),
('SP-DMSVR1', 'Jasmin', 3, 'Ahmedabad', 'Guj', 'India'),
('SP-DMSVR2', 'Jacob', 3, 'Ahmedabad', 'Guj', 'India');

-- Create Fact table after all dimension tables are created
CREATE TABLE FactProductSales (
    TransactionId BIGINT AUTO_INCREMENT PRIMARY KEY,
    SalesInvoiceNumber INT NOT NULL,
    SalesDateKey INT,  
    SalesTimeKey INT,  
    SalesTimeAltKey VARCHAR(6), -- Changed from INT to VARCHAR to match DimTime
    StoreID INT NOT NULL,  
    CustomerID INT NOT NULL,  
    ProductKey INT NOT NULL,  
    SalesPersonID INT NOT NULL,  
    Quantity FLOAT,
    SalesTotalCost DECIMAL(10,2),  
    ProductActualCost DECIMAL(10,2),  
    Deviation DECIMAL(10,2), -- Changed from FLOAT for consistency
    
    FOREIGN KEY (SalesDateKey) REFERENCES DimDate(DateKey),
    FOREIGN KEY (SalesTimeKey) REFERENCES DimTime(TimeKey),
    FOREIGN KEY (StoreID) REFERENCES DimStores(StoreID),
    FOREIGN KEY (CustomerID) REFERENCES DimCustomer(CustomerID),
    FOREIGN KEY (ProductKey) REFERENCES DimProduct(ProductKey),
    FOREIGN KEY (SalesPersonID) REFERENCES DimSalesPerson(SalesPersonID)
);
-- First, add the missing time entry for 59349 ('162909')
INSERT INTO DimTime (TimeKey, TimeAltKey, FullTime, Hour, Minute, AMPM, TimeBucket) VALUES
    (59349, '162909', '16:29:09', 16, 29, 'PM', 'Afternoon');

-- Now verify all the time keys needed for the fact table exist
SELECT * FROM DimTime WHERE TimeKey IN (44347, 44519, 52415, 59326, 59349, 67390, 74877);

-- If the verification shows all time keys exist, then retry the FactProductSales insert
INSERT INTO FactProductSales (
    SalesInvoiceNumber, SalesDateKey, SalesTimeKey, SalesTimeAltKey,
    StoreID, CustomerID, ProductKey, SalesPersonID, Quantity,
    ProductActualCost, SalesTotalCost, Deviation
) VALUES
-- 1st Jan 2013
(1, 20130101, 44347, '121907', 1, 1, 1, 1, 2, 11, 13, 2),
(1, 20130101, 44347, '121907', 1, 1, 2, 1, 1, 22.50, 24, 1.5),
(1, 20130101, 44347, '121907', 1, 1, 3, 1, 1, 42, 43.5, 1.5),

(2, 20130101, 44519, '122159', 1, 2, 3, 1, 1, 42, 43.5, 1.5),
(2, 20130101, 44519, '122159', 1, 2, 4, 1, 3, 54, 60, 6),

(3, 20130101, 52415, '143335', 1, 3, 2, 2, 2, 11, 13, 2),
(3, 20130101, 52415, '143335', 1, 3, 3, 2, 1, 42, 43.5, 1.5),
(3, 20130101, 52415, '143335', 1, 3, 4, 2, 3, 54, 60, 6),
(3, 20130101, 52415, '143335', 1, 3, 5, 2, 1, 135, 139, 4),

-- 2nd Jan 2013
(4, 20130102, 44347, '121907', 1, 1, 1, 1, 2, 11, 13, 2),
(4, 20130102, 44347, '121907', 1, 1, 2, 1, 1, 22.50, 24, 1.5),

(5, 20130102, 44519, '122159', 1, 2, 3, 1, 1, 42, 43.5, 1.5),
(5, 20130102, 44519, '122159', 1, 2, 4, 1, 3, 54, 60, 6),

(6, 20130102, 52415, '143335', 1, 3, 2, 2, 2, 11, 13, 2),
(6, 20130102, 52415, '143335', 1, 3, 5, 2, 1, 135, 139, 4),

(7, 20130102, 44347, '121907', 2, 1, 4, 3, 3, 54, 60, 6),
(7, 20130102, 44347, '121907', 2, 1, 5, 3, 1, 135, 139, 4),

-- 3rd Jan 2013
(8, 20130103, 59326, '162846', 1, 1, 3, 1, 2, 84, 87, 3),
(8, 20130103, 59326, '162846', 1, 1, 4, 1, 3, 54, 60, 3),

(9, 20130103, 59349, '162909', 1, 2, 1, 1, 1, 5.5, 6.5, 1),
(9, 20130103, 59349, '162909', 1, 2, 2, 1, 1, 22.50, 24, 1.5),

(10, 20130103, 67390, '184310', 1, 3, 1, 2, 2, 11, 13, 2),
(10, 20130103, 67390, '184310', 1, 3, 4, 2, 3, 54, 60, 6),

(11, 20130103, 74877, '204757', 2, 1, 2, 3, 1, 5.5, 6.5, 1),
(11, 20130103, 74877, '204757', 2, 1, 3, 3, 1, 42, 43.5, 1.5);

select * from FactProductSales
