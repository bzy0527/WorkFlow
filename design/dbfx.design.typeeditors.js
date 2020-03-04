DBFX.RegisterNamespace("DBFX.Design.TypeEditors");
DBFX.RegisterNamespace("DBFX.Design.ActivityDesigners");
//
DBFX.Design.TypeEditors.MethodBuilder = function () {

    var mbd = new DBFX.Web.Forms.Form("委托设置", "design/DesignerTemplates/TypeEditors/MethodBuilder.scrn", function (form) {

        //头部面板控件
        form.HeaderPanel = form.FormControls.HeaderPanel;
   
        //方法流程构造器
        form.MethodFlowBuilder = form.FormControls.MethodFlowBuilder;


        //加载资源
        form.MethodFlowBuilder.LoadResourceCompleted = function (rescode) {

            if (rescode != null)
            {
                mbd.MethodFlowBuilder.DesignView.Clear();
                form.MethodObject.Command._id = rescode._id;
                form.MethodObject.Command.CommandLine = rescode.CommandLine;
                form.MethodFlowBuilder.LoadXml(rescode.FlowData);
            }


        }

        form.MethodFlowBuilder.SaveResourceCompleted = function (rescode) {

            
            mbd.MethodObject.Command.CommandLine = "app.DynamicModules.M" + rescode._id;
            mbd.MethodObject.Command._id = rescode._id;
            mbd.HeaderPanel.DataContext = mbd.MethodObject;



        }

        if (mbd.dataContext!=undefined)
            mbd.DataContext = mbd.dataContext;

    });

  
    //
    mbd.BindMethodInfo = function () {

        mbd.CommandObject = new Object();




    }

    //编辑器对象改变
    mbd.DataContextChanged = function (v) {


        if (mbd.HeaderPanel != undefined) {
            mbd.HeaderPanel.DataContext = mbd.MethodObject;

            if(mbd.MethodFlowBuilder.FormControls.btnSave!=undefined)
                mbd.MethodFlowBuilder.FormControls.btnSave.Enabled=false;           

            mbd.MethodFlowBuilder.DataContext = mbd.MethodObject;

            
            if (mbd.MethodObject.Command._id != undefined) {
                

                mbd.MethodFlowBuilder.LoadResource.Sender = mbd.MethodFlowBuilder;
                mbd.MethodFlowBuilder.LoadResource.Execute(mbd.MethodFlowBuilder.LoadResourceCompleted);

            }
            else {
                
                if (mbd.MethodFlowBuilder.DesignView != undefined)
                {
                    mbd.MethodFlowBuilder.DesignView.Clear();
                    
                }

                mbd.MethodFlowBuilder.IsNewFlow = 1;

                if(mbd.MethodFlowBuilder.FormControls.btnSave!=undefined)
                    mbd.MethodFlowBuilder.FormControls.btnSave.Enabled = true;
                 
            }

        }


    }


    return mbd;

}


//
DBFX.Design.TypeEditors.BindingBuilder = function () {

    var bbd = new DBFX.Web.Forms.Form("绑定设置", "design/DesignerTemplates/TypeEditors/BindingsBuilder.scrn", function (form) {

        bbd.ClearSetting = form.FormControls.btnClearSettings;
        bbd.OkButton = form.FormControls.btnOk;
        bbd.ObjectProBox = form.FormControls.opbProperties;
        bbd.BindingPanel = form.FormControls.BindingPanel;
        //
        bbd.OkButton.Click = function (e) {


            bbd.CurrentNode.dataContext.Binding = bbd.BindingPanel.DataContext;
            
            if (bbd.BindingPanel.dataContext.IsNew != undefined) {
                bbd.dataContext.bindings.Add(bbd.BindingPanel.DataContext);
                delete bbd.BindingPanel.DataContext.IsNew;
            }

            bbd.CurrentNode.dataContext.ImageUrl = "design/themes/%currenttheme%/images/binding.png";
            bbd.CurrentNode.DataContext = bbd.CurrentNode.dataContext;

        }


        //
        bbd.ClearSetting.Click = function (e) {

            bbd.CurrentNode.dataContext.ImageUrl = "";
            bbd.CurrentNode.dataContext.Binding = undefined;
            bbd.CurrentNode.DataContext = bbd.CurrentNode.dataContext;
        }

        bbd.ObjectProBox.TreeListNodeClick = function (tnd, c) {

            bbd.CurrentNode = tnd;

            var binding = tnd.dataContext.Binding;
            if (binding == undefined) {

                binding = new DBFX.ComponentsModel.Binding();
                binding.PropertyName = tnd.dataContext.Value;
                binding.IsNew = true;

            }

            bbd.BindingPanel.DataContext = binding;

        }



    });




    return bbd;

}


