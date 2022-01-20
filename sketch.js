var Jogar=1;
var Fim=0;
var EstadoJogo=Jogar;
var Trex,TrexCorrendo,chao,ImagemChao,TrexMorrendo;
var FimDeJogo,restart,FimDeJogoImage,restartImage;
var nuvens,nuvemImage,GrupoDeNuvens;
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6,GrupoDeCactos;
var pontuacao=0;



function preload(){
TrexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
ImagemChao = loadImage("ground2.png");
nuvemImage = loadImage("cloud.png"); 
cacto1 = loadImage("obstacle1.png"); 
cacto2 = loadImage("obstacle2.png");
cacto3 = loadImage("obstacle3.png");
cacto4 = loadImage("obstacle4.png");
cacto5 = loadImage("obstacle5.png");
cacto6 = loadImage("obstacle6.png");
FimDeJogoImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");
TrexMorrendo = loadAnimation("trex_collided.png");

}  


function setup(){
    createCanvas(600,400);

//Sprite Trex    
Trex = createSprite(50,300,10,10);
Trex.addAnimation("Correndo",TrexCorrendo);
Trex.addAnimation(TrexMorrendo);
Trex.scale=0.5;
Trex.setCollider("circle",0,0,40);
Trex.debug=true;

//Sprite Chao
chao=createSprite(200,380,400,10);    
chao.addAnimation("chao",ImagemChao);
chao.x=chao.width/2; 


//Sprite ChaoInvisible
chao1=createSprite(200,383,400,10);
chao1.visible=false;

//Criar Grupos de Nuvens
GrupoDeNuvens=createGroup();

//Criar Grupos de Cactos
GrupoDeCactos=createGroup();

//Fim de Jogo
FimDeJogo=createSprite(300,200);
FimDeJogo.addImage("Fim De Jogo",FimDeJogoImage );

//Reiniciar o Jogo
restart=createSprite(300,300);
restart.addImage("Resetar o Jogo",restartImage );
restart.scale=0.5;











}


function draw(){
    background(0);
    drawSprites();

    //pontuação
    text("pontuação: "+pontuacao,500,50);
    
    
    if(EstadoJogo === Jogar){
        FimDeJogo.visible=false;
        restart.visible=false;

        pontuacao=pontuacao+Math.round(frameCount/60);

        //movimenta o Chao  
        chao.velocityX=-5;
        
        //faz o Trex Pular
        if(keyDown("space") && Trex.y>350){
            Trex.velocityY=-10;

        }
        //console.log(Trex.y);
        Trex.velocityY=Trex.velocityY+0.5;

        //reseta a pocição do chao
        if(chao.x<0){
            chao.x=chao.width/2;

        }

        CriarNuvem();
        GerarCactos();

        if(Trex.isTouching(GrupoDeCactos)){
            EstadoJogo = Fim;
            
            

        
        }
        
    }

        

    
    else if(EstadoJogo === Fim){

        //Trex Morrendo
        Trex.changeAnimation(TrexMorrendo);

        //Fim do movimento do Chão
        chao.velocityX=0;

        GrupoDeCactos.setVelocityXEach(0);
        GrupoDeNuvens.setVelocityXEach(0);

        
        //Game over e restart
        FimDeJogo.visible=true;
        restart.visible=true;

    

        

    }

    

    

    


    

    //faz o Trex Colidir com o chao      
    Trex.collide(chao1);
    
    

    





}

function GerarCactos(){
if(frameCount % 60 == 0){
var obstaculo=createSprite(600,360,10,40);
obstaculo.velocityX=-6;
//gerar obstaculos aleatórios
var rand=Math.round(random(1,6));
switch(rand){
    case 1:obstaculo.addImage(cacto1);
            break;
    case 2:obstaculo.addImage(cacto2);
            break;
    case 3:obstaculo.addImage(cacto3);
            break;
    case 4:obstaculo.addImage(cacto4);
            break;
    case 5:obstaculo.addImage(cacto5);
            break;
    case 6:obstaculo.addImage(cacto6);
            break;
    default:break;        
}
//dimenção e tempo de vida dos cactos
obstaculo.lifetime=100;
obstaculo.scale=0.6;

//adcionar todos os cactos ao grupo
GrupoDeCactos.add(obstaculo);

} 



}


function CriarNuvem(){


//código para gerar nuvens
if(frameCount % 60 == 0){
    nuvens=createSprite(600,100,40,10);
    nuvens.y=Math.round(random(100,200));
    nuvens.velocityX=-4;
    nuvens.addImage("imagem da nuvem",nuvemImage);
    nuvens.scale=0.6;

    //atribui tempo de vida a variavel nuvens
    nuvens.lifetime=150;


    //ajusta a profundidade
    nuvens.depth=Trex.depth;
    Trex.depth=Trex.depth+1;

    //adicionar cada nuvem ao grupo
    GrupoDeNuvens.add(nuvens);




}











}




