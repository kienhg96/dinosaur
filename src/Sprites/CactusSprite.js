import cc from '../cc';
import { res } from '../resource';

export default cc.Sprite.extend({
    ctor: function () {
        this._super(res.Cactus);
    }
});
