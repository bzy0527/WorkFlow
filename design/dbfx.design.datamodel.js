DBFX.RegisterNamespace("DBFX.Design");
//数据模型视图
DBFX.Design.DataModelView = function () {

    var dmv = new DBFX.Web.Controls.Panel("DataModelView");
    dmv.OnCreateHandle();
    dmv.OnCreateHandle = function () {

        dmv.PopupPanel = new DBFX.Design.DEPDesignPanel();
        dmv.ClientDiv.innerHTML = "<svg class=\"VDE_Design_DataModelViewSvg\" xmlns=\"http://www.w3.org/2000/svg\"></svg>";
        dmv.Svg = dmv.ClientDiv.querySelector("svg.VDE_Design_DataModelViewSvg");
    }

    dmv.Class = "VDE_Design_DataModelView";
    dmv.Schemas = new Array();
    dmv.SchemaNames = new Object();
    dmv.Relations = new Array();
    dmv.ModelView = dmv.VisualElement;
    dmv.ModelView.allowDrop = true;
    dmv.ModelView.ondragover = function (e) {

        var ve = e.currentTarget;
        if (ve.allowDrop && dmv.ModelView == ve) {
            e.preventDefault();
        }
    }
    dmv.ModelView.ondrop = function (e) {

        var tkitem = DBFX.Web.Controls.Context.DragObject;
        var c = DBFX.Design.DesignView.CreateControlInstance(tkitem);
        if (c != null && c != undefined) {
            if (c.GetType() == "DataRelation") {

                dmv.AddRelation(c);

            }
            else {


                c.Top = (e.y - tkitem.y) + "px";
                c.Left = (e.x - tkitem.x) + "px";
                dmv.AddEntitySchema(c);
                dmv.OnEntitySchemaSelected(c);
            }

        }

        dmv.IsContentChanged = true;
    }

    dmv.AddEntitySchema = function (c) {

        c.DesignView = dmv;
        dmv.AddControl(c);

        dmv.Schemas.push(c);

        dmv.SchemaNames[c.Name] = c;

    }

    dmv.AddRelation = function (r) {

        dmv.Svg.appendChild(r.Line);
        dmv.Svg.appendChild(r.EP0)
        dmv.Svg.appendChild(r.EP1)
        r.DesignView = dmv;

        dmv.Relations.push(r);

    }

    Object.defineProperty(dmv, "SelectedDataEntitySchema", {
        get: function () {

            return dmv.selectedDataEntitySchema;

        },
        set: function (v) {


            dmv.selectedDataEntitySchema = v;

        }
    });

    dmv.OnEntitySchemaSelected = function (des) {

        if (dmv.selectedDataEntitySchema != undefined) {
            dmv.selectedDataEntitySchema.Selected = false;;
        }

        dmv.SelectedDataEntitySchema = des;
        if (dmv.selectedDataEntitySchema != undefined) {

            dmv.selectedDataEntitySchema.Selected = true;

        }

        dmv.OnObjectSelected(des);
        dmv.IsContentChanged = true;
        dmv.ReLayout();
    }


    //对象改变
    dmv.OnObjectSelected = function (obj) {


    }

    dmv.ReDrawView = function () {

        for (var i = 0; i < dmv.Relations.length; i++) {

            var r = dmv.Relations[i];
            r.ReLoctionEP();

        }

    }

    //重新进行布局更新
    dmv.ReLayout = function () {

        if (dmv.selectedDataEntitySchema == undefined)
            return;

        var zidx = 0;
        dmv.Schemas.Remove(dmv.selectedDataEntitySchema);
        dmv.Schemas.push(dmv.selectedDataEntitySchema);

        for (var zdx = 0; zdx < dmv.Schemas.length; zdx++) {

            dmv.Schemas[zdx].ZIndex = zdx;

        }


    }

    //验证数据实体模型名称
    dmv.ValidateDESName = function (desname,oldname) {



        if ((dmv.SchemaNames[desname] == undefined) || (desname==oldname))
        {
            return true;
        }
        else
            return false;


    }

    //
    dmv.ReNameDataEntitySchema = function (name, desc) {

        if (dmv.SchemaNames[desc.Name] == undefined)
            dmv.SchemaNames[name] = desc;
        else {

            delete dmv.SchemaNames[desc.Name]
            dmv.SchemaNames[name] = desc;
        }

    }


    //删除实体模型
    dmv.RemoveDataEntitySchema = function (de) {

        DBFX.Web.Forms.MessageBox.Show("真的要删除选定的 "+de.Title+" 实体吗？", "实体模型设计器", function (r) {


            if (r == 1) {


                delete dmv.SchemaNames[de.Name];
                dmv.Schemas.Remove(de);
                dmv.Remove(de);

                dmv.SelectedDataEntitySchema == undefined;


            }



        }, 1);



    }

    //滚动调定位标记
    dmv.MoveTag = document.createElement("DIV");
    dmv.MoveTag.className = "VDE_Design_DataModelViewMoveTag";
    dmv.ClientDiv.appendChild(dmv.MoveTag);


    dmv.SaveToXML = function () {

        var xdoc = (new DOMParser()).parseFromString("<DML></DML>","text/xml");

        //创建文档根元素系列化表单跟元素

        var rootel = xdoc.documentElement;

        var serializer = new DBFX.Serializer.DataModelDesignViewSerializer();

        serializer.Serialize(dmv, rootel);



        return xdoc;

    }

    dmv.LoadXml = function (xmlData) {

        if (xmlData != "") {

            var dparser = new DOMParser();
            var xd = dparser.parseFromString(xmlData, "text/xml");
            var serializer = new DBFX.Serializer.DataModelDesignViewSerializer();
            serializer.DeSerialize(dmv, xd.documentElement);
            dmv.IsContentChanged = false;
        }
    }

    dmv.OnCreateHandle();

    return dmv;

}



