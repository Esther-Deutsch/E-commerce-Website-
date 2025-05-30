using CarStore.Core;
using CarStore.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Data.Data
{
    public class UserData : IUserData
    {

        //הזרקת התלות
        public DataContext dataContext;

        public UserData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }


        //this function will return a list of all the users
        public List<User> GetAll()
        {
            return dataContext.UserList.ToList();
        }


        //this will return a user by name and password
        public User GetByNameAndPass(string naem, string password)
        {
            User u = dataContext.UserList.ToList().Find(u => u.UserName == naem && u.Password == password);
            return u;
        }


        //returns a user by id
        public User GetById(int id)
        {
            User u = dataContext.UserList.ToList().Find(u => u.UserId == id);
            return u;
        }

        //this function will add a new user to the list
        public void AddUser(User user)
        {
            dataContext.UserList.Add(user);
            dataContext.SaveChanges();
        }

        //updates an existing user
        public void UpdateUser(User user)
        {
            User u = dataContext.UserList.ToList().Find(u => u.UserId == user.UserId);
            u.UserName = user.UserName;
            u.Password = user.Password;
            u.FName = user.FName;
            u.LName = user.LName;
            u.PhoneNumber = user.PhoneNumber;
            u.Address = user.Address;
            u.Email = user.Email;
            dataContext.SaveChanges();
        }

        //this function will delete a user from the list
        public void DeleteUser(int id)
        {
            User user = dataContext.UserList.ToList().Find(u => u.UserId == id);
            if (user != null)
            {
                dataContext.UserList.Remove(user);
                dataContext.SaveChanges();
            }
        }
    }
}
