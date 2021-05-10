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
    public class MedicineRepository : BaseRepository, IMedicineRepository
    {

        public MedicineRepository(IConfiguration configuration) : base(configuration) { }

        public void AddMedicine(Medicine medicine)
        {
            using (SqlConnection conn = Connection)
            {
                
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        INSERT INTO Medicine([Type], Details, [Use], UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@type, @details, @use, @userProfileId)";

                        cmd.Parameters.AddWithValue("@Type", medicine.Type);
                        cmd.Parameters.AddWithValue("@Details", medicine.Details);
                        cmd.Parameters.AddWithValue("@Use", medicine.Use);
                        cmd.Parameters.AddWithValue("@UserProfileId", medicine.UserProfileId);

                        medicine.Id = (int)cmd.ExecuteScalar();
                    }
                
            }
        }


        public void DeleteMedicine(int id)
        {
            var meds = GetAllMeds();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Critter
                        SET MedicineId = @MedicineId
                    WHERE MedicineId = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    if (id != meds[0].Id)
                    {
                        DbUtils.AddParameter(cmd, "@MedicineId", meds[0].Id);
                    }
                    else
                    {
                        DbUtils.AddParameter(cmd, "@MedicineId", meds[1].Id);
                    }


                    cmd.ExecuteNonQuery();
                }

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From Medicine
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Medicine> GetAllMeds()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Type], Details, UserProfileId
                                        FROM Medicine 
                                        ORDER BY [Type]";
                    var reader = cmd.ExecuteReader();

                    var meds = new List<Medicine>();

                    while (reader.Read())
                    {
                        meds.Add(new Medicine()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Type = reader.GetString(reader.GetOrdinal("Type")),
                            Details = reader.GetString(reader.GetOrdinal("Details")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                        });
                    }

                    reader.Close();

                    return meds;
                }
            }
        }

        public Medicine GetMedicineById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Type, Details, UserProfileId 
                    FROM Medicine
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "id", id);

                    var reader = cmd.ExecuteReader();

                    Medicine Medicine = null;

                    if (reader.Read())
                    {
                        Medicine = new Medicine()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Type = reader.GetString(reader.GetOrdinal("Type")),
                            Details = reader.GetString(reader.GetOrdinal("Details")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                        };
                    }

                    reader.Close();
                    return Medicine;
                }
            }
        }

       
        public void UpdateMedicine(Medicine Medicine)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Medicine
                       SET [Type] = @type,
                           [Details] = @details,
                           UserProfileId = @userProfileId
                     WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", Medicine.Id);
                    cmd.Parameters.AddWithValue("@type", Medicine.Type);
                    cmd.Parameters.AddWithValue("@details", Medicine.Details);
                    cmd.Parameters.AddWithValue("@userProfileId", Medicine.UserProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Medicine> GetMedsByUserProfileId(int UserProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT m.Id, m.[Type], m.Details, m.UserProfileId 
                    FROM Medicine m
                    LEFT JOIN UserProfile up ON m.UserProfileId = up.Id
                    WHERE m.UserProfileId = @id
                    ORDER BY m.[Type]
                    ";

                    
                    DbUtils.AddParameter(cmd, "@id", UserProfileId);
                    var reader = cmd.ExecuteReader();

                    var meds = new List<Medicine>();

                    while (reader.Read())
                    {
                       meds.Add(NewMedFromReader(reader))
                        ;
                    }

                    reader.Close();
                    return meds;
                }
            }
        }

        private Medicine NewMedFromReader(SqlDataReader reader)
        {
            return new Medicine()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Type = reader.GetString(reader.GetOrdinal("Type")),
                Details = reader.GetString(reader.GetOrdinal("Details")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                
            };
        }
    }
}


