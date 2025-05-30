using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Core.DTO
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public string Desc { get; set; }
        public int Price { get; set; }
        public string QntInStack { get; set; }
        public string Img { get; set; }
        public string Color { get; set; }
    }
}
