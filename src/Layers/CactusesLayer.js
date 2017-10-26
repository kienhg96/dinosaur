import cc from '../cc';
import { CactusSprite } from '../Sprites';
import { 
	BACKGROUND_SPEED, CACTUS_POOL_LENGTH,
	CACTUS_DISTANCE_MIN, CACTUS_DISTANCE_MAX
} from '../configs/constants';
import _ from 'lodash';

const genereateLong = (level = 1) => Math.round(
	CACTUS_DISTANCE_MIN + (level - 1) * 100
	+ Math.random() * (CACTUS_DISTANCE_MAX - CACTUS_DISTANCE_MIN));

export default cc.Layer.extend({
	cactuses: null,
	cactusIndex: 0,
	long: 0,
	cactusSize: null,
	initPosition: null,
	nearestCactusIndex: 0,
	level: 1,

	ctor: function() {
		this._super();
		this.long = genereateLong(this.level);
		this.render();
		this.initCachingParams();
		this.scheduleUpdate();
	},

	render: function() {
		const { winSize } = cc;
		this.cactuses = _.times(CACTUS_POOL_LENGTH, () => {
			const cactus = new CactusSprite();
			const contentSize = cactus.getContentSize();
			cactus.setPosition(cc.p(
				winSize.width + contentSize.width / 2,
				55 + contentSize.height / 2
			));
			cactus.__r = false; // Running
			this.addChild(cactus);
			return cactus;
		});
		this.cactuses[0].__r = true;
	},

	initCachingParams: function() {
		this.cactusSize = this.cactuses[0].getContentSize();
		this.initPosition = this.cactuses[0].getPosition();
	},

	update: function(dt) {
		const distance = dt * (BACKGROUND_SPEED + (this.level - 1) + 100);
		this.long -= distance;
		if (this.long <= 0) {
			this.long = genereateLong(this.level);
			this.cactusIndex = (this.cactusIndex + 1) % CACTUS_POOL_LENGTH;
			const cactus = this.cactuses[this.cactusIndex];
			cactus.__r = true;
			cactus.setPositionX(this.initPosition.x);
		}
		this.cactuses.forEach(cactus => {
			if (cactus.__r) {
				const newPos = cactus.getPositionX() - distance;
				cactus.setPositionX(newPos);
				if (newPos <= (-this.cactusSize.width / 2)) {
					cactus.__r = false;
				}
			}
		});
	},

	nextNearestCactusIndex: function() {
		this.nearestCactusIndex = (this.nearestCactusIndex + 1) % CACTUS_POOL_LENGTH;
	},

	stop: function() {
		this.unscheduleUpdate();
	},

	reset: function() {
		const { winSize } = cc;
		this.cactuses.map(cactus => {
			const contentSize = cactus.getContentSize();
			cactus.setPosition(cc.p(
				winSize.width + contentSize.width / 2,
				55 + contentSize.height / 2
			));
			cactus.__r = false; // Running
		});
		this.cactuses[0].__r = true;
		this.long = genereateLong(this.level);
		this.cactusIndex = 0;
		this.nearestCactusIndex = 0;
		this.scheduleUpdate();
	},

	nextLevel: function() {
		this.level++;
	}
});
