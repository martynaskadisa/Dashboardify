﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Dashboardify.Models;

namespace Dashboardify.Repositories
{
    public class UserSessionRepository
    {
        private string _connectionString;

        public UserSessionRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public bool AddSession(UserSession session)
        {
            string query = @"INSERT INTO dbo.UserSession                               
                                    (SessionId,
                                    UserId,
                                    Expires) 
                               VALUES 
                                    (@SessionId,
                                    @UserId,
                                    @Expires)";

         
                using (IDbConnection db = new SqlConnection(_connectionString))
                {
                    db.Execute(query, session);
                }
                return true;  
        }

        public UserSession GetSession(string ticket)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                string query = $@"SELECT
                           Id,
                           SessionId,
                           Expires
                        FROM UserSession
                            WHERE SessionId = '{ticket}'";

                return db.Query<UserSession>(query).SingleOrDefault();
            }
        }

        public User GetUserBySessionId(string ticket)
        {
            string query =
                $@"SELECT 
		                Users.Id,
		                Name,
		                Password,
		                Email,
		                IsActive,
		                DateRegistered,
		                DateModified
                FROM Users
                JOIN UserSession
	                ON UserSession.UserId = Users.Id
	                WHERE SessionId = '{ticket}'";

            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                return db.Query<User>(query).SingleOrDefault();
            }
        }

        public void DeleteUserSession(string ticket)
        {
            string query =
                $@"DELETE FROM
                                UserSession
                            WHERE 
                                SessionId = '{ticket}'";

            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                db.Execute(query);
            }

        }
    }
}
