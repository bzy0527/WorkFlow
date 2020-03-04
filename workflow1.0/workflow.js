
var Obj = new Object();

//工作流 管理整个工作流程
Obj.WorkFlow = function () {
    var wf = new Object();



    return wf;
}

//工作流节点池
Obj.WorkFlowPool = function () {
    var wfp = new Object();
    wfp.VisualElement = document.createElement("div");
    wfp.VisualElement.className = "WorkFlowPool";
    //节点池当前被选中的活动节点
    wfp.ActiveNode = null;
    //节点池当前被选中的活动锚点
    wfp.ActiveAnchor = null;

    //记录起始、终止节点  节点池里只可以存在一个开始和终止节点；
    wfp.StartNode = null;
    wfp.HasStartNode = false;
    wfp.EndNode = null;
    wfp.HasEndNode = false;

    //连接线的起始锚点
    wfp.StartAnchor = null;
    //连接线的终止锚点
    wfp.EndAnchor = null;


    //移动节点池内元素 绘制连接线等和移动的节点相关对象
    wfp.VisualElement.onmousemove = function(evt){

        var node = wfp.ActiveNode;
        var anchor = wfp.ActiveAnchor;
        //如果有锚点需要绘制连接线 则移动鼠标时动态绘制临时连接线
        if (anchor != null) {
            console.log("移动锚点");

            var tempAnchor = anchor.VisualElement.cloneNode(false);
            wfp.VisualElement.appendChild(tempAnchor);


            var e = evt || window.event;
            var x = e.pageX ;
            var y = e.pageY;
            tempAnchor.style.position = "absolute";
            tempAnchor.style.x = x + "px";
            tempAnchor.style.y = y + "px";

        }


        //如果有被移动的节点 则执行节点的移动
        if (node != null) {
            var ofX = node.StartOffX;
            var ofY = node.StartOffY;

            var e = evt || window.event;
            var x = e.pageX - ofX;
            var y = e.pageY - ofY;
            if(x<0){
                x = 0;
            }
            var maxX = wfp.VisualElement.getBoundingClientRect().width - node.VisualElement.offsetWidth;
            if(x>maxX){
                x = maxX;
            }
            if(y<0){
                y = 0;
            }
            var maxY = wfp.VisualElement.getBoundingClientRect().height - node.VisualElement.offsetHeight;
            if(y>maxY){
                y = maxY;
            }

            node.RefreshStyle({
                "position":"absolute",
                "left":x + "px",
                "top":y + "px"
            });

            //调用节点的绘制方法OnDraw()
            node.OnDraw();
        }

    }

    //鼠标抬起
    wfp.VisualElement.onmouseup = function(){
        // wfp.VisualElement.onmousemove = "";
        wfp.ActiveNode = null;
    }

    //鼠标离开
    wfp.VisualElement.onmouseleave = function (ev) {
        wfp.ActiveNode = null;
    }

    //TODO:添加节点
    wfp.AddNode = function (node) {
        if (node.NodeType === "StartNode"){
            wfp.StartNode = (wfp.StartNode == null) ? node : wfp.StartNode;
            if(wfp.HasStartNode) {console.log("已经存在了开始节点！"); return};
            wfp.HasStartNode = (wfp.StartNode === null) ? false : true;
        }
        if (node.NodeType === "EndNode"){
            wfp.EndNode = (wfp.EndNode == null) ? node : wfp.EndNode;
            if(wfp.HasEndNode) {console.log("已经存在了终止节点！"); return};
            wfp.HasEndNode = (wfp.EndNode === null) ? false : true;
        }

        wfp.VisualElement.appendChild(node.VisualElement);

        //节点被添加到节点池
        node.OnAddedToPool && node.OnAddedToPool(wfp);

        node.Pool = wfp;
    }

    //移除节点
    wfp.RemoveNode = function (node) {
        wfp.VisualElement.removeChild(node.VisualElement);
    }
    return wfp;
}

