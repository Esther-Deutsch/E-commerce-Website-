using CarStore.Api.Middlewares;
using CarStore.Core;
using CarStore.Core.Data;
using CarStore.Core.Service;
using CarStore.Core.Servise;
using CarStore.Data;
using CarStore.Data.Data;
using CarStore.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;
using static System.Net.WebRequestMethods;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});


//auto mapper - שימוש ב 
builder.Services.AddAutoMapper(typeof(Mapping));

//include ביטול הלולאה כשמשתמשים ב    
builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    option.JsonSerializerOptions.WriteIndented = true;
});



// הזרקות תלות
builder.Services.AddScoped<ICategoryData, CategoryData>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddScoped<IProductData, ProductData>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<IUserData, UserData>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IOrderData, OrderData>();
builder.Services.AddScoped<IOrderService, OrderService>();

//builder.Services.AddDbContext<DataContext>();

//Console.WriteLine("my connection string: " + builder.Configuration["DbConnectionString"]);
builder.Services.AddDbContext<DataContext>(
    option => option.UseSqlServer(builder.Configuration["DbConnectionString"]));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
{
options.SaveToken = true;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://localhost:7059/",
        ValidAudience = "https://localhost:7059/",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SomeLongLongLongKeyToGenerateMyJwtToken"))
    };
});


// ב-Program.cs (גרסאות חדשות)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//ניהול הזהות
app.UseAuthentication();

app.UseAuthorization();

//my middleware
app.UseMyMiddleware();

app.UseCors("AllowAngularDev");

app.MapControllers();

app.Run();
