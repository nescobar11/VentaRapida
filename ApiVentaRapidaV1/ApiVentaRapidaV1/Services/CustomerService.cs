using System.Collections.Generic;
using System.Linq;
using ApiVentaRapida.Data;
using ApiVentaRapida.Models;

namespace ApiVentaRapida.Services
{
    public class CustomerService
    {
        private AppDbContext db = new AppDbContext();

        public List<Customer> GetAll()
        {
            return db.Customers.Where(x => x.IsActive).ToList();
        }

        public Customer Get(int id)
        {
            return db.Customers.Find(id);
        }

        public void Create(Customer customer)
        {
            db.Customers.Add(customer);
            db.SaveChanges();
        }

        public void Update(Customer customer)
        {
            var c = db.Customers.Find(customer.Id);

            c.Name = customer.Name;
            c.Email = customer.Email;

            db.SaveChanges();
        }

        public void Delete(int id)
        {
            var c = db.Customers.Find(id);
            db.Customers.Remove(c);
            db.SaveChanges();
        }
    }
}