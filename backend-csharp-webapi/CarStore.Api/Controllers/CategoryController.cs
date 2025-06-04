using AutoMapper;
using CarStore.Core;
using CarStore.Core.DTO;
using CarStore.Core.Servise;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;

        public CategoryController(ICategoryService _categoryService, IMapper _mapper)
        {
            categoryService = _categoryService;
            mapper = _mapper;
        }


        //******* returns all the categorys ******
        // GET: api/<CategoryController>
        [HttpGet]
        public ActionResult<IEnumerable<CategoryDTO>> GetAll()
        {
            IEnumerable<CategoryDTO> c = mapper.Map<IEnumerable<CategoryDTO>>(categoryService.GetAll());
            if (c == null)
                return NotFound();
            return Ok(c);
        }


        //******* returns category by name ******
        // GET api/<CategoryController>/5
        [HttpGet("byName{name}")]
        public ActionResult<CategoryDTO> GetByName(String name)
        {
            CategoryDTO c = mapper.Map<CategoryDTO>(categoryService.GetByName(name));
            if (c == null)
                return NotFound(name);
            return Ok(c);
        }

        //******* returns category by id ******
        // GET api/<CategoryController>/5
        [HttpGet("byId{id}")]
        public ActionResult<CategoryDTO> GetById(int id)
        {
            CategoryDTO c = mapper.Map<CategoryDTO>(categoryService.GetById(id));
            if (c == null)
                return NotFound(id);
            return Ok(c);
        }


        //******* adds a new caregory ******
        [Authorize]
        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            categoryService.AddCategory(new Category { CategoryName = value });
        }

        //******* updates an existing caregory ******
        [Authorize]
        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            categoryService.UpdateCategory(id, value);
        }

        //******* deletes an existing caregory ******
        [Authorize]
        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            categoryService.DeleteCategory(id);
        }
    }
}
