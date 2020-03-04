DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.WFSerializers");
//设计器视图系列化程序
DBFX.Serializer.FormDesignViewSerializer = function () {


    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        //反系列化属性
        DBFX.Serializer.DeSerialProperty("BackgroundColor", c, xe);
        DBFX.Serializer.DeSerialProperty("BackgroundImageUrl", c, xe);
        DBFX.Serializer.DeSerialProperty("BackgroundSizeMode", c, xe);
        DBFX.Serializer.DeSerialProperty("HorizonScrollbar", c, xe);
        DBFX.Serializer.DeSerialProperty("Margin", c, xe);
        DBFX.Serializer.DeSerialProperty("Padding", c, xe);
        DBFX.Serializer.DeSerialProperty("Text", c, xe);
        DBFX.Serializer.DeSerialProperty("Height", c, xe);
        DBFX.Serializer.DeSerialProperty("Width", c, xe);
        DBFX.Serializer.DeSerialProperty("Color", c, xe);
        DBFX.Serializer.DeSerialProperty("FontFamily", c, xe);
        DBFX.Serializer.DeSerialProperty("FontSize", c, xe);
        DBFX.Serializer.DeSerialProperty("FontStyle", c, xe);
        DBFX.Serializer.DeSerialProperty("DeviceType", c, xe);
        DBFX.Serializer.DeSerialProperty("DeviceSize", c, xe);;
        DBFX.Serializer.DeSerialProperty("ViewHeight", c, xe);
        DBFX.Serializer.DeSerialProperty("ViewWidth", c, xe);
        DBFX.Serializer.DeSerialProperty("DeviceHeight", c, xe);
        DBFX.Serializer.DeSerialProperty("DeviceWidth", c, xe);
        DBFX.Serializer.DeSerialProperty("DeviceOrientation", c, xe);
        DBFX.Serializer.DeSerialProperty("DeviceBackgroundColor", c, xe);
        DBFX.Serializer.DeSerialProperty("FormViewScale", c, xe)
        DBFX.Serializer.DeSerialProperty("Opacity", c, xe)
        c.DesignTime = true;

        //系列化表单
        var fs = new DBFX.Serializer.FormSerializer();
        fs.DeSerialize(xe,c);

        
        DBFX.Serializer.DeSerializeCommand("Load", xe, c);
        DBFX.Serializer.DeSerializeCommand("UnLoad", xe, c);
        DBFX.Serializer.DeSerializeCommand("Resume", xe, c);

        var tc = {};
        DBFX.Serializer.DeSerializeCommand("OnLoad", xe, tc);
        if (tc.OnLoad != undefined)
            c.Load = tc.OnLoad;
       

    }


    //系列化
    this.Serialize = function (c, xe, ns) {

        DBFX.Design.DesignView.ActivedDesignView = c.DesignView;

        var xdoc = xe.ownerDocument;
        //系列化属性
        DBFX.Serializer.SerialProperty("BackgroundColor", c.BackgroundColor, xe);
        DBFX.Serializer.SerialProperty("BackgroundImageUrl", c.BackgroundImageUrl, xe);
        DBFX.Serializer.SerialProperty("BackgroundSizeMode", c.BackgroundSizeMode, xe);
        DBFX.Serializer.SerialProperty("Opacity", c.Opacity, xe);
        DBFX.Serializer.SerialProperty("HorizonScrollbar", c.HorizonScrollbar,xe);
        DBFX.Serializer.SerialProperty("Margin", c.Margin,xe);
        DBFX.Serializer.SerialProperty("Padding", c.Padding,xe);
        DBFX.Serializer.SerialProperty("Serializer", "DBFX.Serializer.FormPartSerializer",xe);
        DBFX.Serializer.SerialProperty("Text", c.Text,xe);
        DBFX.Serializer.SerialProperty("Color", c.Color, xe);
        DBFX.Serializer.SerialProperty("FontSize", c.FontSize, xe);
        DBFX.Serializer.SerialProperty("FontFamily", c.FontFamily, xe);
        DBFX.Serializer.SerialProperty("FontStyle", c.FontStyle, xe);
        DBFX.Serializer.SerialProperty("DeviceType", c.DeviceType, xe);
        DBFX.Serializer.SerialProperty("DeviceSize", c.DeviceSize, xe);
        DBFX.Serializer.SerialProperty("DeviceOrientation", c.DeviceOrientation, xe);
        DBFX.Serializer.SerialProperty("FormViewScale", c.FormViewScale, xe);
        DBFX.Serializer.SerialProperty("ViewHeight", c.ViewHeight, xe);
        DBFX.Serializer.SerialProperty("ViewWidth", c.ViewWidth, xe);
        DBFX.Serializer.SerialProperty("DeviceHeight", c.DeviceHeight, xe);
        DBFX.Serializer.SerialProperty("DeviceWidth", c.DeviceWidth, xe);

        if (c.DeviceWidth == undefined) {
            DBFX.Serializer.SerialProperty("Height", c.Height, xe);
            DBFX.Serializer.SerialProperty("Width", c.Width, xe);
        }

        DBFX.Serializer.SerialProperty("DeviceBackgroundColor", c.DeviceBackgroundColor, xe);
        
        //系列化名字空间
        var xns = xdoc.createElement("xns");
        xe.appendChild(xns);
        for (var k in c.DesignView.NS) {

            if (c.DesignView.NS[k].Namespace == undefined)
                continue;

            var xn = xdoc.createElement("ns");
            xn.setAttribute("k", k);
            xn.setAttribute("n", c.DesignView.NS[k].Namespace);
            xns.appendChild(xn);

        }

        //系列化控件集合
        var xcs = xdoc.createElement("controls");
        xe.appendChild(xcs);

        for (var i = 0; i < c.DesignView.Controls.length; i++) {

            var cm = c.DesignView.Controls[i];
            var cxe = xdoc.createElement("c");
            xcs.appendChild(cxe);

           
            ControlSerializer.Serialize(cm, cxe, null);


        }


        DBFX.Serializer.SerializeCommand("Load", c.Load, xe);
        DBFX.Serializer.SerializeCommand("UnLoad", c.UnLoad, xe);
        DBFX.Serializer.SerializeCommand("Resume", c.Resume, xe);

    }



}

