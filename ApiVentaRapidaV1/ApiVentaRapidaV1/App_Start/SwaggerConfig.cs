using ApiVentaRapidaV1;
using Swashbuckle.Application;
using System.Web;
using System.Web.Http;
using WebActivatorEx;

[assembly: System.Web.PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace ApiVentaRapidaV1
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            var config = GlobalConfiguration.Configuration;

            config
            .EnableSwagger(c =>
            {
                c.SingleApiVersion("v1", "ApiVentaRapidaV1");
            })
            .EnableSwaggerUi();
        }
    }
}