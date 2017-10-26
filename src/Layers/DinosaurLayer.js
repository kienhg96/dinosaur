import cc from '../cc';
import { DinosaurSprite } from '../Sprites';
import { DINOSAUR_JUMP_TIME } from '../configs/constants';

export default cc.Layer.extend({
	dinosaur: null,
	jumpLock: false,
	touchListener: null,

	ctor: function() {
		this._super();
		this.render();
		this.initEvent();
	},

	render: function() {
		this.dinosaur = new DinosaurSprite();
		const dinoSize = this.dinosaur.getContentSize();
		this.dinosaur.setPosition(cc.p(
			120 + dinoSize.width / 2,
			55 + dinoSize.height / 2
		));
		this.addChild(this.dinosaur);
	},

	jump: function() {
		if (!this.jumpLock) {
			this.jumpLock = true;
			const jumpAction = new cc.jumpBy(DINOSAUR_JUMP_TIME, cc.p(0, 0), 150, 1);
			const rotateAction = new cc.RotateBy(DINOSAUR_JUMP_TIME, 360);
			const combineAction = new cc.Spawn();
			combineAction.initWithTwoActions(jumpAction, rotateAction);
			this.dinosaur.runAction(cc.sequence(combineAction, 
					cc.callFunc(() => this.jumpLock = false, this)));
		}
	},

	initEvent: function() {
		this.touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.jump.bind(this)
		});
		cc.eventManager.addListener(this.touchListener, this);
	},

	stop: function() {
		cc.eventManager.removeListener(this.touchListener);
	},

	reset: function() {
		// this.touchListener = cc.EventListener.create({
		// 	event: cc.EventListener.TOUCH_ONE_BY_ONE,
		// 	swallowTouches: true,
		// 	onTouchBegan: this.jump.bind(this)
		// });
		cc.eventManager.addListener(this.touchListener, this);
	}
});