DBFX.Serializer.DrawingViewSerializer = function () {


    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        //反系列化属性
        DBFX.Serializer.DeSerialProperty("BackgroundColor", c, xe);
        DBFX.Serializer.DeSerialProperty("BackgroundImageUrl", c, xe);
        DBFX.Serializer.DeSerialProperty("BackgroundSizeMode", c, xe);
        DBFX.Serializer.DeSerialProperty("Padding", c, xe);
        DBFX.Serializer.DeSerialProperty("Height", c, xe);
        DBFX.Serializer.DeSerialProperty("Width", c, xe);
        DBFX.Serializer.DeSerialProperty("Color", c, xe);
        DBFX.Serializer.DeSerialProperty("PapereHeight", c, xe);
        DBFX.Serializer.DeSerialProperty("PaperWidth", c, xe);
        DBFX.Serializer.DeSerialProperty("DrawingViewScale", c, xe)
        DBFX.Serializer.DeSerialProperty("Opacity", c, xe)
        c.DesignTime = true;

        //系列化表单
        var ds = new DBFX.Serializer.DrawingSerializer();
        ds.DeSerialize(xe, c);



    }


    //系列化
    this.Serialize = function (c, xe, ns) {

        var xdoc = xe.ownerDocument;
        //系列化属性
        DBFX.Serializer.SerialProperty("BackgroundColor", c.BackgroundColor, xe);
        DBFX.Serializer.SerialProperty("BackgroundImageUrl", c.BackgroundImageUrl, xe);
        DBFX.Serializer.SerialProperty("BackgroundSizeMode", c.BackgroundSizeMode, xe);
        DBFX.Serializer.SerialProperty("Opacity", c.Opacity, xe);
        DBFX.Serializer.SerialProperty("Padding", c.Padding, xe);
        DBFX.Serializer.SerialProperty("Serializer", "DBFX.Serializer.DrawingSerializer", xe);
        DBFX.Serializer.SerialProperty("Color", c.Color, xe);
        DBFX.Serializer.SerialProperty("DrawingViewScale", c.FormViewScale, xe);
        DBFX.Serializer.SerialProperty("PapereHeight", c.ViewHeight, xe);
        DBFX.Serializer.SerialProperty("PaperWidth", c.ViewWidth, xe);
        DBFX.Serializer.SerialProperty("Height", c.Height, xe);
        DBFX.Serializer.SerialProperty("Width", c.Width, xe);
        DBFX.Serializer.SerialProperty("OnLoad", "", xe);
        //系列化名字空间
        var xns = xdoc.createElement("xns");
        xe.appendChild(xns);
        for (var k in c.DesignView.NS) {

            if (c.DesignView.NS[k].Namespace == undefined)
                continue;

            var xn = xdoc.createElement("ns");
            xn.setAttribute("k", k);
            xn.setAttribute("n", c.DesignView.NS[k].Namespace);
            xns.appendChild(xn);

        }

        //系列化控件集合
        var xcs = xdoc.createElement("controls");
        xe.appendChild(xcs);

        for (var i = 0; i < c.DesignView.Controls.length; i++) {

            var cm = c.DesignView.Controls[i];
            var cxe = xdoc.createElement("c");
            xcs.appendChild(cxe);


            ControlSerializer.Serialize(cm, cxe, null);



        }


    }



}


