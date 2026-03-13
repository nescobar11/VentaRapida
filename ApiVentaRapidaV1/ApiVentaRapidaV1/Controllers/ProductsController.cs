using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using ApiVentaRapida.Data;
using ApiVentaRapida.Models;

namespace ApiVentaRapida.Controllers
{
    public class ProductsController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        public IEnumerable<Products> Get()
        {
            return db.Products.ToList();
        }

        public IHttpActionResult Get(int id)
        {
            var producto = db.Products.Find(id);
            if (producto == null)
                return NotFound();

            return Ok(producto);
        }

        public IHttpActionResult Post(Products producto)
        {
            db.Products.Add(producto);
            db.SaveChanges();
            return Ok(producto);
        }
    }
}