using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Core.Service
{
    public interface IOrderService
    {
        //returns all the orders
        public List<Order> GetAll();

        //returns a order by its id
        public Order GetById(int id);

        //returns a list of orders by user
        public List<Order> GetByUser(int id);


        //teturns a list of orders by date
        public List<Order> GetByDate(DateTime date);

        //adds a new order to the order list
        public void AddOrder(Order order);
    }
}
