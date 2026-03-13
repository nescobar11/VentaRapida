using ApiVentaRapida.Data;
using ApiVentaRapida.Models;
using ApiVentaRapida.Services;
using System;
using System.Web.Http;
using System.Data.Entity;
using System.Linq;

namespace ApiVentaRapida.Controllers
{
    
    public class SalesController : ApiController
    {
        private readonly SaleService service = new SaleService();
        private AppDbContext db = new AppDbContext();

        [HttpPost]
        [Route("api/Addsale")]
        public IHttpActionResult Post(SaleRequest request)
        {
            try
            {
                // 400
                if (request == null)
                    return BadRequest("datos requeridos");

                if (request.CustomerId <= 0)
                    return BadRequest("cliente inválido");

                if (request.Total <= 0)
                    return BadRequest("Total inválido");

                int saleId = service.CreateSale(request);

               
                if (saleId == 0)
                    return NotFound();

                return Ok(new
                {
                    SaleId = saleId,
                    Message = "Venta creada correctamente"
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message); // 400
            }
            catch (Exception)
            {
                return InternalServerError(); // 500
            }
        }

        // GET: api/sales/5
        [HttpGet]
        [Route("sales/{id:int}")]
        public IHttpActionResult GetSaleById(int id)
        {
            
            var sale = db.Sales
                         .Include(s => s.Items)
                         .FirstOrDefault(s => s.Id == id);

            if (sale == null)
            {
                return NotFound();
            }

            return Ok(sale);
        }
    }
}