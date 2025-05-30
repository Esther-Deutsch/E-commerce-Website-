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
    public class OrderService : IOrderService
    {
        private readonly IOrderData orderData;

        public OrderService(IOrderData _orderData)
        {
            orderData = _orderData;
        }

        public List<Order> GetAll()
        {
            return orderData.GetAll();
        }

        public List<Order> GetByDate(DateTime date)
        {
            return orderData.GetByDate(date);
        }

        public Order GetById(int id)
        {
            return orderData.GetById(id);
        }

        public List<Order> GetByUser(int id)
        {
            return orderData.GetByUser(id);
        }

        public void AddOrder(Order order)
        {
            orderData.AddOrder(order);
        }
    }
}
