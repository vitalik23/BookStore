using System.Collections.Generic;
using static Store.Shared.Enums.Enums;

namespace Store.DataAccessLayer.Models.PrintingEdition
{
    public class PrintingEditionFilterModel
    {
        public string SortBy { get; set; }
        public string TypeSort { get; set; }
        public string PrintingEditionName { get; set; }
        public List<PrintingType?> Category { get; set; }
        public string AuthorName { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public CurrencyType? Currency { get; set; }
    }
}
