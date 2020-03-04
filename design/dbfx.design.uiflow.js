DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Design.Workflow");
DBFX.RegisterNamespace("DBFX.Design.WFActivities");
DBFX.RegisterNamespace("DBFX.Design.ActivityDesigners");
//UIFlow设计器视图
DBFX.Design.UIFlowDesignView = function () {

    var fp = new DBFX.Web.Forms.FormPart("design/DesignerTemplates/WFDeisgnerTemplates/UIFlowDesignView.scrp", function (dv) {

        fp.ToolkitBox = fp.FormControls.VDE_DV_ToolkitBox;
        fp.DesignView = fp.FormControls.VDE_DV_DesignView;
        fp.ObjectEditor = fp.FormControls.VDE_DV_ObjectEditor;

        fp.InitDesignView();

    });

    fp.ClassDescriptor.Serializer = "DBFX.Serializer.UIFlowDesinViewSerializer";

    fp.InitDesignView=function()
    {
        fp.ToolkitBox.LoadTKItems("LC.GAS.ADP.DesignerObjects.Tooltiks.WFCollection.UIActivities");

        fp.ObjectEditor.Initialize(fp.DesignView);

        if (fp.IsNewFlow == 1)
            fp.FormControls.btnSave.Enabled = true;


    }

    fp.SaveToXML = function () {
        return fp.DesignView.SaveToXML();
    }

    //通过XML数据加载UI流程图
    fp.LoadXml = function (xml) {

        try {
            fp.DesignView.LoadXml(xml);

            fp.ObjectEditor.ObjectSelected(fp.DesignView.SequenceRoot);
        } catch (ex) { }

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

//UI设计器系列化程序
DBFX.Serializer.UIFlowDesinViewSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        //系列化
        DBFX.Serializer.DeSerializeCommand("SaveResource", xe,c);
        DBFX.Serializer.DeSerializeCommand("LoadResource", xe, c);
    }


    //系列化
    this.Serialize = function (c, xe, ns) {

        DBFX.Serializer.SerialProperty("SaveResource", c.SaveResource, xe);
        DBFX.Serializer.SerialProperty("LoadResource", c.LoadResource, xe);
    }

}
DBFX.Design.UIFlowDesignView.UIFlowSave = function (e) {

    var form = e.Sender.FormContext.Form;
    if (form.FormControls.VDE_DV_DesignView.IsContentChanged == true) {

        //系列化对象
        var xdoc = form.FormControls.VDE_DV_DesignView.SaveToXML();

        var xmldata = (new XMLSerializer()).serializeToString(xdoc.documentElement);

        //if (form.FormControls.VDE_DV_DesignView.ToCode != undefined)
        //    var code = form.FormControls.VDE_DV_DesignView.ToCode();

        if (form.SaveResource != undefined) {
            if (typeof (form.SaveResource) == "function") {
                form.SaveResource(form.ResourceContext, xmldata, function (saveResult) {
                    form.FormControls.VDE_DV_DesignView.IsContentChanged = !saveResult;
                });
            }
            else {
                form.SaveResource.Sender = form.FormControls.VDE_DV_DesignView;
                form.SaveResource.Execute(form.SaveResourceCompleted);
            }
        }

    }
}
app.GlobalCommands.Register("VDE_Design_UIFlowDesignView_UIFlowSave", DBFX.Design.UIFlowDesignView.UIFlowSave);

//************************************************************************************************************
//*** UI功能命令
//************************************************************************************************************

//确认对话框
DBFX.Design.WFActivities.ConfirmDialog = function () {

    var acd = new DBFX.Design.WFActivities.Activity("ConfirmDialog");
    acd.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ConfirmDialogSerializer";
    acd.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ConfirmDialogDesigner");
    acd.Text = "用户确认对话框";
    acd.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/messagebox.png";
    acd.Sequence = new DBFX.Design.WFActivities.Sequence(acd.DesignView);
    acd.Sequence.HideHeaderBar = true;
    acd.Sequence.Margin = "0px";
    acd.Sequence.BorderWidth = "0px";
    acd.AddControl(acd.Sequence);
    acd.HideECButton = false;
    acd.Sequence.Parent = acd;

    acd.SetDesignView = function (v) {
        acd.Sequence.DesignView = v;
    }

    acd.dialogTitle = "消息提示框";
    Object.defineProperty(acd, "DialogTitle", {
        get: function () {

            return acd.dialogTitle;

        },
        set: function (v) {

            acd.dialogTitle = v;
            acd.OnPropertyChanged("DialogTitle", v);
        }
    });
    
    acd.dialogText = "提示内容";
    Object.defineProperty(acd, "DialogText", {
        get: function () {

            return acd.dialogText;

        },
        set: function (v) {

            acd.dialogText = v;
            acd.OnPropertyChanged("DialogText", v);
        }
    });

    acd.dialogType = 0;
    Object.defineProperty(acd, "DialogType", {
        get: function () {

            return acd.dialogType;

        },
        set: function (v) {

            acd.dialogType = v;
            acd.OnPropertyChanged("DialogType", v);
        }
    });

    acd.iconType = -1;
    Object.defineProperty(acd, "IconType", {
        get: function () {

            return acd.iconType;

        },
        set: function (v) {

            acd.iconType = v;
            acd.OnPropertyChanged("IconType", v);
        }
    });

    acd.button1Text = "确定";
    Object.defineProperty(acd, "Button1Text", {
        get: function () {

            return acd.button1Text;

        },
        set: function (v) {

            acd.button1Text = v;
            acd.OnPropertyChanged("Button1Text", v);
        }
    });

    acd.button2Text = "取消";
    Object.defineProperty(acd, "Button2Text", {

        get: function () {

            return acd.button2Text;

        },
        set: function (v) {

            acd.button2Text = v;
            acd.OnPropertyChanged("Button2Text", v);

        }

    });


    acd.ToCode = function (sw) {
     

        var code = " DBFX.Web.Forms.MessageBox.Show(";
        
       
        code += DBFX.Design.WFActivities.ParsingVar(acd.dialogText) + ",";

        code += DBFX.Design.WFActivities.ParsingVar(acd.dialogTitle) + ",";

        code += "function (dialogresult)";

        sw.AddLine(code);
        sw.AddLine("{", 4);
        acd.Sequence.ToCode(sw);
        sw.AddLine("}," + acd.dialogType + ",\"" + acd.button1Text + "\",\"" + acd.button2Text + "\"," + acd.iconType + ");", -4);
    }

    return acd;

}

//调用Web服务方法
DBFX.Design.WFActivities.InvokeWebService = function () {


    var aiws = new DBFX.Design.WFActivities.Activity("InvokeWebService");
    aiws.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.InvokeWebServiceSerializer";
    aiws.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.InvokeWebServiceDesigner");
    aiws.Text = "调用Web服务";
    aiws.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/webservice.png";

    //参数列表
    aiws.ParamsList = DBFX.Design.WFActivities.ParameterBuilder();
    aiws.ParamsList.IsHasContextMenu = false;
    aiws.AddControl(aiws.ParamsList);
    aiws.ParamsList.DataContext = aiws.dataContext;

    //回调系列
    aiws.Sequence = new DBFX.Design.WFActivities.Sequence(aiws.DesignView);
    aiws.Sequence.HideHeaderBar = true;
    aiws.Sequence.Margin = "0px";
    aiws.Sequence.BorderWidth = "0px";
    aiws.AddControl(aiws.Sequence);
    aiws.HideECButton = false;
    aiws.Sequence.Parent = aiws;

    //参数字符串
    Object.defineProperty(aiws, "ParametersStr", {

        get: function () {

            var parastr = "[]";
            parastr = aiws.ParamsList.ParametersStr;
            return parastr;

        },
        set: function (v) {

            if (v != undefined && v != null && v != "") {

                var paras = JSON.parse(v);
                aiws.ParamsList.parameters = paras;

            }
        }

    });


    //输出到代码
    aiws.ToCode = function (sw) {




    }

    aiws.SetDesignView = function (v) {
        aiws.Sequence.DesignView = v;
        aiws.ParamsList.DesignView = v;
    }
    return aiws;


}
DBFX.Design.WFSerializers.InvokeWebServiceSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ServiceUri", a, xe);
        DBFX.Serializer.DeSerialProperty("ParametersStr", a, xe);
        DBFX.Serializer.DeSerialProperty("WebMethod", a, xe);
        DBFX.Serializer.DeSerialProperty("EnvTemplate", a, xe);
        DBFX.Serializer.DeSerialProperty("ResponseProcessor", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.querySelector("SucSequence");
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.querySelector("FailSequence");
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("ServiceUri", a.ServiceUri, xe);
        DBFX.Serializer.SerialProperty("ParametersStr", a.ParametersStr, xe);
        DBFX.Serializer.SerialProperty("WebMethod", a.SPName, xe);
        DBFX.Serializer.SerialProperty("EnvTemplate", a.DBName, xe);
        DBFX.Serializer.SerialProperty("ResponseProcessor", a.ResponseProcessor, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.InvokeWebServiceDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/InvokeWebServiceDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "云服务调用设置";
    return obdc;

}

//发送邮件方法
DBFX.Design.WFActivities.SendMail = function () {

    var asm = new DBFX.Design.WFActivities.Activity("SendMail");
    asm.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.SendMailSerializer";
    asm.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.SendMailDesigner");
    asm.Text = "发送电子邮件";
    asm.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/sendmail.png";
    asm.Sequence = new DBFX.Design.WFActivities.Sequence(asm.DesignView);
    asm.Sequence.HideHeaderBar = true;
    asm.Sequence.Margin = "0px";
    asm.Sequence.BorderWidth = "0px";
    asm.AddControl(asm.Sequence);
    asm.HideECButton = false;
    asm.Sequence.Parent = asm;

    //收件人列表
    Object.defineProperty(asm, "ToList", {
        get: function () {
            return asm.toList;
        },
        set: function (v) {

            asm.toList = v;

        }
    });

    //发件人
    Object.defineProperty(asm, "FromUser", {
        get: function () {
            return asm.fromUser;
        },
        set: function (v) {

            asm.fromUser = v;

        }
    });

    //密码
    Object.defineProperty(asm, "Password", {
        get: function () {
            return asm.password;
        },
        set: function (v) {

            asm.password = v;

        }
    });

    //用户名称
    Object.defineProperty(asm, "UserName", {
        get: function () {
            return asm.userName;
        },
        set: function (v) {

            asm.userName = v;

        }
    });

    //SmtpHost 主机
    Object.defineProperty(asm, "SmtpHost", {
        get: function () {
            return asm.smtpHost;
        },
        set: function (v) {

            asm.smtpHost = v;

        }
    });

    //端口
    Object.defineProperty(asm, "Port", {
        get: function () {
            return asm.port;
        },
        set: function (v) {

            asm.port = v;

        }
    });

    //标题
    Object.defineProperty(asm, "Subject", {
        get: function () {
            return asm.subject;
        },
        set: function (v) {

            asm.subject = v;

        }
    });

    //内容
    Object.defineProperty(asm, "Body", {
        get: function () {
            return asm.body;
        },
        set: function (v) {

            asm.body = v;

        }
    });


    asm.ToCode = function (sw) {

        sw.AddLine("var req = new DBFX.SvcBus.SvcRequest();");
        sw.AddLine("req.SvcUri = \"DB.FX.AppService.CommonService.MailService\";");
        sw.AddLine("req.Headers.Cmd = \"sendmail\";");
        sw.AddLine("req.Headers.SmtpHost =" + DBFX.Design.WFActivities.ParsingVar(asm.SmtpHost) + ";");
        sw.AddLine("req.Headers.Port =" + DBFX.Design.WFActivities.ParsingVar(asm.Port) + ";");
        sw.AddLine("req.Headers.UserName =" + DBFX.Design.WFActivities.ParsingVar(asm.UserName) + ";");
        sw.AddLine("req.Headers.Password =" + DBFX.Design.WFActivities.ParsingVar(asm.Password) + ";");
        sw.AddLine("req.Headers.From =" + DBFX.Design.WFActivities.ParsingVar(asm.fromUser) + ";");
        sw.AddLine("req.Parameters.ToList = " + DBFX.Design.WFActivities.ParsingVar(asm.toList) + ";");
        sw.AddLine("req.Parameters.Subject =" + DBFX.Design.WFActivities.ParsingVar(asm.subject) + ";");
        sw.AddLine("req.Parameters.Body = " + DBFX.Design.WFActivities.ParsingVar(asm.body) + ";");
        sw.AddLine("DBFX.SvcBus.ESBClient.ExecuteRequest(app.ServiceUri, req);");

    }

    asm.SetDesignView = function (v) {
        asm.Sequence.DesignView = v;
    }

    return asm;


}


DBFX.Design.WFSerializers.SendMailSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("FromUser", a, xe);
        DBFX.Serializer.DeSerialProperty("ToList", a, xe);
        DBFX.Serializer.DeSerialProperty("UserName", a, xe);
        DBFX.Serializer.DeSerialProperty("Password", a, xe);
        DBFX.Serializer.DeSerialProperty("SmtpHost", a, xe);
        DBFX.Serializer.DeSerialProperty("Subject", a, xe);
        DBFX.Serializer.DeSerialProperty("Body", a, xe);
        DBFX.Serializer.DeSerialProperty("Port", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("FromUser", a.FromUser, xe);
        DBFX.Serializer.SerialProperty("ToList", a.ToList, xe);
        DBFX.Serializer.SerialProperty("UserName", a.UserName, xe);
        DBFX.Serializer.SerialProperty("Password", a.Password, xe);
        DBFX.Serializer.SerialProperty("SmtpHost", a.SmtpHost, xe);
        DBFX.Serializer.SerialProperty("Subject", a.Subject, xe);
        DBFX.Serializer.SerialProperty("Body", a.Body, xe);
        DBFX.Serializer.SerialProperty("Port", a.Port, xe);

    }



}
DBFX.Design.ActivityDesigners.SendMailDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/SendMailDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "邮件发送配置";
    return obdc;

}

//************************************************************************************************************
//*** 定义变量
//************************************************************************************************************
DBFX.Design.WFActivities.DefVars = function () {

    var defv = new DBFX.Design.WFActivities.Activity("DefVars");
    defv.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.DefVarsDesigner");
    defv.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.DefVarsSerializer";
    defv.Text = "变量定义";
    defv.ImageUrl = "design/themes/%currenttheme%/images/WFDesignView/defvars.png";
    defv.Variables = new Array();
    defv.ItemsPanel.FormContext = new Object();
    defv.ItemsPanel.FormControls = new Object();
    defv.ItemsPanel.FormContext.Form = defv.ItemsPanel;
    DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/DefVars.scrp", function (pas) {

        defv.lvwVariables = pas.FormContext.Form.FormControls.lvwVariables;
        //defv.Variables = [{ VarName: "Var1", DataType: "string", DefaultValue: "" }];
        defv.lvwVariables.ItemSource = defv.Variables;
        defv.lvwVariables.ItemClick = defv.VarItemClick;

        defv.Expanded = false;

    }, defv.ItemsPanel);

    defv.VarItemClick = function (e, item) {

        item.ClassDescriptor.Designers = ["DBFX.Design.ActivityDesigners.VariablesDesigner"];
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
    defv.ToCode = function (sw) {


        defv.Variables.forEach(function (varitem) {

            var defcode = "var " + varitem.VarName;
            
            if (varitem.DefaultValue != undefined && varitem.DefaultValue != "") {

                if (varitem.DefaultValue != undefined && varitem.DefaultValue.indexOf("@") == 0) {

                    defcode += "=" + varitem.DefaultValue.replace("@","");

                }
                else {
                    if (varitem.DataType == "string")
                        defcode += "=\"" + varitem.DefaultValue + "\"";
                    else
                        defcode += "=" + varitem.DefaultValue;
                }
            }

            sw.AddLine(defcode+";");

        });

        
    }


    defv.HideECButton = false;
    defv.HideSettingButton = true;
    defv.HideAnnotateButton = true;

    return defv;

}
DBFX.Design.ActivityDesigners.DefVarsDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/DefVarsDesigner.scrp", function (od) {

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
DBFX.Design.ActivityDesigners.VariablesDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/VariablesDesigner.scrp", function (od) {

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


//变量赋值
DBFX.Design.WFActivities.AssignVars = function () {


    var setvars = new DBFX.Design.WFActivities.Activity("AssignVars");
    setvars.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.AssignVarsSerializer";
    setvars.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.AssignVarsDesigner");
    setvars.Text = "变量赋值";
    setvars.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/assignvars.png";

    setvars.varName = "";
    Object.defineProperty(setvars, "VarName", {
        get: function () {

            return setvars.varName;

        },
        set: function (v) {

            setvars.varName = v;

        }
    });

    setvars.varValue = undefined;
    Object.defineProperty(setvars, "VarValue", {
        get: function () {

            return setvars.varValue;

        },
        set: function (v) {

            setvars.varValue = v;

        }
    });

    setvars.ToCode = function (sw) {

        if (setvars.varValue == undefined)
            setvars.varValue = "";

        if (setvars.VarName == undefined || setvars.VarName == "")
            sw.AddLine(DBFX.Design.WFActivities.ParsingVar(setvars.varValue) + ";");
        else
            sw.AddLine(setvars.VarName + "=" + DBFX.Design.WFActivities.ParsingVar(setvars.varValue) + ";");


    }
    return setvars;


}

