using CarStore.Core;
using CarStore.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Data.Data
{
    public class ProductData : IProductData
    {

        //הזרקת התלות
        public DataContext dataContext;

        public ProductData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }


        //this function will return a list of all the products
        public List<Product> GetAll()
        {
            return dataContext.ProductList.Include(p => p.Category).ToList();
        }


        //this will return a list of products by category
        public List<Product> GetByCategory(int id)
        {
            List<Product> l = dataContext.ProductList.Where(p => p.CategoryId == id).ToList(); 
            return l;
        }


        //returns a product by id
        public Product GetById(int id)
        {
            Product p = dataContext.ProductList.Include(p => p.Category).ToList().Find(p => p.ProductId == id);
            return p;
        }

        //returns products that are not in stack
        public List<Product> GetNotInStack()
        {
            List<Product> l = dataContext.ProductList.Include(p => p.Category).Where(p => (p.QntInStack).Equals("0") ).ToList();
            return l;
        }

        //this function will add a new product to the list
        public async Task AddProductAsync(Product product)
        {
            dataContext.ProductList.Add(product);
            await dataContext.SaveChangesAsync();
        }

        //updates an existing product
        public void UpdateProduct(Product product)
        {
            Product p = dataContext.ProductList.ToList().Find(p => p.ProductId == product.ProductId);
            p.ProductName = product.ProductName;
            p.CategoryId = product.CategoryId;
            p.Desc = product.Desc;
            p.Price = product.Price;
            p.QntInStack = product.QntInStack;
            p.Img = product.Img;
            p.Color = product.Color;
            dataContext.SaveChanges();
        }

        //this function will delete a product from the list
        public void DeleteProduct(int id)
        {
            Product product = dataContext.ProductList.ToList().Find(p => p.ProductId == id);
            if (product != null)
            {
                dataContext.ProductList.Remove(product);
                dataContext.SaveChanges();
            }
        }

    }
}
