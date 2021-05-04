﻿using CritterCare.Models;
using CritterCare.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
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
                        INSERT INTO Food(Type, Details)
                        OUTPUT INSERTED.ID
                        VALUES (@type)";

                    DbUtils.AddParameter(cmd, "@type", food);

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
                    cmd.CommandText = "SELECT Id, Type FROM Food ORDER BY [Type]";
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
                    SELECT Id, Type FROM Food
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

        /// <summary>
        /// Allows user to edit a food.
        /// </summary>
        /// <param name="food">The selected food object to be edited.</param>
        public void UpdateFood(Food food)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Food
                       SET Type = @Type
                     WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Type", food.Type);
                    cmd.Parameters.AddWithValue("@Id", food.Type);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
