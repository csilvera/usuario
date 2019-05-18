
$.mobile.page.prototype.options.domCache = true;
var pl = 1;
var lt = 1;
var ft = 1;
var xg = 0;
var tm = 10000;
var ts = 5000;
var cop = 0;
var ojo = 0;
var cantn = 3;
var inic = 0;
var n = false;
var si = true;
var no = false;
var Splano = localStorage.setItem("Segundo", no);
var seudonimo = '';
var inicioweb = '';
var app = {
    initialize: function() {
       this.bindEvents();
    },
    // Enlazar los eventos que se requieren en el inicio.
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function(){
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function(){
        checkConnection();
        Acceder();
    }
};
app.initialize();

function Acceder(){
    
    var x = '';
    var seudox = localStorage.getItem('seudonimo');
    if(seudox != x && seudox != null){
        Inicia();
    }
    else{
        $('.txt').text('INICIAR SESIÓN');
        $('#MHeader').load('header/index.html');
        $('.contenidos').load('modulos/iniciar.html');
        $('footer').empty();
        $.mobile.loading("hide");
    }
}

var noti = setInterval(function(){
    VerificarMen();
},10000);
function checkConnection() {
    var networkState = navigator.connection.type;
    var type = undefined;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    console.log('Connection type: ' + states[networkState]);
    
     type = states[networkState];
    
    return type;
}
function Inicia(){
    scroll();
    var x = '';
    var loads = localStorage.getItem('inicioweb');
    var seudo = localStorage.getItem('seudonimo');
    if(seudo != x && seudo != null){
        welcome();
    }
    else{
    $('.txt').text('Didigitales');
    $('#MHeader').load('header/index.html');
    $('footer').load('pie/Footersin.html');
    $('.contenidos').empty();
        let ins = $('.contenidos');
        ins.html();
        ins.append(`<div id="ConexInicial"></div>
            <div id="PubliC"></div>`);
    if(navigator.onLine){
         
       $.mobile.loading("show");
       $.ajax({
           url:'https://didigitales.live/PubDigS',
           type:'GET'
        })
       .done(function(data){
             $.mobile.loading("hide");
             pb = JSON.parse(data);
             localStorage.setItem("inicioweb", data);
           
             let pub = $('#PubliC');
             $('#ConexInicial').empty();
             $('#PubliC').empty();
             if(data == '0'){
                
            pub.html();
            pub.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
             else{
            
            pub.html();
            pb.forEach(publ => {
        pub.append(`<div class="PubliSeudos" style="margin-bottom:5px;">
              <div class="TitSeudo">@${publ.seudo}</div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
               <div id="${publ.visual}" class="${publ.estatus}"></div>
               <div class="FechInr">${publ.fecha} ${publ.hora}</div></div>`)
            });

            }
       })
       .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       }); 
    
    }
    else{
         
        if(loads != '' && loads != null){
           loadini();
        }
        else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
        }
    }
    }
}
function welcome(){
    localStorage.setItem("Segundo", si);
    VerificarMen();
    scrollcon();
    var seudo = localStorage.getItem('seudonimo');

    $('.txt').text('DIDIGITALES');
    $('#MHeader').load('header/header-conex.html');
    $('footer').load('pie/pie-conectado.html');
    $('.contenidos').empty();
        let ins = $('.contenidos');
        ins.html();
        ins.append(`<div id="ConexInicial"></div>
            <div id="PubliCa"></div>
            <status></status>`);
    if(navigator.onLine){
    $.mobile.loading("show");
    $.ajax({
        url:'https://didigitales.live/PubDigS',
        type:'GET'
     })
    .done(function(data){
        //Datos();
            $.mobile.loading("hide");
            pbi = JSON.parse(data);
            let publi = $('#PubliCa');
            $('#PubliCa').empty();
            if(data == '0'){
                
            publi.html();
            publi.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
            else{
            
            publi.html();
            pbi.forEach(publ => {
        publi.append(`<div class="PubliSeudo" style="margin-bottom:5px;">
              <div class="TitSeudo" id="${publ.seudo}" >@${publ.seudo}</div>
              <div id="OpcionMn" name="${publ.seudo}" class="${publ.id}" data-visual="${publ.visual}"></div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
                <div id="SendMeg" name="${publ.id}" class="${publ.likes}"></div>
                <div id="MensajePrivado" name="${publ.seudo}" class="ico-comen"></div>
                <div class="${publ.estado}"></div>
                <div id="${publ.visual}" class="${publ.estatus}"></div>
                <div class="FechInrc">${publ.fecha} ${publ.hora}</div></div>`)
    });
                
            }
    })
    .fail(function(data){
        $.mobile.loading("hide");
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
            $('status').empty();
        },10000);
        
    });

    }
    else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
    }
}
function scroll(){
    var seudo = localStorage.getItem('seudonimo');
    var x = '';
    var px = 1500;
    var d = 1;
    var h = 15;
    var no = 1;
    $(window).scroll(function(event){
        var posi = $(window).scrollTop();
        if(posi >= px){
            px = px + 1500;
            var desde = h * d;
            d = d + 1;
            $.get('https://didigitales.live/Pub/list/'+desde)
            .done(function(data){
                reser = JSON.parse(data);
                let res = $('#PubliC');
                let not = $('status');
                if(data == 0){
                    if(no == 1){
                        $('status').empty();
                        not.html();
                        not.append(`<div class="lista-inf">No hay mas registro  </div>`);
                        no = 0;
                    }
                }
                else{
                    res.html();
                    reser.forEach(publ => {
                res.append(`<div class="PubliSeudos" style="margin-bottom:5px;">
              <div class="opcheaderseudo">
              <div class="ico-user" style="background:url('http://simple.local/name/default.png');background-size: 20px 20px;"></div>
              <div class="TitSeudo">@${publ.seudo}</div>
              </div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
               <div id="${publ.visual}" class="${publ.estatus}"></div>
               <div class="FechInr">${publ.fecha} ${publ.hora}</div>
            </div>`);
            });
                }
            })
            .fail(function(data){
                console.log('no hay conexion en publicaciones');
            });
        } 
    });
}
function loadini(){
    
   var data = localStorage.getItem('inicioweb');
   let ins = $('.contenidos');
        ins.html();
        ins.append(`<div id="ConexInicial"></div>
            <div id="PubliC"></div>
            <status></status>`); 
    pb = JSON.parse(data);
    let pub = $('#PubliC');
    $('#ConexInicial').empty();
    $('#PubliC').empty();
    if(data == '0'){
                
        pub.html();
        pub.append(`<div class="lista-inf">No hay resultados</div>`)
        
    }
    else{
            
        pub.html();
        pb.forEach(publ => {
        pub.append(`<div class="PubliSeudos" style="margin-bottom:5px;">
              <div class="opcheaderseudo">
                <div id="${publ.seudo}" class="TitSeudo">@${publ.seudo}</div>
              </div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
               <div id="${publ.visual}" class="${publ.estatus}"></div>
               <div class="FechInr">${publ.fecha} ${publ.hora}</div>
            </div>`)
    });
        verificarpub();
    } 
        
}
function scrollcon(){
    var seudo = localStorage.getItem('seudonimo');
    var x = '';
    var px = 1500;
    var d = 1;
    var h = 15;
    var no = 1;
    $(window).scroll(function(event){
        var posi = $(window).scrollTop();
        if(posi >= px){
            px = px + 1500;
            var desde = h * d;
            d = d + 1;
            $.get('https://didigitales.live/Pub/list/'+desde)
            .done(function(data){
                reser = JSON.parse(data);
                let res = $('#PubliCa');
                let not = $('status');
                if(data == 0){
                    if(no == 1){
                        $('status').empty();
                        not.html();
                        not.append(`<div class="lista-inf">No hay mas registro  </div>`);
                        no = 0;
                    }
                }
                else{
                    res.html();
                    reser.forEach(publ => {
                res.append(`<div class="PubliSeudo" style="margin-bottom:5px;">
              <div class="opcheaderseudo">
              <div class="TitSeudo">@${publ.seudo}</div>
              </div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
                <div id="SendMeg" name="${publ.id}" class="${publ.likes}"></div>
                <div id="MensajePrivado" name="${publ.seudo}" class="ico-comen"></div>
                <div class="${publ.estado}"></div>
                <div id="${publ.visual}" class="${publ.estatus}"></div>
                <div class="FechInrc">${publ.fecha} ${publ.hora}</div>
            </div>`);
            });
                }
            })
            .fail(function(data){
                console.log('no hay conexion en publicaciones');
            });
        } 
    });
}
function verificarpub(){
    var repeat = false;
    var v = setTimeout(function(){
        $.get('https://didigitales.live/CantPub')
        .done(function(data){
            var num = data;
            repeat = true;
            if(repeat == true){
                var v2 = setTimeout(function(){
                $.get('https://didigitales.live/CantPub')
                .done(function(data){
                    var num2 = data;
                    if(num2 > num){
                        $('#loadingIniP').empty();
                        let load = $('#loadingIniP');
                        load.html();
                        load.append(`<i class="btn-rojo"></i>`);
                    }
                    repeat = false;
                });
                },tm);
            }
        });
    },tm);
}
function cargarini(){
    var t = setTimeout(function(){
        var namereg = localStorage.getItem('seudose');
        var passwo = localStorage.getItem('passwor');
        console.log(namereg +' = '+ passwo);
        $('#Vseudo').val(namereg);
        $('#Contra').val(passwo);
    },1500);
}
$('#MHeader').on('click','#MenuInf', function(e){
	e.preventDefault();
    var x = '';
    var loads = localStorage.getItem('inicioweb');
    var seudo = localStorage.getItem('seudonimo');
    if(seudo != x && seudo != null){
       
        $('#MHeader').load('header/header-conex.html');
	    $('.contenidos').load('modulos/menu-conex.html');
        $('footer').load('pie/pie-conectado.html');
        $.mobile.loading("hide");
    }
    else{
        $('#MHeader').load('header/index.html');
	    $('.contenidos').load('modulos/menu.html');
        $('footer').load('pie/Footersin.html');
        $.mobile.loading("hide");
    }
});
$('footer').on('click','#IniciarSesion', function(e){
	e.preventDefault();
    $('.txt').text('INICIAR SESIÓN');
    $('#MHeader').load('header/index.html');
	$('.contenidos').load('modulos/iniciar.html');
    $('footer').empty();
});
$('#MHeader').on('click','#IniciarSesion', function(e){
	e.preventDefault();
    $('.txt').text('INICIAR SESIÓN');
    $('#MHeader').load('header/index.html');
	$('.contenidos').load('modulos/iniciar.html');
    $('footer').empty();
});
$('.contenidos').on('click','#IniciarSesion', function(e){
	e.preventDefault();
    $('.txt').text('INICIAR SESIÓN');
    $('#MHeader').load('header/index.html');
	$('.contenidos').load('modulos/iniciar.html');
    $('footer').empty();
});
$('.contenidos').on('click','#Restaura', function(e){
	e.preventDefault();
    $('.txt').text('RESTAURAR CONTRASEÑA');
    $('#MHeader').load('header/header-restaurar.html');
	$('.contenidos').load('modulos/restaurar.html');
    $('#footercolor').empty();
});
$('.contenidos').on('submit','#Verificar', function(e){
    e.preventDefault();
    if(e){
    var name = $('#Vseudo').val();
    var contra = $('#Contra').val();
    var url = 'name='+name+'&pass='+contra;
    var wel = 'Bienvenido '+name;
    if(name.length == 0 && contra.length == 0){
               $('#Vseudo, #Contra').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
        swal('Complete','Todos los campo son requeridos. ','error');
        var s = setTimeout(function(){
               $('#Vseudo, #Contra').css('box-shadow', 'none');
        },5000);
    }
    else if(name.length < 7){
                $('#Vseudo').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
        swal('Complete','Campo correo o seudónimo requerido ','error');
        var s = setTimeout(function(){
               $('#Vseudo').css('box-shadow', 'none');
        },5000);
    }
    else if(/gmail/.test(name) || name.length >= 6 &&  contra.length >= 6 ){
        $.mobile.loading("show");
        $.ajax({
            url:'https://didigitales.live/VerificarIn',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            }
        })
        .done(function(data){
            $.mobile.loading("hide");
        
            if(data == 'ok'){
                
                var names = $('#Vseudo').val();
                $.get('https://didigitales.live/Dseudo?name='+names)
                .done(function(data){
                    localStorage.setItem("seudonimo", data);
                    localStorage.setItem("Segundo", si);
                    Inicia();
                });
                
            }
            else if(data == 'no'){
                var names = $('#Vseudo').val();
                $.get('https://didigitales.live/Dseudo?name='+names)
                .done(function(data){
                    localStorage.setItem("seudonimo", data);
                    $('.txt').text('Validar cuenta');
                    $('#MHeader').load('header/header-sin.html');
                    $('.contenidos').load('modulos/primer.html');
                    $('footer').empty();
                });
            }
            else{
                swal('Verifique',data,'error');
            }   
        })
        .fail(function(data){
        $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
        });
    }
    }else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
    }
});
$('.contenidos').on('submit', '#PrimerAcceso', function(e){
    e.preventDefault();
    if(navigator.onLine){
    var cod = $('#ValidC').val();
    var name = localStorage.getItem('seudonimo');
    var url = 'name='+name+'&codigo='+cod;
    
    if(cod.length < 4){
        $('#ValidC').css('box-shadow','0 0 0 0.2rem rgba(231,76,60, 0.25)');
        var s = setTimeout(function(){
            $('#ValidC').css('box-shadow', 'none');
        },5000);
    }
    else if(cod.length >= 4){
        $.mobile.loading("show");
        $.ajax({
            url:'https://didigitales.live/ValidaCuenta',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            }
        })
        .done(function(data){
            $.mobile.loading("hide");
            
            if(data == 'ok'){
                welcome();
            }
            else if(data == 'su'){
                swal('Error','Su cuenta a sido bloqueada dirigase a olvidaste tu contraseña','error');
            }
            else{
                swal('Error',data,'error');
            }
        })
        .fail(function(data){
           $.mobile.loading("hide");
           $('#ConexInicial').empty();
           let sconex = $('#ConexInicial');
           sconex.html();
           sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
    }
    }else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
        console.log('sin conexion');
    } 
});
$('.contenidos').on('submit','#restaurarseudo', function(e){
    e.preventDefault();
    var name = $('#Rseudo').val();
    if(/gmail.com/.test(name) || name.length > 6 ){
       var url = 'https://didigitales.live/RestaurarIn?name='+name;
       $.get(url)
       .done(function(data){
           var da = '<div class="inestados">'+data+'</div>';
           $('status').empty();
           $('status').append(da);
           var t = setTimeout(function(){
               $('status').empty();
           },5000);
       })
       .fail(function(data){
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
       });
    }
    else{
       swal('Complete','campo correo o seudónimo','error');    
       $('#Rseudo').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
       var s = setTimeout(function(){
           $('#Rseudo').css('box-shadow', 'none');
        },5000);
    }
});
$('footer').on('click','#loadingIniP', function(e){
    e.preventDefault();
    if(navigator.onLine){
        newpubli();   
    }else{
        newpubli();
    }
});
function newpubli(){
    Inicia();
}
$('footer').on('click','#SearchIni', function(e){
	e.preventDefault();
    $('.txt').text('BUSCAR');
    $('#MHeader').load('header/searchsin.html');
	$('.contenidos').load('modulos/Buscar.html');
    $('footer').empty();
    buscarOn();
});
$('footer').on('click','#SearchConex', function(e){
	e.preventDefault();
    $('.txt').text('BUSCAR');
    $('#MHeader').load('header/searchsin.html');
	$('.contenidos').load('modulos/buscar.html');
    $('footer').empty();
    buscarOn();
});
$('.contenidos').on('click','#SearchConex', function(e){
	e.preventDefault();
    $('.txt').text('BUSCAR');
    $('#MHeader').load('header/searchsin.html');
	$('.contenidos').load('modulos/buscar.html');
    $('footer').empty();
    var t = setTimeout(function(){
        buscarOn();
    },400);
});
function buscarOn(){    
    var x = '';
    var seudo = localStorage.getItem('seudonimo');
    if(seudo != x && seudo != null){
        buscarCon();
    }
    else{
        $.mobile.loading("show");
        var url = "https://didigitales.live/PubDigSA";
        $.get(url)
        .done(function(data){
        $.mobile.loading("hide");
        pbs = JSON.parse(data);
          $('#PubliSear').empty();
          let pubs = $('#PubliSear');
          if(data == '0'){
                
            pubs.html();
            pubs.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
          else{
              pubs.html();
              pbs.forEach(publ => {
        pubs.append(`<div class="PubliSeudos" style="margin-bottom:5px;">
              <div class="opcheaderseudo">
                <div id="${publ.seudo}" class="TitSeudo">@${publ.seudo}</div>
              </div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
               <div id="${publ.visual}" class="${publ.estatus}"></div>
               <div class="FechInr">${publ.fecha} ${publ.hora}</div>
            </div>`)
    });
            }
    });
    }
}
function buscarCon(){
    $.mobile.loading("show");
        var url = "https://didigitales.live/PubDigSA";
        $.get(url)
        .done(function(data){
        $.mobile.loading("hide");
        pbs = JSON.parse(data);
          $('#PubliSear').empty();
          let pubs = $('#PubliSear');
          if(data == '0'){
                
            pubs.html();
            pubs.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
          else{
              pubs.html();
              pbs.forEach(publ => {
        pubs.append(`<div class="PubliSeudo" style="margin-bottom:5px;">
              <div class="TitSeudo" id="${publ.seudo}" >@${publ.seudo}</div>
              <div id="OpcionMn" name="${publ.seudo}" class="${publ.id}" data-visual="${publ.visual}"></div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
                <div id="SendMeg" name="${publ.id}" class="${publ.likes}"></div>
                <div id="MensajePrivado" name="${publ.seudo}" class="ico-comen"></div>
                <div class="${publ.estado}"></div>
                <div id="${publ.visual}" class="${publ.estatus}"></div>
                <div class="FechInrc">${publ.fecha} ${publ.hora}</div></div>`)
    });
            }
    });
}
$('.contenidos').on('submit','#SearchDig', function(e){
    e.preventDefault();
    var n = $('#VseudoSearch').val();
    var url="name="+n;
    
    if(n.length == 0){
       $('#VseudoSearch').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
        var s = setTimeout(function(){
            $('#VseudoSearch').css('box-shadow', 'none');
        },5000);
    }
    else if(n.length < 7){
        $('#VseudoSearch').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
        swal('Complete','Minimo 7 caracteres. ','error');
        var s = setTimeout(function(){
            $('#VseudoSearch').css('box-shadow', 'none');
        },5000);
    }
    else if(n.length >= 7){
        
        $.mobile.loading("show");
        
        $.ajax({
            url:'https://didigitales.live/PubS',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            },
            success:function(data){
                
            $.mobile.loading("hide");
            psr = JSON.parse(data);
            $('#PubliSear').empty();
            let pubs = $('#PubliSear');
                
            if(data == '0'){
                
            pubs.html();
            pubs.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
            else{
                    
            let pubs = $('#PubliSear');
            pubs.html();
            psr.forEach(publ => {
                    pubs.append(`<div class="PubliSeudos" style="margin-bottom:5px;">
              <div class="opcheaderseudo">
              <div class="TitSeudo">@${publ.seudo}</div>
              </div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
               <div id="${publ.visual}" class="${publ.estatus}"></div>
               <div class="FechInr">${publ.fecha} ${publ.hora}</div>
            </div>`)
                  });
                
            }
                
           }
        }); 
   }
});
$('footer').on('click','#Menulist', function(e){
	e.preventDefault();
	$('.contenidos').load('modulos/menu.html');
});
$('.contenidos').on('click','#WelcomeIni', function(e){
	e.preventDefault();
	Inicia();
});
$('.contenidos').on('click','#SearchIni', function(e){
	e.preventDefault();
    $('.txt').text('BUSCAR');
    $('#MHeader').load('header/searchsin.html');
	$('.contenidos').load('modulos/Buscar.html');
    $('footer').empty();
    buscarOn();
});
$('.contenidos').on('click','#Register', function(e){
	e.preventDefault();
    $('.txt').text('REGISTRATE');
	$('.contenidos').load('modulos/registro.html');
    $('footer').empty();
});
$('.contenidos').on('submit','#Registrater', function(e){
    e.preventDefault();
    if(navigator.onLine){
    var seudo = $('#seudoc').val();
    var correo = $('#CorreosR').val();
    var contrasena = $('#Contrasena').val();
    var extes = $('#Intelf').val();
    var num = $('#TelfR').val();
    var url = 'name='+seudo+'&correo='+correo+'&contra='+contrasena+'&ext='+extes+'&num='+num;
    
    if(seudo.length == 0 && correo.length == 0 && contrasena.length == 0){
        $('#seudoc, #CorreosR, #Contrasena').css('box-shadow:', ' 0 0 0 0.2rem rgba(231,76,60, 0.25);');
        swal('Complete','Todos los campos son requeridos. ','error');
        var s = setTimeout(function(){
            $('#seudoc, #CorreosR, #Contrasena').css('box-shadow:', 'none');
        },5000);
    }
    else if(seudo.length <= 6 && correo.length <= 4 && contrasena.length <= 7){
           $('#seudoc, #CorreosR, #Contrasena').css('box-shadow', ' 0 0 0 0.2rem rgba(231,76,60, 0.25)');
           $('.Texred, .Texreds, .Texredr').show('blind');
           var s = setTimeout(function(){
               $('#seudoc, #CorreosR, #Contrasena').css('box-shadow', 'none');
               $('.Texred, .Texreds, .Texredr').hide('blind');
           },5000);
     
    }
    else if(contrasena.length > 6 && /gmail.com/.test(correo) && seudo.length > 5){
        $.mobile.loading("show");
        /*$.ajax({
            url:'https://didigitales.live/RegisterIn',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            },
            success:function(data){
                $.mobile.loading("hide");
                if(data == 'ok'){
                   $('.Cc').removeClass('bg-success');
                   $('.Cc').addClass('bg-light');
                   //swal('Enhorabuena','Se ha registrado correctamente. ','success');
                   document.getElementById('Registrater').reset();
                    
                     swal({
					  title: "Enhorabuena",
					  text: "Se ha registrado correctamente. ",
					  icon: "success",
					  timer: 6000,
					});
   
                   document.getElementById('Registrater').reset();
				   var t = setTimeout(function(){
						iniciar();
						$('.txt').text('INICIAR SESIÓN');
						$('#MHeader').load('header/index.html');
						$('.contenidos').load('modulos/iniciar.html');
						$('footer').empty();
						
						localStorage.setItem("seudose", seudo);
						localStorage.setItem("passwor", contrasena);
                        var namereg = localStorage.getItem('seudose');
                        var passwo = localStorage.getItem('passwor');
                        $('#Vseudo').val(namereg);
                        $('#Contra').val(passwo);
				   },7000);
                }
                else{
                    swal('Verifique',data,'error');
                }
            },
            
        }); */
        $.get('https://didigitales.live/RegisterIn?name='+seudo+'&correo='+correo+'&contra='+contrasena+'&ext='+extes+'&num='+num)
        .done(function(data){
            $.mobile.loading("hide");
            if(data == 'ok'){
                   $('.Cc').removeClass('bg-success');
                   $('.Cc').addClass('bg-light');
                   //swal('Enhorabuena','Se ha registrado correctamente. ','success');
                   document.getElementById('Registrater').reset();
                    
                     swal({
					  title: "Enhorabuena",
					  text: "Se ha registrado correctamente. ",
					  icon: "success",
					  timer: 6000,
					});
   
                   document.getElementById('Registrater').reset();
				   var t = setTimeout(function(){
						$('.txt').text('INICIAR SESIÓN');
						$('#MHeader').load('header/index.html');
						$('.contenidos').load('modulos/iniciar.html');
						$('footer').empty();
						
						localStorage.setItem("seudose", seudo);
						localStorage.setItem("passwor", contrasena);
                        cargarini();
				   },7000);
                }
            else{
                    swal('Verifique',data,'error');
                }
        });
    } 
    }else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
    }
});
$('.contenidos').on('click', '.icopublifin, .icopublip, .icopublif, .pstatus', function(e){
    e.preventDefault();
    var x = $(this).attr('id');
    var valor = '<div class="inestados">'+x+'</div>';
    $('status').empty();
    $('status').append(valor);
    var t = setTimeout(function(){
        $('status').empty();
    },5000);
});
$('.contenidos').on('focusout','#Rseudo', function(e){
    
    var name = $('#Rseudo').val();
    if(name.length > 6){
      var url ='https://didigitales.live/ConsultaAy?name='+name;
      $.get(url)
      .done(function(data){
        if(data == 'ok'){
            $('#Rseudo').css('box-shadow', '0 0 0 0.2rem rgba(46,204,113, 0.25)');
        }
        else{
            $('#Rseudo').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
               $('#Rseudo').css('box-shadow', 'none');
            },5000);
        }
    })
      .fail(function(data){
        $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    });
    }
    else{
       $('#seudoc').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
       var s = setTimeout(function(){
            $('#seudoc').css('box-shadow', 'none');
        },5000)
    }
    
});
$('.contenidos').on('focusout','#TelfR', function(e){
    
    var cod = $('#Intelf').val();
    var num = $('#TelfR').val();
    if(num.length > 6){
    var url ='https://didigitales.live/ConsultaTe?code='+num+'&num='+num;
    $.get(url)
    .done(function(data){
        if(data == 'ok'){
            $('#Intelf, #TelfR').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
               $('#Intelf, #TelfR').css('box-shadow', 'none');
            },5000); 
        }
        else{
           $('#Intelf, #TelfR').css('box-shadow', '0 0 0 0.2rem rgba(46,204,113, 0.25)');  
        }
    })
    .fail(function(data){
        $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    });
    }
    else{
        $('#Intelf, #TelfR').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
        var s = setTimeout(function(){
            $('#Intelf, #TelfR').css('box-shadow', 'none');
        },5000);
    }
});
$('.contenidos').on('focusout','#CorreosR', function(e){
    var name = $('#CorreosR').val();
    if( /gmail.com/.test(name) ){
       var url ='https://didigitales.live/ConsultaCor?name='+name;
       $.get(url)
       .done(function(data){
        if(data == 'ok'){
            $('#CorreosR').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
               $('#sCorreosR').css('box-shadow', 'none');
           },5000);
           
        }
        else{
            $('#CorreosR').css('box-shadow', '0 0 0 0.2rem rgba(46,204,113, 0.25)');
        }
    })
       .fail(function(data){
        $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    });
    }
    else{
         $('#CorreosR').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
               $('#CorreosR').css('box-shadow', 'none');
           },5000);
         $('status').empty();
         $('status').append('<div class="inestado">solo correo gmail</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    }
    
});
$('.contenidos').on('focusout','#seudoc', function(e){
    
    var name = $('#seudoc').val();
    if(name.length > 6){
      var url ='https://didigitales.live/ConsultaAy?name='+name;
      $.get(url)
      .done(function(data){
        if(data == 'ok'){
            $('#seudoc').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
               $('#seudoc').css('box-shadow', 'none');
            },5000);
        }
        else{
            $('#seudoc').css('box-shadow', '0 0 0 0.2rem rgba(46,204,113, 0.25)');
        }
    })
      .fail(function(data){
        $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    });
    }
    else{
       $('#seudoc').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
       var s = setTimeout(function(){
            $('#seudoc').css('box-shadow', 'none');
        },5000)
    }
    
});
$('.contenidos').on('focusout','#seudocor', function(e){
    var name = $('#seudocor').val();
    var url ='https://didigitales.live/ConsultaAy?name='+name;
    $.get(url)
    .done(function(data){
        if(data == 'ok'){
           $('#seudocor').css('box-shadow', '0 0 0 0.2rem rgba(46,204,113, 0.25)');
        }
        else{
            $('#seudocor').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
               $('#seudocors').css('box-shadow', 'none');
        },5000);  
        }
    })
    .fail(function(data){
        $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    });
});
$('.contenidos').on('focusout','#Seudocort', function(e){
    e.preventDefault();
    var name = $('#Seudocort').val();
    if(name.length > 6){
      var url ='https://didigitales.live/ConsultaAy?name='+name;
      $.get(url)
      .done(function(data){
        if(data == 'ok'){
            $('#Seudocort').css('box-shadow', '0 0 0 0.2rem rgba(46,204,113, 0.25) ');
            var s = setTimeout(function(){
               $('#Seudocort').css('box-shadow', 'none');
            },5000);
        }
        else{
            $('#Seudocort').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
        }
    })
      .fail(function(data){
        $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    });
    }
    else{
       $('#Seudocort').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
       var s = setTimeout(function(){
            $('#Seudocort').css('box-shadow', 'none');
        },5000)
    }
    
});
function correoin(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = "abcdefghijkmlnopqrstuvwxyz0123456789.*#@";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
}
function numeros(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = "0123456789";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
}
function contrasena(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = "abcdefghijkmlnopqrstuvwxyz0123456789.*#@";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
}
$('.contenidos').on('keypress','#Contrasena', function(e){
        var c = $('#Contrasena').val();
        var exp = "[a-z]"; var num="[0-9]";
        var numpatt = new RegExp(num); var patt = new RegExp(exp);
        var respu = patt.test(c); var numrespu = numpatt.test(c);
        if(c.length == null || c.length < 2 ){
           $('.Cc').removeClass('bg-light');
           $('.Cc').addClass('bg-danger');
           $('.Cc').css('width','10%');
        }
        else if( c.length < 5){
           $('.Cc').removeClass('bg-danger');
           $('.Cc').addClass('bg-warning');
           $('.Cc').css('width','40%');   
        }
        else if(c.length > 6 && respu == true && numrespu == true ){
           $('.Cc').removeClass('bg-warning');
           $('.Cc').removeClass('bg-danger');
           $('.Cc').addClass('bg-success');
           $('.Cc').css('width','100%');  
        }
});
$('.contenidos').on('click','#Reglam', function(e){
	e.preventDefault();
    $('.txt').text('REGLAMENTO');
	$('.contenidos').load('modulos/reglas.html');
    var t = setTimeout(function(){
        Reglas();
    },500);
    $('footer').empty();
});
function Reglas(){
    if(navigator.onLine){
        $.mobile.loading("show");
        $.ajax({
           url:'https://didigitales.live/VerReglas',
           type:'GET'
        })
        .done(function(data){
            $.mobile.loading('hide');
            $('#ListReg').empty();
            v = JSON.parse(data);
            let reg = $('#ListReg');
            reg.html();
            if(data == '0'){
       reg.append(`<div class="lista-inf">No disponible </div>`);
    }
            else{
       v.forEach(verg => {
        reg.append(`<ol class="lista-regl">${verg.name}</ol>`)
      });
    }
        })
        .fail(function(data){
            $.mobile.loading("hide");
           $('#ConexInicial').empty();
           let sconex = $('#ConexInicial');
           sconex.html();
           sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
        });
    }
    else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
        console.log('sin conexion');
    }
}
$('.contenidos').on('click','#HelpI', function(e){
	e.preventDefault();
    $('.txt').text('AYUDA');
    $('.contenidos').load('modulos/ayuda.html');
    $('footer').empty();
});
$('.contenidos').on('submit','#Asundoped', function(e){
    e.preventDefault();
    if(navigator.onLine){
    var seudo = $('#seudocor').val();
    var asunto = $('#asuntos').val();
    var comentario = $('#Coment').val();
    var url = 'name='+seudo+'&asunto='+comentario+'&comentario='+comentario;
    if(seudo.length <= 6 && asunto.length <= 4 && comentario.length <= 9){
           $('#seudocor, #asuntos, #Coment').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
           $('.Texred, .Texreds, .Texredr').show('blind');
           var s = setTimeout(function(){
               $('#seudocor, #asuntos, #Coment').css('box-shadow', 'none');
               $('.Texred, .Texreds, .Texredr').hide('blind');
           },5000);
     
    }
    else if(comentario.length > 9 && asunto.length > 4 && seudo.length > 6){
        $.mobile.loading("show");
        $.ajax({
            url:'https://didigitales.live/AyudaIn',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            }
        })
        .done(function(data){
            $.mobile.loading("hide");
            if(data == 'ok'){
                swal('Enhorabuena','Datos enviados correctamente. ','success');
                document.getElementById('Asundoped').reset();
            }
            else{
                swal('Verifique',data,'error');
            }
        })
        .fail(function(data){
           $.mobile.loading("hide");
           $('#ConexInicial').empty();
           let sconex = $('#ConexInicial');
           sconex.html();
           sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
    } 
    }
    else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
        console.log('sin conexion');       
    }
});
$('.contenidos').on('click','#PaqueteI', function(e){
	e.preventDefault();
    $('.txt').text('Planes');
    $('#MHeader').load('header/index.html');
	$('.contenidos').load('modulos/paquetes.html');
    $('footer').empty();
    Planes();
});
$('.contenidos').on('change','#PaqSel', function(e){
    e.preventDefault();
    if(navigator.onLine){
    var n = $('#PaqSel').val();
    var url="name="+n;
    $.mobile.loading("show");
    if(n == 'Bs.S'){
       $.get('https://didigitales.live/VerPSelB?name='+n)
       .done(function(data){
       $.mobile.loading("hide");
        $('#PaquetesRed').empty();
        ps = data;
        let paqu = $('#PaquetesRed');
        paqu.html();
        ps.forEach(paqs => {
                     paqu.append(`<li class="shadow-sm p-4 mb-4 bg-white list-paq">
                   <div class="PaqDatos">
                      <div class="NomPaq">${paqs.nombre}</div>
                       <div class="desPaq">${paqs.cantidad} ${paqs.descri}</div>
                   </div>
                   <div class="PaqPres">${paqs.bb} ${paqs.moneda2}</div>
               </li>`)
                    });     
       });
    }
    else{
        $.ajax({
            url:'https://didigitales.live/VerPSel',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            }
        })
        .done(function(data){
        $.mobile.loading("hide");
        $('#PaquetesRed').empty();
        ps = data;
        let paqu = $('#PaquetesRed');
        paqu.html();
        ps.forEach(paqs => {
                     paqu.append(`<li class="shadow-sm p-4 mb-4 bg-white list-paq">
                   <div class="PaqDatos">
                      <div class="NomPaq">${paqs.nombre}</div>
                       <div class="desPaq">${paqs.cantidad} ${paqs.descri}</div>
                   </div>
                   <div class="PaqPre">${paqs.valor} ${paqs.moneda}</div>
               </li>`)
                    });   
    })
        .fail(function(data){
           $.mobile.loading("hide");
           $('#ConexInicial').empty();
           let sconex = $('#ConexInicial');
           sconex.html();
           sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
    }
    }
    else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);      
    }
});
function Planes(){
    var url = 'https://didigitales.live/VerPaq';
    $.get(url)
    .done(function(data){
        $('#PaquetesRed').empty();
        p = JSON.parse(data);
        let paque = $('#PaquetesRed');
        if(data == '0'){ 
            paque.html();
            paque.append(`<div class="lista-inf">No hay resultados</div>`)   
        }
        else{
            paque.html();
            p.forEach(paq => {
        paque.append(`<li class="shadow-sm p-4 mb-4 bg-white list-paq">
                   <div class="PaqDatos">
                      <div class="NomPaq">${paq.nombre}</div>
                       <div class="desPaq">${paq.cantidad} ${paq.descri}</div>
                   </div>
                   <div class="PaqPre">${paq.valor} ${paq.moneda}</div>
               </li>`)
    });
        }
    });
}
$('.contenidos').on('click','#MediosX', function(e){
	e.preventDefault();
    $('.txt').text('MEDIOS DE PAGO');
    $('#MHeader').load('header/index.html');
	$('.contenidos').load('modulos/medios.html');
    $('footer').empty();
    MediosP();
});
function MediosP(){
    //var url = 'http://simple.local/Pagom';
    var url2 = 'https://didigitales.live/Transf';
    var url3 = 'https://didigitales.live/OtrosM';
    /*$.get(url)
    .done(function(data){
        PaM = data;
        $('#PagoMovilIn').empty();
        let pag = $('#PagoMovilIn');
        if(data == 0){
            pag.html();
            pag.append(`<div class="lista-inf">No disponible</div>`);
        }
        else{
            pag.html();
            PaM.forEach(pagi => {
                pag.append(`<div class="container-pm">
        <li style="${pagi.style}">${pagi.nombre}</li>
        <li>Doc: ${pagi.documento}</li>
        <li>Telf: ${pagi.telefono}</li>
        </div>`);
            });
        }
    });*/
    $.get(url2)
    .done(function(data){
        Trans = data;
        $('#TransferenciaPa').empty();
        let tra = $('#TransferenciaPa');
        if(data == 0){
            tra.html();
            tra.append(`<div class="lista-inf">No disponible</div>`);
        }
        else{
            tra.html();
            Trans.forEach(ta => {
                tra.append(`<div class="container-trans">
        <li style="${ta.style}">${ta.nombre}</li>
        <li>${ta.empresa}</li>
        <li>${ta.numerocuenta}</li>
        <li>Tipo: ${ta.tipo}</li>
        <li>Doc: ${ta.doc}</li>
        </div>`);
        });
        }
    });
    $.get(url3)
    .done(function(data){
        Pay = data;
        $('#Paypal').empty();
        let pa = $('#Paypal');
        if(data == 0){
            pa.html();
            pa.append(`<div class="lista-inf">No disponible</div>`);
        }
        else{
            pa.html();
            Pay.forEach(co => {
                pa.append(`
        <li class="listmedios">
            <i class="icom" style="${co.icono}"></i><div class="Mtxt">${co.nombre}</div>
            <div class="corrmed">${co.mail}</div>
        </li>
        `);
        });
        }
    });
}