//数据模型视图系列化程序
DBFX.Serializer.DataModelDesignViewSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        var xschemas = xe.querySelector("Schemas");
        if (xschemas == null)
            return;

        for (var i = 0;i<xschemas.childNodes.length; i++) {

            var xschema = xschemas.childNodes[i];
            if (xschema.localName != "DataEntitySchema")
                continue;

            var schema = new DBFX.Design.DataEntitySchema();
            c.AddEntitySchema(schema);

            //执行类型系列化
            var s = DBFX.Serializer.Serializers.GetSerializer(schema.ClassDescriptor);

            if (s != null) {

                s.DeSerialize(schema, xschema, ns);

            }

            

        }


        var xrelations = xe.querySelector("Relations");
        if (xrelations != null) {
            for (var i = 0; i < xrelations.childNodes.length; i++) {

                var xrelation = xrelations.childNodes[i];
                if (xrelation.localName == null)
                    continue;

                var r = new DBFX.Design.DataRelation(c);

                c.AddRelation(r);

                //执行类型系列化
                var s = DBFX.Serializer.Serializers.GetSerializer(r.ClassDescriptor);

                if (s != null) {

                    s.DeSerialize(r, xrelation, ns);

                }


            }
        }


    }


    //系列化
    this.Serialize = function (c, xe, ns) {

        //创建架构集合节点
        var xschemas = xe.ownerDocument.createElement("Schemas");
        xe.appendChild(xschemas);

        for (var i = 0; i < c.Schemas.length; i++) {

            var schema = c.Schemas[i];
            var xschema = xe.ownerDocument.createElement("DataEntitySchema");
            //执行类型系列化
            var s = DBFX.Serializer.Serializers.GetSerializer(schema.ClassDescriptor);

            if (s != null) {

                s.Serialize(schema, xschema, ns);
                 
            }
            xschemas.appendChild(xschema);
        }

        //系列化关系集合
        var xrelations = xe.ownerDocument.createElement("Relations");
        xe.appendChild(xrelations);

        c.Relations.forEach(function (r) {

            var xrelation = xe.ownerDocument.createElement("R");
            xrelations.appendChild(xrelation);

            //执行类型系列化
            var s = DBFX.Serializer.Serializers.GetSerializer(r.ClassDescriptor);

            if (s != null) {

                s.Serialize(r, xrelation, ns);

            }
        });


    }


}

