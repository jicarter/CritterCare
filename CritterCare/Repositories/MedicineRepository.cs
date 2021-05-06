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

        public void AddMedicine(Medicine Medicine)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Medicine ([Type], Details, UserProfileId)
                    OUTPUT INSERTED.ID
                    VALUES (@[Type], @Details, @UserProfileId);
                    ";

                    cmd.Parameters.AddWithValue("@[Type]", Medicine.Type);
                    cmd.Parameters.AddWithValue("@[Details]", Medicine.Details);
                    cmd.Parameters.AddWithValue("@UserProfileId", Medicine.UserProfileId);
                    
                    int newlyCreatedId = (int)cmd.ExecuteScalar();

                    Medicine.Id = newlyCreatedId;
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
                       SET Name = @Name
                     WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", Medicine.Id);
                    cmd.Parameters.AddWithValue("@[Type]", Medicine.Type);
                    cmd.Parameters.AddWithValue("@[Details]", Medicine.Details);
                    cmd.Parameters.AddWithValue("@UserProfileId", Medicine.UserProfileId);

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
                    SELECT Id, Type, Details, UserProfileId 
                    FROM Medicine m
                    LEFT JOIN UserProfile up ON m.UserProfileId = up.Id
                    WHERE m.UserProfileId = @id
                    ORDER BY [Type]
                    ";

                    cmd.Parameters.AddWithValue("id", UserProfileId);

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