//节点基类
Obj.NodeObj = function (nT) {
    var no = new Object();
    no.VisualElement = document.createElement("div");
    var ns = nT ? nT : "RootNode";
    //节点类型
    no.NodeType = ns;
    no.VisualElement.className = "DBNode "+ns;

    //节点名称
    no.NodeName = "";
    //节点显示文本
    no.nodeText = "";
    Object.defineProperty(no,"NodeText",{
        get:function () { return no.nodeText },
        set:function (v) { no.nodeText = v;no.TextSpan.textContent = v; }
    });

    //节点显示图片
    no.imgUrl  = "https://wfs.dbazure.cn/root//AppData/099d198de8884add9953aef6b99daa1d/Default/bddcbff6b9304c28b817f028ac51959b.png";
    Object.defineProperty(no,"ImgUrl",{
        get:function () { return no.imgUrl },
        set:function (v) { no.imgUrl = v;no.Image.src = v; }
    });

    //节点执行状态 default-默认状态 什么也没做；processing-正在处理；done-执行完毕
    //TODO:不同的阶段显示的样式不同
    no.processState = "default";
    Object.defineProperty(no,"ProcessState",{
        get:function () { return no.processState },
        set:function (v) {
            no.processState = v;
            //设置显示样式
            no.SetAttr("ProcessState",no.processState);
        }
    });

    //设置属性
    no.SetAttr = function(attr,val){
        no.VisualElement.setAttribute(attr,val);
    }

    //上一级节点对象
    no.PreviousNode = null;
    //下一级节点对象
    no.NextNode = null;

    //执行标志
    no.ExcuteFlag = "";

    //节点当前的位置信息
    no.CurrentTop = null;
    no.CurrentLeft = null;

    //节点池对象
    no.Pool = null;

    //节点初始的偏移位置
    no.StartOffX = null;
    no.StartOffY = null;

    //节点上锚点集合
    no.Anchors = [];

    //对象创建时处理函数
    no.OnCreateHandle = function(){

        no.VisualElement.innerHTML = "<div class='anchor_container'></div><div class='info_container'><img draggable=\"false\" src=''></div><span class='info_text'>显示标题</span>";
        no.AnchorContainer = no.VisualElement.querySelector("div.anchor_container");
        no.InFoContainer = no.VisualElement.querySelector("div.info_container");
        no.TextSpan = no.VisualElement.querySelector("span.info_text");
        no.TextSpan.onmousedown = function(ev){ ev.cancelBubble = true;ev.stopPropagation();return true;};

        no.Image = no.InFoContainer.querySelector("img");
        no.Image.src = no.imgUrl;
        //绑定事件
        no.InFoContainer.onmousedown = no.MouseDownEvent;
        no.VisualElement.oncontextmenu = no.ContextMenu;
        //添加锚点
        no.AddAnchors();

    }

    //鼠标点击事件处理
    no.MouseDownEvent = function(ev){
        if(no.Pool != null){
            no.Pool.ActiveNode = no;
        }

        console.log("onmousedown");
        var e = ev || event;
        no.StartOffX = e.offsetX;
        no.StartOffY = e.offsetY;
    }

    //TODO:鼠标右键点击，弹出自定义菜单
    no.ContextMenu = function(ev){

        var e = ev || window.event;
        e.preventDefault(); //阻止系统右键菜单 IE8-不支持
        // 显示自定义的菜单调整位置
        var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;// 获取垂直滚动条位置
        var scrollLeft =
            document.documentElement.scrollLeft || document.body.scrollLeft;// 获取水平滚动条位置
        // menu.style.display = 'block';
        // menu.style.left = e.clientX + scrollLeft + 'px';
        // menu.style.top = e.clientY + scrollTop + 'px';

    }


    //添加锚点
    no.AddAnchors = function(){
        no.Anchors = [];
        //添加连线锚点
        for (var i=0;i<4;i++){  //上、右、下、左
            var nodeAnchor = new Obj.NodeAnchor();
            nodeAnchor.BelongToNode = no;
            nodeAnchor.VisualElement.classList.add("anchor_"+i);
            nodeAnchor.VisualElement.setAttribute("position",""+i);
            no.Anchors.push(nodeAnchor);
            no.AnchorContainer.appendChild(nodeAnchor.VisualElement);
        }
    }

    //TODO:更新节点样式
    no.RefreshStyle = function (sty) {
        Object.getOwnPropertyNames(sty).forEach(function (key) {
            no.VisualElement.style[key] = sty[key];
        });

        //更新样式的时候 记录下节点当前的位置信息
        no.CurrentLeft = parseFloat(no.VisualElement.style.left);
        no.CurrentTop = parseFloat(no.VisualElement.style.top);

    }



    //计算节点的样式信息
    no.CalculateStyle = function(){
        var cssObj = window.getComputedStyle(no.VisualElement,null);
        var w = parseFloat(cssObj.width);
        var h = parseFloat(cssObj.height);
        var p = parseFloat(cssObj.padding);
        var b = parseFloat(cssObj.borderWidth);


        //获取各个方向的padding值
        var p_l = parseFloat(cssObj.paddingLeft);
        var p_t = parseFloat(cssObj.paddingTop);
        var p_r = parseFloat(cssObj.paddingRight);
        var p_b = parseFloat(cssObj.paddingBottom);

        ////获取各个方向的borderWidth值
        var b_l = parseFloat(cssObj.borderLeftWidth);
        var b_t = parseFloat(cssObj.borderTopWidth);
        var b_r = parseFloat(cssObj.borderRightWidth);
        var b_b = parseFloat(cssObj.borderBottomWidth);

        return {width:w,height:h,paddingLeft:p_l,paddingTop:p_t,paddingRight:p_r,paddingBottom:p_b,
                calcWidth:Math.round(w+p_r+p_l+b_l+b_r),
                calcHeight:Math.round(h+p_t+p_b+b_t+b_b)};
    }

    //计算节点的位置信息
    no.CalculatePosition = function(){
        return {top:no.CurrentTop,left:no.CurrentLeft}
    }

    //节点的绘制方法 需要节点被添加到节点池后才能计算位置信息 在节点被拖动时 重新绘制各锚点和与锚点的连线
    no.OnDraw = function(){
        //节点的上和左
        var node_l = no.CurrentLeft;
        var node_t = no.CurrentTop;

        //锚点的上和左
        var anchor_l = 0;
        var anchor_t = 0;

        //获取节点的尺寸信息 布局节点
        var calcSty = no.CalculateStyle();

        //TODO:锚点的半径 暂时固定 应该需要计算获取

        no.Anchors.forEach(function (anchor) {
            var a_r = anchor.CircleRadius;
            //为锚点赋值节点池对象
            anchor.Pool = no.Pool;
            var anc = anchor.VisualElement;
            var po = anc.getAttribute("position");

            switch (po) {
                case "0"://上
                    anchor_l = calcSty.width*0.5-a_r;
                    anchor_t = -(calcSty.paddingTop+a_r);
                    //设置锚点在节点的位置
                    anchor.LayoutAtNode = "top";
                    anchor.StartX = node_l+ calcSty.calcWidth*0.5;
                    anchor.StartY = node_t-a_r;
                    break;
                case "1"://右
                    anchor_l = calcSty.width+calcSty.paddingRight-a_r;
                    anchor_t = calcSty.height*0.5-a_r;
                    anchor.LayoutAtNode = "right";
                    anchor.StartX = node_l+ calcSty.calcWidth+a_r;
                    anchor.StartY = node_t+calcSty.calcHeight*0.5;
                    break;
                case "2"://下
                    anchor_l = calcSty.width*0.5-a_r;
                    anchor_t = calcSty.height+calcSty.paddingBottom-a_r;
                    anchor.LayoutAtNode = "bottom";
                    anchor.StartX = node_l+ calcSty.calcWidth*0.5;
                    anchor.StartY = node_t+calcSty.calcHeight+a_r;
                    break;
                case "3"://左
                    anchor_l = -(calcSty.paddingTop+a_r);
                    anchor_t = calcSty.height*0.5-a_r;
                    anchor.LayoutAtNode = "left";
                    anchor.StartX = node_l-a_r;
                    anchor.StartY = node_t+calcSty.calcHeight*0.5;
                    break;
                default:
                    break;
            }

            //设置锚点的位置
            anc.style.left = anchor_l+"px";
            anc.style.top = anchor_t+"px";

            //锚点的绘制方法
            anchor.OnDraw();
        })
    };

    //节点被添加到节点池触发的事件  为了用于计算node的实际尺寸信息
    no.OnAddedToPool = function (pool) {
        no.OnDraw();
    }
    return no;
}

