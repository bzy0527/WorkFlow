
DBFX.RegisterNamespace("DBFX.Design"),DBFX.RegisterNamespace("DBFX.Design.Service"),DBFX.Design.DesignView=function()
{
var r="relative",
i=null,
t=!0,
n=new DBFX.Web.Controls.Control("DesignView");
return n.NS={},n.CodeItems=[],n.NSCodeItems=[],n.OnCreateHandle(),n.ClassDescriptor.Serializer="DBFX.Serializer.DesignViewSerializer",n.Controls=new DBFX.Web.Controls.ControlsCollection(n),n.IsContainer=t,n.Components=new DBFX.Web.Controls.ControlsCollection(n),n.DesignTime=t,n.ObjectSelector=new DBFX.Design.ObjectSelector,n.OnCreateHandle=function()
{
n.VisualElement.className="VDE_DesignViewBox",n.VisualElement.innerHTML='<DIV class="VDE_DesignView" ></DIV><DIV class="VDE_DesignViewCover"></DIV>',n.ControlView=n.VisualElement.querySelector("DIV.VDE_DesignView"),n.ControlViewCover=n.VisualElement.querySelector("DIV.VDE_DesignViewCover"),n.ClientDiv=n.VisualElement,n.ObjectSelector.ControlView=n.ControlView,n.ObjectSelector.DesignView=n,n.ControlView.allowDrop=t,n.ControlView.ondrop=n.OnDrop,n.ControlView.ondragover=function(t)
{
var i=t.currentTarget;
i.allowDrop&&n.ControlView==i&&t.preventDefault(),n.ActivedControl=undefined
},n.ControlView.onkeydown=function(i)
{
if(i.keyCode==13)
{
window.event.cancelBubble=t;
var r=new DBFX.Web.Controls.BreakLine;
n.ControlView.appendChild(r.VisualElement)
}
},n.ControlView.onmousemove=function(){},n.ControlView.onmousedown=function()
{
n.ObjectSelector.Hide()
}
},n.InsertControl=function(t,i)
{
var r=n.Controls.indexOf(i);
r<0?(n.Controls.push(t),n.ControlView.appendChild(t.VisualElement)):(n.Controls.splice(r,0,t),i.VisualElement.insertAdjacentElement("beforeBegin",t.VisualElement))
},n.ActivedControl=i,n.AddControl=function(t,r,u)
{
t.FormContext=n.FormContext,t.FormControls=n.FormControls,u==undefined&&n.SetDesignTimeMode(t,f);
if(n.ActivedControl==i)
r==undefined?(n.Controls.push(t),n.ControlView.appendChild(t.VisualElement),t.Parent=n):(r.AddControl(t),t.Parent=r);
else
{
var f=n.ActivedControl.Parent;
f==undefined&&(f=n),f.InsertControl(t,n.ActivedControl),t.Parent=f
}
(t.name!=undefined||t.name!="")&&(n.FormControls[t.name]=t),n.NS[t.NSSN]==undefined&&(n.NS[t.NSSN]={
NSSN:t.NSSN,
Namespace:t.Namespace
}),n.OnContentChanged(n)
},n.SetDesignTimeMode=function(r,u)
{
n.NS[r.NSSN]==undefined&&(n.NS[r.NSSN]={
NSSN:r.NSSN,
Namespace:r.Namespace
});
var f=DBFX.Design.ControlDesignPan();
f.DesignView=n,f.Control=r,r.FormContext=n.FormContext,r.FormControls=n.FormControls,typeof r.ClassDescriptor.DesignTimePreparer=="string"&&r.ClassDescriptor.DesignTimePreparer!=""&&(r.ClassDescriptor.DesignTimePreparer=eval(r.ClassDescriptor.DesignTimePreparer)),typeof r.ClassDescriptor.DesignTimePreparer=="function"&&r.ClassDescriptor.DesignTimePreparer(r,f),r.DesignTime=t,r.DesignPan=f,r.DesignView=n,r.Parent=u,r!=i&&(r.Draggable=t,r.DragOver=n.ControlDragOver,r.DragDrop=n.OnControlDrop,r.MouseMove=n.OnControlMouseOve,r.AllowDrop=r.IsContainer?t:!1)
},n.EnableControlDesignTime=function(r,u)
{
r.DesignTime=t,r.DesignView=n,r.Parent=u,r!=i&&(r.Draggable=t,r.DragOver=n.ControlDragOver,r.DragDrop=n.OnControlDrop,r.MouseMove=n.OnControlMouseOve,r.AllowDrop=r.IsContainer?t:!1)
},n.CopyControl=function(t)
{
var o=(new DOMParser).parseFromString("<Control></Control>","text/xml"),
e={},
u,
i,
r,
f;
for(u in n.NS)
{
if(Object.prototype[u]!=undefined)
continue;
i=n.NS[u],i!=undefined&&i.Namespace!=undefined&&(e[i.NSSN]=i.Namespace)
}
r=o.documentElement,f=new DBFX.Serializer.ControlSerializer,f.Serialize(t,r,e),DBFX.Design.DesignView.Clipboard=r
},n.PasteControl=function(i,r)
{
var o=DBFX.Design.DesignView.Clipboard,
u,
l,
s,
a,
h,
c,
f,
e;
if(o==undefined)
return;
u={};
for(l in n.NS)
{
if(Object.prototype[l]!=undefined)
continue;
s=n.NS[l],s!=undefined&&s.Namespace!=undefined&&(u[s.NSSN]=s.Namespace)
}
if(r==t)
{
for(e=new DBFX.Serializer.ControlSerializer,a=o.querySelector("controls"),h=0;h<a.childNodes.length;h++)
{
c=a.childNodes[h];
if(c.localName!="c")
continue;
f=DBFX.Serializer.CreateInstance(c,u,t),n.AddControl(f,i),e.DeSerialize(f,c,u)
}
e.DeSerializeProperties(i,o,u)
}
else
f=DBFX.Serializer.CreateInstance(o,u,t),n.AddControl(f,i),e=new DBFX.Serializer.ControlSerializer,e.DeSerialize(f,o,u)
},n.OnControlMouseOve=function(n)
{
n.preventDefault(),n.cancelBubble=t
},n.RemoveControl=function(t)
{
t.Parent!=undefined?t.Parent.Remove(t):n.Remove(t),n.ObjectSelector.Hide(),n.ClearControlCodes(t),n.OnContentChanged(n)
},n.Remove=function(t)
{
(t.name!=undefined||t.name!="")&&(n.FormControls[t.name]=undefined),n.Controls.Remove(t),n.ControlView.removeChild(t.VisualElement)
},n.Clear=function(){},n.OnDrop=function(t)
{
t.preventDefault();
try
{
var r=DBFX.Web.Controls.Context.DragObject,
i=DBFX.Design.DesignView.CreateControlInstance(r);
n.AddControl(i)
}
catch(u)
{
alert(u)
}
},n.OnControlDrop=function(r,u)
{
if(r.IsContainer)
{
u.preventDefault(),u.cancelBubble=t;
var e=DBFX.Web.Controls.Context.DragObject,
f=DBFX.Design.DesignView.CreateControlInstance(e);
n.AddControl(f,r),n.ActivedControl=i
}
},n.ControlDragOver=function(i,r)
{
n.ActivedControl=i.IsContainer?undefined:i,r.preventDefault(),r.cancelBubble=t
},n.OnObjectSelected=function(){},n.OnContentChanged=function(t)
{
n.ContentChanged(t)
},n.ContentChanged=function(){},n.ScaleX=1,n.ScaleY=1,n.ZoomScale=1,n.OnCreateHandle(),n.ControlView.DropControl=function(t)
{
if(t.Parent==n)
return;
t.Parent.Remove(t),t.Position=r,t.Top="",t.Left="",n.AddControl(t,undefined,0)
},n.ControlView.DropInsertControl=function(t,i)
{
t.Position=r,t.Top="",t.Left="",n.InsertControl(t,i)
},n.ClearCodeRes=function(){},n.UpdateCodeResFlag=function(){},n.AddCodeItem=function(t)
{
n.CodeItems.indexOf(t._id)==-1&&n.CodeItems.Add(t._id)
},n.AddNSCodeItem=function(t)
{
n.NSCodeItems.indexOf(t._id)==-1&&n.NSCodeItems.Add(t._id)
},n.ClearControlCodes=function(t)
{
var r,
i;
for(r in t)
i=t[r],i!=undefined&&i.GetType().toLowerCase()=="command"&&i._id!=undefined&&n.NSCodeItems.Remove(i._id)
},n.OnContextMenu=function(i)
{
if(n.ContextMenu!=undefined&&n.ContextMenu.ShowContextMenu!=undefined)
{
var r={};
r.x=i.clientX,r.y=i.clientY,n.ContextMenu.FormContext=n.FormContext,n.ContextMenu.DataContext=n,n.ContextMenu.ShowAt(r),i.cancelBubble=t,i.preventDefault()
}
},n.OnUnLoad=function()
{
for(var t=0;t<n.Controls.length;t++)
n.Controls[t].OnUnLoad()
},n
},DBFX.Design.DesignView.CreateControlInstance=function(n)
{
var t=null;
try
{
var r=n.Properties.Namespace.Value,
i=n.Properties.ControlType.Value,
u="new "+r+"."+i+"()";
t=eval(u),t!=null&&(t.Namespace=r,t.NSSN=n.Properties.NSSN.Value,t.ObjType=i,t.ObjImageUrl=n.Properties.ImageUrl.Value,n.Properties.DefaultValue!=undefined&&n.Properties.DefaultValue.Value!=""&&t.SetText!=undefined&&t.SetText(n.Properties.DefaultValue.Value),n.Properties.Height!=undefined&&n.Properties.Height.Value!=undefined&&(t.MinHeight=n.Properties.Height.Value),n.Properties.Width!=undefined&&n.Properties.Width.Value!=undefined&&(t.MinWidth=n.Properties.Width.Value),t.Position="relative")
}
catch(f){}
return t
},DBFX.Design.DesignView.RemoveControl=function(n)
{
var t=n.Sender.dataContext;
n.Sender.FormContext.Form.RemoveControl(t)
},app.GlobalCommands.Register("VDE_Design_DesignView_RemoveControl",DBFX.Design.DesignView.RemoveControl),DBFX.Design.DesignView.CopyControl=function(n)
{
var t=n.Sender.dataContext;
n.Sender.FormContext.Form.CopyControl(t)
},app.GlobalCommands.Register("VDE_Design_DesignView_CopyControl",DBFX.Design.DesignView.CopyControl),DBFX.Design.DesignView.PasteControl=function(n)
{
var t=n.Sender.dataContext;
t.GetType()=="object"&&(t=undefined),t.PasteChildOnly==!0?n.Sender.FormContext.Form.PasteControl(t,!0):n.Sender.FormContext.Form.PasteControl(t)
},app.GlobalCommands.Register("VDE_Design_DesignView_PasteControl",DBFX.Design.DesignView.PasteControl),DBFX.Design.ControlDesignPan=function()
{
var t="relative",
n=new UIObject("DesignPan");
return n.VisualElement=document.createElement("DIV"),n.VisualElement.className="VDE_Design_ControlDP",n.PanDiv=n.VisualElement,document.body.onmousedown=n.HideSelector,n.HideSelector=function(t)
{
n.DesignView.ObjectSelector.Hide(t)
},Object.defineProperty(n,"Visible",{
get:function()
{
return n.visible
},
set:function(t)
{
n.visible=t,n.VisualElement.style.display=t
}
}),n.PanDiv.onclick=function(t)
{
n.OnControlSelected(t),n.Click(t)
},n.Click=function(){},n.OnControlSelected=function(t)
{
var i=n.Control.NSSN+"_"+n.Control.ObjType;
n.Control.ObjImageUrl=DBFX.Design.ToolkitBox.ToolkitItems[i]!=undefined?DBFX.Design.ToolkitBox.ToolkitItems[i].ImageUrl:undefined,t!=undefined&&(t.preventDefault(),t.cancelBubble=!0),n.DesignView.ObjectSelector.IsInitializing=1,n.ShowSelector(),n.DesignView.ObjectSelector.IsInitializing=0,n.DesignView.OnObjectSelected(n.Control)
},n.ShowSelector=function()
{
if(n.Control.IsShowSelector!=undefined)
return;
n.DesignView.ObjectSelector.IsInitializing=1,n.DesignView.ObjectSelector.Show(n),n.DesignView.ObjectSelector.IsInitializing=0
},n.PanDiv.onmousedown=function(t)
{
t.preventDefault(),t.cancelBubble=!0,t.button==2&&n.ShowSelector()
},n.PanDiv.onmouseup=function(n)
{
n.preventDefault(),n.cancelBubble=!0
},n.PanDiv.DropControl=function(i)
{
if(i.Parent==n.Control)
return;
i.Parent!=undefined&&i.Parent.Remove(i),i.Position=t,i.Top="",i.Left="",n.Control.AddControl(i)
},n.PanDiv.DropInsertControl=function(i,r)
{
if(r.Parent!=i.Parent)
return;
i.Parent.Remove(i),i.Position=t,i.Top="",i.Left="",n.Control.InsertControl(i,r)
},n.PanDiv.GetHostControl=function()
{
return n.Control
},n.PanDiv.IsContainer=function()
{
return n.Control.IsContainer
},n.Control=null,n
},DBFX.Design.ObjectSelector=function()
{
var u=!0,
h="mousemove",
e=null,
s="absolute",
r="none",
f=!1,
i="",
o="block",
t="px",
n=new DBFX.Web.Controls.Control("ObjectSelector");
return n.VisualElement=document.createElement("DIV"),n.OnCreateHandle(),n.VisualElement.className="VDE_Design_ObjectSelector",n.VisualElement.innerHTML='<DIV class="VDE_Design_ObjectSelectorSizing"> </DIV><IMG class="VDE_Design_ObjectSelectorSetting"></IMG><DIV class="VDE_Design_ObjectSelectorSizingWE"></DIV><DIV class="VDE_Design_ObjectSelectorSizingNS"></DIV><DIV class="VDE_Design_ObjectSelectorSizingNST"></DIV><DIV class="VDE_Design_ObjectSelectorSizingWEL"></DIV>',n.SizeEdge=n.VisualElement.querySelector("DIV.VDE_Design_ObjectSelectorSizing"),n.SizeEdgeWE=n.VisualElement.querySelector("DIV.VDE_Design_ObjectSelectorSizingWE"),n.SizeEdgeNS=n.VisualElement.querySelector("DIV.VDE_Design_ObjectSelectorSizingNS"),n.SizeEdgeWEL=n.VisualElement.querySelector("DIV.VDE_Design_ObjectSelectorSizingWEL"),n.SizeEdgeNST=n.VisualElement.querySelector("DIV.VDE_Design_ObjectSelectorSizingNST"),n.SettingButton=n.VisualElement.querySelector("IMG.VDE_Design_ObjectSelectorSetting"),n.SettingButton.src="design/themes/"+app.CurrentTheme+"/images/settings.png",n.DP=n.VisualElement,n.IsInitializing=0,n.Initialize=function(t)
{
n.Control=t,n.ContextMenu=DBFX.Web.Controls.ContextMenu.ContextMenus.VDE_Design_DesignViewControlContextMenu,n.ReLocationSelector(t),n.Control.PropertyChanged=new EventHandler(n.ControlPropertyChanged,1),n.DesignView.CurrentControl=t
},n.ReLocationSelector=function(u)
{
var h="1px",
c="0px",
l=n.GetOffsetByParent(u.VisualElement,n.ControlView),
a={
left:l.offsetLeft,
top:l.offsetTop,
width:u.VisualElement.offsetWidth,
height:u.VisualElement.offsetHeight
},
p=n.DesignView.ScaleX,
v=n.DesignView.ScaleY,
y=n.DesignView.ZoomScale,
e=a;
n.VisualElement.style.left=e.left-2+t,n.VisualElement.style.top=e.top-2+t,n.VisualElement.style.width=e.width+2+t,n.VisualElement.style.height=e.height+2+t,n.VisualElement.style.display=o,n.SizeEdge.style.display=i,n.SizeEdgeNS.style.display=i,n.SizeEdgeWE.style.display=i,n.SizeEdgeNST.style.display=i,n.SizeEdgeWEL.style.display=i,n.Control.IsCanResize!=f&&n.Control.IsCanResize>0||(n.SizeEdge.style.display=r,n.SizeEdgeNS.style.display=r,n.SizeEdgeWE.style.display=r,n.SizeEdgeNST.style.display=r,n.SizeEdgeWEL.style.display=r),n.Control.IsCanResize==-1&&(n.SizeEdgeWE.style.display=i),n.Control.IsCanResize==-2&&(n.SizeEdgeNS.style.display=i),n.SettingButton.style.display=i,n.Control.IsCanSetting==0&&(n.SettingButton.style.display=r),n.SizeEdgeNS.style.left=e.width/2-4+t,n.SizeEdgeNST.style.left=e.width/2-4+t,n.SizeEdgeWE.style.top=e.height/2-4+t,n.SizeEdgeWEL.style.top=e.height/2-4+t,u.Position==s&&(n.SizeEdge.style.display=r,n.SizeEdgeNS.style.display=r,n.SizeEdgeWE.style.display=r,n.SizeEdgeNST.style.display=r,n.SizeEdgeWEL.style.display=r,u.Top!=c&&(n.SizeEdgeNST.style.display=i,u.VisualElement.clientHeight==0&&(u.Height=h)),u.Left!=c&&(n.SizeEdgeWEL.style.display=i,u.VisualElement.clientWidth==0&&(u.Width=h)),u.Right!=c&&(n.SizeEdgeWE.style.display=i,u.VisualElement.clientWidth==0&&(u.Width=h)),u.Bottom!=c&&(n.SizeEdgeNS.style.display=i,u.VisualElement.clientHeight==0&&(u.Height=h))),(u.Position==i||u.Position=="relative")&&(n.SizeEdgeNST.style.display=r,n.SizeEdgeWEL.style.display=r)
},n.ControlPropertyChanged=function(t,i)
{
if(n.IsInitializing==1)
return;
"LeftTopBottomRightWidthHeightMinHeightMinWidth".indexOf(t)<0||n.ReLocationSelector(n.Control),n.DesignView.OnContentChanged(i)
},n.sop=e,n.csz=e,n.Sizing=f,n.SizingEdge=undefined,n.RSElement=undefined,n.SizeEdge.onmousedown=function(t)
{
if(n.Control.IsCanResize==0)
return;
n.SizingEdge=t.srcElement,n.SizingEdge.setCapture!=undefined?(n.SizingEdge.setCapture(),n.SizingEdge.onmouseup=n.SizeEdge.onmouseup,n.SizingEdge.onmousemove=n.SizeEdge.onmousemove):(n.SizingEdge.onmouseup=undefined,n.SizingEdge.onmousemove=undefined,document.body.addEventListener("mouseup",n.SizeEdge.onmouseup),document.body.addEventListener(h,n.SizeEdge.onmousemove)),n.sop={},n.sop.x=t.screenX,n.sop.y=t.screenY,n.csz={
w:n.Control.ClientDiv.clientWidth,
h:n.Control.ClientDiv.clientHeight,
l:n.Control.VisualElement.clientLeft,
t:n.Control.VisualElement.clientTop
},n.Sizing=u,t.preventDefault(),t.cancelBubble=u
},n.SizeEdge.onmousemove=function(t)
{
t.preventDefault(),t.cancelBubble=u,n.ResizeControl(t)
},n.SizeEdge.onmouseup=function(t)
{
n.SizingEdge.setCapture!=undefined?n.SizingEdge.releaseCapture():(document.body.removeEventListener("mouseup",n.SizeEdge.onmouseup),document.body.removeEventListener(h,n.SizeEdge.onmousemove)),n.DesignView.OnObjectSelected(n.Control),n.Sizing=f,n.sop=undefined,n.csz=undefined,t.preventDefault(),t.cancelBubble=u
},n.SizeEdgeNS.onmousedown=n.SizeEdge.onmousedown,n.SizeEdgeNST.onmousedown=n.SizeEdge.onmousedown,n.SizeEdgeWE.onmousedown=n.SizeEdge.onmousedown,n.SizeEdgeWEL.onmousedown=n.SizeEdge.onmousedown,n.ResizeControl=function(r)
{
var h,
s,
u,
f,
c,
o;
n.sop!=e&&n.Sizing&&(h=r.screenX-n.sop.x,s=r.screenY-n.sop.y,(n.SizingEdge==n.SizeEdgeNST||n.SizingEdge==n.SizeEdgeWEL)&&(h=n.sop.x-r.screenX,s=n.sop.y-r.screenY),u=n.csz.w+h,f=n.csz.h+s,n.SizingEdge==n.SizeEdge&&(n.VisualElement.style.width=u+3+t,n.VisualElement.style.height=f+3+t,n.Control.Width=u+t,n.Control.Height=f+t),n.SizingEdge==n.SizeEdgeNS&&(n.VisualElement.style.height=f+3+t,n.Control.Height=f+t),n.SizingEdge==n.SizeEdgeNST&&(n.VisualElement.style.height=f+3+t,n.Control.Height=f+t,n.Control.Top!=i&&(c=(n.csz.t-s)/n.ScaleY/n.ZoomScale,n.Control.Top=c+t)),n.SizingEdge==n.SizeEdgeWE&&(n.VisualElement.style.width=u+3+t,n.Control.Width=u+t),n.SizingEdge==n.SizeEdgeWEL&&(n.VisualElement.style.width=u+3+t,n.Control.Width=u+t),o=n.VisualElement.getBoundingClientRect(),n.SizeEdgeNS.style.left=o.width/2-4+t,n.SizeEdgeWE.style.top=o.height/2-4+t,n.SizeEdgeNST.style.left=o.width/2-4+t,n.SizeEdgeWEL.style.top=o.height/2-4+t),n.ReLocationSelector(n.Control)
},n.dop=undefined,n.dlp=undefined,n.IsDragControl=f,n.GetOffsetByParent=function(r,u,f)
{
var e="0123456789";
return f==undefined?f={
offsetLeft:r.offsetLeft,
offsetTop:r.offsetTop
}:(f.offsetLeft+=r.offsetLeft,f.offsetTop+=r.offsetTop,r.scrollTop!=0&&(f.offsetTop-=r.scrollTop),r.scrollLeft!=0&&(f.offsetLeft-=r.scrollLeft),r.currentStyle!=undefined&&(r.currentStyle.borderLeftWidth!=i||r.currentStyle.borderTopWidth!=i)?(e.indexOf(r.currentStyle.borderTopWidth.substring(0,1))<0||(f.offsetTop+=r.currentStyle.borderTopWidth.replace(t,i)*1),e.indexOf(r.currentStyle.borderLeftWidth.substring(0,1))<0||(f.offsetLeft+=r.currentStyle.borderLeftWidth.replace(t,i)*1)):(r.style.borderLeftWidth!=i||r.style.borderTopWidth!=i)&&(e.indexOf(r.style.borderTopWidth.substring(0,1))<0||(f.offsetTop+=r.style.borderTopWidth.replace(t,i)*1),e.indexOf(r.style.borderLeftWidth.substring(0,1))<0||(f.offsetLeft+=r.style.borderLeftWidth.replace(t,i)*1))),r.offsetParent!=undefined&&r.offsetParent!=u&&r.offsetParent!=document.body&&n.GetOffsetByParent(r.offsetParent,u,f),f
},n.DP.onmousedown=function(t)
{
t.cancelBubble=u;
if(n.Control.IsCanMove==0)
return;
t.button==0&&n.dop==undefined&&(n.dop={},n.dop.x=t.pageX,n.dop.y=t.pageY,n.op={},n.op.x=n.Control.VisualElement.offsetLeft-2,n.op.y=n.Control.VisualElement.offsetTop-2,n.sop={},n.sop.x=n.DP.offsetLeft,n.sop.y=n.DP.offsetTop,n.DesignView.ControlViewCover.style.display=o,n.DesignView.ControlViewCover.onmousemove=n.DP.onmousemove,n.DesignView.ControlViewCover.onmouseup=n.DP.onmouseup)
},n.DP.onmousemove=function(r)
{
var f;
if(r.button==0&&n.dop!=undefined)
{
var a=n.DesignView.ScaleX,
v=n.DesignView.ScaleY,
l=n.DesignView.ZoomScale,
e=n.Control.VisualElement.style.marginLeft.replace(t,i)*1;
e=e==i?0:e*1-2,f=n.Control.VisualElement.style.marginTop.replace(t,i),f=f==i?0:f*1-2;
var o=(r.pageX-n.dop.x)/a/l,
h=(r.pageY-n.dop.y)/v/l,
c=n.Control.VisualElement.getBoundingClientRect();
n.Control.MinWidth==i&&(n.Control.MinWidth=c.width+t),n.Control.MinHeight==i&&(n.Control.MinHeight=c.height+t),n.Control.Position=s,n.Control.VisualElement.style.left=n.op.x+o-e+t,n.Control.VisualElement.style.top=n.op.y+h-f+t,n.DP.style.left=n.sop.x+o+t,n.DP.style.top=n.sop.y+h+t,n.IsDragControl=u
}
r.cancelBubble=u
},n.DP.onmouseup=function(t)
{
n.DesignView.ControlViewCover.style.display=r,n.dop=undefined,n.op=undefined,n.sop=undefined,t.cancelBubble=u,n.DropHitTest(t),n.TargetContainer!=undefined&&n.IsDragControl==u&&(n.TargetType==0?n.TargetContainer.DropControl(n.Control):n.TargetContainer.DropInsertControl(n.Control,n.TargetControl)),n.TargetContainer=undefined,n.TargetType=0,n.TargetControl=undefined,n.IsDragControl=f
},n.TargetContainer=undefined,n.TargetType=0,n.DropHitTest=function(t)
{
var f="-1000px",
e,
s;
n.DP.style.display=r,e=n.DP.style.left,s=n.DP.style.top,n.DP.style.left=f,n.DP.style.top=f;
var l=n.Control.VisualElement.style.display,
c=n.Control.VisualElement.style.left,
a=n.Control.VisualElement.style.top;
n.Control.VisualElement.style.display=r,n.Control.VisualElement.style.left=f,n.Control.VisualElement.style.top=f;
var v=t.pageX,
h=t.pageY,
i=document.elementFromPoint(v,h);
n.DP.style.left=e,n.DP.style.top=s,n.DP.style.display=o,n.Control.VisualElement.style.left=c,n.Control.VisualElement.style.top=a,n.Control.VisualElement.style.display=l,i.className=="VDE_Design_ControlDP"&&i.IsContainer()==u||i.className=="VDE_DesignView"?(n.TargetContainer=i,n.TargetType=0):i.GetHostControl!=undefined?(n.TargetControl=i.GetHostControl(),n.TargetContainer=n.TargetControl.Parent==n.DesignView?n.DesignView.ControlView:n.TargetControl.Parent.VisualElement.querySelector("DIV.VDE_Design_ControlDP"),n.TargetType=1):n.TargetContainer=undefined
},n.DP.oncontextmenu=function(t)
{
t.preventDefault(),t.cancelBubble=u,n.ShowContextMenu(t)
},n.ShowDesigner=function(){},n.CloseDesigner=function(){},n.IsShow=0,n.Hide=function()
{
try
{
n.ControlView.removeChild(n.VisualElement),n.Control!=undefined&&n.Control!=e&&(n.Control.PropertyChanged=new EventHandler(n.ControlPropertyChanged,0)),document.body.onmousedown=undefined
}
catch(i)
{
document.body.onmousedown=undefined
}
n.IsShow=0
},n.Show=function(t)
{
n.IsShow=1,n.ControlView.appendChild(n.VisualElement),n.FormContext=t.DesignView.FormContext,n.DataContext=t.Control,n.Initialize(t.Control),document.body.onmousedown=n.Hide
},n
},DBFX.Design.ObjectEditor=function()
{
var t=new DBFX.Web.Controls.Panel("ObjectEditor");
return t.DesignerInstances={},t.Class="VDE_Design_ObjectEditor",t.Designers=[],t.ClientDiv=t.VisualElement,t.OnCreateHandle=function()
{
t.FormContext={},t.FormControls={},t.FormContext.Form=t,DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ObjectEditor.scrp",function(n)
{
n.DataContext=t.dataContext,t.DesignersPanel=t.FormContext.Form.FormControls.pnlDesigners,t.cbxObjects=t.FormContext.Form.FormControls.cbxObjects,t.ObjectsPanel=t.FormContext.Form.FormControls.pnlObjects,t.cbxObjects.SelectedItemChanged=function(n,t)
{
var i=t.dataContext.Control;
i.DesignPan!=undefined&&i.DesignPan.OnControlSelected(event)
}
},t)
},t.AddDesigner=function(n)
{
t.DesignersPanel!=null&&t.DesignersPanel!=undefined&&(t.Designers.push(n),t.DesignersPanel.AddControl(n))
},t.Initialize=function(n)
{
try
{
t.DesignView=n,t.DesignView.OnObjectSelected=t.ObjectSelected,t.DesignView.ObjectEditor=t
}
catch(i)
{
alert("Initialize Exception:"+i.toString())
}
},t.ObjectSelected=function(n)
{
var f,
s,
u,
h,
c,
e,
r,
i,
o;
try
{
if(n!==t.dataContext)
{
for(f=0;f<t.Designers.length;f++)
s=t.Designers[f],t.DesignersPanel.Remove(s);
t.Designers.splice(0,t.Designers.length);
if(n!=undefined)
{
u=n.ClassDescriptor.Designers;
if(u!=undefined&&Array.isArray(u))
for(i=0;i<u.length;i++)
h=u[i],c=t.CreateDesignerInstance(h),t.AddDesigner(c)
}
}
if(n!=undefined&&(n.IsContainer||n.ObjType=="FormDesignView"||n.ObjType=="MobileFormView"))
{
for(e=[],r=n.Controls,r==undefined&&(r=n.DesignView.Controls),i=0;i<r.length;i++)
o={
ObjectTitle:r[i].ObjType+"["+r[i].Name+"]",
ObjType:r[i].ObjType,
Control:r[i]
},e.Add(o);
t.cbxObjects.ItemSource=e,t.ObjectsPanel.Display="block"
}
else
t.cbxObjects.ItemSource=[],t.ObjectsPanel.Display="none";
t.DataContext=n
}
catch(l)
{
alert("Object Selected Exception:"+l.toString())
}
},t.CreateDesignerInstance=function(n)
{
var u=n.replace(".","_"),
i=t.DesignerInstances[u],
r;
return i==undefined&&(r="new "+n+"()",i=eval(r),t.DesignerInstances[u]=i),i
},t.MouseDown=function(n)
{
n.cancelBubble=!0
},t.MouseUp=function(n)
{
n.cancelBubble=!0
},t.OnCreateHandle(),t
},DBFX.Design.FormView=function()
{
var i="text/xml",
t="0px",
r="FormDesignView",
n=new DBFX.Web.Controls.Control(r);
return n.ClassDescriptor.Serializer="",n.ClassDescriptor.Designers=["DBFX.Design.ControlDesigners.ObjectGeneralDesigner","DBFX.Design.ControlDesigners.FormDesigner","DBFX.Design.ControlDesigners.LayoutDesigner","DBFX.Design.ControlDesigners.ContainerDesigner","DBFX.Design.ControlDesigners.BBCDesigner","DBFX.Design.ControlDesigners.FontDesigner"],n.ObjType=r,n.OnCreateHandle(),n.VisualElement.className="VDE_Design_FormView",n.VisualElement.innerHTML='<DIV  class="VDE_Design_FormViewHeader"><IMG class="VDE_Design_FormViewHeadImage"></IMG><SPAN class="VDE_Design_FormViewHeadSpan"></SPAN></DIV><DIV class="VDE_Design_FormViewClient"></DIV><DIV class="VDE_Design_FormViewSizeEdge"></DIV>',n.ClientDiv=n.VisualElement,n.FormClient=n.VisualElement.querySelector("DIV.VDE_Design_FormViewClient"),n.HeaderSpan=n.VisualElement.querySelector("SPAN.VDE_Design_FormViewHeadSpan"),n.DesignView=new DBFX.Design.DesignView,n.DesignView.Top=t,n.DesignView.Left=t,n.DesignView.Right=t,n.DesignView.Bottom=t,n.DesignView.Position="absolute",n.FormClient.appendChild(n.DesignView.VisualElement),n.SizeEdge=n.VisualElement.querySelector("DIV.VDE_Design_FormViewSizeEdge"),n.DesignView.ContextMenu="VDE_Design_DesignViewContextMenu",n.IsContentChanged=!1,n.DesignView.Parent=n,n.DesignView.FormControls={},n.DesignView.FormContext={},n.DesignView.FormContext.Form=n.DesignView,n.DataBind=function(t)
{
n.DesignView.DataContext=t.Value
},n.DesignView.ContentChanged=function()
{
n.IsContentChanged=!0
},n.SetText=function(t)
{
n.HeaderSpan.innerText=t
},n.GetText=function()
{
return n.HeaderSpan.innerText
},n.AddControl=function(t)
{
n.DesignView.AddControl(t)
},n.SaveToXML=function()
{
var t=(new DOMParser).parseFromString("<screen></screen>",i),
u=t.documentElement,
r=new DBFX.Serializer.FormDesignViewSerializer;
return r.Serialize(n,u),t
},n.LoadXml=function(t)
{
if(t!="")
{
var f=new DOMParser,
u=f.parseFromString(t,i),
r=new DBFX.Serializer.FormDesignViewSerializer;
r.DeSerialize(n,u.documentElement),n.IsContentChanged=!1
}
},n.MouseDown=function()
{
n.DesignView.OnObjectSelected(n)
},n.SizeEdge.onmousedown=function(t)
{
t.button==0&&(t.preventDefault(),t.cancelBubble=!0,n.ReSizeing=1,n.SizeEdge.setCapture!=undefined?n.SizeEdge.setCapture():window.onmouseup=n.ResizeCompleted,n.Size={},n.Size.w=n.VisualElement.clientWidth,n.Size.h=n.VisualElement.clientHeight,n.Size.x=t.screenX,n.Size.y=t.screenY)
},n.SizeEdge.onmousemove=function(t)
{
if(n.ReSizeing==1)
{
t.preventDefault(),t.cancelBubble=!0;
var r=t.screenX-n.Size.x,
i=t.screenY-n.Size.y;
n.VisualElement.style.width=n.Size.w+r+"px",n.VisualElement.style.height=n.Size.h+i+"px"
}
},n.SizeEdge.onmouseup=function()
{
n.ReSizeing&&(n.SizeEdge.releaseCapture!=undefined?n.SizeEdge.releaseCapture():window.onmouseup=undefined,n.ReSizeing=undefined)
},n.ResizeCompleted=function(){},n
},DBFX.Design.MobileFormView=function()
{
var f="text/xml",
i="0px 0px",
r="scale(",
u="landscape",
t="0px",
n=new DBFX.Web.Controls.Control("MobileFormView");
return n.ClassDescriptor.Designers=["DBFX.Design.ControlDesigners.MobileFormViewDesigner"],n.ClassDescriptor.Designers.splice(1,0,"DBFX.Design.ControlDesigners.ContainerDesigner"),n.VisualElement=document.createElement("DIV"),n.OnCreateHandle(),n.VisualElement.className="VDE_Design_MobileFormViewPanel",n.VisualElement.innerHTML='<DIV class="VDE_Design_MobileFormView"><DIV class="VDE_Design_MobileFormViewHeader"><DIV class="VDE_Design_MobileFormViewCamera"></DIV><DIV class="VDE_Design_MobileFormViewSpeaker"></DIV></DIV><DIV class="VDE_Design_MobileFormViewClientBox"><DIV class="VDE_Design_MobileFormViewClient"></DIV></DIV><DIV class="VDE_Design_MobileFormViewHomeBar"><DIV class="VDE_Design_MobileFormViewHomeButton"></DIV></DIV></DIV>',n.FormViewClient=n.VisualElement.querySelector("DIV.VDE_Design_MobileFormViewClient"),n.FormViewClientBox=n.VisualElement.querySelector("DIV.VDE_Design_MobileFormViewClientBox"),n.HeaderDiv=n.VisualElement.querySelector("DIV.VDE_Design_MobileFormViewHeader"),n.HomeBarDiv=n.VisualElement.querySelector("DIV.VDE_Design_MobileFormViewHomeBar"),n.SpeakerDiv=n.VisualElement.querySelector("DIV.VDE_Design_MobileFormViewSpeaker"),n.CameraDiv=n.VisualElement.querySelector("DIV.VDE_Design_MobileFormViewCamera"),n.DesignView=new DBFX.Design.DesignView,n.DesignView.Top=t,n.DesignView.Left=t,n.DesignView.Right=t,n.DesignView.Bottom=t,n.DesignView.Position="absolute",n.FormViewClient.appendChild(n.DesignView.VisualElement),n.DesignView.ContextMenu="VDE_Design_DesignViewContextMenu",n.IsContentChanged=!1,n.DesignView.FormControls={},n.DesignView.FormContext={},n.DesignView.FormContext.Form=n.DesignView,n.DesignView.Parent=n,Object.defineProperty(n,"DeviceType",{
get:function()
{
return n.deviceType
},
set:function(t)
{
n.deviceType=t
}
}),Object.defineProperty(n,"DeviceSize",{
get:function()
{
return n.deviceSize
},
set:function(t)
{
n.deviceSize=t
}
}),n.viewHeight=1280,Object.defineProperty(n,"ViewHeight",{
get:function()
{
return n.viewHeight
},
set:function(t)
{
n.viewHeight=t,n.SetViewSize()
}
}),n.viewWidth=800,Object.defineProperty(n,"ViewWidth",{
get:function()
{
return n.viewWidth
},
set:function(t)
{
n.viewWidth=t,n.SetViewSize()
}
}),n.SetViewSize=function()
{
var e="px",
f,
t;
n.deviceOrientation==u?((n.viewWidth==undefined||n.viewWidth==0)&&(n.viewWidth=n.FormViewClientBox.clientWidth),(n.viewHeight==undefined||n.viewHeight==0)&&(n.viewHeight=n.FormViewClientBox.clientHeight),n.FormViewClient.style.width=n.viewHeight+e,n.FormViewClient.style.height=n.viewWidth+e,f=n.FormViewClientBox.clientWidth/(n.viewHeight*1),t=n.FormViewClientBox.clientHeight/(n.viewWidth*1),n.FormViewClient.style.transform=r+f+","+t+")",n.FormViewClient.style.transformOrigin=i,n.DesignView.ScaleX=f,n.DesignView.ScaleY=t):((n.viewWidth==undefined||n.viewWidth==0)&&(n.viewWidth=n.FormViewClientBox.clientWidth),(n.viewHeight==undefined||n.viewHeight==0)&&(n.viewHeight=n.FormViewClientBox.clientHeight),n.FormViewClient.style.width=n.viewWidth+e,n.FormViewClient.style.height=n.viewHeight+e,f=n.FormViewClientBox.clientWidth/(n.viewWidth*1),t=n.FormViewClientBox.clientHeight/(n.viewHeight*1),n.FormViewClient.style.transform=r+f+","+t+")",n.FormViewClient.style.transformOrigin=i,n.DesignView.ScaleX=f,n.DesignView.ScaleY=t)
},n.DataBind=function(t)
{
n.DesignView.DataContext=t.Value
},n.deviceHeight=12,Object.defineProperty(n,"DeviceHeight",{
get:function()
{
return n.deviceHeight
},
set:function(t)
{
n.deviceHeight=t,n.SetDeviceSize()
}
}),n.deviceWidth=6.75,Object.defineProperty(n,"DeviceWidth",{
get:function()
{
return n.deviceWidth
},
set:function(t)
{
n.deviceWidth=t,n.SetDeviceSize()
}
}),n.SetDeviceSize=function()
{
var t="in";
n.deviceOrientation==u?(n.VisualElement.style.height=n.deviceWidth*1+.04+t,n.VisualElement.style.minHeight=n.VisualElement.style.height,n.VisualElement.style.width=n.deviceHeight*1+1+t,n.VisualElement.style.minWidth=n.VisualElement.style.width):(n.VisualElement.style.height=n.deviceHeight*1+1+t,n.VisualElement.style.minHeight=n.VisualElement.style.height,n.VisualElement.style.width=n.deviceWidth*1+.04+t,n.VisualElement.style.minWidth=n.VisualElement.style.width)
},Object.defineProperty(n,"DeviceOrientation",{
get:function()
{
return n.deviceOrientation
},
set:function(t)
{
n.deviceOrientation!=t&&(n.deviceOrientation=t,n.SetFormViewOrientation())
}
}),Object.defineProperty(n,"DeviceBackgroundColor",{
get:function()
{
return n.deviceBackgroundColor
},
set:function(t)
{
n.deviceBackgroundColor!=t&&(n.deviceBackgroundColor=t,n.VisualElement.style.backgroundColor=t)
}
}),n.formViewScale=100,Object.defineProperty(n,"FormViewScale",{
get:function()
{
return n.formViewScale
},
set:function(t)
{
n.formViewScale=t,n.DesignView.ZoomScale=t/100,n.ScaleView(t/100)
}
}),n.ScaleView=function(t)
{
n.VisualElement.style.transform=r+t+")",n.VisualElement.style.transformOrigin=i
},n.SetFormViewOrientation=function()
{
n.deviceOrientation==u?(n.HeaderDiv.className="VDE_Design_MobileFormViewHeaderLandscape",n.HomeBarDiv.className="VDE_Design_MobileFormViewHomeBarLandscape",n.FormViewClientBox.className="VDE_Design_MobileFormViewClientBoxLandscape",n.SpeakerDiv.className="VDE_Design_MobileFormViewSpeakerLandscape",n.CameraDiv.className="VDE_Design_MobileFormViewCameraLandscape"):(n.HeaderDiv.className="VDE_Design_MobileFormViewHeader",n.HomeBarDiv.className="VDE_Design_MobileFormViewHomeBar",n.FormViewClientBox.className="VDE_Design_MobileFormViewClientBox",n.SpeakerDiv.className="VDE_Design_MobileFormViewSpeaker",n.CameraDiv.className="VDE_Design_MobileFormViewCamera"),n.SetDeviceSize(),n.SetViewSize()
},n.DesignView.ContentChanged=function()
{
n.IsContentChanged=!0
},n.MouseDown=function()
{
n.DesignView.OnObjectSelected(n)
},n.AddControl=function(t)
{
n.DesignView.AddControl(t)
},n.LoadXml=function(t)
{
if(t!="")
{
var u=new DOMParser,
r=u.parseFromString(t,f),
i=new DBFX.Serializer.FormDesignViewSerializer;
i.DeSerialize(n,r.documentElement),n.IsContentChanged=!1
}
},n.SaveToXML=function()
{
var t=(new DOMParser).parseFromString("<screen></screen>",f),
r=t.documentElement,
i=new DBFX.Serializer.FormDesignViewSerializer;
return i.Serialize(n,r),t
},n.SetBackgroundColor=function(t)
{
n.FormViewClient.style.backgroundColor=t,n.OnPropertyChanged("BackgroundColor",t)
},n.SetBackgroundImageUrl=function(t)
{
n.FormViewClient.style.backgroundImage=t,n.OnPropertyChanged("backgroundImage",t)
},n.SetBackgroundSizeMode=function(t)
{
n.FormViewClient.style.backgroundSize=t,n.OnPropertyChanged("BackgroundSizeMode",t)
},n
},DBFX.Design.ToolkitBox=function()
{
var n=new DBFX.Web.Controls.Control("ToolKitBox");
return n.OnCreateHandle(),n.VisualElement.className="VDE_ToolKitBox",n.OnCreateHandle=function()
{
n.ClientDiv=n.VisualElement
},n.LoadTKItems=function(t)
{
LuckyCloud.MetaData.QueryMDTreeByName2Id(t,function(t)
{
if(t.State==0)
{
var i=JSON.parse(t.JSonData);
n.ItemSource=i
}
else
alert(t.Exception)
})
},n.MouseDown=function(){},Object.defineProperty(n,"ItemSource",{
get:function()
{
return n.itemsource
},
set:function(t)
{
n.itemsource=t,n.CreateList()
}
}),n.CreateList=function()
{
for(var i,
t=0;t<n.itemsource.length;t++)
i=new DBFX.Design.ToolkitBIGroup,n.ClientDiv.appendChild(i.VisualElement),i.DataContext=n.itemsource[t]
},n.OnCreateHandle(),n
},DBFX.Design.ToolkitBox.ToolkitItems={},DBFX.Design.ToolkitBIGroup=function()
{
var n=new DBFX.Web.Controls.Control("ToolKitBoxGroup");
return n.OnCreateHandle(),n.OnCreateHandle=function()
{
var i="/Images/ToolkitBox/E.png",
t="design/themes/";
n.VisualElement.innerHTML='<DIV class="VDE_ToolkitBoxItemGroupHeader"><SPAN class="VDE_ToolkitBoxItemGroupHeaderSPAN"></SPAN><IMG class="VDE_ToolkitBoxItemGroupHeaderECIMG"></IMG></DIV><DIV class="VDE_ToolkitBoxItemGroupPanel"></DIV>',n.TitleSpan=n.VisualElement.querySelector("SPAN.VDE_ToolkitBoxItemGroupHeaderSPAN"),n.ECImg=n.VisualElement.querySelector("IMG.VDE_ToolkitBoxItemGroupHeaderECIMG"),n.GroupDiv=n.VisualElement.querySelector("DIV.VDE_ToolkitBoxItemGroupPanel"),n.ECImg.src=t+app.CurrentTheme+i,n.ECImg.onclick=function()
{
n.GroupDiv.style.display==""?(n.ECImg.src=t+app.CurrentTheme+"/Images/ToolkitBox/C.png",n.GroupDiv.style.display="none"):(n.ECImg.src=t+app.CurrentTheme+i,n.GroupDiv.style.display="")
}
},n.DataContextChanged=function()
{
n.TitleSpan.innerText=n.dataContext.Title,n.CreateList()
},n.CreateList=function()
{
for(var r=n.DataContext.Items,
i,
t=0;t<r.length;t++)
i=new DBFX.Design.ToolkitBoxItem,n.GroupDiv.appendChild(i.VisualElement),i.DataContext=r[t]
},n.OnCreateHandle(),n
},
    DBFX.Design.ToolkitBoxItem=function()
{
    var n=new DBFX.Web.Controls.Control("ToolKitBox");
    return n.OnCreateHandle(),
    n.OnCreateHandle=function() {
    n.VisualElement.innerHTML='<DIV class="VDE_ToolKitBoxItem"><IMG class="VDE_ToolkitBoxItemIMG"></IMG><BR /><SPAN class="VDE_ToolkitBoxItemSPAN"></SPAN></DIV>',
        n.ClientDiv=n.VisualElement.children[0],
        n.ItemImage=n.VisualElement.querySelector("IMG.VDE_ToolkitBoxItemIMG"),
        n.ItemSpan=n.VisualElement.querySelector("SPAN.VDE_ToolkitBoxItemSPAN"),
        n.ClientDiv.draggable=!0,
        n.ItemImage.draggable=!1,
        n.ClientDiv.ondragstart=function(t) {
            var i=t.currentTarget;
            i!=null&&i.draggable!=undefined&&i.draggable==!0&&(t.dataTransfer.effectAllowed="move",n.dataContext.x=t.offsetX,n.dataContext.y=t.offsetY,DBFX.Web.Controls.Context.DragObject=n.dataContext)

    }

    },
        n.DataContextChanged=function() {
            LuckyCloud.MetaData.ArrayProperties(n.dataContext),
                n.Text=n.dataContext.Title,
                n.ImageUrl=n.dataContext.Properties.ImageUrl.Value;
var i=n.dataContext.Properties.NSSN.Value+"_"+n.dataContext.Properties.ControlType.Value;
DBFX.Design.ToolkitBox.ToolkitItems[i]=n
},
        Object.defineProperty(n,"ImageUrl",{
get:function()
{
return n.imageurl
},
set:function(t)
{
n.imageurl=t.replace("%currenttheme%",app.CurrentTheme),n.ItemImage.src=n.imageurl
}
}),n.SetText=function(t)
{
n.ItemSpan.innerText=t
},n.OnCreateHandle(),n
},DBFX.Design.FormContextListBox=function()
{
var n=DBFX.Web.Controls.ComboTreeBox();
return n.TreeListView.BorderWidth="0px",n.formctx={
Text:"\u6570\u636e\u57df",
ImageUrl:"",
Value:"FormContext",
Type:0
},n.envlist={
Text:"\u73af\u5883\u53d8\u91cf",
ImageUrl:"",
Value:"",
Type:0
},n.ItemSource=[{
Text:"\u56fa\u5b9a\u503c\u53c2\u6570",
ImageUrl:"",
Value:"",
Type:0
},n.formctx,n.envlist],n.DataBind=function(t)
{
var s="propertychanged propertychangedcbs",
h="function",
o="FormContext.",
c="undefined",
i,
f,
e,
r,
u;
try
{
if(n.Control==t.Value.Control)
return;
t.Value.Control!=undefined&&(n.Control=t.Value.Control);
if(n.Control==undefined)
return;
n.TreeListView.FormContext=n.FormContext,n.TreeListView.Nodes[1].ClearNodes();
for(i in n.Control.FormContext)
{
if(i.toLowerCase()=="gettype"||i.toLowerCase()==c||i==""||i.indexOf("PropertyChanged")>=0)
continue;
f=n.Control.FormContext[i];
if(typeof f=="object"&&f.GetType()=="DataDomain")
{
e=n.TreeListView.CreateTreeNode(),n.TreeListView.Nodes[1].AddNode(e),e.DataContext={
Text:i,
Value:o+i,
Type:1
};
for(r in f)
{
if(typeof f[r]==h||r.toLowerCase()=="gettype"||r.toLowerCase()==c||s.indexOf(r.toLowerCase())>=0)
continue;
u=n.TreeListView.CreateTreeNode(),e.AddNode(u),u.DataContext={
Text:r,
Value:o+i+"."+r,
Type:1
}
}
}
else
{
if(typeof f==h||s.indexOf(i.toLowerCase())>=0)
continue;
u=n.TreeListView.CreateTreeNode(),n.TreeListView.Nodes[1].AddNode(u),u.DataContext={
Text:i,
Value:o+i,
Type:1
}
}
}
}
catch(l){}
},n
},DBFX.Design.FormControlsListBox=function()
{
var n=DBFX.Web.Controls.ComboTreeBox();
return n.TreeListView.BorderWidth="0px",n.formctrls={
Text:"\u547d\u540d\u63a7\u4ef6\u5217\u8868",
Value:"",
ImageUrl:"",
Type:0
},n.ItemSource=[{
Text:"\u9759\u6001\u65b9\u6cd5",
Value:"-1",
ImageUrl:"",
Type:0
},n.formctrls],n.DataBind=function(t)
{
var i,
r,
u;
try
{
if(t.Value==undefined)
return;
n.Control=t.Value.Control;
if(n.Control==undefined)
return;
n.TreeListView.FormContext=n.FormContext,n.TreeListView.Nodes[1].ClearNodes();
for(i in n.Control.FormContext.Form.FormControls)
{
r=n.Control.FormContext.Form.FormControls[i];
if(r==undefined||typeof r=="function"||Array.isArray(r)||i.toLowerCase()=="gettype"||i.toLowerCase()=="undefined"||i.indexOf("PropertyChanged")>=0)
continue;
u=n.TreeListView.CreateTreeNode(),n.TreeListView.Nodes[1].AddNode(u),u.DataContext={
Text:i,
Value:"FormControls."+i,
Type:1
}
}
}
catch(f){}
},n
},DBFX.Design.ObjectProeprtiesListBox=function()
{
var n=new DBFX.Web.Controls.TreeListView;
return n.DataBind=function(t)
{
var f,
r,
i,
u;
if(n.Object==t.Value)
return;
n.Clear(),n.Object=t.Value;
if(n.Object!=undefined)
for(f=Object.getOwnPropertyNames(n.Object).sort(),r=0;r<f.length;r++)
{
i=f[r],u=Object.getOwnPropertyDescriptor(n.Object,i);
if(u.get==undefined&&u.set==undefined)
continue;
var s=n.CreateTreeNode(),
o=n.Object.Bindings.GetBinding(i),
e={
Text:i,
Value:i,
Instance:n.Object,
Binding:o
};
o!=undefined&&(e.ImageUrl="design/themes/%currenttheme%/images/binding.png"),s.DataContext=e,n.AddNode(s)
}
},n
},DBFX.Design.ObjectProeprtiesTreeBox=function()
{
var n=new DBFX.Web.Controls.ComboTreeBox;
return n.DataBind=function(t)
{
var e,
r,
i,
f,
u;
if(n.Object==t.Value)
return;
n.TreeListView.Clear(),n.Object=t.Value;
if(n.Object!=undefined)
for(e=Object.getOwnPropertyNames(n.Object).sort(),r=0;r<e.length;r++)
{
i=e[r],f=Object.getOwnPropertyDescriptor(n.Object,i);
if(f.get==undefined&&f.set==undefined)
continue;
u=n.TreeListView.CreateTreeNode(),u.DataContext={
Text:i,
Value:i,
Instance:n.Object,
Binding:n.Object[i]
},n.TreeListView.AddNode(u)
}
},n
},DBFX.Design.APIComponentsList=function()
{
var n=new DBFX.Web.Controls.TreeListView;
return n.DisplayMember="Title",n.ImageUrlMember="Properties.ImageUrl.Value",n.LoadApiComponents=function(t,i)
{
LuckyCloud.MetaData.QueryMDTreeByName2Id(t,function(t)
{
var u,
r,
f;
if(t.State==0)
{
for(u=JSON.parse(t.JSonData),r=0;r<u.length;r++)
f=u[r],n.ArrayItems(f);
n.ItemSource=u,n.LoadFormComponents(i),n.LoadFormCodes()
}
else
alert(t.Exception)
},4)
},n.ArrayItems=function(t)
{
LuckyCloud.MetaData.ArrayProperties(t);
if(t.Items==undefined||t.Items.length==0)
return;
for(var i=0;i<t.Items.length;i++)
n.ArrayItems(t.Items[i])
},n.LoadFormCodes=function()
{
n.FormCodeNode==undefined&&(n.FormCodeNode=n.CreateTreeNode(DBFX.Web.Controls.TreeListView.TreeNodeTemplates.TreeListViewNodeTemplate),n.AddNode(n.FormCodeNode),n.FormCodeNode.DataContext={
Title:"\u81ea\u5b9a\u4e49\u5904\u7406\u8fc7\u7a0b",
Properties:{
ImageUrl:{
Value:"design/themes/%currenttheme%/images/wfdesignview/FormCode.png"
}
},
Type:-1
})
},n.LoadFormComponents=function(){},n.TreeListViewSelectedNodeChange=function(t)
{
var e="function",
i,
o,
u,
f,
r;
if(t.Nodes.length>0)
return;
i=t.dataContext,o=i.Type;
switch(o)
{
case 1:
for(u in i.Control)
f=i.Control[u],typeof f!=e&&(r=n.CreateTreeNode(DBFX.Web.Controls.TreeListView.TreeNodeTemplates.TreeListViewNodeTemplate),t.AddNode(r),r.DataContext={
Title:u,
Properties:{
ImageUrl:{
Value:"design/themes/%currenttheme%/images/wfdesignview/pro.png"
}
},
Control:i.Control,
Type:3
});
break;
case 2:
for(u in i.Control)
f=i.Control[u],typeof f==e&&(r=n.CreateTreeNode(DBFX.Web.Controls.TreeListView.TreeNodeTemplates.TreeListViewNodeTemplate),t.AddNode(r),r.DataContext={
Title:u,
Properties:{
ImageUrl:{
Value:"design/themes/%currenttheme%/images/wfdesignview/method.png"
}
},
Control:i.Control,
Type:4
})
}
},n
},DBFX.Design.GeneralDesignTimePreparer=function(n,t)
{
n.VisualElement.appendChild(t.VisualElement),n.VisualElement.style.position="relative"
},DBFX.Design.ListViewDesignTimePreparer=function(n,t)
{
n.DesignPan=t,n.DesignTime=!0,n.VisualElement.appendChild(t.VisualElement),n.VisualElement.style.position="relative",n.VisualElement.style.display="inline-block",setTimeout(function()
{
n.ItemSource=[{
_id:1
},{
_id:2
},{
_id:3
}]
},100)
},DBFX.Design.PanelDesignTimePreparer=function(n,t)
{
var i="0px";
n.VisualElement.appendChild(t.VisualElement),t.VisualElement.style.left=i,t.VisualElement.style.top=i,t.VisualElement.style.bottom=i,t.VisualElement.style.right=i
},DBFX.Design.GroupPanelDesignTimePreparer=function(n,t)
{
var i="0px";
n.VisualElement.insertBefore(t.VisualElement,n.GroupDiv),t.VisualElement.style.left=i,t.VisualElement.style.top=i,t.VisualElement.style.bottom=i,t.VisualElement.style.right=i,n.DesignTime=!0
},DBFX.Design.NavPanelDesignTimePreparer=function(n,t)
{
var i="0px";
n.ClientPanel.appendChild(t.VisualElement),t.VisualElement.style.left=i,t.VisualElement.style.top=i,t.VisualElement.style.bottom=i,t.VisualElement.style.right=i,n.VisualElement.style.border="1px dotted gray",n.Height=n.MinHeight,n.DesignTime=!0
},DBFX.Design.DataGridViewDesignTimePreparer=function(n,t)
{
var i="0px";
n.TBDiv.appendChild(t.VisualElement),t.VisualElement.style.left=i,t.VisualElement.style.top=i,t.VisualElement.style.bottom=i,t.VisualElement.style.right=i,n.DesignTime=!0
},DBFX.Design.GroupBoxDesignTimePreparer=function(n,t)
{
var i="0px";
n.VisualElement.insertBefore(t.VisualElement,n.GroupDiv),t.VisualElement.style.left=i,t.VisualElement.style.top=i,t.VisualElement.style.bottom=i,t.VisualElement.style.right=i,n.DesignTime=!0
},DBFX.Design.BreakLineDesignTimePreparer=function(n,t)
{
n.VisualElement.className="BreakLineDesignTime",n.ClientDiv=n.VisualElement,n.VisualElement.appendChild(t.VisualElement),n.IsCanResize=0,n.IsCanSetting=0,n.VisualElement.style.margin=""
},DBFX.Design.ToolStripDesignTimePreparer=function(n,t)
{
n.VisualElement.appendChild(t.VisualElement),n.VisualElement.style.position="relative",n.VisualElement.style.display="inline-block"
},DBFX.Design.DataTemplateDesignTimePreparer=function(n,t)
{
n.ClientPanel.VisualElement.insertAdjacentElement("beforeBegin",t.VisualElement),n.HostControl.DesignView.SetDesignTimeMode(n.ClientPanel,n),n.ClientPanel.IsCanResize=0
},DBFX.Design.Service.LauchFormDesignView=function(n,t)
{
if(app.MainForm.FormControls.ActivedDockManager.ActiveContent(n.Name)==null)
{
var i=new DBFX.Web.Forms.FormPart("Design/Forms/FormDesignView.scrn",function(r)
{
r.FormControls.VDE_DV_ToolkitBox.LoadTKItems("LC.GAS.ADP.DesignerObjects.Tooltiks.UICollection.Desktop"),r.FormControls.VDE_DV_ObjectEditor.Initialize(r.FormControls.VDE_DV_DesignView.DesignView),t(i),i.LoadResource(n,function(n)
{
r.FormControls.VDE_DV_DesignView.LoadXml(n),r.FormControls.btnFormDesignViewSave.Enabled=!0
})
});
i.ResourceContext=n,app.MainForm.FormControls.ActivedDockManager.AddContent(n.Title,i,3,n.Name)
}
},DBFX.Design.Service.LauchMobileFormDesignView=function(n,t)
{
if(app.MainForm.FormControls.ActivedDockManager.ActiveContent(n.Name)==null)
{
var i=new DBFX.Web.Forms.FormPart("Design/Forms/MobileFormDesignView.scrn",function(r)
{
r.FormControls.VDE_DV_ToolkitBox.LoadTKItems("LC.GAS.ADP.DesignerObjects.Tooltiks.UICollection.Mobile"),r.FormControls.VDE_DV_ObjectEditor.Initialize(r.FormControls.VDE_DV_DesignView.DesignView),t(i),i.LoadResource(n,function(n)
{
r.FormControls.VDE_DV_DesignView.LoadXml(n),r.FormControls.btnFormDesignViewSave.Enabled=!0
}),r.FormControls.VDE_DV_DesignView.SetViewSize()
});
i.ResourceContext=n,app.MainForm.FormControls.ActivedDockManager.AddContent(n.Title,i,3,n.Name)
}
},DBFX.Design.FormView.FormDesignViewClose=function(n)
{
var t=n.Sender.FormContext.Form;
t.FormControls.VDE_DV_DesignView.IsContentChanged==!0?DBFX.Web.Forms.MessageBox.Show("\u6587\u6863\u5185\u5bb9\u53d1\u751f\u6539\u53d8\uff0c\u8981\u653e\u5f03\u4fdd\u5b58\u66f4\u6539,\u5173\u95ed\u7a97\u53e3\u5417?","\u6df1\u84dd\u781a\u53f0\u5f00\u53d1\u8005\u4e2d\u5fc3",function(n)
{
n==1&&t.ContentWindow.Close()
},1):t.ContentWindow.Close()
},app.GlobalCommands.Register("VDE_Design_FormDesignView_FormClose",DBFX.Design.FormView.FormDesignViewClose),DBFX.Design.FormView.FormDesignViewSave=function(n)
{
var t=n.Sender.FormContext.Form;
if(t.FormControls.VDE_DV_DesignView.IsContentChanged==!0)
{
var r=t.FormControls.VDE_DV_DesignView.SaveToXML(),
u=(new XMLSerializer).serializeToString(r.documentElement),
i=undefined;
t.FormControls.VDE_DV_DesignView.ToCode!=undefined&&(i=t.FormControls.VDE_DV_DesignView.ToCode()),t.SaveResource!=undefined?t.SaveResource(t.ResourceContext,u,function(n)
{
t.FormControls.VDE_DV_DesignView.IsContentChanged=!n
},i):DBFX.Web.Forms.MessageBox.Show("\u6ca1\u6709\u4e3a\u8bbe\u8ba1\u5668\u6307\u5b9a\u4fdd\u5b58\u65b9\u6cd5?","\u6df1\u84dd\u781a\u53f0\u5f00\u53d1\u8005\u4e2d\u5fc3",function(){},2)
}
},app.GlobalCommands.Register("VDE_Design_FormDesignView_FormSave",DBFX.Design.FormView.FormDesignViewSave),DBFX.Design.Service.LauchWFDesignView=function(n,t)
{
if(app.MainForm.FormControls.ActivedDockManager.ActiveContent(n.Name)==null)
var i=new DBFX.Web.Forms.FormPart("Design/Forms/WFDesignView.scrn",function(n)
{
n.FormControls.VDE_DV_ToolkitBox.LoadTKItems("LC.GAS.ADP.DesignerObjects.Tooltiks.WFCollection.UIActivities"),n.FormControls.VDE_DV_ObjectEditor.Initialize(n.FormControls.VDE_DV_DesignView),i.DesignView=i.FormControls.VDE_DV_DesignView,i.DesignView.CustomSerializer=new DBFX.Serializer.CustomUIFlowDesinViewSerializer,i.DesignView.ParametersList=new DBFX.Design.WFActivities.ParameterBuilder,i.DesignView.ParametersList.Margin="1px",i.DesignView.ParametersList.Display="block",i.DesignView.ParametersList.IsHasContextMenu=!1,i.DesignView.ParametersList.Namespace="DBFX.Design.WFActivities.Data.DefParas",i.DesignView.ParametersList.NSSN="wfa",i.DesignView.ParametersList.ObjType="DefParas",i.DesignView.ParametersList.MinHeight="32px",i.HideECButton=!1,i.DesignView.ParametersList.Parent=i.DesignView,i.DesignView.ParametersList.DesignView=i.DesignView,Object.defineProperty(i.DesignView,"ParametersStr",{
get:function()
{
return i.DesignView.ParametersList.ParametersStr
},
set:function(n)
{
i.DesignView.ParametersList.ParametersStr=n
}
}),i.DesignView.SequenceRoot.Text="function(){}",i.DesignView.LoadCompleted=function()
{
i.DesignView.SequenceRoot.ActivitiesPanel.InsertControl(i.DesignView.ParametersList,i.DesignView.SequenceRoot.ActivitiesPanel.Controls[0],0)
},t(i)
});
i.ResourceContext=n,app.MainForm.FormControls.ActivedDockManager.AddContent(n.Title,i,3,n.Name)
},DBFX.Design.Service.LauchDMDesignView=function(n,t)
{
if(app.MainForm.FormControls.ActivedDockManager.ActiveContent(n.Name)==null)
{
var i=new DBFX.Web.Forms.FormPart("Design/Forms/DMDesignView.scrn",function(r)
{
r.FormControls.VDE_DV_ToolkitBox.LoadTKItems("LC.GAS.ADP.DesignerObjects.Tooltiks.DMCollection.DataEntitySchema"),r.FormControls.VDE_DV_ObjectEditor.Initialize(r.FormControls.VDE_DV_DesignView),t(i),i.LoadResource(n,function(n)
{
r.FormControls.VDE_DV_DesignView.LoadXml(n)
})
});
i.ResourceContext=n
}
app.MainForm.FormControls.ActivedDockManager.AddContent(n.Title,i,3,n.Name)
}