DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");
DBFX.RegisterNamespace("DBFX.Design.ActivityDesigners");

DBFX.Design.ControlDesigners.ObjectGeneralDesigner = function () {

    var obdc = new DBFX.Web.Controls.Panel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {
        
        
        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/GeneralDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);
       

    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    return obdc;

}

DBFX.Design.ControlDesigners.LayoutDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/LayoutDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }
    
    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "布局设置";
    return obdc;

}


DBFX.Design.ControlDesigners.ContainerDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ContainerDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "容器滚动设置";
    return obdc;

}


DBFX.Design.ControlDesigners.BBCDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/BBCDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "颜色外观";
    return obdc;

}

DBFX.Design.ControlDesigners.FontDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/FontDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "字体设置";
    obdc.HorizonScrollbar = "hidden";

    return obdc;

}

DBFX.Design.ControlDesigners.FormDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/FormDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "Load", EventCode: undefined, Command: od.dataContext.Load, Control: od.dataContext }, { EventName: "UnLoad", EventCode: undefined, Command: obdc.dataContext.UnLoad, Control: obdc.dataContext }, { EventName: "Resume", EventCode: undefined, Command: obdc.dataContext.Resume, Control: obdc.dataContext }];

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "Load", EventCode: undefined, Command: obdc.dataContext.Load, Control: obdc.dataContext }, { EventName: "UnLoad", EventCode: undefined, Command: obdc.dataContext.UnLoad, Control: obdc.dataContext }, { EventName: "Resume", EventCode: undefined, Command: obdc.dataContext.Resume, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "表单设置";
    return obdc;

}

DBFX.Design.ControlDesigners.PagePartViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/FormPartDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "OnLoad", EventCode: undefined, Command: od.dataContext.OnLoad, Control: od.dataContext }];

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "OnLoad", EventCode: undefined, Command: obdc.dataContext.OnLoad, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面导航视图设置";
    return obdc;

}

DBFX.Design.ControlDesigners.InputControlDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/InputControlDesigner.scrp", function (od) {

            od.ButtonBinding = od.FormContext.Form.FormControls.btnDataBinding;
            od.DataDomainBox = od.FormContext.Form.FormControls.cbxDataDomain;
            od.DataDomainBox.LostFocus = function () {




                var ddkey = od.DataDomainBox.SelectedText;

                od.dataContext.DataDomain = ddkey;
                od.DataDomainBox.Value = ddkey;

                od.Initialize();

                od.DataDomainBox.Value = ddkey;

            }

            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [  { EventName: "ValueChanged", EventCode: undefined, Command: obdc.dataContext.ValueChanged, Control: obdc.dataContext }, 
                                            { EventName: "Keypress", EventCode: undefined, Command: obdc.dataContext.Keypress, Control: obdc.dataContext },
                                            { EventName: "KeyDown", EventCode: undefined, Command: obdc.dataContext.KeyDown, Control: obdc.dataContext },
                                            { EventName: "KeyUp", EventCode: undefined, Command: obdc.dataContext.KeyUp, Control: obdc.dataContext }
                                         ];

            od.ButtonBinding.Click = od.ShowBindingBuilder;

            obdc.Initialize();

            od.DataContext = od.dataContext;

        }, obdc);


    }

    //
    obdc.ShowBindingBuilder = function () {

        if (obdc.BindingBuilder == undefined) {

            obdc.BindingBuilder = new DBFX.Design.TypeEditors.BindingBuilder();

        }

        obdc.BindingBuilder.DataContext = obdc.dataContext;
        obdc.BindingBuilder.ShowModal();


    }

    obdc.BaseDataBind = obdc.DataBind;
  
    //
    obdc.DataBind = function (v) {

        if (obdc.dataContext.DataBindings == undefined)
            obdc.dataContext.DataBindings = { Path: "", Format: "", Mode: "TwoWay" };

        if (obdc.dataContext != undefined && obdc.DataDomainBox != undefined)
            obdc.Initialize();

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [  { EventName: "ValueChanged", EventCode: undefined, Command: obdc.dataContext.ValueChanged, Control: obdc.dataContext },
                                            { EventName: "Keypress", EventCode: undefined, Command: obdc.dataContext.Keypress, Control: obdc.dataContext },
                                            { EventName: "KeyDown", EventCode: undefined, Command: obdc.dataContext.KeyDown, Control: obdc.dataContext },
                                            { EventName: "KeyUp", EventCode: undefined, Command: obdc.dataContext.KeyUp, Control: obdc.dataContext }
                                         ];

        obdc.BaseDataBind(v);
    }

    obdc.Initialize = function () {

        if (obdc.dataContext.DataBindings == undefined)
            obdc.dataContext.DataBindings = { Path: "", Format: "", Mode: "TwoWay" };

        var items = [{Text:"无",Value:undefined}];
        for (var key in obdc.dataContext.FormContext) {

            if (key.toLowerCase() == "form")
                continue;

            var ddv = obdc.dataContext.FormContext[key];
            if (typeof ddv == "object" && ddv.GetType() == "DataDomain") {

                var idx = 0;
                for (var k in ddv) {
                    if (Object.prototype[k] != undefined || k=="undefined")
                        continue;

                    idx++;

                }

                //判断是否有属性在此数据域下方
                if (idx >0)
                    items.push({ Text: key, Value: key });
                else {
                    if(key!="")
                        eval("delete obdc.dataContext.FormContext." + key + ";");
                }
            }
        }

        obdc.DataDomainBox.ItemSource = items;

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "输入控件设置";
    return obdc;

}


DBFX.Design.ControlDesigners.DatePickerDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/DatePickerDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "日期选择设置";
    return obdc;

}

DBFX.Design.ControlDesigners.LabelControlDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/LabelControlDesigner.scrp", function (od) {

            //obdc.Initialize();
            obdc.EventListBox = obdc.FormContext.Form.FormControls.EventListBox;
            od.DataContext = od.dataContext;

        }, obdc);


    }

    obdc.BaseDataBind = obdc.DataBind;


    obdc.DataBind = function (v) {

        if (obdc.dataContext.GetType == undefined || (obdc.dataContext.GetType() != "RptLabel"  && obdc.dataContext.GetType() != "Label" && obdc.dataContext.GetType() != "RichTextBlock"))
            return;

        if (obdc.dataContext != undefined )
            obdc.Initialize();

        obdc.BaseDataBind(v);
    }

    obdc.Initialize = function () {

        if (obdc.dataContext.DataBindings == undefined)
            obdc.dataContext.DataBindings = { Path: "", Format: "", Mode: "TwoWay" };

        if (obdc.EventListBox != undefined) {
            obdc.EventListBox.ItemSource = [{ EventName: "Click", EventCode: undefined, Command: obdc.dataContext.Click, Control: obdc.dataContext }];
        }


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "输入控件设置";
    return obdc;

}

DBFX.Design.ControlDesigners.GroupPanelDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/GroupPanelDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "分组面板设置";
    return obdc;

}

DBFX.Design.ControlDesigners.ComboTreeBoxDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ComboTreeBoxDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "树形列表设计器";
    return obdc;

}



DBFX.Design.ControlDesigners.RichTextBoxDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/RichTextBoxDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "富文本编辑控件设置";
    return obdc;

}


