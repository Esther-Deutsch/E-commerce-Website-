using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Core.Data
{
    public interface ICategoryData
    {
        
        //returns all the categorys
        public List<Category> GetAll();


        //returns a category by name
        public Category GetByName(string name);


        //returns a category by id
        public Category GetById(int id);

        
        //adds a catetory
        public void AddCategory(Category category);


        //updates a category
        public void UpdateCategory(int id, string neme);


        //deletes a category
        public void DeleteCategory(int id);


    }
}
