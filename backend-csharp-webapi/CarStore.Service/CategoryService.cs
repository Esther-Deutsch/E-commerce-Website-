using CarStore.Core;
using CarStore.Core.Data;
using CarStore.Core.Servise;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Service
{
    public class CategoryService : ICategoryService
    {

        //dependency injection - הזרקת תלות
        public readonly ICategoryData categoryData;

        public CategoryService(ICategoryData _categoryData)
        {
            categoryData = _categoryData;
        }


        // returns a list of the categorys
        public List<Category> GetAll()
        {
            return categoryData.GetAll();
        }

        //returns a cateroty by name
        public Category GetByName(string name)
        {
            return categoryData.GetByName(name);
        }

        // returns a category bu id
        public Category GetById(int id)
        {
            return categoryData.GetById(id);
        }

        // a function to add a category
        public void AddCategory(Category category)
        {
            categoryData.AddCategory(category);
        }

        // a function to update an existing category
        public void UpdateCategory(int id, string name)
        {
            categoryData.UpdateCategory(id, name);
        }

        // a fucntion to delete a category
        public void DeleteCategory(int id)
        {
            categoryData.DeleteCategory(id);
        }

    }
}