//
DBFX.Serializer.DataEntityRelationSerializer = function () {


    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        var pename = xe.getAttribute("ParentEntityName");
        var pname = xe.getAttribute("ParentPropertyName");

        
        var cename = xe.getAttribute("ChildEntityName");
        var cname = xe.getAttribute("ChildPropertyName");

        if (pename !== null) {
            var pe = c.DesignView.SchemaNames[pename];
            if (pe != undefined)
                c.EP0.PropertyItem = pe.Properties.GetValue(pname);
        }

        if (cename != null) {
            var ce = c.DesignView.SchemaNames[cename];
            if (ce != undefined)
                c.EP1.PropertyItem = ce.Properties.GetValue(cname);
        }

        c.ReLoctionEP();

    }

    this.Serialize = function (c, xe, ns) {

        if (c.EP0.PropertyItem != undefined) {
            var pename = c.EP0.PropertyItem.DataEntity.Name;
            var pname = c.EP0.PropertyItem.PropertyName;
            DBFX.Serializer.SerialProperty("ParentEntityName", pename, xe);
            DBFX.Serializer.SerialProperty("ParentPropertyName", pname, xe);
        }

        if (c.EP1.PropertyItem != undefined) {
            var cename = c.EP1.PropertyItem.DataEntity.Name;
            var cname = c.EP1.PropertyItem.PropertyName;
            DBFX.Serializer.SerialProperty("ChildEntityName", cename, xe);
            DBFX.Serializer.SerialProperty("ChildPropertyName", cname, xe);
        }

    }

}

//
DBFX.Serializer.DataEntitySchemaSerializer = function () {
    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Top", c, xe);
        DBFX.Serializer.DeSerialProperty("Left", c, xe);
        DBFX.Serializer.DeSerialProperty("Name", c, xe);
        DBFX.Serializer.DeSerialProperty("Title", c, xe);
        DBFX.Serializer.DeSerialProperty("Description", c, xe);
        DBFX.Serializer.DeSerialProperty("PrimaryKey", c, xe);

        for (var i = 0; i < xe.childNodes.length; i++) {

            var xp = xe.childNodes[i];

            if (xp.localName == null)
                return;

            var uid = DBFX.GetUniqueNumber();

            var p = new DBFX.Design.DataEntityProperty(c, "dp" + uid, "New Property", "string", false);

            DBFX.Serializer.DeSerialProperty("PropertyName", p, xp);
            DBFX.Serializer.DeSerialProperty("DataType", p, xp);
            DBFX.Serializer.DeSerialProperty("PropertyTitle", p, xp);
            DBFX.Serializer.DeSerialProperty("Description", p, xp);
            DBFX.Serializer.DeSerialProperty("CheckRule", p, xp);
            DBFX.Serializer.DeSerialProperty("InputTipText", p, xp);
            DBFX.Serializer.DeSerialProperty("ErrorTipText", p, xp);
            DBFX.Serializer.DeSerialProperty("IsPrimaryKey", p, xp);
            DBFX.Serializer.DeSerialProperty("ImageUrl", p, xp);

            c.AddProperty(p);
        }

    }


    //系列化
    this.Serialize = function (c, xe, ns) {

        DBFX.Serializer.SerialProperty("Name", c.Name, xe);
        DBFX.Serializer.SerialProperty("Title", c.Title, xe);
        DBFX.Serializer.SerialProperty("Description", c.Description, xe);
        DBFX.Serializer.SerialProperty("PrimaryKey", c.PrimaryKey, xe);
        DBFX.Serializer.SerialProperty("Top", c.Top, xe);
        DBFX.Serializer.SerialProperty("Left", c.Left, xe);
        
        //系列化实体属性

        c.Properties.Values.forEach(function (p) {
            var xp = xe.ownerDocument.createElement("P");
            xe.appendChild(xp);
            DBFX.Serializer.SerialProperty("PropertyName", p.PropertyName,xp);
            DBFX.Serializer.SerialProperty("DataType", p.DataType, xp);
            DBFX.Serializer.SerialProperty("PropertyTitle", p.PropertyTitle, xp);
            DBFX.Serializer.SerialProperty("Description", p.Description, xp);
            DBFX.Serializer.SerialProperty("CheckRule", p.CheckRule, xp);
            DBFX.Serializer.SerialProperty("InputTipText", p.InputTipText, xp);
            DBFX.Serializer.SerialProperty("ErrorTipText", p.ErrorTipText, xp);
            DBFX.Serializer.SerialProperty("IsPrimaryKey", p.IsPrimaryKey, xp);
            DBFX.Serializer.SerialProperty("ImageUrl", p.ImageUrl, xp);
        });


    }
}

