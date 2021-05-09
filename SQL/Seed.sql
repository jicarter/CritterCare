USE [CritterCare];
GO




set identity_insert [UserProfile] on
insert into [UserProfile] (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, FirebaseUserId) values (1, 'Foo', 'Foo', 'Barington', 'foo@bar.com', '2021-04-28', 'Op7EPlLlXhYliakjBEx0UusTNTi2');
set identity_insert [UserProfile] off

set identity_insert [Category] on
insert into Category (Id, [Name]) values (1, 'New Animal'), (2, 'Food'), (3, 'Medicine'), (4, 'Other')
set identity_insert [Category] off

set identity_insert [Critter] on 
insert into Critter (Id, Name, Breed, Sex, ImageLocation, Notes, UserProfileId) values (1, 'Oinky', 'Pig', 'Male', 'https://unsplash.com/photos/CP9GGy_LkIY', 'Oinky is a pig', 1 );
set identity_insert [Critter] off

set identity_insert [Food] on
insert into Food (Id, Type, Details, UserProfileId) values (1, 'Country Feeds Whole Life Pig Feed', 'Convenient, single feed appropriate for all pigs from 20 pounds to maturity as well as gestating sows, lactating sows and boars, Formulated to optimize performance of pastured pork, Fortifed with 16% protein, amino acids, vitamins and minerals to support healthy pigs, Meat and bone meal free, Complete feed, no additional supplements required, Pelleted form encourages consumption and helps to minimize waste, Nutrient-dense formulation supports growth and muscle development, Added zinc supports a healthy immune system', 1 );
set identity_insert [Food] off

set identity_insert [Medicine] on
insert into Medicine (Id, Type, Details, [Use], UserProfileId) values (1, 'SAFE_GUARD DEWORMER', '9 mg fenbendazole per kg body weight (4.08 mg fenbendazole per pound) to be fed as the sole ration over a period of 3 to 12 days.It is recommended that SAFE-GUARD® 20% Type A Medicated Article be diluted before addition to the feed. A dilution of one part of SAFE-GUARD®20% Type A Medicated Article and nine parts of grain carrier is the suggested working premix. The working premix is then blended with the complete feed mixture. Thoroughly mix both working premix and complete feed to ensure complete and uniform distribution of the SAFE-GUARD® 20% Type A Medicated Article.', 'Dewormer',1  );
set identity_insert [Medicine] off

set identity_insert [Expenses] on
insert into Expenses (Id, Name, Price, Store, Receipt, CategoryId, UserProfileId) values (1, 'Things','12.92', 'Amazon','https://unsplash.com/photos/CP9GGy_LkIY', 4, 1 );
set identity_insert [Expenses] off