﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZooAzureApp
{
    public class ClasiAnimal
    {
        public string tipo { get; set; }
        public List<Clasificaciones> listaClasificaciones { get; set; }
        public List<TiposAnimal> listaTipoAnimal { get; set; }
    }
}