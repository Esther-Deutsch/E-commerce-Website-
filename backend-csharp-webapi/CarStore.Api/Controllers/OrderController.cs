using AutoMapper;
using CarStore.Core;
using CarStore.Core.DTO;
using CarStore.Core.Service;
using CarStore.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrderController(IOrderService _orderService, IMapper _mapper)
        {
            orderService = _orderService;
            mapper = _mapper;
        }

        // GET: api/<OrderController>
        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<OrderDTO>> GetAll()
        {
            List<OrderDTO> list = mapper.Map<List<OrderDTO>>(orderService.GetAll());
            if(list == null)
                return NotFound();
            return Ok(list);
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public ActionResult<OrderDTO> GetById(int id)
        {
            OrderDTO o = mapper.Map<OrderDTO>(orderService.GetById(id));
            if (o == null)
                return NotFound(id);
            return Ok(o);
        }

        // GET: api/<OrderController>
        [HttpGet("byUser/{id}")]
        public ActionResult<IEnumerable<OrderDTO>> GetByUser(int id)
        {
            List<OrderDTO> list = mapper.Map<List<OrderDTO>>(orderService.GetByUser(id));
            if(list == null)
                return NotFound(id) ;
            return Ok(list);
        }

        // GET api/<OrderController>/5
        [HttpGet("byDate/{date}")]
        public ActionResult<List<OrderDTO>> GetByDate(DateTime date)
        {
            List<OrderDTO> list = mapper.Map<List<OrderDTO>>(orderService.GetByDate(date));
            if(list == null)
                return NotFound(date);
            return Ok(list);
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post(OrderDTO odto)
        {
            Order o = mapper.Map<Order>(odto);
            orderService.AddOrder(o);
        }

    }
}
