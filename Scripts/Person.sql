CREATE TABLE [dbo].[PersonInfo]
(
	[PersonId] INT Identity PRIMARY KEY,
	[PersonFirstName] varchar(30) Not Null,
	[PersonLastName] varchar(40) Not Null,
	[Address] varchar(300) Not Null,
	[DateOfBirth] DateTime Not Null,
	[Age] int Not null,
	[Gender] varchar(8) Not Null,
	[City] varchar(30) Not Null,
	[District] varchar(30) Not Null,
	[State] varchar(30) Not Null,
	[MobileNo] varchar(20) Not Null,
	[Email] varchar(40) Not Null
)
