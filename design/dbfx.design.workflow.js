DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Design.Workflow");
DBFX.RegisterNamespace("DBFX.Design.WFActivities");
DBFX.RegisterNamespace("DBFX.Design.WFActivities.Data");
DBFX.RegisterNamespace("DBFX.Design.ActivityDesigners");
//工作流设计视图
DBFX.Design.WFDesignView = function () {

    var wfdv = new DBFX.Web.Controls.Control("WFDesignView");
    wfdv.ClassDescriptor.Serializer = "";

    wfdv.OnCreateHandle();
    wfdv.OnCreateHandle = function () {

        wfdv.Class = "VDE_Design_WFView";

        wfdv.VisualElement.ondrop = function (e) {

        }
        wfdv.ClientPanel = new DBFX.Web.Controls.Control("WFDesignViewPanel");
        wfdv.ClientPanel.Class = "VDE_Design_WFView_ClientPanel";

        wfdv.SequenceRoot = new DBFX.Design.WFActivities.Sequence(wfdv);
        wfdv.SequenceRoot.Display = "inline-block";
        wfdv.SequenceRoot.BorderColor = "rgba(225,225,225,0.8)";
        wfdv.VisualElement.appendChild(wfdv.ClientPanel.VisualElement);

        wfdv.ClientPanel.VisualElement.appendChild(wfdv.SequenceRoot.VisualElement);
        wfdv.SequenceRoot.HideSettingButton = false;

        wfdv.SequenceRoot.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.WFDesignViewDesigner");
        wfdv.SequenceRoot.viewScale = 100.0;
        Object.defineProperty(wfdv.SequenceRoot, "WFViewScale", {
            get: function () {
                return wfdv.SequenceRoot.viewScale;
            },
            set: function (v) {

                wfdv.SequenceRoot.viewScale = v;

                var scale = v / 100.0;

                wfdv.SequenceRoot.VisualElement.style.transform = "scale(" + scale + ")";
                wfdv.SequenceRoot.VisualElement.style.transformOrigin = "0px 0px";

            }
        });

    }

    wfdv.OnActivityActived = function (activity) {

        if (wfdv.ActivedActivity == activity)
            return;

        if (wfdv.ActivedActivity != undefined) {
            wfdv.ActivedActivity.Actived = false;
            wfdv.ActivedActivity.ContextMenu = undefined;
            wfdv.ActivedActivity.OnPropertyChanged = Object.prototype.OnPropertyChanged;
        }

        wfdv.ActivedActivity = activity;

        if (activity != undefined) {
            activity.Actived = true;



            if (activity != wfdv.SequenceRoot && activity.IsHasContextMenu) {
                wfdv.ActivedActivity.ContextMenu = DBFX.Web.Controls.ContextMenu.ContextMenus.VDE_Design_WFDesignViewControlContextMenu;
                wfdv.ActivedActivity.dataContext = activity;
            }
            activity.FormContext = wfdv.FormContext;


        }

        wfdv.OnObjectSelected(activity);

        wfdv.PC = 0;
        if (activity != undefined) {
            activity.OnPropertyChanged = wfdv.ActivityChanged;
        }

    }

    wfdv.ActivityChanged = function (name, v,a)
    {
        if (wfdv.PC > 2)
            wfdv.IsContentChanged = true;

        wfdv.PC++;

    }

    wfdv.MouseDown = function (e) {

        if (wfdv.ActivedActivity != undefined && wfdv.ActivedActivity != null) {

            wfdv.ActivedActivity.ContextMenu =undefined;
        }

        wfdv.OnActivityActived(undefined);

    }

    wfdv.OnObjectSelected = function (a)
    {

    }

    wfdv.Load = function (e) {


    }

    wfdv.ActivedActivity = undefined;

    wfdv.SaveToXML = function () {

        var xdoc = (new DOMParser()).parseFromString("<WFlow></WFlow>", "text/xml");

        //创建文档根元素系列化表单跟元素

        var rootel = xdoc.documentElement;

        var serializer = new DBFX.Design.WFSerializers.WorkflowSerializer();

        serializer.Serialize(wfdv, rootel);

        if (wfdv.CustomSerializer != undefined)
            wfdv.CustomSerializer.Serialize(wfdv, rootel);

        return xdoc;

    }

    wfdv.LoadXml = function (xmlData) {

        var display=wfdv.VisualElement.style.display;
        wfdv.VisualElement.style.display="none";
        wfdv.SequenceRoot.FormContext = wfdv.FormContext;

        if (xmlData != "") {

            var dparser = new DOMParser();
            var xd = dparser.parseFromString(xmlData, "text/xml");
            var serializer = new DBFX.Design.WFSerializers.WorkflowSerializer();
            serializer.DeSerialize(wfdv, xd.documentElement);

            if (wfdv.CustomSerializer != undefined)
                wfdv.CustomSerializer.DeSerialize(wfdv, xd.documentElement);

            wfdv.IsContentChanged = true;

        }

        if (wfdv.LoadCompleted != undefined)
            wfdv.LoadCompleted(wfdv);

        wfdv.VisualElement.style.display=display;
    }

    wfdv.iscontentchanged = false;
    Object.defineProperty(wfdv, "IsContentChanged", {
        get: function () {
            return wfdv.iscontentchanged;
        },
        set: function (v) {

            wfdv.iscontentchanged = v;
        }
    });

    wfdv.RemoveActiivity = function (a) {

        if (a.Parent.Remove != undefined) {
            a.Parent.Remove(a);
            wfdv.IsContentChanged = true;
        }
    }

    wfdv.Clear = function () {
        wfdv.SequenceRoot.Clear();
    }


    wfdv.ToCode = function () {

        var sw = new DBFX.StringWriter();
        sw.AddLine("{",4);
        wfdv.SequenceRoot.ToCode(sw);
        sw.AddLine("}",-4);
        var code = sw.ToString();
        if (wfdv.ParametersList != undefined) {

            var func = "function(";
            wfdv.ParametersList.Parameters.forEach(function (pa) {

                func += pa.ParameterName + ",";

            });

            func = (func + ")").replace(",)", ")");

            code = func + code;

        }

        //编译过程
        if (wfdv.IsStoreProcedureView == undefined) {
            try {

                var ccode = "";
                if (code.indexOf("function") == 0)
                    ccode = "window.TestMethod=" + code;
                else
                    ccode = "window.TestMethod=function()" + code;

                eval(ccode);

            }
            catch (ex) {

                alert(ex.toString());

            }
        }
        return code;

    }

    //复制控件
    wfdv.CloneActivity = function (a) {

        var xdoc = (new DOMParser()).parseFromString("<Activity></Activity>", "text/xml");

        //系列化Activity
        var ns = new Dictionary();
        var na = undefined;
        var xa = xdoc.documentElement;
        var cs = DBFX.Serializer.Serializers.GetSerializer(a.ClassDescriptor);

        var nsobj = new Object();
        nsobj.k = a.NSSN;
        nsobj.n = a.Namespace;
        nsobj.t = a.ObjType;
        nsobj.ImageUrl = a.ObjImageUrl;
        ns.Add(nsobj.k, nsobj);

        if (cs != null) {

            cs.Serialize(a, xa, ns);


            var nns = new Object();
            for (var i = 0; i < ns.Values.length; i++) {
                var nso = ns.Values[i];
                nns[nso.k] = nso.n;
            }


            //反系列化Activity
            na = DBFX.Serializer.CreateInstance(xa, nns, true);
            na.DesignView = wfdv;
            cs.DeSerialize(na, xa, nns);
        }

        return na;

    }

    wfdv.OnCreateHandle();
    return wfdv;

}