//工作流系列化
DBFX.Design.WFSerializers.WorkflowSerializer = function () {

    
    //反系列化
    this.DeSerialize = function (wf, xe, ns) {

        ns = new Object();

        var xns = xe.querySelector("xns");
        for (var j = 0; j < xns.childNodes.length; j++) {
            var xn = xns.childNodes[j];
            ns[xn.getAttribute("k")] = xn.getAttribute("n");
        }

        DBFX.Serializer.DeSerialProperty("Text", wf.SequenceRoot, xe);
        DBFX.Serializer.DeSerialProperty("Name", wf.SequenceRoot, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", wf.SequenceRoot, xe);
        DBFX.Serializer.DeSerialProperty("WFViewScale", wf.SequenceRoot, xe);
        wf.Clear();
        var xwfas = xe.querySelector("RootSequence");
        if (xwfas != null) {
            for (var i = 0; i < xwfas.childNodes.length; i++) {

                var xwfa = xwfas.childNodes[i];
                if (xwfa.localName != "c")
                    continue;

                var wfa = DBFX.Serializer.CreateInstance(xwfa, ns, true);

                wf.SequenceRoot.AddActivity(wfa);

                //执行类型系列化
                var s = DBFX.Serializer.Serializers.GetSerializer(wfa.ClassDescriptor);

                if (s != null) {

                    s.DeSerialize(wfa, xwfa, ns);

                }


            }


        }

        DBFX.Serializer.DeSerialProperty("WFViewScale", wf.SequenceRoot, xe);
    }

    
    //系列化
    this.Serialize = function (wf, xe, ns) {

        var xdoc=xe.ownerDocument;
        DBFX.Serializer.SerialProperty("Text", wf.SequenceRoot.Text, xe);
        DBFX.Serializer.SerialProperty("Name", wf.SequenceRoot.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", wf.SequenceRoot.Annotate, xe);
        DBFX.Serializer.SerialProperty("WFViewScale", wf.SequenceRoot.WFViewScale, xe);
        ns = new Dictionary();
        //系列化名称空间
        var xns = xdoc.createElement("xns");
        xe.appendChild(xns);
        //系列化子活动
        var xrseq = xdoc.createElement("RootSequence");
        xe.appendChild(xrseq);
        for (var i = 0; i<wf.SequenceRoot.Activities.length; i++) {

            var a = wf.SequenceRoot.Activities[i];

            var nsobj = ns.GetValue(a.NSSN);
            if (nsobj == undefined) {
                nsobj = new Object();
                nsobj.k = a.NSSN;
                nsobj.n = a.Namespace;
                nsobj.t = a.ObjType;
                nsobj.ImageUrl = a.ObjImageUrl;
                ns.Add(nsobj.k, nsobj);
            }

            var xa = xdoc.createElement("c");
            xrseq.appendChild(xa);

            //执行类型系列化
            var s = DBFX.Serializer.Serializers.GetSerializer(a.ClassDescriptor);

            if (s != null) {

                s.Serialize(a,xa, ns);

            }

        }

        //创建名字空间
        for (var i = 0; i < ns.length; i++) {

            var nsobj = ns.Values[i];
            var xn = document.createElement("ns");
            xns.appendChild(xn);
            xn.setAttribute("k", nsobj.k);
            xn.setAttribute("n", nsobj.n);
            xn.setAttribute("ImageUrl", "");

        }


    }

}

//
DBFX.Design.WFSerializers.ActivitySerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text",a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate",a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);


    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);


    }

}

