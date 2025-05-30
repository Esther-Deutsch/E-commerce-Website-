using CarStore.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Data
{
    public class DataContext : DbContext
    {

        //a table for the categorys
        public DbSet<Category> CategoryList { get; set; }

        //a table for the products
        public DbSet<Product> ProductList { get; set; }

        //a table for the users
        public DbSet<User> UserList { get; set; }

        //a table for the orders
        public DbSet<Order> OrderList { get; set; }


        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;database=Carsdb");
        //}


    }
}
