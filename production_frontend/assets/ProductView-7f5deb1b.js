import{f as $,g as d,af as j,u as J,ac as U,E as M,a1 as R,o as p,c as h,w as c,b as P,ai as w,Q as q,aj as b,a as u,h as G,au as V,d as I,av as H,j as k,aw as K}from"./index-b55a7827.js";import{Q as W}from"./QPage-615bd1f9.js";import{C as _}from"./QSpace-f8c655d3.js";import{u as X,a as v}from"./use-quasar-96558313.js";import{T as Y}from"./QTable-c3bf5ca2.js";import{a as m}from"./validationHelper-21a8e46b.js";import{u as Z,g as O}from"./userAuthStore-0c477450.js";import{_ as L}from"./CompactQTable-d15efe1b.js";import"./QMarkupTable-1fc170d9.js";import"./QList-f8bcfa4e.js";import"./QSelect-c33eb5ef.js";import"./QChip-1b4874fe.js";import"./QItemLabel-82cf5c84.js";import"./selection-af93f90a.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const A={class:"w-full flex justify-end pb-3"},F={class:"relative overflow-x-auto shadow-md sm:rounded-lg"},ee=P("div",{class:"text-h6"},"Medium",-1),we={__name:"ProductView",setup(te){const e=$({sortBy:"createdAt",descending:!0,page:1,rowsPerPage:10,keywords:null,gte:null,lte:null,gtValue:null,ltValue:null,filterColumn:null,rangeColumn:null}),r=d(null),s=X(),g=Z(),i=d(!1),y=d(null),S=d(!1),t=j(),N=J(),B=o=>{e.keywords=o.keywords,e.gt=o.gt,e.lt=o.lt,e.gtValue=o.gtValue,e.ltValue=o.ltValue,e.filterColumn=o.filterColumn,e.rangeColumn=o.rangeColumn},x=o=>{e.page=o.page,e.rowsPerPage=o.rowsPerPage,e.descending=o.descending,e.sortBy=o.sortBy||"createdAt"},D=o=>{N.push(`/dashboard/product/product_list/${o._id}`)},Q=o=>{y.value=o._id,i.value=!0},f=async()=>{var l;const o={method:"GET",url:"api/product/product_lists",headers:{Authorization:`Bearer ${O("token")}`},params:{pageNumber:(e==null?void 0:e.page)||1,pageSize:(e==null?void 0:e.rowsPerPage)||10,descending:e==null?void 0:e.descending,sortBy:(e==null?void 0:e.sortBy)||"createdAt",select:" name price discount stock"}};e!=null&&e.keywords&&(o.params.keywords=e.keywords),e!=null&&e.gt&&(o.params.gt=e.gt),e!=null&&e.lt&&(o.params.lt=e.lt),m(e==null?void 0:e.gtValue)&&(o.params.gtValue=e.gtValue),m(e==null?void 0:e.ltValue)&&(o.params.ltValue=e.ltValue),e!=null&&e.filterColumn&&(o.params.filterColumn=e.filterColumn),e!=null&&e.rangeColumn&&(o.params.rangeColumn=e.rangeColumn),s.loading.show();try{const a=await v.request(o);r.value=a.data,s.loading.hide()}catch(a){console.log(a),s.loading.hide(),((l=a==null?void 0:a.response)==null?void 0:l.status)==401?s.notify({message:a.response.data.message+", Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):s.notify({message:a.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}};U(()=>{var o,l,a,n;t.query.hasOwnProperty("pageNumber")&&(e.pageNumber=Number((o=t.query)==null?void 0:o.pageNumber)),t.query.hasOwnProperty("pageSize")&&(e.pageSize=Number((l=t.query)==null?void 0:l.pageSize)),t.query.hasOwnProperty("descending")&&(e.descending=JSON.parse((a=t.query)==null?void 0:a.descending)),t.query.hasOwnProperty("sortBy")&&(e.sortBy=String((n=t.query)==null?void 0:n.sortBy)),t.query.hasOwnProperty("keywords")&&t.query.keywords&&t.query.keywords!=="null"&&(e.keywords=t.query.keywords),t.query.hasOwnProperty("gt")&&t.query.gt&&t.query.gt!=="null"&&(e.gt=String(t.query.gt)),t.query.hasOwnProperty("lt")&&t.query.lt&&t.query.lt!=="null"&&(e.lt=String(t.query.lt)),t.query.hasOwnProperty("gtValue")&&m(t.query.gtValue)&&(e.gtValue=Number(t.query.gtValue)),t.query.hasOwnProperty("ltValue")&&m(t.query.ltValue)&&(e.ltValue=Number(t.query.ltValue)),t.query.hasOwnProperty("filterColumn")&&t.query.filterColumn&&t.query.filterColumn!=="null"&&(e.filterColumn=String(t.query.filterColumn)),t.query.hasOwnProperty("rangeColumn")&&t.query.rangeColumn&&t.query.rangeColumn!=="null"&&(e.rangeColumn=String(t.query.rangeColumn)),f()}),M(e,R(f,1e3));const z=async()=>{var l;const o={method:"delete",url:"api/product/product_lists/"+y.value,headers:{Authorization:`Bearer ${O("token")}`}};try{s.loading.show(),await v.request(o);const a=r==null?void 0:r.value.products.filter(n=>n._id!==y.value);r.value={...JSON.parse(JSON.stringify(r==null?void 0:r.value)),products:a},(r==null?void 0:r.value.products.length)<5&&(r==null?void 0:r.value.pages)!==1&&f(),s.loading.hide(),i.value=!1,s.notify({message:"Deleted successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(a){i.value=!1,((l=a==null?void 0:a.response)==null?void 0:l.status)==401?s.notify({message:a.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):s.notify({message:a.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),s.loading.hide(),console.error(a)}},E=[{name:"name",label:"Name",align:"left",field:"name",sortable:!0},{name:"price",label:"Price",align:"left",field:"price",sortable:!0},{name:"discount",label:"Discount",align:"left",field:"discount",sortable:!0},{name:"stock",label:"Stock",align:"left",field:"stock",sortable:!0},{name:"action",label:"Action",field:"action"}];return(o,l)=>(p(),h(W,{padding:""},{default:c(()=>{var a,n,C;return[P("div",A,[w(g).checkShowOnPermission("createProduct")?(p(),h(q,{key:0,style:{background:"green",color:"white"},label:"New Product",to:"/dashboard/product/product_list/create"})):b("",!0)]),P("div",F,[u(L,{columns:E,"data-list":((a=r.value)==null?void 0:a.products)||[],page:((n=r.value)==null?void 0:n.page)||1,pages:((C=r.value)==null?void 0:C.pages)||1,onUpdatePaginate:x,onOnEdit:D,onOnDelete:Q,onOnFilter:B,showEdit:w(g).checkShowOnPermission("editProduct"),showDelete:w(g).checkShowOnPermission("deleteProduct")},null,8,["data-list","page","pages","showEdit","showDelete"]),S.value?(p(),h(Y,{key:0})):b("",!0)]),u(K,{modelValue:i.value,"onUpdate:modelValue":l[0]||(l[0]=T=>i.value=T)},{default:c(()=>[u(G,{style:{width:"300px","max-width":"80vw"}},{default:c(()=>[u(V,null,{default:c(()=>[ee]),_:1}),u(V,{class:"q-pt-none"},{default:c(()=>[I(" Are you sure you want to delete this product? ")]),_:1}),u(H,{align:"right",class:"bg-white text-teal"},{default:c(()=>[k(u(q,{flat:"",label:"Cancel"},null,512),[[_]]),k(u(q,{flat:"",label:"Delete",onClick:z,color:"red"},null,512),[[_]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]}),_:1}))}};export{we as default};
