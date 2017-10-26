import cc from '../cc';
import {
    PlayBackgroundLayer, DinosaurLayer,
    CactusesLayer, StatusLayer,
    GameOverLayer
} from '../Layers';
import { COLLISION_OFFSET } from '../configs/constants';

export default cc.Scene.extend({
    backgroundLayer: null,
    dinosaurLayer: null,
    cactusesLayer: null,
    gameOverLayer: null,
    // Cache
    dxLimit: 0,
    dyLimit: 0,

    onEnter: function () {
        this._super();
        this.render();
        this.initCachingParams();
        this.scheduleUpdate();
    },

    render: function() {
        this.background = new PlayBackgroundLayer();
        this.dinosaurLayer = new DinosaurLayer();
        this.cactusesLayer = new CactusesLayer();
        this.statusLayer = new StatusLayer();
        this.addChild(this.background);
        this.addChild(this.dinosaurLayer);
        this.addChild(this.cactusesLayer);
        this.addChild(this.statusLayer);
    },

    initCachingParams: function() {
        const { dinosaur } = this.dinosaurLayer;
        const dinosaurSize = dinosaur.getContentSize();
        const cactusSize = this.cactusesLayer.cactuses[0].getContentSize();
        cc.log('Dinosaur size', dinosaurSize);
        cc.log('Cactus size', cactusSize);
        this.dxLimit = (dinosaurSize.width + cactusSize.width) / 2 - COLLISION_OFFSET;
        this.dyLimit = (dinosaurSize.height + cactusSize.height) / 2 - COLLISION_OFFSET;
        cc.log('dxLimit', this.dxLimit);
        cc.log('dyLimit', this.dyLimit);
    },

    update: function() {
        const cactus = this.cactusesLayer.cactuses[this.cactusesLayer.nearestCactusIndex];
        const { dinosaur } = this.dinosaurLayer;
        const cactusPosition = cactus.getPosition();
        const dinosaurPosition = dinosaur.getPosition();
        const dx = Math.abs(cactusPosition.x - dinosaurPosition.x);
        const dy = Math.abs(cactusPosition.y - dinosaurPosition.y);
        if (dx < this.dxLimit && dy < this.dyLimit) {
            return this.gameOver();
        }
        if (cactusPosition.x < dinosaurPosition.x) {
            this.cactusesLayer.nextNearestCactusIndex();
        }
    },

    gameOver: function() {
        cc.log('Game over');
        this.cactusesLayer.stop();
        this.background.stop();
        this.dinosaurLayer.stop();
        this.statusLayer.stop();
        this.unscheduleUpdate();
        if (!this.gameOverLayer) {
            this.gameOverLayer = new GameOverLayer(this.restart.bind(this));
        }
        this.addChild(this.gameOverLayer);
    },

    restart: function() {
        cc.log('Restart game');
        this.removeChild(this.gameOverLayer);
        this.cactusesLayer.reset();
        this.background.reset();
        this.dinosaurLayer.reset();
        this.statusLayer.reset();
        this.scheduleUpdate();
    }
});
