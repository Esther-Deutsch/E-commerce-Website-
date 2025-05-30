using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Core
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int OrderSum { get; set; }
        public DateTime OrderDate { get; set; }


        //קשרי גומלין - קוד משתמש להזמנה
        public User user { get; set; }

    }
}