//事件项目
DBFX.Design.TypeEditors.EventItem = function () {

    var evitem = new DBFX.Web.Controls.Control("EventItem");
    evitem.VisualElement = document.createElement("DIV");
    evitem.OnCreateHandle();
    evitem.OnCreateHandle = function () {

        evitem.VisualElement.innerHTML = "<IMG class=\"VDE_TypeEditors_EventItemImage\"><LABEL class=\"VDE_TypeEditors_EventItemName\" ></LABEL><BUTTON class=\"VDE_TypeEditors_EventItemCBtn\">✖</BUTTON><LABEL class=\"VDE_TypeEditors_EventItemCode\">...</LABEL>";
        evitem.FlagImage = evitem.VisualElement.querySelector("IMG.VDE_TypeEditors_EventItemImage");
        evitem.EventItemNameSpan = evitem.VisualElement.querySelector("LABEL.VDE_TypeEditors_EventItemName");
        evitem.EventItemCodeSpan = evitem.VisualElement.querySelector("LABEL.VDE_TypeEditors_EventItemCode");
        evitem.FlagImage.src = "design/themes/" + app.CurrentTheme + "/Images/wfdesignview/noevent.png";
        evitem.CButton = evitem.VisualElement.querySelector("BUTTON");
        evitem.Class = "VDE_TypeEditors_EventItem";

        evitem.CButton.onclick = evitem.ClearCode;
    }


    evitem.ClearCode = function (e) {
        event.cancelBubble = true;
        evitem.dataContext.Control.DesignView.ClearCodeRes(evitem.dataContext, evitem);

    }

    ///
    Object.defineProperty(evitem, "EventName", {
        get: function () {
            return evitem.EventItemNameSpan.innerText;
        },
        set: function (v) {
            evitem.EventItemNameSpan.innerText = v;
        }
    });

    ///
    Object.defineProperty(evitem, "EventCode", {
        get: function () {
            return evitem.EventItemCodeSpan.innerText;
        }, set: function (v) {

            evitem.EventItemCodeSpan.innerText = v;

        }
    });

    evitem.DataBind = function (v) {

        if (v.Value != undefined) {
            evitem.EventName = v.Value.EventName + ":";

            if (v.Value.Command != undefined)
                evitem.EventCode = v.Value.Command.CommandLine;
            else {
                evitem.EventCode = "...";
                if (evitem.dataContext.Control != undefined)
                    evitem.dataContext.Control[evitem.dataContext.EventName] = undefined;
            }
            if (evitem.EventCode != undefined && evitem.EventCode != "...") {

                evitem.FlagImage.src = "design/themes/" + app.CurrentTheme + "/Images/wfdesignview/event.png";
            }
            else {
                evitem.FlagImage.src = "design/themes/" + app.CurrentTheme + "/Images/wfdesignview/noevent.png";
            }
        }

    }

    evitem.Click = function (e) {

        if (evitem.EventList != undefined)
            evitem.EventList.OnEventItemClick(evitem);

    }

    evitem.OnCreateHandle();
    return evitem;

}

        //事件列表
