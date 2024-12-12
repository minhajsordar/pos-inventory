import{af as L,u as O,g as k,f as z,ac as I,o as u,c as H,w as J,b as n,a as d,ax as h,e as c,ak as f,aj as g,Q as K}from"./index-b55a7827.js";import{Q as j}from"./QSelect-c33eb5ef.js";import{Q as W}from"./QPage-615bd1f9.js";import{u as X,a as q}from"./use-quasar-96558313.js";import{u as Y,g as R}from"./userAuthStore-0c477450.js";import{e as w,s as F}from"./validationHelper-21a8e46b.js";import"./QChip-1b4874fe.js";import"./QItemLabel-82cf5c84.js";import"./selection-af93f90a.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const Z=n("div",{class:"p-0 text-h5 mb-2"}," Add new employee ",-1),D={class:"mb-6"},ee={key:0,class:"text-red-8 text-xs q-pl-sm"},oe={class:"mb-6"},ae={key:0,class:"text-red-8 text-xs q-pl-sm"},te={class:"mb-6"},se={class:"mb-6"},le={key:0,class:"text-red-8 text-xs q-pl-sm"},ne={class:"mb-6"},ie={key:0,class:"text-red-8 text-xs q-pl-sm"},de={class:"mb-6"},re={class:"mb-6"},me={class:"mb-6"},pe={key:0,class:"text-red-8 text-xs q-pl-sm"},he={class:"mb-6"},ue={class:"mb-6"},ce={key:0,class:"text-red-8 text-xs q-pl-sm"},fe={class:"mb-6"},ge={key:0,class:"text-red-8 text-xs q-pl-sm"},Be={__name:"EditEmployeeView",setup(be){const i=X();Y();const b=L(),U=O(),B=k([]),E=k([]),t=k({}),e=z({name:"",phone1:"",phone2:"",email:"",address:"",nidNo:"",birthRegistrationNo:"",fatherName:"",motherName:"",branch:"",shop:""}),r=z({name:"",phone1:"",phone2:"",email:"",address:"",nidNo:"",birthRegistrationNo:"",fatherName:"",motherName:"",branch:"",shop:""}),G=async()=>{var a;if(b.params.id=="create"){A(),S();return}const p={method:"GET",url:"api/employee/employee_lists/"+b.params.id,headers:{Authorization:`Bearer ${R("token")}`}};try{i.loading.show();const o=await q.request(p);i.loading.hide(),e.name=o.data.name,r.name=o.data.name,e.phone1=o.data.phone1,r.phone1=o.data.phone1,e.phone2=o.data.phone2,r.phone2=o.data.phone2,e.email=o.data.email,r.email=o.data.email,e.address=o.data.address,r.address=o.data.address,e.nidNo=o.data.nidNo,r.nidNo=o.data.nidNo,e.birthRegistrationNo=o.data.birthRegistrationNo,r.birthRegistrationNo=o.data.birthRegistrationNo,e.fatherName=o.data.fatherName,r.fatherName=o.data.fatherName,e.motherName=o.data.motherName,r.motherName=o.data.motherName,e.branch=o.data.branch,r.branch=o.data.branch,e.shop=o.data.shop,r.shop=o.data.shop}catch(o){((a=o==null?void 0:o.response)==null?void 0:a.status)==401?i.notify({message:o.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):i.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),i.loading.hide(),console.error(o)}finally{A(),S()}};I(()=>{G()});const A=async()=>{var a;const p={method:"GET",url:"api/branch/branch_lists",headers:{Authorization:`Bearer ${R("token")}`}};try{i.loading.show();const o=await q.request(p);B.value=o.data.branchs.map(s=>(s.label=s.name,s.value=s._id,e.branch===s._id&&(e.branch=s),s)),i.loading.hide()}catch(o){((a=o==null?void 0:o.response)==null?void 0:a.status)==401?i.notify({message:o.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):i.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),i.loading.hide(),console.error(o)}},S=async()=>{var a;const p={method:"GET",url:"api/shop/shop_lists",headers:{Authorization:`Bearer ${R("token")}`}};try{i.loading.show();const o=await q.request(p);E.value=o.data.shops.map(s=>(s.label=s.name,s.value=s._id,e.shop===s._id&&(e.shop=s),s)),i.loading.hide()}catch(o){((a=o==null?void 0:o.response)==null?void 0:a.status)==401?i.notify({message:o.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):i.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),i.loading.hide(),console.error(o)}},M=async p=>{var s,y,N,v,V,_,x;p.preventDefault(),t.value={};const a={};if(e.name&&(a.name=e.name),w(e.name)||(t.value.name="Required feild"),e.phone1&&(a.phone1=e.phone1),w(e.phone1)||(t.value.phone1="Required feild"),e.phone2&&(a.phone2=e.phone2),e.email&&(a.email=e.email),w(e.email)||(t.value.email="Required feild"),e.address&&(a.address=e.address),w(e.address)||(t.value.address="Required feild"),e.nidNo&&(a.nidNo=e.nidNo),e.birthRegistrationNo&&(a.birthRegistrationNo=e.birthRegistrationNo),e.fatherName&&(a.fatherName=e.fatherName),w(e.fatherName)||(t.value.fatherName="Required feild"),e.motherName&&(a.motherName=e.motherName),(s=e==null?void 0:e.branch)!=null&&s._id&&(a.branch=e.branch._id),F((y=e==null?void 0:e.branch)==null?void 0:y._id)||(t.value.branch="Required feild"),(N=e==null?void 0:e.shop)!=null&&N._id&&(a.shop=e.shop._id),F((v=e==null?void 0:e.shop)==null?void 0:v._id)||(t.value.shop="Required feild"),Object.keys(t.value).length!==0)return;if(Object.keys(a).length<=0){i.notify({message:"Empty Form Submission Not Allowed",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]});return}const o={headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${R("token")}`},data:a};b.params.id=="create"?(o.method="post",o.url="api/employee/employee_lists"):(o.method="put",o.url="api/employee/employee_lists/"+b.params.id);try{const m=await q.request(o);(V=b.query)!=null&&V.redirect?U.push(`/${(_=b.query)==null?void 0:_.redirect}`):U.push("/dashboard/employee/employee_list"),i.notify({message:"Updated Successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(m){((x=m==null?void 0:m.response)==null?void 0:x.status)==401?i.notify({message:m.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):i.notify({message:m.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),console.error(m)}};return(p,a)=>(u(),H(W,{padding:""},{default:J(()=>{var o,s,y,N,v,V,_,x,m,Q,$,P,C,T;return[Z,n("div",null,[n("div",D,[d(h,{label:"Name *",type:"text",placeholder:"Name",modelValue:e.name,"onUpdate:modelValue":a[0]||(a[0]=l=>e.name=l),outlined:"",dense:""},null,8,["modelValue"]),(o=t.value)!=null&&o.name?(u(),c("div",ee,[n("span",null,f((s=t.value)==null?void 0:s.name),1)])):g("",!0)]),n("div",oe,[d(h,{label:"Phone1 *",type:"text",placeholder:"Phone1",modelValue:e.phone1,"onUpdate:modelValue":a[1]||(a[1]=l=>e.phone1=l),outlined:"",dense:""},null,8,["modelValue"]),(y=t.value)!=null&&y.phone1?(u(),c("div",ae,[n("span",null,f((N=t.value)==null?void 0:N.phone1),1)])):g("",!0)]),n("div",te,[d(h,{label:"Phone2 ",type:"text",placeholder:"Phone2",modelValue:e.phone2,"onUpdate:modelValue":a[2]||(a[2]=l=>e.phone2=l),outlined:"",dense:""},null,8,["modelValue"])]),n("div",se,[d(h,{label:"Email *",type:"email",placeholder:"name@example.com",modelValue:e.email,"onUpdate:modelValue":a[3]||(a[3]=l=>e.email=l),outlined:"",dense:""},null,8,["modelValue"]),(v=t.value)!=null&&v.email?(u(),c("div",le,[n("span",null,f((V=t.value)==null?void 0:V.email),1)])):g("",!0)]),n("div",ne,[d(h,{label:"Address *",type:"text",placeholder:"Address",modelValue:e.address,"onUpdate:modelValue":a[4]||(a[4]=l=>e.address=l),outlined:"",dense:""},null,8,["modelValue"]),(_=t.value)!=null&&_.address?(u(),c("div",ie,[n("span",null,f((x=t.value)==null?void 0:x.address),1)])):g("",!0)]),n("div",de,[d(h,{label:"Nid no ",type:"text",placeholder:"Nid no",modelValue:e.nidNo,"onUpdate:modelValue":a[5]||(a[5]=l=>e.nidNo=l),outlined:"",dense:""},null,8,["modelValue"])]),n("div",re,[d(h,{label:"Birth registration no ",type:"text",placeholder:"Birth registration no",modelValue:e.birthRegistrationNo,"onUpdate:modelValue":a[6]||(a[6]=l=>e.birthRegistrationNo=l),outlined:"",dense:""},null,8,["modelValue"])]),n("div",me,[d(h,{label:"Father name *",type:"text",placeholder:"Father name",modelValue:e.fatherName,"onUpdate:modelValue":a[7]||(a[7]=l=>e.fatherName=l),outlined:"",dense:""},null,8,["modelValue"]),(m=t.value)!=null&&m.fatherName?(u(),c("div",pe,[n("span",null,f((Q=t.value)==null?void 0:Q.fatherName),1)])):g("",!0)]),n("div",he,[d(h,{label:"Mother name ",type:"text",placeholder:"Mother name",modelValue:e.motherName,"onUpdate:modelValue":a[8]||(a[8]=l=>e.motherName=l),outlined:"",dense:""},null,8,["modelValue"])]),n("div",ue,[d(j,{label:"Select an option for Branch *",placeholder:"Value",modelValue:e.branch,"onUpdate:modelValue":a[9]||(a[9]=l=>e.branch=l),options:B.value,outlined:"",dense:""},null,8,["modelValue","options"]),($=t.value)!=null&&$.branch?(u(),c("div",ce,[n("span",null,f((P=t.value)==null?void 0:P.branch),1)])):g("",!0)]),n("div",fe,[d(j,{label:"Select an option for Shop *",placeholder:"Value",modelValue:e.shop,"onUpdate:modelValue":a[10]||(a[10]=l=>e.shop=l),options:E.value,outlined:"",dense:""},null,8,["modelValue","options"]),(C=t.value)!=null&&C.shop?(u(),c("div",ge,[n("span",null,f((T=t.value)==null?void 0:T.shop),1)])):g("",!0)]),d(K,{label:p.$route.params.id==="create"?"Create Employee":"Update Employee",color:"green",onClick:M},null,8,["label"])])]}),_:1}))}};export{Be as default};