DBFX.Design.DesignView.RemoveActiivity = function (cmd) {

    var a = cmd.Sender.dataContext;
    cmd.Sender.FormContext.Form.FormControls.VDE_DV_DesignView.RemoveActiivity(a);


}

app.GlobalCommands.Register("VDE_Design_DesignView_RemoveActiivity", DBFX.Design.DesignView.RemoveActiivity);

DBFX.Design.WFActivities.ParsingVar = function (v, dt) {

    var v1 = "";

    try {
        if (v.indexOf("@") == 0) {
            v1 = v.replace("@", "");
        }
        else
            if (v.indexOf("%") == 0) {
                v1 = "\"" + app.EnvironVariables.ParsingToString(v) + "\"";
            }
            else

                if (dt == "string" || dt == undefined)
                    v1 = "\"" + v + "\"";
                else
                    v1 = v;


    }
    catch (ex) {

    }
    return v1

}

//流程活动
DBFX.Design.WFActivities.Activity = function (t) {

    if (t == undefined)
        t = "Activity";
    var wfa = new DBFX.Web.Controls.Control(t);
    wfa.IsWFActivity = true;
    wfa.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ActivitySerializer";
    wfa.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.WFAGeneralDesigner"];
    wfa.ClassDescriptor.Compiler = "";
    wfa.VisualElement = document.createElement("DIV");
    wfa.OnCreateHandle();
    wfa.OnCreateHandle = function () {

        wfa.ObjType = t;
        wfa.Class = "VDE_Design_WFView_Activity";
        wfa.HeaderPanel = new DBFX.Web.Controls.Panel();
        wfa.HeaderPanel.Class = "VDE_Design_WFView_ActivityHeader";

        //活动图标
        wfa.Image = new DBFX.Web.Controls.Image("", "24px", "24px");
        wfa.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/activity.png";
        wfa.Image.Float = "left";
        wfa.Image.Margin = "4px 2px 2px 2px";
        //活动标签
        wfa.TextSpan = new DBFX.Web.Controls.Label("Activity");
        wfa.TextSpan.Display = "inline-block";
        wfa.TextSpan.Margin = "5px 2px 2px 2px";

        //活动折叠按钮
        wfa.ECButton = new DBFX.Web.Controls.Image("design/themes/%currenttheme%/images/wfdesignview/e.png", "16px", "16px");
        wfa.ECButton.Float = "right";
        wfa.ECButton.Class = "VDE_Design_WFView_ActivityHeaderECB";
        wfa.ECButton.Click = function (e) {

            wfa.E2CActivity(e);


        }

        //活动折叠按钮
        wfa.AnnotateButton = new DBFX.Web.Controls.Image("design/themes/%currenttheme%/images/wfdesignview/tips.png", "16px", "16px");
        wfa.AnnotateButton.Float = "right";
        wfa.AnnotateButton.Class = "VDE_Design_WFView_ActivityHeaderTB";
        wfa.AnnotateButton.Click = function (e) {




        }

        //活动设置按钮
        wfa.SettingButton = new DBFX.Web.Controls.Image("design/themes/%currenttheme%/images/wfdesignview/settings.png", "16px", "16px");
        wfa.SettingButton.Float = "right";
        wfa.SettingButton.Class = "VDE_Design_WFView_ActivityHeaderSB";
        wfa.SettingButton.Click = function (e) {

            wfa.Setting(e);

        }

        wfa.HeaderPanel.AddControl(wfa.Image);
        wfa.HeaderPanel.AddControl(wfa.ECButton);
        wfa.HeaderPanel.AddControl(wfa.SettingButton);
        wfa.HeaderPanel.AddControl(wfa.AnnotateButton);


        wfa.HeaderPanel.AddControl(wfa.TextSpan);


        wfa.HeaderPanel.VerticalScrollbar = "hidden";
        wfa.VisualElement.appendChild(wfa.HeaderPanel.VisualElement);

        //活动客户区
        wfa.ItemsPanel = new DBFX.Web.Controls.Panel();
        wfa.ItemsPanel.Class = "VDE_Design_WFView_ActivityItemPanel";
        wfa.VisualElement.appendChild(wfa.ItemsPanel.VisualElement);


        wfa.HideECButton = true;
        wfa.IsCanSelected = true;
        wfa.IsHasContextMenu = true;
        wfa.HeaderPanel.MouseDown = function (e) {


            if (wfa.IsCanSelected)
                wfa.DesignView.OnActivityActived(wfa);
            else
                wfa.designView.OnActivityActived(wfa.Parent);

            e.cancelBubble = true;

        }

        wfa.Draggable = true;



    }

    wfa.DragStart = function (c, e) {

        c.AllowDrop = false;

        DBFX.Web.Controls.Context.DragObject = wfa;

        e.cancelBubble = true;

    }

    wfa.DragEnd = function (c, e) {

        c.AllowDrop = true;

        e.cancelBubble = true;

    }

    wfa.E2CActivity = function (v)
    {
        if (wfa.OrgHeight == undefined || (v == false || v == "false"))
        {
            wfa.OrgHeight = "";// wfa.Height;
            wfa.Height = wfa.HeaderPanel.VisualElement.clientHeight + "px";
            wfa.ItemsPanel.Display = "none";
            wfa.ECButton.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/c.png";
            wfa.expanded = false;

        }
        else {

            wfa.ItemsPanel.Display = "block";
            wfa.Height = wfa.OrgHeight;
            wfa.ECButton.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/e.png";
            wfa.OrgHeight = undefined;
            wfa.expanded = true;
        }
    }

    //执行设置方法
    wfa.Setting = function (e) {



    }

    wfa.AddControl = function (c) {

        wfa.ItemsPanel.AddControl(c);

    }

    Object.defineProperty(wfa, "HideHeaderBar", {
        get: function () {

            return (wfa.HeaderPanel.Display=="none");

        }, set: function (v) {
            if (v == true)
                wfa.HeaderPanel.Display = "none";
            else
                wfa.HeaderPanel.Display = "";
        }
    });

    Object.defineProperty(wfa, "HideSettingButton", {
        get: function () {

            return (wfa.SettingButton.Display == "none");

        }, set: function (v) {
            if (v == true)
                wfa.SettingButton.Display = "none";
            else
                wfa.SettingButton.Display = "";
        }
    });

    Object.defineProperty(wfa, "HideAnnotateButton", {
        get: function () {

            return (wfa.AnnotateButton.Display == "none");

        }, set: function (v) {
            if (v == true)
                wfa.AnnotateButton.Display = "none";
            else
                wfa.AnnotateButton.Display = "";
        }
    });


    Object.defineProperty(wfa, "HideECButton", {
        get: function () {

            return (wfa.ECButton.Display == "none");

        }, set: function (v) {
            if (v == true) {
                wfa.ECButton.Display = "none";

            }
            else {
                wfa.ECButton.Display = "";
            }
        }
    });

    wfa.expanded = true;
    Object.defineProperty(wfa, "Expanded", {
        get: function () {

            return (wfa.expanded);

        }, set: function (v) {
            if (v==true || v == "true")
                wfa.expanded = true;
            else
                wfa.expanded = false;

            if (!wfa.expanded) {

                wfa.E2CActivity(v);
            }

        }
    })


    wfa.SetText = function (v) {
        wfa.TextSpan.Text = v;
        if(wfa.OnPropertyChanged!=undefined)
            wfa.OnPropertyChanged("Text", wfa.TextSpan.Text);
    }


    wfa.GetText = function (v) {

        return wfa.TextSpan.Text;

    }

    Object.defineProperty(wfa, "Annotate", {
        get: function () {
            return wfa.annotate;
        },
        set: function (v) {

            wfa.annotate = v;

            if (wfa.annotate.length > 10)
                wfa.AnnotateButton.Opacity = 0.5;
            wfa.OnPropertyChanged("Annotate", wfa.annotate);
        }
    });

    Object.defineProperty(wfa, "ImageUrl", {
        get: function () {
            return wfa.Image.ImageUrl;
        },
        set: function (v) {

            wfa.Image.ImageUrl = v;

        }
    });

    Object.defineProperty(wfa, "ObjImageUrl", {
        get: function () {

            return wfa.ImageUrl;

        }
    });

    Object.defineProperty(wfa, "Actived", {
        get: function () {
            return wfa.actived;
        },
        set: function (v) {
            wfa.actived = v;
            if (v) {
                wfa.HeaderPanel.Class = "VDE_Design_WFView_ActivityHeaderActived";
            }
            else {
                wfa.HeaderPanel.Class = "VDE_Design_WFView_ActivityHeader";
            }

            wfa.SetActived(v);
        }
    });

    wfa.SetActived = function (v) {


    }

    Object.defineProperty(wfa, "DesignView", {
        get: function () {
            return wfa.designView;
        },
        set: function (v) {
            wfa.designView = v;
            wfa.SetDesignView(v);
        }
    });

    wfa.SetDesignView = function (dv) {

    }

    wfa.ToCode = function (sw) {

    }

    wfa.OnCreateHandle();

    return wfa;
}

