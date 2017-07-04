$(document).ready(function () {
   
    var urlAPI = '/api/ClasiAnimal';
    // $('.row').append('<div class="loader"><img id="cargarLoading" style="width:30%" src="./imagenes/loading.gif"/></div>');
    //$('.row').append('<div class="loader"></div>');
     $(".loader").show();
    $.get(urlAPI, function (respuesta, estado) {
        var cargarSelectMarca = '';
        var cargarSelectCombustible = '';
        // COMPRUEBO EL ESTADO DE LA LLAMADA
        if (estado === 'success') {
            cargarSelectMarca += '<option class="bs-title-option" value="">Seleccione una marca</option>';
            cargarSelectCombustible += '<option class="bs-title-option"  value="">Seleccionar un combustible</option>';
            $.each(respuesta.data, function (indice, elemento) {
                if (elemento.tipo === "marca") {
                    cargarSelectMarca += '<option value="'+elemento.listaMarca[0].id+'">'+elemento.listaMarca[0].denominacion+'</option>';
                   // console.log(elemento.listaMarca[0].id);
                   // console.log(elemento.listaMarca[0].denominacion);
                } else {
                    cargarSelectCombustible += '<option value="'
                                                + elemento.listaTipoCombustible[0].id
                                                + '">'
                                                + elemento.listaTipoCombustible[0].denominacion
                                                + '</option>';

                   // console.log(elemento.listaTipoCombustible[0].id);
                   // console.log(elemento.listaTipoCombustible[0].denominacion);
                }
            });
        } else {
            console.log("Error ", respuesta);
        }
        $("#selectMarca").append(cargarSelectMarca);
        $("#selectCombustible").append(cargarSelectCombustible);
        $(".loader").hide();
    });

    $('#btnCrearCoche').click(function () {
        var urlAPI2 = '/api/Coches';
        var fecha = mensajes.dateToString($('#fechaMatriculacion').val());
        console.log("Fecha: ", fecha);
        debugger;
        var selectMarca = document.getElementById("selectMarca");
        var idMarca = selectMarca.options[selectMarca.selectedIndex].value; 
        var selectCombustible = document.getElementById("selectCombustible");
        var idTipo = selectCombustible.options[selectCombustible.selectedIndex].value;
        var dataNuevoCoche = {
            matricula: $('#matricula').val(),
            color: $('#color').val(),
            cilindrada: $('#cilindrada').val(),
            nPlazas: $('#nPlazas').val(),
            fechaMatriculacion: fecha,
            marca: {
                id: idMarca
            },
            tipoCombustible: {
                id: idTipo
            }
        };
        console.log(dataNuevoCoche);
        //debugger;
        $.ajax({
            url: '/api/Coches',
            type: "POST",
            dataType: 'json',
            data: dataNuevoCoche,
            success: function (respuesta) {
                window.location.href = '/coches.html';
            },
            error: function (xhr, textStatus, errorThrown) {
                var mensajeError = "ERROR: " + JSON.stringify(errorThrown) +
                                  "\n xhr: " + JSON.stringify(xhr) +
                           "\n textStatus: " + JSON.stringify(textStatus);
                mensajes.showSwal('error','ERROR',mensajeError);
            }
        });
    });
    $('#btnRegresarCoches').click(function () {
        console.log("regresar");
        window.location.href = '/especies.html';
    });
});
