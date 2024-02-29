const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext("2d");

const img = new Image ();
img.src = "/img/bruxo.jpg";  // Caminho da imagem

let iluninosidadeArray = [];
let particulasArray  = [];

class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;   // Coordenada x
        this.y = 0;
        this.iluninosidade = 0;
        this.velocidade = Math.random() *3 + 0.1;
        this.raios = Math.random() * 1.5 +1;
    }
    update(){
        this.y += this.velocidade;
        if(this.y >= canvas.height){// Se a particula sair da tela, remove-a do array
            this.y = 0;
            this.x = Math.random( )*canvas.width;  // Reinicia as coordenadas para uma nova posição na tela  
            
        }      
        this.iluninosidade = iluninosidadeArray[Math.floor(this.y-1) * canvas.width + Math.floor(this.x)]; // Pega o valor de
    }

    draw () {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.raios, 0, Math.PI*2);
        ctx.fill();
    }

}
img.onload = function (){
    canvas.width = img.width;   // Definindo a largura do canvas como a largura da imagem carregada
    canvas.height = img.height; // Definindo a altura do canvas como a altura da imagem carregada
    ctx.drawImage(img,0,0, canvas.width, canvas.height); // Desenhando a imagem no canvas
    const imgData = ctx.getImageData(0,0, canvas.width,canvas.height) ;// Pegando os dados da imagem para manipulação
    console.log(imgData.data);


    for (let i = 0; i < imgData.data.length; i++) {
        const red = imgData.data[i*4];
        const green = imgData.data[(i*4) +1]; 
        const blue = imgData.data[(i*4) +2]; 
        const iluninosidade = (red + green + blue) / 3;  
        iluninosidadeArray.push(iluninosidade);
    }

    for (let i = 0; i < 10000; i++) {
        particulasArray.push(new  Particula());
        
    }

    const animate = ()  =>{
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Limpa a tela
        particulasArray.forEach((particula)=> {
            particula.update();
            ctx.globalAlpha = particula.iluninosidade * 0.002;
            particula.draw();

        });
        requestAnimationFrame(animate);
    }
    animate();
};