//开始节点
Obj.StartNode = function () {
    var sn = new Obj.NodeObj("StartNode");
    sn.OnCreateHandle();
    sn.NodeText = "开始";

    sn.ProcessState = "done";

    return sn;
}

//审核节点-常用的审批节点
Obj.ApprovalNode = function(){
    var apN = new Obj.NodeObj("ApprovalNode");
    apN.OnCreateHandle();
    apN.NodeText = "审核";
    apN.ProcessState = "processing";

    return apN;
}

//条件节点-流程分支
Obj.ConditionNode = function(){
    var conditionN = new Obj.NodeObj("ConditionNode");
    conditionN.OnCreateHandle();
    conditionN.NodeText = "条件";


    return conditionN;

}

//分流-开启并行处理
Obj.ParallelNode = function(){
    var pN = new Obj.NodeObj("ParallelNode");
    pN.OnCreateHandle();
    pN.NodeText = "分流";


    return pN;
}

//合流-并行处理汇合点
Obj.ConfluenceNode = function(){
    var CN = new Obj.NodeObj("ConfluenceNode");
    CN.OnCreateHandle();
    CN.NodeText = "合流";

    return CN;
}

//通知节点-邮件、通知
Obj.NotificationNode = function(){
    var NN = new Obj.NodeObj("NotificationNode");
    NN.OnCreateHandle();
    NN.NodeText = "通知";

    return NN;
}

