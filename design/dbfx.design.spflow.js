DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Design.Workflow");
DBFX.RegisterNamespace("DBFX.Design.WFActivities");
DBFX.RegisterNamespace("DBFX.Design.ActivityDesigners");
//************************************************************************************************************
//*** SPFlow设计器视图
//************************************************************************************************************
DBFX.Design.SPFlowDesignView = function () {

    var fp = new DBFX.Web.Forms.FormPart("design/DesignerTemplates/SPDesignerTemplates/SPFlowDesignView.scrp", function (dv) {

        fp.ToolkitBox = fp.FormControls.VDE_DV_ToolkitBox;
        fp.DesignView = fp.FormControls.VDE_DV_DesignView;
        fp.ObjectEditor = fp.FormControls.VDE_DV_ObjectEditor;
        fp.DesignView.SequenceRoot.Text = "存储过程";

        fp.DesignView.CustomSerializer = new DBFX.Serializer.SPFlowDesinViewSerializer();
        fp.DesignView.ParametersList = new DBFX.Design.WFActivities.Data.DefParas();
        fp.DesignView.ParametersList.Margin = "1px";
        fp.DesignView.ParametersList.Display = "block";
        fp.DesignView.ParametersList.IsHasContextMenu = false;
        fp.DesignView.ParametersList.Namespace = "DBFX.Design.WFActivities.Data.DefParas";
        fp.DesignView.ParametersList.NSSN = "wfa";
        fp.DesignView.ParametersList.ObjType = "DefParas";
        fp.DesignView.ParametersList.MinHeight = "32px";
        fp.HideECButton = false;
        fp.DesignView.ParametersList.Parent = fp.DesignView;
        fp.DesignView.ParametersList.DesignView = fp.DesignView;

        Object.defineProperty(fp.DesignView, "ParametersStr", {
            get: function () {

                return fp.DesignView.ParametersList.ParametersStr;
            },
            set: function (v) {

                fp.DesignView.ParametersList.ParametersStr = v;

            }
        });

        fp.InitDesignView();


    });

    fp.InitDesignView = function () {
        fp.ToolkitBox.LoadTKItems("LC.GAS.ADP.DesignerObjects.Tooltiks.WFCollection.SPActivities");

        fp.ObjectEditor.Initialize(fp.DesignView);
        fp.DesignView.IsStoreProcedureView = 1;
        fp.LoadResource(fp.ResourceContext, fp.LoadXml);

    }

    fp.SaveToXML = function () {

        return fp.DesignView.SaveToXML();

    }

    //通过XML数据加载UI流程图
    fp.LoadXml = function (xml) {

        fp.DesignView.LoadXml(xml);
        fp.DesignView.SequenceRoot.ActivitiesPanel.InsertControl(fp.DesignView.ParametersList, fp.DesignView.SequenceRoot.ActivitiesPanel.Controls[0], 0);
        fp.FormControls.btnSave.Enabled=true;

    }


    //保存数据
    fp.SaveResource = function () {

        DBFX.Web.Forms.MessageBox.Show("没有为设计器指定保存方法!", "深蓝砚台开发者中心", function (r) {


        }, 2);

    }


    //保存回调
    fp.SaveResourceCompleted = function (rescode) { };

    fp.LoadResource = function (resctx, cb) {


        DBFX.Web.Forms.MessageBox.Show("没有为设计器指定资源加载方法", "深蓝砚台开发者中心", function (r) {


        }, 2);


    }

    return fp;

}

//************************************************************************************************************
//*** 加载SPFlow设计视图
//************************************************************************************************************
DBFX.Design.Service.LauchSPDesignView = function (dvi, cb) {

    if (app.MainForm.FormControls.ActivedDockManager.ActiveContent(dvi.Name) == null) {

        var spvw = new DBFX.Design.SPFlowDesignView();

        cb(spvw);

        spvw.ResourceContext = dvi;

        app.MainForm.FormControls.ActivedDockManager.AddContent(dvi.Title, spvw, 3, dvi.Name);


    }


}

//************************************************************************************************************
//***存储过程保存命令
//************************************************************************************************************
DBFX.Design.FormView.SPDesignViewSave = function (e) {

    var form = e.Sender.FormContext.Form;
    form.FormControls.VDE_DV_DesignView.IsContentChanged = true;
    if (form.FormControls.VDE_DV_DesignView.IsContentChanged == true) {

        //系列化对象
        var xdoc = form.FormControls.VDE_DV_DesignView.SaveToXML();

        var xmldata = (new XMLSerializer()).serializeToString(xdoc.documentElement);

        if (form.FormControls.VDE_DV_DesignView.ToCode != undefined)
            var code = form.FormControls.VDE_DV_DesignView.ToCode();

        if (form.SaveResource != undefined) {
            form.SaveResource(form.ResourceContext, xmldata, function (saveResult) {
                form.FormControls.VDE_DV_DesignView.IsContentChanged = !saveResult;
            });
        }
        else {
            DBFX.Web.Forms.MessageBox.Show("没有为设计器指定保存方法?", "深蓝砚台开发者中心", function (r) {


            }, 2);
        }
    }
}
app.GlobalCommands.Register("VDE_Design_FormDesignView_SPDesignViewSave", DBFX.Design.FormView.SPDesignViewSave);

//************************************************************************************************************
//***UI设计器系列化程序
//************************************************************************************************************
DBFX.Serializer.SPFlowDesinViewSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        //系列化
        DBFX.Serializer.DeSerialProperty("ParametersStr", c, xe);
    }


    //系列化
    this.Serialize = function (c, xe, ns) {

        DBFX.Serializer.SerialProperty("ParametersStr", c.ParametersStr, xe);
    }

}