DBFX.Design.TypeEditors.EventList = function () {

    var eventlist = new DBFX.Web.Controls.GroupPanel();

    eventlist.Text = "事件列表";
    eventlist.itemSource = undefined;
    Object.defineProperty(eventlist, "ItemSource", {
        get: function () {
            return eventlist.itemSource;
        },
        set: function (v) {

            eventlist.itemSource = v;
            eventlist.CreateList();
        }
    });

    eventlist.CreateList = function () {

        eventlist.Clear();
        if (eventlist.itemSource == undefined || !Array.isArray(eventlist.itemSource)) {
            
            return;
        }

        eventlist.itemSource.forEach(function (item) {

            var eitem = new DBFX.Design.TypeEditors.EventItem();
            eitem.EventList = eventlist;
            eventlist.AddControl(eitem);
            eitem.DataContext = item;

        });


    }

    eventlist.DataBind = function (v) {

    }

    eventlist.OnEventItemClick = function (evitem) {

        eventlist.ShowEventBuilder(evitem);

    }


    eventlist.ShowEventBuilder = function (evitem) {

        // try {
        if (eventlist.MethodBuilder == undefined) {

            eventlist.MethodBuilder = new DBFX.Design.TypeEditors.MethodBuilder();

        }

        if ((evitem.dataContext.Command != undefined && evitem.dataContext.Command.GetType().toLowerCase() != "command") || evitem.dataContext.Command == undefined) {

            var cmd = new DBFX.ComponentsModel.BaseCommand();
            evitem.dataContext.Command = cmd;
        }

        if (eventlist.dataContext[evitem.dataContext.EventName] === undefined) {
            eventlist.MethodBuilder.MethodObject = evitem.dataContext;

        }
        else
            eventlist.MethodBuilder.MethodObject = evitem.dataContext;

        eventlist.dataContext[evitem.dataContext.EventName] = evitem.dataContext.Command;

        eventlist.MethodBuilder.ShowModal();

        eventlist.MethodBuilder.DataContext = evitem.dataContext;

    }

    return eventlist;
}

DBFX.Design.TypeEditors.ItemsBuilder = function () {

    var ibuilder = new DBFX.Web.Controls.Button("...", function (e) {

        var form = new DBFX.Web.Forms.Form("选项集合设置", "design/DesignerTemplates/typeeditors//ItemSourceBuilder.scrn", function (form) {
            form.DataContext = ibuilder.dataContext;
            var DesignerItemPanel = form.FormControls["DesignerItemPanel"];
            var AddItemButton = form.FormControls["AddItemButton"];
            var RemoveItemButton = form.FormControls["RemoveItemButton"];
            var SaveButton = form.FormControls["SaveButton"];
            var Title = form.FormControls["Title"];
            var ListView = form.FormControls["ListView"];
            var ComboBoxValue = form.FormControls["Value"];
            var ComboBoxImgUrl = form.FormControls["ImgUrl"];
            ListView.SelectedItemChanged = function (listview, item) {
                DesignerItemPanel.DataContext = item.DataContext;
            }
            ListView.ItemSource = form.dataContext.ItemSource;
            AddItemButton.Click = function (e) {
                if (ListView.ItemSource == undefined)
                    ListView.ItemSource = new Array();
                ListView.ItemSource.push({ "Text": Title.Value, "ImageUrl": ComboBoxImgUrl.Value, "Value": ComboBoxValue.Value });
                ListView.ItemSource = ListView.ItemSource;
            }
            RemoveItemButton.Click = function (e) {
                ListView.ItemSource.Remove(ListView.SelectedItem.dataContext);
                ListView.ItemSource = ListView.ItemSource;
            }
            SaveButton.Click = function (e) {
                ibuilder.dataContext.ItemSource = ListView.ItemSource;
                form.Close();
            }
        });
        form.ShowModal();


    });



    return ibuilder;

}

