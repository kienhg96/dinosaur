import cc from '../cc';
import { BACKGROUND_SPEED, LEVEL_STEP } from '../configs/constants';

export default cc.Layer.extend({
	score: 0,
	scoreLabel: null,
	onNextLevel: null,
	_lastScore: -1,

	ctor: function(onNextLevel) {
		this._super();
		this.onNextLevel = onNextLevel;
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
		const roundedScore = Math.round(this.score);
		this.scoreLabel.setString(`Score: ${roundedScore}`);
		if (roundedScore !== this._lastScore) {
			this._lastScore = roundedScore;
			if (roundedScore !== 0 && roundedScore % LEVEL_STEP === 0) {
				if (this.onNextLevel) {
					cc.log('Emit next level', roundedScore, LEVEL_STEP);
					this.onNextLevel();
				}
			}
		}
	},

	stop: function() {
		this.unscheduleUpdate();
	},

	reset: function() {
		this.score = 0;
		this._lastScore = -1;
		this.scoreLabel.setString("Score: 0");
		this.scheduleUpdate();
	}
});
