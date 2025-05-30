namespace CarStore.Api.Middlewares
{
    public class AddProductMiddleware
    {
        private readonly RequestDelegate next;

        public AddProductMiddleware(RequestDelegate _next)
        {
            next = _next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Allow non-POST requests to pass through
            if (context.Request.Method != HttpMethods.Post)
            {
                await next(context);
                return;
            }
            try
            {
                // Ensure the request content type supports form data
                if (context.Request.HasFormContentType)
                {
                    var categoryCode = context.Request.Form["categoryCode"];
                    Console.WriteLine("categoryCode: " + categoryCode);

                    // Validate the category code
                    if (categoryCode != "validCategoryCode")
                    {
                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        await context.Response.WriteAsync("Invalid category code.");
                        return;
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                Console.WriteLine($"Middleware exception: {ex.Message}");
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await context.Response.WriteAsync("An error occurred while processing the request.");
                return;
            }

            // Continue to the next middleware if no issues
            await next(context);
        }
    }
}