//方法调用
DBFX.Design.WFActivities.InvokeMethod = function () {

    var ivkm = new DBFX.Design.WFActivities.Activity("InvokeMethod");
    ivkm.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.InvokeMethodSerializer";
    ivkm.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.InvokeMethodDesigner");
    ivkm.Text = "方法调用";
    ivkm.HideECButton = false;
    ivkm.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/invokemethod.png";
    ivkm.ParamsList = DBFX.Design.WFActivities.ParameterBuilder();
    ivkm.ParamsList.IsHasContextMenu = false;
    ivkm.AddControl(ivkm.ParamsList);
    ivkm.ParamsList.DataContext = ivkm.dataContext;

    //回调方法
    ivkm.CbSequence = new DBFX.Design.WFActivities.Sequence(ivkm.DesignView);
    ivkm.CbSequence.Text = "调用成功回调过程"
    ivkm.CbSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/invokemethod.png";
    ivkm.CbSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    ivkm.CbSequence.Display = "block";
    ivkm.CbSequence.HideECButton = true;
    ivkm.CbSequence.IsHasContextMenu = false;
    ivkm.AddControl(ivkm.CbSequence);
    ivkm.CbSequence.Parent = ivkm;

    ivkm.SetDesignView = function (v) {
        ivkm.CbSequence.DesignView = v;
        ivkm.ParamsList.DesignView = v;
    }

    Object.defineProperty(ivkm, "MethodName", {
        get: function () {
            return ivkm.methodName;
        },
        set: function (v) {
            ivkm.methodName = v;

        }
    });

    Object.defineProperty(ivkm, "Instance", {
        get: function () {
            return ivkm.instance;
        },
        set: function (v) {
            ivkm.instance = v;

        }
    });

    Object.defineProperty(ivkm, "ParametersStr", {

        get: function () {

            var parastr = "[]";
            parastr = ivkm.ParamsList.ParametersStr;
            return parastr;

        },
        set: function (v) {

            if (v != undefined && v != null && v != "") {

                var paras = JSON.parse(v);
                ivkm.ParamsList.parameters = paras;

            }
        }

    });

    //sheng
    ivkm.ToCode = function (sw) {

        var code = "var ivkr=";
        
        if (ivkm.instance!=undefined && ivkm.instance != "")
            code += ivkm.instance + "." + ivkm.methodName + "(";
        else
            code += ivkm.methodName + "(";

        var paras = "";
        var spc = "";
        ivkm.ParamsList.Parameters.forEach(function (pa) {

            if (paras != "")
                spc = ",";

            if (pa.DefaultValue == "@CallBack") {

                paras += spc + "function(sender){\n";
                paras += ivkm.CbSequence.ToCode();
                paras += "\n}\n";

            }
            else {

                paras += spc + DBFX.Design.WFActivities.ParsingVar(pa.DefaultValue, pa.DataType);

            }

        });
        code += paras + ",function(resp){";
        sw.AddLine(code,4);
        ivkm.CbSequence.ToCode(sw,4);
        sw.AddLine("});",-4);

    }
    return ivkm;


}
DBFX.Design.WFSerializers.InvokeMethodSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("MethodName", a, xe);
        DBFX.Serializer.DeSerialProperty("Instance", a, xe);
        DBFX.Serializer.DeSerialProperty("ParametersStr", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.CbSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.CbSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns)
    {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("MethodName", a.MethodName, xe);
        DBFX.Serializer.SerialProperty("Instance", a.Instance, xe);
        DBFX.Serializer.SerialProperty("ParametersStr", a.ParametersStr, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.CbSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("CbSequence");
            xe.appendChild(xseq);
            a.CbSequence.Namespace = a.Namespace;
            a.CbSequence.NSSN = a.NSSN;
            s.Serialize(a.CbSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.InvokeMethodDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/InvokeMethodDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "方法调用设置";
    return obdc;

}

//方法调用
DBFX.Design.WFActivities.LoadForm = function () {


    var loadform = new DBFX.Design.WFActivities.Activity("LoadForm");
    loadform.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.LoadFormSerializer";
    loadform.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.LoadFormDesigner");
    loadform.Text = "加载表单";
    loadform.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/LoadForm.png";
    loadform.HideECButton = false;

    //回调方法
    loadform.CbSequence = new DBFX.Design.WFActivities.Sequence(loadform.DesignView);
    loadform.CbSequence.Text = "调用成功"
    loadform.CbSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/LoadForm.png";
    loadform.CbSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    loadform.CbSequence.Display = "block";
    loadform.CbSequence.HideECButton = true;
    loadform.CbSequence.IsHasContextMenu = false;
    loadform.AddControl(loadform.CbSequence);
    loadform.CbSequence.Parent = loadform;

    loadform.SetDesignView = function (v) {
        loadform.CbSequence.DesignView = v;
    }

    //资源标识符
    Object.defineProperty(loadform, "ResourceUri", {
        get: function () {

            return loadform.resourceUri;
        },
        set: function (v) {

            loadform.resourceUri = v;

        }
    });

    //模式
    Object.defineProperty(loadform, "Mode", {
        get: function () {

            return loadform.mode;
        },
        set: function (v) {

            loadform.mode = v;

        }
    });


    //模式
    Object.defineProperty(loadform, "Title", {
        get: function () {

            return loadform.title;
        },
        set: function (v) {

            loadform.title = v;

        }
    });

    //模式
    loadform.dataContextVar = "undefined";
    Object.defineProperty(loadform, "DataContextVar", {
        get: function () {

            return loadform.dataContextVar;
        },
        set: function (v) {

            loadform.dataContextVar = v;

        }
    });

    //编译代码
    loadform.ToCode = function (sw) {

        sw.AddLine("var datacontext=" + loadform.DataContextVar + ";");
        sw.AddLine("app.LoadAppResource(" + DBFX.Design.WFActivities.ParsingVar(loadform.resourceUri) + "," + DBFX.Design.WFActivities.ParsingVar(loadform.title) + ",datacontext, " + DBFX.Design.WFActivities.ParsingVar(loadform.mode) + ",function(uiview)");
        sw.AddLine("{",4);
        
        loadform.CbSequence.ToCode(sw);
                
        sw.AddLine("});", -4);


 
    }

    return loadform;


}
DBFX.Design.WFSerializers.LoadFormSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ResourceUri", a, xe);
        DBFX.Serializer.DeSerialProperty("Title", a, xe);
        DBFX.Serializer.DeSerialProperty("Mode", a, xe);
        DBFX.Serializer.DeSerialProperty("DataContextVar", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.CbSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.CbSequence, xseq, ns);
        }

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("ResourceUri", a.ResourceUri, xe);
        DBFX.Serializer.SerialProperty("Title", a.Title, xe);
        DBFX.Serializer.SerialProperty("Mode", a.Mode, xe);
        DBFX.Serializer.SerialProperty("DataContextVar", a.DataContextVar, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.CbSequence.ClassDescriptor);

        if (s != null) {

            //系列化CbSequence
            var xseq = xdoc.createElement("CbSequence");
            xe.appendChild(xseq);
            a.CbSequence.Namespace = a.Namespace;
            a.CbSequence.NSSN = a.NSSN;
            s.Serialize(a.CbSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.LoadFormDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/LoadFormDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "云服务调用设置";
    return obdc;

}

//微信支付
DBFX.Design.WFActivities.WxPay = function () {

    var wxpay = new DBFX.Design.WFActivities.Activity("WxPay");
    wxpay.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.WxPaySerializer";
    wxpay.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.WxPayDesigner");
    wxpay.Text = "微信支付";
    wxpay.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/wxpay.png";
    wxpay.HideECButton = false;
    //加入条件系列 真值表达式
    wxpay.SucSequence = new DBFX.Design.WFActivities.Sequence(wxpay.DesignView);
    wxpay.SucSequence.Text = "调用成功"
    wxpay.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    wxpay.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    wxpay.SucSequence.Display = "block";
    wxpay.SucSequence.HideECButton = false;
    wxpay.SucSequence.IsHasContextMenu = false;
    wxpay.AddControl(wxpay.SucSequence);
    wxpay.SucSequence.Parent = wxpay;

    //加入条件系列 真值表达式
    wxpay.FailSequence = new DBFX.Design.WFActivities.Sequence(wxpay.DesignView);
    wxpay.FailSequence.Text = "调用失败"
    wxpay.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    wxpay.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    wxpay.FailSequence.Display = "block";
    wxpay.FailSequence.HideECButton = false;
    wxpay.FailSequence.IsHasContextMenu = false;
    wxpay.FailSequence.Parent = wxpay;
    wxpay.AddControl(wxpay.FailSequence);

    wxpay.SetDesignView = function (v) {
        wxpay.SucSequence.DesignView = v;
        wxpay.FailSequence.DesignView = v;
    }

    

    Object.defineProperty(wxpay, "AppId", {
        get: function () {
            return wxpay.appId;
        },
        set: function (v) {
            wxpay.appId = v;
        }
    });

    Object.defineProperty(wxpay, "MchId", {
        get: function () {
            return wxpay.mchId;
        },
        set: function (v) {
            wxpay.mchId = v;
        }
    });

    wxpay.subAppId = "";
    Object.defineProperty(wxpay, "SubAppId", {
        get: function () {
            return wxpay.subAppId;
        },
        set: function (v) {
            wxpay.subAppId = v;
        }
    });

    wxpay.subMchId = "";
    Object.defineProperty(wxpay, "SubMchId", {
        get: function () {
            return wxpay.subMchId;
        },
        set: function (v) {
            wxpay.subMchId = v;
        }
    });


    Object.defineProperty(wxpay, "SignKey", {
        get: function () {
            return wxpay.signkey;
        },
        set: function (v) {
            wxpay.signkey = v;
        }
    });

    Object.defineProperty(wxpay, "PayCode", {
        get: function () {
            return wxpay.payCode;
        },
        set: function (v) {
            wxpay.payCode = v;
        }
    });

    Object.defineProperty(wxpay, "TotalFee", {
        get: function () {
            return wxpay.totalFee;
        },
        set: function (v) {
            wxpay.totalFee = v;
        }
    });


    Object.defineProperty(wxpay, "OrderId", {
        get: function () {
            return wxpay.orderId;
        },
        set: function (v) {
            wxpay.orderId = v;
        }
    });

    Object.defineProperty(wxpay, "Operator", {
        get: function () {
            return wxpay.operator;
        },
        set: function (v) {
            wxpay.operator = v;
        }
    });

    Object.defineProperty(wxpay, "OrderDesc", {
        get: function () {
            return wxpay.orderDesc;
        },
        set: function (v) {
            wxpay.orderDesc = v;
        }
    });



    //
    wxpay.ToCode = function (sw) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, payCode,orderDesc,totalFee, cb
        sw.AddLine("DBFX.Interfaces.PayService.WxPayByBarCode(" + DBFX.Design.WFActivities.ParsingVar(wxpay.AppId) + "," + DBFX.Design.WFActivities.ParsingVar(wxpay.MchId) + "," + DBFX.Design.WFActivities.ParsingVar(wxpay.SubAppId) + "," + DBFX.Design.WFActivities.ParsingVar(wxpay.SubMchId) + "," + DBFX.Design.WFActivities.ParsingVar(wxpay.SignKey) + "," + DBFX.Design.WFActivities.ParsingVar(wxpay.OrderId) + "," + DBFX.Design.WFActivities.ParsingVar(wxpay.PayCode) +"," + DBFX.Design.WFActivities.ParsingVar(wxpay.OrderDesc) + "," + DBFX.Design.WFActivities.ParsingVar(wxpay.TotalFee) + ",function(payinfo)");
        sw.AddLine("{",4);
        sw.AddLine("if(payinfo.State==0)");
        sw.AddLine("{",4);
        wxpay.SucSequence.ToCode(sw);
        sw.AddLine("}",-4)
        sw.AddLine("else{",4);
        wxpay.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("});",-4);

    }

    return wxpay;


}
DBFX.Design.WFSerializers.WxPaySerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("MchId", a, xe);
        DBFX.Serializer.DeSerialProperty("SubAppId", a, xe);
        DBFX.Serializer.DeSerialProperty("SubMchId", a, xe);
        DBFX.Serializer.DeSerialProperty("PayCode", a, xe);
        DBFX.Serializer.DeSerialProperty("SignKey", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderDesc", a, xe);
        DBFX.Serializer.DeSerialProperty("Operator", a, xe);
        DBFX.Serializer.DeSerialProperty("TotalFee", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, payCode,orderDesc,totalFee

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppId", a.AppId, xe);
        DBFX.Serializer.SerialProperty("MchId", a.MchId, xe);
        DBFX.Serializer.SerialProperty("SubAppId", a.SubAppId, xe);
        DBFX.Serializer.SerialProperty("SubMchId", a.SubMchId, xe);
        DBFX.Serializer.SerialProperty("PayCode", a.PayCode, xe);
        DBFX.Serializer.SerialProperty("SignKey", a.SignKey, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("OrderDesc", a.OrderDesc, xe);
        DBFX.Serializer.SerialProperty("Operator", a.Operator, xe);
        DBFX.Serializer.SerialProperty("TotalFee", a.TotalFee, xe);
        
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.WxPayDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/WxPayDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "微信支付设置";
    return obdc;

}

//微信支付查询
DBFX.Design.WFActivities.WxPayQuery = function () {

    var wxPayQuery = new DBFX.Design.WFActivities.Activity("WxPayQuery");
    wxPayQuery.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.WxPayQuerySerializer";
    wxPayQuery.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.WxPayQueryDesigner");
    wxPayQuery.Text = "微信支付查询";
    wxPayQuery.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/wxpay.png";
    wxPayQuery.HideECButton = false;
    //加入条件系列 真值表达式
    wxPayQuery.SucSequence = new DBFX.Design.WFActivities.Sequence(wxPayQuery.DesignView);
    wxPayQuery.SucSequence.Text = "调用成功"
    wxPayQuery.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    wxPayQuery.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    wxPayQuery.SucSequence.Display = "block";
    wxPayQuery.SucSequence.HideECButton = false;
    wxPayQuery.SucSequence.IsHasContextMenu = false;
    wxPayQuery.AddControl(wxPayQuery.SucSequence);
    wxPayQuery.SucSequence.Parent = wxPayQuery;

    //加入条件系列 真值表达式
    wxPayQuery.FailSequence = new DBFX.Design.WFActivities.Sequence(wxPayQuery.DesignView);
    wxPayQuery.FailSequence.Text = "调用失败"
    wxPayQuery.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    wxPayQuery.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    wxPayQuery.FailSequence.Display = "block";
    wxPayQuery.FailSequence.HideECButton = false;
    wxPayQuery.FailSequence.IsHasContextMenu = false;
    wxPayQuery.FailSequence.Parent = wxPayQuery;
    wxPayQuery.AddControl(wxPayQuery.FailSequence);

    wxPayQuery.SetDesignView = function (v) {
        wxPayQuery.SucSequence.DesignView = v;
        wxPayQuery.FailSequence.DesignView = v;
    }


    //orderId, tranId, appId, mchId, subAppId, subMchid, signkey

    Object.defineProperty(wxPayQuery, "AppId", {
        get: function () {
            return wxPayQuery.appId;
        },
        set: function (v) {
            wxPayQuery.appId = v;
        }
    });

    Object.defineProperty(wxPayQuery, "MchId", {
        get: function () {
            return wxPayQuery.mchId;
        },
        set: function (v) {
            wxPayQuery.mchId = v;
        }
    });

    wxPayQuery.subAppId = "";
    Object.defineProperty(wxPayQuery, "SubAppId", {
        get: function () {
            return wxPayQuery.subAppId;
        },
        set: function (v) {
            wxPayQuery.subAppId = v;
        }
    });

    wxPayQuery.subMchid = "";
    Object.defineProperty(wxPayQuery, "SubMchId", {
        get: function () {
            return wxPayQuery.subMchid;
        },
        set: function (v) {
            wxPayQuery.subMchid = v;
        }
    });


    Object.defineProperty(wxPayQuery, "SignKey", {
        get: function () {
            return wxPayQuery.signkey;
        },
        set: function (v) {
            wxPayQuery.signkey = v;
        }
    });

    wxPayQuery.tranId=""
    Object.defineProperty(wxPayQuery, "TranId", {
        get: function () {
            return wxPayQuery.tranId;
        },
        set: function (v) {
            wxPayQuery.tranId = v;
        }
    });

    wxPayQuery.orderId = "";
    Object.defineProperty(wxPayQuery, "OrderId", {
        get: function () {
            return wxPayQuery.orderId;
        },
        set: function (v) {
            wxPayQuery.orderId = v;
        }
    });

    wxPayQuery.operator = "";
    Object.defineProperty(wxPayQuery, "Operator", {
        get: function () {
            return wxPayQuery.operator;
        },
        set: function (v) {
            wxPayQuery.operator = v;
        }
    });

    //
    wxPayQuery.ToCode = function (sw) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, payCode,orderDesc,totalFee
        sw.AddLine("DBFX.Interfaces.PayService.WxPayQuery(" + DBFX.Design.WFActivities.ParsingVar(wxPayQuery.OrderId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayQuery.tranId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayQuery.AppId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayQuery.MchId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayQuery.SubAppId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayQuery.SubMchId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayQuery.SignKey) + ",function(payinfo)");
        sw.AddLine("{", 4);
        sw.AddLine("if(payinfo.State==0)");
        sw.AddLine("{", 4);
        wxPayQuery.SucSequence.ToCode(sw);
        sw.AddLine("}", -4)
        sw.AddLine("else{", 4);
        wxPayQuery.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("});", -4);

    }

    return wxPayQuery;


}
DBFX.Design.WFSerializers.WxPayQuerySerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("MchId", a, xe);
        DBFX.Serializer.DeSerialProperty("SubAppId", a, xe);
        DBFX.Serializer.DeSerialProperty("SubMchId", a, xe);
        DBFX.Serializer.DeSerialProperty("PayCode", a, xe);
        DBFX.Serializer.DeSerialProperty("SignKey", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("TranId", a, xe);
        DBFX.Serializer.DeSerialProperty("Operator", a, xe);
        DBFX.Serializer.DeSerialProperty("TotalFee", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, payCode,orderDesc,totalFee

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppId", a.AppId, xe);
        DBFX.Serializer.SerialProperty("MchId", a.MchId, xe);
        DBFX.Serializer.SerialProperty("SubAppId", a.SubAppId, xe);
        DBFX.Serializer.SerialProperty("SubMchId", a.SubMchId, xe);
        DBFX.Serializer.SerialProperty("PayCode", a.PayCode, xe);
        DBFX.Serializer.SerialProperty("SignKey", a.SignKey, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("TranId", a.TranId, xe);
        DBFX.Serializer.SerialProperty("Operator", a.Operator, xe);
        DBFX.Serializer.SerialProperty("TotalFee", a.TotalFee, xe);

        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.WxPayQueryDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/WxPayQueryDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "微信支付查询";
    return obdc;

}


//微信支付退款
DBFX.Design.WFActivities.WxPayRefund = function () {

    var wxPayRefund = new DBFX.Design.WFActivities.Activity("WxPayRefund");
    wxPayRefund.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.WxPayRefundSerializer";
    wxPayRefund.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.WxPayRefundDesigner");
    wxPayRefund.Text = "微信支付退款";
    wxPayRefund.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/wxpay.png";
    wxPayRefund.HideECButton = false;
    //加入条件系列 真值表达式
    wxPayRefund.SucSequence = new DBFX.Design.WFActivities.Sequence(wxPayRefund.DesignView);
    wxPayRefund.SucSequence.Text = "调用成功"
    wxPayRefund.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    wxPayRefund.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    wxPayRefund.SucSequence.Display = "block";
    wxPayRefund.SucSequence.HideECButton = false;
    wxPayRefund.SucSequence.IsHasContextMenu = false;
    wxPayRefund.AddControl(wxPayRefund.SucSequence);
    wxPayRefund.SucSequence.Parent = wxPayRefund;

    //加入条件系列 真值表达式
    wxPayRefund.FailSequence = new DBFX.Design.WFActivities.Sequence(wxPayRefund.DesignView);
    wxPayRefund.FailSequence.Text = "调用失败"
    wxPayRefund.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    wxPayRefund.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    wxPayRefund.FailSequence.Display = "block";
    wxPayRefund.FailSequence.HideECButton = false;
    wxPayRefund.FailSequence.IsHasContextMenu = false;
    wxPayRefund.FailSequence.Parent = wxPayRefund;
    wxPayRefund.AddControl(wxPayRefund.FailSequence);

    wxPayRefund.SetDesignView = function (v) {
        wxPayRefund.SucSequence.DesignView = v;
        wxPayRefund.FailSequence.DesignView = v;
    }


    Object.defineProperty(wxPayRefund, "AppId", {
        get: function () {
            return wxPayRefund.appId;
        },
        set: function (v) {
            wxPayRefund.appId = v;
        }
    });

    Object.defineProperty(wxPayRefund, "MchId", {
        get: function () {
            return wxPayRefund.mchId;
        },
        set: function (v) {
            wxPayRefund.mchId = v;
        }
    });

    wxPayRefund.subAppI = "";
    Object.defineProperty(wxPayRefund, "SubAppId", {
        get: function () {
            return wxPayRefund.subAppId;
        },
        set: function (v) {
            wxPayRefund.subAppId = v;
        }
    });

    wxPayRefund.subMchId = "";
    Object.defineProperty(wxPayRefund, "SubMchId", {
        get: function () {
            return wxPayRefund.subMchId;
        },
        set: function (v) {
            wxPayRefund.subMchId = v;
        }
    });


    Object.defineProperty(wxPayRefund, "SignKey", {
        get: function () {
            return wxPayRefund.signkey;
        },
        set: function (v) {
            wxPayRefund.signkey = v;
        }
    });


    Object.defineProperty(wxPayRefund, "OrderId", {
        get: function () {
            return wxPayRefund.orderId;
        },
        set: function (v) {
            wxPayRefund.orderId = v;
        }
    });

    wxPayRefund.tranId = "";
    Object.defineProperty(wxPayRefund, "TranId", {
        get: function () {
            return wxPayRefund.tranId;
        },
        set: function (v) {
            wxPayRefund.tranId = v;
        }
    });

    wxPayRefund.refundId = "";
    Object.defineProperty(wxPayRefund, "RefundId", {
        get: function () {
            return wxPayRefund.refundId;
        },
        set: function (v) {
            wxPayRefund.refundId = v;
        }
    });


    Object.defineProperty(wxPayRefund, "TotalFee", {
        get: function () {
            return wxPayRefund.totalFee;
        },
        set: function (v) {
            wxPayRefund.totalFee = v;
        }
    });


    Object.defineProperty(wxPayRefund, "RefundFee", {
        get: function () {
            return wxPayRefund.refundFee;
        },
        set: function (v) {
            wxPayRefund.refundFee = v;
        }
    });
    
    wxPayRefund.operator = "";
    Object.defineProperty(wxPayRefund, "Operator", {
        get: function () {
            return wxPayRefund.operator;
        },
        set: function (v) {
            wxPayRefund.operator = v;
        }
    });

    //
    wxPayRefund.ToCode = function (sw) {

        //orderId, tranId, refundId, totalFee, refundFee, appId, mchId, subAppId, subMchid, signkey, cb
        sw.AddLine("DBFX.Interfaces.PayService.WxPayRefund(" + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.OrderId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.tranId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.refundId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.totalFee) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.refundFee) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.AppId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.MchId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.SubAppId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.SubMchId) + "," + DBFX.Design.WFActivities.ParsingVar(wxPayRefund.SignKey) + ",function(payinfo)");
        sw.AddLine("{", 4);
        sw.AddLine("if(payinfo.State==0)");
        sw.AddLine("{", 4);
        wxPayRefund.SucSequence.ToCode(sw);
        sw.AddLine("}", -4)
        sw.AddLine("else{", 4);
        wxPayRefund.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("});", -4);

    }

    return wxPayRefund;


}
DBFX.Design.WFSerializers.WxPayRefundSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("MchId", a, xe);
        DBFX.Serializer.DeSerialProperty("SubAppId", a, xe);
        DBFX.Serializer.DeSerialProperty("SubMchId", a, xe);
        DBFX.Serializer.DeSerialProperty("RefundFee", a, xe);
        DBFX.Serializer.DeSerialProperty("SignKey", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("TranId", a, xe);
        DBFX.Serializer.DeSerialProperty("RefundId", a, xe);
        DBFX.Serializer.DeSerialProperty("Operator", a, xe);
        DBFX.Serializer.DeSerialProperty("TotalFee", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, payCode,orderDesc,totalFee

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppId", a.AppId, xe);
        DBFX.Serializer.SerialProperty("MchId", a.MchId, xe);
        DBFX.Serializer.SerialProperty("SubAppId", a.SubAppId, xe);
        DBFX.Serializer.SerialProperty("SubMchId", a.SubMchId, xe);
        DBFX.Serializer.SerialProperty("RefundFee", a.RefundFee, xe);
        DBFX.Serializer.SerialProperty("SignKey", a.SignKey, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("TranId", a.TranId, xe);
        DBFX.Serializer.SerialProperty("RefundId", a.RefundId, xe);
        DBFX.Serializer.SerialProperty("Operator", a.Operator, xe);
        DBFX.Serializer.SerialProperty("TotalFee", a.TotalFee, xe);

        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.WxPayRefundDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/WxPayRefundDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "微信支付退款设置";
    return obdc;

}


//微信支付
DBFX.Design.WFActivities.WxAppPay = function () {

    var wxAppPay = new DBFX.Design.WFActivities.Activity("WxAppPay");
    wxAppPay.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.WxAppPaySerializer";
    wxAppPay.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.WxAppPayDesigner");
    wxAppPay.Text = "微信App支付";
    wxAppPay.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/wxpay.png";
    wxAppPay.HideECButton = false;
    //加入条件系列 真值表达式
    wxAppPay.SucSequence = new DBFX.Design.WFActivities.Sequence(wxAppPay.DesignView);
    wxAppPay.SucSequence.Text = "调用成功"
    wxAppPay.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    wxAppPay.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    wxAppPay.SucSequence.Display = "block";
    wxAppPay.SucSequence.HideECButton = false;
    wxAppPay.SucSequence.IsHasContextMenu = false;
    wxAppPay.AddControl(wxAppPay.SucSequence);
    wxAppPay.SucSequence.Parent = wxAppPay;

    //加入条件系列 真值表达式
    wxAppPay.FailSequence = new DBFX.Design.WFActivities.Sequence(wxAppPay.DesignView);
    wxAppPay.FailSequence.Text = "调用失败"
    wxAppPay.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    wxAppPay.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    wxAppPay.FailSequence.Display = "block";
    wxAppPay.FailSequence.HideECButton = false;
    wxAppPay.FailSequence.IsHasContextMenu = false;
    wxAppPay.FailSequence.Parent = wxAppPay;
    wxAppPay.AddControl(wxAppPay.FailSequence);

    wxAppPay.SetDesignView = function (v) {
        wxAppPay.SucSequence.DesignView = v;
        wxAppPay.FailSequence.DesignView = v;
    }

    //(appId, mchId, subAppId, subMchid, signkey, orderId, orderDesc, totalFee, cb,tradeType

    wxAppPay.appId = "";
    Object.defineProperty(wxAppPay, "AppId", {
        get: function () {
            return wxAppPay.appId;
        },
        set: function (v) {
            wxAppPay.appId = v;
        }
    });

    wxAppPay.mchId = "";
    Object.defineProperty(wxAppPay, "MchId", {
        get: function () {
            return wxAppPay.mchId;
        },
        set: function (v) {
            wxAppPay.mchId = v;
        }
    });

    wxAppPay.subAppId = "";
    Object.defineProperty(wxAppPay, "SubAppId", {
        get: function () {
            return wxAppPay.subAppId;
        },
        set: function (v) {
            wxAppPay.subAppId = v;
        }
    });

    wxAppPay.subMchId = "";
    Object.defineProperty(wxAppPay, "SubMchId", {
        get: function () {
            return wxAppPay.subMchId;
        },
        set: function (v) {
            wxAppPay.subMchId = v;
        }
    });


    Object.defineProperty(wxAppPay, "SignKey", {
        get: function () {
            return wxAppPay.signkey;
        },
        set: function (v) {
            wxAppPay.signkey = v;
        }
    });

    Object.defineProperty(wxAppPay, "TotalFee", {
        get: function () {
            return wxAppPay.totalFee;
        },
        set: function (v) {
            wxAppPay.totalFee = v;
        }
    });

    wxAppPay.orderId = "";
    Object.defineProperty(wxAppPay, "OrderId", {
        get: function () {
            return wxAppPay.orderId;
        },
        set: function (v) {
            wxAppPay.orderId = v;
        }
    });

    wxAppPay.operator = "";
    Object.defineProperty(wxAppPay, "Operator", {
        get: function () {
            return wxAppPay.operator;
        },
        set: function (v) {
            wxAppPay.operator = v;
        }
    });

    wxAppPay.orderDesc = "";
    Object.defineProperty(wxAppPay, "OrderDesc", {
        get: function () {
            return wxAppPay.orderDesc;
        },
        set: function (v) {
            wxAppPay.orderDesc = v;
        }
    });

    wxAppPay.tradeType = "APP";
    Object.defineProperty(wxAppPay, "TradeType", {
        get: function () {
            return wxAppPay.tradeType;
        },
        set: function (v) {
            wxAppPay.tradeType = v;
        }
    });

    wxAppPay.mpAppId = "";
    Object.defineProperty(wxAppPay, "MPAppId", {
        get: function () {
            return wxAppPay.mpAppId;
        },
        set: function (v) {
            wxAppPay.mpAppId = v;
        }
    });

    //
    wxAppPay.ToCode = function (sw) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, orderDesc, totalFee, cb,tradeType                          appId, mchId, subAppId, subMchid, signkey, orderId, orderDesc, totalFee, cb,tradeType
        sw.AddLine("DBFX.Interfaces.PayService.WxAppPay(" + DBFX.Design.WFActivities.ParsingVar(wxAppPay.AppId) + "," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.MchId) + "," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.SubAppId) + "," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.SubMchId) + "," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.SignKey) + "," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.OrderId) + "," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.OrderDesc) + "," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.TotalFee) + ",function(payinfo)");
        sw.AddLine("{", 4);
        sw.AddLine("if(payinfo.State==0)");
        sw.AddLine("{", 4);
        wxAppPay.SucSequence.ToCode(sw);
        sw.AddLine("}", -4)
        if (wxAppPay.FailSequence.Activities.length > 0) {
            sw.AddLine("else{", 4);
            wxAppPay.FailSequence.ToCode(sw);
            sw.AddLine("}", -4);
        }
        sw.AddLine("}," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.TradeType) + "," + DBFX.Design.WFActivities.ParsingVar(wxAppPay.MPAppId)+ ");", -4);

    }

    return wxAppPay;


}
DBFX.Design.WFSerializers.WxAppPaySerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("MPAppId", a, xe);
        DBFX.Serializer.DeSerialProperty("MchId", a, xe);
        DBFX.Serializer.DeSerialProperty("SubAppId", a, xe);
        DBFX.Serializer.DeSerialProperty("SubMchId", a, xe);
        DBFX.Serializer.DeSerialProperty("SignKey", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderDesc", a, xe);
        DBFX.Serializer.DeSerialProperty("Operator", a, xe);
        DBFX.Serializer.DeSerialProperty("TotalFee", a, xe);
        DBFX.Serializer.DeSerialProperty("TradeType", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq =xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq =xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, payCode,orderDesc,totalFee

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppId", a.AppId, xe);
        DBFX.Serializer.SerialProperty("MPAppId", a.MPAppId, xe);
        DBFX.Serializer.SerialProperty("MchId", a.MchId, xe);
        DBFX.Serializer.SerialProperty("SubAppId", a.SubAppId, xe);
        DBFX.Serializer.SerialProperty("SubMchId", a.SubMchId, xe);
        DBFX.Serializer.SerialProperty("SignKey", a.SignKey, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("OrderDesc", a.OrderDesc, xe);
        DBFX.Serializer.SerialProperty("Operator", a.Operator, xe);
        DBFX.Serializer.SerialProperty("TotalFee", a.TotalFee, xe);
        DBFX.Serializer.SerialProperty("TradeType", a.TradeType, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.WxAppPayDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/WxAppPayDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "微信App支付设置";
    return obdc;

}


//AliPay支付
DBFX.Design.WFActivities.AliPay = function () {


    var alipay = new DBFX.Design.WFActivities.Activity("AliPay");
    alipay.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.AliPaySerializer";
    alipay.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.AliPayDesigner");
    alipay.Text = "支付宝支付";
    alipay.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/alipay.png";
    alipay.HideECButton = false;
    //加入条件系列 真值表达式
    alipay.SucSequence = new DBFX.Design.WFActivities.Sequence(alipay.DesignView);
    alipay.SucSequence.Text = "调用成功"
    alipay.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    alipay.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    alipay.SucSequence.Display = "block";
    alipay.SucSequence.HideECButton = false;
    alipay.SucSequence.IsHasContextMenu = false;
    alipay.AddControl(alipay.SucSequence);
    alipay.SucSequence.Parent = alipay;

    //加入条件系列 真值表达式
    alipay.FailSequence = new DBFX.Design.WFActivities.Sequence(alipay.DesignView);
    alipay.FailSequence.Text = "调用失败"
    alipay.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    alipay.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    alipay.FailSequence.Display = "block";
    alipay.FailSequence.HideECButton = false;
    alipay.FailSequence.IsHasContextMenu = false;
    alipay.FailSequence.Parent = alipay;
    alipay.AddControl(alipay.FailSequence);

    alipay.SetDesignView = function (v) {
        alipay.SucSequence.DesignView = v;
        alipay.FailSequence.DesignView = v;
    }

    Object.defineProperty(alipay, "AppId", {
        get: function () {
            return alipay.appId;
        },
        set: function (v) {
            alipay.appId = v;
        }
    });


    Object.defineProperty(alipay, "Saller", {
        get: function () {
            return alipay.saller;
        },
        set: function (v) {
            alipay.saller = v;
        }
    });

    alipay.orderId = "";
    Object.defineProperty(alipay, "OrderId", {
        get: function () {
            return alipay.orderId;
        },
        set: function (v) {
            alipay.orderId = v;
        }
    });

    alipay.operator = "";
    Object.defineProperty(alipay, "Operator", {
        get: function () {
            return alipay.operator;
        },
        set: function (v) {
            alipay.operator = v;
        }
    });

    alipay.orderDesc = "";
    Object.defineProperty(alipay, "OrderDesc", {
        get: function () {
            return alipay.orderDesc;
        },
        set: function (v) {
            alipay.orderDesc = v;
        }
    });

    Object.defineProperty(alipay, "PayCode", {
        get: function () {
            return alipay.payCode;
        },
        set: function (v) {
            alipay.payCode = v;
        }
    });

    Object.defineProperty(alipay, "TotalFee", {
        get: function () {
            return alipay.totalFee;
        },
        set: function (v) {
            alipay.totalFee = v;
        }
    });



    //
    alipay.ToCode = function (sw) {

        //partnerId, saller,orderId, payCode, totalFee,orderDesc,op
        sw.AddLine("DBFX.Interfaces.PayService.AliPayByBarCode(" + DBFX.Design.WFActivities.ParsingVar(alipay.AppId) + "," + DBFX.Design.WFActivities.ParsingVar(alipay.Saller) + "," + DBFX.Design.WFActivities.ParsingVar(alipay.OrderId) + "," + DBFX.Design.WFActivities.ParsingVar(alipay.PayCode) + "," + DBFX.Design.WFActivities.ParsingVar(alipay.totalFee) + "," + DBFX.Design.WFActivities.ParsingVar(alipay.OrderDesc) + "," + DBFX.Design.WFActivities.ParsingVar(alipay.Operator) + ",function(payinfo){", 4);
        sw.AddLine("if(payinfo.State==0){", 4);
        alipay.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        if (alipay.FailSequence.Activities.length > 0) {
            sw.AddLine("else{", 4);
            alipay.FailSequence.ToCode(sw);
            sw.AddLine("}", -4);
        }
        sw.AddLine("});", -4)

    }


    return alipay;


}
DBFX.Design.WFSerializers.AliPaySerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("Saller", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("Operator", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderDesc", a, xe);
        DBFX.Serializer.DeSerialProperty("PayCode", a, xe);
        DBFX.Serializer.DeSerialProperty("TotalFee", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq =xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppId", a.AppId, xe);
        DBFX.Serializer.SerialProperty("Saller", a.Saller, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("Operator", a.Operator, xe);
        DBFX.Serializer.SerialProperty("OrderDesc", a.OrderDesc, xe);
        DBFX.Serializer.SerialProperty("PayCode", a.PayCode, xe);
        DBFX.Serializer.SerialProperty("TotalFee", a.TotalFee, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.AliPayDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/AliPayDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "支付宝支付设置";
    return obdc;

}


//AliPay支付查询
DBFX.Design.WFActivities.AliPayQuery = function () {


    var aliPayQuery = new DBFX.Design.WFActivities.Activity("AliPayQuery");
    aliPayQuery.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.AliPayQuerySerializer";
    aliPayQuery.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.AliPayQueryDesigner");
    aliPayQuery.Text = "支付宝查询";
    aliPayQuery.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/alipay.png";
    aliPayQuery.HideECButton = false;
    //加入条件系列 真值表达式
    aliPayQuery.SucSequence = new DBFX.Design.WFActivities.Sequence(aliPayQuery.DesignView);
    aliPayQuery.SucSequence.Text = "调用成功"
    aliPayQuery.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    aliPayQuery.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    aliPayQuery.SucSequence.Display = "block";
    aliPayQuery.SucSequence.HideECButton = false;
    aliPayQuery.SucSequence.IsHasContextMenu = false;
    aliPayQuery.AddControl(aliPayQuery.SucSequence);
    aliPayQuery.SucSequence.Parent = aliPayQuery;

    //加入条件系列 真值表达式
    aliPayQuery.FailSequence = new DBFX.Design.WFActivities.Sequence(aliPayQuery.DesignView);
    aliPayQuery.FailSequence.Text = "调用失败"
    aliPayQuery.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    aliPayQuery.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    aliPayQuery.FailSequence.Display = "block";
    aliPayQuery.FailSequence.HideECButton = false;
    aliPayQuery.FailSequence.IsHasContextMenu = false;
    aliPayQuery.FailSequence.Parent = aliPayQuery;
    aliPayQuery.AddControl(aliPayQuery.FailSequence);

    aliPayQuery.SetDesignView = function (v) {
        aliPayQuery.SucSequence.DesignView = v;
        aliPayQuery.FailSequence.DesignView = v;
    }

    //orderId, tranId, partnerId

    Object.defineProperty(aliPayQuery, "AppId", {
        get: function () {
            return aliPayQuery.appId;
        },
        set: function (v) {
            aliPayQuery.appId = v;
        }
    });

    aliPayQuery.orderId = "";
    Object.defineProperty(aliPayQuery, "OrderId", {
        get: function () {
            return aliPayQuery.orderId;
        },
        set: function (v) {
            aliPayQuery.orderId = v;
        }
    });

    aliPayQuery.tranId = "";
    Object.defineProperty(aliPayQuery, "TranId", {
        get: function () {
            return aliPayQuery.tranId;
        },
        set: function (v) {
            aliPayQuery.tranId = v;
        }
    });




    //
    aliPayQuery.ToCode = function (sw) {

        sw.AddLine("DBFX.Interfaces.PayService.AliPayQuery(" + DBFX.Design.WFActivities.ParsingVar(aliPayQuery.OrderId) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayQuery.TranId) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayQuery.AppId) + ",function(payinfo){", 4);
        sw.AddLine("if(payinfo.State==0){", 4);
        aliPayQuery.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        if (aliPayQuery.FailSequence.Activities.length > 0) {
            sw.AddLine("else{", 4);
            aliPayQuery.FailSequence.ToCode(sw);
            sw.AddLine("}", -4);
        }
        sw.AddLine("});", -4)


    }


    return aliPayQuery;


}
DBFX.Design.WFSerializers.AliPayQuerySerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("Saller", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("TranId", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppId", a.AppId, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("TranId", a.TranId, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.AliPayQueryDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/AliPayQueryDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "支付宝支付查询设置";
    return obdc;

}


//AliPay支付查询
DBFX.Design.WFActivities.AliPayRefund = function () {

    var aliPayRefund = new DBFX.Design.WFActivities.Activity("AliPayRefund");
    aliPayRefund.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.AliPayRefundSerializer";
    aliPayRefund.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.AliPayRefundDesigner");
    aliPayRefund.Text = "支付宝退款";
    aliPayRefund.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/alipay.png";
    aliPayRefund.HideECButton = false;
    //加入条件系列 真值表达式
    aliPayRefund.SucSequence = new DBFX.Design.WFActivities.Sequence(aliPayRefund.DesignView);
    aliPayRefund.SucSequence.Text = "调用成功"
    aliPayRefund.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    aliPayRefund.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    aliPayRefund.SucSequence.Display = "block";
    aliPayRefund.SucSequence.HideECButton = false;
    aliPayRefund.SucSequence.IsHasContextMenu = false;
    aliPayRefund.AddControl(aliPayRefund.SucSequence);
    aliPayRefund.SucSequence.Parent = aliPayRefund;

    //加入条件系列 真值表达式
    aliPayRefund.FailSequence = new DBFX.Design.WFActivities.Sequence(aliPayRefund.DesignView);
    aliPayRefund.FailSequence.Text = "调用失败"
    aliPayRefund.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    aliPayRefund.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    aliPayRefund.FailSequence.Display = "block";
    aliPayRefund.FailSequence.HideECButton = false;
    aliPayRefund.FailSequence.IsHasContextMenu = false;
    aliPayRefund.FailSequence.Parent = aliPayRefund;
    aliPayRefund.AddControl(aliPayRefund.FailSequence);

    aliPayRefund.SetDesignView = function (v) {
        aliPayRefund.SucSequence.DesignView = v;
        aliPayRefund.FailSequence.DesignView = v;
    }

    aliPayRefund.appId = "";
    Object.defineProperty(aliPayRefund, "AppId", {
        get: function () {
            return aliPayRefund.appId;
        },
        set: function (v) {
            aliPayRefund.appId = v;
        }
    });

    aliPayRefund.orderId = "";
    Object.defineProperty(aliPayRefund, "OrderId", {
        get: function () {
            return aliPayRefund.orderId;
        },
        set: function (v) {
            aliPayRefund.orderId = v;
        }
    });

    aliPayRefund.tranId = "";
    Object.defineProperty(aliPayRefund, "TranId", {
        get: function () {
            return aliPayRefund.tranId;
        },
        set: function (v) {
            aliPayRefund.tranId = v;
        }
    });

    aliPayRefund.refundId = "";
    Object.defineProperty(aliPayRefund, "RefundId", {
        get: function () {
            return aliPayRefund.refundId;
        },
        set: function (v) {
            aliPayRefund.refundId = v;
        }
    });

    Object.defineProperty(aliPayRefund, "RefundFee", {
        get: function () {
            return aliPayRefund.refundFee;
        },
        set: function (v) {
            aliPayRefund.refundFee = v;
        }
    });

    aliPayRefund.refundReason = "";
    Object.defineProperty(aliPayRefund, "RefundReason", {
        get: function () {
            return aliPayRefund.refundReason;
        },
        set: function (v) {
            aliPayRefund.refundReason = v;
        }
    });

    aliPayRefund.totalFee = "0";
    Object.defineProperty(aliPayRefund, "TotalFee", {
        get: function () {
            return aliPayRefund.totalFee;
        },
        set: function (v) {
            aliPayRefund.totalFee = v;
        }
    });

    aliPayRefund.operator = "";
    Object.defineProperty(aliPayRefund, "Operator", {
        get: function () {
            return aliPayRefund.operator;
        },
        set: function (v) {
            aliPayRefund.operator = v;
        }
    });

    //
    aliPayRefund.ToCode = function (sw) {

        //orderId, tranId, refundId, totalFee, refundFee,refundReason,op, partnerId
        sw.AddLine("DBFX.Interfaces.PayService.AliPayRefund(" + DBFX.Design.WFActivities.ParsingVar(aliPayRefund.OrderId) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayRefund.TranId) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayRefund.refundId) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayRefund.totalFee) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayRefund.refundFee) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayRefund.refundReason) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayRefund.operator) + "," + DBFX.Design.WFActivities.ParsingVar(aliPayRefund.AppId) + ",function(payinfo){", 4);
        sw.AddLine("if(payinfo.State==0){", 4);
        aliPayRefund.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("else{", 4);
        aliPayRefund.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("});", -4)

    }


    return aliPayRefund;


}
DBFX.Design.WFSerializers.AliPayRefundSerializer = function () {

    //反系列化 //orderId, tranId, refundId, totalFee, refundFee,refundReason,op, partnerId
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("TranId", a, xe);
        DBFX.Serializer.DeSerialProperty("RefundId", a, xe);
        DBFX.Serializer.DeSerialProperty("TotalFee", a, xe);
        DBFX.Serializer.DeSerialProperty("RefundFee", a, xe);
        DBFX.Serializer.DeSerialProperty("RefundReason", a, xe);
        DBFX.Serializer.DeSerialProperty("Operator", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppId", a.AppId, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("TranId", a.TranId, xe);
        DBFX.Serializer.SerialProperty("RefundId", a.RefundId, xe);
        DBFX.Serializer.SerialProperty("TotalFee", a.TotalFee, xe);
        DBFX.Serializer.SerialProperty("RefundFee", a.RefundFee, xe);
        DBFX.Serializer.SerialProperty("RefundReason", a.RefundReason, xe);
        DBFX.Serializer.SerialProperty("Operator", a.Operator, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.AliPayRefundDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/AliPayRefundDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "支付宝退款设置";
    return obdc;

}


//AliPay支付
DBFX.Design.WFActivities.AliAppPay = function () {


    var aliAppPay = new DBFX.Design.WFActivities.Activity("AliAppPay");
    aliAppPay.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.AliAppPaySerializer";
    aliAppPay.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.AliAppPayDesigner");
    aliAppPay.Text = "支付宝App支付";
    aliAppPay.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/alipay.png";
    aliAppPay.HideECButton = false;
    //加入条件系列 真值表达式
    aliAppPay.SucSequence = new DBFX.Design.WFActivities.Sequence(aliAppPay.DesignView);
    aliAppPay.SucSequence.Text = "调用成功"
    aliAppPay.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    aliAppPay.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    aliAppPay.SucSequence.Display = "block";
    aliAppPay.SucSequence.HideECButton = false;
    aliAppPay.SucSequence.IsHasContextMenu = false;
    aliAppPay.AddControl(aliAppPay.SucSequence);
    aliAppPay.SucSequence.Parent = aliAppPay;

    //加入条件系列 真值表达式
    aliAppPay.FailSequence = new DBFX.Design.WFActivities.Sequence(aliAppPay.DesignView);
    aliAppPay.FailSequence.Text = "调用失败"
    aliAppPay.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    aliAppPay.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    aliAppPay.FailSequence.Display = "block";
    aliAppPay.FailSequence.HideECButton = false;
    aliAppPay.FailSequence.IsHasContextMenu = false;
    aliAppPay.FailSequence.Parent = aliAppPay;
    aliAppPay.AddControl(aliAppPay.FailSequence);

    aliAppPay.SetDesignView = function (v) {
        aliAppPay.SucSequence.DesignView = v;
        aliAppPay.FailSequence.DesignView = v;
    }

    aliAppPay.appId = "";
    Object.defineProperty(aliAppPay, "AppId", {
        get: function () {
            return aliAppPay.appId;
        },
        set: function (v) {
            aliAppPay.appId = v;
        }
    });


    aliAppPay.saller = "";
    Object.defineProperty(aliAppPay, "Saller", {
        get: function () {
            return aliAppPay.saller;
        },
        set: function (v) {
            aliAppPay.saller = v;
        }
    });
    aliAppPay.orderId = "";
    Object.defineProperty(aliAppPay, "OrderId", {
        get: function () {
            return aliAppPay.orderId;
        },
        set: function (v) {
            aliAppPay.orderId = v;
        }
    });

    aliAppPay.operator = "";
    Object.defineProperty(aliAppPay, "Operator", {
        get: function () {
            return aliAppPay.operator;
        },
        set: function (v) {
            aliAppPay.operator = v;
        }
    });

    aliAppPay.orderDesc = "";
    Object.defineProperty(aliAppPay, "OrderDesc", {
        get: function () {
            return aliAppPay.orderDesc;
        },
        set: function (v) {
            aliAppPay.orderDesc = v;
        }
    });

    aliAppPay.totalFee = "0";
    Object.defineProperty(aliAppPay, "TotalFee", {
        get: function () {
            return aliAppPay.totalFee;
        },
        set: function (v) {
            aliAppPay.totalFee = v;
        }
    });



    //
    aliAppPay.ToCode = function (sw) {

        sw.AddLine("DBFX.Interfaces.PayService.AliAppPay(" + DBFX.Design.WFActivities.ParsingVar(aliAppPay.AppId) + "," + DBFX.Design.WFActivities.ParsingVar(aliAppPay.Saller) + "," + DBFX.Design.WFActivities.ParsingVar(aliAppPay.OrderId) + "," + DBFX.Design.WFActivities.ParsingVar(aliAppPay.Operator) + "," + DBFX.Design.WFActivities.ParsingVar(aliAppPay.OrderDesc) + "," + DBFX.Design.WFActivities.ParsingVar(aliAppPay.totalFee) + ",function(payinfo){", 4);
        sw.AddLine("if(payinfo.State==0){", 4);
        aliAppPay.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("else{", 4);
        aliAppPay.FailSequence.ToCode(sw);
        sw.AddLine("}" ,-4);
        sw.AddLine("});", -4)

    }


    return aliAppPay;


}
DBFX.Design.WFSerializers.AliAppPaySerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("Saller", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("Operator", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderDesc", a, xe);
        DBFX.Serializer.DeSerialProperty("TotalFee", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppId", a.AppId, xe);
        DBFX.Serializer.SerialProperty("Saller", a.Saller, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("Operator", a.Operator, xe);
        DBFX.Serializer.SerialProperty("OrderDesc", a.OrderDesc, xe);
        DBFX.Serializer.SerialProperty("TotalFee", a.TotalFee, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.AliAppPayDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/AliAppPayDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "支付宝支付设置";
    return obdc;

}


//JSon转为对象
DBFX.Design.WFActivities.JSon2Object = function () {

    var j2o = new DBFX.Design.WFActivities.Activity("JSon2Object");
    j2o.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.JSon2ObjectSerializer";
    j2o.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.JSon2ObjectDesigner");
    j2o.Text = "Json2Object";
    j2o.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/json2obj.png";

    //===============================================================================
    j2o.jsonData = "";
    Object.defineProperty(j2o, "JSonData", {
        get: function () {

            return j2o.jsonData;

        },
        set: function (v) {

            j2o.jsonData = v;

        }
    });

    //==============================================================================
    j2o.varName = "";
    Object.defineProperty(j2o, "VarName", {
        get: function () {

            return j2o.varName;

        },
        set: function (v) {

            j2o.varName = v;

        }
    });

    //生成代码
    j2o.ToCode = function (sw) {


        sw.AddLine(j2o.varName + "=" + DBFX.Design.WFActivities.ParsingVar(j2o.jsonData) + ";");


    }

    return j2o;


}
DBFX.Design.WFSerializers.JSon2ObjectSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ServiceUri", a, xe);
        DBFX.Serializer.DeSerialProperty("ParametersStr", a, xe);
        DBFX.Serializer.DeSerialProperty("SPName", a, xe);
        DBFX.Serializer.DeSerialProperty("DBName", a, xe);
        DBFX.Serializer.DeSerialProperty("StorageSvcUri", a, xe);
        DBFX.Serializer.DeSerialProperty("ResponseProcessor", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.querySelector("SucSequence");
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.querySelector("FailSequence");
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("ServiceUri", a.ServiceUri, xe);
        DBFX.Serializer.SerialProperty("ParametersStr", a.ParametersStr, xe);
        DBFX.Serializer.SerialProperty("SPName", a.SPName, xe);
        DBFX.Serializer.SerialProperty("DBName", a.DBName, xe);
        DBFX.Serializer.SerialProperty("StorageSvcUri", a.StorageSvcUri, xe);
        DBFX.Serializer.SerialProperty("ResponseProcessor", a.ResponseProcessor, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.JSon2ObjectDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/JSon2ObjectDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "转换设置";
    return obdc;

}

//对象转为JSon
DBFX.Design.WFActivities.Object2JSon = function () {

    var o2j = new DBFX.Design.WFActivities.Activity("Object2JSon");
    o2j.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.Object2JSonSerializer";
    o2j.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.Object2JSonDesigner");
    o2j.Text = "Object2JSon";
    o2j.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/obj2json.png";

    //===============================================================================
    o2j.jsonVar = "";
    Object.defineProperty(o2j, "JSonVar", {
        get: function () {

            return o2j.jsonVar;

        },
        set: function (v) {

            o2j.jsonVar = v;

        }
    });


    //==============================================================================
    o2j.varName = "";
    Object.defineProperty(o2j, "VarName", {
        get: function () {

            return o2j.varName;

        },
        set: function (v) {

            o2j.varName = v;

        }
    });

    //生成代码
    o2j.ToCode = function (sw) {
        
        sw.AddLine(o2j.JSonVar + "=JSON.stringify(" + DBFX.Design.WFActivities.ParsingVar(o2j.varName) + ");");

    }

    return o2j;


}
DBFX.Design.WFSerializers.Object2JSonSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("JSonVar", a, xe);
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
        DBFX.Serializer.SerialProperty("JSonVar", a.JSonVar, xe);
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);



    }



}
DBFX.Design.ActivityDesigners.Object2JSonDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/Object2JSonSerializer.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "转换设置";
    return obdc;

}

//退出循环
DBFX.Design.WFActivities.Break = function () {

    var actbreak = new DBFX.Design.WFActivities.Activity("Break");
    actbreak.Text = "退出循环";
    actbreak.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/break.png";
    actbreak.ToCode = function (sw) {

        sw.AddLine("break;");

    }
    return actbreak;


}

//退出循环
DBFX.Design.WFActivities.UIViewPageGoBack = function () {

    var actbreak = new DBFX.Design.WFActivities.Activity("UIViewPageGoBack");
    actbreak.Text = "退回上一层页面";
    actbreak.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/goback.png";
    actbreak.ToCode = function (sw) {

       
        sw.AddLine("app.GoBack();")

    }
    return actbreak;


}

//过程返回
DBFX.Design.WFActivities.Return = function () {

    var aret = new DBFX.Design.WFActivities.Activity("Return");
    aret.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ReturnSerializer";
    aret.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ReturnDesigner");
    aret.Text = "终止返回";
    aret.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/return.png";
    aret.returnObject = "";
    Object.defineProperty(aret, "ReturnObject", {
        get: function () {

            return aret.returnObject;

        },
        set: function (v) {

            aret.returnObject = v;

        }
    });

    aret.ToCode = function (sw) {

        if (aret.returnObject != undefined && aret.returnObject != "")
            sw.AddLine("return " +DBFX.Design.WFActivities.ParsingVar(aret.returnObject));
        else
            sw.AddLine("return;");

    }

    return aret;
}

//服务调用
DBFX.Design.WFActivities.InvokeSvcBus = function () {

    var ivksvcbus = new DBFX.Design.WFActivities.Activity("InvokeSvcBus");
    ivksvcbus.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.InvokeSvcBusSerializer";
    ivksvcbus.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.InvokeSvcBusDesigner");
    ivksvcbus.Text = "云服务调用";
    ivksvcbus.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/invokesvcbus.png";
    ivksvcbus.HideECButton = false;

    ivksvcbus.ParamsList = DBFX.Design.WFActivities.ParameterBuilder();
    ivksvcbus.ParamsList.IsHasContextMenu = false;
    ivksvcbus.AddControl(ivksvcbus.ParamsList);
    ivksvcbus.ParamsList.DataContext = ivksvcbus.dataContext;
    
    //加入条件系列 真值表达式
    ivksvcbus.SucSequence = new DBFX.Design.WFActivities.Sequence(ivksvcbus.DesignView);
    ivksvcbus.SucSequence.Text = "调用成功"
    ivksvcbus.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    ivksvcbus.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    ivksvcbus.SucSequence.Display = "block";
    ivksvcbus.SucSequence.HideECButton = false;
    ivksvcbus.SucSequence.IsHasContextMenu = false;
    ivksvcbus.SucSequence.Parent = ivksvcbus;
    ivksvcbus.AddControl(ivksvcbus.SucSequence);
    ivksvcbus.SucSequence.Parent = ivksvcbus;

    //加入条件系列 真值表达式
    ivksvcbus.FailSequence = new DBFX.Design.WFActivities.Sequence(ivksvcbus.DesignView);
    ivksvcbus.FailSequence.Text = "调用失败"
    ivksvcbus.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    ivksvcbus.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    ivksvcbus.FailSequence.Display = "block";
    ivksvcbus.FailSequence.HideECButton = false;
    ivksvcbus.FailSequence.IsHasContextMenu = false;
    ivksvcbus.FailSequence.Parent = ivksvcbus;
    ivksvcbus.AddControl(ivksvcbus.FailSequence);


    ivksvcbus.HideECButton = false;

    
    ivksvcbus.SetDesignView = function (v) {
        ivksvcbus.SucSequence.DesignView = v;
        ivksvcbus.FailSequence.DesignView = v;
        ivksvcbus.ParamsList.DesignView = v;
    }

    Object.defineProperty(ivksvcbus, "SvcBusUri", {
        get: function () {
            return ivksvcbus.svcBusUri;
        },
        set: function (v) {

            ivksvcbus.svcBusUri = v;
            ivksvcbus.OnPropertyChanged("SvcBusUri", v);
        }
    });

    
    Object.defineProperty(ivksvcbus, "SvcUri", {
        get: function () {
            return ivksvcbus.svcUri;
        },
        set: function (v) {

            ivksvcbus.svcUri = v;
            ivksvcbus.OnPropertyChanged("SvcUri", v);
        }
    });

    Object.defineProperty(ivksvcbus, "SvcMethod", {
        get: function () {
            return ivksvcbus.svcMethod;
        },
        set: function (v) {

            ivksvcbus.svcMethod = v;
            ivksvcbus.OnPropertyChanged("SvcMethod", v);
        }
    });

    Object.defineProperty(ivksvcbus, "ParametersStr", {

        get: function () {

            var parastr = "[]";
            parastr = ivksvcbus.ParamsList.ParametersStr;
            return parastr;

        },
        set: function (v) {

            if (v != undefined && v != null && v != "") {

                var paras = JSON.parse(v);
                ivksvcbus.ParamsList.parameters = paras;

            }
        }

    });

    Object.defineProperty(ivksvcbus, "ResponseProcessor", {
        get: function () {
            return ivksvcbus.responseProcessor;
        },
        set: function (v) {

            ivksvcbus.responseProcessor = v;
            ivksvcbus.OnPropertyChanged("ResponseProcessor", v);
        }
    });


    ivksvcbus.ToCode = function (sw) {

        var svcuri = "app.ServiceUri";
        if (ivksvcbus.svcBusUri != undefined && ivksvcbus.svcBusUri != "") {

            svcuri = DBFX.Design.WFActivities.ParsingVar(ivksvcbus.svcBusUri);
        }

        var paras = ivksvcbus.ParamsList.parameters;

        sw.AddLine("var params={};");

        for (var i = 0; i < paras.length; i++) {

            var pa = paras[i];

            sw.AddLine("params." + pa.ParameterName + "=" + DBFX.Design.WFActivities.ParsingVar(pa.DefaultValue) + ";");


        }

        sw.AddLine("var req = new DBFX.SvcBus.SvcRequest();");
        sw.AddLine("req.SvcUri = \"" + ivksvcbus.svcUri + "\";");
        sw.AddLine("req.Headers.Method = \"" + ivksvcbus.svcMethod + "\";");
        sw.AddLine("req.Parameters=params;");
        sw.AddLine("req.CallBack=function(resp){", 4);
        sw.AddLine("if(resp.State==0){", 4);
        ivksvcbus.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        if (ivksvcbus.FailSequence.Activities.length > 0) {
            sw.AddLine("else{", 4);
            ivksvcbus.FailSequence.ToCode(sw);
            sw.AddLine("}", -4);
        }
        sw.AddLine("}",-4);
        sw.AddLine("DBFX.SvcBus.ESBClient.ExecuteRequest(" + svcuri+", req);");

    }



    return ivksvcbus;


}
//
DBFX.Design.WFSerializers.InvokeSvcBusSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("SvcBusUri", a, xe);
        DBFX.Serializer.DeSerialProperty("SvcUri", a, xe);
        DBFX.Serializer.DeSerialProperty("SvcMethod", a, xe);
        DBFX.Serializer.DeSerialProperty("ParametersStr", a, xe);
        DBFX.Serializer.DeSerialProperty("ResponseProcessor", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.querySelector("SucSequence");
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.querySelector("FailSequence");
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("SvcBusUri", a.SvcBusUri, xe);
        DBFX.Serializer.SerialProperty("SvcUri", a.SvcUri, xe);
        DBFX.Serializer.SerialProperty("SvcMethod", a.SvcMethod, xe);
        DBFX.Serializer.SerialProperty("ParametersStr", a.ParametersStr, xe);
        DBFX.Serializer.SerialProperty("ResponseProcessor", a.ResponseProcessor, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq1 = xdoc.createElement("FailSequence");
            xe.appendChild(xseq1);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq1, ns);

        }


    }



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

//数据访问服务调用
DBFX.Design.WFActivities.InvokeDASvc = function () {


    var ivkdasvc = new DBFX.Design.WFActivities.Activity("InvokeDASvc");
    ivkdasvc.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.InvokeDASvcSerializer";
    ivkdasvc.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.InvokeDASvcDesigner");
    ivkdasvc.Text = "数据访问服务调用";
    ivkdasvc.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/invokedasvc.png";
    ivkdasvc.HideECButton = false;

    ivkdasvc.ParamsList = DBFX.Design.WFActivities.ParameterBuilder();
    ivkdasvc.ParamsList.IsHasContextMenu = false;
    ivkdasvc.AddControl(ivkdasvc.ParamsList);
    ivkdasvc.ParamsList.DataContext = ivkdasvc.dataContext;

    //加入条件系列 真值表达式
    ivkdasvc.SucSequence = new DBFX.Design.WFActivities.Sequence(ivkdasvc.DesignView);
    ivkdasvc.SucSequence.Text = "调用成功"
    ivkdasvc.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    ivkdasvc.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    ivkdasvc.SucSequence.Display = "block";
    ivkdasvc.SucSequence.HideECButton = false;
    ivkdasvc.SucSequence.IsHasContextMenu = false;
    ivkdasvc.SucSequence.Parent = ivkdasvc;
    ivkdasvc.AddControl(ivkdasvc.SucSequence);
    ivkdasvc.SucSequence.Parent = ivkdasvc;

    //加入条件系列 真值表达式
    ivkdasvc.FailSequence = new DBFX.Design.WFActivities.Sequence(ivkdasvc.DesignView);
    ivkdasvc.FailSequence.Text = "调用失败"
    ivkdasvc.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    ivkdasvc.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    ivkdasvc.FailSequence.Display = "block";
    ivkdasvc.FailSequence.HideECButton = false;
    ivkdasvc.FailSequence.IsHasContextMenu = false;
    ivkdasvc.FailSequence.Parent = ivkdasvc;
    ivkdasvc.AddControl(ivkdasvc.FailSequence);

    ivkdasvc.HideECButton = false;
    ivkdasvc.svcUri = "DB.FX.Storage.MongoDBService";
    Object.defineProperty(ivkdasvc, "SvcUri", {

        get: function () {
            return ivkdasvc.svcUri;
        },
        set: function (v) {
            ivkdasvc.svcUri = v;
        }

    });

    ivkdasvc.svcBusUri = "";
    Object.defineProperty(ivkdasvc, "SvcBusUri", {

        get: function () {
            return ivkdasvc.svcBusUri;
        },
        set: function (v) {
            ivkdasvc.svcBusUri = v;
        }

    });

    ivkdasvc.spName = "";
    Object.defineProperty(ivkdasvc, "SPName", {

        get: function () {
            return ivkdasvc.spName;
        },
        set: function (v) {
            ivkdasvc.spName = v;
        }

    });


    ivkdasvc.dbName = "";
    Object.defineProperty(ivkdasvc, "DBName", {

        get: function () {
            return ivkdasvc.dbName;
        },
        set: function (v) {
            ivkdasvc.dbName = v;
        }

    });


    ivkdasvc.ssUri = "";
    Object.defineProperty(ivkdasvc, "StorageSvcUri", {

        get: function () {
            return ivkdasvc.ssUri;
        },
        set: function (v) {
            ivkdasvc.ssUri = v;
        }

    });


    Object.defineProperty(ivkdasvc, "ParametersStr", {

        get: function () {

            var parastr = "[]";
            parastr = ivkdasvc.ParamsList.ParametersStr;
            return parastr; 

        },
        set: function (v) {

            if (v != undefined && v != null && v != "") {

                var paras = JSON.parse(v);
                ivkdasvc.ParamsList.parameters = paras;

            }
        }

    });


    ivkdasvc.ToCode = function (sw) {

        sw.AddLine("var params={};");
        var paras = ivkdasvc.ParamsList.parameters;
        for (var i = 0; i < paras.length; i++) {

            var pa = paras[i];

            sw.AddLine("params." + pa.ParameterName + "=" + DBFX.Design.WFActivities.ParsingVar(pa.DefaultValue) + ";");


        }

        if (ivkdasvc.svcBusUri == undefined)
            ivkdasvc.svcBusUri = "";

        if (ivkdasvc.svcUri == undefined)
            ivkdasvc.svcUri = "";

        sw.AddLine("var dareq = new DBFX.Data.DACrequest(" + DBFX.Design.WFActivities.ParsingVar(ivkdasvc.spName)+ ", params, " + DBFX.Design.WFActivities.ParsingVar(ivkdasvc.StorageSvcUri) + "," + DBFX.Design.WFActivities.ParsingVar(ivkdasvc.dbName)+ ", function (daresp) {", 4);
        sw.AddLine("if (daresp.State == 0) {", 4);
        ivkdasvc.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        if (ivkdasvc.FailSequence.Activities.length > 0) {
            sw.AddLine("else{", 4);
            ivkdasvc.FailSequence.ToCode(sw);
            sw.AddLine("}", -4);
        }
        sw.AddLine("}," + DBFX.Design.WFActivities.ParsingVar(ivkdasvc.svcUri) + "," + DBFX.Design.WFActivities.ParsingVar(ivkdasvc.svcBusUri) + ");", -4);
        sw.AddLine("dareq.Execute();");




    }


    ivkdasvc.SetDesignView = function (v) {
        ivkdasvc.SucSequence.DesignView = v;
        ivkdasvc.FailSequence.DesignView = v;
        ivkdasvc.ParamsList.DesignView = v;
    }

    return ivkdasvc;


}
//
DBFX.Design.WFSerializers.InvokeDASvcSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("SvcUri", a, xe);
        DBFX.Serializer.DeSerialProperty("ParametersStr", a, xe);
        DBFX.Serializer.DeSerialProperty("SPName", a, xe);
        DBFX.Serializer.DeSerialProperty("DBName", a, xe);
        DBFX.Serializer.DeSerialProperty("StorageSvcUri", a, xe);
        DBFX.Serializer.DeSerialProperty("SvcBusUri", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        a.SucSequence.Height = "";

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }

        a.FailSequence.Height = "";

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("SvcUri", a.svcUri, xe);
        DBFX.Serializer.SerialProperty("ParametersStr", a.ParametersStr, xe);
        DBFX.Serializer.SerialProperty("SPName", a.SPName, xe);
        DBFX.Serializer.SerialProperty("DBName", a.DBName, xe);
        DBFX.Serializer.SerialProperty("StorageSvcUri", a.StorageSvcUri, xe);
        DBFX.Serializer.SerialProperty("SvcBusUri", a.svcBusUri, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }


    }



}
DBFX.Design.ActivityDesigners.InvokeDASvcDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/InvokeDASvcDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;



        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "云存储访问设置";
    return obdc;

}


