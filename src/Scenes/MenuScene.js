import cc from '../cc';
import { MenuLayer, MenuBackgroundLayer } from '../Layers';
import PlayScene from './PlayScene';

export default cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.render();
    },

    render: function() {
    	const backgroundLayer = new MenuBackgroundLayer();
    	this.addChild(backgroundLayer);
    	const menuLayer = new MenuLayer(() => {
        	cc.director.runScene(new PlayScene());
    	});
        this.addChild(menuLayer);
    }
});
