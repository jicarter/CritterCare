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
    public class CritterFoodRepository : BaseRepository, ICritterFoodRepository
    {

        public CritterFoodRepository(IConfiguration configuration) : base(configuration) { }
        public void AddFood(CritterFood CritterFood)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO CritterFood (FoodId, CritterId, Notes)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FoodId, @CritterId)";

                    cmd.Parameters.AddWithValue("@FoodId", CritterFood.FoodId);
                    cmd.Parameters.AddWithValue("@CritterId", CritterFood.CritterId);
                    cmd.Parameters.AddWithValue("@Notes", CritterFood.Notes);
                    int id = (int)cmd.ExecuteScalar();
                    CritterFood.Id = id;

                }
            }
        }

        public void DeleteCritterFood(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From CritterFood
                    WHERE id = @CritterFoodId
                    ";

                    DbUtils.AddParameter(cmd, "@CritterFoodId", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<CritterFood> GetMedsByCritterId(int CritterId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT cm.id, cm.FoodId, cm.CritterId, c.name
                    FROM CritterFood cm
                    
                    JOIN Critter c ON c.Id = cm.CritterId
                    JOIN Medicine m ON m.Id = cm.FoodId
                    WHERE cm.FoodId = @id";

                    cmd.Parameters.AddWithValue("@id", CritterId);

                    var reader = cmd.ExecuteReader();
                    var CritterFoods = new List<CritterFood>();
                    while (reader.Read())
                    {
                        CritterFood CritterFood = new CritterFood
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FoodId = reader.GetInt32(reader.GetOrdinal("FoodId")),
                            CritterId = reader.GetInt32(reader.GetOrdinal("CritterId")),
                            Notes = reader.GetString(reader.GetOrdinal("Notes"))

                        };
                        CritterFoods.Add(CritterFood);
                    }
                    reader.Close();
                    return CritterFoods;
                }
            }
        }
    }
}