//************************************************************************************************************
//*** 数据访问功能命令
//************************************************************************************************************
DBFX.Design.WFActivities.Data.DefParas = function () {

    var defp = new DBFX.Design.WFActivities.Activity("DefParas");
    defp.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SPDefParasDesigner");
    defp.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.DefParasSerializer";
    defp.Text = "参数申明";
    defp.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/inparameter.png";
    defp.Parameters = new Array();
    defp.ItemsPanel.FormContext = new Object();
    defp.ItemsPanel.FormControls = new Object();
    defp.ItemsPanel.FormContext.Form = defp.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/DefParameter.scrp", function (pas) {

        defp.lvwParameters = pas.FormContext.Form.FormControls.lvwParameters;
        defp.lvwParameters.ItemSource = defp.Parameters;
        defp.lvwParameters.ItemClick = defp.ParaItemClick;
        defp.lvwParameters.AllowReOrder = true;
 

        defp.Expanded = false;

    }, defp.ItemsPanel);

    defp.ParaItemClick = function (e, item) {

        item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPDefParameterDesigner"];
        item.ObjType = "Parameter";
        item.ParaDef = defp;
        defp.DesignView.ObjectEditor.ObjectSelected(item);


    }

    defp.parametersStr = "";
    Object.defineProperty(defp, "ParametersStr", {
        get: function () {
            return JSON.stringify(defp.lvwParameters.ItemSource);
        },
        set: function (v) {

            defp.parametersStr = v;

            if (defp.parametersStr != undefined && defp.parametersStr != "") {

                defp.Parameters = JSON.parse(defp.parametersStr);

                if (defp.lvwParameters != undefined)
                    defp.lvwParameters.ItemSource = defp.Parameters;

            }


        }
    });

    defp.SetActived = function (v) {

        if (v == false) {

            defp.lvwParameters.SelectedItem = undefined;

        }

    }

    defp.HideECButton = false;
    defp.HideSettingButton = true;
    defp.HideAnnotateButton = true;

    return defp;
}

//************************************************************************************************************
//*** 定义变量
//************************************************************************************************************
DBFX.Design.WFActivities.Data.DefVars = function () {
    
    var defv = new DBFX.Design.WFActivities.Activity("DefVars");
    defv.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SPDefVarsDesigner");
    defv.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.DefVarsSerializer";
    defv.Text = "变量定义";
    defv.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/defvars.png";
    defv.Variables = new Array();
    defv.ItemsPanel.FormContext = new Object();
    defv.ItemsPanel.FormControls = new Object();
    defv.ItemsPanel.FormContext.Form = defv.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/DefVars.scrp", function (pas) {

        defv.lvwVariables = pas.FormContext.Form.FormControls.lvwVariables;
        //defv.Variables = [{ VarName: "Var1", DataType: "string", DefaultValue: "" }];
        defv.lvwVariables.ItemSource = defv.Variables;
        defv.lvwVariables.ItemClick = defv.VarItemClick;

        defv.Expanded = false;

    }, defv.ItemsPanel);

    defv.VarItemClick = function (e, item) {

        item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPDefVariablesDesigner"];
        item.ObjType = "Variable";
        item.VarDef = defv;
        defv.DesignView.ObjectEditor.ObjectSelected(item);


    }

    defv.variablesStr = "";
    Object.defineProperty(defv, "VariablesStr", {
        get: function () {
            return defv.variablesStr;
        },
        set: function (v) {

            defv.variablesStr = v;

            if (defv.variablesStr != undefined && defv.variablesStr != "") {

                defv.Variables = JSON.parse(defv.variablesStr);

                if (defv.lvwVariables != undefined)
                    defv.lvwVariables.ItemSource = defv.Variables;

            }


        }
    });

    defv.SetActived = function (v) {

        if (v == false) {

            defv.lvwVariables.SelectedItem = undefined;

        }

    }
    defv.HideECButton = false;
    defv.HideSettingButton = true;
    defv.HideAnnotateButton = true;

    return defv;

}