//占位符号
DBFX.Design.WFActivities.PlaceHolder = function () {

    var ph = new DBFX.Web.Controls.Control("PlaceHolder");
    ph.OnCreateHandle();
    ph.OnCreateHandle = function () {

        ph.Class = "VDE_Design_WFView_PlaceHolder";
        ph.VisualElement.innerHTML = "<IMG src=\"\" class=\"VDE_Design_WFView_PlaceHolderTag\"></IMG><DIV class=\"VDE_Design_WFView_PlaceHolderBar\"></DIV><IMG class=\"VDE_Design_WFView_PlaceHolderTagOver\"></IMG><SPAN class=\"VDE_Design_WFView_PlaceHolderSpan\"></SPAN>";
        ph.PlaceTag = ph.VisualElement.querySelector("IMG.VDE_Design_WFView_PlaceHolderTag");
        ph.PlaceTag.src = "design/themes/" + app.CurrentTheme + "/images/wfdesignview/placeholder.png";

        ph.PlaceTag1 = ph.VisualElement.querySelector("IMG.VDE_Design_WFView_PlaceHolderTagOver");
        ph.PlaceTag1.src = "design/themes/" + app.CurrentTheme + "/images/wfdesignview/placeholder.png";

        ph.PlaceBar = ph.VisualElement.querySelector("DIV.VDE_Design_WFView_PlaceHolderBar");

        ph.PlaceSpan = ph.VisualElement.querySelector("SPAN.VDE_Design_WFView_PlaceHolderSpan");

        ph.VisualElement.allowDrop = true;
        ph.PlaceTag.allowDrop = true;
        ph.PlaceBar.allowDrop = true;
        ph.PlaceTag1.allowDrop = true;
    }

    ph.DragOver = function (sender,e) {


        ph.PlaceTag1.style.display = "inline-block";
        ph.PlaceBar.style.display = "block";
        e.preventDefault();
        e.cancelBubble = true;


    }

    ph.DragLeave = function (sender,e) {

        var rc = ph.VisualElement.getBoundingClientRect();
        if (event.clientX<rc.left || event.clientY<rc.top || event.clientX>rc.right || event.clientY>rc.bottom) {
            ph.PlaceTag1.style.display = "none";
            ph.PlaceBar.style.display = "none";
        }
        e.cancelBubble = true;
        e.preventDefault();
    }

    ph.DragDrop = function (sender,e) {

        ph.PlaceTag1.style.display = "none";
        ph.PlaceBar.style.display = "none";
        e.preventDefault();

        //创建活动实例/加入设计器
        if (event.ctrlKey) {  //复制节点

            DBFX.Web.Controls.Context.DragObject = ph.Parent.DesignView.CloneActivity(DBFX.Web.Controls.Context.DragObject);

        }
        ph.Parent.OnActivityPlaced(DBFX.Web.Controls.Context.DragObject, ph);

        ph.PlaceSpan.style.display = "none";
        e.cancelBubble = true;
        e.preventDefault();

    }


    ph.SetText = function (v) {
        ph.PlaceSpan.innerText = v;
        if (v == "")
            ph.PlaceSpan.style.display = "none";
        else
            ph.PlaceSpan.style.display = "block";
    }


    ph.OnCreateHandle();

    return ph;

}

