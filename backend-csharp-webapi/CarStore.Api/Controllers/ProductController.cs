using AutoMapper;
using CarStore.Core;
using CarStore.Core.DTO;
using CarStore.Core.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IProductService productService;
        private readonly IMapper mapper;

        public ProductController(IProductService _productService, IMapper _mapper)
        {
            productService = _productService;
            mapper = _mapper;
        }

        //return all the products
        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<ProductDTO> Get()
        {
            return mapper.Map<IEnumerable<ProductDTO>>(productService.GetAll());
        }


        // returns a product by its id
        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public ActionResult<ProductDTO> GetById(int id)
        {
            ProductDTO p = mapper.Map<ProductDTO>( productService.GetById(id));
            if(p == null) 
                return NotFound(id);
            return Ok(p);
        }

        // returns a list of products by category
        // GET api/<ProductController>/5
        [HttpGet("category/{id}")]
        public ActionResult<List<ProductDTO>> GetByCategory(int id)
        {
            List<ProductDTO> p= mapper.Map<List<ProductDTO>>(productService.GetByCategory(id));
            if (p == null)
                return NotFound(id);
            return Ok(p);
        }

        // returns a list of products that are out of stack
        //[Authorize]
        // GET api/<ProductController>/5
        [HttpGet("outOfStack")]
        public List<ProductDTO> GetNotInStack()
        {
            //List<ProductDTO> p = mapper.Map <List<ProductDTO>>(productService.GetNotInStack());
            //if (p == null)
            //    return NotFound();
            //return Ok(p);
            return mapper.Map<List<ProductDTO>>(productService.GetNotInStack());
        }


        // POST api/<ProductController>
        //[Authorize]
        [HttpPost]
        public async Task Post([FromBody] ProductDTO pdto)
        {
            Product p = mapper.Map<Product>(pdto);
            await productService.AddProductAsync(p);
        }

        // PUT api/<ProductController>/5
        //[Authorize]
        [HttpPut("{id}")]
        public void Put(ProductDTO pDTO)
        {
            Product p = mapper.Map<Product>(pDTO);
            productService.UpdateProduct(p);
        }

        // DELETE api/<ProductController>/5
        //[Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            productService.DeleteProduct(id);
        }
    }
}
