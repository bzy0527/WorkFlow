
var Obj = new Object();

//控件基类
Obj.Control = function(cn){
    var c = new Object();
    var t = cn?cn:"Control";
    c.VisualElement = document.createElement("div");
    c.VisualElement.className = t;

    //类名
    c.className = t;
    Object.defineProperty(c,"ClassName",{
        get() {
            return c.className;
        },
        set(v) {
            c.VisualElement.className = v;
            c.className = v;
        }
    })

    //添加类名
    c.AddClass = function (cn) {
        c.VisualElement.classList.add(cn);
    }

    //移除类名
    c.RemoveClass = function (cn) {
        if(c.VisualElement.classList.contains(cn)){
            c.VisualElement.classList.remove(cn);
        }
    }

    //是否可以拖拽
    c.draggable = false;
    Object.defineProperty(c,"Draggable",{
        set(v) {
            c.draggable = v;
            c.VisualElement.draggable = v;
        },
        get() {
            return c.draggable;
        }
    })

    //拖拽事件处理方法
    c.DragStart = function (ev) {
    }
    c.DragEnd = function (ev) {

    }
    c.DragOver = function (ev) {

    }
    c.DragLeave = function (ev) {

    }
    c.DragDrop = function (ev) {

    }

    c.OnCreateHandle = function(){
        //注册拖拽事件
        c.VisualElement.ondragstart = c.DragStart;
        c.VisualElement.ondragend = c.DragEnd;
        c.VisualElement.ondragover = c.DragOver;
        c.VisualElement.ondragleave = c.DragLeave;
        c.VisualElement.ondrop = c.DragDrop;
    }

    //添加组件
    c.AddControl = function (ct) {

    }

    return c;
}

//工作流设计主窗口 两部分组成1、标题；2、展示区
Obj.WorkFlowWindow = function () {
    var wfw = new Obj.Control("WorkFlowWindow");

    wfw.VisualElement.innerHTML = "<div class='WorkFlowWindow_TitleDiv'><img class='WorkFlowWindow_TitleImg' src='./img/workflowicon.png'><span class='WorkFlowWindow_TitleText'>流程建模</span></div>" +
        "<div class='WorkFlowWindow_ClientDiv'></div>";
    wfw.TitleDiv = wfw.VisualElement.querySelector("div.WorkFlowWindow_TitleDiv");
    wfw.ClientDiv = wfw.VisualElement.querySelector("div.WorkFlowWindow_ClientDiv");

    //创建函数
    wfw.OnCreateHandle = function () {
        document.body.appendChild(wfw.VisualElement);

        //工具栏
        var toolB = new Obj.ToolBar();
        wfw.ClientDiv.appendChild(toolB.VisualElement);


        //节点工具箱
        var toolBox = new Obj.ToolBox();
        toolBox.ItemSource = [{"ImageUrl":"./img/0.png","Text":"审核","NodeType":"ApprovalNode","NodeText":"审核","NodeImgUrl":"./img/0.png"},
                                {"ImageUrl":"./img/1.png","Text":"条件","NodeType":"ConditionNode","NodeText":"条件","NodeImgUrl":"./img/1.png"},
                                {"ImageUrl":"./img/2.png","Text":"分流","NodeType":"ParallelNode","NodeText":"分流","NodeImgUrl":"./img/2.png"},
                                {"ImageUrl":"./img/3.png","Text":"合流","NodeType":"ConfluenceNode","NodeText":"合流","NodeImgUrl":"./img/3.png"},
                                {"ImageUrl":"./img/4.png","Text":"通知","NodeType":"NotificationNode","NodeText":"通知","NodeImgUrl":"./img/4.png"}];
        wfw.ClientDiv.appendChild(toolBox.VisualElement);

        //分隔条1
        var vf01 = new Obj.VerticalSplitter();
        wfw.ClientDiv.appendChild(vf01.VisualElement);
        vf01.AddClass("splitter_left");

        //工作流设计视图
        var wfdv = new Obj.WorkFlowDesignView();
        wfw.ClientDiv.appendChild(wfdv.VisualElement);

        //分隔条2
        var vf02 = new Obj.VerticalSplitter();
        wfw.ClientDiv.appendChild(vf02.VisualElement);
        vf02.AddClass("splitter_right");

        var ndv = new Obj.NodeDesignView();
        wfw.ClientDiv.appendChild(ndv.VisualElement);

    }

    wfw.OnCreateHandle();
    return wfw;
}

//TODO:工具栏 ToolBar  功能按钮：保存、生成文件……
Obj.ToolBar = function () {
    var tb = new Obj.Control("WorkFlowToolBar");


    return tb;
}