DBFX.Design.TypeEditors.ImageChooseButton = function () {

    var pnl = new DBFX.Web.Controls.Panel();
    pnl.Display = "block";
    pnl.VisualElement.style = "hidden";
    var isbutton = new DBFX.Web.Controls.Button("选择图片", function (e) {

        if (!isbutton.pop) {
            isbutton.pop = DBFX.Web.Controls.PopupPanel();
            isbutton.pop.Width = "700px";
            isbutton.WebFSExplorer = DBFX.Web.Controls.WebFSExplorer();
            isbutton.WebFSExplorer.Action = "https://wfs.dbazure.cn/wfs.ashx?AppId=%developing_appid%";
            isbutton.WebFSExplorer.Height = "500px";
            isbutton.WebFSExplorer.Width = "700px";

            isbutton.pop.AddControl(isbutton.WebFSExplorer);
            isbutton.WebFSExplorer.ResourceItemSelected = function (item) {
                if (pnl.BindProperty.toLowerCase() == "backgroundimageurl")
                    isbutton.DataContext[pnl.BindProperty] = "url('" + item.dataContext.Url + "')";
                else
                    isbutton.DataContext[pnl.BindProperty] = item.dataContext.Url;

                img.ImageUrl = item.dataContext.Url;

                if(pnl.ImageUrlChanged!=undefined)
                    pnl.ImageUrlChanged(img.ImageUrl);
            }

            isbutton.WebFSExplorer.Model = 2;
        }
        isbutton.pop.Show(isbutton);

    });

    pnl.BindProperty = "ImageUrl";
    

    var cbutton = new DBFX.Web.Controls.Button("清除图片", function (e) {

        cbutton.DataContext[pnl.BindProperty] = "";
        img.ImageUrl = "";
        if(pnl.ImageUrlChanged!=undefined)
            pnl.ImageUrlChanged("");
    });
    cbutton.Float = "right";
    pnl.AddControl(cbutton);

    isbutton.Display = "block";
    pnl.AddControl(isbutton);

    var img = new DBFX.Web.Controls.Image();
    img.Display = "block";
    img.Height = "64px";

    pnl.AddControl(img);

    pnl.SetValue=function(v)
    {

        img.ImageUrl=v;

    }

    return pnl;

}