//结束节点
Obj.EndNode = function () {
    var en = new Obj.NodeObj("EndNode");
    en.OnCreateHandle();
    en.NodeText = "结束";


    return en;
}

//驳回节点 用于驳回到某个节点
Obj.RejectNode = function(){
    var rejectN = new Obj.NodeObj("RejectNode");
    rejectN.OnCreateHandle();
    rejectN.NodeText = "驳回";

    //从哪个节点驳回
    rejectN.RejectFromNode = null;
    //驳回到哪个节点
    rejectN.RejectToNode = null;


    return rejectN;
}

//用于连接的锚点
Obj.NodeAnchor = function () {
    var na = new Object();
    na.VisualElement = document.createElement("div");
    na.VisualElement.className = "node_anchor";
    na.VisualElement.innerHTML = '<svg class="anchor_svg" pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle class="anchor_circle" version="1.1" xmlns="http://www.w3.org/2000/svg"></circle></svg>';

    na.Circle = na.VisualElement.querySelector("circle.anchor_circle");
    na.SVG = na.VisualElement.querySelector("svg.anchor_svg");

    //属于哪个节点
    na.BelongToNode = null;
    //所在的节点池
    na.Pool = null;

    //锚点中心点在节点池的实际位置
    na.StartX = null;
    na.StartY = null;

    //圆形半径
    na.circleRadius = 6;
    Object.defineProperty(na,"CircleRadius",{
        set:function (v) {
            na.circleRadius = v;
            na.SetAnchorStyle();
        },
        get:function () {
            return na.circleRadius;
        }
    })

    //设置锚点样式
    na.SetAnchorStyle = function(){
        na.Circle.setAttribute("cx",na.circleRadius);
        na.Circle.setAttribute("cy",na.circleRadius);
        na.Circle.setAttribute("r",na.circleRadius);

        na.SVG.setAttribute("width",na.circleRadius*2+"px");
        na.SVG.setAttribute("height",na.circleRadius*2+"px");
    }

    na.SetAnchorStyle();
    //锚点在节点的位置  绘制连线时判断往哪个方向绘制线 避免穿过锚点所在的节点
    //top left right bottom
    na.LayoutAtNode = '';
    //锚点所在的连接线 在移动时要动态绘制连接线
    na.ConnectionLine = null;

    //监听锚点的鼠标点击事件 点击时记录起始锚点
    na.VisualElement.onmousedown = function (ev) {
        //取消事件冒泡
        ev.cancelBubble = true;
        console.log("鼠标点击了锚点");
        console.log(na.StartX+"-----"+na.StartY);
        //记录节点池此时绘制连线的起始锚点
        na.BelongToNode.Pool.StartAnchor = na;

        //节点池的当前激活锚点
        na.BelongToNode.Pool.ActiveAnchor = na;

    }

    //TODO:鼠标抬起事件 抬起时创建连接线
    na.VisualElement.onmouseup = function (ev) {

        na.BelongToNode.Pool.EndAnchor = na;

        //1、锚点在同一个节点上 不绘制连线
        //2、没有起始锚点不绘制连线
        var startNode = (na.BelongToNode.Pool.StartAnchor && na.BelongToNode.Pool.StartAnchor.BelongToNode);
        var endNode = na.BelongToNode;
        if (startNode === endNode || !na.BelongToNode.Pool.StartAnchor) return;

        //设置起始节点的NextNode属性，值为当前锚点所在的节点
        na.BelongToNode.Pool.StartAnchor.BelongToNode.NextNode = na.BelongToNode;

        //设置当前锚点所在的节点的PreviousNode属性，值为前一个锚点所在的节点
        na.BelongToNode.PreviousNode = na.BelongToNode.Pool.StartAnchor.BelongToNode;

        //两个锚点之间添加连接线
        na.CreateLine(na.BelongToNode.Pool.StartAnchor,na);

        //绘制连线后 将节点池的起始和终止节点对象置为null，避免重复绘制连线
        na.BelongToNode.Pool.EndAnchor = null;
        na.BelongToNode.Pool.StartAnchor = null;

    }

    //FIXME:锚点鼠标进入时 关联的连线做样式改变
    na.Circle.onmouseenter = function (ev) {
        return;
        na.ConnectionLine && na.ConnectionLine.SetOverStyle();
        na.SetOverStyle();
    }

    na.Circle.onmouseout = function (ev) {
        return;
        na.ConnectionLine && na.ConnectionLine.SetDefaultStyle();
        na.SetDefaultStyle();
    }

    //设置鼠标的悬停样式
    na.SetOverStyle = function(){
        na.Circle.classList.add("anchor_circle_hover");
    }
    //设置默认样式
    na.SetDefaultStyle = function(){
        na.Circle.classList.remove("anchor_circle_hover");
    }



    //绘制方法
    na.OnDraw = function(){
        na.ConnectionLine && na.ConnectionLine.OnDraw();
    }

    //TODO:通过两个锚点 绘制连接锚点的连接线
    na.CreateLine = function (start,end) {
        var connectL = new Obj.ConnectionLine(start,end);
        na.Pool.AddNode(connectL);
    }

    return na;
}


