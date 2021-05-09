﻿using CritterCare.Models;
using CritterCare.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    public class ExpenseRepository : BaseRepository, IExpenseRepository
    {
        public ExpenseRepository(IConfiguration configuration) : base(configuration) { }

        public void AddExpense(Expenses Expense)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Expenses ([Name], Price, Store, Receipt, CategoryId, UserProfileId)
                    OUTPUT INSERTED.ID
                    VALUES (@name);
                    ";

                    cmd.Parameters.AddWithValue("@name", Expense.Name);
                    cmd.Parameters.AddWithValue("@price", Expense.Price);
                    cmd.Parameters.AddWithValue("@store", Expense.Store);
                    cmd.Parameters.AddWithValue("@receipt", Expense.Receipt);
                    cmd.Parameters.AddWithValue("@categoryId", Expense.CategoryId); 
 
                    int newlyCreatedId = (int)cmd.ExecuteScalar();

                    Expense.Id = newlyCreatedId;
                }
            }
        }


        public void DeleteExpense(int id)
        {
           
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    
                    cmd.CommandText = @"
                    DELETE From Expenses
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Expenses> GetAllExpenses()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Name], Price, Store, Receipt, CategoryId, UserProfileId 
                                        FROM Expenses 
                                        ORDER BY [Name]";

                    var reader = cmd.ExecuteReader();

                    var expenses = new List<Expenses>();

                    while (reader.Read())
                    {
                        expenses.Add(new Expenses()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                            Store = reader.GetString(reader.GetOrdinal("Store")),
                            Receipt = reader.GetString(reader.GetOrdinal("Receipt")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),

                        });
                    }

                    reader.Close();

                    return expenses;
                }
            }
        }

        public Expenses GetExpenseById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, [Name], Price, Store, Receipt, CategoryId, UserProfileId
                    FROM Expenses
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "id", id);

                    var reader = cmd.ExecuteReader();

                    Expenses Expense = null;

                    if (reader.Read())
                    {
                        Expense = new Expenses()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                            Store = reader.GetString(reader.GetOrdinal("Store")),
                            Receipt = reader.GetString(reader.GetOrdinal("Receipt")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                        };
                    }

                    reader.Close();
                    return Expense;
                }
            }
        }

       
        public void UpdateExpense(Expenses Expense)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Expenses
                       SET Name = @Name,
                           Price = @Price,
                           Store = @Store,
                           Receipt = @Receipt,
                           CategoryId = @CategoryId,
                           UserProfileId = @UserProfileId

                     WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Name", Expense.Name);
                    cmd.Parameters.AddWithValue("@Id", Expense.Id);
                    cmd.Parameters.AddWithValue("@Price", Expense.Price);
                    cmd.Parameters.AddWithValue("@Store", Expense.Store);
                    cmd.Parameters.AddWithValue("@Receipt", Expense.Receipt);
                    cmd.Parameters.AddWithValue("@CategoryId", Expense.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", Expense.UserProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Expenses> GetExpensesByUserProfileId(int UserProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT e.Id, e.[Name], e.Price, e.Store, e.Receipt, e.CategoryId, e.UserProfileId
                    FROM Expenses e
                    LEFT JOIN UserProfile up ON e.UserProfileId = up.Id
                    LEFT JOIN Category c ON e.CategoryId = c.Id 
                    WHERE e.UserProfileId = @id
                    ORDER BY [Name]
                    ";

                    
                    DbUtils.AddParameter(cmd, "@id", UserProfileId);
                    var reader = cmd.ExecuteReader();

                    var meds = new List<Expenses>();

                    while (reader.Read())
                    {
                        meds.Add(NewExpenseFromReader(reader))
                         ;
                    }

                    reader.Close();
                    return meds;
                }
            }
        }

        private Expenses NewExpenseFromReader(SqlDataReader reader)
        {
            return new Expenses()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                Store = reader.GetString(reader.GetOrdinal("Store")),
                Receipt = reader.GetString(reader.GetOrdinal("Receipt")),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),

            };
        }
    }
}
