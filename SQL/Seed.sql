USE [CritterCare];
GO




set identity_insert [User] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, FirebaseUserId) values (1, 'Foo', 'Foo', 'Barington', 'foo@bar.com', '2020-04-23', 'HGIYeMTYpqfdwXpfSw2AUvxnvsC3');
set identity_insert [User] off

set identity_insert [Critter] on 
insert into Critter (Id, Name, Breed, Sex, Image, Notes, UserId) values (1, 'Oinky', 'Pig', 'Male', 'https://unsplash.com/photos/CP9GGy_LkIY', 'Oinky is a pig', 1);
set identity_insert [Critter] off