//************************************************************************************************************
//***查询命令
//************************************************************************************************************
DBFX.Design.WFActivities.Data.QueryCmd = function () {

    var qcmd = new DBFX.Design.WFActivities.Activity("QueryCmd");
    qcmd.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SPQueryCmdDesigner");
    qcmd.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.QueryCmdSerializer";
    qcmd.Text = "数据查询";
    qcmd.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/querycmd.png";
    qcmd.OutputMaps = new Array();
    qcmd.Filters = new Array();
    qcmd.SortItems = new Array();
    qcmd.LimitRows = -1;
    qcmd.SkipRows = -1;
    qcmd.ItemsPanel.FormContext = new Object();
    qcmd.ItemsPanel.FormControls = new Object();
    qcmd.ItemsPanel.FormContext.Form = qcmd.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/QueryCmd.scrp", function (qdc) {

        qcmd.lvwOutputMaps = qdc.FormControls.lvwOutputMaps;
        qcmd.lvwOutputMaps.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPOutputMapDesigner"];
            item.ObjType = "OutputMap";
            item.Cmd = qcmd;
            qcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        qcmd.lvwFilters = qdc.FormControls.lvwFilters;
        qcmd.lvwFilters.AllowReOrder = true;
        qcmd.lvwFilters.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPFilterDesigner"];
            item.ObjType = "Filter";
            item.Cmd = qcmd;
            qcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        qcmd.lvwSortItems = qdc.FormControls.lvwSortItems;
        qcmd.lvwSortItems.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPSortDesigner"];
            item.ObjType = "SortItem";
            item.Cmd = qcmd;
            qcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }


        //输出映射
        qcmd.lvwOutputMaps.ItemSource = qcmd.OutputMaps;
        //筛选条件
        qcmd.lvwFilters.ItemSource = qcmd.Filters;
        //排序设置
        qcmd.lvwSortItems.ItemSource = qcmd.SortItems;

        qcmd.Expanded = false;

    },qcmd.ItemsPanel);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///表名称
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Object.defineProperty(qcmd, "TableName", {
        get: function () {
            return qcmd.tableName;
        },
        set: function (v) {

            qcmd.tableName = v;


        }
    });

    //
    Object.defineProperty(qcmd, "VarName", {
        get: function () {
            return qcmd.varName;
        },
        set: function (v) {

            qcmd.varName = v;


        }
    });

    //
    Object.defineProperty(qcmd, "ResultType", {
        get: function () {
            return qcmd.resultType;
        },
        set: function (v) {

            qcmd.resultType = v;


        }
    });


    qcmd.filtersStr = "";
    Object.defineProperty(qcmd, "FiltersStr", {
        get: function () {
            return qcmd.filtersStr;
        },
        set: function (v) {

            qcmd.filtersStr = v;

            if (qcmd.filtersStr != undefined && qcmd.filtersStr != "") {

                qcmd.Filters = JSON.parse(qcmd.filtersStr);

                if(qcmd.lvwFilters!=undefined)
                    qcmd.lvwFilters.ItemSource = qcmd.Filters;

            }


        }
    });

    qcmd.outputMapsStr = "";
    Object.defineProperty(qcmd, "OutputMapsStr", {
        get: function () {
            return qcmd.outputMapsStr;
        },
        set: function (v) {

            qcmd.outputMapsStr = v;

            if (qcmd.outputMapsStr != undefined && qcmd.outputMapsStr != "") {

                qcmd.OutputMaps = JSON.parse(qcmd.outputMapsStr);

                if (qcmd.lvwOutputMaps != undefined)
                    qcmd.lvwOutputMaps.ItemSource = qcmd.OutputMaps;

            }


        }
    });

    qcmd.sortItemsStr = "";
    Object.defineProperty(qcmd, "SortItemsStr", {
        get: function () {
            return qcmd.sortItemsStr;
        },
        set: function (v) {

            qcmd.sortItemsStr = v;

            if (qcmd.sortItemsStr != undefined && qcmd.sortItemsStr != "") {

                qcmd.SortItems = JSON.parse(qcmd.sortItemsStr);

                if (qcmd.lvwSortItems != undefined)
                    qcmd.lvwSortItems.ItemSource = qcmd.SortItems;

            }


        }
    });

    qcmd.SetActived = function (v) {

        if (v == false) {

            
            qcmd.lvwOutputMaps.SelectedItem = undefined;
            qcmd.lvwFilters.SelectedItem = undefined;

        }

    }
    qcmd.HideECButton = false;
    qcmd.HideSettingButton = true;
    qcmd.HideAnnotateButton = true;
    return qcmd;

}
//
DBFX.Design.WFSerializers.QueryCmdSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("OutputMapsStr", a, xe);
        DBFX.Serializer.DeSerialProperty("FiltersStr", a, xe);
        DBFX.Serializer.DeSerialProperty("SortItemsStr", a, xe);
        DBFX.Serializer.DeSerialProperty("TableName", a, xe);
        DBFX.Serializer.DeSerialProperty("VarName", a, xe);
        DBFX.Serializer.DeSerialProperty("ResultType", a, xe);
        DBFX.Serializer.DeSerialProperty("LimitRows", a, xe);
        DBFX.Serializer.DeSerialProperty("SkipRows", a, xe);
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("OutputMapsStr", JSON.stringify(a.OutputMaps), xe);
        DBFX.Serializer.SerialProperty("FiltersStr", JSON.stringify(a.Filters), xe);
        DBFX.Serializer.SerialProperty("SortItemsStr", JSON.stringify(a.SortItems), xe);
        DBFX.Serializer.SerialProperty("TableName", a.TableName, xe);
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);
        DBFX.Serializer.SerialProperty("ResultType", a.ResultType, xe);
        DBFX.Serializer.SerialProperty("LimitRows", a.LimitRows, xe);
        DBFX.Serializer.SerialProperty("SkipRows", a.SkipRows, xe);
    }



}
//************************************************************************************************************
//***更新命令
//************************************************************************************************************
DBFX.Design.WFActivities.Data.UpdateCmd = function () {

    var ucmd = new DBFX.Design.WFActivities.Activity("UpdateCmd");
    ucmd.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SPUpdateCmdDesigner");
    ucmd.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.UpdateCmdSerializer";
    ucmd.Text = "数据更新";
    ucmd.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/updatecmd.png";
    ucmd.DataItems = new Array();
    ucmd.Filters = new Array();
    ucmd.ItemsPanel.FormContext = new Object();
    ucmd.ItemsPanel.FormControls = new Object();
    ucmd.ItemsPanel.FormContext.Form = ucmd.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/UpdateCmd.scrp", function (udc) {

        ucmd.lvwDataItems = udc.FormControls.lvwDataItems;
        ucmd.lvwDataItems.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPUpValueItemDesigner"];
            item.ObjType = "UpdateItem";
            item.Cmd = ucmd;
            ucmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        ucmd.lvwFilters = udc.FormControls.lvwFilters;
        ucmd.lvwFilters.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPFilterDesigner"];
            item.ObjType = "Filter";
            item.Cmd = ucmd;
            ucmd.DesignView.ObjectEditor.ObjectSelected(item);

        }



        ucmd.lvwDataItems.ItemSource = ucmd.DataItems;

        ucmd.lvwFilters.ItemSource = ucmd.Filters;

        ucmd.Expanded = false;

    }, ucmd.ItemsPanel);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///表名称
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Object.defineProperty(ucmd, "TableName", {
        get: function () {
            return ucmd.tableName;
        },
        set: function (v) {

            ucmd.tableName = v;


        }
    });

    Object.defineProperty(ucmd, "VarName", {
        get: function () {
            return ucmd.varName;
        },
        set: function (v) {

            ucmd.varName = v;


        }
    });

    ucmd.filtersStr = "";
    Object.defineProperty(ucmd, "FiltersStr", {
        get: function () {
            return JSON.stringify(ucmd.Filters);
        },
        set: function (v) {

            ucmd.filtersStr = v;

            if (ucmd.filtersStr != undefined && ucmd.filtersStr != "") {

                ucmd.Filters = JSON.parse(ucmd.filtersStr);

                if (ucmd.lvwFilters != undefined)
                    ucmd.lvwFilters.ItemSource = ucmd.Filters;

            }


        }
    });

    ucmd.dataItemsStr = "";
    Object.defineProperty(ucmd, "DataItemsStr", {
        get: function () {
            return JSON.stringify(ucmd.DataItems);
        },
        set: function (v) {

            ucmd.dataItemsStr = v;

            if (ucmd.dataItemsStr != undefined && ucmd.dataItemsStr != "") {

                ucmd.DataItems = JSON.parse(ucmd.dataItemsStr);

                if (ucmd.lvwDataItems != undefined)
                    ucmd.lvwDataItems.ItemSource = ucmd.DataItems;

            }


        }
    });


    ucmd.SetActived = function (v) {

        if (v == false) {


            ucmd.lvwDataItems.SelectedItem = undefined;
            ucmd.lvwFilters.SelectedItem = undefined;

        }

    }

    ucmd.HideECButton = false;
    ucmd.HideSettingButton = true;
    ucmd.HideAnnotateButton = true;
    return ucmd;

}



