using CritterCare.Models;
using CritterCare.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    public class FoodRepository : BaseRepository, IFoodRepository
    {
        public FoodRepository(IConfiguration configuration) : base(configuration) { }

        public void AddFood(Food food)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Food([Type], Details, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@type, @details, @userProfileId)";

                    cmd.Parameters.AddWithValue("@Type", food.Type);
                    cmd.Parameters.AddWithValue("@Details", food.Details);
                    cmd.Parameters.AddWithValue("@UserProfileId", food.UserProfileId);

                    food.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteFood(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From Food
                    WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", Id);

                    cmd.ExecuteNonQuery();
                }

            }
        }

        public List<Food> GetAllFood()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Type], Details 
                                        FROM Food 
                                        ORDER BY [Type]";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Food>();

                    while (reader.Read())
                    {
                        categories.Add(new Food()
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

        public Food GetFoodById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, [Type], Details
                    FROM Food
                    WHERE Id = @id
                    ";


                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    Food food = null;

                    if (reader.Read())
                    {
                        food = new Food()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Type = reader.GetString(reader.GetOrdinal("Type")),
                            Details = reader.GetString(reader.GetOrdinal("Details"))
                        };
                    }

                    reader.Close();

                    return food;
                }
            }
        }

        
        public void UpdateFood(Food food)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Food
                       SET Type = @Type,
                           Details = @Details
                     WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Type", food.Type);
                    cmd.Parameters.AddWithValue("@Id", food.Id);
                    cmd.Parameters.AddWithValue("@Details", food.Details);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Food> GetFoodByUserProfileId(int UserProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id, f.[Type], f.Details, f.UserProfileId 
                    FROM Food f
                    LEFT JOIN UserProfile up ON f.UserProfileId = up.Id
                    WHERE f.UserProfileId = @id
                    ORDER BY [Type]
                    ";

                   
                    DbUtils.AddParameter(cmd, "@id", UserProfileId);
                    var reader = cmd.ExecuteReader();

                    var meds = new List<Food>();

                    while (reader.Read())
                    {
                        meds.Add(NewFoodFromReader(reader))
                         ;
                    }

                    reader.Close();
                    return meds;
                }
            }
        }

        private Food NewFoodFromReader(SqlDataReader reader)
        {
            return new Food()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Type = reader.GetString(reader.GetOrdinal("Type")),
                Details = reader.GetString(reader.GetOrdinal("Details")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),

            };
        }

    }
}
