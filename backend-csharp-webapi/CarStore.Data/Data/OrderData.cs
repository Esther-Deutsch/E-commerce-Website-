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
    public class OrderData : IOrderData
    {


        //הזרקת התלות
        public DataContext dataContext;

        public OrderData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }


        public List<Order> GetAll()
        {
            return dataContext.OrderList.Include(o => o.user).ToList();
        }

        public List<Order> GetByDate(DateTime date)
        {
            DateTime startDate = date.Date;
            DateTime endDate = startDate.AddDays(1);

            // Filter orders based on the date
            return dataContext.OrderList.Include(o => o.user).Where(order => order.OrderDate >= startDate && order.OrderDate < endDate).ToList();
        }

        public Order GetById(int id)
        {
            return dataContext.OrderList.Include(o => o.user).ToList().Find(o => o.OrderId == id);
        }

        public List<Order> GetByUser(int id)
        {
            List<Order> orders = dataContext.OrderList.Include(o => o.user).Where(o => o.UserId == id).ToList();
            return orders;
        }

        public void AddOrder(Order order)
        {
            dataContext.Add(order);
            dataContext.SaveChanges();
        }
    }
}