//连接线
Obj.ConnectionLine = function (startAnchor,endAnchor) {
    var cl = new Object();
    cl.VisualElement = document.createElement("div");
    cl.VisualElement.className = "ConnectionLine";
    cl.NS = "http://www.w3.org/2000/svg";
    cl.VisualElement.innerHTML = '<svg style="" pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg" class="anchor_connector"></svg>';
    cl.SVG = cl.VisualElement.querySelector("svg.anchor_connector");

    cl.ConnectionPath = document.createElementNS("http://www.w3.org/2000/svg","path");
    cl.ConnectionPath.setAttribute("class","connection_path");
    cl.SVG.appendChild(cl.ConnectionPath);

    cl.ConnectionArrow = document.createElementNS("http://www.w3.org/2000/svg","path");
    cl.ConnectionArrow.setAttribute("class","connection_arrow");
    cl.SVG.appendChild(cl.ConnectionArrow);

    //起始锚点
    cl.StartAnchor = startAnchor ? startAnchor : null;
    //结束锚点
    cl.EndAnchor = endAnchor ? endAnchor : null;

    //起始节点
    cl.StartNode = null;
    //结束节点
    cl.EndNode = null;

    //处理鼠标进入事件
    cl.handleMouseEnter = function(ev){
        cl.SetOverStyle();
    }

    //处理鼠标移除事件
    cl.handleMouseOut = function(ev){

        cl.SetDefaultStyle();
    }

    //设置鼠标悬停样式
    cl.SetOverStyle = function(){
        cl.ConnectionPath.classList.add("connection_path_hover");
        cl.ConnectionArrow.classList.add("connection_arrow_hover");

        cl.StartAnchor && cl.StartAnchor.SetOverStyle();
        cl.EndAnchor && cl.EndAnchor.SetOverStyle();

    }
    //设置正常显示样式
    cl.SetDefaultStyle = function(){
        cl.ConnectionPath.classList.remove("connection_path_hover");
        cl.ConnectionArrow.classList.remove("connection_arrow_hover");

        cl.StartAnchor && cl.StartAnchor.SetDefaultStyle();
        cl.EndAnchor && cl.EndAnchor.SetDefaultStyle();
    }




    //TODO:绘制连接线 整个流程的布局方向-上下、左右 布局之后不允许拖动
    //连接线 灵活计算
    cl.DrawLine_01 = function (startAnchor,endAnchor) {

        if(!(startAnchor && endAnchor)) return;

        //锚点和连接线建立关联
        startAnchor.ConnectionLine = cl;
        endAnchor.ConnectionLine = cl;

        console.log("绘制连接线");

        //通过锚点的位置信息绘制连接线
        var minTop = 0,maxTop = 0,minLeft = 0,maxLeft = 0;
        if(startAnchor.StartY >= endAnchor.StartY){
            minTop = endAnchor.StartY;
            maxTop = startAnchor.StartY;
        }else {
            minTop = startAnchor.StartY;
            maxTop = endAnchor.StartY;
        }

        if(startAnchor.StartX >= endAnchor.StartX){
            minLeft = endAnchor.StartX;
            maxLeft = startAnchor.StartX;
        }else {
            minLeft = startAnchor.StartX;
            maxLeft = endAnchor.StartX;
        }

        var svgW = maxLeft-minLeft;
        var svgH = maxTop-minTop;


        //起止点的位置被放到svg后 转换成新坐标
        var startConver_x = startAnchor.StartX- minLeft,
            startConver_y = startAnchor.StartY - minTop,
            endConver_x = endAnchor.StartX - minLeft,
            endConver_y = endAnchor.StartY - minTop;


        //计算锚点需要连接的第一个点
        var startFirstP = cl.CalcuFirstPoint(startConver_x,startConver_y,startAnchor.LayoutAtNode);
        var endFirstP = cl.CalcuFirstPoint(endConver_x,endConver_y,endAnchor.LayoutAtNode);

        var maxFirst_x = Math.max(startFirstP.x,endFirstP.x);
        var maxFirst_y = Math.max(startFirstP.y,endFirstP.y);
        var minFirst_x = Math.min(startFirstP.x,endFirstP.x);
        var minFirst_y = Math.min(startFirstP.y,endFirstP.y);

        svgW = maxFirst_x > svgW ? maxFirst_x : svgW;
        svgH = maxFirst_y > svgH ? maxFirst_y : svgH;
        svgW = minFirst_x < 0 ? (svgW-minFirst_x) : svgW;
        svgH = minFirst_y < 0 ? (svgH-minFirst_y) : svgH;
        minLeft = minFirst_x < 0 ? (minLeft+minFirst_x) : minLeft;
        minTop = minFirst_y < 0 ? (minTop+minFirst_y) : minTop;

        //起止点的位置被放到svg后 转换成新坐标
        startConver_x = startAnchor.StartX- minLeft;
        startConver_y = startAnchor.StartY - minTop;
        endConver_x = endAnchor.StartX - minLeft;
        endConver_y = endAnchor.StartY - minTop;

        //重新计算锚点需要连接的第一个点
        startFirstP = cl.CalcuFirstPoint(startConver_x,startConver_y,startAnchor.LayoutAtNode);
        endFirstP = cl.CalcuFirstPoint(endConver_x,endConver_y,endAnchor.LayoutAtNode);

        console.log("svgw:"+svgW+" svgh:"+svgH);

        cl.VisualElement.style.top = minTop+"px";
        cl.VisualElement.style.left = minLeft+"px";
        cl.VisualElement.style.width = svgW+"px";
        cl.VisualElement.style.height = svgH+"px";

        //定义连线的路径字符串
        var path = "M "+startConver_x+" " +startConver_y +"L "+ startFirstP.x + " "+startFirstP.y;

        var gap_x = endConver_x - startConver_x;
        var gap_y = endConver_y - startConver_y;

        //第二个点
        var secP_x = 0;
        var secP_y = 0;
        //通过判断锚点在上下、左右，选择下一个点的方向
        switch (startAnchor.LayoutAtNode) {
            case "left"://此时根据终点的方向确定下一个点向上还是向下
            case "right":
                if(gap_y>=0){//向下
                    path += " L "+(startFirstP.x)+" "+(startFirstP.y+svgH*0.5);
                    secP_y = startFirstP.y+svgH*0.5;
                }else{
                    path += " L "+(startFirstP.x)+" "+(startFirstP.y-svgH*0.5);
                    secP_y = startFirstP.y-svgH*0.5;
                }
                secP_x = startFirstP.x;
                break;
            case "top"://此时根据终点的方向确定下一个点向左还是向右
            case "bottom":
                if(gap_x>=0){//向右
                    path += " L "+(startFirstP.x+svgW*0.5)+" "+startFirstP.y;
                    secP_x = startFirstP.x+svgW*0.5;
                }else{
                    path += " L "+(startFirstP.x-svgW*0.5)+" "+(startFirstP.y);
                    secP_x = startFirstP.x-svgW*0.5;
                }
                secP_y = startFirstP.y;
                break;
        }



        //FIXME:绘制连线 连线的绘制原则？？
        path += " L "+(startFirstP.x+svgW*0.5)+" "+endFirstP.y;
        path += " L "+(endFirstP.x)+" "+endFirstP.y+" L "+(endConver_x)+" "+endConver_y;
        // var path = "M 0 0 L 300 185 A 5 5 0 0,1 295 190 L 155 190 A 5 5 0 0,1 150 185 L 150 -65 A 5 5 0 0,0 145 -70 L 5 -70 A 5 5 0 0,0 0 -65 L 0 -10 ";
        cl.ConnectionPath.setAttribute("d",path);

        //根据终点的位置所在的方向  绘制箭头
        var arrowPath = "M "+endConver_x+" "+endConver_y;
        switch (endAnchor.LayoutAtNode) {
            case "top"://箭头向下
                arrowPath += " L " +(endConver_x+5.5)+" "+(endConver_y-11)+" L "+(endConver_x)+" "+(endConver_y+6)+" L "+(endConver_x-5.5)+" "+(endConver_y-11)+" L "+(endConver_x)+" "+(endConver_y);
                break;
            case "bottom"://箭头向上
                arrowPath += " L " +(endConver_x-5.5)+" "+(endConver_y+11)+" L "+(endConver_x)+" "+(endConver_y-6)+" L "+(endConver_x+5.5)+" "+(endConver_y+11)+" L "+(endConver_x)+" "+(endConver_y);
                break;
            case "left"://箭头向右
                arrowPath += " L " +(endConver_x-11)+" "+(endConver_y-5.5)+" L "+(endConver_x+6)+" "+(endConver_y)+" L "+(endConver_x-11)+" "+(endConver_y+5.5)+" L "+(endConver_x)+" "+(endConver_y);
                break;
            case "right"://箭头向左
                arrowPath += " L " +(endConver_x+11)+" "+(endConver_y+5.5)+" L "+(endConver_x-6)+" "+(endConver_y)+" L "+(endConver_x+11)+" "+(endConver_y-5.5)+" L "+(endConver_x)+" "+(endConver_y);
                break;
        }

        cl.ConnectionArrow.setAttribute("d",arrowPath);
    }

    //绘制直线连接线
    cl.DrawLine = function (startAnchor,endAnchor){
        if(!(startAnchor && endAnchor)) return;

        //锚点和连接线建立关联
        startAnchor.ConnectionLine = cl;
        endAnchor.ConnectionLine = cl;

        console.log("绘制连接线");

        //通过锚点的位置信息绘制连接线
        var minTop = 0,maxTop = 0,minLeft = 0,maxLeft = 0;
        if(startAnchor.StartY >= endAnchor.StartY){
            minTop = endAnchor.StartY;
            maxTop = startAnchor.StartY;
        }else {
            minTop = startAnchor.StartY;
            maxTop = endAnchor.StartY;
        }

        if(startAnchor.StartX >= endAnchor.StartX){
            minLeft = endAnchor.StartX;
            maxLeft = startAnchor.StartX;
        }else {
            minLeft = startAnchor.StartX;
            maxLeft = endAnchor.StartX;
        }

        var svgW = maxLeft-minLeft<=0?8:maxLeft-minLeft;
        var svgH = maxTop-minTop<=0?8:maxTop-minTop;


        //起止点的位置被放到svg后 转换成新坐标
        var startConver_x = startAnchor.StartX- minLeft,
            startConver_y = startAnchor.StartY - minTop,
            endConver_x = endAnchor.StartX - minLeft,
            endConver_y = endAnchor.StartY - minTop;


        cl.VisualElement.style.top = minTop+"px";
        cl.VisualElement.style.left = minLeft+"px";
        cl.VisualElement.style.width = svgW+"px";
        cl.VisualElement.style.height = svgH+"px";

        var endFirstP = cl.CalcuFirstPoint(endConver_x,endConver_y,endAnchor.LayoutAtNode);

        var path = "M "+startConver_x+" "+startConver_y+" L "+endFirstP.x+" "+endFirstP.y+" L "+endConver_x+" "+endConver_y;
        cl.ConnectionPath.setAttribute("d",path);

        //根据终点的位置所在的方向  从终点开始绘制箭头 顺时针绘制
        var arrowPath = "M "+endConver_x+" "+endConver_y;
        switch (endAnchor.LayoutAtNode) {
            case "top"://箭头向下
                arrowPath += " L " +(endConver_x-5)+" "+(endConver_y-10)+" L "+(endConver_x)+" "+(endConver_y-8)+" L "+(endConver_x+5)+" "+(endConver_y-10)+" L "+(endConver_x)+" "+(endConver_y);
                break;
            case "bottom"://箭头向上
                arrowPath += " L " +(endConver_x+5)+" "+(endConver_y+10)+" L "+(endConver_x)+" "+(endConver_y+8)+" L "+(endConver_x-5)+" "+(endConver_y+10)+" L "+(endConver_x)+" "+(endConver_y);
                break;
            case "left"://箭头向右
                arrowPath += " L " +(endConver_x-10)+" "+(endConver_y+5)+" L "+(endConver_x-8)+" "+(endConver_y)+" L "+(endConver_x-10)+" "+(endConver_y-5)+" L "+(endConver_x)+" "+(endConver_y);
                break;
            case "right"://箭头向左
                arrowPath += " L " +(endConver_x+10)+" "+(endConver_y-5)+" L "+(endConver_x+8)+" "+(endConver_y)+" L "+(endConver_x+10)+" "+(endConver_y+5)+" L "+(endConver_x)+" "+(endConver_y);
                break;
        }

        cl.ConnectionArrow.setAttribute("d",arrowPath);

        //绘制完路径之后再绑定事件才能被监听到！！！！
        // cl.ConnectionPath.addEventListener("mouseenter",cl.handleMouseEnter,true);
        // cl.ConnectionPath.addEventListener("mouseout",cl.handleMouseOut,true);
        // cl.ConnectionArrow.addEventListener("mouseenter",cl.handleMouseEnter,true);
        // cl.ConnectionArrow.addEventListener("mouseout",cl.handleMouseOut,true);
    }

    //计算锚点需要连接的第一个点
    cl.CalcuFirstPoint = function(x,y,p){
        //每个锚点绘制连线时 最短的外延距离20px
        var shortDis = 30;

        var firstP = {x:0,y:0};
        switch (p) {
            case "top":
                firstP.x = x;
                firstP.y = y - shortDis;
                break;
            case "right":
                firstP.x = x + shortDis;
                firstP.y = y;
                break;
            case "bottom":
                firstP.x = x;
                firstP.y = y + shortDis;
                break;
            case "left":
                firstP.x = x - shortDis;
                firstP.y = y;
                break;
        }
        return firstP;
    }


    cl.OnDraw = function(){
        if(!(startAnchor && endAnchor)) return;
        cl.DrawLine(startAnchor,endAnchor);
    }


    cl.DrawLine(startAnchor,endAnchor);

    return cl;
}
























