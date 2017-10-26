import cc from '../cc';
import { res } from '../resource';

export default cc.Menu.extend({
    ctor: function (onPlayClick) {
        this._super();
        this.onPlayClick = onPlayClick;
        this.render();
    },

    render: function() {
        const menuItemSprites = new cc.MenuItemSprite(
            new cc.Sprite(res.StartButtonN),
            new cc.Sprite(res.StartButtonS),
            this.onPlay,
            this
        );
        this.addChild(menuItemSprites);
    },

    onPlay: function() {
        if (this.onPlayClick) {
            this.onPlayClick();
        }
    }
});
