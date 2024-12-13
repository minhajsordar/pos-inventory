import{af as Q,u as A,g,f as B,ac as E,o as U,c as $,w as L,b as c,a as p,ax as C,e as T,ak as z,aj as N,Q as j}from"./index-1afe7156.js";import{Q as S}from"./QSelect-38e1999a.js";import{Q as G}from"./QPage-dbe3b711.js";import{u as R,a as u}from"./use-quasar-7dcfde9a.js";import{u as O,g as h}from"./userAuthStore-bea79ead.js";import{e as P}from"./validationHelper-21a8e46b.js";import"./QChip-67221c42.js";import"./QItemLabel-80fbf0da.js";import"./selection-d27bdc72.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const F=c("div",{class:"p-0 text-h5 mb-2"}," Add new unit ",-1),I={class:"mb-6"},M={key:0,class:"text-red-8 text-xs q-pl-sm"},D={class:"mb-6"},H={class:"mb-6"},ie={__name:"EditUnitView",setup(J){const s=R();O();const l=Q(),f=A(),v=g([]),y=g([]),d=g({}),o=B({value:"",shop:"",branch:""}),m=B({value:"",shop:"",branch:""}),q=async()=>{var a;if(l.params.id=="create"){b(),_();return}const n={method:"GET",url:"api/unit/unit_lists/"+l.params.id,headers:{Authorization:`Bearer ${h("token")}`}};try{s.loading.show();const e=await u.request(n);s.loading.hide(),o.value=e.data.value,m.value=e.data.value,o.shop=e.data.shop,m.shop=e.data.shop,o.branch=e.data.branch,m.branch=e.data.branch}catch(e){((a=e==null?void 0:e.response)==null?void 0:a.status)==401?s.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):s.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),s.loading.hide(),console.error(e)}finally{b(),_()}};E(()=>{q()});const b=async()=>{var a;const n={method:"GET",url:"api/shop/shop_lists",headers:{Authorization:`Bearer ${h("token")}`}};try{s.loading.show();const e=await u.request(n);v.value=e.data.shops.map(t=>(t.label=t.name,t.value=t._id,o.shop===t._id&&(o.shop=t),t)),s.loading.hide()}catch(e){((a=e==null?void 0:e.response)==null?void 0:a.status)==401?s.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):s.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),s.loading.hide(),console.error(e)}},_=async()=>{var a;const n={method:"GET",url:"api/branch/branch_lists",headers:{Authorization:`Bearer ${h("token")}`}};try{s.loading.show();const e=await u.request(n);y.value=e.data.branchs.map(t=>(t.label=t.name,t.value=t._id,o.branch===t._id&&(o.branch=t),t)),s.loading.hide()}catch(e){((a=e==null?void 0:e.response)==null?void 0:a.status)==401?s.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):s.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),s.loading.hide(),console.error(e)}},x=async n=>{var t,i,w,V,k;n.preventDefault(),d.value={};const a={};if(o.value&&(a.value=o.value),P(o.value)||(d.value.value="Required feild"),(t=o==null?void 0:o.shop)!=null&&t._id&&(a.shop=o.shop._id),(i=o==null?void 0:o.branch)!=null&&i._id&&(a.branch=o.branch._id),Object.keys(d.value).length!==0)return;if(Object.keys(a).length<=0){s.notify({message:"Empty Form Submission Not Allowed",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]});return}const e={headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${h("token")}`},data:a};l.params.id=="create"?(e.method="post",e.url="api/unit/unit_lists"):(e.method="put",e.url="api/unit/unit_lists/"+l.params.id);try{const r=await u.request(e);(w=l.query)!=null&&w.redirect?f.push(`/${(V=l.query)==null?void 0:V.redirect}`):f.push("/dashboard/unit/unite_list"),s.notify({message:"Updated Successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(r){((k=r==null?void 0:r.response)==null?void 0:k.status)==401?s.notify({message:r.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):s.notify({message:r.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),console.error(r)}};return(n,a)=>(U(),$(G,{padding:""},{default:L(()=>{var e,t;return[F,c("div",null,[c("div",I,[p(C,{label:"Select an option for Value *",placeholder:"Value",type:"text",modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=i=>o.value=i),outlined:"",dense:""},null,8,["modelValue"]),(e=d.value)!=null&&e.value?(U(),T("div",M,[c("span",null,z((t=d.value)==null?void 0:t.value),1)])):N("",!0)]),c("div",D,[p(S,{label:"Select an option for Shop ",placeholder:"Value",modelValue:o.shop,"onUpdate:modelValue":a[1]||(a[1]=i=>o.shop=i),options:v.value,outlined:"",dense:""},null,8,["modelValue","options"])]),c("div",H,[p(S,{label:"Select an option for Branch ",placeholder:"Value",modelValue:o.branch,"onUpdate:modelValue":a[2]||(a[2]=i=>o.branch=i),options:y.value,outlined:"",dense:""},null,8,["modelValue","options"])]),p(j,{label:n.$route.params.id==="create"?"Create Unit":"Update Unit",color:"green",onClick:x},null,8,["label"])])]}),_:1}))}};export{ie as default};
