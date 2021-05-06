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
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public void AddCategory(Category category)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Category ([Name])
                    OUTPUT INSERTED.ID
                    VALUES (@name);
                    ";

                    cmd.Parameters.AddWithValue("@name", category.Name);

                    int newlyCreatedId = (int)cmd.ExecuteScalar();

                    category.Id = newlyCreatedId;
                }
            }
        }


        public void DeleteCategory(int id)
        {
            var categories = GetAllCategories();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Expense
                        SET CategoryId = @CategoryId
                    WHERE CategoryId = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    if (id != categories[0].Id)
                    {
                        DbUtils.AddParameter(cmd, "@CategoryId", categories[0].Id);
                    }
                    else
                    {
                        DbUtils.AddParameter(cmd, "@CategoryId", categories[1].Id);
                    }


                    cmd.ExecuteNonQuery();
                }

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From Category
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name] FROM Category ORDER BY [Name]";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
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

        public Category GetCategoryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, [Name] FROM Category
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "id", id);

                    var reader = cmd.ExecuteReader();

                    Category category = null;

                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();
                    return category;
                }
            }
        }

        
        public void UpdateCategory(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Category
                       SET [Name] = @Name
                     WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Name", category.Name);
                    cmd.Parameters.AddWithValue("@Id", category.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
