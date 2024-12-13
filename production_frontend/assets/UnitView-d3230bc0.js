import{f as T,g as d,af as $,u as j,ac as J,E as M,a1 as R,o as p,c as h,w as i,b as C,ai as w,Q as q,aj as V,a as u,h as G,au as _,d as I,av as H,j as P,aw as K}from"./index-1afe7156.js";import{Q as W}from"./QPage-dbe3b711.js";import{C as k}from"./QSpace-f97a4fcb.js";import{u as X,a as b}from"./use-quasar-7dcfde9a.js";import{T as Y}from"./QTable-78fe1a21.js";import{a as m}from"./validationHelper-21a8e46b.js";import{u as Z,g as O}from"./userAuthStore-bea79ead.js";import{_ as L}from"./CompactQTable-172aecc4.js";import"./QMarkupTable-a0c3ed8d.js";import"./QList-887f05d5.js";import"./QSelect-38e1999a.js";import"./QChip-67221c42.js";import"./QItemLabel-80fbf0da.js";import"./selection-d27bdc72.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const A={class:"w-full flex justify-end pb-3"},F={class:"relative overflow-x-auto shadow-md sm:rounded-lg"},ee=C("div",{class:"text-h6"},"Medium",-1),we={__name:"UnitView",setup(te){const e=T({sortBy:"createdAt",descending:!0,page:1,rowsPerPage:10,keywords:null,gte:null,lte:null,gtValue:null,ltValue:null,filterColumn:null,rangeColumn:null}),s=d(null),l=X(),g=Z(),c=d(!1),y=d(null),S=d(!1),t=$(),N=j(),B=o=>{e.keywords=o.keywords,e.gt=o.gt,e.lt=o.lt,e.gtValue=o.gtValue,e.ltValue=o.ltValue,e.filterColumn=o.filterColumn,e.rangeColumn=o.rangeColumn},x=o=>{e.page=o.page,e.rowsPerPage=o.rowsPerPage,e.descending=o.descending,e.sortBy=o.sortBy||"createdAt"},U=o=>{N.push(`/dashboard/unit/unite_list/${o._id}`)},Q=o=>{y.value=o._id,c.value=!0},f=async()=>{var r;const o={method:"GET",url:"api/unit/unit_lists",headers:{Authorization:`Bearer ${O("token")}`},params:{pageNumber:(e==null?void 0:e.page)||1,pageSize:(e==null?void 0:e.rowsPerPage)||10,descending:e==null?void 0:e.descending,sortBy:(e==null?void 0:e.sortBy)||"createdAt",select:" value"}};e!=null&&e.keywords&&(o.params.keywords=e.keywords),e!=null&&e.gt&&(o.params.gt=e.gt),e!=null&&e.lt&&(o.params.lt=e.lt),m(e==null?void 0:e.gtValue)&&(o.params.gtValue=e.gtValue),m(e==null?void 0:e.ltValue)&&(o.params.ltValue=e.ltValue),e!=null&&e.filterColumn&&(o.params.filterColumn=e.filterColumn),e!=null&&e.rangeColumn&&(o.params.rangeColumn=e.rangeColumn),l.loading.show();try{const a=await b.request(o);s.value=a.data,l.loading.hide()}catch(a){console.log(a),l.loading.hide(),((r=a==null?void 0:a.response)==null?void 0:r.status)==401?l.notify({message:a.response.data.message+", Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):l.notify({message:a.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}};J(()=>{var o,r,a,n;t.query.hasOwnProperty("pageNumber")&&(e.pageNumber=Number((o=t.query)==null?void 0:o.pageNumber)),t.query.hasOwnProperty("pageSize")&&(e.pageSize=Number((r=t.query)==null?void 0:r.pageSize)),t.query.hasOwnProperty("descending")&&(e.descending=JSON.parse((a=t.query)==null?void 0:a.descending)),t.query.hasOwnProperty("sortBy")&&(e.sortBy=String((n=t.query)==null?void 0:n.sortBy)),t.query.hasOwnProperty("keywords")&&t.query.keywords&&t.query.keywords!=="null"&&(e.keywords=t.query.keywords),t.query.hasOwnProperty("gt")&&t.query.gt&&t.query.gt!=="null"&&(e.gt=String(t.query.gt)),t.query.hasOwnProperty("lt")&&t.query.lt&&t.query.lt!=="null"&&(e.lt=String(t.query.lt)),t.query.hasOwnProperty("gtValue")&&m(t.query.gtValue)&&(e.gtValue=Number(t.query.gtValue)),t.query.hasOwnProperty("ltValue")&&m(t.query.ltValue)&&(e.ltValue=Number(t.query.ltValue)),t.query.hasOwnProperty("filterColumn")&&t.query.filterColumn&&t.query.filterColumn!=="null"&&(e.filterColumn=String(t.query.filterColumn)),t.query.hasOwnProperty("rangeColumn")&&t.query.rangeColumn&&t.query.rangeColumn!=="null"&&(e.rangeColumn=String(t.query.rangeColumn)),f()}),M(e,R(f,1e3));const D=async()=>{var r;const o={method:"delete",url:"api/unit/unit_lists/"+y.value,headers:{Authorization:`Bearer ${O("token")}`}};try{l.loading.show(),await b.request(o);const a=s==null?void 0:s.value.units.filter(n=>n._id!==y.value);s.value={...JSON.parse(JSON.stringify(s==null?void 0:s.value)),units:a},(s==null?void 0:s.value.units.length)<5&&(s==null?void 0:s.value.pages)!==1&&f(),l.loading.hide(),c.value=!1,l.notify({message:"Deleted successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(a){c.value=!1,((r=a==null?void 0:a.response)==null?void 0:r.status)==401?l.notify({message:a.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):l.notify({message:a.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),l.loading.hide(),console.error(a)}},z=[{name:"value",label:"Value",align:"left",field:"value",sortable:!0},{name:"action",label:"Action",field:"action"}];return(o,r)=>(p(),h(W,{padding:""},{default:i(()=>{var a,n,v;return[C("div",A,[w(g).checkShowOnPermission("createUnit")?(p(),h(q,{key:0,style:{background:"green",color:"white"},label:"New Unit",to:"/dashboard/unit/unite_list/create"})):V("",!0)]),C("div",F,[u(L,{columns:z,"data-list":((a=s.value)==null?void 0:a.units)||[],page:((n=s.value)==null?void 0:n.page)||1,pages:((v=s.value)==null?void 0:v.pages)||1,onUpdatePaginate:x,onOnEdit:U,onOnDelete:Q,onOnFilter:B,showEdit:w(g).checkShowOnPermission("editUnit"),showDelete:w(g).checkShowOnPermission("deleteUnit")},null,8,["data-list","page","pages","showEdit","showDelete"]),S.value?(p(),h(Y,{key:0})):V("",!0)]),u(K,{modelValue:c.value,"onUpdate:modelValue":r[0]||(r[0]=E=>c.value=E)},{default:i(()=>[u(G,{style:{width:"300px","max-width":"80vw"}},{default:i(()=>[u(_,null,{default:i(()=>[ee]),_:1}),u(_,{class:"q-pt-none"},{default:i(()=>[I(" Are you sure you want to delete this unit? ")]),_:1}),u(H,{align:"right",class:"bg-white text-teal"},{default:i(()=>[P(u(q,{flat:"",label:"Cancel"},null,512),[[k]]),P(u(q,{flat:"",label:"Delete",onClick:D,color:"red"},null,512),[[k]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]}),_:1}))}};export{we as default};