/////////////////////////////////////////////////
/*
   图片浏览设计器
    lishuang
    20170427
*/
DBFX.Design.ControlDesigners.ImageSelectedDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ImageSelectedDesigner.scrp", function (od) {

            obdc.EventListBox = obdc.FormContext.Form.FormControls.EventListBox;
            od.DataContext = obdc.dataContext;
            od.btnImageChoose=od.FormContext.Form.FormControls.btnImageChoose;
            od.btnImageChoose.ImageUrlChanged=function(v)
            {

                od.TextBoxImage.Value=v;

            }

            od.TextBoxImage=od.FormContext.Form.FormControls.imgImageUrl;

        }, obdc);
 
    }


    obdc.BaseDataBind = obdc.DataBind;


    obdc.DataBind = function (v) {

        if (obdc.dataContext.GetType == undefined || obdc.dataContext.GetType() != "Image")
            return;

        if (obdc.dataContext != undefined)
            obdc.Initialize();

        obdc.BaseDataBind(v);
    }

    obdc.Initialize = function () {


        if (obdc.EventListBox != undefined) {
            obdc.EventListBox.ItemSource = [{ EventName: "Click", EventCode: undefined, Command: obdc.dataContext.Click, Control: obdc.dataContext }];
        }


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "图片设计器";
    return obdc;

}

DBFX.Design.ControlDesigners.NavContentPartDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/NavContentPartDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "分区导航面板设置";
    return obdc;

}

DBFX.Design.ControlDesigners.ImageUploadBoxDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ImageUploadDesigner.scrp", function (od) {

            if (obdc.dataContext.PictureSize == undefined || obdc.dataContext.PictureSize == "") {

                obdc.dataContext.PictureSize = obdc.dataContext.VisualElement.clientWidth + "," + obdc.dataContext.VisualElement.clientHeight;

            }

            od.DataContext = obdc.dataContext;

        }, obdc);

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "图片上传设置";
    return obdc;

}

DBFX.Design.ControlDesigners.ListBoxDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        obdc.Label0 = new DBFX.Web.Controls.Label("项目成员:");
        obdc.Label0.Margin = "2px 2px 2px 16px";
        obdc.Label0.Float = "left";
        obdc.ItemSourceMemberText = new DBFX.Web.Controls.TextBox("", "");
        obdc.ItemSourceMemberText.Margin = "2px";
        obdc.ItemSourceMemberText.Display = "block";
        obdc.ItemSourceMemberText.Height = "26px";
        obdc.ItemSourceMemberText.DataBindings = { Path: "ItemSourceMember", Mode: "TwoWay" };
        obdc.AddControl(obdc.Label0);
        obdc.AddControl(obdc.ItemSourceMemberText);

        obdc.Label = new DBFX.Web.Controls.Label("下拉选项:");
 
        obdc.Label.Margin = "2px 2px 2px 16px";
        obdc.Label.Float = "left";
        obdc.ItemsBuilder = new DBFX.Design.TypeEditors.ItemsBuilder();
        obdc.ItemsBuilder.Margin = "2px";
        obdc.ItemsBuilder.Display = "block";
        obdc.ItemsBuilder.Height = "26px";
        obdc.AddControl(obdc.Label);
        obdc.AddControl(obdc.ItemsBuilder);

        obdc.Label1 = new DBFX.Web.Controls.Label("默认选项:");
        obdc.Label1.Margin = "2px 2px 2px 16px";
        obdc.Label1.Float = "left";
        obdc.SelectedText = new DBFX.Web.Controls.TextBox("", "");
        obdc.SelectedText.Margin = "2px";
        obdc.SelectedText.Display = "block";
        obdc.SelectedText.Height = "26px";
        obdc.SelectedText.DataBindings = { Path: "SelectedValue", Mode: "TwoWay" };
        obdc.AddControl(obdc.Label1);
        obdc.AddControl(obdc.SelectedText);

        obdc.Label2 = new DBFX.Web.Controls.Label("显示属性:");
        obdc.Label2.Margin = "2px 2px 2px 16px";
        obdc.Label2.Float = "left";
        obdc.DMemberText = new DBFX.Web.Controls.TextBox("", "");
        obdc.DMemberText.Margin = "2px";
        obdc.DMemberText.Display = "block";
        obdc.DMemberText.Height = "26px";
        obdc.DMemberText.DataBindings = { Path: "DisplayMember", Mode: "TwoWay" };
        obdc.AddControl(obdc.Label2);
        obdc.AddControl(obdc.DMemberText);

        obdc.Label3 = new DBFX.Web.Controls.Label("取值属性:");
        obdc.Label3.Margin = "2px 2px 2px 16px";
        obdc.Label3.Float = "left";
        obdc.ValueMemberText = new DBFX.Web.Controls.TextBox("", "");
        obdc.ValueMemberText.Margin = "2px";
        obdc.ValueMemberText.Display = "block";
        obdc.ValueMemberText.Height = "26px";
        obdc.ValueMemberText.DataBindings = { Path: "ValueMember", Mode: "TwoWay" };
        obdc.AddControl(obdc.Label3);
        obdc.AddControl(obdc.ValueMemberText);


    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "列表设置";
    return obdc;

}

DBFX.Design.ControlDesigners.ButtonDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ButtonDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "Click", EventCode: undefined, Command: od.dataContext.Click, Control: od.dataContext }];

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "Click", EventCode: undefined, Command: obdc.dataContext.Click, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "命令按钮设置";
    return obdc;

}

DBFX.Design.ControlDesigners.BaseBindingDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/BaseBindingDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        if (obdc.dataContext.DataBindings == undefined)
            obdc.dataContext.DataBindings = { Path: "", Format: "", Mode: "TwoWay" };

        obdc.DataBind(e);


    }
    

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "快捷绑定设置";
    return obdc;

}

DBFX.Design.ControlDesigners.PictureManagerViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/PictureManagerViewDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {


        obdc.DataBind(e);


    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "图片管理器设置";
    return obdc;

}

DBFX.Design.ControlDesigners.ToolStripDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ToolStripDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "ToolStripItemClick", EventCode: undefined, Command: od.dataContext.ToolStripItemClick, Control: od.dataContext }];

            od.AddButton = od.FormContext.Form.FormControls.btnAddItem;
            od.ToolStrip = od.DataContext;
            od.AddButton.Click = function (e) {

                var itype = od.FormContext.ToolStripItemType;
                var item = undefined;
                switch (itype) {

                    case "ToolStripItem":
                        item = new DBFX.Web.Controls.ToolStripItem("工具按钮","themes/%currenttheme%/images/empty.png");
                        break;

                    case "ToolStripLabel":
                        item = new DBFX.Web.Controls.ToolStripLabel("工具文本");
                        break;

                    case "ToolStripDropdownList":
                        item = new DBFX.Web.Controls.ToolStripDropdownList();
                        break;

                        
                    case "ToolStripSeparator":
                        item = new DBFX.Web.Controls.ToolStripSeparator();
                        break;

                    case "ToolStripTextBox":
                        item = new DBFX.Web.Controls.ToolStripTextBox();
                        break;

                    case "DateTimePicker":
                        item = new DBFX.Web.Controls.DatePicker();
                        item.VAlign = "middle";
                        break;


                }

                if (item != undefined) {

                    item.Namespace = "DBFX.Web.Controls";
                    item.NSSN = "wc";

                    //设置设计时状态
                    if (od.ToolStrip.DesignTime) {
                        od.ToolStrip.DesignView.SetDesignTimeMode(item, od.ToolStrip);
                    }
                    od.ToolStrip.AddItem(item);

                }

            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);

        obdc.ToolStrip = obdc.dataContext;

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "ToolStripItemClick", EventCode: undefined, Command: obdc.dataContext.ToolStripItemClick, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "工具栏设置";
    return obdc;


}

