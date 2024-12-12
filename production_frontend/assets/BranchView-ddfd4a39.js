import{f as $,g as d,af as j,u as J,ac as U,E as M,a1 as R,o as h,c as p,w as c,b,ai as w,Q as q,aj as V,a as u,h as G,au as _,d as I,av as H,j as v,aw as K}from"./index-b55a7827.js";import{Q as W}from"./QPage-615bd1f9.js";import{C as P}from"./QSpace-f8c655d3.js";import{u as X,a as k}from"./use-quasar-96558313.js";import{T as Y}from"./QTable-c3bf5ca2.js";import{a as m}from"./validationHelper-21a8e46b.js";import{u as Z,g as B}from"./userAuthStore-0c477450.js";import{_ as L}from"./CompactQTable-d15efe1b.js";import"./QMarkupTable-1fc170d9.js";import"./QList-f8bcfa4e.js";import"./QSelect-c33eb5ef.js";import"./QChip-1b4874fe.js";import"./QItemLabel-82cf5c84.js";import"./selection-af93f90a.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const A={class:"w-full flex justify-end pb-3"},F={class:"relative overflow-x-auto shadow-md sm:rounded-lg"},ee=b("div",{class:"text-h6"},"Medium",-1),we={__name:"BranchView",setup(ae){const e=$({sortBy:"createdAt",descending:!0,page:1,rowsPerPage:10,keywords:null,gte:null,lte:null,gtValue:null,ltValue:null,filterColumn:null,rangeColumn:null}),s=d(null),t=X(),g=Z(),i=d(!1),y=d(null),O=d(!1),a=j(),S=J(),N=r=>{e.keywords=r.keywords,e.gt=r.gt,e.lt=r.lt,e.gtValue=r.gtValue,e.ltValue=r.ltValue,e.filterColumn=r.filterColumn,e.rangeColumn=r.rangeColumn},x=r=>{e.page=r.page,e.rowsPerPage=r.rowsPerPage,e.descending=r.descending,e.sortBy=r.sortBy||"createdAt"},Q=r=>{S.push(`/dashboard/branch/branch_list/${r._id}`)},D=r=>{y.value=r._id,i.value=!0},f=async()=>{var l;const r={method:"GET",url:"api/branch/branch_lists",headers:{Authorization:`Bearer ${B("token")}`},params:{pageNumber:(e==null?void 0:e.page)||1,pageSize:(e==null?void 0:e.rowsPerPage)||10,descending:e==null?void 0:e.descending,sortBy:(e==null?void 0:e.sortBy)||"createdAt",select:" name address"}};e!=null&&e.keywords&&(r.params.keywords=e.keywords),e!=null&&e.gt&&(r.params.gt=e.gt),e!=null&&e.lt&&(r.params.lt=e.lt),m(e==null?void 0:e.gtValue)&&(r.params.gtValue=e.gtValue),m(e==null?void 0:e.ltValue)&&(r.params.ltValue=e.ltValue),e!=null&&e.filterColumn&&(r.params.filterColumn=e.filterColumn),e!=null&&e.rangeColumn&&(r.params.rangeColumn=e.rangeColumn),t.loading.show();try{const o=await k.request(r);s.value=o.data,t.loading.hide()}catch(o){console.log(o),t.loading.hide(),((l=o==null?void 0:o.response)==null?void 0:l.status)==401?t.notify({message:o.response.data.message+", Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}};U(()=>{var r,l,o,n;a.query.hasOwnProperty("pageNumber")&&(e.pageNumber=Number((r=a.query)==null?void 0:r.pageNumber)),a.query.hasOwnProperty("pageSize")&&(e.pageSize=Number((l=a.query)==null?void 0:l.pageSize)),a.query.hasOwnProperty("descending")&&(e.descending=JSON.parse((o=a.query)==null?void 0:o.descending)),a.query.hasOwnProperty("sortBy")&&(e.sortBy=String((n=a.query)==null?void 0:n.sortBy)),a.query.hasOwnProperty("keywords")&&a.query.keywords&&a.query.keywords!=="null"&&(e.keywords=a.query.keywords),a.query.hasOwnProperty("gt")&&a.query.gt&&a.query.gt!=="null"&&(e.gt=String(a.query.gt)),a.query.hasOwnProperty("lt")&&a.query.lt&&a.query.lt!=="null"&&(e.lt=String(a.query.lt)),a.query.hasOwnProperty("gtValue")&&m(a.query.gtValue)&&(e.gtValue=Number(a.query.gtValue)),a.query.hasOwnProperty("ltValue")&&m(a.query.ltValue)&&(e.ltValue=Number(a.query.ltValue)),a.query.hasOwnProperty("filterColumn")&&a.query.filterColumn&&a.query.filterColumn!=="null"&&(e.filterColumn=String(a.query.filterColumn)),a.query.hasOwnProperty("rangeColumn")&&a.query.rangeColumn&&a.query.rangeColumn!=="null"&&(e.rangeColumn=String(a.query.rangeColumn)),f()}),M(e,R(f,1e3));const z=async()=>{var l;const r={method:"delete",url:"api/branch/branch_lists/"+y.value,headers:{Authorization:`Bearer ${B("token")}`}};try{t.loading.show(),await k.request(r);const o=s==null?void 0:s.value.branchs.filter(n=>n._id!==y.value);s.value={...JSON.parse(JSON.stringify(s==null?void 0:s.value)),branchs:o},(s==null?void 0:s.value.branchs.length)<5&&(s==null?void 0:s.value.pages)!==1&&f(),t.loading.hide(),i.value=!1,t.notify({message:"Deleted successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(o){i.value=!1,((l=o==null?void 0:o.response)==null?void 0:l.status)==401?t.notify({message:o.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),t.loading.hide(),console.error(o)}},E=[{name:"name",label:"Name",align:"left",field:"name",sortable:!0},{name:"address",label:"Address",align:"left",field:"address",sortable:!0},{name:"action",label:"Action",field:"action"}];return(r,l)=>(h(),p(W,{padding:""},{default:c(()=>{var o,n,C;return[b("div",A,[w(g).checkShowOnPermission("createBranch")?(h(),p(q,{key:0,style:{background:"green",color:"white"},label:"New Branch",to:"/dashboard/branch/branch_list/create"})):V("",!0)]),b("div",F,[u(L,{columns:E,"data-list":((o=s.value)==null?void 0:o.branchs)||[],page:((n=s.value)==null?void 0:n.page)||1,pages:((C=s.value)==null?void 0:C.pages)||1,onUpdatePaginate:x,onOnEdit:Q,onOnDelete:D,onOnFilter:N,showEdit:w(g).checkShowOnPermission("editBranch"),showDelete:w(g).checkShowOnPermission("deleteBranch")},null,8,["data-list","page","pages","showEdit","showDelete"]),O.value?(h(),p(Y,{key:0})):V("",!0)]),u(K,{modelValue:i.value,"onUpdate:modelValue":l[0]||(l[0]=T=>i.value=T)},{default:c(()=>[u(G,{style:{width:"300px","max-width":"80vw"}},{default:c(()=>[u(_,null,{default:c(()=>[ee]),_:1}),u(_,{class:"q-pt-none"},{default:c(()=>[I(" Are you sure you want to delete this branch? ")]),_:1}),u(H,{align:"right",class:"bg-white text-teal"},{default:c(()=>[v(u(q,{flat:"",label:"Cancel"},null,512),[[P]]),v(u(q,{flat:"",label:"Delete",onClick:z,color:"red"},null,512),[[P]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]}),_:1}))}};export{we as default};
