using Microsoft.Extensions.Options;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Options;

namespace Store.DataAccessLayer.Repositories.DapperRepositories
{
    public class PaymentDapperRepository : BaseDapperRepository<Payment>, IPaymentRepository
    {
        public PaymentDapperRepository(IOptions<StringConnectionOptions> _connectionOptions) : base(_connectionOptions)
        {

        }
    }
}