//************************************************************************************************************
//*** 流程控制
//************************************************************************************************************
//执行系列
DBFX.Design.WFActivities.Sequence = function (dv) {

    var wfseq = new DBFX.Design.WFActivities.Activity("Sequence");
    wfseq.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.SequenceSerializer";
    wfseq.Activities = new Array();
    wfseq.ActivitiesPanel = wfseq.ItemsPanel;

    wfseq.OnCreateHandle = function ()
    {

        wfseq.Class = "VDE_Design_WFView_Sequence";
        wfseq.designView = dv;
        wfseq.VisualElement.appendChild(wfseq.ActivitiesPanel.VisualElement);
        wfseq.ActivitiesPanel.Class = "VDE_Design_WFView_SequencePanel";

        var ph = new DBFX.Design.WFActivities.PlaceHolder();
        ph.Text = "在此处放置活动";
        wfseq.ActivitiesPanel.AddControl(ph);
        ph.Parent = wfseq;
        ph.DesignView = wfseq.designView;

        wfseq.HeaderPanel.BackgroundColor = "lightblue";
        wfseq.Text = "执行序列";

        wfseq.HideSettingButton = true;
        wfseq.HideECButton = false;


    }


    wfseq.OnActivityPlaced = function (titem,ta) {

        //移动活动位置
        if (titem.GetType!=undefined && titem.IsWFActivity!=undefined) {

            var a = titem;
            if (a.Parent != undefined)
                a.Parent.Remove(a);
            else
                a.Parent = wfseq;

            a.DesignView = wfseq.DesignView;

            wfseq.InsertActivity(a, ta);

        }
        else {
            var act = DBFX.Design.DesignView.CreateControlInstance(titem);
            if (act != undefined && act != null) {
                wfseq.InsertActivity(act, ta);
            }
            else {
                DBFX.Web.Forms.MessageBox.Show("未能创建活动实例，请检查注册信息是否正确！", "流程计器", function (r) {

                    if (r == 1) {




                    }

                }, 0);
            }
        }



    }

    wfseq.InsertPlaceHolder = function (h) {

        var ph = new DBFX.Design.WFActivities.PlaceHolder();
        ph.DesignView = wfseq.designView;
        wfseq.ActivitiesPanel.InsertControl(ph, h, 1);
        ph.Parent = wfseq;

        return ph;
    }


    wfseq.InsertActivity = function (a, ta) {


        wfseq.ActivitiesPanel.FormContext = wfseq.FormContext;

        //确定相邻的活动
        var idx = wfseq.ActivitiesPanel.Controls.indexOf(ta)+1;


        var sa = wfseq.ActivitiesPanel.Controls[idx];

        //
        a.DesignView = wfseq.DesignView;
        //
        wfseq.ActivitiesPanel.InsertControl(a, ta, 1);

        //加入换行符
        a.BreakLine = new DBFX.Web.Controls.BreakLine();

        //
        wfseq.ActivitiesPanel.InsertControl(a.BreakLine, a, 1);
        //
        a.PlaceHolder = wfseq.InsertPlaceHolder(a.BreakLine);
        //

        wfseq.DesignView.IsContentChanged = true;

        if (sa != undefined)
            wfseq.Activities.Insert(a, sa);
        else
            wfseq.Activities.Add(a);

        a.Parent = wfseq;

    }

    wfseq.Remove=function(a)
    {

        wfseq.ActivitiesPanel.Remove(a.BreakLine);
        wfseq.ActivitiesPanel.Remove(a.PlaceHolder);
        wfseq.ActivitiesPanel.Remove(a);

        if (wfseq.ActivitiesPanel.Controls.length == 1) {

            wfseq.ActivitiesPanel.Controls[0].Text = "在此处放置活动";
        }

        wfseq.Activities.Remove(a);

    }

    wfseq.Clear = function () {

        wfseq.Activities.Clear();
        wfseq.ActivitiesPanel.Clear();

        //
        var ph = new DBFX.Design.WFActivities.PlaceHolder();
        ph.Text = "在此处放置活动";
        wfseq.ActivitiesPanel.AddControl(ph);
        ph.Parent = wfseq;
        ph.DesignView = wfseq.designView;

    }

    wfseq.AddActivity = function (a) {

        wfseq.ActivitiesPanel.FormContext = wfseq.FormContext;
        var idx=wfseq.ActivitiesPanel.Controls.length;

        var ta = wfseq.ActivitiesPanel.Controls[idx-1];


        if (idx ==1) {
            ta.Text = "";
        }

        ta = undefined;


        //
        a.DesignView = wfseq.DesignView;
        //
        wfseq.ActivitiesPanel.InsertControl(a, ta, 1);

        //加入换行符
        a.BreakLine = new DBFX.Web.Controls.BreakLine();

        //
        wfseq.ActivitiesPanel.InsertControl(a.BreakLine, a, 1);
        //
        a.PlaceHolder = wfseq.InsertPlaceHolder(a.BreakLine);
        //
        a.VisualElement.scrollIntoView();

        wfseq.Activities.Add(a);

        a.Parent = wfseq;

    }

    wfseq.SetActived = function (v) {

    }

    wfseq.SetDesignView = function (v) {
        wfseq.designView = v;
    }

    wfseq.OnCreateHandle();

    //生成代码
    wfseq.ToCode = function (sw) {

        for (var i = 0; i < wfseq.Activities.length; i++) {

            wfseq.Activities[i].ToCode(sw);

        }

    }

    return wfseq;

}
//*********************************************************************
//条件判断视图
DBFX.Design.WFActivities.IFBranch = function () {

    var ifb = new DBFX.Design.WFActivities.Activity("IFBranch");
    ifb.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.IFBranchSerializer";
    ifb.CExpressions = new Array();
    ifb.OnCreateHandle = function () {

        ifb.Text = "条件判断";
        ifb.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranch.png";
        //条件表达式
        ifb.CEBuilder = new DBFX.Design.WFActivities.CExpressionBuilder();// new DBFX.Web.Controls.GroupPanel("条件表达式:");
        ifb.CEBuilder.Draggable = false;
        ifb.CEBuilder.Margin = "6px 4px 0px 4px";
        ifb.AddControl(ifb.CEBuilder);
        ifb.CEBuilder.Activity = ifb;
        ifb.CEBuilder.CExpressions = ifb.CExpressions;

        ifb.ClientPanel = new DBFX.Web.Controls.Panel();
        ifb.ClientPanel.Class = "VDE_Design_WFView_IFBranchClientPanel";
        ifb.AddControl(ifb.ClientPanel);

        //加入条件系列 真值表达式
        ifb.TrueSequence = new DBFX.Design.WFActivities.Sequence(ifb.DesignView);
        ifb.TrueSequence.Draggable = false;
        ifb.TrueSequence.Text = "条件成立"
        ifb.TrueSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
        ifb.TrueSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
        ifb.TrueSequence.Display = "table-cell";
        ifb.TrueSequence.VAlign="top";
        ifb.TrueSequence.HideECButton = false;
        ifb.TrueSequence.IsHasContextMenu = false;
        ifb.TrueSequence.Parent = ifb;
        ifb.ClientPanel.AddControl(ifb.TrueSequence);

        //中间分割
        ifb.Separator = new DBFX.Web.Controls.Label("");
        ifb.Separator.Width = "8px";
        ifb.Separator.Display = "table-cell";
        ifb.ClientPanel.AddControl(ifb.Separator);

        //加入条件系列 假值表达式
        ifb.FalseSequence = new DBFX.Design.WFActivities.Sequence(ifb.DesignView);
        ifb.FalseSequence.Draggable = false;
        ifb.FalseSequence.Text = "条件不成立"
        ifb.FalseSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
        ifb.FalseSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
        ifb.FalseSequence.Display = "table-cell";
        ifb.FalseSequence.VAlign="top";
        ifb.FalseSequence.HideECButton = false;
        ifb.FalseSequence.IsHasContextMenu = false;
        ifb.FalseSequence.Parent = ifb;
        ifb.ClientPanel.AddControl(ifb.FalseSequence);
    }

    ifb.SetDesignView = function (dv) {
        ifb.TrueSequence.DesignView = dv;
        ifb.FalseSequence.DesignView = dv;
    }


    Object.defineProperty(ifb, "CExpressionsStr", {
        get: function () {

            return ifb.cExpressionsStr;

        },
        set: function (v) {

            ifb.cExpressionsStr = v;
            if (ifb.cExpressionsStr != undefined && ifb.cExpressionsStr != null && ifb.cExpressionsStr != "") {
                ifb.CExpressions = JSON.parse(ifb.cExpressionsStr);
                ifb.CEBuilder.CExpressions = ifb.CExpressions;
            }

        }
    });


    ifb.HideECButton = false;
    ifb.OnCreateHandle();

    ifb.ToCode = function (sw) {

        //{ VarName: "Var1", MatchSymbol: "=", Value: "", LogicalLinker: "&&", StartGroup: false, EndGroup: false, StarGroupText: "", EndGroupText: "" }
        var cestr = "";
        var llstr = "";
        ifb.CEBuilder.CExpressions.forEach(function (ce) {

            cestr += llstr;
            if ((ce.StartGroup == "true" || ce.StartGroup != false))
                cestr += "(";

            if (ce.MatchSymbol != "")
            {
                var msymbol = ce.MatchSymbol;
                if (msymbol.indexOf("%") >= 0) {
                    if (msymbol == "{%") {
                        cestr += ce.VarName + ".indexOf(" + DBFX.Design.WFActivities.ParsingVar(ce.Value) + ")==0";
                    }

                    if (msymbol == "{%}") {
                        cestr += ce.VarName + ".indexOf(" + DBFX.Design.WFActivities.ParsingVar(ce.Value) + ")>=0";
                    }

                    if (msymbol == "%}") {
                        var kv = DBFX.Design.WFActivities.ParsingVar(ce.Value);
                        cestr += ce.VarName + ".indexOf(" + kv + ")==("+ce.VarName+".length-"+kv+".length)";
                    }
                }
                else {
                    cestr += ce.VarName + ce.MatchSymbol + DBFX.Design.WFActivities.ParsingVar(ce.Value);
                }
            }
            else
                cestr += ce.VarName;

            if (ce.EndGroup == "true" || ce.EndGroup != false)
                cestr += ")";

            llstr = ce.LogicalLinker;

        });

        //var code = "if("+cestr+"){\n   " + ifb.TrueSequence.ToCode() + "   }\n else {\n   " + ifb.FalseSequence.ToCode() + "}";

        sw.AddLine("if(" + cestr + "){",4);
        ifb.TrueSequence.ToCode(sw);
        sw.AddLine("}", -4);

        //判断是否需要生成Else
        if (ifb.FalseSequence.Activities.length > 0) {
            sw.AddLine("else {", 4);
            ifb.FalseSequence.ToCode(sw);
            sw.AddLine("}", -4);
        }

    }

    return ifb;

}