DBFX.Design.ControlDesigners.ToolStripItemDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ToolStripItemDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "OnClick", EventCode: undefined, Command: od.dataContext.OnClick, Control: od.dataContext }];

            od.DelButton = od.FormContext.Form.FormControls.btnDelItem;
            od.ToolStripItem = od.DataContext;


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "OnClick", EventCode: undefined, Command: obdc.dataContext.OnClick, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "工具按钮设置";
    return obdc;


}

DBFX.Design.ControlDesigners.ToolStripLabelDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ToolStripLabelDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
 
            od.DelButton = od.FormContext.Form.FormControls.btnDelItem;
            od.ToolStripItem = od.DataContext;


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "工具标签设置";
    return obdc;


}

DBFX.Design.ControlDesigners.ToolStripDDListDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ToolStripDDListDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "SelectedItemChanged", EventCode: undefined, Command: od.dataContext.SelectedItemChanged, Control: od.dataContext }];

            od.ToolStripItem = od.DataContext;


        }, obdc);


    }



    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "SelectedItemChanged", EventCode: undefined, Command: obdc.dataContext.SelectedItemChanged, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "下拉按钮设置";
    return obdc;


}

DBFX.Design.ControlDesigners.HamMenuDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/HamMenuDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "HamMenuItemClicked", EventCode: undefined, Command: od.dataContext.HamMenuItemClicked, Control: od.dataContext }];


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "HamMenuItemClicked", EventCode: undefined, Command: obdc.dataContext.HamMenuItemClicked, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "汉堡菜单设置";
    return obdc;


}

//ListView Designer
DBFX.Design.ControlDesigners.ListViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ListViewDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [  { EventName: "SelectedItemChanged", EventCode: undefined, Command: od.dataContext.SelectedItemChanged, Control: od.dataContext },
                                            { EventName: "ItemTemplateSelector", EventCode: undefined, Command: od.dataContext.ItemTemplateSelector, Control: od.dataContext },
                                            { EventName: "ItemClick", EventCode: undefined, Command: od.dataContext.ItemClick, Control: od.dataContext },
                                            { EventName: "ItemDataContextChanged", EventCode: undefined, Command: od.dataContext.ItemDataContextChanged, Control: od.dataContext },
                                            { EventName: "SelectedItemDblClick", EventCode: undefined, Command: obdc.dataContext.SelectedItemDblClick, Control: obdc.dataContext }];
            od.ListView = od.dataContext;
            od.EDTButton = od.FormContext.Form.FormControls.btnEditDataTemplate;
            od.EOTButton = od.FormContext.Form.FormControls.btnEditObjTypes
            od.EGButton = od.FormContext.Form.FormControls.btnEditGroup
            od.EDTButton.Click = function (e) {

                od.ListView.ItemSource = [];

                var op = Object.getOwnPropertyNames(od.ListView.Templates);
                if (op==0) {
                    od.ListView.Templates = new Object();
                    od.ListView.Templates.ItemTemplate = new DBFX.Web.Controls.ControlTemplate(undefined, "ItemTemplate", "");
                    od.ListView.Templates.ItemTemplate.Namespaces = od.ListView.DesignView.NS;
                    od.ListView.Templates.ItemSelectedTemplate = new DBFX.Web.Controls.ControlTemplate(undefined, "ItemSelectedTemplate", "");
                    od.ListView.Templates.ItemSelectedTemplate.Namespaces = od.ListView.DesignView.NS;
                }

                od.DataTemplateView = new DBFX.Design.DataTemplateView();
                od.ListView.AddControl(od.DataTemplateView);
                od.ListView.ClientDiv.style.overflowY = "auto";
                od.DataTemplateView.LoadDataTemplates(od.ListView);
                od.ListView.DesignPan.Visible = "none";

                od.ListView.EditMode = 1;
                od.ListView.DesignView.ObjectSelector.Hide();

            }

            //编辑数据分组
            od.EGButton.Click = function (e) {

                od.ListView.EditMode = 3;

                od.ListView.ItemSource = [];
                if (od.ListView.Groups == undefined) {

                    od.ListView.Groups = [];

                }
                

                if(DBFX.Design.TypeEditors.DataGroupBuilder.ActivedBuilder==undefined)
                    DBFX.Design.TypeEditors.DataGroupBuilder.ActivedBuilder=new DBFX.Design.TypeEditors.DataGroupBuilder();

                od.DataGroupBuilder =DBFX.Design.TypeEditors.DataGroupBuilder.ActivedBuilder;
                //od.ListView.AddControl(od.DataGroupBuilder);
                od.ListView.ClientDiv.style.overflowY = "auto";
                od.ListView.DesignPan.Visible = "none";
                od.DataGroupBuilder.HostControl = od.ListView;
                od.DataGroupBuilder.LoadItemSource(od.ListView.Groups);
                od.DataGroupBuilder.ShowModal();
                //od.ListView.DesignView.ObjectSelector.Hide();

            }

            //编辑对象类型
            od.EOTButton.Click = function (e) {

                od.ListView.EditMode = 2;

                od.ListView.ItemSource = [];
                if (od.ListView.ObjTypes == undefined) {

                    od.ListView.ObjTypes = [];

                }

                if(DBFX.Design.TypeEditors.ObjTypesBuilder.ActivedBuilder==undefined)
                    DBFX.Design.TypeEditors.ObjTypesBuilder.ActivedBuilder = new DBFX.Design.TypeEditors.ObjTypesBuilder();
            
                od.ObjTypesBuilder=DBFX.Design.TypeEditors.ObjTypesBuilder.ActivedBuilder;
                //od.ListView.AddControl(od.ObjTypesBuilder);
                od.ListView.ClientDiv.style.overflowY = "auto";
                od.ListView.DesignPan.Display = "none";
                od.ObjTypesBuilder.HostControl = od.ListView;
                od.ObjTypesBuilder.LoadItemSource(od.ListView.ObjTypes);
                //od.ListView.DesignView.ObjectSelector.Hide();
                od.ObjTypesBuilder.ShowModal();
            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {
        obdc.ListView = obdc.dataContext;
        obdc.DataBind(e);
        if (obdc.EventListBox != undefined) {
            obdc.EventListBox.ItemSource = [{ EventName: "SelectedItemChanged", EventCode: undefined, Command: obdc.dataContext.SelectedItemChanged, Control: obdc.dataContext },
                                            { EventName: "ItemTemplateSelector", EventCode: undefined, Command: obdc.dataContext.ItemTemplateSelector, Control: obdc.dataContext },
                                            { EventName: "ItemClick", EventCode: undefined, Command: obdc.dataContext.ItemClick, Control: obdc.dataContext },
                                            { EventName: "ItemDataContextChanged", EventCode: undefined, Command: obdc.dataContext.ItemDataContextChanged, Control: obdc.dataContext },
                                            { EventName: "SelectedItemDblClick", EventCode: undefined, Command: obdc.dataContext.SelectedItemDblClick, Control: obdc.dataContext }];
        }

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "列表视图设置";
    return obdc;


}

//ListView Designer
DBFX.Design.ControlDesigners.ItemsPanelDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ItemsPanelDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "SelectedItemChanged", EventCode: undefined, Command: od.dataContext.SelectedItemChanged, Control: od.dataContext },
                                            { EventName: "ItemTemplateSelector", EventCode: undefined, Command: od.dataContext.ItemTemplateSelector, Control: od.dataContext },
                                            { EventName: "ItemClick", EventCode: undefined, Command: od.dataContext.ItemClick, Control: od.dataContext },
                                            { EventName: "SelectedItemDblClick", EventCode: undefined, Command: obdc.dataContext.SelectedItemDblClick, Control: obdc.dataContext }];
            od.ItemsPanel = od.dataContext;
            od.EDTButton = od.FormContext.Form.FormControls.btnEditDataTemplate;
            od.EDTButton.Click = function (e) {

                od.ItemsPanel.ItemSource = [];

                var op = Object.getOwnPropertyNames(od.ItemsPanel.Templates);
                if (op == 0) {
                    od.ItemsPanel.Templates = new Object();
                    od.ItemsPanel.Templates.ItemTemplate = new DBFX.Web.Controls.ControlTemplate(undefined, "ItemTemplate", "");
                    od.ItemsPanel.Templates.ItemTemplate.Namespaces = od.ItemsPanel.DesignView.NS;
                    od.ItemsPanel.Templates.ItemSelectedTemplate = new DBFX.Web.Controls.ControlTemplate(undefined, "ItemSelectedTemplate", "");
                    od.ItemsPanel.Templates.ItemSelectedTemplate.Namespaces = od.ItemsPanel.DesignView.NS;
                }

                od.DataTemplateView = new DBFX.Design.DataTemplateView();
                od.ItemsPanel.AddControl(od.DataTemplateView);
                od.ItemsPanel.ClientDiv.style.overflowY = "auto";
                od.DataTemplateView.LoadDataTemplates(od.ItemsPanel);
                od.ItemsPanel.DesignPan.Visible = "none";

                od.ItemsPanel.EditMode = 1;
                od.ItemsPanel.DesignView.ObjectSelector.Hide();

            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {
        obdc.ItemsPanel = obdc.dataContext;
        obdc.DataBind(e);
        if (obdc.EventListBox != undefined) {
            obdc.EventListBox.ItemSource = [{ EventName: "SelectedItemChanged", EventCode: undefined, Command: obdc.dataContext.SelectedItemChanged, Control: obdc.dataContext },
                                            { EventName: "ItemTemplateSelector", EventCode: undefined, Command: obdc.dataContext.ItemTemplateSelector, Control: obdc.dataContext },
                                            { EventName: "ItemClick", EventCode: undefined, Command: obdc.dataContext.ItemClick, Control: obdc.dataContext },
                                            { EventName: "SelectedItemDblClick", EventCode: undefined, Command: obdc.dataContext.SelectedItemDblClick, Control: obdc.dataContext }];
        }

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "列表面板设置";
    return obdc;


}



DBFX.Design.ControlDesigners.TreeListViewDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/TreeListViewDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "TreeListNodeClick", EventCode: undefined, Command: od.dataContext.TreeListNodeClick, Control: od.dataContext },
                                            { EventName: "TreeListNodeDblClick", EventCode: undefined, Command: od.dataContext.TreeListNodeDblClick, Control: od.dataContext },
                                            { EventName: "TreeListNodeChecked", EventCode: undefined, Command: od.dataContext.TreeListNodeChecked, Control: od.dataContext },
                                            { EventName: "TreeListViewSelectedNodeChange", EventCode: undefined, Command: od.dataContext.TreeListViewSelectedNodeChange, Control: od.dataContext },
                                            { EventName: "TreeNodeDragDrop", EventCode: undefined, Command: od.dataContext.TreeNodeDragDrop, Control: od.dataContext }];


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "TreeListNodeClick", EventCode: undefined, Command: obdc.dataContext.TreeListNodeClick, Control: obdc.dataContext },
                                            { EventName: "TreeListNodeDblClick", EventCode: undefined, Command: obdc.dataContext.TreeListNodeDblClick, Control: obdc.dataContext },
                                            { EventName: "TreeListNodeChecked", EventCode: undefined, Command: obdc.dataContext.TreeListNodeChecked, Control: obdc.dataContext },
                                            { EventName: "TreeListViewSelectedNodeChange", EventCode: undefined, Command: obdc.dataContext.TreeListViewSelectedNodeChange, Control: obdc.dataContext },
                                            { EventName: "TreeNodeDragDrop", EventCode: undefined, Command: obdc.dataContext.TreeNodeDragDrop, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "树形列表控件设置";
    return obdc;



}


