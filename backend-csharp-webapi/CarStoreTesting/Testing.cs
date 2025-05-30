using AutoMapper;
using CarStore.Api.Controllers;
using CarStore.Core;
using CarStore.Core.DTO;
using CarStore.Core.Service;
using CarStore.Core.Servise;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStoreTesting
{
    public class Testing
    {

        //בדיקה האם מוצר קיים - עם קוד תקין
        [Fact]
        public void GetProductById_returnOk()
        {
            //Arange - הנתונים  שנדרשים כדי להריץ את הפונצקיה
            var id = 5;
            List<Product> p = new List<Product>() { new Product() { ProductId =5 , ProductName = "blabal" } };
            //Act - הפעלת הפונקציה
            var pController = new ProductController(null, null);
            var resutl = pController.GetById(id);

            //Assert - הכרזה מה מצופה לקבל
            Assert.IsType<OkObjectResult>(resutl);
        }


        //בדיקה האם מוצר לא קיים - קוד שגוי
        [Fact]
        public void GetProductById_returnNotFound()
        {
            //Arange - הנתונים  שנדרשים כדי להריץ את הפונצקיה
            var id = 1;

            //Act - הפעלת הפונקציה
            var pController = new ProductController(null, null);
            var resutl = pController.GetById(id);

            //Assert - הכרזה מה מצופה לקבל
            Assert.IsType<NotFoundResult>(resutl);
        }

        //בדיקה האם משתמש קיים - קוד תקין
        [Fact]
        public void GetUserById_returnOk()
        {
            //Arange - הנתונים  שנדרשים כדי להריץ את הפונצקיה
            var id = 2;

            //Act - הפעלת הפונקציה
            var uController = new UserController(null, null);
            var resutl = uController.GetById(id);

            //Assert - הכרזה מה מצופה לקבל
            Assert.IsType<OkObjectResult>(resutl);
        }

        //בדיקה האם משתמש אינו קיים - קוד שגוי
        [Fact]
        public void GetUserById_returnNotFound()
        {
            //Arange - הנתונים  שנדרשים כדי להריץ את הפונצקיה
            var id = 1;

            //Act - הפעלת הפונקציה
            var uController = new UserController(null, null);
            var resutl = uController.GetById(id);

            //Assert - הכרזה מה מצופה לקבל
            Assert.IsType<NotFoundResult>(resutl);
        }

        //בדיקה על פונקצית מוצרים במלאי - שחוזרת רשימה ריקה
        [Fact]
        public void GetNotInStack()
        {
            var pController = new ProductController(null, null);
            var result = pController.GetNotInStack();

            Assert.Equal(0, result.Count);
        }

        //בדיקה האם נשלפת קטגוריה לפי שם
        [Fact]
        public void GetCategoryByName()
        {
            var name = "gas";

            var cController = new CategoryController(null, null);
            var result = cController.GetByName(name);

            Assert.IsType<Category>(result);
        }
    }
}
