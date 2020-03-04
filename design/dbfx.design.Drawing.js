DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Design.Service");
//图形设计视图
DBFX.Design.DrawingView = function () {

    var fv = new DBFX.Web.Controls.Control("DrawingView");
    fv.ClassDescriptor.Serializer = "";
    fv.ClassDescriptor.Designers = ["DBFX.Design.ControlDesigners.DrawingViewDesigner"];
    fv.ObjType = "DrawingView";
    fv.OnCreateHandle();
    fv.VisualElement.className = "VDE_Design_FormView";
    fv.VisualElement.innerHTML = "<DIV class=\"VDE_Design_FormViewClient\"></DIV><DIV class=\"VDE_Design_FormViewSizeEdge\"></DIV>";
    fv.ClientDiv = fv.VisualElement;
    fv.FormClient = fv.VisualElement.querySelector("DIV.VDE_Design_FormViewClient");
    fv.FormClient.style.top = "0px";
    fv.DesignView = new DBFX.Web.Draw.DrawView();
    fv.DesignView.Top = "0px";
    fv.DesignView.Left = "0px";
    fv.DesignView.Right = "0px";
    fv.DesignView.Bottom = "0px";
    fv.DesignView.Position = "absolute";
    fv.FormClient.appendChild(fv.DesignView.VisualElement);
    fv.SizeEdge = fv.VisualElement.querySelector("DIV.VDE_Design_FormViewSizeEdge");
    fv.DesignView.ContextMenu = "VDE_Design_DesignViewContextMenu";
    fv.IsContentChanged = false;;

    fv.DesignView.FormControls = new Object();
    fv.DesignView.FormContext = new Object();
    fv.DesignView.FormContext.Form = fv.DesignView;

    fv.DataBind = function (v) {

        fv.DesignView.DataContext = v.Value;

    }

    fv.DesignView.ContentChanged = function (c) {

        fv.IsContentChanged = true;


    }

    fv.SetText = function (v) {
        //fv.HeaderSpan.innerText = v;
    }

    fv.GetText = function () {

        //return fv.HeaderSpan.innerText;
    }

    fv.AddControl = function (c) {

        fv.DesignView.AddControl(c);
    }


    fv.drawingViewScale = 100;
    Object.defineProperty(fv, "DrawingViewScale", {
        get: function () {
            return fv.drawingViewScale;
        }, set: function (v) {
            fv.drawingViewScale = v;
            fv.DesignView.ZoomScale = (v / 100.0);
            fv.ScaleView((v / 100.0));
        }
    });

    fv.ScaleView = function (scale) {


        fv.VisualElement.style.transform = "scale(" + scale + ")";
        fv.VisualElement.style.transformOrigin = "0px 0px";

    }



    fv.SaveToXML = function () {


        var xdoc = fv.DesignView.saveContext();
        var draw = { Paper: { Width: fv.Width, Height: fv.Height, Scale: fv.drawingViewScale }, Shapes: JSON.parse(xdoc) };
        xdoc = JSON.stringify(draw);
        return xdoc;

    }

    fv.LoadXml = function (xmlData) {

        if (xmlData != "") {

            var draw = JSON.parse(xmlData);
            if (draw.Paper != undefined) {
                fv.Width = draw.Paper.Width;
                fv.Height = draw.Paper.Height;
                fv.DesignView.Height = fv.Height;
                fv.DesignView.Width = fv.Width;
                fv.DrawingViewScale = draw.Paper.Scale;
                xmlData = JSON.stringify(draw.Shapes);
            }
            fv.DesignView.readContext(xmlData);
            fv.DesignView.mode = 1;
            
            
        }
        fv.IsContentChanged = true;

    }

    fv.MouseDown = function (e) {

        fv.DesignView.OnObjectSelected(fv);

    }

    fv.SizeEdge.onmousedown = function (e) {
        if (e.button == 0) {
            e.preventDefault();
            e.cancelBubble = true;
            fv.ReSizeing = 1;

            if (fv.SizeEdge.setCapture != undefined)
                fv.SizeEdge.setCapture();
            else {

                window.onmouseup = fv.ResizeCompleted;

            }

            fv.Size = new Object();
            fv.Size.w = fv.VisualElement.clientWidth;
            fv.Size.h = fv.VisualElement.clientHeight;

            fv.Size.x = e.screenX;
            fv.Size.y = e.screenY;

        }
    }

    fv.SizeEdge.onmousemove = function (e) {
        if (fv.ReSizeing == 1) {
            e.preventDefault();
            e.cancelBubble = true;

            var ox = e.screenX - fv.Size.x;
            var oy = e.screenY - fv.Size.y;

            fv.VisualElement.style.width = fv.Size.w + ox + "px";
            fv.VisualElement.style.height = fv.Size.h + oy + "px";
            fv.DesignView.Height = fv.Size.h + oy + "px";
            fv.DesignView.Width = fv.Size.w + ox + "px";

        }

    }

    fv.SizeEdge.onmouseup = function (e) {
        if (fv.ReSizeing) {

            if (fv.SizeEdge.releaseCapture != undefined)
                fv.SizeEdge.releaseCapture();
            else {

                window.onmouseup = undefined;
            }

            fv.ReSizeing = undefined;

        }
    }

    fv.ResizeCompleted = function (e) {



    }

    return fv;

}


