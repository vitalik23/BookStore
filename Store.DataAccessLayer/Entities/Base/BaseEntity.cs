using System;


namespace Store.DataAccessLayer.Entities.Base
{
    public class BaseEntity
    {

        public BaseEntity()
        {
            CreateDate = DateTime.Now;
        }

        public long Id { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsRemoved { get; set; }
    }
}