//************************************************************************************************************
//***查找并更新命令
//************************************************************************************************************
DBFX.Design.WFActivities.Data.FindAndUpdateCmd =function ()
{

    var f2ucmd = new DBFX.Design.WFActivities.Activity("FindAndUpdateCmd");
    f2ucmd.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SPFindAndUpdateCmdDesigner");
    f2ucmd.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.FindAndUpdateCmdSerializer";
    f2ucmd.Text = "查找数据并更新";
    f2ucmd.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/findandupdatecmd.png";
    f2ucmd.DataItems = new Array();
    f2ucmd.Filters = new Array();
    f2ucmd.ItemsPanel.FormContext = new Object();
    f2ucmd.ItemsPanel.FormControls = new Object();
    f2ucmd.ItemsPanel.FormContext.Form = f2ucmd.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/FindAndUpdateCmd.scrp", function (udc) {

        f2ucmd.lvwDataItems = udc.FormControls.lvwDataItems;
        f2ucmd.lvwDataItems.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPUpValueItemDesigner"];
            item.ObjType = "UpdateItem";
            item.Cmd = f2ucmd;
            f2ucmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        f2ucmd.lvwFilters = udc.FormControls.lvwFilters;
        f2ucmd.lvwFilters.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPFilterDesigner"];
            item.ObjType = "Filter";
            item.Cmd = f2ucmd;
            f2ucmd.DesignView.ObjectEditor.ObjectSelected(item);

        }
        f2ucmd.lvwFilters.AllowReOrder = true;


        f2ucmd.lvwDataItems.ItemSource = f2ucmd.DataItems;

        f2ucmd.lvwFilters.ItemSource = f2ucmd.Filters;

        f2ucmd.Expanded = false;

    }, f2ucmd.ItemsPanel);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///表名称
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Object.defineProperty(f2ucmd, "TableName", {
        get: function () {
            return f2ucmd.tableName;
        },
        set: function (v) {

            f2ucmd.tableName = v;


        }
    });

    Object.defineProperty(f2ucmd, "VarName", {
        get: function () {
            return f2ucmd.varName;
        },
        set: function (v) {

            f2ucmd.varName = v;


        }
    });

    f2ucmd.isNew = true;
    Object.defineProperty(f2ucmd, "IsNew", {
        get: function () {
            return f2ucmd.isNew;
        },
        set: function (v) {

            f2ucmd.isNew = v;


        }
    });

    f2ucmd.isUpset = false;
    Object.defineProperty(f2ucmd, "IsUpset", {
        get: function () {
            return f2ucmd.isUpset;
        },
        set: function (v) {

            f2ucmd.isUpset = v;


        }
    });

    f2ucmd.filtersStr = "";
    Object.defineProperty(f2ucmd, "FiltersStr", {
        get: function () {
            return JSON.stringify(f2ucmd.Filters);
        },
        set: function (v) {

            f2ucmd.filtersStr = v;

            if (f2ucmd.filtersStr != undefined && f2ucmd.filtersStr != "") {

                f2ucmd.Filters = JSON.parse(f2ucmd.filtersStr);

                if (f2ucmd.lvwFilters != undefined)
                    f2ucmd.lvwFilters.ItemSource = f2ucmd.Filters;

            }


        }
    });

    f2ucmd.dataItemsStr = "";
    Object.defineProperty(f2ucmd, "DataItemsStr", {
        get: function () {
            return JSON.stringify(f2ucmd.DataItems);
        },
        set: function (v) {

            f2ucmd.dataItemsStr = v;

            if (f2ucmd.dataItemsStr != undefined && f2ucmd.dataItemsStr != "") {

                f2ucmd.DataItems = JSON.parse(f2ucmd.dataItemsStr);

                if (f2ucmd.lvwDataItems != undefined)
                    f2ucmd.lvwDataItems.ItemSource = f2ucmd.DataItems;

            }


        }
    });


    f2ucmd.SetActived = function (v) {

        if (v == false) {


            f2ucmd.lvwDataItems.SelectedItem = undefined;
            f2ucmd.lvwFilters.SelectedItem = undefined;

        }

    }

    f2ucmd.HideECButton = false;
    f2ucmd.HideSettingButton = true;
    f2ucmd.HideAnnotateButton = true;
    return f2ucmd;

}
    
DBFX.Design.WFSerializers.FindAndUpdateCmdSerializer = function () {

        //反系列化
        this.DeSerialize = function (a, xe, ns) {

            DBFX.Serializer.DeSerialProperty("Text", a, xe);
            DBFX.Serializer.DeSerialProperty("Name", a, xe);
            DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
            DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
            DBFX.Serializer.DeSerialProperty("DataItemsStr", a, xe);
            DBFX.Serializer.DeSerialProperty("FiltersStr", a, xe);
            DBFX.Serializer.DeSerialProperty("TableName", a, xe);
            DBFX.Serializer.DeSerialProperty("VarName", a, xe);
            DBFX.Serializer.DeSerialProperty("IsNew", a, xe);
            DBFX.Serializer.DeSerialProperty("IsUpset", a, xe);
        }


        //系列化
        this.Serialize = function (a, xe, ns) {

            DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
            DBFX.Serializer.SerialProperty("Text", a.Text, xe);
            DBFX.Serializer.SerialProperty("Name", a.Name, xe);
            DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
            DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
            DBFX.Serializer.SerialProperty("DataItemsStr", JSON.stringify(a.DataItems), xe);
            DBFX.Serializer.SerialProperty("FiltersStr", JSON.stringify(a.Filters), xe);
            DBFX.Serializer.SerialProperty("TableName", a.TableName, xe);
            DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);
            DBFX.Serializer.SerialProperty("IsNew", a.isNew, xe);
            DBFX.Serializer.SerialProperty("IsUpset", a.isUpset, xe);
        }


 }

DBFX.Design.ActivityDesigners.SPFindAndUpdateCmdDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/FindAndUpdateCmdDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            obdc.Cmd = obdc.dataContext;

            obdc.AddDataItem = obdc.FormContext.Form.FormControls.btnAddDataItem;
            obdc.AddDataItem.Click = function (e) {

                var item = { Operation: "$set", PropertyName: "Property" + (obdc.Cmd.DataItems.length + 1), Value: "", Expression: "" };
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
    obdc.Text = "查找数据并更新";
    return obdc;

}


