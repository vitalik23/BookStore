using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using Store.Shared.Options;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.DapperRepositories
{
    public class BaseDapperRepository<T> : IGenericRepository<T> where T : class
    {
        
        private string _connectionString;
        IOptions<StringConnectionOptions> _connectionOptions;

        public BaseDapperRepository(IOptions<StringConnectionOptions> connectionOptions)
        {
            _connectionOptions = connectionOptions;
            _connectionString = _connectionOptions.Value.DefaultConnection;
        }
    

        private SqlConnection SqlConnection()
        {
            var sqlConnection = new SqlConnection(_connectionString);
            return sqlConnection;
        }

        protected IDbConnection CreateConnection()
        {
            var conn = SqlConnection();
            conn.Open();
            return conn;
        }

        public async Task AddRangeAsync(IEnumerable<T> item)
        {
            using(var connection = CreateConnection())
            {
                await connection.InsertAsync(item);
            }
        }

        public async Task DeleteAsync(T item)
        {
            using (var connection = CreateConnection())
            {
                await connection.DeleteAsync(item);
            }
        }

        public async Task<IEnumerable<T>> GetAsync()
        {
            using(var connection = CreateConnection())
            {
                var result = await connection.GetAllAsync<T>();
                return result;
            }
        }

        public async Task<T> GetByIdAsync(long id)
        {
            using(var connection = CreateConnection())
            {
                var result = await connection.GetAsync<T>(id);

                return result;
            }
            
        }

        public async Task UpdateAsync(T item)
        {
            using(var connection = CreateConnection())
            {
                await connection.UpdateAsync(item);
            }
        }

        public async Task CreateAsync(T item)
        {
            using (var connection = CreateConnection())
            {
                await connection.InsertAsync(item);
            }
        }

    }
}
