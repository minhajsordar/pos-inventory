import{g as m,af as E,u as U,f as T,ac as $,E as j,o as S,e as I,b,a as i,Q as _,a1 as M,c as x,w,ai as B,aj as W,h as G,au as N,d as H,av as Y,j as Q,aw as K}from"./index-1afe7156.js";import{Q as X}from"./QPage-dbe3b711.js";import{Q as Z,C as R}from"./QSpace-f97a4fcb.js";import{u as A,a as L}from"./use-quasar-7dcfde9a.js";import{Q as F,T as ee}from"./QTable-78fe1a21.js";import{a as C}from"./validationHelper-21a8e46b.js";import{u as te,g as z}from"./userAuthStore-bea79ead.js";import{E as D,a as oe}from"./jspdf.plugin.autotable-02bfbc06.js";import"./QMarkupTable-a0c3ed8d.js";import"./QList-887f05d5.js";import"./QSelect-38e1999a.js";import"./QChip-67221c42.js";import"./QItemLabel-80fbf0da.js";import"./selection-d27bdc72.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const le={id:"report-table-container"},ae={class:"flex p-3 border border-1 border-gray-200"},se=b("div",{class:"flex gap-1 items-center"},null,-1),re={class:"flex gap-1"},ne={__name:"LowStockReportQTable",props:{title:String,dataList:Array,columns:Array,page:Number,pages:Number,showEdit:Boolean,showDelete:Boolean},emits:["updatePaginate","onFilter","onEdit","onDelete"],setup(V,{emit:e}){const l=V;m("daily"),E(),U();const n=m([]),p=m([]),c=m([]);m("");const y=T({keywords:null,gt:null,lt:null,gtValue:null,ltValue:null,filterColumn:null,rangeColumn:null});$(()=>{p.value=l.columns,c.value=l.dataList,n.value=l.columns.filter(t=>t.name!=="action"),y.filterColumn=l.columns.map(t=>t.name)[0],y.rangeColumn=l.columns.map(t=>t.name)[0]});function v(t){if(console.log("exporting"),c.value.length<1)return;D.autoTableSetDefaults({headStyles:{fillColor:0}});const r=new D;r.setFontSize(18),r.text(l.title,14,22),r.setFontSize(11),r.setTextColor(10);const q=p.value.map(s=>s.field),h=p.value.filter(s=>q.includes(s.field)),k=[h.map(s=>s.label)],P=c.value.map(s=>h.map(u=>s[u.field]));if(oe(r,{head:k,body:P,columnStyles:{...h.reduce((s,u,g)=>(s[g]={halign:u.align,fontSize:10},s),{})},headStyles:{...h.reduce((s,u,g)=>(s[g]={halign:u.align,fontSize:10,fillColor:null},s),{})},styles:{halign:"left",fontSize:10,lineWidth:.1},startY:35,showHead:"firstPage"}),t=="download")r.save("table.pdf");else if(t=="print"){const s=r.output("blob"),u=URL.createObjectURL(s);window.open(u)}else{const s=r.output("blob"),u=URL.createObjectURL(s),g=window.open(u);g.onload=()=>{URL.revokeObjectURL(u)}}}return j([()=>l.dataList],function(){c.value=l.dataList}),(t,r)=>(S(),I("div",le,[b("div",ae,[se,i(Z),b("div",re,[i(_,{class:"q-px-sm",color:"cyan-8","icon-right":"archive","no-caps":"",onClick:r[0]||(r[0]=()=>v("download")),title:"Export as pdf"}),i(_,{label:"Print",color:"primary",onClick:r[1]||(r[1]=()=>v("print"))})])]),i(F,{class:"bg-grey-2 !rounded-none mt-3",title:l.title,flat:"",bordered:"",dense:"",rows:c.value,columns:p.value,separator:"cell","row-key":"name","hide-pagination":""},null,8,["title","rows","columns"])]))}},ue={class:"relative overflow-x-auto"},ie=b("div",{class:"text-h6"},"Medium",-1),Se={__name:"ProductLowStockReportView",setup(V){const e=T({sortBy:"createdAt",descending:!0,page:1,rowsPerPage:10,keywords:null,gte:null,lte:null,gtValue:null,ltValue:null,filterColumn:null,rangeColumn:null}),l=m(null),n=A(),p=te(),c=m(!1),y=m(null),v=m(!1),t=E(),r=U(),q=o=>{e.keywords=o.keywords,e.gt=o.gt,e.lt=o.lt,e.gtValue=o.gtValue,e.ltValue=o.ltValue,e.filterColumn=o.filterColumn,e.rangeColumn=o.rangeColumn},h=o=>{e.page=o.page,e.rowsPerPage=o.rowsPerPage,e.descending=o.descending,e.sortBy=o.sortBy||"createdAt"},k=o=>{r.push(`/dashboard/product/product_list/${o._id}`)},P=o=>{y.value=o._id,c.value=!0},s=async()=>{var d;const o={method:"GET",url:"api/product/product_lists",headers:{Authorization:`Bearer ${z("token")}`},params:{pageNumber:(e==null?void 0:e.page)||1,pageSize:(e==null?void 0:e.rowsPerPage)||10,descending:e==null?void 0:e.descending,sortBy:(e==null?void 0:e.sortBy)||"createdAt",lowStockReport:!0}};e!=null&&e.keywords&&(o.params.keywords=e.keywords),e!=null&&e.gt&&(o.params.gt=e.gt),e!=null&&e.lt&&(o.params.lt=e.lt),C(e==null?void 0:e.gtValue)&&(o.params.gtValue=e.gtValue),C(e==null?void 0:e.ltValue)&&(o.params.ltValue=e.ltValue),e!=null&&e.filterColumn&&(o.params.filterColumn=e.filterColumn),e!=null&&e.rangeColumn&&(o.params.rangeColumn=e.rangeColumn),n.loading.show();try{const a=await L.request(o);l.value=a.data,n.loading.hide()}catch(a){console.log(a),n.loading.hide(),((d=a==null?void 0:a.response)==null?void 0:d.status)==401?n.notify({message:a.response.data.message+", Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):n.notify({message:a.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}};$(()=>{var o,d,a,f;t.query.hasOwnProperty("pageNumber")&&(e.pageNumber=Number((o=t.query)==null?void 0:o.pageNumber)),t.query.hasOwnProperty("pageSize")&&(e.pageSize=Number((d=t.query)==null?void 0:d.pageSize)),t.query.hasOwnProperty("descending")&&(e.descending=JSON.parse((a=t.query)==null?void 0:a.descending)),t.query.hasOwnProperty("sortBy")&&(e.sortBy=String((f=t.query)==null?void 0:f.sortBy)),t.query.hasOwnProperty("keywords")&&t.query.keywords&&t.query.keywords!=="null"&&(e.keywords=t.query.keywords),t.query.hasOwnProperty("gt")&&t.query.gt&&t.query.gt!=="null"&&(e.gt=String(t.query.gt)),t.query.hasOwnProperty("lt")&&t.query.lt&&t.query.lt!=="null"&&(e.lt=String(t.query.lt)),t.query.hasOwnProperty("gtValue")&&C(t.query.gtValue)&&(e.gtValue=Number(t.query.gtValue)),t.query.hasOwnProperty("ltValue")&&C(t.query.ltValue)&&(e.ltValue=Number(t.query.ltValue)),t.query.hasOwnProperty("filterColumn")&&t.query.filterColumn&&t.query.filterColumn!=="null"&&(e.filterColumn=String(t.query.filterColumn)),t.query.hasOwnProperty("rangeColumn")&&t.query.rangeColumn&&t.query.rangeColumn!=="null"&&(e.rangeColumn=String(t.query.rangeColumn)),s()}),j(e,M(s,1e3));const u=async()=>{var d;const o={method:"delete",url:"api/product/product_lists/"+y.value,headers:{Authorization:`Bearer ${z("token")}`}};try{n.loading.show(),await L.request(o);const a=l==null?void 0:l.value.products.filter(f=>f._id!==y.value);l.value={...JSON.parse(JSON.stringify(l==null?void 0:l.value)),products:a},(l==null?void 0:l.value.products.length)<5&&(l==null?void 0:l.value.pages)!==1&&s(),n.loading.hide(),c.value=!1,n.notify({message:"Deleted successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(a){c.value=!1,((d=a==null?void 0:a.response)==null?void 0:d.status)==401?n.notify({message:a.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):n.notify({message:a.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),n.loading.hide(),console.error(a)}},g=[{name:"_id",label:"Product Id",align:"left",field:"_id"},{name:"name",label:"Name",align:"left",field:"name"},{name:"stock",label:"Stock",align:"left",field:"stock"}];return(o,d)=>(S(),x(X,{padding:""},{default:w(()=>{var a,f,O;return[b("div",ue,[i(ne,{title:"Low Stock Report",columns:g,"data-list":((a=l.value)==null?void 0:a.products)||[],page:((f=l.value)==null?void 0:f.page)||1,pages:((O=l.value)==null?void 0:O.pages)||1,onUpdatePaginate:h,onOnEdit:k,onOnDelete:P,onOnFilter:q,showEdit:B(p).checkShowOnPermission("editProduct"),showDelete:B(p).checkShowOnPermission("deleteProduct")},null,8,["data-list","page","pages","showEdit","showDelete"]),v.value?(S(),x(ee,{key:0})):W("",!0)]),i(K,{modelValue:c.value,"onUpdate:modelValue":d[0]||(d[0]=J=>c.value=J)},{default:w(()=>[i(G,{style:{width:"300px","max-width":"80vw"}},{default:w(()=>[i(N,null,{default:w(()=>[ie]),_:1}),i(N,{class:"q-pt-none"},{default:w(()=>[H(" Are you sure you want to delete this product? ")]),_:1}),i(Y,{align:"right",class:"bg-white text-teal"},{default:w(()=>[Q(i(_,{flat:"",label:"Cancel"},null,512),[[R]]),Q(i(_,{flat:"",label:"Delete",onClick:u,color:"red"},null,512),[[R]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]}),_:1}))}};export{Se as default};