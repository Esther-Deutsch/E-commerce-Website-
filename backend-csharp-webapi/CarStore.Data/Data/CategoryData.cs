using CarStore.Core;
using CarStore.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Data.Data
{
    public class CategoryData : ICategoryData
    {

        //dependency injection - הזרקת תלות
        public readonly DataContext dataContext;

        public CategoryData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        
        // returns a list of all the categorys
        public List<Category> GetAll()
        {
            return dataContext.CategoryList.ToList();
        }

        // returns a category by the name
        public Category GetByName(string name)
        {
            Category category = dataContext.CategoryList.ToList().Find(c => c.CategoryName == name);
            return category;
        }

        // returns a category by the id
        public Category GetById(int id)
        {
            Category category = dataContext.CategoryList.ToList().Find(c => c.CategoryId == id);
            return category;
        }

        // a function to add a cateroty
        public void AddCategory(Category category)
        {
            dataContext.CategoryList.Add(category);
            dataContext.SaveChanges();
        }

        // a function to update an existing categoty
        public void UpdateCategory(int id, string name)
        {
            Category category = dataContext.CategoryList.ToList().Find(c => c.CategoryId ==  id);
            category.CategoryName = name;
            dataContext.SaveChanges();
        }

        // a function that will delete a category
        public void DeleteCategory(int id)
        {
            Category c = dataContext.CategoryList.ToList().Find(c => c.CategoryId==id);
            if (c != null)
            {
                dataContext.CategoryList.Remove(c);
                dataContext.SaveChanges();
            }
        }
    }
}