/*Con acceso*/

$('#MHeader').on('click','#MenuConex, #aggConex', function(e){
	e.preventDefault();
    $('#MHeader').load('header/header-conex.html');
	$('.contenidos').load('modulos/menu-conex.html');
    $('footer').load('pie/pie-conectado.html');
    $.mobile.loading("hide");
});
$('.contenidos').on('click', '#CompraDplan', function(e){
    e.preventDefault();
    if(cop == 0){
        $('.opc-comp').show('blind');
        $('#CompraDplan').removeClass('ui-icon-carat-r');
        $('#CompraDplan').addClass('ui-icon-carat-d');
        cop = 1;
    }
    else{
        $('.opc-comp').hide('blind');
        $('#CompraDplan').removeClass('ui-icon-carat-d');
        $('#CompraDplan').addClass('ui-icon-carat-r');
        cop = 0;
    }
});
$('.contenidos').on('click', '#Gruposplus', function(e){
    e.preventDefault();
    if(cop == 0){
        $('.opc-groups').show('blind');
        $('#Gruposplus').removeClass('ui-icon-carat-r');
        $('#Gruposplus').addClass('ui-icon-carat-d');
        cop = 1;
    }
    else{
        $('.opc-groups').hide('blind');
        $('#Gruposplus').removeClass('ui-icon-carat-d');
        $('#Gruposplus').addClass('ui-icon-carat-r');
        cop = 0;
    }
});
$('.contenidos').on('click','#Notif', function(e){
    var name = localStorage.getItem('seudonimo');
    var url = 'https://didigitales.live/ListNotifica/'+name;
    //$('#MHeader').load('header/header-conex.html');
    $('.txt').text('Notificaciones');
    //$('.contenidos').load('conexion/notificacion.html');
    //$('footer').load('pie/pie-conectado.html');
    
    $.ajax({
           url:url,
           type:'GET'
        })
    .done(function(data){
            console.log(data);
             var datas = data;
             let pub = $('.contenidos');
             
             $('.contenidos').empty();
             if(data == '0'){
                
            pub.html();
            pub.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
             else{ 
                pub.html();
                datas.forEach( notif =>{
                    pub.append(`<li class="titnot" id="${notif.id}"><i class="txtnot">${notif.titulo}</i><i class="fechaInot">${notif.fecha}</i></li>`)
                });
           }
       })
    .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       }); 
});
$('.contenidos').on('click','#PerfilIn', function(e){
    e.preventDefault();
    perfil();
});
$('footer').on('click','#PerfilIn', function(e){
    e.preventDefault();
    perfil();
});
function perfil(){
    if(navigator.onLine){
        $('#MHeader').load('header/header-conex.html');    
        var name = localStorage.getItem('seudonimo');
       $.ajax({
           url:'https://didigitales.live/MiPerfil/'+name,
           type:'GET'
        })
       .done(function(data){
             var datas = JSON.parse(data);
             let pub = $('.contenidos');
             var perfil = `<div class="Header-perfil">
              <div class="icono-content">
                  <div class="let-sed">${datas.ini}</div>
              </div>
              <div class="CuadroContent">
                <div class="PubR">${datas.seguidores}</div>
                <div class="SegR">${datas.seguidos}</div>
                <div class="tPub">Seguidores</div>
                <div class="tseg">Seguiendo</div>
              </div>
              <div class="ContenidoPerf">
                <div class="NombPer">${datas.nombre} ${datas.apellido}</div>
                <div class="SeudoPer" id="${datas.seudo}">@${datas.seudo}</div>
                <div class="icowhat"></div>
                <div class="TelefPerf">${datas.tele}</div>
                <div id="Reputa" class="Ver-rep">Ver reputación</div>
              </div></div>
              <div class="shadow-sm p-4 mb-4 bg-white PubDispo">
<div class="NombPern">Publicaciones disponibles</div>
<div class="CantDispo">${datas.cantidad}</div>
</div>
<div class="ui-nodisc-icon">
    <a data-transition="flip" id="SolictPaq" class="ui-nodisc-icon ui-btn ui-shadow ui-corner-all ui-icon-plus ui-btn-icon-notext ui-btn-inline" id="edi"></a>
</div><div class="contenidosper" id="RPublica"></div>`;
             
             $('.contenidos').empty();
             if(data == 'Error'){
                
            pub.html();
            pub.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
             else{ 
            
            pub.html();
            pub.append(perfil)

           }
           $('footer').load('pie/pie-perfil.html');
       })
       .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       }); 
       var name = localStorage.getItem('seudonimo');     
       var x = setTimeout(function(){
           $.get('https://didigitales.live/MisPubli/'+name)
           .done(function(data){
                pbi = JSON.parse(data);
                let publi = $('#RPublica');
                $('#RPublica').empty();
                if(data == '0'){
                
            publi.html();
            publi.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
                else{
            
            publi.html();
            pbi.forEach(publ => {
        publi.append(`<div class="PubliSeudo" style="margin-bottom:5px;">
              <div class="TitSeudo" id="${publ.seudo}" >@${publ.seudo}</div>
              <div id="OpcionMn" name="${publ.seudo}" class="${publ.id}" data-visual="${publ.visual}"></div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
                <div id="SendMeg" name="${publ.id}" class="${publ.likes}"></div>
                <div id="MensajePrivado" name="${publ.seudo}" class="ico-comen"></div>
                <div class="${publ.estado}"></div>
                <div id="${publ.visual}" class="${publ.estatus}"></div>
                <div class="FechInrc">${publ.fecha} ${publ.hora}</div></div>`)
    });
                
            }
           })
           .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       }); 
       },1000);
    }
    else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
    }
}
$('footer').on('click','#EditPerf', function(e){
    datosUser();
});
function datosUser(){
    $('#MHeader').load('header/header-datos.html');
    $('.contenidos').load('modulos/datos.html');
    $('footer').empty();
}
$('#MHeader').on('click','#regresarperf', function(e){
    perfil();
});
$('.contenidos').on('submit','#DatosUser', function(e){
    e.preventDefault();
    var name = localStorage.getItem('seudonimo');
    var nombre = $('#nombD').val();
    var apell = $('#ApellD').val();
    if(navigator.onLine){
        if(nombre.length == 0 && apell.length == 0 ){
            swal("Complete todos los campos ", {  icon: "error", });
        }
        else if(nombre.length < 3 ){
            swal("Nombre minimo 3 caracteres. ", {  icon: "error", });
        }
        else if(apell.length < 3 ){
            swal("Apellido minimo 3 caracteres. ", {  icon: "error", });
        }
        else{
            $('#SendBottom').attr("disabled", true); 
            $.get('https://didigitales.live/Datosuser?name='+name+'&nombre='+nombre+'&apellido='+apell)
            .done(function(data){
                $('#SendBottom').attr("disabled", false); 
                if(data == 'ok'){
                    $('status').empty();
                    $('status').append('<div class="inestado">Datos actualizados</div>');
                    var t = setTimeout(function(){
                        $('status').empty();
                         perfil();
                    },3000);
                }
                else{
                    $('status').empty();
                    $('status').append('<div class="inestado">ha ocurrido una falla</div>');
                    var t = setTimeout(function(){
                        $('status').empty();
                    },5000);
                }
        });
        }
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
            $('status').empty();
        },10000);
    }
    
});
function nombres(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = "abcdefghijkmlnopqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
}
$('.contenidos').on('click','#Reputa', function(e){
    
    e.preventDefault();
    $('#MHeader').load('header/header-reputacion.html');
    $('footer').empty();
    var seudo = $('.SeudoPer').attr('id');
    var Rep = 'https://didigitales.live/Reputacion?name='+seudo;
    var record = 'https://didigitales.live/Recomendacion?name='+seudo;
    $.mobile.loading("show");
    $.get(Rep)
    .done(function(data){
        $.mobile.loading("hide");
        var datas = JSON.parse(data);
        let pub = $('.contenidos');
        var reputaci = `<div id="SeudoRepu">
    <div class="txtrep">@${datas.names}</div>
</div>
<ul>
    <li class="rep">
        <div class="txtrep">Publicaciones</div>
        <i class="numpub" id="CantDe">${datas.cantidad}</i>
    </li>
    <li class="rep">
        <div class="txtrep">Publicaciones Activa</div>
        
        <i class="icopublif"></i>
        <i class="numpub" id="CantAct">${datas.disponibles}</i>
    </li>
    <li class="rep">
        <div class="txtrep">Publicaciones Pausada</div>
        
        <i class="icopublip"></i>
        <i class="numpub" id="CantPau">${datas.pausado}</i>
    </li>
    <li class="rep">
        
        <div class="txtrep">Publicaciones Finalizada</div>
        
        <i class="icopublifin"></i>
        <i class="numpub" id="CantFinal">${datas.fin}</i>
    </li>
</ul>
<div class="Recomen" id="Recomendaciones">
    
</div>`;
$('.contenidos').empty();
             
            
            pub.html();
            pub.append(reputaci);

    }); 
    var time = setTimeout(function(){
         $.mobile.loading("show");
         $.get(record)
        .done(function(data){
             $.mobile.loading("hide");
        recod = data;
        let rec = $('#Recomendaciones');
        $('#Recomendaciones').empty();
        if(data == '0'){
             rec.html();
             rec.append(`<div class="lista-inf">No hay recomendaciones</div>`)
        }
        else{
            rec.html();
            recod.forEach(reco => {
            rec.append(`<div class="mensajeuser">
            <div class="txtrep">@${reco.seudo}</div><i class="fechacoment">${reco.fecha}</i>
            <i class="txtcoment">${reco.comentario}</i>
            </div>`)
           });  
        }
    });
    },1000);
   
});
$('#MHeader').on('click','#HeadRepu', function(e){
    welcome();
});
$('.contenidos').on('click','#HelpIp', function(e){
	e.preventDefault();
    $('.txt').text('AYUDA');
    $('.contenidos').load('modulos/ayuda-conex.html');
    $('footer').empty();
});
$('.contenidos').on('submit','#Asundosped', function(e){
    e.preventDefault();
    if(navigator.onLine){
    var seudo = localStorage.getItem('seudonimo');
    var asunto = $('#asuntosin').val();
    var comentario = $('#Coments').val();
    var url = 'name='+seudo+'&asunto='+comentario+'&comentario='+comentario;
    if(asunto.length <= 4 && comentario.length <= 9){
           $('#seudocors, #asuntosin, #Coments').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
           $('.Texred, .Texreds, .Texredr').show('blind');
           var s = setTimeout(function(){
               $('#seudocors, #asuntosin, #Coments').css('box-shadow', 'none');
               $('.Texred, .Texreds, .Texredr').hide('blind');
           },5000);
     
    }
    else if(comentario.length > 9 && asunto.length > 4){
        $.mobile.loading("show");
        $.ajax({
            url:'https://didigitales.live/AyudaIn',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            }
        })
        .done(function(data){
            $.mobile.loading("hide");
            if(data == 'ok'){
                swal('Enhorabuena','Datos enviados correctamente. ','success');
                document.getElementById('Asundosped').reset();
            }
            else{
                swal('Verifique',data,'error');
            }
        })
        .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
    }
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
            $('status').empty();
        },10000);     
    }
 
});
$('.contenidos').on('click','#MediosXX', function(e){
	e.preventDefault();
    $('.txt').text('MEDIOS DE PAGO');
    $('#MHeader').load('header/header-conex.html');
	$('.contenidos').load('modulos/mediosx.html');
    $('footer').empty();
    MediosP();
});
$('.contenidos').on('click','#PaqueteII', function(e){
	e.preventDefault();
    $('.txt').text('Planes');
    $('#MHeader').load('header/header-conex.html');
	$('.contenidos').load('modulos/paquetes.html');
    $('footer').empty();
    Planes();
});
$('footer').on('click','#Setting', function(e){
    e.preventDefault();
    $('.txt').text('Ajustes');
    $('#MHeader').load('header/header-conex.html');
    $('.contenidos').load('modulos/setting.html');
    $('footer').empty();
});
$('.contenidos').on('click','#Setting', function(e){
    e.preventDefault();
    $('.txt').text('Ajustes');
    $('#MHeader').load('header/header-conex.html');
    $('.contenidos').load('modulos/setting.html');
    $('footer').empty();
});
$('.contenidos').on('click','#Cambupdate', function(e){
    e.preventDefault();    
    $('#RedSoc').removeClass('ui-btn-active');
    $('#Cambupdate').addClass('ui-btn-active');
    $('#OpcionSetting').load('modulos/cambio.html');
});
$('.contenidos').on('click','#RedSoc', function(e){
    e.preventDefault();    
    $('#Cambupdate').removeClass('ui-btn-active');
    $('#RedSoc').addClass('ui-btn-active');
    $('#OpcionSetting').load('modulos/redes.html');
});
$('.contenidos').on('submit','#CamUpdate', function(e){
    e.preventDefault();
    var c = $('#Contra2').val();
    var c1 = $('#Contras').val();
    var name = localStorage.getItem('seudonimo');
    var url = 'name='+name+'&contra='+c1+'&contra2='+c;
    $.mobile.loading("show");
    if(c1.length < 8 || c.length < 8){
        $.mobile.loading("hide");
       $('estado').empty();
       $('estado').append('<div class="inestado">Mínimo 8 caracteres </div>');
        var t = setTimeout(function(){
            $('estado').empty();
        },10000);
    }
    else if(c != c1){
        $.mobile.loading("hide");
       $('estado').empty();
       $('estado').append('<div class="inestado">La contraseña no coinciden</div>');
        var t = setTimeout(function(){
            $('estado').empty();
        },10000);
    }
    else if(c1.length > 7 && c.length > 7 && c == c1){
        if(navigator.onLine){
            $.ajax({
            url:'https://didigitales.live/Supdate',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            },
            success:function(data){
                $.mobile.loading("hide");
                if(data == 'ok'){
                   $.mobile.loading("hide");
                   welcome();
                   $('.Cc').removeClass('bg-success');
                   $('.Cc').addClass('bg-light');
                   document.getElementById("CamUpdate").reset();
                   $('estado').empty();
                   $('estado').append('<div class="inestado">Cambio realizado con éxito. </div>');
                   var t = setTimeout(function(){
                    $('estado').empty();
                    window.location = "#Inic";
                   },5000);
                }
                else{
                    $.mobile.loading("hide");
                    $('estado').empty();
                   $('estado').append('<div class="inestado">'+data+'</div>');
                   var t = setTimeout(function(){
                    $('estado').empty();
                   },5000);
                }
            }
            
        });
        }
        else{
            $('status').empty();
            $('status').append('<div class="inestado">conexion inestable</div>');
            var t = setTimeout(function(){
                $('status').empty();
            },10000);
        }
    }
});
$('footer').on('click','#AggPlus', function(e){
    e.preventDefault();
    $('#MHeader').load('header/aggplus.html');
    $('.contenidos').load('modulos/agregar.html');
    $('footer').load('pie/sin-opc.html');
});
$('#SalirConfir').on('click', '#CerrarSesion', function(e){
    $('#SalirConfir').hide('blind');
});
$('.contenidos').on('click', '#BlindSalir',  function(e){
    e.preventDefault();
    $('#SalirConfir').show('blind');
});
$('#SalirIn').on('click', function(e){{
    e.preventDefault();
    //localStorage.clear();
    if(navigator.onLine){
    var seudo = localStorage.getItem('seudonimo');
    var url = 'https://didigitales.live/SalirIn?name='+seudo;
    $.get(url)
    .done(function(data){
        $('#SalirConfir').hide('blind');
        localStorage.setItem("seudonimo", '');
        localStorage.setItem("inicioweb", '');
        localStorage.setItem("Segundo", no);
        Inicia();
    });
    }
    else{
        $('#ConexInicial').empty();
        let sconex = $('#ConexInicial');
        sconex.html();
        sconex.append(`<button id="sinconex" class="ui-btn ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all">Verificar conexión </button>`);
    }
}});
$('.contenidos').on('click','#SendMeg', function(e){
    e.preventDefault();
    //console.log('clic');
    var v = $(this).attr('class');
    //console.log(v);
    if(v == 'ico-meg'){
        $(this).removeClass('ico-meg');
        $(this).addClass('ico-megustar');
    }
    else{
        $(this).removeClass('ico-megustar');
        $(this).addClass('ico-meg');
    }
    var id = $(this).attr('name');
    var name = localStorage.getItem('seudonimo');
    var url = 'https://didigitales.live/likesm?name='+name+'&cod='+id;
    $.get(url)
    .done(function(data){
        if(data == 'ok'){
            //console.log('like');
        }
        else if(data == 'd'){
            //console.log('deslike');
        }
        else{
            //console.log('error');
        }
    })
    .fail(function(data){
        $(this).empty();
        $(this).append('<div class="ico-megustar"></div>');
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
            $('status').empty();
        },10000);
    }); 
});
$('#MHeader').on('click', '#Coraz', function(e){
    scrollcor();
    $('.txt').text('DIDIGITALES');
    $('#MHeader').load('header/header-conex.html');
    $('footer').load('pie/pie-conectado.html');
    $('.contenidos').empty();
        let ins = $('.contenidos');
        ins.html();
        ins.append(`<div id="ConexInicial"></div>
            <div id="PubliCa"></div>
            <status></status>`);
    var seudo = localStorage.getItem('seudonimo');
    $.mobile.loading("show");
    var url = "https://didigitales.live/list/like/?name="+seudo;
    $.ajax({
        url:url,
        type:'GET'
     })
    .done(function(data){
        
            $.mobile.loading("hide");
            pbi = JSON.parse(data);
            let publi = $('#PubliCa');
            $('#PubliCa').empty();
            if(data == '0'){
                
            publi.html();
            publi.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
            else{
            
            publi.html();
            pbi.forEach(publ => {
        publi.append(`<div class="PubliSeudo" style="margin-bottom:5px;">
              <div class="TitSeudo" id="${publ.seudo}" >@${publ.seudo}</div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
                <div id="SendMeg" name="${publ.id}" class="${publ.likes}"></div>
                <div class="ico-comen"></div>
                <div class="${publ.estado}"></div>
                <div id="${publ.visual}" class="${publ.estatus}"></div>
                <div class="FechInrc">${publ.fecha} ${publ.hora}</div></div>`)
    });
                
            }
    })
    .fail(function(data){
        $.mobile.loading("hide");
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
            $('status').empty();
        },10000);
        
    });
});
function scrollcor(){
    var seudo = localStorage.getItem('seudonimo');
    var x = '';
    var px = 1500;
    var d = 1;
    var h = 15;
    var no = 1;
    $(window).scroll(function(event){
        var posi = $(window).scrollTop();
        if(posi >= px){
            px = px + 1500;
            var desde = h * d;
            d = d + 1;
            $.get('https://didigitales.live/like/list/?name='+seudo+'&cantidad='+desde)
            .done(function(data){
                reser = data;
                let res = $('#PubliC');
                let not = $('status');
                if(data == 0){
                    if(no == 1){
                        $('status').empty();
                        not.html();
                        not.append(`<div class="lista-inf">No hay mas registro  </div>`);
                        no = 0;
                    }
                }
                else{
                    res.html();
                    reser.forEach(publ => {
                res.append(`<div class="PubliSeudo" style="margin-bottom:5px;">
              <div class="opcheaderseudo">
              <div class="TitSeudo">@${publ.seudo}</div>
              </div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
                <div id="SendMeg" name="${publ.id}" class="${publ.likes}"></div>
                <div class="ico-comen"></div>
                <div class="${publ.estado}"></div>
                <div id="${publ.visual}" class="${publ.estatus}"></div>
                <div class="FechInrc">${publ.fecha} ${publ.hora}</div>
            </div>`);
            });
                }
            })
            .fail(function(data){
                $.mobile.loading("hide");
                $('status').empty();
                $('status').append('<div class="inestado">conexion inestable</div>');
                var t = setTimeout(function(){
                    $('status').empty();
                },10000);
            });
        } 
    });
}
$('.contenidos').on('click','.Paletas', function(e){
    e.preventDefault();
    pl++;
    var n = pl;
    
    if(n == 2){
        $('.ContenFondo').removeClass('pl-azul');
        $('.ContenFondo').addClass('pl-rojo');
    }
    else if(n == 3){
        $('.ContenFondo').removeClass('pl-rojo');
        $('.ContenFondo').addClass('pl-dorado');
    }
    else if(n == 4){
        $('.ContenFondo').removeClass('pl-dorado');
        $('.ContenFondo').addClass('pl-verde');
    }
    else if(n == 5){
        $('.ContenFondo').removeClass('pl-verde');
        $('.ContenFondo').addClass('pl-cris');
    }
    else if(n == 6){
        $('.ContenFondo').removeClass('pl-cris');
        $('.ContenFondo').addClass('pl-naranja');
    }
    else{
        $('.ContenFondo').removeClass('pl-naranja');
        $('.ContenFondo').addClass('pl-azul');
        pl = 1;
    } 

});
$('.contenidos').on('click','.LetraColor', function(e){
    e.preventDefault();
    lt++;
    var n = lt;
    
    if(n == 2){
        $('#DescribaLet').removeClass('lt-white');
        $('#DescribaLet').addClass('lt-negro');
    }
    else if(n == 3){
        $('#DescribaLet').removeClass('lt-negro');
        $('#DescribaLet').addClass('lt-dorado');
    }
    else if(n == 4){
        $('#DescribaLet').removeClass('lt-dorado');
        $('#DescribaLet').addClass('lt-azul');
    }
    else if(n == 5){
        $('#DescribaLet').removeClass('lt-azul');
        $('#DescribaLet').addClass('lt-gris');
    }
    else if(n == 6){
        $('#DescribaLet').removeClass('lt-gris');
        $('#DescribaLet').addClass('lt-morado');
    }
    else{
        $('#DescribaLet').removeClass('lt-morado');
        $('#DescribaLet').addClass('lt-white');
        lt = 1;
    } 

});
$('.contenidos').on('click','.FondPub', function(e){
    e.preventDefault();
    ft++;
    var n = ft;
    if(n == 2){
        $('#DescribaLet').removeClass('ft-roboto');
        $('#DescribaLet').addClass('ft-mont');
    }
    else if(n == 3){
        $('#DescribaLet').removeClass('ft-mont');
        $('#DescribaLet').addClass('ft-Ubu');
    }
    else if(n == 4){
        $('#DescribaLet').removeClass('ft-Ubu');
        $('#DescribaLet').addClass('ft-combo');
    }
    else{
        $('#DescribaLet').removeClass('ft-combo');
        $('#DescribaLet').addClass('ft-roboto');
        ft = 1;
    }
});
$('.contenidos').on('submit','#GestionPub', function(e){
    e.preventDefault();
    $.mobile.loading("show");
    var fondo = $('#FondoP').attr('class');
    var style = $('#DescribaLet').attr('class');
    var valor = $('#DescribaLet').val();
    seudonimo = localStorage.getItem('seudonimo');
    var url = 'fondo='+fondo+'&font='+style+'&valor='+valor+'&name='+seudonimo;
    var dor = new RegExp('lt-dorado'); var dora = new RegExp('pl-dorado');
    var gr = new RegExp('lt-gris'); var gri = new RegExp('pl-cris');
    var condora = dor.test(style); var fondora = dora.test(fondo);
    var congris = gr.test(style); var fongris = gri.test(fondo);
    if(condora == true &&  fondora ==  true){
        $.mobile.loading("hide");
        var dates = '<div class="inestados">Combinacion no permitida</div>';
           $('estado').empty();
           $('estado').append(dates);
           var t = setTimeout(function(){
               $('estado').empty();
           },5000);
    }
    else if(congris == true &&  fongris ==  true){
        $.mobile.loading("hide");
        var dates = '<div class="inestados">Combinacion no permitida</div>';
           $('estado').empty();
           $('estado').append(dates);
           var t = setTimeout(function(){
               $('estado').empty();
           },5000);
    }
    else{
       if(valor.length >= 30){
       
          
       $.ajax({
            url:'https://didigitales.live/NPub',
            data:url,
            type:'GET',
            headers:{
                'Access-Control-Allow-Origin':'https://didigitales.live/'
            },
        })
        .done(function(data){
            if(data == 'ok'){
                $.mobile.loading("hide");
                welcome();
                $('estado').empty();
                $('estado').append('<div class="inestado">Publicación registrada </div>');
                var t = setTimeout(function(){
                 $('estado').empty();
                 $('#DescribaLet').text('Describe tu publicación.');
                 window.location = "#Inic";
                 
                },5000);
             }
             else{
                 $.mobile.loading("hide");
                 console.log(data);
             }
        })
        .fail(function(data){
            $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
        });
        
    }
    else{
       $.mobile.loading("hide");
       $('estado').empty();
       $('estado').append('<div class="inestado">Mínimo 30 caracteres</div>');
        var t = setTimeout(function(){
            $('estado').empty();
        },10000);
    }
    }
});
$('.contenidos').on('keyup','#DescribaLet',  function(e){
    var num = $('#DescribaLet').val();
    var cant = num.length;
    if(cant >=  60){
       $('#DescribaLet').removeClass('P60');
       $('#DescribaLet').addClass('P70');
    }
    if(cant >= 80){
       $('#DescribaLet').removeClass('P70');
       $('#DescribaLet').addClass('P80');
    }
     if(cant >= 100){
       $('#DescribaLet').removeClass('P80');
       $('#DescribaLet').addClass('P100');
    }
     if(cant >= 110){
       $('#DescribaLet').removeClass('P100');
       $('#DescribaLet').addClass('P110');
    }
    if(cant >= 130){
       $('#DescribaLet').removeClass('P110');
       $('#DescribaLet').addClass('P130');
    }
    if(cant >= 140){
       $('#DescribaLet').removeClass('P130');
       $('#DescribaLet').addClass('P140');
    }
});
$('.contenidos').on('focusin','#DescribaLet', function(e){
   $('#DescribaLet').empty();
});
$('.contenidos').on('focusout','#DescribaLet',  function(e){
   var d = $('#DescribaLet').val();
   cant = d.length;
   if(cant == 0){
      $('#DescribaLet').text('Describe tu publicación.');
    }
});
$('.contenidos').on('click','#MensajePrivado', function(e){
    var seudo = localStorage.getItem('seudonimo');
    var name = $(this).attr('name');
    if(seudo != name){
    swal("Decribe el mensaje aqui:", {
        content: "input",
        closeOnClickOutside: false,
    })
    .then((value) => {
        var cuerpo = String(value);
        if(cuerpo.length > 5 && cuerpo != null ){
        if(navigator.onLine){
        var url = 'https://didigitales.live/smsresp?name='+seudo+'&seudo='+name+'&sms='+cuerpo;
        $.get(url)
        .done(function(data){
            if(data == 'ok'){
                 swal('Enhorabuena','mensaje enviados. ','success');
            }
        })
        }
        else{
            $('status').empty();
            $('status').append('<div class="inestado">conexion inestable</div>');
            var t = setTimeout(function(){
                $('status').empty();
            },10000);
        }    
        }
        else if(cuerpo.length < 6 || cuerpo==null ){
            swal('Requiere','minimo 6 caracteres ','error');
        }
            
    });
    }
    else if(seudo == name){
        swal('Disculpe','No es permitido esta acción ','warning');
    }
});
$('.contenidos').on('click','#EnSolicitud', function(e){
    e.preventDefault();
    var seudo = localStorage.getItem('seudonimo');
    var rec = $('.SeudoPer').attr('id');
    var url = 'https://didigitales.live/SolicitudSe/?emite='+seudo+'&receptor='+rec;
    swal({
            title: "Confirmar ?",
            text: "Desea enviar solicitud de seguimiento. !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    .then((YES) => {
            if (YES) {
              if(navigator.onLine){
              $.get(url)
              .done(function(data){
                  
                  if(data == 'ok'){
                      swal("Solicitud ha sido enviada. !", {
                            icon: "success",
                      });
                  }else{
                      swal(data, {
                            icon: "warning",
                      });
                  }

              });
              }else{
            $('status').empty();
            $('status').append('<div class="inestado">conexion inestable</div>');
            var t = setTimeout(function(){
                $('status').empty();
            },10000);
        }
            } 
        });
});
$('#MHeader').on('click','#EnRecomendar', function(e){
    e.preventDefault();
    var seudo = localStorage.getItem('seudonimo');
    var rec = $('.txt').attr('name');
    var urls = 'https://didigitales.live/RecomiendaCon/?emite='+seudo+'&receptor='+rec;
    swal({
            title: "Confirmar ?",
            text: "Desea enviar solicitud de recomendación. !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    .then((YES) => {
            if (YES) {
              if(navigator.onLine){
              $.get(urls)
              .done(function(data){
                  
                  if(data == 'ok'){
                      swal("Solicitud ha sido enviada. !", {
                            icon: "success",
                      });
                  }else{
                      swal(data, {
                            icon: "warning",
                      });
                  }

              });
              }
            } 
        });
});
$('#MHeader').on('click', '#MailBam', function(e){
    e.preventDefault();
    $('#MHeader').load('header/header-imbox.html');
    $('.contenidos').load('modulos/inbox.html');
    $('footer').empty();
    Bandeja();
});
function Bandeja(){
    if(navigator.onLine){
    localStorage.setItem("Segundo", si);
    VerificarMen();
    $.mobile.loading("show");
    var seudo = localStorage.getItem('seudonimo');
        $.get('https://didigitales.live/bandeja?name='+seudo)
        .done(function(data){
        $.mobile.loading("hide");
        $('#BandejaE').empty();
        b = data;
        let ba = $('#BandejaE');
        if(data == '0'){ 
            ba.html();
            ba.append(`<div class="lista-inf">Bandeja vacía</div>`)   
        }
        else{
            ba.html();
            b.forEach(ban =>{
                ba.append(`<li class="opcseg" id="${ban.name}">
     <div id="${ban.name}" class="textcli">@${ban.name}</div>
     <div class="menss">${ban.descri}</div>
    </li>`);
            });
        }
    });
    }
    else{
            $('status').empty();
            $('status').append('<div class="inestado">conexion inestable</div>');
            var t = setTimeout(function(){
                $('status').empty();
            },10000);
    }
}
$('#MHeader').on('click','#MenuIns', function(e){
	e.preventDefault();
    welcome();
});
$('.contenidoss').on('click', '.TitSeudo', function(e){
    var n = $(this).attr('id');
    var name = localStorage.getItem('seudonimo');
    if(name == ''){
       var valor = '<div class="inestadoss">Inicia sesión</div>';
       $('status').empty();
       $('status').append(valor);
       var t = setTimeout(function(){
          $('status').empty();
       },5000);
    }
    else if(name != ''){
        $.ajax({
           url:'https://didigitales.live/VerPerfil/'+name,
           type:'GET'
        })
       .done(function(data){
             var datas = JSON.parse(data);
             let pub = $('.contenidos');
             var perfil = `<div class="Header-perfils">
              <div class="icono-content">
                  <div class="let-sed">${datas.ini}</div>
              </div>
              <div class="CuadroContent">
                <div class="PubR">${datas.seguidores}</div>
                <div class="SegR">${datas.seguidos}</div>
                <div class="tPub">Seguidores</div>
                <div class="tseg">Seguidos</div>
              </div>
              <div class="ContenidoPerf">
                <div class="NombPer">${datas.nombre} ${datas.apellido}</div>
                <div class="SeudoPer">@${datas.seudo}</div>
                <div id="Reputa" class="Ver-rep">Ver reputación</div>
                
              </div>
</div>
<div class="contenidosper">
    <h1 class="sh1">¿Solicitar seguimiento ?</h1>
    <div class="Suser bg-primary" id="EnSolicitud">aceptar</div>           
</div>`;
             
             $('.contenidos').empty();
             if(data == 'Error'){
                
            pub.html();
            pub.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
             else{ 
            
            pub.html();
            pub.append(perfil)

           }
       })
       .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       }); 
    } 
});
$('.contenidos').on('click', '.TitSeudo', function(e){
    var n = $(this).attr('id');
    var name = localStorage.getItem('seudonimo');
    var re = $(this).attr('id');
    if(name == ''){
       var valor = '<div class="inestados">Inicia sesión</div>';
       $('status').empty();
       $('status').append(valor);
       var t = setTimeout(function(){
          $('status').empty();
       },5000);
    }
    else if(name == re){
        $.ajax({
           url:'https://didigitales.live/MiPerfil/'+name,
           type:'GET'
        })
       .done(function(data){
             var datas = JSON.parse(data);
             let pub = $('.contenidos');
             var perfil = `<div class="Header-perfil">
              <div class="icono-content">
                  <div class="let-sed">${datas.ini}</div>
              </div>
              <div class="CuadroContent">
                <div class="PubR">${datas.seguidores}</div>
                <div class="SegR">${datas.seguidos}</div>
                <div class="tPub">Seguidores</div>
                <div class="tseg">Seguiendo</div>
              </div>
              <div class="ContenidoPerf">
                <div class="NombPer">${datas.nombre} ${datas.apellido}</div>
                <div class="SeudoPer">@${datas.seudo}</div>
                <div class="icowhat"></div>
                <div class="TelefPerf">${datas.tele}</div>
                <div id="Reputa" class="Ver-rep">Ver reputación</div>
              </div></div>
              <div class="shadow-sm p-4 mb-4 bg-white PubDispo">
<div class="NombPern">Publicaciones disponibles</div>
<div class="CantDispo">${datas.cantidad}</div>
</div>
<div class="ui-nodisc-icon">
    <a href="#" data-transition="flip" id="left-btn" class="ui-nodisc-icon ui-btn ui-shadow ui-corner-all ui-icon-plus ui-btn-icon-notext ui-btn-inline" id="edi"></a>
</div><div class="contenidosper" id="RPublica"></div>`;
             
             $('.contenidos').empty();
             if(data == 'Error'){
                
            pub.html();
            pub.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
             else{ 
            
            pub.html();
            pub.append(perfil)

           }
       })
       .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       }); 
       var name = localStorage.getItem('seudonimo');     
       var x = setTimeout(function(){
           $.get('https://didigitales.live/MisPubli/'+name)
           .done(function(data){
                pbi = JSON.parse(data);
                let publi = $('#RPublica');
                $('#RPublica').empty();
                if(data == '0'){
                
            publi.html();
            publi.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
                else{
            
            publi.html();
            pbi.forEach(publ => {
        publi.append(`<div class="PubliSeudo" style="margin-bottom:5px;">
              <div class="TitSeudo" id="${publ.seudo}" >@${publ.seudo}</div>
               <div class="${publ.fondo} FondoSeu">
                  <div class="txt-cort ${publ.style}" >${publ.descri}</div>
               </div>
                <div id="SendMeg" name="${publ.id}" class="ico-meg"></div>
                <div class="ico-comen"></div>
                <div class="${publ.estado}"></div>
                <div id="${publ.visual}" class="${publ.estatus}"></div>
                <div class="FechInrc">${publ.fecha} ${publ.hora}</div></div>`)
    });
                
            }
           })
           .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
       },2000); 
    }
    else if(name != ''){
                
        $.ajax({
           url:'https://didigitales.live/VerPerfil/'+re,
           type:'GET'
        })
       .done(function(data){
             var datas = JSON.parse(data);
             let pub = $('.contenidos');
             var perfil = `<div class="Header-perfils">
              <div class="icono-content">
                  <div class="let-sed">${datas.ini}</div>
              </div>
              <div class="CuadroContent">
                <div class="PubR">${datas.seguidores}</div>
                <div class="SegR">${datas.seguidos}</div>
                <div class="tPub">Seguidores</div>
                <div class="tseg">Seguidos</div>
              </div>
              <div class="ContenidoPerf">
                <div class="NombPer">${datas.nombre} ${datas.apellido}</div>
                <div class="SeudoPer" id="${datas.seudo}">@${datas.seudo}</div>
                <div id="Reputa" class="Ver-rep">Ver reputación</div>
                
              </div>
</div>
<div class="contenidosper">
    <h1 class="sh1">¿Solicitar seguimiento ?</h1>
    <div class="Suser bg-primary" id="EnSolicitud">aceptar</div>           
</div>`;
             
             $('.contenidos').empty();
             if(data == 'Error'){
                
            pub.html();
            pub.append(`<div class="lista-inf">No hay resultados</div>`)
                
            }
             else{ 
            
            pub.html();
            pub.append(perfil)

           }
       })
       .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       }); 
    
    } 
});
$('#MHeader').on('click', '#SearchCombi', function(e){
    
    if(xg == 0){
       $('.txt').text('Grupos');
        $('#MHeader').load('header/searchsin.html');
	    $('.contenidos').load('modulos/grupos.html');
        $('footer').empty(); 
        Group();
       xg=1;
    }
    else{
        
        $('.txt').text('BUSCAR');
        $('#MHeader').load('header/searchsin.html');
	    $('.contenidos').load('inicio/Buscar.html');
        $('footer').empty();
        buscarOn();
        xg = 0; 
    }
});
function Group(){
    $.mobile.loading("show");
    var url = "https://didigitales.live/ListaGroup";
    $.get(url)
    .done(function(data){
        $.mobile.loading("hide");
        Grs = data;
        $('#GruposSearch').empty();
        let grou = $('#GruposSearch');
        if(data == '0'){
            grou.html();
            grou.append(`<div class="lista-inf">No hay resultados</div>`)
        }
        else{
            grou.html();
            Grs.forEach(group => {
                grou.append(`<li class="listgr">
                   <div class="txtgr"> #${group.nombre}</div>
                   <div class="Tipgr">${group.tipo}</div>
                   <div class="Cantintgr">${group.cantidad} integrantes</div>
                </li>`);
            });
        }
    })
    .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
}
$('.contenidos').on('submit','#Searchgroup', function(e){
    e.preventDefault();
    var n = $('#VseudoSearchgroup').val();
    if(n.length > 2){
    $.mobile.loading("show");
    var url = "https://didigitales.live/SearchGroup?name="+n;
    $.get(url)
    .done(function(data){
        $.mobile.loading("hide");
        Grs = data;
        $('#GruposSearch').empty();
        let grou = $('#GruposSearch');
        if(data == '0'){
            grou.html();
            grou.append(`<div class="lista-inf">No hay resultados</div>`)
        }
        else{
            grou.html();
            Grs.forEach(group => {
                grou.append(`<li class="listgr">
                   <div class="txtgr"> #${group.nombre}</div>
                   <div class="Tipgr">${group.tipo}</div>
                   <div class="Cantintgr">${group.cantidad} integrantes</div>
                </li>`);
            });
        }
    })
    .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
    }
    else{
        var valor = '<div class="inestados">minimo 3 caracteres </div>';
           $('status').empty();
           $('status').append(valor);
           var t = setTimeout(function(){
               $('status').empty();
           },5000);
        $('#VseudoSearchgroup').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
       var s = setTimeout(function(){
           $('#VseudoSearchgroup').css('box-shadow', 'none');
        },5000);
        
    }
});
$('.contenidos').on('click', '#OpcionMn', function(e){
    var name = $(this).attr('name');
    var seudo = localStorage.getItem('seudonimo');
    var cod =  $(this).attr('class');
    var visual = $(this).attr('data-visual');
    if(name == seudo){
        $('#OpcionesMen').empty();
        let opc = $('#OpcionesMen');
        opc.html();
        opc.append(`<a id="CerrarSesion" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
            <div id="Dactiva" name="${cod}" class="list-po" data-v="${visual}" data-n="disponible">Activar</div>
            <div id="Dpausa" name="${cod}" class="list-po" data-v="${visual}" data-n="pausado">Pausar</div>
            <div id="Dfina" name="${cod}" class="list-po" data-v="${visual}" data-n="finalizado">Finalizar</div>
            <div id="Reporte" name="${cod}" class="list-po">Reportar</div>
            <div id="Delpubli" name="${cod}" class="list-po">Eliminar</div>`);
        $('#OpcionesMen').show('blind');
    }
    else{
        $('#OpcionesMen').empty();
        let opc = $('#OpcionesMen');
        opc.html();
        opc.append(`<a id="CerrarSesion" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><div id="Reporte" class="list-po">Reportar</div>`);
        $('#OpcionesMen').show('blind');
    }
});
$('#OpcionesMen').on('click', '#CerrarSesion', function(e){
    $('#OpcionesMen').hide('blind');
});
$('#OpcionesMen').on('click', '#Reporte', function(e){
    $('#OpcionesMen').hide('blind');
    var seudo = localStorage.getItem('seudonimo');
    var codigo = $(this).attr('name');
    swal("Decribe el mensaje aqui:", {
        content: "input",
    })
    .then((value) => {
        var cuerpo = String(value);
        if(cuerpo.length > 5 && cuerpo != null ){
        var publica = 'Reporte de publicacion';
        var url = 'https://didigitales.live/AyudaIn?name='+seudo+'&asunto='+publica+'&comentario='+cuerpo;
        $.get(url)
        .done(function(data){
            if(data == 'ok'){
                 swal('Enhorabuena','Reporte enviados. ','success');
            }
        })
        .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
        }
        else if(cuerpo.length < 6 || cuerpo==null ){
            swal('Requiere','minimo 6 caracteres ','error');
        }
            
    });
});
$('#OpcionesMen').on('click', '#Dactiva, #Dpausa, #Dfina', function(e){
    var codigo = $(this).attr('name');
    var acction = $(this).attr('data-n');
    var visual = $(this).attr('data-v');
    
    if(visual == acction ){
       swal('Información','Ya la publicación esta disponible ','info');;
    }
    else if(visual == 'finalizado'){
       swal('Información','ya la publicacion finalizo ','info');;
    }
    else{
        var url = 'https://didigitales.live/EstatusPub/?accion='+acction+'&codigo='+codigo;
        swal({
            title: "Confirmar ?",
            text: "Desea actualizar el estado de su publicacion. !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            closeOnClickOutside: false,
        })
        .then((YES) => {
            if (YES) {
              $.get(url)
              .done(function(data){
                  if(data == 'ok'){
                      swal("Estado actualizado correctamente. !", {
                            icon: "success",
                      });
                  }
                  else{
                      swal(data, {
                            icon: "error",
                      });
                  }
              })
              .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
            } 
        }); 
    }
});
$('#OpcionesMen').on('click', '#Delpubli', function(e){
    var id = $(this).attr('name');
    var url='https://didigitales.live/DelPub/'+id;
     swal({
            title: "Confirmar ?",
            text: "Desea desea eliminar la publicación. !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            closeOnClickOutside: false,
        })
    .then((YES) => {
            if (YES) {
              $.get(url)
              .done(function(data){
                  
                  if(data == 'ok'){
                      swal("Publicacion eliminada. !", {
                            icon: "success",
                      })
                      .then((ok) =>{
                        if(ok){
                          $('#OpcionesMen').hide('blind');
                        }
                      });
                      
                  }else{
                      swal(data, {
                            icon: "warning",
                      });
                  }

              })
              .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
            } 
        });
});
$('.contenidos').on('click', '#OjoPun', function(e){
    e.preventDefault();
    if(ojo == 0){
        $('#Contras').attr('type','text'); 
        $('#Contra2').attr('type','text'); 
        $(this).removeClass('ico-contra');
        $(this).addClass('ico-contras');
        ojo =1;
    }
    else{
        $('#Contras').attr('type','password'); 
        $('#Contra2').attr('type','password'); 
        $(this).removeClass('ico-contras');
        $(this).addClass('ico-contra');
        ojo =0;
    }
} );
$('.contenidos').on('keypress','#Contra2', function(e){
        var c = $('#Contra2').val();
        var exp = "[a-z]"; var num="[0-9]";
        var numpatt = new RegExp(num); var patt = new RegExp(exp);
        var respu = patt.test(c); var numrespu = numpatt.test(c);
        if(c.length == null || c.length < 2 ){
           $('.Cc').removeClass('bg-light');
           $('.Cc').addClass('bg-danger');
           $('.Cc').css('width','10%');
        }
        else if( c.length < 5){
           $('.Cc').removeClass('bg-danger');
           $('.Cc').addClass('bg-warning');
           $('.Cc').css('width','40%');   
        }
        else if(c.length > 6 && respu == true && numrespu == true ){
           $('.Cc').removeClass('bg-warning');
           $('.Cc').removeClass('bg-danger');
           $('.Cc').addClass('bg-success');
           $('.Cc').css('width','100%');  
        }
});
$('.contenidos').on('click', '#OjoP', function(e){
    e.preventDefault();
    if(ojo == 0){
        $('#Contra').attr('type','text');  
        $(this).removeClass('ico-contra');
        $(this).addClass('ico-contras');
        ojo =1;
    }
    else{
        $('#Contra').attr('type','password'); 
        $(this).removeClass('ico-contras');
        $(this).addClass('ico-contra');
        ojo =0;
    }
} );
$('.contenidos').on('click', '#OjoPs', function(e){
    e.preventDefault();
    if(ojo == 0){
        $(this).removeClass('ico-contra');
        $(this).addClass('ico-contras');
        $('#Contrasena').attr('type','text');  
        ojo =1;
    }
    else{
        $(this).removeClass('ico-contras');
        $(this).addClass('ico-contra');
        $('#Contrasena').attr('type','password'); 
        ojo =0;
    }
} );

