using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using CritterCare.Models;
using CritterCare.Repositories;
using Microsoft.Extensions.Configuration;
using CritterCare.Utils;
using System.Collections.Generic;

namespace CritterCare.Repositories
{

    public class CritterRepository : BaseRepository, ICritterRepository
    {
        public CritterRepository(IConfiguration configuration) : base(configuration) { }

        public int AddCritter(Critter critter)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Critter(Name, Breed, Sex, ImageLocation, Notes, userProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @breed, @sex, @imageLocation, @notes, @userProfileId)";

                    DbUtils.AddParameter(cmd, "@name", critter.Name);
                    DbUtils.AddParameter(cmd, "@breed", critter.Breed);
                    DbUtils.AddParameter(cmd, "@sex", critter.Sex);
                    DbUtils.AddParameter(cmd, "@imageLocation", critter.ImageLocation);
                    DbUtils.AddParameter(cmd, "@notes", critter.Notes);
                    DbUtils.AddParameter(cmd, "@userProfileId", critter.UserProfileId);
                   

                    return critter.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteCritter(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From Critter
                    WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", Id);

                    cmd.ExecuteNonQuery();
                }

            }
        }

        public List<Critter> GetAllUsersCritters(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.[Name], c.Breed, c.Sex, c.[ImageLocation], c.Notes, c.UserProfileId 
                                        FROM Critter c
                                        LEFT JOIN UserProfile u ON c.UserProfileId = u.Id
                                        WHERE c.UserProfileId = @userProfileId 
                                        ";
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var critters = new List<Critter>();

                    while (reader.Read())
                    {
                        critters.Add(new Critter()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Breed = reader.GetString(reader.GetOrdinal("Breed")),
                            Sex = reader.GetString(reader.GetOrdinal("Sex")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                            Notes = reader.GetString(reader.GetOrdinal("Notes")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                        });
                    }

                    reader.Close();

                    return critters;
                }
            }
        }

        public Critter GetCritterById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Name, Breed, Sex, ImageLocation, Notes, UserProfileId FROM Critter
                    WHERE Id = @id
                    ";


                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    Critter Critter = null;

                    if (reader.Read())
                    {
                        Critter = new Critter()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Breed = reader.GetString(reader.GetOrdinal("Breed")),
                            Sex = reader.GetString(reader.GetOrdinal("Sex")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                            Notes = reader.GetString(reader.GetOrdinal("Notes")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                        };
                    }

                    reader.Close();

                    return Critter;
                }
            }
        }


        public void UpdateCritter(Critter critter)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Critter
                       SET Name = @Name,
                           Breed = @Breed,
                           Sex = @Sex,
                           ImageLocation = @ImageLocation,
                           Notes = @Notes
                     WHERE Id = @Id


                    UPDATE CritterMeds
                        SET MedicineId = @medicineId
                        WHERE CritterId = @id
                        ";

                    cmd.Parameters.AddWithValue("@Name", critter.Name);
                    cmd.Parameters.AddWithValue("@Breed", critter.Breed);
                    cmd.Parameters.AddWithValue("@Sex", critter.Sex);
                    cmd.Parameters.AddWithValue("@ImageLocation", critter.ImageLocation);
                    cmd.Parameters.AddWithValue("@Notes", critter.Notes);
                    cmd.Parameters.AddWithValue("@Id", critter.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}