//数据模板
DBFX.Design.DataTemplate = function () {

    var dt = new DBFX.Web.Controls.Control("DataTemplate");
    dt.ClassDescriptor.DisplayName = "ListView ";
    dt.ClassDescriptor.Description = "为为提供ListView基础实现";
    dt.ClassDescriptor.Serializer = "DBFX.Serializer.DataTemplateSerializer";
    dt.ClassDescriptor.Designers = ["DBFX.Design.ControlDesigners.ObjectGeneralDesigner"];
    dt.ClassDescriptor.DesignTimePreparer = "DBFX.Design.DataTemplateDesignTimePreparer";
    dt.Controls = new DBFX.Web.Controls.ControlsCollection(dt);
    dt.VisualElement = document.createElement("DIV");
    dt.OnCreateHandle();
    dt.OnCreateHandle = function () {
        dt.Class = "VDE_CD_DataTemplate";
        dt.VisualElement.innerHTML = "<DIV class=\"VDE_CD_DataTemplate_HeaderDiv\"><SPAN class=\"VDE_CD_DataTemplate_KeyText\">模板关键字:</SPAN><SPAN  class=\"VDE_CD_DataTemplate_KeyWord\"></SPAN></DIV>";
        dt.HeaderDiv = dt.VisualElement.querySelector("DIV.VDE_CD_DataTemplate_HeaderDiv");
        dt.SpanKeyText = dt.VisualElement.querySelector("SPAN.VDE_CD_DataTemplate_KeyText");
        dt.SpanKeyword = dt.VisualElement.querySelector("SPAN.VDE_CD_DataTemplate_KeyWord");
        dt.ClientPanel = new DBFX.Web.Controls.Panel("TemplatePanel");
        dt.ClientPanel.SetFloat = function () { };
        dt.ClientPanel.IsCanResize = 0;
        dt.ClientPanel.IsCanMove = 0;
        dt.IsCanResize = 0;
        dt.IsCanMove = 0;
        dt.ClientPanel.Class = "VDE_CD_DataTemplate_ClientPanel";
        dt.ClientDiv.appendChild(dt.ClientPanel.VisualElement);
        dt.ClientPanel.PasteChildOnly = true;
        dt.ClientPanel.IsCanDelete = false;
    }

    Object.defineProperty(dt, "Keyword", {
        get: function () {
            return dt.keyword;
        },
        set: function (v) {

            dt.keyword = v;
            dt.SpanKeyword.innerText = v;
        }
    });

    dt.GetName = function (v) {

        return dt.keyword;
    }

    dt.SetName = function (v) {

        if (dt.DataTemplate.Keyword != v) {

            eval("delete dt.HostControl.Templates." + dt.DataTemplate.Keyword);
            dt.HostControl.Templates[v] = dt.DataTemplate;
        }

        dt.Keyword = v;
        dt.name = v;
        dt.DataTemplate.Keyword = v;
    }


    //添加控件
    dt.AddControl = function (c) {

        dt.ClientPanel.AddControl(c);

    }

    dt.InsertControl = function (c, tc, pos) {

        dt.ClientPanel.InsertControl(c, tc, pos);

    }

    dt.Remove = function (c) {

        dt.ClientPanel.Remove(c);
    }

    dt.Clear = function () {
        //dt.ClientPanel.Clear();
    }

    dt.DataBind = function (v) {

        if (v != undefined && v.ObjType=="ControlTemplate") {

            dt.SpanKeyword.innerText = v.Value.Keyword;
            dt.DataTemplate = v.Value;
            dt.Keyword - v.Value.Keyword;
        }

    }

    //加载模板
    dt.LoadTemplate = function () {

        dt.DataTemplate.CreateUIElement(dt.ClientPanel,0);


    }

    dt.SetDesignTimeMode=function()
    {

        dt.HostControl.DesignView.SetDesignTimeMode(dt.ClientPanel, dt);

    }

    dt.SaveTemplate = function () {

        dt.DataTemplate.Serialize(dt.ClientPanel);

    }

    dt.PrepareDesignTime = function () {



    }


    dt.OnCreateHandle();
    return dt;

}