//数据模型架构
DBFX.Design.DataEntitySchema = function (dmv) {

    var desc = new DBFX.Web.Controls.Control("DataEntitySchema");
    desc.ClassDescriptor.Designers = ["DBFX.Design.ControlDesigners.DataEntitySchemaDesigner"];
    desc.ClassDescriptor.Serializer = "DBFX.Serializer.DataEntitySchemaSerializer";
    desc.ClassDescriptor.DisplayName = "数据实体架构";
    desc.ClassDescriptor.Description = "描述数据实体结构";
    desc.Class = "VDE_Design_DataEntitySchema";
    desc.DesignView = dmv;
    desc.Properties = new Dictionary();
    desc.PrimaryKey = "_id";
    desc.name = "Entity" + DBFX.GetUniqueNumber();
    desc.ToolStrip = new DBFX.Web.Controls.ToolStrip();
    desc.title = "未命名";
    desc.OnCreateHandle();
    desc.OnCreateHandle = function () {

        desc.VisualElement.innerHTML = "<DIV class=\"VDE_Design_DataEntitySchemaHeader\"><IMG class=\"VDE_Design_DataEntitySchemaImage\"></IMG><LABEL class=\"VDE_Design_DataEntitySchemaText\"></LABEL></DIV><DIV class=\"VDE_Design_DataEntitySchemaProPanel\"><TABLE class=\"VDE_Design_DataEntitySchemaProTB\" cellspacing=\"0\" cellpadding=\"0\" ></TABLE></DIV><DIV class=\"VDE_Design_DataEntitySchemaOperationPanel\"></DIV>";//<IMG class=\"VDE_Design_DataEntitySchemaOperationImage\"></IMG><LABEL class=\"VDE_Design_DataEntitySchemaOperationLabel\">新增属性</LABEL></DIV>";
        desc.Image = desc.VisualElement.querySelector("IMG.VDE_Design_DataEntitySchemaImage");
        desc.Image.src = "design/themes/dbtheme/images/dmdesignview/dataentity.png";
        desc.HeaderDiv = desc.VisualElement.querySelector("DIV.VDE_Design_DataEntitySchemaHeader");
        desc.TextLabel = desc.VisualElement.querySelector("LABEL.VDE_Design_DataEntitySchemaText");
        desc.PropertiesPanel = desc.VisualElement.querySelector("TABLE.VDE_Design_DataEntitySchemaProPanel");
        desc.PropertiesTB = desc.VisualElement.querySelector("TABLE.VDE_Design_DataEntitySchemaProTB");
        desc.OpDiv = desc.VisualElement.querySelector("DIV.VDE_Design_DataEntitySchemaOperationPanel");

        desc.OpDiv.onclick = function (e) {

            desc.AddProperty(desc.NewDataProperty());

        }
        

        desc.HeaderDiv.onmousedown = desc.HeaderMouseDown;
    
        desc.AddProperty(new DBFX.Design.DataEntityProperty(desc, "_id", "对象唯一识别号", "string", true));

        //
       
        //初始化工具栏
        desc.OpDiv.appendChild(desc.ToolStrip.VisualElement);
        desc.ToolStrip.IsBeginUpdate = true;

        var tbaddproperty = new DBFX.Web.Controls.ToolStripItem("新增属性", "design/themes/dbtheme/images/dmdesignview/propertyadd.png", function (tb,item) {

            desc.AddProperty(desc.NewDataProperty());

        });
        desc.ToolStrip.AddItem(tbaddproperty);

        desc.ToolStrip.AddItem(new DBFX.Web.Controls.ToolStripSeparator());

        tbaddproperty = new DBFX.Web.Controls.ToolStripItem("删除属性", "design/themes/dbtheme/images/dmdesignview/propertydelete.png", function (tb, item) {

            if (desc.SelectedProperty != undefined)
                desc.RemoveProperty(desc.SelectedProperty);

        });
        desc.ToolStrip.AddItem(tbaddproperty);

        desc.ToolStrip.AddItem(new DBFX.Web.Controls.ToolStripSeparator());
        tbaddproperty = new DBFX.Web.Controls.ToolStripItem("删除实体", "design/themes/dbtheme/images/dmdesignview/delete.png", function (tb, item) {

            desc.DesignView.RemoveDataEntitySchema(desc);

        });

        desc.ToolStrip.AddItem(tbaddproperty);

        desc.ToolStrip.IsBeginUpdate = false;
        desc.ToolStrip.ReArrayItems();

    }

    desc.NewDataProperty = function () {

        var uid = DBFX.GetUniqueNumber();

        var dp = new DBFX.Design.DataEntityProperty(desc, "dp" + uid, "New Property", "string", false);

        return dp;

    }


    Object.defineProperty(desc, "ObjImageUrl", {
        get: function () {
            return desc.Image.src;
        }
    });

    desc.ObjType = "DataEntitySchema";


    Object.defineProperty(desc, "Description", {
        get: function () {

            return desc.description;

        },
        set: function (v) {
            desc.description = v;
            desc.OnPropertyChanged("Description", v);

        }
    });

    Object.defineProperty(desc, "Title", {
        get: function () {

            return desc.title;

        },
        set: function (v) {
            desc.title = v;
            desc.TextLabel.innerText = desc.name + "[" + v + "]";
            desc.OnPropertyChanged("Title", v);
        }
    });

    desc.SetName = function (v) {

        if (!desc.DesignView.ValidateDESName(v, desc.name)) {

            DBFX.Web.Forms.MessageBox.Show("同一数据模型中不能使用相同的实体名称，请重新修改!", "数据模型设计器", function (r) { }, 0);
            desc.DesignView.OnEntitySchemaSelected(undefined);

            desc.DesignView.OnEntitySchemaSelected(desc);
        }
        else {

            desc.DesignView.ReNameDataEntitySchema(v, desc);
            desc.TextLabel.innerText = v+"["+desc.title+"]";
            desc.name = v;
        }

        desc.OnPropertyChanged("Name", v);
    }

    //
    desc.HeaderMouseUp = function (e) {


        desc.StartPoint = undefined;
        window.onmouseup = undefined;
        window.onmousemove = undefined;
        desc.DesignView.MoveTag.style.top = "0px";
        desc.DesignView.MoveTag.style.left = "0px";
        desc.DesignView.MoveTag.style.display = "none";


    }


    desc.StartPoint = undefined;
   

    //
    desc.HeaderMouseDown = function (e) {
        if (e.buttons == 1) {
            desc.StartPoint = new Object();
            desc.StartPoint.x = e.screenX;
            desc.StartPoint.y = e.screenY;
            desc.StartPoint.l = desc.VisualElement.offsetLeft;
            desc.StartPoint.t = desc.VisualElement.offsetTop;
            window.onmouseup = desc.HeaderMouseUp;
            window.onmousemove = desc.HeaderMouseMove;

            desc.DesignView.MoveTag.style.top = (desc.StartPoint.t + desc.VisualElement.offsetHeight + 24) + "px";
            desc.DesignView.MoveTag.style.left = (desc.StartPoint.l + desc.VisualElement.offsetWidth + 24) + "px";
            desc.DesignView.MoveTag.style.display = "block";
        }
    }

    //鼠标移动
    desc.HeaderMouseMove = function (e) {

        if (desc.StartPoint == undefined)
            return;

        var ox =Math.abs( e.screenX - desc.StartPoint.x);
        var oy = Math.abs( e.screenY - desc.StartPoint.y);

        if (window.event.buttons == 1 && (ox>3 || oy>3)) {

            ox = e.screenX - desc.StartPoint.x;
            oy = e.screenY - desc.StartPoint.y + desc.DesignView.ModelView.offsetTop;

            var x = desc.StartPoint.l + ox;
            var y = desc.StartPoint.t + oy;
            desc.VisualElement.style.left = x + "px";
            desc.VisualElement.style.top = y + "px";

            desc.DesignView.MoveTag.style.top = (desc.StartPoint.t + desc.VisualElement.offsetHeight + 24) + "px";
            desc.DesignView.MoveTag.style.left = (desc.StartPoint.l + desc.VisualElement.offsetWidth + 24) + "px";

            desc.DesignView.ReDrawView();
        }



    }
    

    desc.MouseDown = function (e) {

        desc.DesignView.OnEntitySchemaSelected(desc);
        e.preventDefault();
        e.cancelBubble = true;        

    }

    Object.defineProperty(desc, "Selected", {
        get: function () {
            return desc.selected;
        }, set: function (v) {

            desc.selected = v;
            if (v == true) {
                desc.HeaderDiv.className = "VDE_Design_DataEntitySchemaHeaderSelected";
                if (desc.SelectedProperty != undefined)
                    desc.SelectedProperty.Actived = true;
            }
            else {
                desc.HeaderDiv.className = "VDE_Design_DataEntitySchemaHeader";

                if (desc.SelectedProperty != undefined)
                    desc.SelectedProperty.Actived = false;
            }

        }
    });


    desc.AddProperty = function (pi) {
        if (pi.propertyName == "_id" && desc.Properties.Values.length>0)
            return;

        if (desc.Properties.GetValue(pi.propertyName) != undefined) {

            throw ("已经存在名为 " + pi.propertyName + " 的属性，不能重复!");

        }
        else {

            desc.Properties.Add(pi.propertyName, pi);
            desc.PropertiesTB.appendChild(pi.VisualElement);

        }

    }


    //删除属性
    desc.RemoveProperty = function (pi) {

        if (pi.propertyName == "_id") {
            throw ("不能删除名为_id的属性，此属性为对象主键！");
            return;
        }
        var npi=undefined;
        if (pi.Actived) {

            var idx = desc.Properties.Values.IndexOf(pi);
   
            if (idx < desc.Properties.length - 1)
                npi = desc.Properties.Values[idx + 1];
            else
            if (idx >= desc.Properties.length-1 && idx > 0) {

                npi = desc.Properties.Values[idx - 1];
            }
            else
                npi = desc.Properties.Values[0];
        }
        
        desc.Properties.Remove(pi.propertyName);
        desc.PropertiesTB.removeChild(pi.VisualElement);

        if(npi!=undefined)
            desc.OnPropertySelected(npi);

    }

    desc.OnShowPopupDesigner = function (dp) {

        var rec =dp.VisualElement.getBoundingClientRect();
        var pt = new Object();
        pt.x = rec.right+1;
        pt.y = rec.top;
        desc.DesignView.PopupPanel.ShowAt(pt.x, pt.y,rec.height);
        desc.DesignView.PopupPanel.DataContext = dp;
        
    }

   

    desc.OnPropertySelected = function (dp) {

        if (desc.SelectedProperty != undefined)
            desc.SelectedProperty.Actived = false;
       
        desc.SelectedProperty = dp;
        dp.Actived = true;

        desc.DesignView.ObjectEditor.ObjectSelected(dp);

    }


    desc.OnCreateHandle();
    return desc;

}

