import{af as _,u as w,g as k,f,ac as x,o as g,c as S,w as U,b as l,a as r,ax as u,e as q,ak as A,aj as B,Q as C}from"./index-1afe7156.js";import{Q as D}from"./QPage-dbe3b711.js";import{u as E,a as V}from"./use-quasar-7dcfde9a.js";import{u as Q,g as N}from"./userAuthStore-bea79ead.js";import{e as $}from"./validationHelper-21a8e46b.js";const L=l("div",{class:"p-0 text-h5 mb-2"}," Add new supplier ",-1),j={class:"mb-6"},P={key:0,class:"text-red-8 text-xs q-pl-sm"},R={class:"mb-6"},T={class:"mb-6"},z={class:"mb-6"},O={class:"mb-6"},K={__name:"EditSupplierView",setup(F){const t=E();Q();const n=_(),h=w(),d=k({}),e=f({companyName:"",details:"",phone:"",email:"",address:""}),p=f({companyName:"",details:"",phone:"",email:"",address:""}),b=async()=>{var o;if(n.params.id=="create")return;const m={method:"GET",url:"api/supplier/supplier_lists/"+n.params.id,headers:{Authorization:`Bearer ${N("token")}`}};try{t.loading.show();const a=await V.request(m);t.loading.hide(),e.companyName=a.data.companyName,p.companyName=a.data.companyName,e.details=a.data.details,p.details=a.data.details,e.phone=a.data.phone,p.phone=a.data.phone,e.email=a.data.email,p.email=a.data.email,e.address=a.data.address,p.address=a.data.address}catch(a){((o=a==null?void 0:a.response)==null?void 0:o.status)==401?t.notify({message:a.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:a.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),t.loading.hide(),console.error(a)}finally{}};x(()=>{b()});const v=async m=>{var c,s,y;m.preventDefault(),d.value={};const o={};if(e.companyName&&(o.companyName=e.companyName),$(e.companyName)||(d.value.companyName="Required feild"),e.details&&(o.details=e.details),e.phone&&(o.phone=e.phone),e.email&&(o.email=e.email),e.address&&(o.address=e.address),Object.keys(d.value).length!==0)return;if(Object.keys(o).length<=0){t.notify({message:"Empty Form Submission Not Allowed",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]});return}const a={headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${N("token")}`},data:o};n.params.id=="create"?(a.method="post",a.url="api/supplier/supplier_lists"):(a.method="put",a.url="api/supplier/supplier_lists/"+n.params.id);try{const i=await V.request(a);(c=n.query)!=null&&c.redirect?h.push(`/${(s=n.query)==null?void 0:s.redirect}`):h.push("/dashboard/supplier/supplier_list"),t.notify({message:"Updated Successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(i){((y=i==null?void 0:i.response)==null?void 0:y.status)==401?t.notify({message:i.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):t.notify({message:i.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),console.error(i)}};return(m,o)=>(g(),S(D,{padding:""},{default:U(()=>{var a,c;return[L,l("div",null,[l("div",j,[r(u,{label:"Company name *",type:"text",placeholder:"Company name",modelValue:e.companyName,"onUpdate:modelValue":o[0]||(o[0]=s=>e.companyName=s),outlined:"",dense:""},null,8,["modelValue"]),(a=d.value)!=null&&a.companyName?(g(),q("div",P,[l("span",null,A((c=d.value)==null?void 0:c.companyName),1)])):B("",!0)]),l("div",R,[r(u,{label:"Phone ",type:"tel",placeholder:"+1 012345644",modelValue:e.phone,"onUpdate:modelValue":o[1]||(o[1]=s=>e.phone=s),outlined:"",dense:""},null,8,["modelValue"])]),l("div",T,[r(u,{label:"Email ",type:"email",placeholder:"name@example.com",modelValue:e.email,"onUpdate:modelValue":o[2]||(o[2]=s=>e.email=s),outlined:"",dense:""},null,8,["modelValue"])]),l("div",z,[r(u,{label:"Address ",type:"text",placeholder:"Address",modelValue:e.address,"onUpdate:modelValue":o[3]||(o[3]=s=>e.address=s),outlined:"",dense:""},null,8,["modelValue"])]),l("div",O,[r(u,{label:"Details ",type:"textarea",placeholder:"Details",modelValue:e.details,"onUpdate:modelValue":o[4]||(o[4]=s=>e.details=s),outlined:"",dense:""},null,8,["modelValue"])]),r(C,{label:m.$route.params.id==="create"?"Create Supplier":"Update Supplier",color:"green",onClick:v},null,8,["label"])])]}),_:1}))}};export{K as default};