//数据模板视图
DBFX.Design.DataTemplateView = function () {

    var dtv = new DBFX.Web.Controls.Control("DataTemplateView");
    dtv.ClassDescriptor.DisplayName = "DataTemplateView ";
    dtv.ClassDescriptor.Description = "为为提供DataTemplateView基础实现";
    dtv.ClassDescriptor.Designers = ["DBFX.Design.ControlDesigners.ObjectGeneralDesigner"];
    dtv.ClassDescriptor.Serializer = "DBFX.Serializer.DataTemplateViewSerializer";
    dtv.Templates = new Array();
    dtv.VisualElement = document.createElement("DIV");
    dtv.ToolStrip = new DBFX.Web.Controls.ToolStrip();
    dtv.ToolStrip.Height = "34px";
    dtv.OnCreateHandle();
    dtv.OnCreateHandle = function () {

        dtv.Class = "VDE_CD_DataTemplateView";

        dtv.VisualElement.appendChild(dtv.ToolStrip.VisualElement);

        //添加模板
        dtv.ToolStrip.AddItem(new DBFX.Web.Controls.ToolStripItem("保存关闭", "design/themes/%currenttheme%/images/save.png", function (item) {

            //保存模板
            dtv.Templates.forEach(function (dt) {

                dt.SaveTemplate();
                dtv.HostControl.DesignView.OnContentChanged(dtv.HostControl.DesignView);

            });

            dtv.HostControl.Remove(dtv);

            dtv.HostControl.ItemSource = [{_id:1}, {_id:2}, {_id:3}];
            dtv.HostControl.DesignPan.Visible = "block";

        }));
        dtv.ToolStrip.AddItem(new DBFX.Web.Controls.ToolStripSeparator(""));

        //添加模板
        dtv.ToolStrip.AddItem(new DBFX.Web.Controls.ToolStripItem("添加模板", "design/themes/%currenttheme%/images/datatemplateview/addtemplate.png", function (item) {

            dtv.AddTemplate();

        }));
        dtv.ToolStrip.AddItem(new DBFX.Web.Controls.ToolStripSeparator(""));
        //删除模板
        dtv.ToolStrip.AddItem(new DBFX.Web.Controls.ToolStripItem("删除模板", "design/themes/%currenttheme%/images/datatemplateview/deltemplate.png", function (item) {

            dtv.RemoveTemplate();

        }));


    }



    //添加编辑模板
    dtv.AddTemplate = function (template) {
        if (template == undefined) {

            template = new DBFX.Web.Controls.ControlTemplate(undefined, "Template" + DBFX.GetUniqueNumber(), "");
            var ns = new Object();
            var ns1=dtv.HostControl.DesignView.NS;
            for (var k in ns1) {

                if (Object.prototype[k] != undefined)
                    continue;

                var nitem = ns1[k];

                if (nitem != undefined && nitem.Namespace != undefined) {

                    ns[nitem.NSSN] = nitem.Namespace;
                }


            }
            template.Namespaces = ns;

        }

        if (template.Keyword == "") {
            template.Keyword = "Template" + DBFX.GetUniqueNumber();
        }

        var dt = new DBFX.Design.DataTemplate();
        dt.TemplateView = dtv;
        dt.HostControl = dtv.HostControl;
        dtv.ClientDiv.appendChild(dt.VisualElement);
        dt.DataContext = template;
        dt.DataTemplate = template;
        dtv.HostControl.DesignView.SetDesignTimeMode(dt, dtv);
        dt.PrepareDesignTime();
        dt.Display = "block";
        dt.Keyword = template.Keyword;
        dtv.Templates.push(dt);

        if (dtv.HostControl.Templates[template.Keyword] == undefined)
            dtv.HostControl.Templates[template.Keyword] = template;

        dt.LoadTemplate();

        return dt;
    }

    //删除模板
    dtv.RemoveTemplate = function () {

        var cdt = dtv.HostControl.DesignView.CurrentControl;
        dtv.Remove(cdt);

    }

    dtv.Remove = function (c) {

        var cdt =c;
        dtv.ClientDiv.removeChild(cdt.VisualElement);

        eval("delete dtv.HostControl.Templates." + cdt.Keyword + ";");

        dtv.Templates.Remove(cdt);

    }


    //加载模板
    dtv.LoadDataTemplates = function (host) {

        dtv.HostControl = host;
        if (host != undefined && host.Templates != undefined) {

            for (var key in host.Templates) {

                var template = host.Templates[key];
                if (template != undefined && template.ObjType == "ControlTemplate") {

                    var dt=dtv.AddTemplate(template);
                   
                }

            }

        }

    }

    dtv.OnCreateHandle();
    return dtv;

}

//图片设计器
DBFX.Design.TypeEditors.ImageBuilder = function () {

    var iec = new DBFX.Web.Controls.Control("ImageBuilder");


    return iec;

}

