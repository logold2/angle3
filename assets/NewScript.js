
cc.Class({
    extends: cc.Component,

    properties: {
        unit: cc.Node,
    },

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchEvent,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchEvent,this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEvent,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEvent,this);

        this.rotateSpeed=0;
        this.minDisAngle=5;//最小3度
    },
    touchEvent(event) {
        switch(event.type)
        {
            case 'touchstart':
                break;
            case 'touchmove':
                let location = this.node.convertToNodeSpaceAR(event.getLocation());
                this.rotation = this.getAngle(location,this.unit.position);
                //1秒100度
                this.rotateSpeed=100;
                break;
            case 'touchend':
            case 'touchcancel':
                this.rotateSpeed=0;
                break;
        }
    },
    update(dt){
        if(this.rotateSpeed!=0){
            //旋转方向
            let direction=1;
            let disAngle=(this.rotation-this.unit.angle)%360;
            if(Math.abs(disAngle)<this.minDisAngle){
                this.unit.angle=this.rotation;
                this.rotateSpeed=0;
                return;
            }else{
                //走最短的方向
                direction=Math.abs(disAngle)<180?disAngle/Math.abs(disAngle):-disAngle/Math.abs(disAngle);
            }
            this.unit.angle+=direction*this.rotateSpeed*dt;
        }
WWW
    },
    //计算角度ee 车上下
    getAngle: function(pos,point)//pos是目标方向
    {
        return  Math.atan2(pos.y-point.y, pos.x-point.x) * (180/Math.PI);
    },
});