//************************************************************************************************************
//***插入命令
//************************************************************************************************************
DBFX.Design.WFActivities.Data.InsertCmd = function () {

    var icmd = new DBFX.Design.WFActivities.Activity("InsertCmd");
    icmd.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SPInsertCmdDesigner");
    icmd.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.InsertCmdSerializer";
    icmd.Text = "数据插入";
    icmd.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/insertcmd.png";
    icmd.DataItems = new Array();
    icmd.Filters = new Array();
    icmd.ItemsPanel.FormContext = new Object();
    icmd.ItemsPanel.FormControls = new Object();
    icmd.ItemsPanel.FormContext.Form = icmd.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/InsertCmd.scrp", function (idc) {

        icmd.lvwDataItems = idc.FormControls.lvwDataItems;
        icmd.lvwDataItems.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPValueItemDesigner"];
            item.ObjType = "InsertItem";
            item.Cmd = icmd;
            icmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        icmd.lvwDataItems.ItemSource = icmd.DataItems;

        icmd.Expanded = false;

    }, icmd.ItemsPanel);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///表名称
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Object.defineProperty(icmd, "TableName", {
        get: function () {
            return icmd.tableName;
        },
        set: function (v) {

            icmd.tableName = v;


        }
    });

    Object.defineProperty(icmd, "VarName", {
        get: function () {
            return icmd.varName;
        },
        set: function (v) {

            icmd.varName = v;

        }
    });

    icmd.dataItemsStr = "";
    Object.defineProperty(icmd, "DataItemsStr", {
        get: function () {
            return icmd.dataItemsStr;
        },
        set: function (v) {

            icmd.dataItemsStr = v;

            if (icmd.dataItemsStr != undefined && icmd.dataItemsStr != "") {

                icmd.DataItems = JSON.parse(icmd.dataItemsStr);

                if (icmd.lvwDataItems != undefined)
                    icmd.lvwDataItems.ItemSource = icmd.DataItems;

            }


        }
    });

    icmd.SetActived = function (v) {

        if (v == false) {


            icmd.lvwDataItems.SelectedItem = undefined;

        }

    }

    icmd.HideECButton = false;
    icmd.HideSettingButton = true;
    icmd.HideAnnotateButton = true;

    return icmd;

}

//************************************************************************************************************
//***删除命令
//************************************************************************************************************
DBFX.Design.WFActivities.Data.DeleteCmd = function () {

    var dcmd = new DBFX.Design.WFActivities.Activity("DeleteCmd");
    dcmd.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SPDeleteCmdDesigner");
    dcmd.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.DeleteCmdSerializer";

    dcmd.Text = "数据删除";
    dcmd.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/deletecmd.png";
    dcmd.OutputMaps = new Array();
    dcmd.Filters = new Array();
    dcmd.ItemsPanel.FormContext = new Object();
    dcmd.ItemsPanel.FormControls = new Object();
    dcmd.ItemsPanel.FormContext.Form = dcmd.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/DeleteCmd.scrp", function (ddc) {

        dcmd.lvwFilters = ddc.FormControls.lvwFilters;
        dcmd.lvwFilters.ItemClick = function (e, item) {
            item.Cmd = dcmd;
            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPFilterDesigner"];
            item.ObjType = "Filter";
            dcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        dcmd.lvwFilters.ItemSource = dcmd.Filters;

        dcmd.Expanded = false;

    }, dcmd.ItemsPanel);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///表名称
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Object.defineProperty(dcmd, "TableName", {
        get: function () {
            return dcmd.tableName;
        },
        set: function (v) {

            dcmd.tableName = v;


        }
    });

    Object.defineProperty(dcmd, "VarName", {
        get: function () {
            return dcmd.varName;
        },
        set: function (v) {

            dcmd.varName = v;

        }
    });

    dcmd.filtersStr = "";
    Object.defineProperty(dcmd, "FiltersStr", {
        get: function () {
            return dcmd.filtersStr;
        },
        set: function (v) {

            dcmd.filtersStr = v;

            if (dcmd.filtersStr != undefined && dcmd.filtersStr != "") {

                dcmd.Filters = JSON.parse(dcmd.filtersStr);

                if (dcmd.lvwFilters != undefined)
                    dcmd.lvwFilters.ItemSource = dcmd.Filters;

            }

        }
    });



    dcmd.SetActived = function (v) {

        if (v == false) {


            dcmd.lvwFilters.SelectedItem = undefined;

        }

    }

    dcmd.HideECButton = false;
    dcmd.HideSettingButton = true;
    dcmd.HideAnnotateButton = true;

    return dcmd;

}

//************************************************************************************************************
//***定义游标
//************************************************************************************************************
DBFX.Design.WFActivities.Data.DefCursor = function () {



    var defcur = new DBFX.Design.WFActivities.Activity("DefineCursor");
    defcur.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.DefCursorDesigner");
    defcur.Text = "定义游标";
    defcur.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/cursor.png";


    defcur.HideECButton = false;
    defcur.HideSettingButton = true;
    defcur.HideAnnotateButton = true;
    return defcur;


}

