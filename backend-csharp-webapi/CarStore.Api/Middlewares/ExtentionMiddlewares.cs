namespace CarStore.Api.Middlewares
{
    public static class ExtentionMiddlewares
    {
        public static IApplicationBuilder UseMyMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<AddProductMiddleware>();
        }

    }
}
