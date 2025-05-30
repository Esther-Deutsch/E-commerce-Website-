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
    public class UserService : IUserService
    {
        private readonly IUserData userData;

        public UserService(IUserData _userData)
        {
            userData = _userData;
        }

        public void AddUser(User user)
        {
            userData.AddUser(user);
        }

        public void DeleteUser(int id)
        {
            userData.DeleteUser(id);
        }

        public List<User> GetAll()
        {
            return userData.GetAll().ToList();
        }

        public User GetById(int id)
        {
            return userData.GetById(id);    
        }

        public User GetByNameAndPass(string naem, string password)
        {
            return userData.GetByNameAndPass(naem, password);
        }

        public void UpdateUser(User user)
        {
            userData.UpdateUser(user);
        }
    }
}
