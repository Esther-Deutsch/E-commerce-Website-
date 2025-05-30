using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Core.DTO
{
    public class OrderDTO
    {
        public int UserId { get; set; }
        public int OrderSum { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