//当前表单
DBFX.Design.WFActivities.ThisForm = function () {

    var actthisform = new DBFX.Design.WFActivities.Activity("ThisForm");
    actthisform.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ThisFormSerializer";
    actthisform.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ThisFormDesigner");
    actthisform.Text = "thisForm";
    actthisform.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ThisForm.png";
    actthisform.varName = "thisForm";
    Object.defineProperty(actthisform, "VarName", {

        get: function () {
            return actthisform.varName;
        },
        set: function (v) {
            actthisform.varName = v;
            actthisform.Text = v;
        }

    });
    actthisform.ToCode = function (sw) {

        sw.AddLine("var " + actthisform.varName + "=cmd.Sender.FormContext.Form;");

    }
    return actthisform;


}
DBFX.Design.WFSerializers.ThisFormSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
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
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);



    }



}
DBFX.Design.ActivityDesigners.ThisFormDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ThisFormDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "Thisform设置";
    return obdc;

}


//当前控件
DBFX.Design.WFActivities.ThisControl = function () {

    var actthiscontrol = new DBFX.Design.WFActivities.Activity("ThisControl");
    actthiscontrol.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ThisControlSerializer";
    actthiscontrol.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ThisControlDesigner");
    actthiscontrol.Text = "thisControl";
    actthiscontrol.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ThisControl.png";
    actthiscontrol.varName = "thisControl";
    Object.defineProperty(actthiscontrol, "VarName", {

        get: function () {
            return actthiscontrol.varName;
        },
        set: function (v) {
            actthiscontrol.varName = v;
            actthiscontrol.Text = v;
        }

    });
    actthiscontrol.ToCode = function (sw) {

        sw.AddLine("var " + actthiscontrol.varName + "=cmd.Sender;");

    }
    return actthiscontrol;


}
DBFX.Design.WFSerializers.ThisControlSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
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
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);



    }



}
DBFX.Design.ActivityDesigners.ThisControlDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ThisControlDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "Thisform设置";
    return obdc;

}