//节点工具箱 ToolBox 存放节点图例
Obj.ToolBox = function () {
    var toolBox = new Obj.Control("WorkFlowToolBox");
    toolBox.itemSource = [];
    Object.defineProperty(toolBox,"ItemSource",{
        get() {
            return toolBox.itemSource;
        },
        set(v) {
            toolBox.itemSource = v;
            //创建list
            toolBox.CreateList(v);
        }
    });

    //创建list
    toolBox.CreateList = function (itemSource) {
        if(!Array.isArray(itemSource)) return;
        var len = itemSource.length;
        for(var i=0;i<len;i++){
            var toolItem = new Obj.ToolBoxItem();
            toolItem.DataContext = itemSource[i];
            toolBox.VisualElement.appendChild(toolItem.VisualElement);
        }

    }

    return toolBox;
}

//节点工具箱item
Obj.ToolBoxItem = function () {
    var toolItem = new Obj.Control("ToolBoxItem");
    toolItem.VisualElement.innerHTML = "<img class='ToolBoxItem_Img' src=''><span class='ToolBoxItem_Text'>工作流节点</span>";
    toolItem.ItemImage = toolItem.VisualElement.querySelector("img.ToolBoxItem_Img");
    toolItem.ItemText = toolItem.VisualElement.querySelector("span.ToolBoxItem_Text");
    toolItem.VisualElement.draggable = !0;
    toolItem.ItemImage.draggable = !1;


    //数据上下文
    toolItem.dataContext = {"ImageUrl":"","Text":""};
    Object.defineProperty(toolItem,"DataContext",{
        get() {return toolItem.dataContext;
        },
        set(v) {
            toolItem.dataContext = v;
            toolItem.ItemImage.src = toolItem.dataContext.ImageUrl;
            toolItem.ItemText.textContent = toolItem.dataContext.Text;
        }
    })

    toolItem.Draggable = !0;
    //拖拽开始事件
    toolItem.DragStart = function (e) {
        var t = e.currentTarget;
        Obj.NodeManger.DragObject = toolItem;

        e.target.style.opacity = "0.4";
        e.dataTransfer.setData("DataStr",JSON.stringify(toolItem.DataContext));
        t!=null&&t.draggable!=undefined&&t.draggable==!0&&(
            e.dataTransfer.effectAllowed="move"
                // t.dataContext.x=e.offsetX,
                // t.dataContext.y=e.offsetY
        )
    }

    //

    toolItem.OnCreateHandle();
    return toolItem;
}

// 节点占位控件
Obj.PlaceHolder = function(){
    var ph = new Obj.Control("PlaceHolder");
    ph.VisualElement.innerHTML = "<img src=\"\" class=\"PlaceHolderTag\"><div class=\"PlaceHolderBar\"></div><img class=\"PlaceHolderTagOver\"><span class=\"PlaceHolderSpan\">放置节点</span>";
    ph.PlaceTag = ph.VisualElement.querySelector("img.PlaceHolderTag");
    ph.PlaceTag.src = "./img/arrow-right.png";

    ph.PlaceTag1 = ph.VisualElement.querySelector("img.PlaceHolderTagOver");
    ph.PlaceTag1.src = "./img/arrow-right.png";

    ph.PlaceBar = ph.VisualElement.querySelector("div.PlaceHolderBar");
    ph.PlaceSpan = ph.VisualElement.querySelector("span.PlaceHolderSpan");

    //记录占位控件所在的节点池
    ph.Pool = null;

    ph.VisualElement.allowDrop = true;
    ph.PlaceTag.allowDrop = true;
    ph.PlaceBar.allowDrop = true;
    ph.PlaceTag1.allowDrop = true;

    ph.PlaceTag.dragable = false;
    ph.VisualElement.draggable = false;

    //dragover
    ph.DragOver = function (e) {

        ph.PlaceTag1.style.display = "inline-block";
        ph.PlaceBar.style.display = "block";
        e.preventDefault();
        e.cancelBubble = true;
    }

    //拖拽离开时
    ph.DragLeave = function (e) {

        var rc = ph.VisualElement.getBoundingClientRect();
        //测试发现：e.clientX最大值为rc.right-1；e.clientY最大值为rc.bottom-1
        if (e.clientX<rc.left+2 || e.clientY<rc.top+2 || e.clientX>rc.right-2 || e.clientY>rc.bottom-2) {
            ph.PlaceTag1.style.display = "none";
            ph.PlaceBar.style.display = "none";
        }

        e.cancelBubble = true;
        e.preventDefault();
    }

    //TODO:拖拽放置时
    ph.DragDrop = function (e) {
        ph.PlaceTag1.style.display = "none";
        ph.PlaceBar.style.display = "none";

        //放置节点
        ph.Pool.PlaceNode(Obj.NodeManger.DragObject,ph);


        ph.PlaceSpan.style.display = "none";
        e.cancelBubble = true;
        Obj.NodeManger.DragObject = null;
        e.preventDefault();
    }


    //FIXME:为什么要在方法定义之后调用绑定事件才可以？？
    ph.OnCreateHandle();
    return ph;
}