//枚举循环
DBFX.Design.WFActivities.ForEach = function () {

    var afore = new DBFX.Design.WFActivities.Activity("ForEach");
    afore.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ForEachSerializer";
    afore.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ForEachDesigner");
    afore.Text = "枚举循环";
    afore.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/foreach.png";
    afore.Sequence = new DBFX.Design.WFActivities.Sequence(afore.DesignView);
    afore.Sequence.HideHeaderBar = true;
    afore.Sequence.Margin = "0px";
    afore.Sequence.BorderWidth = "0px";
    afore.AddControl(afore.Sequence);
    afore.HideECButton = false;
    afore.Sequence.Parent = afore;
    afore.arrayObject = true;
    afore.SetDesignView = function (v) {

        afore.Sequence.DesignView = v;
    }

    afore.itemsMember = "";
    Object.defineProperty(afore, "ItemsMember", {
        get: function () {

            return afore.itemsMember;

        },
        set: function (v) {
            afore.itemsMember = v;
        }
    });

    afore.itemName = "item";
    Object.defineProperty(afore, "ItemName", {
        get: function () {

            return afore.itemName;

        },
        set: function (v) {
            afore.itemName = v;
        }
    });

    afore.arrayObject = true;
    Object.defineProperty(afore, "ArrayObject", {
        get: function () {

            return afore.arrayObject;

        },
        set: function (v) {
            if (v == false || v == "false")
                v = false;
            else
                v = true;

            afore.arrayObject = v;
        }
    });



    afore.ToCode = function (sw) {

        if (afore.ArrayObject==true) {
            sw.AddLine(afore.itemsMember + ".forEach(function(" + afore.itemName + "){", 4);
            afore.Sequence.ToCode(sw);
            sw.AddLine("});", -4);
        }
        else {

            sw.AddLine("for(var " + afore.itemName + " in  " + afore.itemsMember + "){", 4);
            sw.AddLine("if(Object.prototype[" + afore.itemName + "]!=undefined)", 4);
            sw.AddLine("continue;");
            sw.AddLine(" ", -4);
            afore.Sequence.ToCode(sw);
            sw.AddLine("}", -4);
        }

    }

    return afore;

}