//当前表单上下文
DBFX.Design.WFActivities.FormContext = function () {

    var actformContext = new DBFX.Design.WFActivities.Activity("FormContext");
    actformContext.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.FormContextSerializer";
    actformContext.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.FormContextDesigner");
    actformContext.Text = "formContext";
    actformContext.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/FormContext.png";
    actformContext.varName = "formContext";
    Object.defineProperty(actformContext, "VarName", {

        get: function () {
            return actformContext.varName;
        },
        set: function (v) {
            actformContext.varName = v;
            actformContext.Text = v;
        }

    });
    actformContext.ToCode = function (sw) {

        sw.AddLine("var " + actformContext.varName + "=cmd.Sender.FormContext;");

    }
    return actformContext;


}
DBFX.Design.WFSerializers.FormContextSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
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
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);



    }



}
DBFX.Design.ActivityDesigners.FormContextDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ThisControlDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "Thisform设置";
    return obdc;

}

//当前表单命名控件集合
DBFX.Design.WFActivities.FormControls = function () {

    var actformControls = new DBFX.Design.WFActivities.Activity("FormControls");
    actformControls.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.FormControlsSerializer";
    actformControls.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.FormControlsDesigner");
    actformControls.Text = "formControls";
    actformControls.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/FormControls.png";
    actformControls.varName = "formControls";
    Object.defineProperty(actformControls, "VarName", {

        get: function () {
            return actformControls.varName;
        },
        set: function (v) {
            actformControls.varName = v;
            actformControls.Text = v;
        }

    });
    actformControls.ToCode = function (sw) {

        sw.AddLine("var "+actformControls.varName + "=cmd.Sender.FormContext.Form.FormControls;");

    }
    return actformControls;


}
DBFX.Design.WFSerializers.FormControlsSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
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
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);



    }



}
DBFX.Design.ActivityDesigners.FormControlsDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ThisControlDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "Thisform设置";
    return obdc;

}