//DataGridView Designer
DBFX.Design.ControlDesigners.DataGridViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/DataGridViewDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            obdc.AddColumnButton = obdc.FormContext.Form.FormControls.DataGridVierwDesigner_AddColumnButton;
            obdc.ClearColumnButton = obdc.FormContext.Form.FormControls.DataGridVierwDesigner_ClearColumnButton;
            obdc.PreviewButton = obdc.FormContext.Form.FormControls.DataGridVierwDesigner_PreviewButton;
            obdc.ReOrderButton = obdc.FormContext.Form.FormControls.DataGridVierwDesigner_ReOrderButton;
            obdc.AddColumnButton.Click = obdc.AddColumn;
            obdc.ClearColumnButton.Click = obdc.ClearColumns;
            obdc.PreviewButton.Click = obdc.PreviewData;
            obdc.ReOrderButton.Click = obdc.ReOrderColumns;

            obdc.DataGridView = od.dataContext;

            obdc.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            obdc.EventListBox.ItemSource = [{ EventName: "SelectedRowChanged", EventCode: undefined, Command: od.dataContext.SelectedRowChanged, Control: od.dataContext },
            { EventName: "SelectedCellChanged", EventCode: undefined, Command: od.dataContext.SelectedCellChanged, Control: od.dataContext },
            { EventName: "CellClick", EventCode: undefined, Command: od.dataContext.CellClick, Control: od.dataContext },
            { EventName: "RowClick", EventCode: undefined, Command: od.dataContext.RowClick, Control: od.dataContext },
            { EventName: "RowDblClick", EventCode: undefined, Command: od.dataContext.RowDblClick, Control: od.dataContext }];


        }, obdc);

        

        }

    obdc.ReOrderColumns=function(e)
    {
        Application.prototype.LoadAppResource("apps/3b5a0533153c4a0fa5f0a35305123423/31586ca9ec6d46e39b3c1d6d794f9f30.scrn", "调整列头顺序", obdc.DataGridView, 2, function (uiviw)
        {

        }, function () {

            obdc.DataGridView.ReArrayColumns();

        });

    }

    obdc.AddColumn = function (e) {

        obdc.DataGridView.AddColumn("Column" + obdc.DataGridView.Columns.length, "Column" + obdc.DataGridView.Columns.length, "128px");

    }

    obdc.ClearColumns = function (e) {

        obdc.DataGridView.ClearColumns();

    }

    obdc.PreviewData = function (e) {

        var items = new Array();
        for (var i = 0; i < 50; i++) {

            var Obj = new Object();

            for (var j = 0; j < obdc.DataGridView.Columns.length; j++) {

                var cp = obdc.DataGridView.Columns[j].property;
                Obj[cp] = "C" + i + "_" + j;

            }

            items.Add(Obj);
        }
        obdc.DataGridView.ItemSource = items;


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);
        obdc.DataGridView = obdc.dataContext;

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "SelectedRowChanged", EventCode: undefined, Command: obdc.dataContext.SelectedRowChanged, Control: obdc.dataContext },
                                            { EventName: "SelectedCellChanged", EventCode: undefined, Command: obdc.dataContext.SelectedCellChanged, Control: obdc.dataContext },
                                            { EventName: "CellClick", EventCode: undefined, Command: obdc.dataContext.CellClick, Control: obdc.dataContext },
                { EventName: "RowClick", EventCode: undefined, Command: obdc.dataContext.RowClick, Control: obdc.dataContext }, 
                { EventName: "RowDblClick", EventCode: undefined, Command: obdc.dataContext.RowDblClick, Control: obdc.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "数据列表视图设置";
    return obdc;

}

