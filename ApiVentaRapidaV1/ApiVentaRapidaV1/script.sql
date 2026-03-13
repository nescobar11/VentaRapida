CREATE DATABASE bd_VentaRapida;
GO

USE bd_VentaRapida;
GO


CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    IsActive bit
);

CREATE TABLE Customers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NULL,
    IsActive bit
);

CREATE TABLE Sales (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL,
    SaleDate DATETIME NOT NULL,
    Total DECIMAL(12,2) NOT NULL,

    CONSTRAINT FK_Sales_Customers
    FOREIGN KEY (CustomerId)
    REFERENCES Customers(Id)
);

CREATE TABLE SaleItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SaleId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    SubTotal DECIMAL(12,2) NOT NULL,

    CONSTRAINT FK_SaleItems_Sales
    FOREIGN KEY (SaleId)
    REFERENCES Sales(Id),

    CONSTRAINT FK_SaleItems_Products
    FOREIGN KEY (ProductId)
    REFERENCES Products(Id)
);
GO

CREATE PROCEDURE sp_CreateSale
(
    @CustomerId INT,
    @Total DECIMAL(12,2)
) 
AS
BEGIN

    SET NOCOUNT ON;

    INSERT INTO Sales
    (
        CustomerId,
        SaleDate,
        Total
    )
    VALUES
    (
        @CustomerId,
        GETDATE(),
        @Total
    )

    SELECT SCOPE_IDENTITY() AS SaleId

END


INSERT INTO Products (Name, Price, Stock, IsActive) VALUES 
('Laptop Dell Inspiron 15', 750.00, 15, 1),
('Mouse Inalámbrico Logitech', 25.50, 50, 1),
('Teclado Mecánico RGB', 85.00, 20, 1),
('Monitor 24" Full HD', 145.99, 10, 1),
('Auriculares Gamer HyperX', 60.00, 25, 1),
('Cámara Web 1080p', 45.00, 30, 1),
('Impresora Multifuncional HP', 120.00, 8, 1),
('Disco Duro Externo 1TB', 55.00, 40, 1),
('Memoria RAM 16GB DDR4', 70.00, 12, 1),
('Silla Ergonómica Oficina', 190.00, 5, 1);
GO

INSERT INTO Customers (Name, Email, IsActive) VALUES 
('Natalia Silva', 'natalia.silva@email.com', 1),
('Juan Pérez', 'jperez@empresa.cl', 1),
('Andrea Morales', 'amorales_92@gmail.com', 1),
('Sebastián Tapia', 's.tapia.ventas@gmail.com', 1);
GO

INSERT INTO Sales (CustomerId, SaleDate, Total) VALUES 
(1, GETDATE(), 835.00), 
(2, GETDATE() - 1, 25.50), 
(3, GETDATE() - 2, 230.99);
GO