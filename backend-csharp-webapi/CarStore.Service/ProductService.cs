using CarStore.Core;
using CarStore.Core.Data;
using CarStore.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Service
{
    public class ProductService : IProductService
    {

        private readonly IProductData productData;

        public ProductService(IProductData _productData)
        {
            productData = _productData;
        }


        //the fucntion will return a list of all the products
        public List<Product> GetAll()
        {
            return productData.GetAll();
        }


        //the fucntion will return a list of products by category
        public List<Product> GetByCategory(int id)
        {
            return productData.GetByCategory(id);
        }

        //the fucntion will return a product by id
        public Product GetById(int id)
        {
            return productData.GetById(id);
        }

        //the fucntion will reutnr a list of the products that are out of stack
        public List<Product> GetNotInStack()
        {
            return productData.GetNotInStack();
        }

        //the fucntion will update a product
        public void UpdateProduct(Product product)
        {
            productData.UpdateProduct(product);
        }


        //the function will add a new product
        public async Task AddProductAsync(Product product)
        {
            await productData.AddProductAsync(product);
        }

        //the fucntion will delete an existing product
        public void DeleteProduct(int id)
        {
            productData.DeleteProduct(id);
        }
    }
}