//
DBFX.Design.WFSerializers.SequenceSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        for (var i = 0; i < xe.childNodes.length; i++) {

            var xwfa = xe.childNodes[i];
            if (xwfa.localName != "c")
                continue;

            var wfa = DBFX.Serializer.CreateInstance(xwfa, ns, true);

            a.AddActivity(wfa);

            //执行类型系列化
            var s = DBFX.Serializer.Serializers.GetSerializer(wfa.ClassDescriptor);

            if (s != null) {

                s.DeSerialize(wfa, xwfa, ns);

            }


        }


    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        var xdoc=xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        for (var i = 0; i<a.Activities.length; i++) {

            var ca = a.Activities[i];

            var nsobj = ns.GetValue(ca.NSSN);
            if (nsobj == undefined) {
                nsobj = new Object();
                nsobj.k = ca.NSSN;
                nsobj.n = ca.Namespace;
                nsobj.t = ca.ObjType;
                nsobj.ImageUrl = ca.ObjTypeImageUrl;
                ns.Add(nsobj.k, nsobj);
            }

            var xa = xdoc.createElement("c");
            xe.appendChild(xa);

            //执行类型系列化
            var s = DBFX.Serializer.Serializers.GetSerializer(ca.ClassDescriptor);

            if (s != null) {

                s.Serialize(ca, xa, ns);

            }

        }


    }

}

///
DBFX.Design.WFSerializers.IFBranchSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("CExpressionsStr", a, xe);

        var s = DBFX.Serializer.Serializers.GetSerializer(a.TrueSequence.ClassDescriptor);
        var xtseq = xe.childNodes[0];
        if (s!=undefined && xtseq != null) {
            s.DeSerialize(a.TrueSequence, xtseq, ns);
        }


        var xfseq = xe.childNodes[1];
        if (s != undefined && xfseq != null) {
            s.DeSerialize(a.FalseSequence, xfseq, ns);
        }

        a.Height = "";

    }


    //系列化
    this.Serialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("CExpressionsStr", JSON.stringify(a.CExpressions), xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.TrueSequence.ClassDescriptor);

        if (s != null) {

            //系列化TrueSequence
            var xtseq = xdoc.createElement("TrueSequence");
            xe.appendChild(xtseq);
            a.TrueSequence.Namespace = a.Namespace;
            a.TrueSequence.NSSN = a.NSSN;
            s.Serialize(a.TrueSequence, xtseq, ns);

            //系列化FalseSequence
            var xfseq = xdoc.createElement("FalseSequence");
            xe.appendChild(xfseq);
            a.FalseSequence.Namespace = a.Namespace;
            a.FalseSequence.NSSN = a.NSSN;
            s.Serialize(a.FalseSequence, xfseq, ns);
        }


    }

}

//
DBFX.Design.WFSerializers.ForSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("InitValue", a, xe);
        DBFX.Serializer.DeSerialProperty("LimitValue", a, xe);
        DBFX.Serializer.DeSerialProperty("IncValue", a, xe);
        DBFX.Serializer.DeSerialProperty("IdxVar", a, xe);
        DBFX.Serializer.DeSerialProperty("IsReversed", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);
        var xseq = xe.querySelector("Sequence");
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
        DBFX.Serializer.SerialProperty("InitValue", a.InitValue, xe);
        DBFX.Serializer.SerialProperty("LimitValue", a.LimitValue, xe);
        DBFX.Serializer.SerialProperty("IncValue", a.IncValue, xe);
        DBFX.Serializer.SerialProperty("IdxVar", a.IdxVar, xe);
        DBFX.Serializer.SerialProperty("IsReversed", a.IsReversed, xe);
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