//DataGridViewColumn Designer
DBFX.Design.ControlDesigners.DataGridViewColumnDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/DataGridViewColumnDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "数据表列头设置";
    return obdc;

}

////////////////////评价标签 控件////////////////////////////
/*
    评价标签 RateTagBox 设计器
    lishuang
    20170512
*/
DBFX.Design.ControlDesigners.RateTagBoxListDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/designertemplates/FormDesignerTemplates/RateTagBoxListDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;

            obdc.EventListBox = obdc.FormContext.Form.FormControls.EventListBox;
            obdc.EventListBox.ItemSource = [{ EventName: "ItemClick", EventCode: undefined, Command: obdc.dataContext.ItemClick, Control: obdc.dataContext }];

        }, obdc);

    }

    obdc.BaseDataBind = obdc.DataBind;

    obdc.DataBind = function (v) {


        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "ItemClick", EventCode: undefined, Command: obdc.dataContext.ItemClick, Control: obdc.dataContext }];


        obdc.BaseDataBind(v);
    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}

/*
TabWidget 设计器
*/
DBFX.Design.ControlDesigners.TabWidgetDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/formdesignertemplates/TabWidgetDesigner.scrp", function (ctrlpart) {
            //获取当前控件
            obdc.DesignerItemPanel = ctrlpart.FormContext.Form.FormControls["DesignerItemPanel"];
            var AddItemButton = ctrlpart.FormContext.Form.FormControls["AddItemButton"];
            var AddBigItemButton = ctrlpart.FormContext.Form.FormControls["AddBigItemButton"];
            var RemoveItemButton = ctrlpart.FormContext.Form.FormControls["RemoveItemButton"];
            //添加项
            AddItemButton.Click = function (e) {
                obdc.TabWidget.addTabItem();
            }
            //添加自定义项
            AddBigItemButton.Click = function (e) {
                obdc.TabWidget.addTabBigItem();
            }

            //移除项
            RemoveItemButton.Click = function (e) {
                if (obdc.TabWidget.TabItemActive) {
                    obdc.TabWidget.removeTabItem();
                }
            }

            obdc.EventListBox = ctrlpart.FormContext.Form.FormControls.EventListBox;
            obdc.EventListBox.ItemSource = [{ EventName: "TabBigItemClick", EventCode: undefined, Command: ctrlpart.dataContext.TabBigItemClick, Control: ctrlpart.dataContext }];


        }, obdc);



    }
    //当前项设置上下文
    obdc.DataContextChanged = function (v) {
        obdc.TabWidget = obdc.dataContext;
        if (obdc.TabWidget && obdc.TabWidget.TabItemActiveChanged == undefined) {
            obdc.TabWidget.TabItemActiveChanged = function (tabItem) {
                obdc.DesignerItemPanel.DataContext = tabItem;
            }
        }

        if (obdc.TabWidget && obdc.TabWidget.TabBigItemClick == undefined) {
            obdc.TabWidget.TabBigItemClick = function (tabItem) {
                obdc.DesignerItemPanel.DataContext = tabItem;
            }
        }

        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "TabBigItemClick", EventCode: undefined, Command: obdc.dataContext.TabBigItemClick, Control: obdc.dataContext }];

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}

DBFX.Design.ControlDesigners.TabWidgetItemDesigner = function () {
    var obdc = new DBFX.Web.Controls.GroupPanel;
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/designertemplates/formdesignertemplates/TabWidgetItemDesigner.scrp", function (ctrlpart) {

                obdc.DataContext = obdc.dataContext;

        }, obdc);

    }
    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "选项卡设计器";
    return obdc;
}
/*
TabWidget 设置选项卡设计时支持控件布局
*/
DBFX.Design.TabWidgetDesignTimePreparer = function (tabWidget, dp) {


    tabWidget.VisualElement_Tabs.appendChild(dp.VisualElement);
    dp.VisualElement.style.left = "0px";
    dp.VisualElement.style.top = "0px";
    dp.VisualElement.style.bottom = "0px";
    dp.VisualElement.style.right = "0px";

}

DBFX.Design.TabWidgetBigItemDesignTimePreparer = function (tabbigitem, dp) {


    tabbigitem.VisualElement_Tab.appendChild(dp.VisualElement);
    dp.VisualElement.style.left = "2px";
    dp.VisualElement.style.top = "2px";
    dp.VisualElement.style.bottom = "2px";
    dp.VisualElement.style.right = "2px";


}

DBFX.Design.TabWidgetItemDesignTimePreparer = function (tabitem, dp) {

    tabitem.VisualElement_Tab.appendChild(dp.VisualElement);
    dp.VisualElement.style.left = "2px";
    dp.VisualElement.style.top = "2px";
    dp.VisualElement.style.bottom = "2px";
    dp.VisualElement.style.right = "2px";

    dp.Click = function (e) {

        tabitem.OnItemClick(tabitem);

    }


}
/* 
FormBar设计器
*/
DBFX.Design.ControlDesigners.FormBarDesigner = function () {
    var obdc = new DBFX.Web.Controls.GroupPanel;
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/designertemplates/formdesignertemplates/FormBarDesigner.scrp", function (ctrlpart) {
            obdc.BarDesignerPanel = ctrlpart.FormContext.Form.FormControls["BarDesignerPanel"];
            if (obdc.BarDesignerPanel) {
                obdc.DataContext = obdc.DataContext;
            }
        }, obdc);

    }
    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "控件设计器";
    return obdc;
}

///////////////////////WebFSExplorer////////////////////////////////
/*
   Web文件系统浏览器WebFSExplorerDesigner
    lishuang
    20170427
*/
DBFX.Design.ControlDesigners.WebFSExplorerDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/FormDesignerTemplates/WebFSExplorerDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }

    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {

    //}

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}

//实体模型编辑器
DBFX.Design.ControlDesigners.DataEntitySchemaDesigner = function () {

    var obdc = new DBFX.Web.Controls.Panel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/DMDesignerTemplates/DESDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    return obdc;

}