//Agregado recientemente
$('.contenidos').on('click', '#NuevoGroup', function(e){
    $('#MHeader').load('header/header-conex.html');
    $('.contenidos').load('modulos/newgroup.html');
    $('footer').empty();
});
$('.contenidos').on('submit','#Nuevogrupo', function(e){
    e.preventDefault();
    var name = localStorage.getItem('seudonimo');
    var nomb = $('#Nombgroup').val();
    var tipo = $('#PubSelect').val();
    if(navigator.onLine){
    if(nomb.length > 4){
    var url = 'https://didigitales.live/NuewGroup?namer='+name+'&nombre='+nomb+'&tipo='+tipo;
    $.get(url)
    .done(function(data){
        if(data == 'ok'){
            swal("Grupo creado correctamente", {
                icon: "success",
            });
        }
        else{
            swal(data, { icon: "error", });
        }
    })
    .fail(function(data){
           $.mobile.loading("hide");
           $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
           
       });
    }
    else{
        swal("Minimo 5 caracteres", {
                icon: "warning",
            });        
    }
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
});
$('.contenidos').on('focusout','#Nombgroup', function(e){
    
    var name = $(this).val();
    if(name.length > 5){
      var url ='https://didigitales.live/VerificaGroup?nombre='+name;
      $.get(url)
      .done(function(data){
        if(data == 'ok'){
            $('#Nombgroup').css('box-shadow', '0 0 0 0.2rem rgba(46,204,113, 0.25)');
        }
        else{
            $('#Nombgroup').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
               $('#Nombgroup').css('box-shadow', 'none');
            },5000);
        }
    })
      .fail(function(data){
        $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    });
    }
    else{
       $('#Nombgroup').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
       var s = setTimeout(function(){
            $('#Nombgroup').css('box-shadow', 'none');
        },5000)
    }
    
});
function misGroup(){
        $('.contenidos').empty();
        let ins = $('.contenidos');
        ins.html();
        ins.append(`<div id="ConexInicial"></div>
            <div id="GruposSearch"></div>
            <status></status>`);
        
    if(navigator.onLine){
    var name = localStorage.getItem('seudonimo');
    $.mobile.loading("show");
    var url = "https://didigitales.live/ListGroup?name="+name;
    $.get(url)
    .done(function(data){
        $.mobile.loading("hide");
        Grs = data;
        console.log(data);
        $('#GruposSearch').empty();
        let grou = $('#GruposSearch');
        if(data == '0'){
            grou.html();
            grou.append(`<div class="lista-inf">no hay grupos</div>`)
        }
        else{
            grou.html();
            Grs.forEach(group => {
                grou.append(`<li class="listgr">
                   <div class="txtgr"> #${group.nombre}</div>
                   <div class="Tipgr">${group.tipo}</div>
                   <div class="Cantintgr">${group.cantidad} integrantes</div>
                </li>`);
            });
        } 
    });
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
}
$('.contenidos').on('click', '#MisGroup', function(e){
    misGroup();
});
$('.contenidos').on('click', '.opcseg', function(e){
    e.preventDefault();
    var n = $(this).attr('id');
    $('#MHeader').empty();
    let hea = $('#MHeader');
    hea.html();
    hea.append(`<header data-position="fixed">
                    <div class="txt" name="${n}">${n}</div> 
                    
                    <div id="MailBam"><a id="rights-btn" class="ui-nodisc-icon ui-btn ui-shadow ui-corner-all ui-icon-back ui-btn-icon-notext ui-btn-inline"></a></div>
                    <div id="EnRecomendar"><a id="rights-btn" class="ui-nodisc-icon ui-btn ui-shadow ui-corner-all ui-icon-bullets ui-btn-icon-notext ui-btn-inline"></a></div>

                </header>`);
    $('.txt').html(n);
    $('.contenidos').empty();
    let cont = $('.contenidos');
    cont.html();
    cont.append(`<div id="MensajeConver"></div>`);
    conversacion();
    $('footer').load('pie/footer-inbox.html');

});
function conversacion(){
    if(navigator.onLine){
    var name = localStorage.getItem('seudonimo');
    var seudo = $('.txt').attr('name');
    $.mobile.loading("show");
    var url = 'https://didigitales.live/conversa?seudo='+name+'&name='+seudo;
    $.get(url)
    .done(function(data){
        $.mobile.loading("hide");
        ca = data;
        num = ca.length;
        $('#MensajeConver').empty();
        let men = $('#MensajeConver');
        men.html()
        if(data == 0){
                
            men.append(`<div class="lista-inf">No hay mensajes</div>`)
                
        }
        else{
            var plataforma = device.platform;
            if(plataforma == 'android'){
                if ("Notification" in window) {
                   notification.close();
                }
            }
            localStorage.setItem("Segundo", si);
            VerificarMen();
            ca.forEach(conv =>{
             men.append(`<div class="${conv.estatus}">
                            <div class="textconv">${conv.sms} </div>
                            <i class="fechsms">${conv.fecha} ${conv.hora}</i>
                        </div>`); 
        });
        }
        var t = setTimeout(function(){
            $('html, body').animate({scrollTop:$(document).height()}, 'slow');
            $.get('https://didigitales.live/solverificar?emite='+seudo+'&receptor='+name)
            .done(function(data){
                if(data == 'yes'){
                    var nn = '@'+seudo+' ha solicitado seguirte';
                    swal({
                      title: "Confirma. ",
                      text: nn,
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((confirma) => {
                      if (confirma == true) {
                           $.get('https://didigitales.live/RespuestaSe?emite='+seudo+'&receptor='+name+'&sms=yes')
                          .done(function(data){
                               
                               conversacion();
                           });
                          
                      }
                      else{
                          $.get('https://didigitales.live/RespuestaSe?emite='+seudo+'&receptor='+name+'&sms=no')
                          .done(function(data){
                              
                               conversacion();
                           });
                      }
                    });
                }
            });
            $.get('https://didigitales.live/Reverificar?emite='+seudo+'&receptor='+name)
            .done(function(data){
                if(data == 'yes'){
                    swal("Decriba su recomendación:", {
                        content: "input",
                        closeOnClickOutside: false,
                    })
                    .then((confirma) => {
                      var cuerpo = String(value);
                      if (confirma == true) {
                           $.get('https://didigitales.live/RespuestarR?emite='+seudo+'&receptor='+name+'&sms=yes&cuerpo='+cuerpo)
                          .done(function(data){
                               
                               conversacion();
                           });
                          
                      }
                      else{
                          $.get('https://didigitales.live/RespuestarR?emite='+seudo+'&receptor='+name+'&sms=no&cuerpo='+cuerpo)
                          .done(function(data){
                              
                               conversacion();
                           });
                      }
                    });
                }
            });
        },500);
    });
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
}
$('footer').on('submit', '#RespuestaSend', function(e){
    e.preventDefault();
    if(navigator.onLine){
    var name = localStorage.getItem('seudonimo');
    var seudo = $('.txt').attr('name');
    var sms = $('#Sendtxt').val();
    var url = 'https://didigitales.live/smsresp?name='+name+'&seudo='+seudo+'&sms='+sms;
    if(sms.length > 2){
        $.get(url)
        .done(function(data){
            if(data == 'ok'){
               conversacion();
                document.getElementById("RespuestaSend").reset();
                 localStorage.setItem("Segundo", si);
                 VerificarMen();
            }
            else{
               swal('Mensaje no enviado',{ icon:'warning'});
               $('#Sendtxt').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
       var s = setTimeout(function(){
            $('#Sendtxt').css('box-shadow', 'none');
        },5000)
            }
        });
    }
    else{
        $('#Sendtxt').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
       var s = setTimeout(function(){
            $('#Sendtxt').css('box-shadow', 'none');
        },5000);
    }
    
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
    
});

function VerificarMen(){

    if(navigator.onLine){
        
        var name = localStorage.getItem('seudonimo');
        if(name != ''){
            n = true;
        }
        var Splano = localStorage.getItem('Segundo');
        if(Splano == 'true' && n == true){
                var url = 'https://didigitales.live/NotificameU/'+name;
                $.get(url)
                .done(function(data){
                inic++;
                if(inic == cantn){
                    inic = 0;
                    localStorage.setItem("Segundo", no);
                }
                if(data == 'ok'){
                    var plataforma = device.platform;
                    if(plataforma == 'android'){

                    if ("Notification" in window) {
                        Notification.requestPermission(function (permission) {
                            if (permission === 'granted') {
                                navigator.vibrate(3000);
                                var notification = new Notification("Mensaje", {
                                    tag: 'Tienes mensaje sin leer', 
                                    body: 'Didigitales' 
                                }); 
                                clearInterval(noti);
                                localStorage.setItem("Segundo", no);
                                notification.onshow  = function() { console.log('show'); };
                                notification.onclose = function() { console.log('close'); };
                                notification.onclick = function() { console.log('click'); };
                            }
                        });
                    }

                    }
                    else{
                        console.clear();
                        console.log('notificacion no soportada');
                    }
                }
                else{
                    inic++;
                    if(inic == cantn){
                        inic = 0;
                        clearInterval(noti);     
                    }
                }
            });
            
        }
        else{
            inic++;
            if(inic == cantn){
                inic = 0;
                clearInterval(noti);     
            }
        }
    }
}
$('.contenidos').on('click','#SolictPaq', function(e){
    if(navigator.onLine){
    var name = localStorage.getItem('seudonimo');
    $('.contenidos').empty();
    $('footer').empty();
    var url = 'https://didigitales.live/ComprarPlan?name='+name;
    $.get(url)
    .done(function(data){
        c = data;
        
        let cont = $('.contenidos');
        cont.html();
        cont.append(`<div class="plan-act"><h1 class="plm">Plan actual:</h1><i class="plin" id="${c}">${c}</i></div>`);
        cont.append(`<h1 class="opcsel">Seleccionar opción: </h1>
                 <select id="opcionpl">
                    <option value="0">Seleccionar</option>
                    <option value="Cambiar Plan">Cambiar Plan</option>
                    <option value="Publicación adicional">Publicación adicional</option>
                </select>
                <div id="opcplanes"></div>`);
        var  n = $('#opcsel').val();
        localStorage.setItem("tipocompra", n);
    });
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
});
$('.contenidos').on('click','#ReportP', function(e){
    if(navigator.onLine){
    var name = localStorage.getItem('seudonimo');
    $('.contenidos').empty();
    $('footer').empty();
    var url = 'https://didigitales.live/ComprarPlan?name='+name;
    $.get(url)
    .done(function(data){
        c = data;
        
        let cont = $('.contenidos');
        cont.html();
        cont.append(`<div class="plan-act"><h1 class="plm">Plan actual:</h1><i class="plin" id="${c}">${c}</i></div>`);
        cont.append(`<h1 class="opcsel">Seleccionar opción: </h1>
                 <select id="opcionpl">
                    <option value="0">Seleccionar</option>
                    <option value="Cambiar Plan">Cambiar Plan</option>
                    <option value="Publicación adicional">Publicación adicional</option>
                </select>
                <div id="opcplanes"></div>`);
        var  n = $('#opcsel').val();
        localStorage.setItem("tipocompra", n);
    });
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
});
$('.contenidos').on('change', '#opcionpl', function(e){
    if(navigator.onLine){
    var v = $(this).val();
    var n = $('.plin').attr('id');
    if(v == 'Cambiar Plan'){
        
        localStorage.setItem("cambiodeplan", n);
        
        if(n == 'Inicio'){
             $('#opcplanes').empty();
            let cont = $('#opcplanes');
            cont.html();
            cont.append(`<h1 class="opcsele">Seleccionar plan: </h1> 
                        <select id="opcionins"> 
                            <option value="Seleccionar">Seleccionar</option> 
                            <option value="Popular">Popular</option> 
                            <option value="Profesional">Profesional</option> 
                            <option value="VIP">VIP</option> 
                        </select>`);   
        }
        else if(n == 'Popular'){
             $('#opcplanes').empty();
            let cont = $('#opcplanes');
            cont.html();
            cont.append(`<h1 class="opcsele">Seleccionar plan: </h1> 
                        <select id="opcionins"> 
                            <option value="Seleccionar">Seleccionar</option> 
                            <option value="Inicio">Inicio</option> 
                            <option value="Profesional">Profesional</option> 
                            <option value="VIP">VIP</option> 
                        </select>`);   
        }
        else if(n == 'Profesional'){
             $('#opcplanes').empty();
            let cont = $('#opcplanes');
            cont.html();
            cont.append(`<h1 class="opcsele">Seleccionar plan: </h1> 
                        <select id="opcionins"> 
                            <option value="Seleccionar">Seleccionar</option> 
                            <option value="Inicio">Inicio</option> 
                            <option value="Popular">Popular</option> 
                            <option value="VIP">VIP</option> 
                        </select>`);   
        }
        else if(n == 'VIP'){
             $('#opcplanes').empty();
            let cont = $('#opcplanes');
            cont.html();
            cont.append(`<h1 class="opcsele">Seleccionar plan: </h1> 
                        <select id="opcionins"> 
                            <option value="Seleccionar">Seleccionar</option> 
                            <option value="Inicio">Inicio</option> 
                            <option value="Popular">Popular</option> 
                            <option value="Profesional">Profesional</option> 
                        </select>`);   
        }
        metodo();
    }
    else{
        $('#opcplanes').empty();
            let cont = $('#opcplanes');
            cont.html();
            cont.append(`<h1 class="opcsele">Seleccionar plan: </h1> 
                        <select id="opcionin"> 
                            <option value="1 Publicaciones">1 Publicaciones</option> 
                            <option value="5">5 Publicaciones</option>
                            <option value="10">10 Publicaciones</option>
                            <option value="25">25 Publicaciones</option>
                            <option value="50">50 Publicaciones</option>
                        </select>
                        <p class="opcsele">El costo de la publicacion adicional es: </p><div id="CAdicional"></div>`);
        var  n = $('#opcionin').val();
        localStorage.setItem("CantidadPub", n);
        
        metodos();
        
        var t = setTimeout(function(){ 
            var n = $('#opcionin').val();
            $.get('https://didigitales.live/CostAd?cant='+n)
            .done(function(data){
                c = data;
                $('#CAdicional').empty();
                let cont = $('#CAdicional');
                cont.html();
                cont.append(`<div class="opcsele">${c}</div>`);
            })
            .fail(function(data){
        $('status').empty();
           $('status').append('<div class="inestado">conexion inestable</div>');
           var t = setTimeout(function(){
               $('status').empty();
           },10000);
    });
        }, 1000);
    }
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
});
function metodo(){
    let cont = $('#opcplanes');
    cont.html();
    cont.append(`<h1 class="opcsele">Seleccionar metodos de pago: </h1> 
                <select id="metodocon"> 
                    <option value="Seleccionar">Seleccionar</option> 
                    <option value="Tranferencia">Tranferencia</option> 
                    <option value="Otros">Otros</option> 
                </select>
                <div id="OtroG"></div>`); 
}
function metodos(){
    let cont = $('#opcplanes');
    cont.html();
    cont.append(`<h1 class="opcsele">Seleccionar metodos de pago: </h1> 
                <select id="metodo"> 
                    <option value="Seleccionar">Seleccionar</option> 
                    <option value="Tranferencia">Tranferencia</option> 
                    <option value="Otros">Otros</option> 
                </select>
                <div id="OtroG"></div>`); 
}
$('.contenidos').on('change','#metodo', function(e){
     e.preventDefault();
     var n = $(this).val();
    if(n == 'Otros'){
    $('#OtroG').empty();
    let cont = $('#OtroG');
    cont.html();
    cont.append(`
                <select id="metodotros"> 
                    <option value="Seleccionar">Seleccionar</option> 
                    <option value="giftcardamazon">Gift card amazon</option> 
                    <option value="Uphold">Uphold</option>
                    <option value="pp">Paypal</option>
                </select>
                <div id="ReferenciaG"></div>
                `); 
    }
    else{
    $('#OtroG').empty();
    let cont = $('#OtroG');
    cont.html();
    cont.append(`
                <input type="text" placeholder="Codigo de referencia." id="Referencia" maxlength="20" onkeypress="return referencia(event);" onpaste="return false" />
                <button type="button" id="CompraPlanes" class="btn btn-primary">Aceptar</button>`);    
    }
});
$('.contenidos').on('change','#metodocon', function(e){
     e.preventDefault();
     var n = $(this).val();
    if(n == 'Otros'){
    $('#OtroG').empty();
    let cont = $('#OtroG');
    cont.html();
    cont.append(`
                <select id="metodotros"> 
                    <option value="giftcardamazon">Gift card amazon</option> 
                    <option value="Uphold">Uphold</option>
                    <option value="pp">Paypal</option>
                </select>
                <div id="ReferenciaG"></div>
                `); 
    }
    else{
    $('#OtroG').empty();
    let cont = $('#OtroG');
    cont.html();
    cont.append(`
                <select id="metodotros"> 
                    <option value="Banco activo">Banco activo</option> 
                </select>
                <input type="text" placeholder="Codigo de referencia." id="Referencia" maxlength="10" onkeypress="return referencia(event);" onpaste="return false" />
                <button type="button" id="CompraPlan" class="btn btn-primary">Aceptar</button>`);    
    }
});
$('.contenidos').on('change','#metodotros', function(e){
     e.preventDefault();
     var n = $(this).val();
    if(n == 'giftcardamazon'){
    $('#ReferenciaG').empty();
    let cont = $('#ReferenciaG');
    cont.html();
    cont.append(`
                <input type="text" placeholder="Codigo de amazon." id="Referencia" maxlength="20" onkeypress="return referencia(event);" onpaste="return false" />
                <button type="button" id="CompraPlanes" class="btn btn-primary">Aceptar</button>`); 
    }
    else if(n == 'Uphold'){
    $('#ReferenciaG').empty();
    let cont = $('#ReferenciaG');
    cont.html();
    cont.append(`
                <input type="text" placeholder="Codigo de referencia." id="Referencia" maxlength="20" onkeypress="return referencia(event);" onpaste="return false" />
                <button type="button" id="CompraPlanes" class="btn btn-primary">Aceptar</button>`); 
    }
    else if(n == 'pp'){
    $('#ReferenciaG').empty();
    let cont = $('#ReferenciaG');
    cont.html();
    cont.append(`
                <input type="text" placeholder="Codigo de referencia." id="Referencia" maxlength="20" onkeypress="return referencia(event);" onpaste="return false" />
                <button type="button" id="CompraPlanes" class="btn btn-primary">Aceptar</button>`); 
    }
});
$('.contenidos').on('change', '#opcionin', function(e){
    if(navigator.onLine){
    var v = $(this).val();
    var t = setTimeout(function(){ 
            var n = $('#opcionin').val();
            $.get('https://didigitales.live/CostAd?cant='+n)
            .done(function(data){
                c = data;
                $('#CAdicional').empty();
                let cont = $('#CAdicional');
                cont.html();
                cont.append(`<div class="opcsele">${c}</div>`);
            });
        }, 1000);
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
});
$('.contenidos').on('click', '#CompraPlan', function(e){
    var name = localStorage.getItem('seudonimo');
    var tipo = localStorage.getItem('tipocompra');
    var cambio = localStorage.getItem('cambiodeplan');
    var planes = $('#opcionins').val();
    var metodo = $('#metodocon').val();
    var medio = $('#metodotros').val();
    var refe = $('#Referencia').val();
    var url = 'https://didigitales.live/BalanceAdd?name='+name+'&planes='+planes+'&metodo='+metodo+'&medio='+medio+'&ref='+refe;
    swal({
      title: "Confirma. ",
      text: "Esta seguro de todos los datos ingresado. ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((confirma) => {
      if (confirma) {
          if(planes == 'Seleccionar'){
              if(metodo == 'Seleccionar'){
                  swal("Seleccione plan y metodo de pago. ", {  icon: "error", });
              }
              else{
                  swal("Seleccione plan ", {  icon: "error", });
              }
          }
          else if(metodo == 'Seleccionar'){
               swal("Seleccione un metodo de pago. ", {  icon: "error", }); 
         }
          else{
              if(refe.length < 4){
                  swal("Referencia minimo 4 caracteres. ", {  icon: "error", }); 
              }
              else{
                if(navigator.onLine){  
                $.get(url)
                .done(function(data){
                 if(data == 'ok'){
                    swal("Datos enviado con exito!", {  icon: "success", });
                     
                }
                else{
                    swal(data, {  icon: "warning", });
                }
             });
                }
                else{
                    $('status').empty();
                    $('status').append('<div class="inestado">conexion inestable</div>');
                    var t = setTimeout(function(){
                           $('status').empty();
                    },10000);
                }
              }
         }
      } 
    });
    
});
$('.contenidos').on('click', '#CompraPlanes', function(e){
    var name = localStorage.getItem('seudonimo');
    var tipo = localStorage.getItem('tipocompra');
    var cant = localStorage.getItem('CantidadPub');
    var planes = $('#opcionins').val();
    var metodo = $('#metodo').val();
    var medio = $('#metodotros').val();
    var refe = $('#Referencia').val();
    var url = 'https://didigitales.live/BalanceAdd?name='+name+'&planes='+planes+'&metodo='+metodo+'&medio='+medio+'&ref='+refe;
    swal({
      title: "Confirma. ",
      text: "Esta seguro de todos los datos ingresado. ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((confirma) => {
      if (confirma) {
          if(metodo == 'Seleccionar'){
               swal("Seleccione un metodo de pago. ", {  icon: "error", }); 
         }
          else{
            if(refe.length < 4){
                  swal("Referencia minimo 4 caracteres. ", {  icon: "error", });  
              }
            else{
                if(navigator.onLine){
                $.get(url)
                .done(function(data){
                 if(data == 'ok'){
                    swal("Datos enviado con exito!", {  icon: "success", });
                }
                else{
                    swal(data, {  icon: "warning", });
                }
             });
                }
                else{
                    $('status').empty();
                    $('status').append('<div class="inestado">conexion inestable</div>');
                    var t = setTimeout(function(){
                           $('status').empty();
                    },10000);
                }
              }
         }
      } 
    });
});
$('.contenidos').on('submit', '#NuevoMen', function(e){
   e.preventDefault();
    if(navigator.onLine){
    var name = localStorage.getItem('seudonimo');
    var seudo = $('#Nseudo').val();
    var sms = $('#NuevoText').val();
    var url = 'https://didigitales.live/smsresp?name='+name+'&seudo='+seudo+'&sms='+sms;
    swal({
      title: "Confirma. ",
      text: "Los datos enviado son correctos. ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((confirma) => {
      if (confirma) {
          if(sms.length > 2){
            $.get(url)
            .done(function(data){
            if(data == 'ok'){
                document.getElementById("NuevoMen").reset();
                $('status').empty();
                $('status').append('<div class="inestado">Mensaje enviado</div>');
                var t = setTimeout(function(){
                       $('status').empty();
                },10000);
            }
            else{
               swal(data,{ icon:'warning'});
               $('#NuevoText').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
               var s = setTimeout(function(){
                    $('#NuevoText').css('box-shadow', 'none');
                },5000)
            }
           });
          }
          else{
            $('#Nseudo, #NuevoText').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
           var s = setTimeout(function(){
                $('#Nseudo, #NuevoText').css('box-shadow', 'none');
            },5000);
        }
      } 
    });
    }
    else{
        $('status').empty();
        $('status').append('<div class="inestado">conexion inestable</div>');
        var t = setTimeout(function(){
               $('status').empty();
        },10000);
    }
});
$('#MHeader').on('click', '#NewMen', function(e){
    e.preventDefault();
    $('#MHeader').load('header/header-nuevom.html');
    $('.contenidos').load('modulos/nuevo-men.html');
    $('footer').empty();
});

function seudonimos(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = "abcdefghijkmlnopqrstuvwxyz.-0123456789@";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
}
function referencia(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = "abcdefghijkmlnopqrstuvwxyz0123456789";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
}
function seudonimosfoo(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = "abcdefghijkmlnopqrstuvwxyz.-0123456789@ ";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
}

