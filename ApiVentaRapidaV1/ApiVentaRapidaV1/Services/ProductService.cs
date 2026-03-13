using System.Collections.Generic;
using System.Linq;
using ApiVentaRapida.Data;
using ApiVentaRapida.Models;

namespace ApiVentaRapida.Services
{
    public class ProductService
    {
        private AppDbContext db = new AppDbContext();

        public List<Products> GetAll()
        {
            return db.Products.Where(x => x.IsActive).ToList();
        }

        public Products Get(int id)
        {
            return db.Products.Find(id);
        }

        public void Create(Products product)
        {
            db.Products.Add(product);
            db.SaveChanges();
        }

        public void Update(Products product)
        {
            var p = db.Products.Find(product.Id);

            p.Name = product.Name;
            p.Price = product.Price;
            p.Stock = product.Stock;

            db.SaveChanges();
        }

        public void Delete(int id)
        {
            var p = db.Products.Find(id);
            db.Products.Remove(p);
            db.SaveChanges();
        }
    }
}