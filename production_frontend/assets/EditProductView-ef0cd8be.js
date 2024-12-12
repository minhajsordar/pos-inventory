import{af as z,u as C,g as y,f as E,ac as G,o as k,c as R,w as j,b as l,a as r,ax as f,e as Q,ak as $,aj as L,Q as O}from"./index-b55a7827.js";import{Q as _}from"./QSelect-c33eb5ef.js";import{Q as F}from"./QPage-615bd1f9.js";import{u as I,a as g}from"./use-quasar-96558313.js";import{u as M,g as w}from"./userAuthStore-0c477450.js";import{e as H,s as J}from"./validationHelper-21a8e46b.js";import"./QChip-1b4874fe.js";import"./QItemLabel-82cf5c84.js";import"./selection-af93f90a.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const K=l("div",{class:"p-0 text-h5 mb-2"}," Add new product ",-1),W={class:"flex -m-2"},X={class:"p-2 w-full md:w-1/2"},Y={key:0,class:"text-red-8 text-xs q-pl-sm"},Z={class:"p-2 w-full md:w-1/2"},D={class:"p-2 w-full md:w-1/2"},ee={class:"p-2 w-full md:w-1/2"},oe={class:"p-2 w-full md:w-1/2"},te={class:"p-2 w-full md:w-1/2"},se={key:0,class:"text-red-8 text-xs q-pl-sm"},ae={class:"p-2 w-full md:w-1/2"},ne={class:"p-2 w-full md:w-1/2"},le={class:"p-2 w-full"},ke={__name:"EditProductView",setup(ie){const a=I();M();const p=z(),b=C(),v=y([]),V=y([]),S=y([]),d=y({}),o=E({name:"",price:"",discount:"",stock:"",lowStockAlert:"",unit:"",shop:"",branch:""}),c=E({name:"",price:"",discount:"",stock:"",lowStockAlert:"",unit:"",shop:"",branch:""}),N=async()=>{var t;if(p.params.id=="create"){A(),x(),U();return}const i={method:"GET",url:"api/product/product_lists/"+p.params.id,headers:{Authorization:`Bearer ${w("token")}`}};try{a.loading.show();const e=await g.request(i);a.loading.hide(),o.name=e.data.name,c.name=e.data.name,o.price=e.data.price,c.price=e.data.price,o.discount=e.data.discount,c.discount=e.data.discount,o.stock=e.data.stock,c.stock=e.data.stock,o.lowStockAlert=e.data.lowStockAlert,c.lowStockAlert=e.data.lowStockAlert,o.unit=e.data.unit,c.unit=e.data.unit,o.shop=e.data.shop,c.shop=e.data.shop,o.branch=e.data.branch,c.branch=e.data.branch}catch(e){((t=e==null?void 0:e.response)==null?void 0:t.status)==401?a.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),a.loading.hide(),console.error(e)}finally{A(),x(),U()}};G(()=>{N()});const A=async()=>{var t;const i={method:"GET",url:"api/unit/unit_lists",headers:{Authorization:`Bearer ${w("token")}`}};try{a.loading.show();const e=await g.request(i);v.value=e.data.units.map(s=>(s.label=s.value,s.value=s._id,o.unit===s._id&&(o.unit=s),s)),a.loading.hide()}catch(e){((t=e==null?void 0:e.response)==null?void 0:t.status)==401?a.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),a.loading.hide(),console.error(e)}},x=async()=>{var t;const i={method:"GET",url:"api/shop/shop_lists",headers:{Authorization:`Bearer ${w("token")}`}};try{a.loading.show();const e=await g.request(i);V.value=e.data.shops.map(s=>(s.label=s.name,s.value=s._id,o.shop===s._id&&(o.shop=s),s)),a.loading.hide()}catch(e){((t=e==null?void 0:e.response)==null?void 0:t.status)==401?a.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),a.loading.hide(),console.error(e)}},U=async()=>{var t;const i={method:"GET",url:"api/branch/branch_lists",headers:{Authorization:`Bearer ${w("token")}`}};try{a.loading.show();const e=await g.request(i);S.value=e.data.branchs.map(s=>(s.label=s.name,s.value=s._id,o.branch===s._id&&(o.branch=s),s)),a.loading.hide()}catch(e){((t=e==null?void 0:e.response)==null?void 0:t.status)==401?a.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),a.loading.hide(),console.error(e)}},T=async i=>{var s,m,h,n,q,B,P;i.preventDefault(),d.value={};const t={};if(o.name&&(t.name=o.name),H(o.name)||(d.value.name="Required feild"),o.price&&(t.price=o.price),o.discount&&(t.discount=o.discount),o.stock&&(t.stock=o.stock),o.lowStockAlert&&(t.lowStockAlert=o.lowStockAlert),(s=o==null?void 0:o.unit)!=null&&s._id&&(t.unit=o.unit._id),console.log(o),J((m=o==null?void 0:o.unit)==null?void 0:m._id)||(d.value.unit="Required feild"),(h=o==null?void 0:o.shop)!=null&&h._id&&(t.shop=o.shop._id),(n=o==null?void 0:o.branch)!=null&&n._id&&(t.branch=o.branch._id),Object.keys(d.value).length!==0)return;if(Object.keys(t).length<=0){a.notify({message:"Empty Form Submission Not Allowed",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]});return}const e={headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${w("token")}`},data:t};p.params.id=="create"?(e.method="post",e.url="api/product/product_lists"):(e.method="put",e.url="api/product/product_lists/"+p.params.id);try{const u=await g.request(e);(q=p.query)!=null&&q.redirect?b.push(`/${(B=p.query)==null?void 0:B.redirect}`):b.push("/dashboard/product/product_list"),a.notify({message:"Updated Successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(u){((P=u==null?void 0:u.response)==null?void 0:P.status)==401?a.notify({message:u.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:u.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),console.error(u)}};return(i,t)=>(k(),R(F,{padding:""},{default:j(()=>{var e,s,m,h;return[K,l("div",W,[l("div",X,[r(f,{label:"Name *",type:"text",placeholder:"Name",modelValue:o.name,"onUpdate:modelValue":t[0]||(t[0]=n=>o.name=n),outlined:"",dense:""},null,8,["modelValue"]),(e=d.value)!=null&&e.name?(k(),Q("div",Y,[l("span",null,$((s=d.value)==null?void 0:s.name),1)])):L("",!0)]),l("div",Z,[r(f,{label:"Price ",type:"text",placeholder:"Price",modelValue:o.price,"onUpdate:modelValue":t[1]||(t[1]=n=>o.price=n),outlined:"",dense:""},null,8,["modelValue"])]),l("div",D,[r(f,{label:"Discount ",type:"text",placeholder:"Discount",modelValue:o.discount,"onUpdate:modelValue":t[2]||(t[2]=n=>o.discount=n),outlined:"",dense:""},null,8,["modelValue"])]),l("div",ee,[r(f,{label:"Stock ",type:"text",placeholder:"Stock",modelValue:o.stock,"onUpdate:modelValue":t[3]||(t[3]=n=>o.stock=n),outlined:"",dense:""},null,8,["modelValue"])]),l("div",oe,[r(f,{label:"Low Stock Alert ",type:"text",placeholder:"Low Stock Alert",modelValue:o.lowStockAlert,"onUpdate:modelValue":t[4]||(t[4]=n=>o.lowStockAlert=n),outlined:"",dense:""},null,8,["modelValue"])]),l("div",te,[r(_,{label:"Select an option for Unit *",placeholder:"Value",modelValue:o.unit,"onUpdate:modelValue":t[5]||(t[5]=n=>o.unit=n),options:v.value,outlined:"",dense:""},null,8,["modelValue","options"]),(m=d.value)!=null&&m.unit?(k(),Q("div",se,[l("span",null,$((h=d.value)==null?void 0:h.unit),1)])):L("",!0)]),l("div",ae,[r(_,{label:"Select an option for Shop ",placeholder:"Value",modelValue:o.shop,"onUpdate:modelValue":t[6]||(t[6]=n=>o.shop=n),options:V.value,outlined:"",dense:""},null,8,["modelValue","options"])]),l("div",ne,[r(_,{label:"Select an option for Branch ",placeholder:"Value",modelValue:o.branch,"onUpdate:modelValue":t[7]||(t[7]=n=>o.branch=n),options:S.value,outlined:"",dense:""},null,8,["modelValue","options"])]),l("div",le,[r(O,{label:i.$route.params.id==="create"?"Create Product":"Update Product",color:"green",onClick:T},null,8,["label"])])])]}),_:1}))}};export{ke as default};