//
DBFX.Design.WFSerializers.ForEachSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ItemName", a, xe);
        DBFX.Serializer.DeSerialProperty("ItemsMember", a, xe);
        DBFX.Serializer.DeSerialProperty("ArrayObject", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);
        var xseq = xe.querySelector("Sequence");
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
        DBFX.Serializer.SerialProperty("ItemName", a.ItemName, xe);
        DBFX.Serializer.SerialProperty("ItemsMember", a.ItemsMember, xe);
        DBFX.Serializer.SerialProperty("ArrayObject", a.ArrayObject, xe);
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

//
DBFX.Design.WFSerializers.WhileSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("CExpressionsStr", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);
        var xseq = xe.querySelector("Sequence");
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
        DBFX.Serializer.SerialProperty("CExpressionsStr", JSON.stringify(a.CExpressions), xe);
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


//
DBFX.Design.WFSerializers.TryCatchSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.TrySequence.ClassDescriptor);
        var xtseq = xe.childNodes[0];
        if (s != undefined && xtseq != null) {
            s.DeSerialize(a.TrySequence, xtseq, ns);
        }


        var xfseq = xe.childNodes[1];
        if (s != undefined && xtseq != null) {
            s.DeSerialize(a.CatchSequence, xfseq, ns);
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
        var s = DBFX.Serializer.Serializers.GetSerializer(a.TrySequence.ClassDescriptor);

        if (s != null) {

            //系列化TrySequence
            var xtseq = xdoc.createElement("TrySequence");
            xe.appendChild(xtseq);
            a.TrySequence.Namespace = a.Namespace;
            a.TrySequence.NSSN = a.NSSN;
            s.Serialize(a.TrySequence, xtseq, ns);

            //系列化CatchSequence
            var xfseq = xdoc.createElement("CatchSequence");
            xe.appendChild(xfseq);
            a.CatchSequence.Namespace = a.Namespace;
            a.CatchSequence.NSSN = a.NSSN;
            s.Serialize(a.CatchSequence, xfseq, ns);
        }


    }

}


//
DBFX.Design.WFSerializers.SwitchBranchSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("SelectionVar", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.DefaultSequence.ClassDescriptor);
        var xbseqs = xe.childNodes[0];
        if (s != undefined && xbseqs != null) {
            for (var i = 0; i < xbseqs.childNodes.length; i++) {

                var xbseq = xbseqs.childNodes[i];

                var bseq = new DBFX.Design.WFActivities.Sequence(a.DesignView);

                a.AddCase(bseq);
                s.DeSerialize(bseq, xbseq, ns);
                DBFX.Serializer.DeSerialProperty("CaseValue", bseq, xbseq);

            }
        }


        var xdbseq = xe.childNodes[1];
        if (s != undefined && xdbseq != null) {
            s.DeSerialize(a.DefaultSequence, xdbseq, ns);
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
        DBFX.Serializer.SerialProperty("SelectionVar", a.SelectionVar, xe);
        //执行类型系列化
        var s = DBFX.Serializer.Serializers.GetSerializer(a.DefaultSequence.ClassDescriptor);

        if (s != null) {

            var xbseqs = xdoc.createElement("BranchSequences");
            xe.appendChild(xbseqs);

            for (var i = 0; i < a.BranchSequences.length; i++) {

                var bseq = a.BranchSequences[i];

                //系列化CatchSequence
                var xbseq = xdoc.createElement("BranchSequence");
                xbseqs.appendChild(xbseq);
                DBFX.Serializer.SerialProperty("CaseValue", bseq.caseValue, xbseq);
                bseq.Namespace = a.Namespace;
                bseq.NSSN = a.NSSN;
                s.Serialize(bseq, xbseq, ns);


            }

            //系列化DefaultSequence
            var xdbseq = xdoc.createElement("DefaultSequence");
            xe.appendChild(xdbseq);
            a.DefaultSequence.Namespace = a.Namespace;
            a.DefaultSequence.NSSN = a.NSSN;
            s.Serialize(a.DefaultSequence, xdbseq, ns);
        }


    }

}