//条件循环
DBFX.Design.WFActivities.While = function () {

    var awh = new DBFX.Design.WFActivities.Activity("While");
    awh.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.WhileSerializer";
    awh.Text = "条件循环";
    awh.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/while.png";

    //条件表达式
    awh.CExpressions = new Array();
    awh.CEBuilder = new DBFX.Design.WFActivities.CExpressionBuilder();// new DBFX.Web.Controls.GroupPanel("条件表达式:");
    awh.CEBuilder.Draggable = false;
    awh.CEBuilder.Margin = "6px 4px 0px 4px";
    awh.AddControl(awh.CEBuilder);
    awh.CEBuilder.Activity = awh;
    awh.CEBuilder.CExpressions = awh.CExpressions;

    awh.Sequence = new DBFX.Design.WFActivities.Sequence(awh.DesignView);
    awh.Sequence.Draggable = false;
    awh.Sequence.HideHeaderBar = true;
    awh.Sequence.Margin = "0px";
    awh.Sequence.BorderWidth = "0px";
    awh.AddControl(awh.Sequence);
    awh.HideECButton = false;
    awh.Sequence.Parent = awh;
    awh.SetDesignView = function (dv) {
        awh.Sequence.DesignView = dv;
    }

    Object.defineProperty(awh, "CExpressionsStr", {
        get: function () {

            return awh.cExpressionsStr;

        },
        set: function (v) {

            awh.cExpressionsStr = v;
            if(awh.cExpressionsStr!=undefined && awh.cExpressionsStr!=null && awh.cExpressionsStr!="")
            {
                awh.CExpressions=JSON.parse(awh.cExpressionsStr);
                awh.CEBuilder.CExpressions = awh.CExpressions;

            }

        }
    });

    awh.ToCode = function (sw) {
        var cestr = "";
        var llstr = "";
        awh.CEBuilder.CExpressions.forEach(function (ce) {

            cestr += llstr;
            if ((ce.StartGroup == "true" || ce.StartGroup!=false))
                cestr += "(";

            cestr += ce.VarName + ce.MatchSymbol + DBFX.Design.WFActivities.ParsingVar(ce.Value);


            if (ce.EndGroup == "true" || ce.EndGroup!=false)
                cestr += ")";

            llstr = ce.LogicalLiker;

        });

        sw.AddLine("while(" + cestr + ")");
        sw.AddLine("{", 4);
        awh.Sequence.ToCode(sw);
        sw.AddLine("}", -4);


    }

    return awh;


}

//计数循环
DBFX.Design.WFActivities.For = function () {

    var afor = new DBFX.Design.WFActivities.Activity("For");
    afor.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ForSerializer";
    afor.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ForDesigner");
    afor.Text = "计数循环";
    afor.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/for.png";
    afor.initValue = 0;
    afor.limitValue = 0;
    afor.incValue = 1;

    afor.Sequence = new DBFX.Design.WFActivities.Sequence(afor.DesignView);
    afor.Sequence.HideHeaderBar = true;
    afor.Sequence.Margin = "0px";
    afor.Sequence.BorderWidth = "0px";
    afor.AddControl(afor.Sequence);
    afor.HideECButton = false;
    afor.Sequence.Parent = afor;

    afor.SetDesignView = function (v) {
        afor.Sequence.DesignView = v;
    }

    afor.initValue = "0";
    Object.defineProperty(afor, "InitValue", {
        get: function () {
            return afor.initValue;
        },
        set: function (v) {

            afor.initValue = v;

        }
    });

    afor.limitValue = "10";
    Object.defineProperty(afor, "LimitValue", {
        get: function () {
            return afor.limitValue;
        },
        set: function (v) {

            afor.limitValue = v;

        }
    });

    afor.incValue = "1";
    Object.defineProperty(afor, "IncValue", {
        get: function () {
            return afor.incValue;
        },
        set: function (v) {

            afor.incValue = v;

        }
    });

    afor.idxVar = "i";
    Object.defineProperty(afor, "IdxVar", {
        get: function () {
            return afor.idxVar;
        },
        set: function (v) {

            afor.idxVar = v;

        }
    });


    afor.isReversed =false;
    Object.defineProperty(afor, "IsReversed", {
        get: function () {
            return afor.isReversed;
        },
        set: function (v) {
            if(v==true || v=="true")
                afor.isReversed = true;
            else
                afor.isReversed = false;

        }
    });


    //编译Activity
    afor.ToCode = function (sw) {

        if (afor.isReversed==false)
            sw.AddLine("for(var " + afor.idxVar + "=" + DBFX.Design.WFActivities.ParsingVar(afor.initValue, "int") + ";" + afor.idxVar + "<" + DBFX.Design.WFActivities.ParsingVar(afor.limitValue, "int") + ";" + afor.idxVar + "=" + afor.idxVar + "+" + DBFX.Design.WFActivities.ParsingVar(afor.incValue, "int") + ")");
        else
            sw.AddLine("for(var " + afor.idxVar + "=" + DBFX.Design.WFActivities.ParsingVar(afor.initValue, "int") + ";" + afor.idxVar + ">=" + DBFX.Design.WFActivities.ParsingVar(afor.limitValue, "int") + ";" + afor.idxVar + "=" + afor.idxVar +"-"+DBFX.Design.WFActivities.ParsingVar(afor.incValue, "int") + ")");

        sw.AddLine("{", 4);
        afor.Sequence.ToCode(sw);
        sw.AddLine("}", -4);

    }

    return afor;

}