//************************************************************************************************************
//***执行存储过程
//************************************************************************************************************
DBFX.Design.WFActivities.Data.ExecuteSP = function () {

    var execsp = new DBFX.Design.WFActivities.Activity("ExecuteSP");
    execsp.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ExecuteSPCmdSerializer";
    execsp.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ExecuteSPCmdDesigner");
    execsp.Text = "执行存储过程";
    execsp.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/ExecuteSP.png";
    execsp.ParametersList = new DBFX.Design.WFActivities.Data.DefParas();
    execsp.ParametersList.Margin = "1px";
    execsp.ParametersList.Display = "block";
    execsp.ParametersList.IsHasContextMenu = false;
    execsp.ParametersList.Namespace = "DBFX.Design.WFActivities.Data.DefParas";
    execsp.ParametersList.NSSN = "wfa";
    execsp.ParametersList.ObjType = "DefParas";
    execsp.ParametersList.MinHeight = "32px";
    execsp.HideECButton = false;
    execsp.ParametersList.Parent = execsp;
    execsp.ParametersList.DesignView = execsp.DesignView;

    execsp.AddControl(execsp.ParametersList);

    Object.defineProperty(execsp, "ParametersStr", {
        get: function () {

            return execsp.ParametersList.ParametersStr;
        },
        set: function (v) {

            execsp.ParametersList.ParametersStr = v;

        }
    });

    execsp.storeProcedure = "";
    //*******************************************************************************************************
    //*****存储过程
    //*******************************************************************************************************
    Object.defineProperty(execsp, "StoreProcedure", {
        get: function () {

            return execsp.storeProcedure;

        },
        set: function (v) {

            execsp.storeProcedure = v;

        }
    });

    execsp.dataBaseName = "";
    Object.defineProperty(execsp, "DataBaseName", {
        get: function () {

            return execsp.dataBaseName;

        },
        set: function (v) {

            execsp.dataBaseName = v;

        }
    });

    execsp.serverName = "";
    Object.defineProperty(execsp, "ServerName", {
        get: function () {

            return execsp.serverName;

        },
        set: function (v) {

            execsp.serverName = v;

        }
    });

    execsp.retVarName = "";
    Object.defineProperty(execsp, "RetVarName", {
        get: function () {

            return execsp.retVarName;

        },
        set: function (v) {

            execsp.retVarName = v;

        }
    });

    execsp.SetDesignView = function (v) {
        execsp.ParametersList.DesignView = v;
    }

    execsp.HideECButton = false;
    execsp.HideSettingButton = true;
    execsp.HideAnnotateButton = true;
    return execsp;


}

//
DBFX.Design.WFSerializers.ExecuteSPCmdSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ServerName", a, xe);
        DBFX.Serializer.DeSerialProperty("DataBaseName", a, xe);
        DBFX.Serializer.DeSerialProperty("StoreProcedure", a, xe);
        DBFX.Serializer.DeSerialProperty("ParametersStr", a, xe);
        DBFX.Serializer.DeSerialProperty("RetVarName", a, xe);
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("ServerName", a.ServerName, xe);
        DBFX.Serializer.SerialProperty("DataBaseName", a.DataBaseName, xe);
        DBFX.Serializer.SerialProperty("StoreProcedure", a.StoreProcedure, xe);
        DBFX.Serializer.SerialProperty("ParametersStr", a.ParametersStr, xe);
        DBFX.Serializer.SerialProperty("RetVarName", a.RetVarName, xe);
    }



}


//************************************************************************************************************
//***条件判断
//************************************************************************************************************
DBFX.Design.WFActivities.Data.IFBranch = function () {

    var ifb = new DBFX.Design.WFActivities.IFBranch();

    return ifb;

}

//************************************************************************************************************
//***分支选择
//************************************************************************************************************
DBFX.Design.WFActivities.Data.SwitchBranch = function () {

    var swb = new DBFX.Design.WFActivities.SwitchBranch();
    return swb;

}

//************************************************************************************************************
//***条件循环
//************************************************************************************************************
DBFX.Design.WFActivities.Data.While = function () {

    var wh = new DBFX.Design.WFActivities.While();
    return wh;

}

//************************************************************************************************************
//***计数循环
//************************************************************************************************************
DBFX.Design.WFActivities.Data.For = function () {

    var defcur = new DBFX.Design.WFActivities.For();
    return defcur;

}

//************************************************************************************************************
//***枚举循环
//************************************************************************************************************
DBFX.Design.WFActivities.Data.ForEach = function () {

    var forE = new DBFX.Design.WFActivities.ForEach();
    return forE;

}

//************************************************************************************************************
//***异常处理
//************************************************************************************************************
DBFX.Design.WFActivities.Data.TryCatch = function () {

    var tryc = new DBFX.Design.WFActivities.TryCatch();

    return tryc;

}

//************************************************************************************************************
//***返回
//************************************************************************************************************
DBFX.Design.WFActivities.Data.Return = function () {

    var ret = new DBFX.Design.WFActivities.Return();

    return ret;

}

//************************************************************************************************************
//***变量赋值
//************************************************************************************************************
DBFX.Design.WFActivities.Data.AssignVars = function () {

    var avars = new DBFX.Design.WFActivities.AssignVars();

    return avars;

}

//************************************************************************************************************
//***
//************************************************************************************************************
DBFX.Design.WFActivities.Data.Throw = function () {

    var thrw = new DBFX.Design.WFActivities.Throw();

    return thrw;

}

//JSon2Object
DBFX.Design.WFActivities.Data.JSon2Object = function () {

    var json2obj = new DBFX.Design.WFActivities.Activity("JSon2Object");
    json2obj.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.JSon2ObjectSerializer";
    json2obj.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.JSon2ObjectDesigner");
    json2obj.Text = "JSon转对象";
    json2obj.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/json2object.png";


    json2obj.HideECButton = true;
    json2obj.HideSettingButton = true;
    json2obj.HideAnnotateButton = true;
    return json2obj;

}

//
DBFX.Design.WFSerializers.JSon2ObjectSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("JSonData", a, xe);
        DBFX.Serializer.DeSerialProperty("VarName", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("JSonData", a.JSonData, xe);
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);


    }


}

//JSon转对象设计器
DBFX.Design.ActivityDesigners.JSon2ObjectDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/JSon2ObjectDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "JSon转对象设置";
    return obdc;

}

//Object2JSon
DBFX.Design.WFActivities.Data.Object2JSon = function () {

    var obj2json = new DBFX.Design.WFActivities.Activity("Object2JSon");
    obj2json.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.Object2JSonSerializer";
    obj2json.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.Object2JSonDesigner");
    obj2json.Text = "对象转JSon";
    obj2json.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/object2json.png";

    Object.defineProperty(obj2json, "JSonData", {
        get: function () {

            return obj2json.jsonData;

        },
        set: function (v) {

            obj2json.jsonData = v;
        }
    });

    Object.defineProperty(obj2json, "VarName", {
        get: function () {

            return obj2json.varName;

        },
        set: function (v) {

            obj2json.varName = v;
        }
    });

    obj2json.HideECButton = true;
    obj2json.HideSettingButton = true;
    obj2json.HideAnnotateButton = true;
    return obj2json;

}

//
DBFX.Design.WFSerializers.Object2JSonSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("JSonData", a, xe);
        DBFX.Serializer.DeSerialProperty("VarName", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("JSonData", a.JSonData, xe);
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);


    }


}

//对象转JSon设计器
DBFX.Design.ActivityDesigners.Object2JSonDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/Object2JSonDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "对象转JSon设置";
    return obdc;

}


