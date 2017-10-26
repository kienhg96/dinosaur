import cc from '../cc';
import { BACKGROUND_SPEED } from '../configs/constants';

export default cc.Layer.extend({
	score: 0,
	scoreLabel: null,

	ctor: function() {
		this._super();
		this.render();
		this.scheduleUpdate();
	},

	render: function() {
		this.scoreLabel = new cc.LabelTTF("Score: 100", "Helvetica", 20);
		const { winSize } = cc;
		this.scoreLabel.setPosition(cc.p(winSize.width - 100, winSize.height - 20));
		this.addChild(this.scoreLabel);
	},

	update: function(dt) {
		this.score += dt * BACKGROUND_SPEED / 100;
		this.scoreLabel.setString(`Score: ${Math.round(this.score)}`);
	},

	stop: function() {
		this.unscheduleUpdate();
	}
});