//垂直分隔条 VerticalSplitter
Obj.VerticalSplitter = function () {
    var vs = new Obj.Control("VerticalSplitter");


    return vs;
}

//工作流设计视图 WorkFlowDesignView
Obj.WorkFlowDesignView = function () {
    var wfdv = new Obj.Control("WorkFlowDesignView");

    var wfp = new Obj.WorkFlowPool();
    wfdv.VisualElement.appendChild(wfp.VisualElement);


    return wfdv;
}

//节点设计器 右侧，展示节点相关属性的设置 NodeDesignView
Obj.NodeDesignView = function () {
    var ndv = new Obj.Control("NodeDesignView");


    return ndv;
}


//TODO: 工作流节点池
Obj.WorkFlowPool = function () {
    var wfp = new Obj.Control("WorkFlowPool");

    //控件集合
    wfp.Controls = [];
    //节点集合
    wfp.Nodes = [];

    wfp.OnCreateHandle = function(){
        //创建节点 添加到节点池
        var startNode = new Obj.StartNode();
        var endNode = new Obj.EndNode();
        var placeH = new Obj.PlaceHolder();
        wfp.AddControls([startNode,placeH,endNode]);

    }

    //顺序添加控件集合
    wfp.AddControls = function(c){
        if(Array.isArray(c)){
            for (var i=0;i<c.length;i++){
                wfp.AddControl(c[i]);
            }
        }else {
            wfp.AddControl(c);
        }
    }

    //向最后添加单个控件
    wfp.AddControl = function(c){
        wfp.VisualElement.appendChild(c.VisualElement);
        wfp.Controls.push(c);
        if(c.NodeType != undefined){
            wfp.Nodes.push(c);
        }
        c.Pool = wfp;
    }

    //TODO:保存序列化成JSON
    wfp.SaveToJSON = function () {

    }

    //TODO:加载JSON 执行节点的反序列化方法
    wfp.LoadJSON = function (json) {

    }

    //在占位控件后放置节点
    wfp.PlaceNode = function(n,ph){
        if(n==null) return;

        //为Node类型的控件
        if(n.NodeType != undefined){ //TODO：节点类型控件 移动节点
            console.log("移动节点");
            if(event.ctrlKey){//复制节点

            }
            //1、获取移动node的index
            var cIdx = wfp.Controls.indexOf(n);
            var nIdx = wfp.Nodes.indexOf(n);

            //移动的node后占位控件
            var phBack = null;

            //2、被放置的占位控件的index
            var phIdx = wfp.Controls.indexOf(ph);
            //3、占位控件后面的节点控件
            var c = null;

            var len = wfp.Controls.length;
            var nodeIdx = 0;
            if(phIdx>=0 && phIdx+1 <= len-1){
                c = wfp.Controls[phIdx+1];
                phBack = wfp.Controls[cIdx+1];
                if(n != c){
                    wfp.VisualElement.insertBefore(n.VisualElement,c.VisualElement);
                    wfp.VisualElement.insertBefore(phBack.VisualElement,c.VisualElement);
                }
                nodeIdx = wfp.Nodes.indexOf(c);
            }else {//直接添加到最后
                wfp.VisualElement.appendChild(n.VisualElement);
                nodeIdx = wfp.Nodes.length-1;

            }

            //被放置的占位控件后面的Node
            var bNode = wfp.Controls[phIdx+1];
            var bIdx = wfp.Nodes.indexOf(bNode);
            if(phIdx<cIdx){//节点向前移动  先删除数组元素  在把元素添加到新位置
                wfp.Controls.splice(cIdx,2);
                wfp.Nodes.splice(nIdx,1);

                wfp.Controls.splice(phIdx+1,0,n,phBack);
                wfp.Nodes.splice(bIdx,0,n);

            }else {//节点向后移动  先添加元素 再移除原来的元素
                wfp.Controls.splice(phIdx+1,0,n,phBack);
                wfp.Nodes.splice(bIdx,0,n);

                wfp.Controls.splice(cIdx,2);
                wfp.Nodes.splice(nIdx,1);
            }


        }else { //非Node类型控件 从工具箱中拖拽放置到节点池
            //创建相应类型的节点控件
            var node = Obj.NodeManger.CreateNodeInstance(n);
            //获取占位控件的位置
            var idx  = wfp.Controls.indexOf(ph);
            //在指定位置插入节点
            wfp.InsertNode(node,idx+1);
            //在指定位置插入占位控件
            wfp.InsertPlaceHolder(idx+2);

        }

        console.log(wfp.Controls);
        console.log(wfp.Nodes);
    }

    //TODO:在指定位置插入节点
    wfp.InsertNode = function (n,idx) {
        var len = wfp.Controls.length;
        var nodeIdx = 0;
        if(idx>=0 && idx <= len-1){
            var c = wfp.Controls[idx];
            wfp.VisualElement.insertBefore(n.VisualElement,c.VisualElement);
            nodeIdx = wfp.Nodes.indexOf(c);
        }else {//直接添加到最后
            wfp.VisualElement.appendChild(n.VisualElement);
            nodeIdx = wfp.Nodes.length-1;
        }

        //数组的指定位置插入元素
        wfp.Controls.splice(idx,0,n);
        wfp.Nodes.splice(nodeIdx,0,n);

    }

    //移除节点
    wfp.RemoveNode = function (n) {
        wfp.VisualElement.removeChild(n.VisualElement);
        var cIdx = wfp.Controls.indexOf(n);
        var nIdx = wfp.Nodes.indexOf(n);
        //数组中移除相应的控件
        wfp.Controls.splice(cIdx,1);
        wfp.Nodes.splice(nIdx,1);
    }

    //TODO:在指定位置插入控件
    wfp.InsertControl = function(c,index){
        //判断控件是否存在 如果不存在或者目标控件已经是最后一个控件，则直接插入到最后；
        if(idx === wfp.Controls.length-1){

        }

    }

    //插入占位控件
    wfp.InsertPlaceHolder = function (idx) {
        var ph = new Obj.PlaceHolder();
        ph.Pool = wfp;
        var len = wfp.Controls.length;
        if(idx>=0 && idx < len){
            var c = wfp.Controls[idx];
            wfp.VisualElement.insertBefore(ph.VisualElement,c.VisualElement);
        }else {
            wfp.VisualElement.appendChild(ph.VisualElement);
        }
        //数组的指定位置插入元素
        wfp.Controls.splice(idx,0,ph);
        return ph;
    }

    //移除占位控件
    wfp.RemovePlaceHolder = function(ph){
        wfp.VisualElement.removeChild(ph.VisualElement);
        var cIdx = wfp.Controls.indexOf(ph);
        //数组中移除相应的控件
        wfp.Controls.splice(cIdx,1);
    }

    wfp.OnCreateHandle();
    return wfp;
}

