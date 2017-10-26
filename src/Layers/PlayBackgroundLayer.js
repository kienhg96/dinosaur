import cc from '../cc';
import { res } from '../resource';
import { BACKGROUND_SPEED } from '../configs/constants';

export default cc.Layer.extend({
	bg1: null, // Background 1
	bg2: null, // Background 2
	bgWidth: null,

	ctor: function() {
		this._super();
		this.render();
		this.scheduleUpdate();
	},

	render: function() {
		const { winSize } = cc;
		// Add Background
		this.bg1 = new cc.Sprite(res.PlayBackground);
		this.bg1.setPosition(cc.p(
			winSize.width / 2,
			winSize.height / 2
		));
		this.bgWidth = this.bg1.getContentSize().width;
		this.addChild(this.bg1);
		this.bg2 = new cc.Sprite(res.PlayBackground);
		this.bg2.setPosition(cc.p(
			winSize.width / 2 + this.bgWidth,
			winSize.height / 2
		));
		this.addChild(this.bg2);
	},

	update: function(dt) {
		const distance = dt * BACKGROUND_SPEED;
		const newPosBg1 = this.bg1.getPositionX() - distance;
		const newPosBg2 = this.bg2.getPositionX() - distance;
		this.bg1.setPositionX(newPosBg1);
		this.bg2.setPositionX(newPosBg2);
		if (newPosBg1 <= (-this.bgWidth / 2)) {
			this.bg1.setPositionX(newPosBg2 + this.bgWidth);
		} else if (newPosBg2 <= (-this.bgWidth / 2)) {
			this.bg2.setPositionX(newPosBg1 + this.bgWidth);
		}
	},

	stop: function() {
		this.unscheduleUpdate();
	}
});
