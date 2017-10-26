import cc from '../cc';
import { res } from '../resource';

export default cc.Layer.extend({
	ctor: function() {
		this._super();
		this.render();
	},

	render: function() {
		const { winSize } = cc;
        const center = cc.p(winSize.width / 2, winSize.height / 2);
        // Add Background
        const background = new cc.Sprite(res.MenuBackground);
        background.setPosition(center);
        this.addChild(background);
	}
});