//图形设计视图
DBFX.Design.Service.LauchDrawingDesignView = function (dvi, cb) {

    if (app.MainForm.FormControls.ActivedDockManager.ActiveContent(dvi.Name) == null) {
        var fp = new DBFX.Web.Forms.FormPart("Design/Forms/DrawingDesignView.scrn", function (form) {


            form.FormControls.VDE_DV_ToolkitBox.LoadTKItems("LC.GAS.ADP.DesignerObjects.Tooltiks.HouseMapCollection");

            //
            form.FormControls.VDE_DV_ObjectEditor.Initialize(form.FormControls.VDE_DV_DesignView.DesignView);
            //回调
            cb(fp);

            //加载资源数据
            fp.LoadResource(dvi, function (xmldata) {

                form.FormControls.VDE_DV_DesignView.LoadXml(xmldata);

            });


        });

        fp.ResourceContext = dvi;
        app.MainForm.FormControls.ActivedDockManager.AddContent(dvi.Title, fp, 3, dvi.Name);


    }


}


DBFX.Design.FormView.DrawingViewClose = function (e) {

    var form = e.Sender.FormContext.Form;
    if (form.FormControls.VDE_DV_DesignView.IsContentChanged == true) {

        DBFX.Web.Forms.MessageBox.Show("文档内容发生改变，要放弃保存更改,关闭窗口吗?", "深蓝软件砚台智能云开发者中心", function (r) {

            if (r == 1) {


                form.ContentWindow.Close();

            }

        }, 1);

    }
    else {

        form.ContentWindow.Close();
    }
}
app.GlobalCommands.Register("VDE_Design_DrawingView_FormClose", DBFX.Design.FormView.DrawingViewClose);

DBFX.Design.FormView.DrawingViewSave = function (e) {

    var form = e.Sender.FormContext.Form;
    if (form.FormControls.VDE_DV_DesignView.IsContentChanged == true) {

        //系列化对象
        var xmldata = form.FormControls.VDE_DV_DesignView.SaveToXML();

        //var xmldata = (new XMLSerializer()).serializeToString(xdoc.documentElement);

        //if (form.FormControls.VDE_DV_DesignView.ToCode != undefined)
        //    var code = form.FormControls.VDE_DV_DesignView.ToCode();

        if (form.SaveResource != undefined) {
            form.SaveResource(form.ResourceContext, xmldata, function (saveResult) {
                form.FormControls.VDE_DV_DesignView.IsContentChanged = !saveResult;
            });
        }
        else {
            DBFX.Web.Forms.MessageBox.Show("没有为设计器指定保存方法?", "深蓝软件砚台智能云开发者中心", function (r) {


            }, 2);
        }
    }
}
app.GlobalCommands.Register("VDE_Design_DrawingView_FormSave", DBFX.Design.FormView.DrawingViewSave);
