using Dapper.Contrib.Extensions;

namespace Store.DataAccessLayer.Entities
{
    public class AuthorInPrintingEdition
    {
        public long AuthorId { get; set; }
        public long PrintingEditionId { get; set; }
        [Computed]
        public virtual Author Author { get; set; }
        [Computed]
        public virtual PrintingEdition PrintingEdition { get; set; }
    }
}
