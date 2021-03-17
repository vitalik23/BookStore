using Dapper.Contrib.Extensions;
using Store.DataAccessLayer.Entities.Base;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Store.Shared.Enums.Enums;

namespace Store.DataAccessLayer.Entities
{
    public class PrintingEdition : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }
        public CurrencyType Currency { get; set; }
        public PrintingType Type { get; set; }
        [Required]
        [DefaultValue("Insert DefaultValue Here")]
        public string Subtitle { get; set; }
        public string SubSubTitle { get; set; }
        [Computed]
        public List<AuthorInPrintingEdition> AuthorInPrintingEdition { get; set; }

        public PrintingEdition()
        {
            AuthorInPrintingEdition = new List<AuthorInPrintingEdition>();
        }
    }
}
