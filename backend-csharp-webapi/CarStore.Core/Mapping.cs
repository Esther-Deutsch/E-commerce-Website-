﻿using AutoMapper;
using CarStore.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Core
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
        }
    }
}