//情况选择
DBFX.Design.WFActivities.SwitchBranch = function () {

    var aswb = new DBFX.Design.WFActivities.Activity("SwitchBranch");
    aswb.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SwitchDesigner");
    aswb.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.SwitchBranchSerializer";
    aswb.Text = "分支选择";
    aswb.Index = 0;
    aswb.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/switchbranch.png";
    aswb.HideECButton = false;
    aswb.BranchSequences = new Array();
    aswb.BranchsPanel = new DBFX.Web.Controls.Panel();
    aswb.BranchsPanel.Shadow = "none";
    aswb.AddControl(aswb.BranchsPanel);

    aswb.DefaultSequence = new DBFX.Design.WFActivities.Sequence(aswb.DesignView);
    aswb.DefaultSequence.Draggable = false;
    aswb.DefaultSequence.Text = "默认处理分支";
    aswb.DefaultSequence.HideECButton = false;
    aswb.DefaultSequence.IsHasContextMenu = false;
    aswb.DefaultSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    aswb.DefaultSequence.Margin = "4px";
    aswb.DefaultSequence.BorderWidth = "1px 1px 1px 6px";
    aswb.DefaultSequence.BorderColor = "lightgray lightgray lightgray Gray";
    aswb.DefaultSequence.Height = "32px";
    aswb.AddControl(aswb.DefaultSequence);
    aswb.HideECButton = false;
    aswb.DefaultSequence.Parent = aswb;

    aswb.AddCase = function (cseq) {

        if (cseq == undefined) {
            cseq = new DBFX.Design.WFActivities.Sequence(aswb.DesignView);
        }
        cseq.Draggable = false;
        cseq.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SwitchBranchDesigner");
        cseq.HideECButton = false;
        cseq.Margin = "4px";
        cseq.BorderWidth = "1px 1px 1px 6px";
        cseq.MinHeight = "32px";
        cseq.BorderColor = "lightgray lightgray lightgray Gray";
        Object.defineProperty(cseq, "CaseValue", {
            get: function () {
                return cseq.caseValue;
            },
            set: function (v) {

                cseq.caseValue = v;
                cseq.OnPropertyChanged("CaseValue", v);

            }
        });

        cseq.HeaderPanel.BackgroundColor = "";// "rgba(225,225,225,0.1)";
        cseq.DesignView = aswb.designView;
        aswb.BranchsPanel.AddControl(cseq);
        aswb.BranchSequences.push(cseq);
        aswb.Index++;

        cseq.Parent = aswb;

        return cseq;

    }

    aswb.Remove = function (a) {

        aswb.BranchSequences.Remove(a);
        aswb.BranchsPanel.Remove(a);
    }

    aswb.selectionVar = "";
    Object.defineProperty(aswb, "SelectionVar", {
        get: function () {

            return aswb.selectionVar;
        },
        set: function (v) {

            aswb.selectionVar = v;
            aswb.OnPropertyChanged("SelectionVar", v);


        }
    });


    aswb.SetDesignView = function (v) {

        aswb.DefaultSequence.DesignView = v;
    }

    aswb.ToCode = function (sw) {

        sw.AddLine("switch(" + aswb.selectionVar + ")");
        sw.AddLine("{", 4);

        for (var i = 0; i < aswb.BranchSequences.length; i++) {

            var seq = aswb.BranchSequences[i];
            sw.AddLine("case " + DBFX.Design.WFActivities.ParsingVar(seq.caseValue) + ":", 4);
            seq.ToCode(sw);
            sw.AddLine("break;");
            sw.AddLine("", -4);


        }
        sw.AddLine("default:", 4);
        aswb.DefaultSequence.ToCode(sw);
        sw.AddLine("break;",-4);
        sw.AddLine("}", -4);
    }

    return aswb;

}

//抛出异常
DBFX.Design.WFActivities.Throw = function () {

    var athrow = new DBFX.Design.WFActivities.Activity("Throw");
    athrow.Text = "抛出异常";
    athrow.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/throw.png";
    athrow.Exception = "";

    //
    athrow.ToCode = function (sw) {


        sw.AddLine("throw(\""+athrow.Exception+"\");");

    }

    return athrow;


}

//异常处理
DBFX.Design.WFActivities.TryCatch = function () {

    var atc = new DBFX.Design.WFActivities.Activity("TryCatch");
    atc.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.TryCatchSerializer";
    atc.ClassDescriptor.Designers = [];
    atc.Text = "异常处理";
    //atc.HideHeaderBar = true;
    atc.BorderWidth = "0px";
    atc.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/trycatch.png";
    atc.TrySequence = new DBFX.Design.WFActivities.Sequence(atc.DesignView);
    atc.TrySequence.Draggable = false;
    atc.TrySequence.ClassDescriptor.Designers = [];
    atc.TrySequence.HideAnnotateButton = true;
    atc.TrySequence.Text = "Try[异常处理]";
    atc.TrySequence.HideHeaderBar = true;
    atc.TrySequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    atc.TrySequence.Margin="0px 0px 2px 0px"
    atc.TrySequence.HideECButton = false;
    atc.TrySequence.IsCanSelected = false;
    atc.TrySequence.Parent = atc;
    atc.AddControl(atc.TrySequence);

    atc.CatchSequence = new DBFX.Design.WFActivities.Sequence(atc.DesignView);
    atc.CatchSequence.Draggable = false;
    atc.CatchSequence.ClassDescriptor.Designers = [];
    atc.CatchSequence.HideAnnotateButton = true;
    atc.CatchSequence.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/trycatch.png";
    atc.CatchSequence.Text = "Catch[异常捕获]";
    atc.CatchSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    atc.CatchSequence.Margin = "2px 0px 0px 0px"
    atc.CatchSequence.HideECButton = false;
    atc.CatchSequence.IsCanSelected = false;
    atc.CatchSequence.IsHasContextMenu = false;
    atc.CatchSequence.Parent = atc;
    atc.AddControl(atc.CatchSequence);

    atc.HideECButton = false;
    atc.HideSettingButton = true;


    atc.SetDesignView = function (dv) {

        atc.TrySequence.DesignView = dv;
        atc.CatchSequence.DesignView = dv;
    }

    atc.ToCode = function (sw) {

        sw.AddLine("try");
        sw.AddLine("{", 4);
        atc.TrySequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("catch(ex)");
        sw.AddLine("{", 4);
        atc.CatchSequence.ToCode(sw);
        sw.AddLine("}", -4);


    }


    return atc;


}

//
DBFX.Design.WFActivities.CExpressionBuilder = function () {

    var ceb = new DBFX.Design.WFActivities.Activity("CExpressionBuilder");
    ceb.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.CEBuilderDesigner");
    ceb.Display = "block";
    ceb.Margin = "4px";
    ceb.ItemsPanel.FormContext = new Object();
    ceb.ItemsPanel.FormControls = new Object();
    ceb.ItemsPanel.FormContext.Form = ceb.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/CExpressionBuilder.scrp", function (cebp) {

        ceb.lvwExpressions = cebp.FormControls.lvwExpressions;
        ceb.lvwExpressions.ItemSource = ceb.cExpressions;

        //点击表达式
        ceb.lvwExpressions.ItemClick = function (e, item) {

            item.Activity = ceb;
            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.CExpressionDesigner"];
            item.ObjType = "CExpression";
            ceb.DesignView.ObjectEditor.ObjectSelected(item);

        }

        ceb.DesignView = ceb.Activity.DesignView;


    }, ceb.ItemsPanel);

    ceb.Text = "表达式：";
    //添加表达式
    ceb.AddCExpression = function () {

        var expr = { VarName: "Var1", MatchSymbol: " == ", Value: "", LogicalLinker: " && ", StartGroup: false, EndGroup: false, StarGroupText: "", EndGroupText: "" };
        ceb.CExpressions.Add(expr);
        ceb.lvwExpressions.ItemSource = ceb.cExpressions;
        ceb.lvwExpressions.SelectedItem=ceb.lvwExpressions.Controls[ceb.cExpressions.length-1];

    }

    //删除表达式
    ceb.RemoveCExpression = function () {

        var idx = -1;
        if (ceb.lvwExpressions.selectedItem != undefined) {

            idx = ceb.cExpressions.IndexOf(ceb.lvwExpressions.selectedItem.dataContext);

            ceb.cExpressions.Remove(ceb.lvwExpressions.selectedItem.dataContext);

            ceb.lvwExpressions.ItemSource=ceb.cExpressions;
            if (idx > 0)
                ceb.lvwExpressions.SelectedItem = ceb.lvwExpressions.Controls[idx - 1];

        }

        if (ceb.cExpressions.length == 0) {

            ceb.DesignView.ObjectEditor.ObjectSelected(ceb.Activity);
        }

    }

    Object.defineProperty(ceb, "CExpressions", {
        get: function () {
            return ceb.cExpressions;
        },
        set: function (v) {

            ceb.cExpressions = v;
            if(ceb.lvwExpressions!=undefined)
                ceb.lvwExpressions.ItemSource = v;

        }
    });

    ceb.GetLogicalExpression = function () {


        return "";
    }

    ceb.DataContextChanged = function (e) {

        ceb.dataContext = e.Value;
    }

    ceb.DataBind = function (e)
    {

    }

    ceb.ItemsPanel.DataBind = function (e) {


    }

    ceb.HideECButton = false;
    ceb.HideSettingButton = true;
    ceb.HideAnnotateButton = true;
    return ceb;
}

