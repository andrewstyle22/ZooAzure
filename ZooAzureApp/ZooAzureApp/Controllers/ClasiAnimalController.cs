using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ZooAzureApp
{
    public class ClasiAnimalController : ApiController
    {
        // GET: api/ClasiAnimal
        public RespuestaApi<ClasiAnimal> Get()
        {
            RespuestaApi<ClasiAnimal> resultado = new RespuestaApi<ClasiAnimal>();
            List<ClasiAnimal> data = new List<ClasiAnimal>();
            try
            {
                Db.Conectar();
                if (Db.EstaLaConexionAbierta())
                {
                    data = Db.GetClasiAnimal();
                    resultado.error = "";
                }
            }
            catch (Exception)
            {
                resultado.error = "Error";
            }
            resultado.totalElementos = data.Count;
            resultado.data = data;
            Db.Desconectar();
            return resultado;
        }

        // GET: api/ClasiAnimal/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ClasiAnimal
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ClasiAnimal/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ClasiAnimal/5
        public void Delete(int id)
        {
        }
    }
}
