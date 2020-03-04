DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Design.Service");

//报表设计器
DBFX.Design.ReportDesignView = function () {

    var rptView = new DBFX.Web.Controls.Control("ReportDesigner");
    rptView.ClassDescriptor.Serializer = "";
    rptView.ClassDescriptor.Designers = ["DBFX.Design.ControlDesigners.ReportViewDesigner"];
    rptView.ObjType = "ReportViewDesigner";
    rptView.OnCreateHandle();
    rptView.VisualElement.className = "VDE_Design_ReportView";
    rptView.VisualElement.innerHTML = "<DIV  class=\"VDE_Design_ReportViewHorRuler\"></DIV><DIV  class=\"VDE_Design_ReportViewVerRuler\"></DIV><DIV class=\"VDE_Design_ReportViewClient\"></DIV>";
    rptView.ClientDiv = rptView.VisualElement;
    rptView.ReportViewClient = rptView.VisualElement.querySelector("DIV.VDE_Design_ReportViewClient");
    rptView.DesignView = new DBFX.Design.DesignView();
    rptView.DesignView.Top = "0px";
    rptView.DesignView.Left = "0px";
    rptView.DesignView.Right = "0px";
    rptView.DesignView.Bottom = "0px";
    rptView.DesignView.Position = "absolute";
    rptView.ReportViewClient.appendChild(rptView.DesignView.VisualElement);
    rptView.DesignView.ContextMenu = "VDE_Design_DesignViewContextMenu";
    rptView.IsContentChanged = false;;
    rptView.pageSetting = new DBFX.Web.ReportControls.PageSetting("A4", "21cm", "29.7cm");
    rptView.DesignView.FormControls = new Object();
    rptView.DesignView.FormContext = new Object();
    rptView.DesignView.FormContext.Form = rptView.DesignView;
    rptView.Pages = [];

    rptView.DataBind = function (v) {

        rptView.DesignView.DataContext = v.Value;

    }

    rptView.DesignView.ContentChanged = function (c) {

        rptView.IsContentChanged = true;


    }

    rptView.SetText = function (v) {

    }

    rptView.GetText = function () {


    }

    rptView.AddControl = function (c) {

        c.DesignView=rptView.DesignView;
        c.DesignTime=true;
        rptView.DesignView.AddControl(c);
    }

    //添加页面
    rptView.AddPage = function (page) {

        if (page == undefined) {

            page = new DBFX.Web.ReportControls.ReportPage();
            var ps = new DBFX.Web.ReportControls.PageSetting(rptView.PageSetting.PaperKind, rptView.PageSetting.Width, rptView.PageSetting.Height);
            page.PageSetting = ps;
        }
        
        page.ReportDesignViewHost=rptView;
        rptView.Pages.Add(page);
        rptView.AddControl(page);
        
        return page;
    }

    //移除页面
    rptView.RemovePage = function (page) {

        rptView.Pages.Remove(page);
        rptView.DesignView.RemoveControl(page);

    }

    //清除页面
    rptView.ClearePage = function () {


    }

    Object.defineProperty(rptView, "PageSetting", {
        get: function () {
            return rptView.pageSetting;
        },
        set: function (v) {

            rptView.pageSetting = v;
        }
    });


    rptView.drawingViewScale = 100;
    Object.defineProperty(rptView, "ReportDesignerScale", {
        get: function () {
            return rptView.drawingViewScale;
        },
        set: function (v) {
            rptView.drawingViewScale = v;
            rptView.DesignView.ZoomScale = (v / 100.0);
            rptView.ScaleView((v / 100.0));
        }
    });

    //比例
    rptView.ScaleView = function (scale) {


        rptView.VisualElement.style.transform = "scale(" + scale + ")";
        rptView.VisualElement.style.transformOrigin = "0px 0px";

    }

    //保存报表JSON文档
    rptView.SaveReport = function () {

        var rdlobj = {Title:rptView.dataContext.Title};

        var serializer = new DBFX.Design.ReportViewSerializer();

        serializer.Serialize(rptView, rdlobj);



        return rdlobj;

    }

    //加载报表JSON文档
    rptView.LoadReport = function (rdldata) {

        if (rdldata != "") {

            var rdlobj = JSON.parse(rdldata);
            var serializer = new DBFX.Design.ReportViewSerializer();
            serializer.DeSerialize(rptView, rdlobj);

        }
        else {

            rptView.AddPage();

        }
    }

    rptView.MouseDown = function (e) {

        rptView.DesignView.OnObjectSelected(rptView);


    }

 
    rptView.ResizeCompleted = function (e) {


    }

    return rptView;

}