//
DBFX.Design.WFSerializers.ConfirmDialogSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {
        var xdoc = xe.ownerDocument;
        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("DialogTitle", a, xe);
        DBFX.Serializer.DeSerialProperty("DialogText", a, xe);
        DBFX.Serializer.DeSerialProperty("DialogType", a, xe);
        DBFX.Serializer.DeSerialProperty("IconType", a, xe);
        DBFX.Serializer.DeSerialProperty("Button1Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Button2Text", a, xe);
        var s = DBFX.Serializer.Serializers.GetSerializer(a.Sequence.ClassDescriptor);
        var xseq = xe.querySelector("Sequence");
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
        DBFX.Serializer.SerialProperty("DialogTitle", a.DialogTitle, xe);
        DBFX.Serializer.SerialProperty("DialogType", a.DialogType, xe);
        DBFX.Serializer.SerialProperty("DialogText", a.DialogText, xe);
        DBFX.Serializer.SerialProperty("IconType", a.IconType, xe);
        DBFX.Serializer.SerialProperty("Button1Text", a.Button1Text, xe);
        DBFX.Serializer.SerialProperty("Button2Text", a.Button2Text, xe);
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


//
DBFX.Design.WFSerializers.ReturnSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ReturnObject", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("ReturnObject", a.returnObject, xe);

    }



}

//
DBFX.Design.WFSerializers.AssignVarsSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("VarName", a, xe);
        DBFX.Serializer.DeSerialProperty("VarValue", a, xe);
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("VarName", a.varName, xe);
        DBFX.Serializer.SerialProperty("VarValue", a.varValue, xe);

    }



}

//
DBFX.Design.WFSerializers.DefParasSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("ParametersStr", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("ParametersStr", JSON.stringify(a.Parameters), xe);

    }



}

//
DBFX.Design.WFSerializers.DefVarsSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("VariablesStr", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("VariablesStr", JSON.stringify(a.Variables), xe);

    }



}


//
DBFX.Design.WFSerializers.UpdateCmdSerializer = function () {

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
    }



}

//
DBFX.Design.WFSerializers.InsertCmdSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("DataItemsStr", a, xe);
        DBFX.Serializer.DeSerialProperty("TableName", a, xe);
        DBFX.Serializer.DeSerialProperty("VarName", a, xe);

    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("DataItemsStr", JSON.stringify(a.DataItems), xe);
        DBFX.Serializer.SerialProperty("TableName", a.TableName, xe);
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);

    }



}

//
DBFX.Design.WFSerializers.DeleteCmdSerializer = function () {

    //反系列化
    this.DeSerialize = function (a, xe, ns) {

        DBFX.Serializer.DeSerialProperty("Text", a, xe);
        DBFX.Serializer.DeSerialProperty("Name", a, xe);
        DBFX.Serializer.DeSerialProperty("Annotate", a, xe);
        DBFX.Serializer.DeSerialProperty("Expanded", a, xe);
        DBFX.Serializer.DeSerialProperty("FiltersStr", a, xe);
        DBFX.Serializer.DeSerialProperty("TableName", a, xe);
        DBFX.Serializer.DeSerialProperty("VarName", a, xe);
    }


    //系列化
    this.Serialize = function (a, xe, ns) {

        DBFX.Serializer.SerialProperty("T", a.NSSN + ":" + a.ObjType, xe);
        DBFX.Serializer.SerialProperty("Text", a.Text, xe);
        DBFX.Serializer.SerialProperty("Name", a.Name, xe);
        DBFX.Serializer.SerialProperty("Annotate", a.Annotate, xe);
        DBFX.Serializer.SerialProperty("Expanded", a.Expanded, xe);
        DBFX.Serializer.SerialProperty("FiltersStr", JSON.stringify(a.Filters), xe);
        DBFX.Serializer.SerialProperty("TableName", a.TableName, xe);
        DBFX.Serializer.SerialProperty("VarName", a.VarName, xe);

    }



}

DBFX.Serializer.CustomUIFlowDesinViewSerializer = function () {

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
