using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Core.Service
{
    public interface IProductService
    {
        //the fucntion will return a list of all the products
        List<Product> GetAll();

        //the function will return a product by id
        Product GetById(int id);

        //the fucntion will return a list of product by the category
        List<Product> GetByCategory(int id);

        //the fuction will return the products that have 0 in stack
        List<Product> GetNotInStack();

        //adds a product
        Task AddProductAsync(Product product);

        //update a product
        void UpdateProduct(Product product);

        //delete a product
        void DeleteProduct(int id);
    }
}
