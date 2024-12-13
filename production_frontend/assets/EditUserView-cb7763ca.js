import{af as j,u as J,g as b,f as C,ac as D,E as I,o as h,c as M,w as H,b as p,a as m,ax as k,e as g,ak as _,aj as f,ai as K,ah as W,Q as X}from"./index-1afe7156.js";import{Q as V}from"./QSelect-38e1999a.js";import{Q as Y}from"./QPage-dbe3b711.js";import{u as Z,a as y}from"./use-quasar-7dcfde9a.js";import{u as ee,g as w}from"./userAuthStore-bea79ead.js";import{e as P}from"./validationHelper-21a8e46b.js";import"./QChip-67221c42.js";import"./QItemLabel-80fbf0da.js";import"./selection-d27bdc72.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const se=p("div",{class:"p-0 text-h5 mb-2"}," Add new user ",-1),oe={class:"mb-6"},ae={class:"mb-6"},te={key:0,class:"text-red-8 text-xs q-pl-sm"},ie={class:"mb-6"},le={key:0,class:"text-red-8 text-xs q-pl-sm"},re={class:"mb-6"},ne={key:0,class:"mb-6"},de={class:"mb-6"},pe={key:0,class:"text-red-8 text-xs q-pl-sm"},ce={class:"mb-6"},me={key:0,class:"text-red-8 text-xs q-pl-sm"},Ue={__name:"EditUserView",setup(ue){const t=Z(),R=ee(),v=j();J();const x=b([]),U=b([]),N=b([]),S=b([]),d=b({}),s=C({userName:"",email:"",password:"",shop:"",branch:"",permissions:[],roles:[]}),u=C({userName:"",email:"",password:"",shop:"",branch:"",permissions:[],roles:[]}),G=async()=>{var o;if(v.params.id=="create"){A(),B(),q();return}const n={method:"GET",url:"api/user/user_lists/"+v.params.id,headers:{Authorization:`Bearer ${w("token")}`}};try{t.loading.show();const e=await y.request(n);t.loading.hide(),s.userName=e.data.userName,u.userName=e.data.userName,s.email=e.data.email,u.email=e.data.email,s.password=e.data.password,u.password=e.data.password,s.shop=e.data.shop,u.shop=e.data.shop,s.branch=e.data.branch,u.branch=e.data.branch,s.roles=e.data.roles,u.roles=e.data.roles,s.permissions=e.data.permissions,u.permissions=e.data.permissions}catch(e){((o=e==null?void 0:e.response)==null?void 0:o.status)==401?t.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),t.loading.hide(),console.error(e)}finally{A(),B(),q()}};D(()=>{G()});const q=async()=>{var o;const n={method:"GET",url:"api/shop/shop_lists",headers:{Authorization:`Bearer ${w("token")}`}};try{t.loading.show();const e=await y.request(n);N.value=e.data.shops.map(a=>(a.label=a.name,a.value=a._id,s.shop===a._id&&(s.shop=a),a)),t.loading.hide()}catch(e){((o=e==null?void 0:e.response)==null?void 0:o.status)==401?t.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),t.loading.hide(),console.error(e)}};I(()=>s.shop,function(){F()});const F=async()=>{var o,e;const n={method:"GET",url:"api/branch/branch_lists",headers:{Authorization:`Bearer ${w("token")}`},params:{keywords:typeof s.shop=="string"?s.shop:(o=s.shop)==null?void 0:o._id,filterColumn:"shop"}};try{t.loading.show();const a=await y.request(n);S.value=a.data.branchs.map(i=>(i.label=i.name,i.value=i._id,s.branch===i._id&&(s.branch=i),i)),console.log("branch",s.branch),t.loading.hide()}catch(a){((e=a==null?void 0:a.response)==null?void 0:e.status)==401?t.notify({message:a.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:a.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),t.loading.hide(),console.error(a)}},A=async()=>{var o;const n={method:"GET",url:"api/permissions/",headers:{Authorization:`Bearer ${w("token")}`}};try{t.loading.show();const e=await y.request(n);t.loading.hide(),x.value=e.data.permissions,console.log("Form data permission: ",s.permissions),s.permissions=s.permissions.map(a=>{const i=e.data.permissions.find(r=>r==a),c={};return c.label=i,c.value=i,c})}catch(e){((o=e==null?void 0:e.response)==null?void 0:o.status)==401?t.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),t.loading.hide(),console.error(e)}finally{}},B=async()=>{var o;const n={method:"GET",url:"api/roles/",headers:{Authorization:`Bearer ${w("token")}`}};try{t.loading.show();const e=await y.request(n);t.loading.hide(),U.value=e.data.roles.map(a=>(a.label=a.name,a.value=a._id,a)),console.log("Form data roles: ",s.roles),s.roles=s.roles.map(a=>{const i=e.data.roles.find(c=>c._id==a);return console.log("ob ",i),i.label=i.name,i.value=i._id,i})}catch(e){((o=e==null?void 0:e.response)==null?void 0:o.status)==401?t.notify({message:e.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:e.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),t.loading.hide(),console.error(e)}finally{}},O=async n=>{var a,i,c;n.preventDefault(),d.value={};const o={};if(s.userName&&(o.userName=s.userName),s.email&&(o.email=s.email),P(s.email)||(d.value.email="Required feild"),s.password&&(o.password=s.password),P(s.password)||(d.value.password="Required feild"),(a=s==null?void 0:s.shop)!=null&&a._id&&(o.shop=s.shop._id),(i=s==null?void 0:s.branch)!=null&&i._id&&(o.branch=s.branch._id),o.roles=JSON.stringify(s.roles.map(r=>r._id)),o.permissions=JSON.stringify(s.permissions),Object.keys(d.value).length!==0)return;if(Object.keys(o).length<=0){t.notify({message:"Empty Form Submission Not Allowed",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]});return}const e={headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${w("token")}`},data:o};v.params.id=="create"?(e.method="post",e.url="api/user/user_lists"):(e.method="put",e.url="api/user/user_lists/"+v.params.id);try{const r=await y.request(e);t.notify({message:"Updated Successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(r){((c=r==null?void 0:r.response)==null?void 0:c.status)==401?t.notify({message:r.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:r.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),console.error(r)}};return(n,o)=>(h(),M(Y,{padding:""},{default:H(()=>{var e,a,i,c,r,E,L,Q,$,T,z;return[se,p("div",null,[p("div",oe,[m(k,{label:"User name ",type:"text",placeholder:"User name",modelValue:s.userName,"onUpdate:modelValue":o[0]||(o[0]=l=>s.userName=l),outlined:"",dense:""},null,8,["modelValue"])]),p("div",ae,[m(k,{label:"Email *",type:"email",placeholder:"name@example.com",modelValue:s.email,"onUpdate:modelValue":o[1]||(o[1]=l=>s.email=l),outlined:"",dense:""},null,8,["modelValue"]),(e=d.value)!=null&&e.email?(h(),g("div",te,[p("span",null,_((a=d.value)==null?void 0:a.email),1)])):f("",!0)]),p("div",ie,[m(k,{label:"Password *",type:"text",placeholder:"Password",modelValue:s.password,"onUpdate:modelValue":o[2]||(o[2]=l=>s.password=l),outlined:"",dense:""},null,8,["modelValue"]),(i=d.value)!=null&&i.password?(h(),g("div",le,[p("span",null,_((c=d.value)==null?void 0:c.password),1)])):f("",!0)]),(L=(E=(r=K(R))==null?void 0:r.userData)==null?void 0:E.roles)!=null&&L.some(l=>l.slug==="superAdmin")?(h(),g(W,{key:0},[p("div",re,[m(V,{label:"Select A Shop ",placeholder:"Value",modelValue:s.shop,"onUpdate:modelValue":o[3]||(o[3]=l=>s.shop=l),options:N.value,outlined:"",dense:"","use-chips":""},null,8,["modelValue","options"])]),s.shop?(h(),g("div",ne,[m(V,{label:"Select A Branch ",placeholder:"Value",modelValue:s.branch,"onUpdate:modelValue":o[4]||(o[4]=l=>s.branch=l),options:S.value,outlined:"",dense:"","use-chips":""},null,8,["modelValue","options"])])):f("",!0)],64)):f("",!0),p("div",de,[m(V,{label:"Select User Permission *",placeholder:"Value",modelValue:s.permissions,"onUpdate:modelValue":o[5]||(o[5]=l=>s.permissions=l),options:[...x.value],outlined:"",dense:"",multiple:"","use-chips":""},null,8,["modelValue","options"]),(Q=d.value)!=null&&Q.permissions?(h(),g("div",pe,[p("span",null,_(($=d.value)==null?void 0:$.permissions),1)])):f("",!0)]),p("div",ce,[m(V,{label:"Select User Role *",placeholder:"Value",modelValue:s.roles,"onUpdate:modelValue":o[6]||(o[6]=l=>s.roles=l),options:[...U.value],outlined:"",dense:"",multiple:"","use-chips":""},null,8,["modelValue","options"]),(T=d.value)!=null&&T.roles?(h(),g("div",me,[p("span",null,_((z=d.value)==null?void 0:z.roles),1)])):f("",!0)]),m(X,{label:n.$route.params.id==="create"?"Create User":"Update User",color:"green",onClick:O},null,8,["label"])])]}),_:1}))}};export{Ue as default};