DBFX.Design.WFActivities.Data.AggregateCmd = function ()
{
    var aggcmd = new DBFX.Design.WFActivities.Activity("AggregateCmd");
    aggcmd.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.AggregateCmdDesigner");
    aggcmd.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.AggregateCmdSerializer";
    aggcmd.Text = "聚合查询";
    aggcmd.ImageUrl = "design/themes/%currenttheme%/images/spdesignview/aggregation.png";
    //投影
    aggcmd.OutputMaps = new Array();
    //筛选
    aggcmd.Filters = new Array();
    //排序
    aggcmd.SortItems = new Array();
    //链接
    aggcmd.JoinItems = new Array();
    //分组
    aggcmd.Groups = new Array();
    aggcmd.LimitRows = -1;
    aggcmd.SkipRows = -1;
    aggcmd.ResultType = "Array";
    aggcmd.ItemsPanel.FormContext = new Object();
    aggcmd.ItemsPanel.FormControls = new Object();
    aggcmd.ItemsPanel.FormContext.Form = aggcmd.ItemsPanel;

    DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/AggregateCmd.scrp", function (agc) {

        aggcmd.lvwOutputMaps = agc.FormControls.lvwOutputMaps;
        aggcmd.lvwOutputMaps.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPOutputMapDesigner"];
            item.ObjType = "Project";
            item.Cmd = aggcmd;
            aggcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        aggcmd.lvwFilters = agc.FormControls.lvwFilters;
        aggcmd.lvwFilters.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPFilterDesigner"];
            item.ObjType = "Filter";
            item.Cmd = aggcmd;
            aggcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        aggcmd.lvwSortItems = agc.FormControls.lvwSortItems;
        aggcmd.lvwSortItems.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPSortDesigner"];
            item.ObjType = "SortItem";
            item.Cmd = aggcmd;
            aggcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        aggcmd.lvwJoinTables = agc.FormControls.lvwJoinTables;
        aggcmd.lvwJoinTables.Cmd = aggcmd;
        aggcmd.lvwJoinTables.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPJoinDesigner"];
            item.ObjType = "JoinItem";
            item.Cmd = aggcmd;
            aggcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }


        aggcmd.lvwGroups = agc.FormControls.lvwGroups;
        aggcmd.lvwGroups.ItemClick = function (e, item) {

            item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.SPGroupItemDesigner"];
            item.ObjType = "GroupItem";
            item.Cmd = aggcmd;
            aggcmd.DesignView.ObjectEditor.ObjectSelected(item);

        }

        //输出映射
        aggcmd.lvwOutputMaps.ItemSource = aggcmd.OutputMaps;
        //筛选条件
        aggcmd.lvwFilters.ItemSource = aggcmd.Filters;
        //排序设置
        aggcmd.lvwSortItems.ItemSource = aggcmd.SortItems;

        aggcmd.lvwGroups.ItemSource = aggcmd.Groups;

        aggcmd.lvwJoinTables.ItemSource = aggcmd.JoinItems;
        aggcmd.Expanded = false;

    }, aggcmd.ItemsPanel);

    Object.defineProperty(aggcmd, "ProjectItemsStr", {
        get: function () {
            return aggcmd.projectItemsStr;
        },
        set: function (v) {

            aggcmd.projectItemsStr = v;

            if (aggcmd.projectItemsStr != undefined && aggcmd.projectItemsStr != "") {

                aggcmd.OutputMaps = JSON.parse(aggcmd.projectItemsStr);

                if (aggcmd.lvwOutputMaps != undefined)
                    aggcmd.lvwOutputMaps.ItemSource = aggcmd.OutputMaps;

            }


        }
    });

    Object.defineProperty(aggcmd, "FiltersStr", {
        get: function () {
            return aggcmd.filtersStr;
        },
        set: function (v) {

            aggcmd.filtersStr = v;

            if (aggcmd.filtersStr != undefined && aggcmd.filtersStr != "") {

                aggcmd.Filters = JSON.parse(aggcmd.filtersStr);

                if (aggcmd.lvwFilters != undefined)
                    aggcmd.lvwFilters.ItemSource = aggcmd.Filters;

            }


        }
    });

    Object.defineProperty(aggcmd, "GroupsStr", {
        get: function () {
            return aggcmd.groupsStr;
        },
        set: function (v) {

            aggcmd.groupsStr = v;

            if (aggcmd.groupsStr != undefined && aggcmd.groupsStr != "") {

                aggcmd.Groups = JSON.parse(aggcmd.groupsStr);

                if (aggcmd.lvwGroups != undefined)
                    aggcmd.lvwGroups.ItemSource = aggcmd.Groups;

            }


        }
    });

    Object.defineProperty(aggcmd, "SortItemsStr", {
        get: function () {
            return aggcmd.sortItemsStr;
        },
        set: function (v) {

            aggcmd.sortItemsStr = v;

            if (aggcmd.sortItemsStr != undefined && aggcmd.sortItemsStr != "") {

                aggcmd.SortItems = JSON.parse(aggcmd.sortItemsStr);

                if (aggcmd.lvwSortItems != undefined)
                    aggcmd.lvwSortItems.ItemSource = aggcmd.SortItems;

            }


        }
    });

    Object.defineProperty(aggcmd, "JoinItemsStr", {
        get: function () {
            return aggcmd.joinItemsStr;
        },
        set: function (v) {

            aggcmd.joinItemsStr = v;

            if (aggcmd.joinItemsStr != undefined && aggcmd.joinItemsStr != "") {

                aggcmd.JoinItems = JSON.parse(aggcmd.joinItemsStr);

                if (aggcmd.lvwJoinTables != undefined)
                    aggcmd.lvwJoinTables.ItemSource = aggcmd.JoinItems;

            }


        }
    });

    aggcmd.allowDiskUse = true;
    Object.defineProperty(aggcmd, "AllowDiskUse",{

        get: function () {
            return aggcmd.allowDiskUse;
        },
        set: function (v) {
            aggcmd.allowDiskUse = v;
        }

    });

    aggcmd.resultOut = "";
    Object.defineProperty(aggcmd, "ResultOut", {

        get: function () {
            return aggcmd.resultOut;
        },
        set: function (v) {
            aggcmd.resultOut = v;
        }

    });


    aggcmd.MinWidth = "80px";
    aggcmd.HideECButton = false;
    aggcmd.HideSettingButton = true;
    aggcmd.HideAnnotateButton = true;
    return aggcmd;

}