//实体属性设计器
DBFX.Design.ControlDesigners.DataPropertyDesigner = function () {

    var obdc = new DBFX.Web.Controls.Panel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/DMDesignerTemplates/DataPropertyDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    return obdc;

}

//移动表单视图设计器
DBFX.Design.ControlDesigners.MobileFormViewDesigner = function () {

    var mfvdc = new DBFX.Web.Controls.GroupPanel();
    mfvdc.OnCreateHandle();
    mfvdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/MobileFormViewDesigner.scrp", function (od) {

            var form1 = od.FormContext.Form;
            od.DataContext = mfvdc.dataContext;
            form1.FormControls.cbxDeviceTypes.SelectedItemChanged = function (cbx, item) {

                form1.FormControls.cbxDeviceSizes.ItemSource = item.dataContext.Items;

            }

            form1.FormControls.cbxDeviceSizes.SelectedItemChanged = function (cbx, item) {

                mfvdc.FormView.DeviceWidth = item.dataContext.Width;
                mfvdc.FormView.DeviceHeight = item.dataContext.Height;

                var rs = item.dataContext.Resolution.split("x");
                mfvdc.FormView.ViewWidth = rs[0];
                mfvdc.FormView.ViewHeight = rs[1];


            }

            var cds = form1.FormControls.cbxDeviceSizes;
            var item = form1.FormControls.cbxDeviceTypes.selectedItem;
            if(item!=undefined && item!=null)
                cds.ItemSource = item.dataContext.Items;

            if (cds.initValue != undefined)
                cds.Value = cds.initValue;

            var sldzoom = form1.FormControls.sldZoom;
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{ EventName: "Load", EventCode: undefined, Command: od.dataContext.Load, Control: od.dataContext }, { EventName: "UnLoad", EventCode: undefined, Command: od.dataContext.UnLoad, Control: od.dataContext }, { EventName: "Resume", EventCode: undefined, Command: od.dataContext.Resume, Control: od.dataContext }];


        }, mfvdc);


    }

    mfvdc.FormView = undefined;
    mfvdc.DataContextChanged = function (v) {

        mfvdc.FormView = v.Value;
        mfvdc.DataBind(v);

        if (mfvdc.EventListBox != undefined)
            mfvdc.EventListBox.ItemSource = [{ EventName: "Load", EventCode: undefined, Command: mfvdc.dataContext.Load, Control: mfvdc.dataContext }, { EventName: "UnLoad", EventCode: undefined, Command: mfvdc.dataContext.UnLoad, Control: mfvdc.dataContext }, { EventName: "Resume", EventCode: undefined, Command: mfvdc.dataContext.Resume, Control: mfvdc.dataContext }];

    }

    mfvdc.HorizonScrollbar = "hidden";
    mfvdc.OnCreateHandle();
    mfvdc.Class = "VDE_Design_ObjectGeneralDesigner";
    mfvdc.Text = "设备设置";
    return mfvdc;


}


DBFX.Design.ControlDesigners.DrawingViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/DrawingViewDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "画布设置";
    return obdc;

}

//文档模型树设计器
DBFX.Design.ControlDesigners.DOMTreeViewDesigner = function () {

    var domtv = new DBFX.Web.Controls.GroupPanel();
    domtv.OnCreateHandle();
    domtv.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/DomTreeView.scrp", function (od) {

            var form1 = od.FormContext.Form;




        }, domtv);


    }

    domtv.FormView = undefined;
    domtv.DataContextChanged = function (v) {


    }

    domtv.HorizonScrollbar = "hidden";
    domtv.OnCreateHandle();
    domtv.Class = "VDE_Design_ObjectGeneralDesigner";
    domtv.Text = "设备设置";
    return mfvdc;


}

//WFActivity Designers
DBFX.Design.ActivityDesigners.WFAGeneralDesigner = function () {

    var obdc = new DBFX.Web.Controls.Panel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/WFAGeneralDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    return obdc;

}

//WFActivity Designers
DBFX.Design.ActivityDesigners.WFDesignViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/RootSequenceDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            

        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "流程设置";
    return obdc;

}

//WFActivity Designers
DBFX.Design.ActivityDesigners.SwitchBranchDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/SwitchBranchDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "选择分支设置";
    return obdc;

}

//Activity Designers

DBFX.Design.ActivityDesigners.CEBuilderDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/CEBuilderDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            od.AddButton = od.FormContext.Form.FormControls.btnAddCExpr;
            od.AddButton.Click = od.AddCExpr;


        }, obdc);


    }

    obdc.AddCExpr = function (e) {

        obdc.dataContext.AddCExpression()

    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "表达式设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.CExpressionDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/CExpressionDesigner.scrp", function (od) {

            obdc.DataContext = obdc.dataContext;
            obdc.Activity = obdc.dataContext.Activity;

            obdc.AddButton = od.FormContext.Form.FormControls.btnAddCExpr;
            obdc.AddButton.Click = function (e) {

                obdc.Activity.AddCExpression();

            }

            obdc.DelButton = od.FormContext.Form.FormControls.btnDelCExpr;
            obdc.DelButton.Click = function (e) {

                obdc.Activity.RemoveCExpression();

            }



        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        try{
            if (e.Value != undefined) {

                if (e.Value.dataContext.StartGroup == 0)
                    e.Value.dataContext.StartGroupText = "";
                else
                    e.Value.dataContext.StartGroupText = "(";

                if (e.Value.dataContext.EndGroup == 0)
                    e.Value.dataContext.EndGroupText = "";
                else
                    e.Value.dataContext.EndGroupText = ")";

            }

            obdc.dataContext = e.Value;
            obdc.DataBind(e);
            if (obdc.dataContext != undefined)
                obdc.Activity = obdc.dataContext.Activity;
        } catch (ex) { }

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "表达式设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SwitchDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/SwitchDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            od.AddButton = od.FormContext.Form.FormControls.btn_AddSwitchBranch;
            od.AddButton.Click = od.OnAddSwitchBranch;

        }, obdc);


    }

    obdc.OnAddSwitchBranch = function (e) {

        obdc.dataContext.AddCase();

    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "常规设置";
    return obdc;

}

//////////////////////////////////////////////////////////////////////////////////////////
//ForEach 枚举循环设计器
/////////////////////////////////////////////////////////////////////////////////////////
DBFX.Design.ActivityDesigners.ForEachDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ForEachDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "循环设置";
    return obdc;

}

//////////////////////////////////////////////////////////////////////////////////////////
//For 计数循环设计器
/////////////////////////////////////////////////////////////////////////////////////////
DBFX.Design.ActivityDesigners.ForDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ForDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "计数循环设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.ReturnDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ReturnDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "返回设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.AssignVarsDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/AssignVarsDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "变量赋值";
    return obdc;

}


