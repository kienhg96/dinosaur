import cc from '../cc';
import { res } from '../resource';

export default cc.Menu.extend({
    ctor: function (onRestartClick) {
        this._super();
        this.onRestartClick = onRestartClick;
        this.render();
    },

    render: function() {
        const menuItemSprites = new cc.MenuItemSprite(
            new cc.Sprite(res.StartButtonN),
            new cc.Sprite(res.StartButtonS),
            this.onClick,
            this
        );
        this.addChild(menuItemSprites);
    },

    onClick: function() {
        if (this.onRestartClick) {
            this.onRestartClick();
        }
    }
});
