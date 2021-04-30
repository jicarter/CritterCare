using CritterCare.Models;
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
                        VALUES (@name)";

                    DbUtils.AddParameter(cmd, "@name", food.);

                    food.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteTag(int tagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From PostTag
                    WHERE TagId = @tagId
                    ";

                    DbUtils.AddParameter(cmd, "@tagId", tagId);

                    cmd.ExecuteNonQuery();
                }

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From Tag
                    WHERE Id = @tagId
                    ";

                    DbUtils.AddParameter(cmd, "@tagId", tagId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM Tag ORDER BY [Name]";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Tag>();

                    while (reader.Read())
                    {
                        categories.Add(new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        });
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        public Tag GetTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Name FROM Tag
                    WHERE Id = @id
                    ";


                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    Tag tag = null;

                    if (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        };
                    }

                    reader.Close();

                    return tag;
                }
            }
        }

        /// <summary>
        /// Allows user to edit a food.
        /// </summary>
        /// <param name="tag">The selected tag object to be edited.</param>
        public void UpdateTag(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Tag
                       SET Name = @Name
                     WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Name", tag.Name);
                    cmd.Parameters.AddWithValue("@Id", tag.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