//节点管理类
Obj.NodeManger = new Object();
Obj.NodeManger.CreateNodeInstance = function(o){
    var t = null;
    if(o==null) return null;
    t = "t = new Obj."+o.DataContext.NodeType+"()";
    eval("t = new Obj."+o.DataContext.NodeType+"()");
    t.NodeImgUrl = o.DataContext.ImageUrl;

    return t;
}

//记录当前被拖拽的对象
Obj.NodeManger.DragObject = null;
//TODO:复制节点对象
Obj.NodeManger.CloneNode = function(node){

}
//


//节点基类
Obj.NodeObj = function (nT) {
    var no = new Obj.Control(nT);

    var ns = nT ? nT : "RootNode";
    //节点类型
    no.NodeType = ns;
    no.ClassName = "DBNode";
    no.AddClass(ns);
    no.VisualElement.ondragstart = function(e){
        Obj.NodeManger.DragObject = no;
    }


    //节点名称
    no.NodeName = "";

    //节点显示文本
    no.nodeText = "";
    Object.defineProperty(no,"NodeText",{
        get:function () { return no.nodeText },
        set:function (v) { no.nodeText = v; no.NodeSpan.textContent = v;}
    });

    //节点显示图片
    no.nodeImgUrl  = "https://wfs.dbazure.cn/root//AppData/099d198de8884add9953aef6b99daa1d/Default/bddcbff6b9304c28b817f028ac51959b.png";
    Object.defineProperty(no,"NodeImgUrl",{
        get:function () { return no.nodeImgUrl },
        set:function (v) { no.nodeImgUrl = v; no.NodeImg.src = no.nodeImgUrl;}
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


    //FIXME:父容器对象
    no.Parent = null;

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
        no.VisualElement.innerHTML = "<div class='NodeContainer'><img class='Node_Img'></div><span class='Node_Text'>节点显示名称</span>";
        no.NodeImg = no.VisualElement.querySelector("img.Node_Img");
        no.NodeSpan = no.VisualElement.querySelector("span.Node_Text");
        no.NodeImg.src = no.nodeImgUrl;
        no.NodeSpan.textContent = no.nodeText;

        no.NodeImg.draggable = false;
        no.NodeSpan.draggable = false;
        no.Draggable = true;

    }


    return no;
}


//开始节点
Obj.StartNode = function () {
    var sn = new Obj.NodeObj("StartNode");
    sn.OnCreateHandle();
    sn.NodeText = "开始";

    sn.ProcessState = "done";
    sn.Draggable = false;

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
    en.Draggable = false;


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





































