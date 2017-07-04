$(document).ready(function () {
   
    var id = window.location.search.substring(1).split('=')[1];
    var urlAPI = '/api/Especies/' + id;
    var clasificacion = '';
    var tipoAnimal = '';

    $(".loader").show();
    // PREPARAR LA LLAMDA AJAX 
    var promise = $.get(urlAPI, function (respuesta, estado) {

        if (estado === 'success') {

            $.each(respuesta.data, function (indice, elemento) {

                console.log("Elemento:  ", elemento);
                $('#nombre').val(elemento.nombre);
                $('#nPatas').val(elemento.nPatas);
                $('#clasificacion').val(elemento.clasificacion.denominacion);
                $('#tipoAnimal').val(elemento.tipoAnimal.denominacion);
                var mascota = elemento.esMascotas ? 'SI' : 'NO';
                //$('#esMascotas').val(mascota);
            });
        }
    });

    promise.then(function () {
        var urlAPI = '/api/ListaClasificacionTipoAnimal';
         $(".loader").show();
        $.get(urlAPI, function (respuesta, estado) {
            var cargarSelectClasi = '';
            var cargarSelectTipoAnimal = '';
            // COMPRUEBO EL ESTADO DE LA LLAMADA
            if (estado === 'success') {
                cargarSelectClasi += '<option class="bs-title-option" value="">Seleccione una Clasificación</option>';
                cargarSelectTipoAnimal += '<option class="bs-title-option"  value="">Seleccionar un tipo de animal</option>';
                $.each(respuesta.data, function (indice, elemento) {
                    if (elemento.tipo === "clasificacion") {
                        cargarSelectClasi += '<option value="' + elemento.listaClasificaciones[0].idClasificacion + '">' + elemento.listaClasificaciones[0].denominacion + '</option>';

                    } else {
                        cargarSelectTipoAnimal += '<option value="'
                                                    + elemento.listaTipoAnimal[0].idTipoAnimal
                                                    + '">'
                                                    + elemento.listaTipoAnimal[0].denominacion
                                                    + '</option>';
                    }
                });
            } else {
                console.log("Error ", respuesta);
            }
            $("#idClasificacion").append(cargarSelectClasi);
            $("#idTipoAnimal").append(cargarSelectTipoAnimal);
            $(".loader").hide();
        });
    });

    $('#btnEditarEspecie').click(function () {
        var selectClasificacion = document.getElementById("idClasificacion");
        var idClasificacion = selectClasificacion.options[selectClasificacion.selectedIndex].value;
        var selectTipoAnimal = document.getElementById("idTipoAnimal");
        var idTipoAnimal = selectTipoAnimal.options[selectTipoAnimal.selectedIndex].value;
        var radios = document.getElementsByName("optionsRadios");
        
        var mascota = document.querySelector('input[name = "optionsRadios"]:checked').value;

        console.log(mascota);
        var dataNuevaEspecie = {
            nombre: $('#nombre').val(),
            nPatas: $('#nPatas').val(),
            clasificacion: {
                idClasificacion: idClasificacion
            },
            tipoAnimal: {
                idTipoAnimal: idTipoAnimal
            },
            esMascota: mascota
        };
        console.log(dataNuevaEspecie);
        $.ajax({
            url: '/api/Especies',
            type: "PUT",
            dataType: 'json',
            data: dataNuevaEspecie,
            success: function (respuesta) {
                window.location.href = '/index.html';
            },
            error: function (xhr, textStatus, errorThrown) {
                var mensajeError = "ERROR: " + JSON.stringify(errorThrown) +
                                  "\n xhr: " + JSON.stringify(xhr) +
                           "\n textStatus: " + JSON.stringify(textStatus);
                mensajes.showSwal('error');
            }
        });
    });
    $('#btnRegresarEspecies').click(function () {
        window.location.href = '/index.html';
    });
});
