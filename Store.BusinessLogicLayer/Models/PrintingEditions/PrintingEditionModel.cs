using Store.DataAccessLayer.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using static Store.Shared.Enums.Enums;

namespace Store.BusinessLogicLayer.Models.PrintingEditions
{
    public class PrintingEditionModel
    {
        public long Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal? Price { get; set; }
        [Required]
        public CurrencyType? Currency { get; set; }
        [Required]
        public PrintingType? Type { get; set; }
        [Required]
        public List<long> AuthorsId { get; set; }
        public List<AuthorInPrintingEdition> AuthorInPrintingEdition { get; set; }

        public string Subtitle { get; set; }
        public string SubSubTitle { get; set; }

    }
}