//数据模型属性
DBFX.Design.DataEntityProperty = function (desc,pname,ptitle,dtype,isprimary) {

    var dp = new DBFX.Web.Controls.Control("DataModelPropertyItem");
    dp.ClassDescriptor.Designers = ["DBFX.Design.ControlDesigners.DataPropertyDesigner"];
    dp.DataEntity = desc;
    dp.VisualElement = document.createElement("TR");
    dp.ClientDiv = dp.VisualElement;
    dp.OnCreateHandle();
    dp.OnCreateHandle = function () {

        dp.VisualElement.innerHTML = "<TD class=\"VDE_Design_DataModelPropertyItemImageTD\"><IMG class=\"VDE_Design_DataModelPropertyItemImage\" src=\"\"></IMG></TD> <TD class=\"VDE_Design_DataModelPropertyItemName\"></TD><TD class=\"VDE_Design_DataModelPropertyDataType\"></TD> <TD class=\"VDE_Design_DataModelPropertyItemTitle\"></TD><TD class=\"VDE_Design_DataModelPropertyItemMoreTD\"><IMG class=\"VDE_Design_DataModelPropertyItemMoreImage\"></IMG></TD>";
        dp.Image = dp.VisualElement.querySelector("IMG.VDE_Design_DataModelPropertyItemImage");
        dp.NameTD = dp.VisualElement.querySelector("TD.VDE_Design_DataModelPropertyItemName");
        dp.TitleTD = dp.VisualElement.querySelector("TD.VDE_Design_DataModelPropertyItemTitle");
        dp.TypeTD = dp.VisualElement.querySelector("TD.VDE_Design_DataModelPropertyDataType");
        dp.MoreImage = dp.VisualElement.querySelector("IMG.VDE_Design_DataModelPropertyItemMoreImage");
        dp.MoreImage.src = "design/themes/" + app.CurrentTheme + "/images/dmdesignview/more.png";
        dp.Image.src = "design/themes/" + app.CurrentTheme + "/images/dmdesignview/property.png";

        dp.PropertyName = pname;
        dp.PropertyTitle = ptitle;
        dp.DataType = dtype;
        dp.IsPrimaryKey = isprimary;

        dp.Class = "VDE_Design_DataModelPropertyItem";

        dp.ObjImageUrl = dp.Image.src;
        dp.ObjType = "DataEntityProperty";

        dp.MoreImage.onmousedown = dp.ShowPopupDesigner;

        dp.checkRule = "";
        dp.inputTipText = "";
        dp.errorTipText = "";

    }

    Object.defineProperty(dp, "Actived", {
        get: function () {
            return dp.actived;
        }, set: function (v) {

            if (v == true)
                dp.Class = "VDE_Design_DataModelPropertyItemSelected";
            else
                dp.Class = "VDE_Design_DataModelPropertyItem";

            dp.actived = v;
        }
    });

    dp.MouseDown = function (e) {


        if (dp.DataEntity.Selected) {

            dp.DataEntity.OnPropertySelected(dp);
            e.cancelBubble=true;
            e.preventDefault();

        }



    }

    dp.MouseMove = function (e) {

        if(e.buttons==1)
            dp.DataEntity.DesignView.HitTestPropertyItem = dp;


    }

    dp.MouseOut = function (e) {

        if (e.buttons == 1 && !dp.VisualElement.contains(e.toElement)) {
            dp.DataEntity.DesignView.HitTestPropertyItem = undefined;
        }
    }


    Object.defineProperty(dp, "PropertyName", {
        get: function () {

            return dp.propertyName;
        },
        set: function (v) {

            dp.propertyName = v;
            dp.NameTD.innerText = v;
            dp.OnPropertyChanged("PropertyName", v);
        }
    });

    Object.defineProperty(dp, "PropertyTitle", {
        get: function () {
            return dp.propertyTitle;

        },
        set: function (v) {

            dp.propertyTitle = v;
            dp.TitleTD.innerText = v;
            dp.OnPropertyChanged("PropertyTitle", v);
        }
    });

    Object.defineProperty(dp, "DataType", {
        get: function () {

            return dp.dataType;

        },
        set: function (v) {

            dp.dataType = v;
            dp.TypeTD.innerText = v;
            dp.OnPropertyChanged("DataType", v);
        }
    });


    Object.defineProperty(dp, "Description", {
        get: function () {

            return dp.description;

        },
        set: function (v) {

            dp.description = v;
            dp.OnPropertyChanged("Description", v);
        }
    });

    Object.defineProperty(dp, "CheckRule", {
        get: function () {

            return dp.checkRule;
        },
        set: function (v) {

            dp.checkRule = v;
            dp.OnPropertyChanged("CheckRule", v);
        }
    });

    Object.defineProperty(dp, "InputTipText", {
        get: function () {

            return dp.inputTipText;

        },
        set: function (v) {

            dp.inputTipText = v;
            dp.OnPropertyChanged("InputTipText", v);
        }
    });


    Object.defineProperty(dp, "ErrorTipText", {
        get: function () {

            return dp.errorTipText;

        },
        set: function (v) {

            dp.errorTipText = v;
            dp.OnPropertyChanged("ErrorTipText", v);

        }
    });


    Object.defineProperty(dp, "ImageUrl", {
        get: function () {

            return dp.Image.src;

        },
        set: function (v) {

            dp.Image.src = v.replace("%currenttheme%", app.CurrentTheme);
            dp.OnPropertyChanged("ImageUrl", v);
        }
    });


    Object.defineProperty(dp, "IsPrimaryKey", {
        get: function () {

            return dp.isPrimaryKey;

        },
        set: function (v) {

            dp.isPrimaryKey = v;
            dp.OnPropertyChanged("IsPrimaryKey", v);
        }
    });

    //显示弹出验证码
    dp.ShowPopupDesigner = function (e) {


        dp.DataEntity.OnShowPopupDesigner(dp);

    }


    dp.OnCreateHandle();
    return dp;

}


