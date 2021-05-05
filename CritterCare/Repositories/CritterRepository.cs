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
        
        public class CritterRepository :  BaseRepository, ICritterRepository
        {
            public CritterRepository(IConfiguration configuration) : base(configuration) { }

            public void AddCritter(Critter Critter)
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

                        DbUtils.AddParameter(cmd, "@type", Critter);

                        Critter.Id = (int)cmd.ExecuteScalar();
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

            public List<Critter> GetAllCritter()
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = "SELECT Id, Type FROM Critter ORDER BY [Type]";
                        var reader = cmd.ExecuteReader();

                        var categories = new List<Critter>();

                        while (reader.Read())
                        {
                            categories.Add(new Critter()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Type = reader.GetString(reader.GetOrdinal("Type")),
                                Details = reader.GetString(reader.GetOrdinal("Details"))
                            });
                        }

                        reader.Close();

                        return categories;
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
                    SELECT Id, Type FROM Critter
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
                                Type = reader.GetString(reader.GetOrdinal("Type")),
                                Details = reader.GetString(reader.GetOrdinal("Details"))
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
                       SET Type = @Type
                     WHERE Id = @Id";

                        cmd.Parameters.AddWithValue("@Type", critter.Type);
                        cmd.Parameters.AddWithValue("@Id", critter.Type);

                        cmd.ExecuteNonQuery();
                    }
                }
            }

        }
    }

}
}