//美团接口Activities

//获取美团AutnToken
DBFX.Design.WFActivities.MTGetAuthToken = function () {

    var authToken = new DBFX.Design.WFActivities.Activity("MTGetAuthToken");
    authToken.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.MTAuthTokenSerializer";
    authToken.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.MTAuthTokenDesigner");
    authToken.Text = "获取美团AuthToken";
    authToken.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/FormControls.png";
    authToken.HideECButton = false;
    //加入条件系列 真值表达式
    authToken.SucSequence = new DBFX.Design.WFActivities.Sequence(authToken.DesignView);
    authToken.SucSequence.Text = "调用成功"
    authToken.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    authToken.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    authToken.SucSequence.Display = "block";
    authToken.SucSequence.HideECButton = false;
    authToken.SucSequence.IsHasContextMenu = false;
    authToken.AddControl(authToken.SucSequence);
    authToken.SucSequence.Parent = authToken;

    //加入条件系列 真值表达式
    authToken.FailSequence = new DBFX.Design.WFActivities.Sequence(authToken.DesignView);
    authToken.FailSequence.Text = "调用失败"
    authToken.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    authToken.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    authToken.FailSequence.Display = "block";
    authToken.FailSequence.HideECButton = false;
    authToken.FailSequence.IsHasContextMenu = false;
    authToken.FailSequence.Parent = authToken;
    authToken.AddControl(authToken.FailSequence);

    authToken.shopId = "";
    Object.defineProperty(authToken, "ShopId", {

        get: function () {
            return authToken.shopId;
        },
        set: function (v) {
            authToken.shopId = v;
        }

    });
    authToken.ToCode = function (sw) {

        sw.AddLine("DBFX.ExInterfaces.GB.Service.QueryAuthTokenByHttp(function(resp){",4);
        sw.AddLine("if(resp.State==0){", 4);
        authToken.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("else{", 4);
        authToken.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("},"+ DBFX.Design.WFActivities.ParsingVar(authToken.shopId)+");", -4);

    }

    authToken.SetDesignView = function (v) {
        authToken.SucSequence.DesignView = v;
        authToken.FailSequence.DesignView = v;
    }

    return authToken;


}
DBFX.Design.WFSerializers.MTAuthTokenSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ShopId", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq =xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("ShopId", a.shopId, xe);

        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }

    }



}
DBFX.Design.ActivityDesigners.MTAuthTokenDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/MTAuthTokenDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "美团获取Token设置";
    return obdc;

}

//获取美团AutnToken
DBFX.Design.WFActivities.MTCouponQueryById = function () {

    var mtQueryById = new DBFX.Design.WFActivities.Activity("MTCouponQueryById");
    mtQueryById.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.MTCouponQueryByIdSerializer";
    mtQueryById.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.MTCouponQueryByIdDesigner");
    mtQueryById.Text = "按券码查询";
    mtQueryById.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/FormControls.png";
    mtQueryById.HideECButton = false;
    //加入条件系列 真值表达式
    mtQueryById.SucSequence = new DBFX.Design.WFActivities.Sequence(mtQueryById.DesignView);
    mtQueryById.SucSequence.Text = "调用成功"
    mtQueryById.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    mtQueryById.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    mtQueryById.SucSequence.Display = "block";
    mtQueryById.SucSequence.HideECButton = false;
    mtQueryById.SucSequence.IsHasContextMenu = false;
    mtQueryById.AddControl(mtQueryById.SucSequence);
    mtQueryById.SucSequence.Parent = mtQueryById;

    //加入条件系列 真值表达式
    mtQueryById.FailSequence = new DBFX.Design.WFActivities.Sequence(mtQueryById.DesignView);
    mtQueryById.FailSequence.Text = "调用失败"
    mtQueryById.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    mtQueryById.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    mtQueryById.FailSequence.Display = "block";
    mtQueryById.FailSequence.HideECButton = false;
    mtQueryById.FailSequence.IsHasContextMenu = false;
    mtQueryById.FailSequence.Parent = mtQueryById;
    mtQueryById.AddControl(mtQueryById.FailSequence);

    //func, appAuthToken, charset, timestamp, version, sign, couponCode

    mtQueryById.appAuthToken = "";
    Object.defineProperty(mtQueryById, "AppAuthToken", {

        get: function () {
            return mtQueryById.appAuthToken;
        },
        set: function (v) {
            mtQueryById.appAuthToken = v;
        }

    });

    mtQueryById.sign = "";
    Object.defineProperty(mtQueryById, "Sign", {

        get: function () {
            return mtQueryById.sign;
        },
        set: function (v) {
            mtQueryById.sign = v;
        }

    });

    mtQueryById.couponCode = "";
    Object.defineProperty(mtQueryById, "CouponCode", {

        get: function () {
            return mtQueryById.couponCode;
        },
        set: function (v) {
            mtQueryById.couponCode = v;
        }

    });

    mtQueryById.ToCode = function (sw) {

        var vp = DBFX.Design.WFActivities.ParsingVar;
        sw.AddLine("DBFX.ExInterfaces.MT.CouponQueryById(function(resp){", 4);
        sw.AddLine("if(resp.State==0){", 4);
        mtQueryById.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("else{", 4);
        mtQueryById.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("}," + vp(mtQueryById.appAuthToken) + "," + vp("utf-8") + "," + vp(new Date().getTime().toString()) + "," + vp("1") + "," + vp(mtQueryById.sign) + "," + vp(mtQueryById.couponCode) + ");", -4);

    }

    mtQueryById.SetDesignView = function (v) {
        mtQueryById.SucSequence.DesignView = v;
        mtQueryById.FailSequence.DesignView = v;
    }

    return mtQueryById;


}
DBFX.Design.WFSerializers.MTCouponQueryByIdSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppAuthToken", a, xe);
        DBFX.Serializer.DeSerialProperty("Sign", a, xe);
        DBFX.Serializer.DeSerialProperty("CouponCode", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppAuthToken", a.AppAuthToken, xe);
        DBFX.Serializer.SerialProperty("Sign", a.Sign, xe);
        DBFX.Serializer.SerialProperty("CouponCode", a.CouponCode, xe);

        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }
    }



}
DBFX.Design.ActivityDesigners.MTCouponQueryByIdDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/MTCouponQueryByIdDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "美团券查询[按券码]";
    return obdc;

}