DBFX.Design.ActivityDesigners.AggregateCmdDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/AggregateDesigner.scrp", function (od) {

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

                var filter = { PropertyName: "Sort" + obdc.Cmd.SortItems.length, SortMode: "ASC" };
                obdc.Cmd.SortItems.Add(filter);
                obdc.Cmd.lvwSortItems.ItemSource = obdc.Cmd.SortItems;

            }


            obdc.AddJoin = od.FormContext.Form.FormControls.btnAddJoin;
            obdc.AddJoin.Click = function (e) {

                var join = { Table: "Table" + obdc.Cmd.JoinItems.length, PriKey: "_id", FKey: "FK_Id", Alias: "T" + obdc.Cmd.JoinItems.length,Wind:true };
                obdc.Cmd.JoinItems.Add(join);
                obdc.Cmd.lvwJoinTables.ItemSource = obdc.Cmd.JoinItems;

            }

            obdc.AddGroup = od.FormContext.Form.FormControls.btnAddGroup;
            obdc.AddGroup.Click = function (e) {

                var group = { GroupName: "Group" + obdc.Cmd.Groups.length, AggregateCmd:"$sum",Expr:"1",};
                obdc.Cmd.Groups.Add(group);
                obdc.Cmd.lvwGroups.ItemSource = obdc.Cmd.Groups;

            }



        }, obdc);


    }


    obdc.DataContextChanged = function (e) {

        obdc.dataContext = e.Value;
        obdc.DataBind(e);

        if (obdc.dataContext != undefined)
            obdc.Cmd = obdc.dataContext;


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "聚合查询设置";
    return obdc;


}


DBFX.Design.WFSerializers.AggregateCmdSerializer = function () {


    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("SortItemsStr", a, xe);
        DBFX.Serializer.DeSerialProperty("JoinItemsStr", a, xe);
        DBFX.Serializer.DeSerialProperty("GroupsStr", a, xe);
        DBFX.Serializer.DeSerialProperty("FiltersStr", a, xe);
        DBFX.Serializer.DeSerialProperty("ProjectItemsStr", a, xe);
        DBFX.Serializer.DeSerialProperty("TableName", a, xe);
        DBFX.Serializer.DeSerialProperty("VarName", a, xe);
        DBFX.Serializer.DeSerialProperty("SkipRows", a, xe);
        DBFX.Serializer.DeSerialProperty("LimitRows", a, xe);
        DBFX.Serializer.DeSerialProperty("ResultType", a, xe);
        DBFX.Serializer.DeSerialProperty("AllowDiskUse", a, xe);
    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("SortItemsStr",JSON.stringify(a.SortItems), xe);
        DBFX.Serializer.SerialProperty("JoinItemsStr",JSON.stringify( a.JoinItems), xe);
        DBFX.Serializer.SerialProperty("FiltersStr",JSON.stringify( a.Filters), xe);
        DBFX.Serializer.SerialProperty("GroupsStr",JSON.stringify( a.Groups), xe);
        DBFX.Serializer.SerialProperty("ProjectItemsStr", JSON.stringify(a.OutputMaps), xe);
        DBFX.Serializer.SerialProperty("TableName",a.TableName, xe);
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);
        DBFX.Serializer.SerialProperty("SkipRows", a.SkipRows, xe);
        DBFX.Serializer.SerialProperty("LimitRows",a.LimitRows, xe);
        DBFX.Serializer.SerialProperty("LimitRows", a.LimitRows, xe);
        DBFX.Serializer.SerialProperty("ResultType", a.ResultType, xe);
        DBFX.Serializer.SerialProperty("AllowDiskUse", a.allowDiskUse, xe);
    }


}

DBFX.Design.ActivityDesigners.SPJoinDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/JoinItemDesigner.scrp", function (od) {

            obdc.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext.Parent.Cmd;

            obdc.AddJoin = od.FormContext.Form.FormControls.btnAddJoin;
            obdc.AddJoin.Click = function (e) {

                var join = { Table: "Table" + obdc.Cmd.JoinItems.length, PriKey: "_id", FKey: "FK_Id", Alias: "T" + obdc.Cmd.JoinItems.length, Wind: true };
                obdc.Cmd.JoinItems.Add(join);
                obdc.Cmd.lvwJoinTables.ItemSource = obdc.Cmd.JoinItems;

            }

            obdc.DelJoin = od.FormContext.Form.FormControls.btnDelJoin;
            obdc.DelJoin.Click = function (e) {

                if (obdc.Cmd.lvwJoinTables.selectedItem != undefined) {

                    obdc.Cmd.JoinItems.Remove(obdc.Cmd.lvwJoinTables.selectedItem.dataContext);
                    obdc.Cmd.lvwJoinTables.ItemSource = obdc.Cmd.JoinItems;
                    obdc.Cmd.lvwJoinTables.selectedItem = undefined;

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
    obdc.Text = "设置查询链接";
    return obdc;

}


DBFX.Design.ActivityDesigners.SPGroupItemDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/SPDesignerTemplates/GroupItemDesigner.scrp", function (od) {

            obdc.DataContext = obdc.dataContext;
            obdc.Cmd = obdc.dataContext.Cmd;

            obdc.AddGroup = od.FormContext.Form.FormControls.btnAddGroup;
            obdc.AddGroup.Click = function (e) {

                var group = { GroupName: "Group" + obdc.Cmd.Groups.length, AggregateCmd: "$sum", Expr: "1", };
                obdc.Cmd.Groups.Add(group);
                obdc.Cmd.lvwGroups.ItemSource = obdc.Cmd.Groups;

            }

            obdc.DelGroup = od.FormContext.Form.FormControls.btnDelGroup;
            obdc.DelGroup.Click = function (e) {

                if (obdc.Cmd.lvwGroups.selectedItem != undefined) {

                    obdc.Cmd.Groups.Remove(obdc.Cmd.lvwGroups.selectedItem.dataContext);
                    obdc.Cmd.lvwGroups.ItemSource = obdc.Cmd.Groups;
                    obdc.Cmd.lvwGroups.selectedItem = undefined;

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
    obdc.Text = "设置分组规则";
    return obdc;

}