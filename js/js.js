// Inicio start()
function start() { 

    $("#inicio").hide();

//================ CRIA AS DIV'S DO JOGO ================    

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2' ></div>");
    $("#fundoGame").append("<div id='inimigo3' ></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");


//================ VARIÁVEIS ================
    var jogo = {}
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;
    var fimdejogo = false;
    var podeAtirar = true;
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 313);
    var posicaoY4 = parseInt(Math.random() * 422);

    var posicaoY50 = parseInt(Math.random() * 290);    
    
    var TECLA = {
        W: 38,
        S: 40,
        D: 68,
        F: 70,
    }
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");
    
    jogo.pressionou = [];

//================ MUSICA ================
    musica.addEventListener("ended", function () { musica.currentTime = 0; musica.play(); }, false);
    musica.play();

//================ TECLA PRESSIONADA ================    
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });
        
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });

//================ LOOP ================
    jogo.timer = setInterval(loop, 20);
    
    function loop() {
    
        movefundo();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveinimigo3();
        moveamigo();
        colisao();
        placar();
        energia();
    }

//================ PLACAR ================
    function placar() {
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
    } 
//================ FIM ================

//================ MOVE FUNDO ================
    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 3);
    }

//================ MOVE O JOGADOR ================
    function movejogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);
            if (topo <= 0) {
    
                $("#jogador").css("top", topo + 10);
            }
        }
        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);
            if (topo >= 434) {
                $("#jogador").css("top", topo - 10);
            }
        }

//================ CHAMA FUNÇÃO DISPARO ================    
        if (jogo.pressionou[TECLA.D]) {
            disparo();
        }
    }

//================ HELICÓPTERO AMARELO ================
    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 313);
            $("#inimigo1").css("left", 950);
            $("#inimigo1").css("top", posicaoY);
        }
    }
//================ HELICÓPTERO VERDE ================
    function moveinimigo3() {
        posicaoX = parseInt($("#inimigo3").css("left"));
        $("#inimigo3").css("left", posicaoX - velocidade);
        $("#inimigo3").css("top", posicaoY4);

        if (posicaoX <= 1) {
            posicaoY4 = parseInt(Math.random() * 380);
            $("#inimigo3").css("left", 1050);
            $("#inimigo3").css("top", posicaoY4);
        }
    }

//================ TANQUE ================
    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 4);

        if (posicaoX <= 1) {
            $("#inimigo2").css("left", 1050);
        }
    }

//================ MOVE PERSONAGEM ================
    function moveamigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 1206) {
            $("#amigo").css("left", 0);
        }
    }

//================ DISPARO ================
    function disparo() {
        if (podeAtirar == true) {
            somDisparo.play();
            podeAtirar = false;
            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 39;
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 10);

        }
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 50);

            if (posicaoX > 1150) {

                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        }
    }

//================ COLISÂO ================
    function colisao(){
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));

        var colisao5 = ($("#jogador").collision($("#inimigo2")));
        var colisao6 = ($("#disparo").collision($("#inimigo2")));

        var colisao2 = ($("#jogador").collision($("#inimigo3")));
        var colisao4 = ($("#disparo").collision($("#inimigo3")));

        var colisao7 = ($("#jogador").collision($("#amigo")));
        var colisao8 = ($("#inimigo2").collision($("#amigo")));


        if (colisao1.length > 0) {
            energiaAtual--;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 313);
            $("#inimigo1").css("left", 950);
            $("#inimigo1").css("top", posicaoY);
        }
        if (colisao3.length > 0) {
            velocidade = velocidade + 0.1;
            pontos = pontos + 100;

            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 313);
            $("#inimigo1").css("left", 950);
            $("#inimigo1").css("top", posicaoY);

        }
        if (colisao2.length > 0) {
            energiaAtual--;
            inimigo3X = parseInt($("#inimigo3").css("left"));
            inimigo3Y = parseInt($("#inimigo3").css("top"));
            explosao1(inimigo3X, inimigo3Y);

            posicaoY4 = parseInt(Math.random() * 313);
            $("#inimigo3").css("left", 950);
            $("#inimigo3").css("top", posicaoY4);
        }
        if (colisao4.length > 0) {
            velocidade = velocidade + 0.1;
            pontos = pontos + 100;

            inimigo3X = parseInt($("#inimigo3").css("left"));
            inimigo3Y = parseInt($("#inimigo3").css("top"));

            explosao1(inimigo3X, inimigo3Y);
            $("#disparo").css("left", 950);

            posicaoY4 = parseInt(Math.random() * 313);
            $("#inimigo3").css("left", 950);
            $("#inimigo3").css("top", posicaoY4);
        }
        if (colisao5.length > 0) {
            energiaAtual--;

            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();

            reposicionaInimigo2();
        }
        if (colisao6.length > 0) {
            pontos = pontos + 50;

            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);

            reposicionaInimigo2();

        }
        // jogador com o amigo
        if (colisao7.length > 0) {
            somResgate.play();
            salvos++;

            reposicionaAmigo();
            $("#amigo").remove();
        }
        //Inimigo2 com o amigo
        if (colisao8.length > 0) {
            perdidos++;
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX, amigoY);
            $("#amigo").remove();

            reposicionaAmigo();
        }	
    }

//================ MORTE PERSONAGEM ================ 
    function explosao3(amigoX, amigoY) {
        somPerdido.play();

        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);
        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;
        }
    }

//================ HELICÓPTERO AMARELO ================ 
    function explosao1(inimigo1X, inimigo1Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }
    
//================ HELICÓPTERO VERDE ================
    function explosao1(inimigo3X, inimigo3Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo3Y);
        div.css("left", inimigo3X);
        div.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }

//================ TANQUE ================
    function explosao2(inimigo2X, inimigo2Y) {
        somExplosao.play();

        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {

            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    }
    
//================ REPOSICIONAMENTO PRESONAGEM ================
    function reposicionaAmigo() {
        var tempoAmigo = window.setInterval(reposiciona6, 3000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        }
    }
  
//================ REPOSICIONAMENTO INIMIGO 2 CAMINHÃO ================
    function reposicionaInimigo2() {
        var tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id=inimigo2></div");
            }
        }
    }

   
//================ ENERGIA ================
    function energia() {
        if (energiaAtual == 3) {
            $("#energia").css("background-image", "url(imgs/energia3.png)");
            
        }
        if (energiaAtual == 2) {
            $("#energia").css("background-image", "url(imgs/energia2.png)");
        }
        if (energiaAtual == 1) {
            $("#energia").css("background-image", "url(imgs/energia1.png)");
                
        }
        
        if (energiaAtual == 0) {
            $("#energia").css("background-image", "url(imgs/energia0.png)");
            //Game Over
            gameOver();
        }
    }
    moveinimigo50()
//================ GAME OVER ================
    function gameOver() {
        fimdejogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#inimigo3").remove();
        $("#inimigo50").remove();
        $("#amigo").remove();
        $("#fundoGame").append("<div id='fim'></div>");
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
    }
}

//================ RENICIA O JOGO ================
function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();
    start();

} 





