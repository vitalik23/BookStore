using Store.DataAccessLayer.Entities;
using System.Collections.Generic;

namespace Store.BusinessLogicLayer.Models.Authors
{
    public class AuthorModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<AuthorInPrintingEdition> AuthorInPrintingEdition { get; set; }
    }
}
