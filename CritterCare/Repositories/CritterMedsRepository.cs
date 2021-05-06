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
    public class CritterMedsRepository : BaseRepository, ICritterMedsRepository
    {
        public CritterMedsRepository(IConfiguration configuration) : base(configuration) { }
        public void InsertMedicine(CritterMeds CritterMeds)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO CritterMeds (MedsId, CritterId, Notes)
                                        OUTPUT INSERTED.ID
                                        VALUES (@MedsId, @CritterId)";

                    cmd.Parameters.AddWithValue("@MedsId", CritterMeds.MedsId);
                    cmd.Parameters.AddWithValue("@CritterId", CritterMeds.CritterId);
                    cmd.Parameters.AddWithValue("@Notes", CritterMeds.Notes);
                    int id = (int)cmd.ExecuteScalar();
                    CritterMeds.Id = id;

                }
            }
        }

        public void DeleteCritterMeds(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From CritterMeds
                    WHERE id = @CritterMedsId
                    ";

                    DbUtils.AddParameter(cmd, "@CritterMedsId", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<CritterMeds> GetMedsByCritterId(int CritterId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT cm.id, cm.MedsId, cm.CritterId, c.name
                    FROM CritterMeds cm
                    
                    JOIN Critter c ON c.Id = cm.CritterId
                    JOIN Medicine m ON m.Id = cm.MedsId
                    WHERE cm.MedsId = @id";

                    cmd.Parameters.AddWithValue("@id", CritterId);

                    var reader = cmd.ExecuteReader();
                    var CritterMedss = new List<CritterMeds>();
                    while (reader.Read())
                    {
                        CritterMeds CritterMeds = new CritterMeds
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            MedsId = reader.GetInt32(reader.GetOrdinal("MedsId")),
                            CritterId = reader.GetInt32(reader.GetOrdinal("CritterId")),
                            Notes = reader.GetString(reader.GetOrdinal("Notes"))

                        };
                        CritterMedss.Add(CritterMeds);
                    }
                    reader.Close();
                    return CritterMedss;
                }
            }
        }
    }
}
