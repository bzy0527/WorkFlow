
var Obj = new Object();

Obj.Control = function(cn){
    var c = new Object();
    var t = cn?cn:"Control";
    c.VisualElement = document.createElement("div");
    c.VisualElement.className = t;
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

    c.AddClass = function (cn) {
        c.VisualElement.classList.add(cn);
    }

    c.RemoveClass = function (cn) {
        if(c.VisualElement.classList.contains(cn)){
            c.VisualElement.classList.remove(cn);
        }
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

//工具栏 ToolBar  功能按钮：保存、生成文件……
Obj.ToolBar = function () {
    var tb = new Obj.Control("WorkFlowToolBar");


    return tb;
}

//节点工具箱 ToolBox 存放节点图例
Obj.ToolBox = function () {
    var toolBox = new Obj.Control("WorkFlowToolBox");

    for(var i=0;i<3;i++){
        var toolItem = new Obj.ToolBoxItem();
        toolBox.VisualElement.appendChild(toolItem.VisualElement);
    }



    return toolBox;
}

//节点工具箱item
Obj.ToolBoxItem = function () {
    var toolItem = new Obj.Control("ToolBoxItem");
    toolItem.VisualElement.innerHTML = "<img class='ToolBoxItem_Img' src=''><span class='ToolBoxItem_Text'>工作流节点</span>";
    toolItem.ItemImage = toolItem.VisualElement.querySelector("img.ToolBoxItem_Img");
    toolItem.VisualElement.draggable = !0;
    toolItem.ItemImage.draggable = !1;
    toolItem.VisualElement.ondragstart = function (e) {
        var t = e.currentTarget;
        t!=null&&t.draggable!=undefined&&t.draggable==!0&&(
            e.dataTransfer.effectAllowed="move",
                t.dataContext = {},
                t.dataContext.x=e.offsetX,
                t.dataContext.y=e.offsetY)
    }


    return toolItem;
}

// 占位符
Obj.PlaceHolder = function(){
    var ph = new Obj.Control("PlaceHolder");
    ph.VisualElement.innerHTML = "<img src=\"\" class=\"PlaceHolderTag\"><div class=\"PlaceHolderBar\"></div><img class=\"PlaceHolderTagOver\"><span class=\"PlaceHolderSpan\">放置节点</span>";
    ph.PlaceTag = ph.VisualElement.querySelector("img.PlaceHolderTag");
    ph.PlaceTag.src = "./img/arrow-right.png";

    ph.PlaceTag1 = ph.VisualElement.querySelector("img.PlaceHolderTagOver");
    ph.PlaceTag1.src = "./img/arrow-right.png";

    ph.PlaceBar = ph.VisualElement.querySelector("div.PlaceHolderBar");
    ph.PlaceSpan = ph.VisualElement.querySelector("span.PlaceHolderSpan");

    ph.VisualElement.allowDrop = true;
    ph.PlaceTag.allowDrop = true;
    ph.PlaceBar.allowDrop = true;
    ph.PlaceTag1.allowDrop = true;

    //dragover
    ph.VisualElement.ondragover = function (e) {
        ph.PlaceTag1.style.display = "inline-block";
        ph.PlaceBar.style.display = "block";
        e.preventDefault();
        e.cancelBubble = true;
    }

    //TODO:拖拽离开时
    ph.VisualElement.ondragleave = function (e) {
        var rc = ph.VisualElement.getBoundingClientRect();
        if (event.clientX<rc.left || event.clientY<rc.top || event.clientX>rc.right || event.clientY>rc.bottom) {
            ph.PlaceTag1.style.display = "none";
            ph.PlaceBar.style.display = "none";
        }
        e.cancelBubble = true;
        e.preventDefault();
    }

    //TODO:拖拽放置时
    ph.VisualElement.ondrop = function (e) {
        ph.PlaceTag1.style.display = "none";
        ph.PlaceBar.style.display = "none";
        e.preventDefault();
        //创建节点实例  添加到放置的位置

        ph.PlaceSpan.style.display = "none";
    }


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

//节点设计器  NodeDesignView
Obj.NodeDesignView = function () {
    var ndv = new Obj.Control("NodeDesignView");


    return ndv;
}


//工作流节点池
Obj.WorkFlowPool = function () {
    var wfp = new Obj.Control("WorkFlowPool");
    var startNode = new Obj.StartNode();
    var endNode = new Obj.EndNode();
    var placeH = new Obj.PlaceHolder();

    wfp.VisualElement.appendChild(startNode.VisualElement);
    wfp.VisualElement.appendChild(placeH.VisualElement);
    wfp.VisualElement.appendChild(endNode.VisualElement);


    return wfp;
}


//节点基类
Obj.NodeObj = function (nT) {
    var no = new Obj.Control(nT);

    var ns = nT ? nT : "RootNode";
    //节点类型
    no.NodeType = ns;
    no.ClassName = "DBNode";
    no.AddClass(ns);

    //节点名称
    no.NodeName = "";

    //节点显示文本
    no.nodeText = "";
    Object.defineProperty(no,"NodeText",{
        get:function () { return no.nodeText },
        set:function (v) { no.nodeText = v; no.NodeSpan.textContent = v;}
    });

    //节点显示图片
    no.imgUrl  = "https://wfs.dbazure.cn/root//AppData/099d198de8884add9953aef6b99daa1d/Default/bddcbff6b9304c28b817f028ac51959b.png";
    Object.defineProperty(no,"ImgUrl",{
        get:function () { return no.imgUrl },
        set:function (v) { no.imgUrl = v; no.NodeImg.src = no.imgUrl;}
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
        no.VisualElement.innerHTML = "<div class='NodeContainer'><img class='Node_Img'></div><span class='Node_Text'>节点显示名称</span>";
        no.NodeImg = no.VisualElement.querySelector("img.Node_Img");
        no.NodeSpan = no.VisualElement.querySelector("span.Node_Text");
        no.NodeImg.src = no.imgUrl;
        no.NodeSpan.textContent = no.nodeText;

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


//结束节点
Obj.EndNode = function () {
    var en = new Obj.NodeObj("EndNode");
    en.OnCreateHandle();
    en.NodeText = "结束";


    return en;
}







































