using System;
using System.Collections.Generic;

namespace ApiVentaRapida.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal Total { get; set; }

        public virtual List<SaleItem> Items { get; set; }
    }
}