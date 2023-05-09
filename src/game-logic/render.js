console.log("render.js started loading");
export default class Render {
    constructor(ctx, canvas, map) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.map = map;
        this.drawMap();
    }

    originCoords() {
        let currentTransform = this.ctx.getTransform();
        return [currentTransform.e, currentTransform.f];
    };
    
    clearMap() {
        let [originCoordX, originCoordY] = this.originCoords();
        this.ctx.clearRect(-originCoordX, -originCoordY, this.canvas.width, this.canvas.height);
    };

    drawBackground(map) {
        const background = new Image();
        background.src = map.background.src;
        background.dataset.posX = map.background.absolutepositionx;
        background.dataset.posY = map.background.absolutepositiony;
        this.background = background;
        this.background.onload = () => {
            this.ctx.drawImage(this.background, this.background.dataset.posX, this.background.dataset.posY);
        };
    };

    getEntityPositionAndDimension(entity) {
        let posX, posY, dimX, dimY;
        return [posX, posY, dimX, dimY] = [
            entity.absolutePosition[0],
            entity.absolutePosition[1],
            entity.dimension[0],
            entity.dimension[1],
        ];
    }

    resetdrawStyle() {
        this.ctx.strokeStyle = "rgb(0, 0, 0)";
        this.ctx.fillStyle = "rgb(0, 0, 0)";
        this.ctx.lineWidth = 1;
        this.ctx.shadowColor = "rgba(0, 0, 0, 0)";
        this.ctx.shadowBlur = 0;
    };
    
    drawClassicStyle(posX, posY, dimX, dimY, entity) {
        this.resetdrawStyle();
        this.ctx.fillStyle = entity.color;
        this.ctx.fillRect(posX, posY, dimX, dimY);
    };

    drawLineStyle(posX, posY, dimX, dimY, entity) {
        this.resetdrawStyle();
        this.ctx.strokeStyle = entity.color;
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.rect(posX, posY, dimX, dimY);
        this.ctx.stroke();
    };

    drawLineBlurShadowStyle(posX, posY, dimX, dimY, entity) {
        this.resetdrawStyle();
        this.ctx.shadowColor = entity.color;
        this.ctx.shadowBlur = 15;
        this.ctx.strokeStyle = entity.color;
        this.ctx.lineWidth = 4.5;
        this.ctx.beginPath();
        this.ctx.rect(posX, posY, dimX, dimY);
        this.ctx.stroke();
    };

    drawCRTLines() {  // draw CRT lines
        console.log("running")
    } 


    drawMap() {
        let map = this.map
        let entityPosAndDim
        this.clearMap();
        // this.drawBackground(map); //Uncomment this line to see a flashing grass png
        for(let entityId in map.entities) {
            const entity = map.entities[entityId];
            entityPosAndDim = this.getEntityPositionAndDimension(entity);
            
            if(entityId === "1") {  // render boundbox (background)
                this.drawClassicStyle(...entityPosAndDim, entity);
            } else if (entityId !== "player" && entityId !== "1" && !entity.enemyType) {  //render background objects
                // this.drawClassicStyle(...entityPosAndDim, entity);
                // this.drawLineStyle(...entityPosAndDim, entity);
                this.drawLineBlurShadowStyle(...entityPosAndDim, entity);
            } else if(entity.enemyType) {   // render enemies;
                this.drawLineBlurShadowStyle(...entityPosAndDim, entity);
                // this.drawLineStyle(...entityPosAndDim, entity);
            };
        }

        let player = map.entities.player
        entityPosAndDim = this.getEntityPositionAndDimension(player);
        this.drawLineBlurShadowStyle(...entityPosAndDim, player); // render player after rendering background/enemies
        // this.drawClassicStyle(...entityPosAndDim, player);
        // this.drawLineStyle(...entityPosAndDim, player);

        this.drawCRTLines()
    };

}
console.log("render.js finished loading");