//数据属性设计面板
DBFX.Design.DEPDesignPanel = function () {

    var ppnl=new DBFX.Web.Controls.PopupPanel();
    ppnl.OnCreateHandle();

    DBFX.Resources.LoadResource("design/DesignerTemplates/DMDesignerTemplates/DataPropertyDesigner.scrp", function (od) {

        

    }, ppnl);

    return ppnl;

}


DBFX.Design.DataRelation = function (dmv) {

    var dr = new DBFX.Web.Controls.Control("DataRelation");
    dr.ClassDescriptor.Serializer = "DBFX.Serializer.DataEntityRelationSerializer";
    dr.VisualElement = document.createElementNS("http://www.w3.org/2000/svg","polyline");
    dr.ClientDiv = dr.VisualElement;
    dr.Line = dr.VisualElement;
    dr.DesignView = dmv;
    dr.OnCreateHandle();
    dr.EP0 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dr.EP1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dr.OnCreateHandle = function () {

        dr.Line.setAttribute("fill", "lightgray");
        dr.Line.setAttribute("stroke","gray");
        dr.Line.setAttribute("stroke-width","3");
        dr.Line.setAttribute("stroke-linecap","square");
        dr.Line.setAttribute("stroke-linejoin","bevel");
        dr.Line.setAttribute("points", "155,50 160,50  275,50 280,50");

        dr.EP0.setAttribute("cx", "153");
        dr.EP0.setAttribute("cy", "49");
        dr.EP0.setAttribute("r", "4");
        dr.EP0.setAttribute("stroke", "gray");
        dr.EP0.setAttribute("fill", "lightgray");

        dr.EP1.setAttribute("cx", "282");
        dr.EP1.setAttribute("cy", "49");
        dr.EP1.setAttribute("r", "4");
        dr.EP1.setAttribute("stroke", "gray");
        dr.EP1.setAttribute("fill", "lightorange");

        dr.EP0.onmousedown = function (e) {

            if (e.buttons == 1) {
                dr.DesignView.HitTestPropertyItem = undefined;
                window.onmouseup = dr.onmoveto;
                window.onmousemove = dr.epmoving;
                dr.StartMoving = true;
                dr.MoveElement = dr.EP0;
                dr.SP = dr.EP0.getBoundingClientRect();
                dr.OLP = new Object();
                dr.OLP.x = dr.EP0.cx.baseVal.value;
                dr.OLP.y = dr.EP0.cy.baseVal.value;
            }

        }


        dr.EP1.onmousedown = function (e) {

            if (e.buttons == 1) {
                dr.DesignView.HitTestPropertyItem = undefined;
                window.onmouseup = dr.onmoveto;
                window.onmousemove = dr.epmoving;
                dr.StartMoving = true;
                dr.MoveElement = dr.EP1;
                dr.SP = dr.EP1.getBoundingClientRect();
                dr.OLP = new Object();
                dr.OLP.x = dr.EP1.cx.baseVal.value;
                dr.OLP.y = dr.EP1.cy.baseVal.value;
                
            }

        }

        dr.epmoving = function (e) {

            if (dr.StartMoving) {

                var x = dr.OLP.x+ (event.pageX - dr.SP.left);
                var y = dr.OLP.y + (event.pageY - dr.SP.top);

                if (dr.DesignView.HitTestPropertyItem != undefined) {


                    var rc = dr.DesignView.HitTestPropertyItem.VisualElement.getBoundingClientRect();
                    x = dr.OLP.x + (rc.left - dr.SP.left) + rc.width;
                    y = dr.OLP.y + (rc.top - dr.SP.top) + 12;
                    dr.MoveElement.PropertyItem = dr.DesignView.HitTestPropertyItem;

                }
                else {

                    dr.MoveElement.PropertyItem = null;

                }

                dr.MoveElement.cx.baseVal.value = x;
                dr.MoveElement.cy.baseVal.value = y;


                var ep0 = new Object();
                ep0.x = dr.EP0.cx.baseVal.value;
                ep0.y = dr.EP0.cy.baseVal.value;

                var ep1 = new Object();
                ep1.x = dr.EP1.cx.baseVal.value;
                ep1.y = dr.EP1.cy.baseVal.value;

                var pts = (ep0.x + 2) + "," + ep0.y + " " + (ep0.x + 10) + "," + ep0.y + " " + (ep1.x + 10) + "," + ep1.y + " " + (ep1.x + 2) + "," + ep1.y;


                dr.Line.setAttribute("points", pts);


            }


        }

        dr.onmoveto = function (e) {

            window.onmouseup = null;
            dr.StartMoving = false;
            dr.DesignView.HitTestPropertyItem = undefined;

        }



        Object.defineProperty(dr, "ParentProperty", {
            get: function () {

                return dr.EP0.PropertyItem;

            },
            set: function (v) {

                dr.EP0.PropertyItem = v;
            }
        });



        Object.defineProperty(dr, "ChildProperty", {
            get: function () {
                return dr.EP1.PropertyItem;
            },
            set: function (v) {

                dr.EP1.PropertyItem = v;

            }
        });


        dr.ReLoctionEP = function () {


            //第一个节点位置
            var OLP = new Object();
            var SP = Object();
            if (dr.EP0.PropertyItem != undefined) {
                OLP.x = dr.EP0.cx.baseVal.value;
                OLP.y = dr.EP0.cy.baseVal.value;
                SP = dr.EP0.getBoundingClientRect();
                var rc = dr.EP0.PropertyItem.VisualElement.getBoundingClientRect();
                var x = OLP.x + (rc.left - SP.left) + rc.width;
                var y = OLP.y + (rc.top - SP.top) + 12;

                dr.EP0.cx.baseVal.value = x;
                dr.EP0.cy.baseVal.value = y;
            }
            //第二个节点位置
            if (dr.EP1.PropertyItem != undefined) {
                OLP = new Object();
                OLP.x = dr.EP1.cx.baseVal.value;
                OLP.y = dr.EP1.cy.baseVal.value;

                SP = dr.EP1.getBoundingClientRect();
                var rc = dr.EP1.PropertyItem.VisualElement.getBoundingClientRect();
                var x = OLP.x + (rc.left - SP.left) + rc.width;
                var y = OLP.y + (rc.top - SP.top) + 12;

                dr.EP1.cx.baseVal.value = x;
                dr.EP1.cy.baseVal.value = y;
            }

            var ep0 = new Object();
            ep0.x = dr.EP0.cx.baseVal.value;
            ep0.y = dr.EP0.cy.baseVal.value;

            var ep1 = new Object();
            ep1.x = dr.EP1.cx.baseVal.value;
            ep1.y = dr.EP1.cy.baseVal.value;

            var pts = (ep0.x + 2) + "," + ep0.y + " " + (ep0.x + 10) + "," + ep0.y + " " + (ep1.x + 10) + "," + ep1.y + " " + (ep1.x + 2) + "," + ep1.y;

            dr.Line.setAttribute("points", pts);



        }
    }

    //Object.defineProperty(dr,"

    dr.OnCreateHandle();
    return dr;

}


DBFX.Design.StoreProcedureView = function () {
    var spv = new DBFX.Web.Controls.Panel("StoreProcedureView");
    spv.OnCreateHandle();



    return spv;
}
