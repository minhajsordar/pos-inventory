import{f as $,g as m,af as j,u as J,ac as U,E as M,a1 as R,o as p,c as h,w as c,b as q,ai as w,Q as b,aj as _,a as u,h as G,au as C,d as I,av as H,j as V,aw as K}from"./index-1afe7156.js";import{Q as W}from"./QPage-dbe3b711.js";import{C as v}from"./QSpace-f97a4fcb.js";import{u as X,a as P}from"./use-quasar-7dcfde9a.js";import{T as Y}from"./QTable-78fe1a21.js";import{a as d}from"./validationHelper-21a8e46b.js";import{u as Z,g as B}from"./userAuthStore-bea79ead.js";import{_ as L}from"./CompactQTable-172aecc4.js";import"./QMarkupTable-a0c3ed8d.js";import"./QList-887f05d5.js";import"./QSelect-38e1999a.js";import"./QChip-67221c42.js";import"./QItemLabel-80fbf0da.js";import"./selection-d27bdc72.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const A={class:"w-full flex justify-end pb-3"},F={class:"relative overflow-x-auto sm:rounded-lg"},ee=q("div",{class:"text-h6"},"Medium",-1),we={__name:"BankAccountView",setup(ae){const e=$({sortBy:"createdAt",descending:!0,page:1,rowsPerPage:10,keywords:null,gte:null,lte:null,gtValue:null,ltValue:null,filterColumn:null,rangeColumn:null}),l=m(null),s=X(),g=Z(),i=m(!1),y=m(null),N=m(!1),a=j(),O=J(),S=t=>{e.keywords=t.keywords,e.gt=t.gt,e.lt=t.lt,e.gtValue=t.gtValue,e.ltValue=t.ltValue,e.filterColumn=t.filterColumn,e.rangeColumn=t.rangeColumn},x=t=>{e.page=t.page,e.rowsPerPage=t.rowsPerPage,e.descending=t.descending,e.sortBy=t.sortBy||"createdAt"},Q=t=>{O.push(`/dashboard/bank_account/bank_account_list/${t._id}`)},D=t=>{y.value=t._id,i.value=!0},f=async()=>{var r;const t={method:"GET",url:"api/bank_account/bank_account_lists",headers:{Authorization:`Bearer ${B("token")}`},params:{pageNumber:(e==null?void 0:e.page)||1,pageSize:(e==null?void 0:e.rowsPerPage)||10,descending:e==null?void 0:e.descending,sortBy:(e==null?void 0:e.sortBy)||"createdAt",select:" accountNumber accountType phone name balance"}};e!=null&&e.keywords&&(t.params.keywords=e.keywords),e!=null&&e.gt&&(t.params.gt=e.gt),e!=null&&e.lt&&(t.params.lt=e.lt),d(e==null?void 0:e.gtValue)&&(t.params.gtValue=e.gtValue),d(e==null?void 0:e.ltValue)&&(t.params.ltValue=e.ltValue),e!=null&&e.filterColumn&&(t.params.filterColumn=e.filterColumn),e!=null&&e.rangeColumn&&(t.params.rangeColumn=e.rangeColumn),s.loading.show();try{const o=await P.request(t);l.value=o.data,s.loading.hide()}catch(o){console.log(o),s.loading.hide(),((r=o==null?void 0:o.response)==null?void 0:r.status)==401?s.notify({message:o.response.data.message+", Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):s.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}};U(()=>{var t,r,o,n;a.query.hasOwnProperty("pageNumber")&&(e.pageNumber=Number((t=a.query)==null?void 0:t.pageNumber)),a.query.hasOwnProperty("pageSize")&&(e.pageSize=Number((r=a.query)==null?void 0:r.pageSize)),a.query.hasOwnProperty("descending")&&(e.descending=JSON.parse((o=a.query)==null?void 0:o.descending)),a.query.hasOwnProperty("sortBy")&&(e.sortBy=String((n=a.query)==null?void 0:n.sortBy)),a.query.hasOwnProperty("keywords")&&a.query.keywords&&a.query.keywords!=="null"&&(e.keywords=a.query.keywords),a.query.hasOwnProperty("gt")&&a.query.gt&&a.query.gt!=="null"&&(e.gt=String(a.query.gt)),a.query.hasOwnProperty("lt")&&a.query.lt&&a.query.lt!=="null"&&(e.lt=String(a.query.lt)),a.query.hasOwnProperty("gtValue")&&d(a.query.gtValue)&&(e.gtValue=Number(a.query.gtValue)),a.query.hasOwnProperty("ltValue")&&d(a.query.ltValue)&&(e.ltValue=Number(a.query.ltValue)),a.query.hasOwnProperty("filterColumn")&&a.query.filterColumn&&a.query.filterColumn!=="null"&&(e.filterColumn=String(a.query.filterColumn)),a.query.hasOwnProperty("rangeColumn")&&a.query.rangeColumn&&a.query.rangeColumn!=="null"&&(e.rangeColumn=String(a.query.rangeColumn)),f()}),M(e,R(f,1e3));const T=async()=>{var r;const t={method:"delete",url:"api/bank_account/bank_account_lists/"+y.value,headers:{Authorization:`Bearer ${B("token")}`}};try{s.loading.show(),await P.request(t);const o=l==null?void 0:l.value.bankAccounts.filter(n=>n._id!==y.value);l.value={...JSON.parse(JSON.stringify(l==null?void 0:l.value)),bankAccounts:o},(l==null?void 0:l.value.bankAccounts.length)<5&&(l==null?void 0:l.value.pages)!==1&&f(),s.loading.hide(),i.value=!1,s.notify({message:"Deleted successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(o){i.value=!1,((r=o==null?void 0:o.response)==null?void 0:r.status)==401?s.notify({message:o.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):s.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),s.loading.hide(),console.error(o)}},z=[{name:"name",label:"Name",align:"left",field:"name",sortable:!0},{name:"accountNumber",label:"Account number",align:"left",field:"accountNumber",sortable:!0},{name:"balance",label:"Balance",align:"left",field:"balance",sortable:!0},{name:"accountType",label:"Account type",align:"left",field:"accountType",sortable:!0},{name:"action",label:"Action",field:"action"}];return(t,r)=>(p(),h(W,{padding:""},{default:c(()=>{var o,n,k;return[q("div",A,[w(g).checkShowOnPermission("createBankAccount")?(p(),h(b,{key:0,style:{background:"green",color:"white"},label:"New Bank account",to:"/dashboard/bank_account/bank_account_list/create"})):_("",!0)]),q("div",F,[u(L,{columns:z,"data-list":((o=l.value)==null?void 0:o.bankAccounts)||[],page:((n=l.value)==null?void 0:n.page)||1,pages:((k=l.value)==null?void 0:k.pages)||1,onUpdatePaginate:x,onOnEdit:Q,onOnDelete:D,onOnFilter:S,showEdit:w(g).checkShowOnPermission("editBankAccount"),showDelete:w(g).checkShowOnPermission("deleteBankAccount")},null,8,["data-list","page","pages","showEdit","showDelete"]),N.value?(p(),h(Y,{key:0})):_("",!0)]),u(K,{modelValue:i.value,"onUpdate:modelValue":r[0]||(r[0]=E=>i.value=E)},{default:c(()=>[u(G,{style:{width:"300px","max-width":"80vw"}},{default:c(()=>[u(C,null,{default:c(()=>[ee]),_:1}),u(C,{class:"q-pt-none"},{default:c(()=>[I(" Are you sure you want to delete this bankAccount? ")]),_:1}),u(H,{align:"right",class:"bg-white text-teal"},{default:c(()=>[V(u(b,{flat:"",label:"Cancel"},null,512),[[v]]),V(u(b,{flat:"",label:"Delete",onClick:T,color:"red"},null,512),[[v]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]}),_:1}))}};export{we as default};