DBFX.Design.ReportViewSerializer = function () {

    this.DeSerialize = function (rptview,rdlobj) {

        rptview.DefaultPaper=rdlobj.DefaultPaper;
        if(rdlobj.NS!=undefined)
            rptview.DesignView.NS=rdlobj.NS;
        rdlobj.Pages.forEach(function(pageObj)
        {
            
            var rptPage=rptview.AddPage();
            var s=DBFX.Serializer.Serializers.GetSerializer(rptPage.ClassDescriptor);
            s.DeSerialize(rptPage,pageObj,rdlobj.NS);

        });

    }

    this.Serialize = function (rptview, rdlobj)
    {

        rdlobj.DefaultPaper=rptview.DefaultPaper;
        rdlobj.Pages=[];
        rptview.Pages.forEach(function(rptPage)
        {
            var rdlpage={};
            var s=DBFX.Serializer.Serializers.GetSerializer(rptPage.ClassDescriptor);
            s.Serialize(rptPage,rdlpage);
            rdlobj.Pages.Add(rdlpage);

        });
        
        rdlobj.NS=rptview.DesignView.NS;

    }


}

//报表设计器视图
DBFX.Design.Service.LauchReportDesignView = function (dvi, cb) {

    if (app.MainForm.FormControls.ActivedDockManager.ActiveContent(dvi.Name) == null) {
        var fp = new DBFX.Web.Forms.FormPart("Design/Forms/ReportDesignView.scrn", function (form)
        {

            //加载工具箱
            form.FormControls.VDE_DV_ToolkitBox.LoadTKItems("LC.GAS.ADP.DesignerObjects.Tooltiks.ReportViewCollection");

            //
            form.FormControls.VDE_DV_ObjectEditor.Initialize(form.FormControls.VDE_DV_DesignView.DesignView);


            //加载资源数据
            fp.ResourceLoaded = function (dvi, jsondoc)
            {

                form.FormControls.VDE_DV_DesignView.DataContext=dvi;
                form.FormControls.VDE_DV_DesignView.LoadReport(jsondoc);


            }
            
            //回调
            cb(fp);

        });

        fp.ResourceContext = dvi;
        app.MainForm.FormControls.ActivedDockManager.AddContent(dvi.Title, fp, 3, dvi.Name);

    }


}

//关闭设计器
DBFX.Design.FormView.ReportViewClose = function (e) {

    var form = e.Sender.FormContext.Form;
    if (form.FormControls.VDE_DV_DesignView.IsContentChanged == true) {

        DBFX.Web.Forms.MessageBox.Show("文档内容发生改变，要放弃保存更改,关闭窗口吗?", "深蓝砚台开发者中心", function (r) {

            if (r == 1) {


                form.ContentWindow.Close();

            }

        }, 1);

    }
    else {

        form.ContentWindow.Close();
    }
}
app.GlobalCommands.Register("VDE_Design_ReportView_FormClose", DBFX.Design.FormView.ReportViewClose);

//保存报表
DBFX.Design.FormView.ReportViewSave = function (e) {

    var form = e.Sender.FormContext.Form;
    if (form.FormControls.VDE_DV_DesignView.IsContentChanged == true) {

        //系列化对象
        var rptdoc = form.FormControls.VDE_DV_DesignView.SaveReport();

        var jsondoc = JSON.stringify(rptdoc);

        if (form.SaveResource != undefined) {
            form.SaveResource(form.ResourceContext, jsondoc, function (saveResult) {
                form.FormControls.VDE_DV_DesignView.IsContentChanged = !saveResult;
            });
        }
        else {
            DBFX.Web.Forms.MessageBox.Show("没有为设计器指定保存方法?", "深蓝砚台开发者中心", function (r) {


            }, 2);
        }
    }
}
app.GlobalCommands.Register("VDE_Design_ReportView_FormSave", DBFX.Design.FormView.ReportViewSave);


DBFX.Design.ControlDesigners.ReportViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/ReportDesignerTemplates/ReportViewDesigner.scrp", function (od) {

            obdc.DataContext = obdc.dataContext;
            obdc.ReportDesignView = od.dataContext;
            obdc.btnAddPage = obdc.FormContext.Form.FormControls.ReportDesignView_AddPageButton;
            obdc.cbxPaperType = obdc.FormContext.Form.FormControls.cbxPaperType;

            obdc.btnAddPage.Click = function (e) {

                obdc.ReportDesignView.AddPage();

            }

            obdc.cbxPaperType.SelectedItemChanged = function (c,item) {

                var p = JSON.parse(item.dataContext.Paper);
                //obdc.ReportDesignView.PageSetting = new DBFX.Web.ReportControls.PageSetting(p.Paper,p.Width,p.Height); 
                obdc.ReportDesignView.PageSetting.Paper = p.Paper;
                obdc.ReportDesignView.PageSetting.Width = p.Width;
                obdc.ReportDesignView.PageSetting.Height = p.Height;

            }

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "报表纸张设置";
    return obdc;
}

