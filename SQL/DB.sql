USE [master]

IF db_id('CritterCare') IS NULl
  CREATE DATABASE [CritterCare]
GO

USE [CritterCare]
GO


DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Critter];
DROP TABLE IF EXISTS [Food];
DROP TABLE IF EXISTS [Medicine];
DROP TABLE IF EXISTS [CritterMeds];
DROP TABLE IF EXISTS [CritterFood];
DROP TABLE IF EXISTS [Expenses];
DROP TABLE IF EXISTS [Category];

GO



CREATE TABLE [User] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,

  
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)



CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Critter] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [Breed] text NOT NULL,
  [ImageLocation] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [Sex] nvarchar(255) NOT NULL,
  [UserId] integer NOT NULL,

  CONSTRAINT [FK_Critter_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
  
)

CREATE TABLE [Food] (
[Id] integer PRIMARY KEY IDENTITY,
[Type] nvarchar(255) NOT NULL,
[Details] text NOT NULL

)

CREATE TABLE [Medicine] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Type] nvarchar(255) NOT NULL,
  [Use] text NOT NULL,
  [Details] text NOT NULL,
  [CreateDateTime] datetime NOT NULL

)

CREATE TABLE [CritterFood] (
  [id] integer PRIMARY KEY IDENTITY,
  [CritterId] integer NOT NULL,
  [FoodId] integer NOT NULL,
  [Notes] text NOT NULL,
  [Current] bit DEFAULT 1 NOT NULL, 
  
  CONSTRAINT [FK_CritterFood_Critter] FOREIGN KEY ([CritterId]) REFERENCES [Critter] ([Id]),
  CONSTRAINT [FK_CritterFood_Food] FOREIGN KEY ([FoodId]) REFERENCES [Food] ([Id])
)

CREATE TABLE [CritterMeds] (
  [Id] integer PRIMARY KEY IDENTITY,
  [CritterId] integer NOT NULL,
  [MedsId] integer NOT NULL,
  [Notes] text NOT NULL,
  [Current] bit DEFAULT 1 NOT NULL,

  CONSTRAINT [FK_CritterMeds_Critter] FOREIGN KEY ([CritterId]) REFERENCES [Critter] ([Id]),
  CONSTRAINT [FK_CritterMeds_Medicine] FOREIGN KEY ([MedsId]) REFERENCES [Medicine] ([Id])
 
)

CREATE TABLE [Expenses] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [Price] decimal NOT NULL,
  [Store] nvarchar(255),
  [Receipt] nvarchar(255) NOT NULL,
  [CategoryId] int NOT NULL, 
  [UserId] integer NOT NULL,

  CONSTRAINT [FK_Expenses_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Expenses_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])

)
GO