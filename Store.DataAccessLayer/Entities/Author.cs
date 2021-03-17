using Dapper.Contrib.Extensions;
using Store.DataAccessLayer.Entities.Base;
using System.Collections.Generic;

namespace Store.DataAccessLayer.Entities
{
    public class Author : BaseEntity
    {
        public string Name { get; set; }

        [Computed]
        public virtual List<AuthorInPrintingEdition> AuthorInPrintingEdition { get; set; }

        public Author()
        {
            AuthorInPrintingEdition = new List<AuthorInPrintingEdition>();
        }
    }
}