//美团验券准备
DBFX.Design.WFActivities.MTCouponPrepare = function () {

    var mtCouponPrepare = new DBFX.Design.WFActivities.Activity("MTCouponPrepare");
    mtCouponPrepare.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.MTCouponPrepareSerializer";
    mtCouponPrepare.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.MTCouponPrepareDesigner");
    mtCouponPrepare.Text = "美团验券准备";
    mtCouponPrepare.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/FormControls.png";
    mtCouponPrepare.HideECButton = false;
    //加入条件系列 真值表达式
    mtCouponPrepare.SucSequence = new DBFX.Design.WFActivities.Sequence(mtCouponPrepare.DesignView);
    mtCouponPrepare.SucSequence.Text = "调用成功"
    mtCouponPrepare.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    mtCouponPrepare.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    mtCouponPrepare.SucSequence.Display = "block";
    mtCouponPrepare.SucSequence.HideECButton = false;
    mtCouponPrepare.SucSequence.IsHasContextMenu = false;
    mtCouponPrepare.AddControl(mtCouponPrepare.SucSequence);
    mtCouponPrepare.SucSequence.Parent = mtCouponPrepare;

    //加入条件系列 真值表达式
    mtCouponPrepare.FailSequence = new DBFX.Design.WFActivities.Sequence(mtCouponPrepare.DesignView);
    mtCouponPrepare.FailSequence.Text = "调用失败"
    mtCouponPrepare.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    mtCouponPrepare.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    mtCouponPrepare.FailSequence.Display = "block";
    mtCouponPrepare.FailSequence.HideECButton = false;
    mtCouponPrepare.FailSequence.IsHasContextMenu = false;
    mtCouponPrepare.FailSequence.Parent = mtCouponPrepare;
    mtCouponPrepare.AddControl(mtCouponPrepare.FailSequence);

    //func, appAuthToken, charset, timestamp, version, sign, couponCode

    mtCouponPrepare.appAuthToken = "";
    Object.defineProperty(mtCouponPrepare, "AppAuthToken", {

        get: function () {
            return mtCouponPrepare.appAuthToken;
        },
        set: function (v) {
            mtCouponPrepare.appAuthToken = v;
        }

    });

    mtCouponPrepare.sign = "";
    Object.defineProperty(mtCouponPrepare, "Sign", {

        get: function () {
            return mtCouponPrepare.sign;
        },
        set: function (v) {
            mtCouponPrepare.sign = v;
        }

    });

    mtCouponPrepare.type = "";
    Object.defineProperty(mtCouponPrepare, "Type", {

        get: function () {
            return mtCouponPrepare.type;
        },
        set: function (v) {
            mtCouponPrepare.type = v;
        }

    });

    mtCouponPrepare.typeName = "";
    Object.defineProperty(mtCouponPrepare, "TypeName", {

        get: function () {
            return mtCouponPrepare.typeName;
        },
        set: function (v) {
            mtCouponPrepare.typeName = v;
        }

    });

    mtCouponPrepare.couponCode = "";
    Object.defineProperty(mtCouponPrepare, "CouponCode", {

        get: function () {
            return mtCouponPrepare.couponCode;
        },
        set: function (v) {
            mtCouponPrepare.couponCode = v;
        }

    });

    mtCouponPrepare.ToCode = function (sw) {

        var vp = DBFX.Design.WFActivities.ParsingVar;
        sw.AddLine("DBFX.ExInterfaces.GB.CouponCheckPre(function(resp){", 4);
        sw.AddLine("if(resp.State==0){", 4);
        mtCouponPrepare.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("else{", 4);
        mtCouponPrepare.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("}," + vp(mtCouponPrepare.Type) + "," + vp(mtCouponPrepare.TypeName) + "," + vp(mtCouponPrepare.appAuthToken) + "," + vp("utf-8") + "," + vp(new Date().getTime().toString()) + "," + vp("1") + "," + vp(mtCouponPrepare.sign) + "," + vp(mtCouponPrepare.couponCode) + ");", -4);

    }

    mtCouponPrepare.SetDesignView = function (v) {
        mtCouponPrepare.SucSequence.DesignView = v;
        mtCouponPrepare.FailSequence.DesignView = v;
    }

    return mtCouponPrepare;


}
DBFX.Design.WFSerializers.MTCouponPrepareSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppAuthToken", a, xe);
        DBFX.Serializer.DeSerialProperty("Sign", a, xe);
        DBFX.Serializer.DeSerialProperty("CouponCode", a, xe);
        DBFX.Serializer.DeSerialProperty("Type", a, xe);
        DBFX.Serializer.DeSerialProperty("TypeName", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }

    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppAuthToken", a.AppAuthToken, xe);
        DBFX.Serializer.SerialProperty("Sign", a.Sign, xe);
        DBFX.Serializer.SerialProperty("CouponCode", a.CouponCode, xe);
        DBFX.Serializer.SerialProperty("Type", a.Type, xe);
        DBFX.Serializer.SerialProperty("TypeName", a.TypeName, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }
    }



}
DBFX.Design.ActivityDesigners.MTCouponPrepareDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/MTCouponPrepareDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "美团验券准备";
    return obdc;

}


//美团执行验券
DBFX.Design.WFActivities.MTCouponConsume = function () {

    var mtCouponConsume = new DBFX.Design.WFActivities.Activity("MTCouponConsume");
    mtCouponConsume.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.MTCouponConsumeSerializer";
    mtCouponConsume.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.MTCouponConsumeDesigner");
    mtCouponConsume.Text = "美团执行验券";
    mtCouponConsume.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/FormControls.png";
    mtCouponConsume.HideECButton = false;
    //加入条件系列 真值表达式
    mtCouponConsume.SucSequence = new DBFX.Design.WFActivities.Sequence(mtCouponConsume.DesignView);
    mtCouponConsume.SucSequence.Text = "调用成功"
    mtCouponConsume.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    mtCouponConsume.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    mtCouponConsume.SucSequence.Display = "block";
    mtCouponConsume.SucSequence.HideECButton = false;
    mtCouponConsume.SucSequence.IsHasContextMenu = false;
    mtCouponConsume.AddControl(mtCouponConsume.SucSequence);
    mtCouponConsume.SucSequence.Parent = mtCouponConsume;

    //加入条件系列 真值表达式
    mtCouponConsume.FailSequence = new DBFX.Design.WFActivities.Sequence(mtCouponConsume.DesignView);
    mtCouponConsume.FailSequence.Text = "调用失败"
    mtCouponConsume.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    mtCouponConsume.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    mtCouponConsume.FailSequence.Display = "block";
    mtCouponConsume.FailSequence.HideECButton = false;
    mtCouponConsume.FailSequence.IsHasContextMenu = false;
    mtCouponConsume.FailSequence.Parent = mtCouponConsume;
    mtCouponConsume.AddControl(mtCouponConsume.FailSequence);

    //
    mtCouponConsume.appAuthToken = "";
    Object.defineProperty(mtCouponConsume, "AppAuthToken", {

        get: function () {
            return mtCouponConsume.appAuthToken;
        },
        set: function (v) {
            mtCouponConsume.appAuthToken = v;
        }

    });

    mtCouponConsume.sign = "";
    Object.defineProperty(mtCouponConsume, "Sign", {

        get: function () {
            return mtCouponConsume.sign;
        },
        set: function (v) {
            mtCouponConsume.sign = v;
        }

    });

    mtCouponConsume.type = "";
    Object.defineProperty(mtCouponConsume, "Type", {

        get: function () {
            return mtCouponConsume.type;
        },
        set: function (v) {
            mtCouponConsume.type = v;
        }

    });

    mtCouponConsume.typeName = "";
    Object.defineProperty(mtCouponConsume, "TypeName", {

        get: function () {
            return mtCouponConsume.typeName;
        },
        set: function (v) {
            mtCouponConsume.typeName = v;
        }

    });

    mtCouponConsume.couponCode = "";
    Object.defineProperty(mtCouponConsume, "CouponCode", {

        get: function () {
            return mtCouponConsume.couponCode;
        },
        set: function (v) {
            mtCouponConsume.couponCode = v;
        }

    });

    mtCouponConsume.shopId = "";
    Object.defineProperty(mtCouponConsume, "ShopId", {

        get: function () {
            return mtCouponConsume.shopId;
        },
        set: function (v) {
            mtCouponConsume.shopId = v;
        }

    });

    mtCouponConsume.shopName = "";
    Object.defineProperty(mtCouponConsume, "ShopName", {

        get: function () {
            return mtCouponConsume.shopName;
        },
        set: function (v) {
            mtCouponConsume.shopName = v;
        }

    });

    mtCouponConsume.orderId = "";
    Object.defineProperty(mtCouponConsume, "OrderId", {

        get: function () {
            return mtCouponConsume.orderId;
        },
        set: function (v) {
            mtCouponConsume.orderId = v;
        }

    });


    mtCouponConsume.count = 0;
    Object.defineProperty(mtCouponConsume, "Count", {

        get: function () {
            return mtCouponConsume.count;
        },
        set: function (v) {
            mtCouponConsume.count = v;
        }

    });

    mtCouponConsume.respPre = "@{}";
    Object.defineProperty(mtCouponConsume, "RespPre", {

        get: function () {
            return mtCouponConsume.respPre;
        },
        set: function (v) {
            mtCouponConsume.respPre = v;
        }

    });

    //Type, TypeName, ShopId, ShopName, OrderId, appAuthToken, charset, timestamp, version, signKey, CouponCode, Count, respPre
    mtCouponConsume.ToCode = function (sw) {

        var vp = DBFX.Design.WFActivities.ParsingVar;
        sw.AddLine("DBFX.ExInterfaces.GB.CouponCheck(function(resp){", 4);
        sw.AddLine("if(resp.State==0){", 4);
        mtCouponConsume.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("else{", 4);
        mtCouponConsume.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("}," + vp(mtCouponConsume.Type) + "," + vp(mtCouponConsume.TypeName) + "," + vp(mtCouponConsume.shopId) + "," + vp(mtCouponConsume.shopName) + "," + vp(mtCouponConsume.orderId) + "," + vp(mtCouponConsume.appAuthToken) + "," + vp("utf-8") + "," + vp(new Date().getTime().toString()) + "," + vp("1") + "," + vp(mtCouponConsume.sign) + "," + vp(mtCouponConsume.couponCode) + "," + vp(mtCouponConsume.count) + "," + vp(mtCouponConsume.respPre) + ");", -4);

    }

    mtCouponConsume.SetDesignView = function (v) {
        mtCouponConsume.SucSequence.DesignView = v;
        mtCouponConsume.FailSequence.DesignView = v;
    }

    return mtCouponConsume;


}
DBFX.Design.WFSerializers.MTCouponConsumeSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppAuthToken", a, xe);
        DBFX.Serializer.DeSerialProperty("Sign", a, xe);
        DBFX.Serializer.DeSerialProperty("CouponCode", a, xe);
        DBFX.Serializer.DeSerialProperty("Type", a, xe);
        DBFX.Serializer.DeSerialProperty("TypeName", a, xe);
        DBFX.Serializer.DeSerialProperty("ShopId", a, xe);
        DBFX.Serializer.DeSerialProperty("ShopName", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);
        DBFX.Serializer.DeSerialProperty("Count", a, xe);
        DBFX.Serializer.DeSerialProperty("RespPre", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0]
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }

    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppAuthToken", a.AppAuthToken, xe);
        DBFX.Serializer.SerialProperty("Sign", a.Sign, xe);
        DBFX.Serializer.SerialProperty("CouponCode", a.CouponCode, xe);
        DBFX.Serializer.SerialProperty("Type", a.Type, xe);
        DBFX.Serializer.SerialProperty("TypeName", a.TypeName, xe);
        DBFX.Serializer.SerialProperty("ShopId", a.ShopId, xe);
        DBFX.Serializer.SerialProperty("ShopName", a.ShopName, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        DBFX.Serializer.SerialProperty("Count", a.Count, xe);
        DBFX.Serializer.SerialProperty("RespPre", a.RespPre, xe);

        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }
    }



}
DBFX.Design.ActivityDesigners.MTCouponConsumeDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/MTCouponConsumeDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "美团验券准备";
    return obdc;

}

//美团取消验券
DBFX.Design.WFActivities.MTCouponCancel = function () {

    var mtCouponCancel = new DBFX.Design.WFActivities.Activity("MTCouponCancel");
    mtCouponCancel.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.MTCouponCancelSerializer";
    mtCouponCancel.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.MTCouponCancelDesigner");
    mtCouponCancel.Text = "按券码查询";
    mtCouponCancel.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/FormControls.png";
    mtCouponCancel.HideECButton = false;
    //加入条件系列 真值表达式
    mtCouponCancel.SucSequence = new DBFX.Design.WFActivities.Sequence(mtCouponCancel.DesignView);
    mtCouponCancel.SucSequence.Text = "调用成功"
    mtCouponCancel.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchtrue.png";
    mtCouponCancel.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    mtCouponCancel.SucSequence.Display = "block";
    mtCouponCancel.SucSequence.HideECButton = false;
    mtCouponCancel.SucSequence.IsHasContextMenu = false;
    mtCouponCancel.AddControl(mtCouponCancel.SucSequence);
    mtCouponCancel.SucSequence.Parent = mtCouponCancel;

    //加入条件系列 真值表达式
    mtCouponCancel.FailSequence = new DBFX.Design.WFActivities.Sequence(mtCouponCancel.DesignView);
    mtCouponCancel.FailSequence.Text = "调用失败"
    mtCouponCancel.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    mtCouponCancel.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    mtCouponCancel.FailSequence.Display = "block";
    mtCouponCancel.FailSequence.HideECButton = false;
    mtCouponCancel.FailSequence.IsHasContextMenu = false;
    mtCouponCancel.FailSequence.Parent = mtCouponCancel;
    mtCouponCancel.AddControl(mtCouponCancel.FailSequence);

    //func, appAuthToken, charset, timestamp, version, sign, couponCode

    mtCouponCancel.appAuthToken = "";
    Object.defineProperty(mtCouponCancel, "AppAuthToken", {

        get: function () {
            return mtCouponCancel.appAuthToken;
        },
        set: function (v) {
            mtCouponCancel.appAuthToken = v;
        }

    });

    mtCouponCancel.sign = "";
    Object.defineProperty(mtCouponCancel, "Sign", {

        get: function () {
            return mtCouponCancel.sign;
        },
        set: function (v) {
            mtCouponCancel.sign = v;
        }

    });

    mtCouponCancel.couponCode = "";
    Object.defineProperty(mtCouponCancel, "CouponCode", {

        get: function () {
            return mtCouponCancel.couponCode;
        },
        set: function (v) {
            mtCouponCancel.couponCode = v;
        }

    });

    mtCouponCancel.type = "";
    Object.defineProperty(mtCouponCancel, "Type", {

        get: function () {
            return mtCouponCancel.type;
        },
        set: function (v) {
            mtCouponCancel.type = v;
        }

    });

    mtCouponCancel.typeName = "";
    Object.defineProperty(mtCouponCancel, "TypeName", {

        get: function () {
            return mtCouponCancel.typeName;
        },
        set: function (v) {
            mtCouponCancel.typeName = v;
        }

    });


    mtCouponCancel.shopId = "";
    Object.defineProperty(mtCouponCancel, "ShopId", {

        get: function () {
            return mtCouponCancel.shopId;
        },
        set: function (v) {
            mtCouponCancel.shopId = v;
        }

    });

    mtCouponCancel.shopName = "";
    Object.defineProperty(mtCouponCancel, "ShopName", {

        get: function () {
            return mtCouponCancel.shopName;
        },
        set: function (v) {
            mtCouponCancel.shopName = v;
        }

    });

    mtCouponCancel.orderId = "";
    Object.defineProperty(mtCouponCancel, "OrderId", {

        get: function () {
            return mtCouponCancel.orderId;
        },
        set: function (v) {
            mtCouponCancel.orderId = v;
        }

    });

    //func, Type, TypeName, ShopId, ShopName, eOrderId, appAuthToken, charset, timestamp, version, signKey, CouponCode, T
    mtCouponCancel.ToCode = function (sw) {

        var vp = DBFX.Design.WFActivities.ParsingVar;
        sw.AddLine("DBFX.ExInterfaces.GB.CouponCancel(function(resp){", 4);
        sw.AddLine("if(resp.State==0){", 4);
        mtCouponCancel.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("else{", 4);
        mtCouponCancel.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("}," + vp(mtCouponCancel.Type) + "," + vp(mtCouponCancel.TypeName) + "," + vp(mtCouponCancel.shopId) + "," + vp(mtCouponCancel.shopName) + "," + vp(mtCouponCancel.orderId) + "," + vp(mtCouponCancel.appAuthToken) + "," + vp("utf-8") + "," + vp(new Date().getTime().toString()) + "," + vp("1") + "," + vp(mtCouponCancel.sign) + "," + vp(mtCouponCancel.couponCode) + ",1);", -4);

    }

    mtCouponCancel.SetDesignView = function (v) {
        mtCouponCancel.SucSequence.DesignView = v;
        mtCouponCancel.FailSequence.DesignView = v;
    }

    return mtCouponCancel;


}
DBFX.Design.WFSerializers.MTCouponCancelSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("AppAuthToken", a, xe);
        DBFX.Serializer.DeSerialProperty("Sign", a, xe);
        DBFX.Serializer.DeSerialProperty("CouponCode", a, xe);
        DBFX.Serializer.DeSerialProperty("Type", a, xe);
        DBFX.Serializer.DeSerialProperty("TypeName", a, xe);
        DBFX.Serializer.DeSerialProperty("ShopId", a, xe);
        DBFX.Serializer.DeSerialProperty("ShopName", a, xe);
        DBFX.Serializer.DeSerialProperty("OrderId", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0]
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("AppAuthToken", a.AppAuthToken, xe);
        DBFX.Serializer.SerialProperty("Sign", a.Sign, xe);
        DBFX.Serializer.SerialProperty("CouponCode", a.CouponCode, xe);
        DBFX.Serializer.SerialProperty("Type", a.Type, xe);
        DBFX.Serializer.SerialProperty("TypeName", a.TypeName, xe);
        DBFX.Serializer.SerialProperty("ShopId", a.ShopId, xe);
        DBFX.Serializer.SerialProperty("ShopName", a.ShopName, xe);
        DBFX.Serializer.SerialProperty("OrderId", a.OrderId, xe);
        
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {

            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }
    }



}
DBFX.Design.ActivityDesigners.MTCouponCancelDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/MTCouponCancelDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "美团验券准备";
    return obdc;

}