//DataGroup设计视图
DBFX.Design.TypeEditors.DataGroupBuilder = function () {

    //var dgb = new DBFX.Web.Controls.Panel("DataGroupBuilder");

    //dgb.FormContext = new Object();
    //dgb.FormContext.Form = dgb;
    //dgb.FormControls = new Object;

    var dgb=new DBFX.Web.Forms.Form("列表分组设计","design/DesignerTemplates/FormDesignerTemplates/DataGroupViewDesigner.scrp", function (od) {
        dgb.lvwGroups = dgb.FormContext.Form.FormControls.lvwGroups;
        dgb.lvwGroups.ItemSource = dgb.Groups;

        od.FormContext.Form.FormControls.btnSave2Close.Click = function (e) {

            //dgb.HostControl.Remove(dgb);
            //dgb.HostControl.ItemSource = [{ _id: 1, Details: [{ _id: 1 }, { _id: 2 }] }, { _id: 2, Details: [{ _id: 1 }, { _id: 2 }] }, { _id: 3, Details: [{ _id: 1 }, { _id: 2 }] }];
            for (i = 0; i < 3; i++)
                dgb.HostControl.itemSource.Add({ _id: i, Details: [{ _id: "A" + i + "_1", Products: [{ _id: "P" + i + "_1", ProductName: "Office 2016", Spec: "Retail" }, { _id: "P" + i + "_2", ProductName: "Office 2016", Spec: "Enterprise" }] }, { _id: "A" + i + "_2", Products: [{ _id: "P" + i + "_1", ProductName: "SQL Server 2016", Spec: "Retail" }, { _id: "P" + i + "_2", ProductName: "SQL Server 2016", Spec: "Enterprise" }] }] });

            dgb.HostControl.ItemSource = dgb.HostControl.itemSource;

            dgb.lvwGroups.ItemSource=[];
            //dgb.HostControl.DesignPan.Visible = "block";
            app.GoBack();

        }

        od.FormContext.Form.FormControls.btnNewGroup.Click = function (e) {

            var group = { ItemSourceMember: "", GroupTemplate: "", ItemTemplate: "", ItemSelectedTemplate: "", LoadDataCommand: "", AutoExpandGroup: false, PerObjLoadDetail: true,HorizontalArray:true,PerPageLoad: false, PageRows: 100 };

            dgb.lvwGroups.AddItem(group);

        }

        od.FormContext.Form.FormControls.btnDelGroup.Click = function (e) {

            dgb.lvwGroups.RemoveItem(dgb.lvwGroups.SelectedItem);

        }




    });

    dgb.LoadItemSource = function (groups) {

        dgb.Groups = groups;
        if(dgb.lvwGroups!=undefined)
            dgb.lvwGroups.ItemSource = dgb.Groups;
    }


    return dgb;

}


//对象分类集合定义
DBFX.Design.TypeEditors.ObjTypesBuilder = function () {

    //var otb = new DBFX.Web.Controls.Panel("ObjTypesBuilder");
    //otb.OnCreateHandle();
    //otb.FormContext = new Object();
    //otb.FormContext.Form = otb;
    //otb.FormControls = new Object;


    var otb=new DBFX.Web.Forms.Form("对象分类集合设计","design/DesignerTemplates/FormDesignerTemplates/ObjectTypeBuilderDesigner.scrp", function (od) {
        otb.lvwObjTypes = od.FormContext.Form.FormControls.lvwObjTypes;
        otb.lvwObjTypes.ItemSource = otb.objTypes;

        od.FormContext.Form.FormControls.btnSaveClose.Click = function (e) {

            //otb.HostControl.Remove(otb);
            otb.HostControl.ItemSource = [{ _id: 1 }, { _id: 2 }, { _id: 3 }];
            otb.HostControl.DesignPan.Visible = "block";
            app.GoBack();

        }

        od.FormContext.Form.FormControls.btnAddObjType.Click = function (e) {

            var ot = { TypeValue: "", ItemTemplate: "", ItemSelectedTempalte: "", ItemColor: "black", ItemBackColor: "transparent", SelectedItemColor: "", SelectedItemBackColor: "", SelectedItemBorderColor: "" };

            otb.lvwObjTypes.AddItem(ot);

        }

        od.FormContext.Form.FormControls.btnDelObjType.Click = function (e) {

            otb.lvwObjTypes.RemoveItem(otb.lvwObjTypes.SelectedItem);

        }




    });

    otb.LoadItemSource = function (objTypes) {

        otb.objTypes = objTypes;
        
        if(otb.lvwObjTypes!=undefined)
            otb.lvwObjTypes.ItemSource = otb.objTypes;


    }


    
    return otb;

}

