
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    pic: cc.Sprite = null;

    @property(cc.Label)
    nubLab: cc.Label = null;

    private bagainAngle = 50;
    private isStop: boolean = false;
    private isRightPos: boolean = false;

    private endTime: number = 0;
    private endAngle: number = 0;
    onLoad() {

        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    start() {

    }
    touchStart(event: cc.Event.EventTouch) {
        this.pic.node.angle = 0;

    }
    touchMove(event: cc.Event.EventMouse) {

        let touchDis = event.getDeltaX();
        this.pic.node.angle += this.bagainAngle * touchDis / 100;

    }
    touchEnd() {
        this.isStop = true;
        this.isRightPos = false;
        this.endAngle = this.pic.node.angle;
        this.endTime = 0;
    }

    update(dt) {

        if (this.isStop) {
            //加速 0.5秒
            this.endTime += dt;
            if (this.endTime < 0.5) {
                if (this.endAngle > 0) {
                    this.pic.node.angle += 5;
                }
                if (this.endAngle < 0) {
                    this.pic.node.angle -= 5;
                }
                this.nubLab.string = Math.floor(Math.abs(this.pic.node.angle)).toString();
                return
            }

            //右滑
            if (this.pic.node.angle > 0 && !this.isRightPos) {
                let _temp = 360 - Math.floor(this.pic.node.angle) % 360;
                this.nubLab.string = Math.floor(Math.abs(_temp)) < 3 ? 0 + "" : Math.floor(Math.abs(_temp)/10).toString();
                if (_temp >= 3) {
                    this.pic.node.angle += _temp / 100;

                } else {
                    this.isRightPos = true;
                    this.pic.node.angle = -_temp;
                }

            }
            //左滑
            if (this.pic.node.angle < 0 && !this.isRightPos) {

                let _temp = 360 - Math.abs(Math.floor(this.pic.node.angle) % 360);
                this.nubLab.string = Math.floor(Math.abs(_temp)) < 3 ? 0 + "" : Math.floor(Math.abs(_temp) / 10).toString()
                if (_temp >= 3) {
                    this.pic.node.angle -= _temp / 100;

                } else {
                    this.isRightPos = true;
                    this.pic.node.angle = _temp;
                }
            }
        } else {
            this.nubLab.string = Math.floor(Math.abs(this.pic.node.angle)).toString()
        }
    }
}
