using CritterCare.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using CritterCare.Utils;
using System.Data.SqlClient;

namespace CritterCare.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, 
                               u.Email, u.CreateDateTime
                          FROM UserProfile u
                         WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile UserProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        UserProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                        };
                    }
                    reader.Close();

                    return UserProfile;
                }
            }
        }

        public void Add(UserProfile UserProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, 
                                                                 Email, CreateDateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @CreateDateTime)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", UserProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", UserProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", UserProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", UserProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", UserProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", UserProfile.CreateDateTime);

                    UserProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.id, u.FirstName, u.LastName, u.DisplayName, u.Email,
                              u.CreateDateTime
                        FROM UserProfile u
                              ORDER BY u.DisplayName ASC
                    ";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<UserProfile> UserProfiles = new List<UserProfile>();

                    while (reader.Read())
                    {
                        UserProfile UserProfile = new UserProfile
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            
                        };

                        UserProfiles.Add(UserProfile);
                    }

                    reader.Close();
                    return UserProfiles;
                }
            }
        }

        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, FirstName, LastName, DisplayName, Email,
                              CreateDateTime
                              
                         FROM [UserProfile] 
                              WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    UserProfile UserProfile = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        UserProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                        };
                    }

                    reader.Close();
                    return UserProfile;
                }
            }
        }
    }
}
