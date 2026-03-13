using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using ApiVentaRapida.Models;

namespace ApiVentaRapida.Services
{
    public class SaleService
    {

        private string connectionString =
            ConfigurationManager
            .ConnectionStrings["DefaultConnection"]
            .ConnectionString;


        public int CreateSale(SaleRequest sale)
        {

            int saleId = 0;

            using (SqlConnection conn = new SqlConnection(connectionString))
            {

                conn.Open();

                SqlTransaction transaction = conn.BeginTransaction();

                try
                {

                    SqlCommand cmd = new SqlCommand("sp_CreateSale", conn, transaction);

                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@CustomerId", sale.CustomerId);
                    cmd.Parameters.AddWithValue("@Total", sale.Total);

                    saleId = Convert.ToInt32(cmd.ExecuteScalar());
                    transaction.Commit();


                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;

                }
            }

            return saleId;

        }

    }
}