//发送系统消息提示
DBFX.Design.WFActivities.showNotification = function () {

    var snotice = new DBFX.Design.WFActivities.Activity("ShowNotification");
    snotice.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ShowNotificationSerializer";
    snotice.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ShowNotificationDesigner");
    snotice.Text = "ShowNotification";
    snotice.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ShowNotification.png";
    snotice.title = "";
    Object.defineProperty(snotice, "Title", {

        get: function () {
            return snotice.title;
        },
        set: function (v) {
            snotice.title = v;
            snotice.Text = v;
        }

    });
    snotice.content = "";

    snotice.url = "";
    Object.defineProperty(snotice, "Url", {

        get: function () {
            return snotice.url;
        },
        set: function (v) {
            snotice.url = v;
        }

    });


    snotice.id = "";
    Object.defineProperty(snotice, "Id", {

        get: function () {
            return snotice.id;
        },
        set: function (v) {
            snotice.id = v;
        }

    });

    snotice.ToCode = function (sw) {
        var vp = DBFX.Design.WFActivities.ParsingVar;
        if (snotice.url == "")
        {
            sw.AddLine("Dbsoft.System.Notification.showNotification("+vp(snotice.id)+","+vp(snotice.title)+","+vp(snotice.content)+");");
        }
        else {

            sw.AddLine("Dbsoft.System.Notification.showNotification(" + vp(snotice.id) + "," + vp(snotice.title) + "," + vp(snotice.content) + ","+vp(snotice.url)+");");


        }
    }
    return snotice;


}
DBFX.Design.WFSerializers.ShowNotificationSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("Id", a.Id, xe);
        DBFX.Serializer.SerialProperty("Title", a.Title, xe);
        DBFX.Serializer.SerialProperty("Content", a.Content, xe);
        DBFX.Serializer.SerialProperty("Url", a.Url, xe);
    }



}
DBFX.Design.ActivityDesigners.ShowNotificationDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ShowNotification.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "通知发送设置";
    return obdc;

}

//拨打电话
DBFX.Design.WFActivities.CallPhone = function () {

    var cphone = new DBFX.Design.WFActivities.Activity("CallPhone");
    cphone.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.CallPhoneSerializer";
    cphone.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.CallPhoneDesigner");
    cphone.Text = "拨打电话";
    cphone.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ThisControl.png";
    cphone.phone = "";
    Object.defineProperty(cphone, "PhoneNumber", {

        get: function () {
            return cphone.phone;
        },
        set: function (v) {
            cphone.phone = v;
            cphone.Text = v;
        }

    });


    cphone.ToCode = function (sw) {
        var vp = DBFX.Design.WFActivities.ParsingVar;

        sw.AddLine("Dbsoft.System.call(" + vp(cphone.phone)+");");



    }
    return cphone;


}
DBFX.Design.WFSerializers.CallPhoneSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);


    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("PhoneNumber", a.PhoneNumber, xe);
    }



}
DBFX.Design.ActivityDesigners.SendNotificationDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/CallPhoneDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "拨打电话设置";
    return obdc;

}

//扫描二维码
DBFX.Design.WFActivities.ScanBarCode = function () {

    var sbcode = new DBFX.Design.WFActivities.Activity("ScanBarCode");
    sbcode.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ScanBarCodeSerializer";
    sbcode.Text = "扫描条形码";
    sbcode.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/scanbarcode.png";
    sbcode.Sequence = new DBFX.Design.WFActivities.Sequence(sbcode.DesignView);
    sbcode.Sequence.HideHeaderBar = true;
    sbcode.Sequence.Margin = "0px";
    sbcode.Sequence.BorderWidth = "0px";
    sbcode.AddControl(sbcode.Sequence);
    sbcode.HideECButton = false;
    sbcode.Sequence.Parent = sbcode;

    sbcode.ToCode = function (sw) {

        sw.AddLine("DBFX.Dbsoft.System.Advance.QR.scan(function(barcode)");
        sw.AddLine("{", 4);
        sbcode.Sequence.ToCode(sw);
        sw.AddLine("});", -4);


    }

    sbcode.SetDesignView = function (v) {
        sbcode.Sequence.DesignView = v;
    }

    return sbcode;


}
DBFX.Design.WFSerializers.ScanBarCodeSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);
        var xseq = xe.childNodes[0]
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.Sequence, xseq, ns);
        }


    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);

        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);

        if (s != null) {

            //系列化Sequence
            var xseq = xdoc.createElement("Sequence");
            xe.appendChild(xseq);
            a.Sequence.Namespace = a.Namespace;
            a.Sequence.NSSN = a.NSSN;
            s.Serialize(a.Sequence, xseq, ns);
        }

    }



}


//发票接口调用
DBFX.Design.WFActivities.InvoiceInterface = function () {

    var sbcode = new DBFX.Design.WFActivities.Activity("InvoiceInterface");
    sbcode.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.InvoiceInterfaceSerializer";
    sbcode.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.InvoiceInterfaceDesigner");
    sbcode.Text = "发票接口";
    sbcode.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/InvoiceInterface.png";
    sbcode.Sequence = new DBFX.Design.WFActivities.Sequence(sbcode.DesignView);
    sbcode.Sequence.HideHeaderBar = true;
    sbcode.Sequence.Margin = "0px";
    sbcode.Sequence.BorderWidth = "0px";
    sbcode.AddControl(sbcode.Sequence);
    sbcode.HideECButton = false;
    sbcode.Sequence.Parent = sbcode;
    sbcode.Envelope = "";
    sbcode.Method = "1";

    sbcode.ToCode = function (sw) {

        var envelop = sbcode.Envelope;
        if(envelop.indexOf("@")==0)
            envelop=sbcode.Envelope.replace("@", "");

        if(sbcode.Method=="1")
            sw.AddLine("DBFX.ExInterfaces.Invoice.CreateInvoice(" + envelop + ",function(resp)");
        
        if (sbcode.Method == "2")
            sw.AddLine("DBFX.ExInterfaces.Invoice.CreateInvoice(" + envelop + ",function(resp)");

        if (sbcode.Method == "3")
            sw.AddLine("DBFX.ExInterfaces.Invoice.CreateInvoice(" + envelop + ",function(resp)");

        sw.AddLine("{", 4);
        sbcode.Sequence.ToCode(sw);
        sw.AddLine("});", -4);


    }

    sbcode.SetDesignView = function (v) {
        sbcode.Sequence.DesignView = v;
    }

    return sbcode;


}
DBFX.Design.WFSerializers.InvoiceInterfaceSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("Method", a, xe);
        DBFX.Serializer.DeSerialProperty("Envelope", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);
        var xseq = xe.childNodes[0]
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.Sequence, xseq, ns);
        }


    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("Method", a.Method, xe);
        DBFX.Serializer.SerialProperty("Envelope", a.Envelope, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);

        if (s != null) {

            //系列化Sequence
            var xseq = xdoc.createElement("Sequence");
            xe.appendChild(xseq);
            a.Sequence.Namespace = a.Namespace;
            a.Sequence.NSSN = a.NSSN;
            s.Serialize(a.Sequence, xseq, ns);
        }

    }



}
DBFX.Design.ActivityDesigners.InvoiceInterfaceDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/InvoiceInterfaceDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "发票接口参数设置";
    return obdc;

}


//打印数据
DBFX.Design.WFActivities.PrintData = function () {

    var printData = new DBFX.Design.WFActivities.Activity("PrintData");
    printData.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.PrintDataSerializer";
    printData.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.PrintDataDesigner");
    printData.Text = "打印数据";
    printData.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/PrintData.png";
    printData.Sequence = new DBFX.Design.WFActivities.Sequence(printData.DesignView);
    printData.Sequence.HideHeaderBar = true;
    printData.Sequence.Margin = "0px";
    printData.Sequence.BorderWidth = "0px";
    printData.AddControl(printData.Sequence);
    printData.HideECButton = false;
    printData.Sequence.Parent = printData;

    //编译代码
    printData.ToCode = function (sw) {

        //判断类型
        if (printData.printMode == 0) //蓝牙打印机
        {
            //初始化打印机
            sw.AddLine("DBFX.Dbsoft.Printer.init(function(retcode)");
            sw.AddLine("{", 4);
            sw.AddLine("if(retcode==10){", 4);
            sw.AddLine("DBFX.Dbsoft.Printer.print(function(retcode){}," + DBFX.Design.WFActivities.ParsingVar(printData.data) + ");}", -4);
            sw.AddLine("else{", 4);
            sw.AddLine("DBFX.Dbsoft.Printer.setPrinter(function(retcode){});}",-4);
            sw.AddLine("});", -4);
        }
        else {

            sw.AddLine("var doc=Dbsoft.Printer.CreatePrintDocument();");
            sw.AddLine("doc.WriteHtmlData(" + DBFX.Design.WFActivities.ParsingVar(printData.data) + ");");
            if (printData.printMode == 1) {
                sw.AddLine("doc.Print();");
            }

            if (printData.printMode ==2) {
                sw.AddLine("doc.ShowDialog();");
            }

            if (printData.printMode == 2) {
                sw.AddLine("doc.ShowPrintPreview();");
            }

        }
        

    }

    //数据
    Object.defineProperty(printData, "Data", {
        get: function () {

            return printData.data;

        },
        set: function (v) {

            printData.data = v;
        }
    });

    //打印机名称
    Object.defineProperty(printData, "PrinterName", {
        get: function () {

            return printData.printerName;

        },
        set: function (v) {

            printData.printerName = v;
        }
    });

    rintData.printMode = 0;
    //打印模式 0-蓝牙打印 1-PC后台打印 2-显示打印窗口 3-显示预览窗口
    Object.defineProperty(printData, "PrintMode", {
        get: function () {

            return printData.printMode;

        },
        set: function (v) {

            printData.printMode = v;
        }
    });


    printData.SetDesignView = function (v) {
        printData.Sequence.DesignView = v;
    }

    return printData;


}
DBFX.Design.WFSerializers.printDataSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("Data", a, xe);
        DBFX.Serializer.DeSerialProperty("PrintMode", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("PrinterName", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);
        var xseq = xe.childNodes[0]
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.Sequence, xseq, ns);
        }


    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("Data", a.Data, xe);
        DBFX.Serializer.SerialProperty("PrintMode", a.PrintMode, xe);
        DBFX.Serializer.SerialProperty("PrinterName", a.PrinterName, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);

        if (s != null) {

            //系列化Sequence
            var xseq = xdoc.createElement("Sequence");
            xe.appendChild(xseq);
            a.Sequence.Namespace = a.Namespace;
            a.Sequence.NSSN = a.NSSN;
            s.Serialize(a.Sequence, xseq, ns);
        }

    }



}
DBFX.Design.ActivityDesigners.PrintDataDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/PrintDataDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "打印设置";
    return obdc;

}

//图片选择
DBFX.Design.WFActivities.ImagePicker = function () {

    var imgpicker = new DBFX.Design.WFActivities.Activity("ImagePicker");
    imgpicker.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ImagePickerSerializer";
    imgpicker.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ImagePickerDesigner");
    imgpicker.Text = "图片选择";
    imgpicker.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ImagePicker.png";
    imgpicker.Sequence = new DBFX.Design.WFActivities.Sequence(imgpicker.DesignView);
    imgpicker.Sequence.HideHeaderBar = true;
    imgpicker.Sequence.Margin = "0px";
    imgpicker.Sequence.BorderWidth = "0px";
    imgpicker.AddControl(imgpicker.Sequence);
    imgpicker.HideECButton = false;
    imgpicker.Sequence.Parent = imgpicker;

    imgpicker.ToCode = function (sw) {

        sw.AddLine("DBFX.Web.Controls.PickingImage("+DBFX.Design.WFActivities.ParsingVar(imgpicker.uploadUrl)+",function(resp)");
        sw.AddLine("{", 4);
        imgpicker.Sequence.ToCode(sw);
        sw.AddLine("}," + imgpicker.pickerMode +","+imgpicker.imageWidth.replace("px","")+","+imgpicker.imageHeight.replace("px","")+","+imgpicker.cropperMode+","+imgpicker.FixAspectRatio+ ");", -4);

    }

    //上传路径
    Object.defineProperty(imgpicker, "UploadUrl", {

        get: function () {

            return imgpicker.uploadUrl;

        },
        set: function (v) {

            imgpicker.uploadUrl = v;
        }

    });

    imgpicker.pickerMode = 2;

    //选择模式
    Object.defineProperty(imgpicker, "PickerMode", {

        get: function () {

            return imgpicker.pickerMode;

        },
        set: function (v) {

            imgpicker.pickerMode = v;
        }

    });

    imgpicker.imageWidth ="0px";
    Object.defineProperty(imgpicker, "ImageWidth", {

        get: function () {

            return imgpicker.imageWidth;

        },
        set: function (v) {

            imgpicker.imageWidth = v;
        }

    });

    imgpicker.imageHeight = "0px";
    Object.defineProperty(imgpicker, "ImageHeight", {

        get: function () {

            return imgpicker.imageHeight;

        },
        set: function (v) {

            imgpicker.imageHeight = v;
        }

    });

    //裁剪模式
    imgpicker.cropperMode = "0";
    Object.defineProperty(imgpicker, "CropperMode", {

        get: function () {

            return imgpicker.cropperMode;

        },
        set: function (v) {

            imgpicker.cropperMode = v;
        }

    });

    //裁剪比例
    imgpicker.fixAspectRatio = "0";
    Object.defineProperty(imgpicker, "FixAspectRatio", {

        get: function () {

            return imgpicker.fixAspectRatio;

        },
        set: function (v) {

            imgpicker.fixAspectRatio = v;
        }

    });


    imgpicker.SetDesignView = function (v) {
        imgpicker.Sequence.DesignView = v;
    }

    return imgpicker;


}
DBFX.Design.WFSerializers.ImagePickerSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("UploadUrl", a, xe);
        DBFX.Serializer.DeSerialProperty("PickerMode", a, xe);
        DBFX.Serializer.DeSerialProperty("ImageHeight", a, xe);
        DBFX.Serializer.DeSerialProperty("ImageWidth", a, xe);
        DBFX.Serializer.DeSerialProperty("CropperMode", a, xe);
        DBFX.Serializer.DeSerialProperty("FixAspectRatio", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);
        var xseq = xe.childNodes[0]
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.Sequence, xseq, ns);
        }


    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("UploadUrl", a.UploadUrl, xe);
        DBFX.Serializer.SerialProperty("PickerMode", a.PickerMode, xe);
        DBFX.Serializer.SerialProperty("ImageHeight", a.imageHeight, xe);
        DBFX.Serializer.SerialProperty("ImageWidth", a.ImageWidth, xe);
        DBFX.Serializer.SerialProperty("CropperMode", a.cropperMode, xe);
        DBFX.Serializer.SerialProperty("FixAspectRatio", a.fixAspectRatio, xe);



        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);

        if (s != null) {

            //系列化Sequence
            var xseq = xdoc.createElement("Sequence");
            xe.appendChild(xseq);
            a.Sequence.Namespace = a.Namespace;
            a.Sequence.NSSN = a.NSSN;
            s.Serialize(a.Sequence, xseq, ns);
        }

    }



}
DBFX.Design.ActivityDesigners.ImagePickerDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ImagePickerDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "图片选择";
    return obdc;

}


//微信分享
DBFX.Design.WFActivities.WXShare = function () {

    var wxshare = new DBFX.Design.WFActivities.Activity("WXShare");
    wxshare.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.WXShareSerializer";
    wxshare.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.WXShareDesigner");
    wxshare.Text = "微信分享";
    wxshare.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/wxshare.png";
    wxshare.ToCode = function (sw) {

        sw.AddLine("DBFX.Dbsoft.Network.UShare(" + DBFX.Design.WFActivities.ParsingVar(wxshare.title) + "," + DBFX.Design.WFActivities.ParsingVar(wxshare.description) + "," + DBFX.Design.WFActivities.ParsingVar(wxshare.thumbnail)+","+DBFX.Design.WFActivities.ParsingVar(wxshare.pageUrl)+");");

    }

    //标题
    Object.defineProperty(wxshare, "Title", {

        get: function () {

            return wxshare.title;

        },
        set: function (v) {

            wxshare.title = v;
        }

    });

    //描述
    Object.defineProperty(wxshare, "Description", {

        get: function () {

            return wxshare.description;

        },
        set: function (v) {

            wxshare.description = v;
        }

    });

    //缩略图Url
    Object.defineProperty(wxshare, "Thumbnail", {

        get: function () {

            return wxshare.thumbnail;

        },
        set: function (v) {

            wxshare.thumbnail = v;
        }

    });

    //Url
    Object.defineProperty(wxshare, "PageUrl", {

        get: function () {

            return wxshare.pageUrl;

        },
        set: function (v) {

            wxshare.pageUrl = v;
        }

    });


    wxshare.SetDesignView = function (v) {
        
    }

    return wxshare;


}
DBFX.Design.WFSerializers.WXShareSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("Title", a, xe);
        DBFX.Serializer.DeSerialProperty("Description", a, xe);
        DBFX.Serializer.DeSerialProperty("Thumbnail", a, xe);
        DBFX.Serializer.DeSerialProperty("PageUrl", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("Title", a.Title, xe);
        DBFX.Serializer.SerialProperty("Description", a.Description, xe);
        DBFX.Serializer.SerialProperty("Thumbnail", a.thumbnail, xe);
        DBFX.Serializer.SerialProperty("PageUrl", a.PageUrl, xe);
    }



}
DBFX.Design.ActivityDesigners.WXShareDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/WXShareDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "分享设置";
    return obdc;

}


//消息推送
DBFX.Design.WFActivities.PushNotification = function () {

    var pushmsg = new DBFX.Design.WFActivities.Activity("PushNotification");
    pushmsg.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.PushNotificationSerializer";
    pushmsg.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.PushNotificationDesigner");
    pushmsg.Text = "消息推送";
    pushmsg.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/PushNotification.png";
    pushmsg.HideECButton = false;

    pushmsg.ToCode = function (sw) {

        sw.AddLine("var _msg={};");
        sw.AddLine("_msg.title=" + DBFX.Design.WFActivities.ParsingVar(pushmsg.title));
        sw.AddLine("_msg.body=" + DBFX.Design.WFActivities.ParsingVar(pushmsg.msgBody));
        sw.AddLine("_msg.m=" + DBFX.Design.WFActivities.ParsingVar(pushmsg.mode));
        sw.AddLine("_msg.f=" + DBFX.Design.WFActivities.ParsingVar(pushmsg.flag));
        sw.AddLine("_msg.msgid=" + DBFX.Design.WFActivities.ParsingVar(pushmsg.msgId));
        sw.AddLine("_msg.appid=" + DBFX.Design.WFActivities.ParsingVar(pushmsg.appId));
        sw.AddLine("_msg.ud="+DBFX.Design.WFActivities.ParsingVar(pushmsg.userData));
        sw.AddLine("DBFX.Notifications.PushMessage(" + DBFX.Design.WFActivities.ParsingVar(pushmsg.uid) + ",_msg)");

    }

    //接收用户Id
    pushmsg.uid = "";
    Object.defineProperty(pushmsg, "UId", {

        get: function () {

            return pushmsg.uid;

        },
        set: function (v) {

            pushmsg.uid = v;
        }

    });

    //系统西标题
    pushmsg.title = "";
    Object.defineProperty(pushmsg, "Title", {

        get: function () {

            return pushmsg.title;

        },
        set: function (v) {

            pushmsg.title = v;
        }

    });

    //消息内容
    pushmsg.msgBody = "";
    Object.defineProperty(pushmsg, "MsgBody", {

        get: function () {

            return pushmsg.msgBody;

        },
        set: function (v) {

            pushmsg.msgBody = v;
        }

    });

    //消息编号
    pushmsg.msgId = "";
    Object.defineProperty(pushmsg, "MsgId", {

        get: function () {

            return pushmsg.msgId;

        },
        set: function (v) {

            pushmsg.msgId = v;
        }

    });

    //消息编号
    pushmsg.appId = "";
    Object.defineProperty(pushmsg, "AppId", {

        get: function () {

            return pushmsg.appId;

        },
        set: function (v) {

            pushmsg.appId = v;
        }

    });


    //消息编号
    pushmsg.mode = "0";
    Object.defineProperty(pushmsg, "Mode", {

        get: function () {

            return pushmsg.mode;

        },
        set: function (v) {

            pushmsg.mode = v;
        }

    });

    //消息编号
    pushmsg.flag = "0";
    Object.defineProperty(pushmsg, "Flag", {

        get: function () {

            return pushmsg.flag;

        },
        set: function (v) {

            pushmsg.flag = v;
        }

    });

    //用户数据
    pushmsg.userData = "{}";
    Object.defineProperty(pushmsg, "UserData", {

        get: function () {

            return pushmsg.userData;

        },
        set: function (v) {

            pushmsg.userData = v;
        }

    });



    return pushmsg;


}
DBFX.Design.WFSerializers.PushNotificationSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("UId", a, xe);
        DBFX.Serializer.DeSerialProperty("Title", a, xe);
        DBFX.Serializer.DeSerialProperty("MsgBody", a, xe);
        DBFX.Serializer.DeSerialProperty("AppId", a, xe);
        DBFX.Serializer.DeSerialProperty("MsgId", a, xe);
        DBFX.Serializer.DeSerialProperty("Mode", a, xe);
        DBFX.Serializer.DeSerialProperty("Flag", a, xe);
        DBFX.Serializer.DeSerialProperty("UserData", a, xe);


    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("UId", a.uid, xe);
        DBFX.Serializer.SerialProperty("Title", a.title, xe);
        DBFX.Serializer.SerialProperty("MsgBody", a.msgBody, xe);
        DBFX.Serializer.SerialProperty("AppId", a.appId, xe);
        DBFX.Serializer.SerialProperty("MsgId", a.msgId, xe);
        DBFX.Serializer.SerialProperty("Mode", a.mode, xe);
        DBFX.Serializer.SerialProperty("Flag", a.Flag, xe);
        DBFX.Serializer.SerialProperty("UserData", a.userData, xe);
  
    }



}
DBFX.Design.ActivityDesigners.PushNotificationDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/PushNotificationDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "消息推送";
    return obdc;

}


