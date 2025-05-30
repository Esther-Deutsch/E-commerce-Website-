using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Core.Data
{
    public interface IUserData
    {
        //the fucntion will return a list of all the users
        List<User> GetAll();

        //the function will return a user by name and password
        User GetByNameAndPass(string naem, string password);

        //the fucntion will return a user by id
        User GetById(int id);

        //adds a user
        void AddUser(User user);

        //update a user
        void UpdateUser(User user);

        //delete a user
        void DeleteUser(int id);
    }
}