DBFX.Design.ActivityDesigners.ConfirmDialogDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ConfirmDialogDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "消息对话框设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.InvokeSvcBusDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/InvokeSvcBusDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "云服务调用设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPDefParasDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/DefParamDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            
            obdc.AddButton = obdc.FormContext.Form.FormControls.btnAddPara;
            obdc.AddButton.Click = function (e, btn) {

                var pa = { ParameterName: "Para" + (obdc.Cmd.Parameters.length + 1), DataType: "string", DefaultValue: "" };
                obdc.Cmd.Parameters.Add(pa);
                obdc.Cmd.lvwParameters.ItemSource = obdc.Cmd.Parameters;
                obdc.Cmd.DesignView.ObjectEditor.ObjectSelected(obdc.Cmd);
            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {


        obdc.dataContext = e.Value;
        obdc.DataBind(e);
        if (obdc.dataContext != undefined) {

            obdc.Cmd = obdc.dataContext;

        }



    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "参数设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPDefParameterDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/ParameterDesigner.scrp", function (od) {

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

            obdc.ParaDef = obdc.dataContext.ParaDef;

        }

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "参数属性设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPDefVarsDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/DefVarsDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            obdc.AddButton = obdc.FormContext.Form.FormControls.btnAddVar;
            obdc.AddButton.Click = function (e, btn) {

                var ivar = { VarName: "Var" + (obdc.VarDef.Variables.length + 1), DataType: "string", DefaultValue: "" };
                obdc.VarDef.Variables.Add(ivar);
                obdc.VarDef.lvwVariables.ItemSource = obdc.VarDef.Variables;
                obdc.VarDef.DesignView.ObjectEditor.ObjectSelected(obdc.VarDef);

            }



        }, obdc);


    }

    obdc.DataContextChanged = function (e) {


        obdc.dataContext = e.Value;
        obdc.DataBind(e);
        if (obdc.dataContext != undefined) {

            obdc.VarDef = obdc.dataContext;

        }


    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "变量设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPDefVariablesDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/VariablesDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            obdc.AddButton = obdc.FormContext.Form.FormControls.btnAddVar;
            obdc.DelButton = obdc.FormContext.Form.FormControls.btnDelVar;
            obdc.AddButton.Click = function (e, btn) {

                var ivar = { VarName: "Var" + (obdc.VarDef.Variables.length + 1), DataType: "string", DefaultValue: "" };
                obdc.VarDef.Variables.Add(ivar);
                obdc.VarDef.lvwVariables.ItemSource = obdc.VarDef.Variables;
                obdc.VarDef.DesignView.ObjectEditor.ObjectSelected(obdc.VarDef);

            }

            obdc.DelButton.Click = function (e, btn) {

                if (obdc.VarDef.lvwVariables.selectedItem != undefined) {

                    obdc.VarDef.Variables.Remove(obdc.VarDef.lvwVariables.selectedItem.dataContext);
                    obdc.VarDef.lvwVariables.ItemSource = obdc.VarDef.Variables;
                    obdc.VarDef.lvwVariables.selectedItem = undefined;

                    obdc.VarDef.DesignView.ObjectEditor.ObjectSelected(obdc.VarDef);
                }
            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);
        if (obdc.dataContext != undefined) {

            obdc.VarDef = obdc.dataContext.VarDef;

        }

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "变量属性设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.ExecuteSPCmdDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/ExecuteSPDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext;


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext;


    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "存储过程设置";
    return obdc;

}
DBFX.Design.ActivityDesigners.SPQueryCmdDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/QueryCmdDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext;
            obdc.AddMap = obdc.FormContext.Form.FormControls.btnAddMap;
            obdc.AddMap.Click = function (e) {

                var map = { PropertyName: "Property" + obdc.Cmd.OutputMaps.length, Expression: "", Alias: "" };
                obdc.Cmd.OutputMaps.Add(map);
                obdc.Cmd.lvwOutputMaps.ItemSource = obdc.Cmd.OutputMaps;

            }

            obdc.AddFilter = od.FormContext.Form.FormControls.btnAddFilter;
            obdc.AddFilter.Click = function (e) {

                var filter = { PropertyName: "Filter" + obdc.Cmd.Filters.length, MatchSymbol: "", Value: "", LogicalLinker: "", StartGroup: false, EndGroup: false, StartGroupText: "", EndGroupText: "" };
                obdc.Cmd.Filters.Add(filter);
                obdc.Cmd.lvwFilters.ItemSource = obdc.Cmd.Filters;

            }

            obdc.AddSort = od.FormContext.Form.FormControls.btnAddSort;
            obdc.AddSort.Click = function (e) {

                var filter = { PropertyName: "Sort" + obdc.Cmd.SortItems.length, SortMode: "ASC"};
                obdc.Cmd.SortItems.Add(filter);
                obdc.Cmd.lvwSortItems.ItemSource = obdc.Cmd.SortItems;

            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext;


    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "查询设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPOutputMapDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/MapItemDesigner.scrp", function (qdc) {

            obdc.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext.Cmd;
            obdc.AddMap = obdc.FormContext.Form.FormControls.btnAddMap;
            obdc.AddMap.Click = function (e)
            {

                var map = { PropertyName: "Property" + obdc.Cmd.OutputMaps.length, Expression: "", Alias: "" };
                obdc.Cmd.OutputMaps.Add(map);
                obdc.Cmd.lvwOutputMaps.ItemSource = obdc.Cmd.OutputMaps;

            }


            obdc.DelMap = obdc.FormContext.Form.FormControls.btnDelMap;
            obdc.DelMap.Click = function (e)
            {

                if (obdc.Cmd.lvwOutputMaps.selectedItem != undefined) {

                    obdc.Cmd.OutputMaps.Remove(obdc.Cmd.lvwOutputMaps.selectedItem.dataContext);
                    obdc.Cmd.lvwOutputMaps.ItemSource = obdc.Cmd.OutputMaps;
                    obdc.Cmd.lvwOutputMaps.selectedItem = undefined;
                    obdc.Cmd.DesignView.ObjectEditor.ObjectSelected(obdc.Cmd);

                }

            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext.Cmd;

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "输出设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPFilterDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/FilterItemDesigner.scrp", function (od) {

            obdc.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext.Cmd;

            obdc.AddFilter = od.FormContext.Form.FormControls.btnAddFilter;
            obdc.AddFilter.Click = function (e) {

                var filter = { PropertyName: "Filter" + obdc.Cmd.Filters.length, MatchSymbol: "", Value: "", LogicalLinker: "", StartGroup: false, EndGroup: false,StartGroupText:"",EndGroupText:"" };
                obdc.Cmd.Filters.Add(filter);
                obdc.Cmd.lvwFilters.ItemSource = obdc.Cmd.Filters;

            }

            obdc.DelFilter = od.FormContext.Form.FormControls.btnDelFilter;
            obdc.DelFilter.Click = function (e) {

                if (obdc.Cmd.lvwFilters.selectedItem != undefined) {

                    obdc.Cmd.Filters.Remove(obdc.Cmd.lvwFilters.selectedItem.dataContext);
                    obdc.Cmd.lvwFilters.ItemSource = obdc.Cmd.Filters;
                    obdc.Cmd.lvwFilters.selectedItem = undefined;

                    obdc.Cmd.DesignView.ObjectEditor.ObjectSelected(obdc.Cmd);
                }
            }



        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        if (e.Value != undefined) {

            if (e.Value.dataContext.StartGroup == 0)
                e.Value.dataContext.StartGroupText = "";
            else
                e.Value.dataContext.StartGroupText = "(";

            if (e.Value.dataContext.EndGroup == 0)
                e.Value.dataContext.EndGroupText = "";
            else
                e.Value.dataContext.EndGroupText = ")";

        }

        obdc.dataContext = e.Value;
        obdc.DataBind(e);
        if(obdc.dataContext!=undefined)
            obdc.Cmd = obdc.dataContext.Cmd;

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "查询条件设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPSortDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/SortItemDesigner.scrp", function (od) {

            obdc.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext.Cmd;

            obdc.AddSort = od.FormContext.Form.FormControls.btnAddSort;
            obdc.AddSort.Click = function (e) {

                var sort = { PropertyName: "Sort" + obdc.Cmd.SortItems.length, SortMode: "Asc" };
                obdc.Cmd.SortItems.Add(sort);
                obdc.Cmd.lvwSortItems.ItemSource = obdc.Cmd.SortItems;

            }

            obdc.DelSort = od.FormContext.Form.FormControls.btnDelSort;
            obdc.DelSort.Click = function (e) {

                if (obdc.Cmd.lvwSortItems.selectedItem != undefined) {

                    obdc.Cmd.SortItems.Remove(obdc.Cmd.lvwSortItems.selectedItem.dataContext);
                    obdc.Cmd.lvwSortItems.ItemSource = obdc.Cmd.SortItems;
                    obdc.Cmd.lvwSortItems.selectedItem = undefined;

                    obdc.Cmd.DesignView.ObjectEditor.ObjectSelected(obdc.Cmd);
                }
            }



        }, obdc);


    }

    obdc.DataContextChanged = function (e) {


        obdc.dataContext = e.Value;
        obdc.DataBind(e);
        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext.Cmd;

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "排序设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPDeleteCmdDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/DeleteCmdDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext;

            obdc.AddFilter = od.FormContext.Form.FormControls.btnAddFilter;
            obdc.AddFilter.Click = function (e) {

                var filter = { PropertyName: "Filter" + obdc.Cmd.Filters.length, MatchSymbol: "", Value: "", LogicalLinker: "", StartGroup: false, EndGroup: false, StartGroupText: "", EndGroupText: "" };
                obdc.Cmd.Filters.Add(filter);
                obdc.Cmd.lvwFilters.ItemSource = obdc.Cmd.Filters;

            }

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {


        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext;



    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "数据删除设置";
    return obdc;


}

DBFX.Design.ActivityDesigners.SPValueItemDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/ValueItemDesigner.scrp", function (od) {

            obdc.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext.Cmd;

            obdc.AddDataItem = obdc.FormContext.Form.FormControls.btnAddDataItem;
            obdc.AddDataItem.Click = function (e) {

                var item = { PropertyName: "Property" + (obdc.Cmd.DataItems.length + 1), Value: "", Expression: "" };
                obdc.Cmd.DataItems.Add(item);
                obdc.Cmd.lvwDataItems.ItemSource = obdc.Cmd.DataItems;

            }

            obdc.DelDataItem = obdc.FormContext.Form.FormControls.btnDelDataItem;
            obdc.DelDataItem.Click = function (e) {

                if (obdc.Cmd.lvwDataItems.selectedItem != undefined) {

                    obdc.Cmd.DataItems.Remove(obdc.Cmd.lvwDataItems.selectedItem.dataContext);
                    obdc.Cmd.lvwDataItems.ItemSource = obdc.Cmd.DataItems;
                    obdc.Cmd.lvwDataItems.selectedItem = undefined;

                    obdc.Cmd.DesignView.ObjectEditor.ObjectSelected(obdc.Cmd);
                }
            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext.Cmd;

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "数据更新设置";
    return obdc;


}

DBFX.Design.ActivityDesigners.SPUpValueItemDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/UPValueItemDesigner.scrp", function (od) {

            obdc.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext.Cmd;

            obdc.AddDataItem = obdc.FormContext.Form.FormControls.btnAddDataItem;
            obdc.AddDataItem.Click = function (e) {

                var item = {Operation:"$set",PropertyName: "Property" + (obdc.Cmd.DataItems.length + 1), Value: "", Expression: "" };
                //obdc.Cmd.DataItems.Add(item);
                //obdc.Cmd.lvwDataItems.ItemSource = obdc.Cmd.DataItems;
                obdc.Cmd.lvwDataItems.AddItem(item);
            }

            obdc.DelDataItem = obdc.FormContext.Form.FormControls.btnDelDataItem;
            obdc.DelDataItem.Click = function (e) {

                if (obdc.Cmd.lvwDataItems.selectedItem != undefined) {

                    //obdc.Cmd.DataItems.Remove(obdc.Cmd.lvwDataItems.selectedItem.dataContext);
                    //obdc.Cmd.lvwDataItems.ItemSource = obdc.Cmd.DataItems;
                    obdc.Cmd.lvwDataItems.RemoveItem(obdc.Cmd.lvwDataItems.selectedItem);
                    obdc.Cmd.lvwDataItems.selectedItem = undefined;

                    obdc.Cmd.DesignView.ObjectEditor.ObjectSelected(obdc.Cmd);
                }
            }


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        if (e.Value != undefined && e.Value.dataContext != undefined && e.Value.dataContext.Operation == undefined)
            e.Value.dataContext.Operation = "$set";


        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext.Cmd;

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "数据更新设置";
    return obdc;


}

DBFX.Design.ActivityDesigners.SPUpdateCmdDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/UpdateCmdDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            obdc.Cmd = obdc.dataContext;

            obdc.AddDataItem = obdc.FormContext.Form.FormControls.btnAddDataItem;
            obdc.AddDataItem.Click = function (e) {

                var item = {Operation:"$set", PropertyName: "Property" + (obdc.Cmd.DataItems.length + 1), Value: "", Expression: "" };
                //obdc.Cmd.DataItems.Add(item);
                //obdc.Cmd.lvwDataItems.ItemSource = obdc.Cmd.DataItems;
                obdc.Cmd.lvwDataItems.AddItem(item);

            }

            obdc.AddFilter = od.FormContext.Form.FormControls.btnAddFilter;
            obdc.AddFilter.Click = function (e) {

                var filter = { PropertyName: "Filter" + obdc.Cmd.Filters.length, MatchSymbol: "", Value: "", LogicalLinker: "", StartGroup: false, EndGroup: false, StartGroupText: "", EndGroupText: "" };
                //obdc.Cmd.Filters.Add(filter);
                //obdc.Cmd.lvwFilters.ItemSource = obdc.Cmd.Filters;
                obdc.Cmd.lvwFilters.AddItem(filter);
            }

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext;

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "数据更新设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPInsertCmdDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/InsertCmdDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext;

            obdc.AddDataItem = obdc.FormContext.Form.FormControls.btnAddDataItem;
            obdc.AddDataItem.Click = function (e) {

                var item = { PropertyName: "Property" + (obdc.Cmd.DataItems.length + 1), Value: "", Expression: "" };
                //obdc.Cmd.DataItems.Add(item);
                //obdc.Cmd.lvwDataItems.ItemSource = obdc.Cmd.DataItems;
        
                obdc.Cmd.lvwDataItems.AddItem(item);

            }

        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext;

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "插入数居设置";
    return obdc;

}

DBFX.Design.ActivityDesigners.SPCursorCmdDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/CursorCmdDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);


    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "游标设置";
    return obdc;

}
