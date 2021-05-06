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

        public void AddCritter(Critter critter)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Critter(Type, Details)
                        OUTPUT INSERTED.ID
                        VALUES (@type)";

                    DbUtils.AddParameter(cmd, "@type", critter);

                    critter.Id = (int)cmd.ExecuteScalar();
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

        public List<Critter> GetAllCritters()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Breed, Sex, Image, Notes, UserProfileId 
                                        FROM Critter 
                                        WHERE UserProfileId = @UserProfileId 
                                        ORDER BY [Breed]";
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
                            Image = reader.GetString(reader.GetOrdinal("Image")),
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
                    SELECT Id, Name, Breed, Sex, Image, Notes, UserProfileId FROM Critter
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
                            Image = reader.GetString(reader.GetOrdinal("Image")),
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
                           Image = @Image,
                           Notes = @Notes
                     WHERE Id = @Id


                    UPDATE CritterMeds
                        SET MedicineId = @medicineId
                        WHERE CritterId = @id
                        ";

                    cmd.Parameters.AddWithValue("@Name", critter.Name);
                    cmd.Parameters.AddWithValue("@Breed", critter.Breed);
                    cmd.Parameters.AddWithValue("@Sex", critter.Sex);
                    cmd.Parameters.AddWithValue("@Image", critter.Image);
                    cmd.Parameters.AddWithValue("@Notes", critter.Notes);
                    cmd.Parameters.AddWithValue("@Id", critter.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}