DBFX.Design.WFActivities.ParameterBuilder = function () {

    var pab = new DBFX.Design.WFActivities.Activity("ParameterBuilder");
    pab.Draggable = false;
    pab.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.ParameterBuilderDesigner"];
    pab.Display = "block";
    pab.Margin = "4px";
    pab.ItemsPanel.FormContext = new Object();
    pab.ItemsPanel.FormControls = new Object();
    pab.ItemsPanel.FormContext.Form = pab.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ParameterBuilder.scrp", function (pabb) {

        pab.lvwParameters = pabb.FormControls.lvwParameters;
        pab.lvwParameters.ItemSource = pab.parameters;

        //点击表达式
        pab.lvwParameters.ItemClick = function (e, item) {

            item.Activity = pab;
            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.ParameterDesigner"];
            item.ObjType = "Parameter";
            pab.DesignView.ObjectEditor.ObjectSelected(item);

        }


    }, pab.ItemsPanel);

    pab.Text = "参数列表";
    //添加表达式
    pab.AddParameter = function () {

        var pa = { "ParameterName": "Para1", "DefaultValue": "", "DataType": "string", "Description": "" };
        pa.Activity = pab;
        pab.parameters.Add(pa);
        pab.lvwParameters.ItemSource = pab.parameters;
        pab.lvwParameters.SelectedItem = pab.lvwParameters.Controls[pab.parameters.length - 1];

    }

    //删除表达式
    pab.RemoveParameter = function () {

        var idx = -1;
        if (pab.lvwParameters.selectedItem != undefined) {

            idx = pab.parameters.IndexOf(pab.lvwParameters.selectedItem.dataContext);

            pab.parameters.Remove(pab.lvwParameters.selectedItem.dataContext);

            pab.lvwParameters.ItemSource = pab.parameters;
            if (idx > 0)
                pab.lvwParameters.SelectedItem = pab.lvwParameters.Controls[idx - 1];

        }

        if (pab.parameters.length == 0) {

            pab.DesignView.ObjectEditor.ObjectSelected(pab.Activity);
        }

    }

    pab.parameters = [];
    Object.defineProperty(pab, "Parameters", {
        get: function () {
            return pab.lvwParameters.ItemSource;
        },
        set: function (v) {

            pab.parameters = v;
            if (pab.lvwParameters != undefined)
                pab.lvwParameters.ItemSource = v;

        }
    });



    pab.parametersStr = "";
    Object.defineProperty(pab, "ParametersStr", {
        get: function () {
            var pas = new Array();
            pab.lvwParameters.ItemSource.forEach(function (pa) {

                var npa = new Object();

                npa.ParameterName = pa.ParameterName;
                npa.DefaultValue = pa.DefaultValue;
                npa.DataType = pa.DataType;
                npa.Description = pa.Description;

                pas.push(npa);

            });

            return JSON.stringify(pas);

        },
        set: function (v) {

            pab.parametersStr = v;

            if (pab.parametersStr != undefined && pab.parametersStr != "") {

                pab.Parameters = JSON.parse(pab.parametersStr);

                if (pab.lvwParameters != undefined)
                    pab.lvwParameters.ItemSource = pab.Parameters;

            }


        }
    });


    pab.DataContextChanged = function (e) {

        pab.dataContext = e.Value;
    }

    pab.DataBind = function (e) {

    }

    pab.ItemsPanel.DataBind = function (e) {


    }

    pab.HideECButton = false;
    pab.HideSettingButton = true;
    pab.HideAnnotateButton = true;
    return pab;
}

DBFX.Design.ActivityDesigners.ParameterBuilderDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ParametersBuilderDesigner.scrp", function (od) {

            od.FormContext.Form.FormControls.btnAddPara.Click = obdc.AddParameter;



        }, obdc);


    }

    obdc.AddParameter = function (cmd) {

        obdc.dataContext.AddParameter();

    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);
        if (obdc.dataContext != undefined) {

            obdc.ParaDef = obdc.dataContext.ParaDef;

        }

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "参数列表定义";
    return obdc;

}

DBFX.Design.ActivityDesigners.ParameterDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ParameterDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            obdc.AddButton = obdc.FormContext.Form.FormControls.btnAddPara;
            obdc.DelButton = obdc.FormContext.Form.FormControls.btnDelPara;
            obdc.AddButton.Click = function (e, btn) {

                var pa = { ParameterName: "Para" + (obdc.ParaDef.Parameters.length + 1), DataType: "string", DefaultValue: "" };
                obdc.ParaDef.Parameters.Add(pa);
                obdc.ParaDef.lvwParameters.ItemSource = obdc.ParaDef.Parameters;
                obdc.ParaDef.DesignView.ObjectEditor.ObjectSelected(obdc.ParaDef);
            }

            obdc.DelButton.Click = function (e, btn) {

                if (obdc.ParaDef.lvwParameters.selectedItem != undefined) {

                    obdc.ParaDef.Parameters.Remove(obdc.ParaDef.lvwParameters.selectedItem.dataContext);
                    obdc.ParaDef.lvwParameters.ItemSource = obdc.ParaDef.Parameters;
                    obdc.ParaDef.lvwParameters.selectedItem = undefined;

                    obdc.ParaDef.DesignView.ObjectEditor.ObjectSelected(obdc.ParaDef);
                }
            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);
        if (obdc.dataContext != undefined) {

            obdc.ParaDef = obdc.dataContext.Activity;

        }

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "参数属性设置";
    return obdc;


}