CREATE DATABASE DashBoardify;

GO
USE DashBoardify
GO

CREATE LOGIN [DashboardifyUser]
WITH PASSWORD = '123456';

CREATE USER [DashboardifyUser] FOR LOGIN [DashboardifyUser];
ALTER ROLE [db_owner] ADD MEMBER [DashboardifyUser];
GO

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Items')
BEGIN
	 DROP TABLE Items
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'DashBoards')
BEGIN
	 DROP TABLE DashBoards
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
BEGIN
	 DROP TABLE Users
END




CREATE TABLE Users
(
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY, --1,1 means start from 1 and increase by 1
	Name VARCHAR(255) NOT NULL,
	Password VARCHAR(255) NOT NULL,
	Email VARCHAR(255) NOT NULL,
	IsActive BIT NOT NULL DEFAULT 1,
	DateRegistered DATETIME NOT NULL DEFAULT GETDATE(),
	DateModified DATETIME NOT NULL
)

GO

CREATE TABLE DashBoards
(
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	UserId INT NOT NULL,
	IsActive BIT NOT NULL DEFAULT 1,
	Name VARCHAR(255) NOT NULL,
	DateCreated DATETIME NOT NULL DEFAULT GETDATE(),
	DateModified DATETIME NOT NULL
)


CREATE TABLE Items
(
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	DashBoardId INT NOT NULL,
	Name VARCHAR(255) NOT NULL,
	Website VARCHAR(255) NOT NULL,
	CheckInterval INT NOT NULL,
	IsActive BIT NOT NULL DEFAULT 1,
	XPath VARCHAR(255) NOT NULL,
	LastChecked DATETIME NOT NULL,
	Created DATETIME NOT NULL DEFAULT GETDATE(),
	Modified DATETIME NOT NULL,
	ScrnshtURL VARCHAR(255) NOT NULL,

)




ALTER TABLE DashBoards ADD CONSTRAINT FK_Users_DashBoards FOREIGN KEY (UserID) REFERENCES Users(Id)
ALTER TABLE Items ADD CONSTRAINT FK_DashBoards_Items FOREIGN KEY (DashBoardID) REFERENCES DashBoards(Id)



INSERT INTO Users (Name, Password, Email, DateModified) VALUES('Laba diena', 'asd56a+5d6asd', 'email@mail.lt', GETDATE())

DECLARE @User1Id INT = (SELECT Id FROM Users WHERE Name = 'Laba diena')


INSERT INTO DashBoards (Name, UserID, DateModified) VALUES('AUDINES', @User1Id, GETDATE())

DECLARE @DashId INT = (SELECT Id FROM DashBoards WHERE Name ='AUDINES')

INSERT INTO Items(DashBoardID, Name,Website, CheckInterval,XPath,LastChecked,Modified,ScrnshtURL) VALUES(@DashId,'BULKA','http://www.autogidas.lt/automobiliai/',20,'/html[1]/body[1]/div[1]/div[8]/div[1]/div[2]/a[1]/div[1]/div[3]/div[2]/div[3]',GETDATE(),GETDATE(),'http://autogidas-img.dgn.lt/4_21_83702552/audi-80-b3-sedanas-1987.jpg')