//信息提示
DBFX.Design.WFActivities.AlertBox = function () {
    var ab = new DBFX.Design.WFActivities.Activity("AlertBox");
    ab.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.AlertBoxSerializer";
    ab.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.AlertBoxDesigner");
    ab.Text = "信息提示框";
    ab.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/AlertBox.png";
    ab.ToCode = function (sw) {

        sw.AddLine("DBFX.Web.Forms.AlertBox.Show(" + DBFX.Design.WFActivities.ParsingVar(ab.message) + "," + DBFX.Design.WFActivities.ParsingVar(ab.abImageUrl) + "," + DBFX.Design.WFActivities.ParsingVar(ab.showTime) + ");");

    }

    //提示信息
    Object.defineProperty(ab, "Message", {

        get: function () {
            return ab.message;
        },
        set: function (v) {

            ab.message = v;
        }

    });

    //展示图片
    ab.abImageUrl = "";
    Object.defineProperty(ab, "ABImageUrl", {

        get: function () {

            return ab.abImageUrl;

        },
        set: function (v) {

            ab.abImageUrl = v;
        }
    });

    //展示时间(ms)
    ab.showTime = 3000;
    Object.defineProperty(ab, "ShowTime", {

        get: function () {

            return ab.showTime;

        },
        set: function (v) {

            ab.showTime = v;
        }
    });
    return ab;

}

DBFX.Design.WFSerializers.AlertBoxSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("Message", a, xe);
        DBFX.Serializer.DeSerialProperty("ABImageUrl", a, xe);
        DBFX.Serializer.DeSerialProperty("ShowTime", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("Message", a.Message, xe);
        DBFX.Serializer.SerialProperty("ABImageUrl", a.ABImageUrl, xe);
        DBFX.Serializer.SerialProperty("ShowTime", a.ShowTime, xe);

    }

}

DBFX.Design.ActivityDesigners.AlertBoxDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/AlertBoxDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }


    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "信息提示框设置";
    return obdc;

}


//图像识别
DBFX.Design.WFActivities.OCR = function () {

    var OCR = new DBFX.Design.WFActivities.Activity("OCR");
    OCR.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.OCRSerializer";
    OCR.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.OCRDesigner");
    OCR.Text = "文字识别";
    OCR.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/OCR.png";
    OCR.HideECButton = false;

    //回调方法
    OCR.SucSequence = new DBFX.Design.WFActivities.Sequence(OCR.DesignView);
    OCR.SucSequence.Text = "识别成功";
    OCR.SucSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/OCR.png";
    OCR.SucSequence.HeaderPanel.BackgroundColor = "rgba(0,255,0,0.1)";
    OCR.SucSequence.Display = "block";
    OCR.SucSequence.HideECButton = true;
    OCR.SucSequence.IsHasContextMenu = false;
    OCR.AddControl(OCR.SucSequence);
    OCR.SucSequence.Parent = OCR;

    //加入条件系列 真值表达式
    OCR.FailSequence = new DBFX.Design.WFActivities.Sequence(OCR.DesignView);
    OCR.FailSequence.Text = "识别失败";
    OCR.FailSequence.Image.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ifbranchfalse.png";
    OCR.FailSequence.HeaderPanel.BackgroundColor = "rgba(255,0,0,0.1)";
    OCR.FailSequence.Display = "block";
    OCR.FailSequence.HideECButton = false;
    OCR.FailSequence.IsHasContextMenu = false;
    OCR.FailSequence.Parent = OCR;
    OCR.AddControl(OCR.FailSequence);

    OCR.SetDesignView = function (v) {
        OCR.SucSequence.DesignView = v;
        OCR.FailSequence.DesignView = v;
    }

    Object.defineProperty(OCR, "ImgUrl", {
        get: function () {
            return OCR.imgUrl;
        },
        set: function (v) {
            OCR.imgUrl = v;
        }
    });

    Object.defineProperty(OCR, "ImgType", {
        get: function () {
            return OCR.imgType;
        },
        set: function (v) {
            OCR.imgType = v;
        }
    });

    OCR.ToCode = function (sw) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, payCode,orderDesc,totalFee, cb
        sw.AddLine("DBFX.Web.BaiduAI.OCR.Recognize(" + DBFX.Design.WFActivities.ParsingVar(OCR.ImgUrl) + "," + DBFX.Design.WFActivities.ParsingVar(OCR.ImgType) + ",function(ocrResult)");
        sw.AddLine("{", 4);
        sw.AddLine("if(ocrResult.State==0)");
        sw.AddLine("{", 4);
        OCR.SucSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("else{", 4);
        OCR.FailSequence.ToCode(sw);
        sw.AddLine("}", -4);
        sw.AddLine("});", -4);

    }

    return OCR;
}
DBFX.Design.WFSerializers.OCRSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ImgUrl", a, xe);
        DBFX.Serializer.DeSerialProperty("ImgType", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);
        var xseq = xe.childNodes[0];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.SucSequence, xseq, ns);
        }

        var xseq = xe.childNodes[1];
        if (s != undefined && xseq != null) {
            s.DeSerialize(a.FailSequence, xseq, ns);
        }
    }

    //系列化
    this.Serialize = function (a, xe, ns) {

        //appId, mchId, subAppId, subMchid, signkey, orderId, payCode,orderDesc,totalFee

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("ImgUrl", a.ImgUrl, xe);
        DBFX.Serializer.SerialProperty("ImgType", a.ImgType, xe);

        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.SucSequence.ClassDescriptor);

        if (s != null) {
            //系列化SucSequence
            var xseq = xdoc.createElement("SucSequence");
            xe.appendChild(xseq);
            a.SucSequence.Namespace = a.Namespace;
            a.SucSequence.NSSN = a.NSSN;
            s.Serialize(a.SucSequence, xseq, ns);

            //系列化FailSequence
            var xseq = xdoc.createElement("FailSequence");
            xe.appendChild(xseq);
            a.FailSequence.Namespace = a.Namespace;
            a.FailSequence.NSSN = a.NSSN;
            s.Serialize(a.FailSequence, xseq, ns);

        }

    }

}
DBFX.Design.ActivityDesigners.OCRDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/OCRDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;
        }, obdc);


    }

    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "文字识别设置";
    return obdc;

}


//数据导入
DBFX.Design.WFActivities.ImportData = function () {

    var importData = new DBFX.Design.WFActivities.Activity("ImportData");
    importData.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ImportDataSerializer";
    importData.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ImportDataDesigner");
    importData.Text = "数据导入";
    importData.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ImportData.png";

    //编译代码
    importData.ToCode = function (sw) {

        if (importData.columns == "")
            importData.columns = "@[]";

        sw.AddLine("var cfg={Title:" + DBFX.Design.WFActivities.ParsingVar(importData.Title) + ",ServiceUrl:" + DBFX.Design.WFActivities.ParsingVar(importData.ServiceUrl) + ",SvcUri:" + DBFX.Design.WFActivities.ParsingVar(importData.SvcUri) + ",DBName:" + DBFX.Design.WFActivities.ParsingVar(importData.DBName) + ",StoreProcedure:" + DBFX.Design.WFActivities.ParsingVar(importData.storeprocedure) + ",ConnectionString:" + DBFX.Design.WFActivities.ParsingVar(importData.connectionstring) + ",ExData:" + DBFX.Design.WFActivities.ParsingVar(importData.ExData) + ",Columns:" + DBFX.Design.WFActivities.ParsingVar(importData.columns)+"};");

        sw.AddLine("Dbsoft.System.importData(JSON.stringify(cfg));");
    }

    importData.title = "数据导入";
    //SvcUri 服务标识设置
    Object.defineProperty(importData, "Title", {
        get: function () {

            return importData.title;

        },
        set: function (v) {

            importData.title = v;
        }
    });

    //SvcUri 服务标识设置
    importData.svcuri = "DB.FX.Storage.MongoDBService";
    Object.defineProperty(importData, "SvcUri", {
        get: function () {

            return importData.svcuri;

        },
        set: function (v) {

            importData.svcuri = v;
        }
    });


    //SvcUri 服务标识设置
    Object.defineProperty(importData, "ServiceUrl", {
        get: function () {

            return importData.serviceurl;

        },
        set: function (v) {

            importData.serviceurl = v;
        }
    });


    //SvcUri 服务标识设置
    Object.defineProperty(importData, "StoreProcedure", {
        get: function () {

            return importData.storeprocedure;

        },
        set: function (v) {

            importData.storeprocedure = v;
        }
    });
    //SvcUri 服务标识设置
    Object.defineProperty(importData, "DBName", {
        get: function () {

            return importData.dbname;

        },
        set: function (v) {

            importData.dbname = v;
        }
    });

    //SvcUri 服务标识设置
    Object.defineProperty(importData, "ConnectionString", {
        get: function () {

            return importData.connectionstring;

        },
        set: function (v) {

            importData.connectionstring = v;
        }
    });


    //20191219-ExData 额外配置项对象
    importData.exData = {};
    Object.defineProperty(importData, "ExData", {
        get: function () {

            return importData.exData;

        },
        set: function (v) {

            importData.exData = v;
        }
    });


    importData.columns ="";
    Object.defineProperty(importData, "Columns", {
        get: function () {

            return importData.columns;

        },
        set: function (v) {

            importData.columns = v;
        }
    });


    importData.SetDesignView = function (v) {
    }

    return importData;


}
DBFX.Design.WFSerializers.ImportDataSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("Title", a, xe);
        DBFX.Serializer.DeSerialProperty("SvcUri", a, xe);
        DBFX.Serializer.DeSerialProperty("ServiceUrl", a, xe);
        DBFX.Serializer.DeSerialProperty("StoreProcedure", a, xe);
        DBFX.Serializer.DeSerialProperty("DBName", a, xe);
        DBFX.Serializer.DeSerialProperty("ConnectionString", a, xe);
        DBFX.Serializer.DeSerialProperty("ExData", a, xe);
        DBFX.Serializer.DeSerialProperty("Columns", a, xe);


    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("Title", a.Title, xe);
        DBFX.Serializer.SerialProperty("SvcUri", a.SvcUri, xe);
        DBFX.Serializer.SerialProperty("ServiceUrl", a.ServiceUrl, xe);
        DBFX.Serializer.SerialProperty("StoreProcedure", a.StoreProcedure, xe);
        DBFX.Serializer.SerialProperty("DBName", a.DBName, xe);
        DBFX.Serializer.SerialProperty("ConnectionString", a.ConnectionString, xe);
        DBFX.Serializer.SerialProperty("ExData", a.ExData, xe);
        DBFX.Serializer.SerialProperty("Columns", a.Columns, xe);

    }



}
DBFX.Design.ActivityDesigners.ImportDataDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ImportDataDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }




    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "数据导入设置";
    return obdc;

}


//数据导入
//数据导出
DBFX.Design.WFActivities.ExportData = function () {

    var exportData = new DBFX.Design.WFActivities.Activity("ExportData");
    exportData.ClassDescriptor.Serializer = "DBFX.Design.WFSerializers.ExportDataSerializer";
    exportData.ClassDescriptor.Designers.Add("DBFX.Design.ActivityDesigners.ExportDataDesigner");
    exportData.Text = "数据导出";
    exportData.ImageUrl = "design/themes/%currenttheme%/images/wfdesignview/ExportData.png";

    //编译代码
    exportData.ToCode = function (sw) {

        if (exportData.columns == "")
            exportData.columns = "@[]";

        sw.AddLine("var cfg={Title:" + DBFX.Design.WFActivities.ParsingVar(exportData.Title) + ",ServiceUrl:" + DBFX.Design.WFActivities.ParsingVar(exportData.ServiceUrl) + ",SvcUri:" + DBFX.Design.WFActivities.ParsingVar(exportData.SvcUri) + ",DBName:" + DBFX.Design.WFActivities.ParsingVar(exportData.DBName) + ",StoreProcedure:" + DBFX.Design.WFActivities.ParsingVar(exportData.storeprocedure) + ",ConnectionString:" + DBFX.Design.WFActivities.ParsingVar(exportData.connectionstring) + ",DefaultFileName:" + DBFX.Design.WFActivities.ParsingVar(exportData.defaultFileName) + ",TH:" + DBFX.Design.WFActivities.ParsingVar(exportData.headers) + ",QParams:" + DBFX.Design.WFActivities.ParsingVar(exportData.qParams) + ",Columns:" + DBFX.Design.WFActivities.ParsingVar(exportData.columns) + "};");

        sw.AddLine("Dbsoft.System.DataExport(JSON.stringify(cfg));");
    }
    exportData.title = "数据导出";
    //Title 导出界面显示标题
    Object.defineProperty(exportData, "Title", {
        get: function () {

            return exportData.title;

        },
        set: function (v) {

            exportData.title = v;
        }
    });

    //SvcUri 服务标识设置
    exportData.svcuri = "DB.FX.Storage.MongoDBService";
    Object.defineProperty(exportData, "SvcUri", {
        get: function () {

            return exportData.svcuri;

        },
        set: function (v) {

            exportData.svcuri = v;
        }
    });


    //ServiceUrl 数据库所在服务器地址
    Object.defineProperty(exportData, "ServiceUrl", {
        get: function () {

            return exportData.serviceurl;

        },
        set: function (v) {

            exportData.serviceurl = v;
        }
    });


    //StoreProcedure 执行的存储过程名
    Object.defineProperty(exportData, "StoreProcedure", {
        get: function () {

            return exportData.storeprocedure;

        },
        set: function (v) {

            exportData.storeprocedure = v;
        }
    });
    //DBName 数据库的名字
    Object.defineProperty(exportData, "DBName", {
        get: function () {

            return exportData.dbname;

        },
        set: function (v) {

            exportData.dbname = v;
        }
    });

    exportData.defaultFileName = "";
    Object.defineProperty(exportData, "DefaultFileName", {
        get: function () {

            return exportData.defaultFileName;

        },
        set: function (v) {

            exportData.defaultFileName = v;
        }
    });

    //Headers 导出表格的头部标题
    exportData.headers = "";
    Object.defineProperty(exportData, "Headers", {
        get: function () {

            return exportData.headers;

        },
        set: function (v) {

            exportData.headers = v;
        }
    });

    //ConnectionString 数据库服务DBAzure
    Object.defineProperty(exportData, "ConnectionString", {
        get: function () {

            return exportData.connectionstring;

        },
        set: function (v) {

            exportData.connectionstring = v;
        }
    });


    //Columns 数组 导出数据的列名 顺序填写
    exportData.columns = "";
    Object.defineProperty(exportData, "Columns", {
        get: function () {

            return exportData.columns;

        },
        set: function (v) {

            exportData.columns = v;
        }
    });

    //QParams 存储过程的查询参数
    exportData.qParams = "";
    Object.defineProperty(exportData, "QParams", {
        get: function () {

            return exportData.qParams;

        },
        set: function (v) {

            exportData.qParams = v;
        }
    });

    exportData.SetDesignView = function (v) {
    }

    return exportData;

}
DBFX.Design.WFSerializers.ExportDataSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("Title", a, xe);
        DBFX.Serializer.DeSerialProperty("SvcUri", a, xe);
        DBFX.Serializer.DeSerialProperty("ServiceUrl", a, xe);
        DBFX.Serializer.DeSerialProperty("StoreProcedure", a, xe);
        DBFX.Serializer.DeSerialProperty("DBName", a, xe);
        DBFX.Serializer.DeSerialProperty("ConnectionString", a, xe);
        DBFX.Serializer.DeSerialProperty("DefaultFileName", a, xe);
        DBFX.Serializer.DeSerialProperty("Headers", a, xe);
        DBFX.Serializer.DeSerialProperty("Columns", a, xe);
        DBFX.Serializer.DeSerialProperty("QParams", a, xe);

    }
    //系列化
    this.Serialize = function (a, xe, ns) {

        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("Title", a.Title, xe);
        DBFX.Serializer.SerialProperty("SvcUri", a.SvcUri, xe);
        DBFX.Serializer.SerialProperty("ServiceUrl", a.ServiceUrl, xe);
        DBFX.Serializer.SerialProperty("StoreProcedure", a.StoreProcedure, xe);
        DBFX.Serializer.SerialProperty("DBName", a.DBName, xe);
        DBFX.Serializer.SerialProperty("ConnectionString", a.ConnectionString, xe);
        DBFX.Serializer.SerialProperty("Headers", a.headers, xe);
        DBFX.Serializer.SerialProperty("DefaultFileName", a.DefaultFileName, xe);
        DBFX.Serializer.SerialProperty("Columns", a.Columns, xe);
        DBFX.Serializer.SerialProperty("QParams", a.QParams, xe);

    }
}
DBFX.Design.ActivityDesigners.ExportDataDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.Controls = new DBFX.Web.Controls.ControlsCollection(obdc);
    obdc.OnCreateHandle = function () {


        DBFX.Resources.LoadResource("design/DesignerTemplates/WFDeisgnerTemplates/ExportDataDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;


        }, obdc);


    }




    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "数据导出设置";
    return obdc;

}


