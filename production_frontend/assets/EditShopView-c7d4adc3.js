import{af as P,u as Q,g as C,f as R,ac as $,o as u,c as D,w as j,b as a,a as i,ax as p,e as c,ak as h,aj as f,Q as T}from"./index-1afe7156.js";import{Q as z}from"./QPage-dbe3b711.js";import{u as O,a as A}from"./use-quasar-7dcfde9a.js";import{u as W,g as B}from"./userAuthStore-bea79ead.js";import{e as w}from"./validationHelper-21a8e46b.js";const F=a("div",{class:"p-0 text-h5 mb-2"}," Add new shop ",-1),G={class:"flex -m-2"},I={class:"p-2 w-full md:w-1/2"},M={key:0,class:"text-red-8 text-xs q-pl-sm"},H={class:"p-2 w-full md:w-1/2"},J={key:0,class:"text-red-8 text-xs q-pl-sm"},K={class:"p-2 w-full md:w-1/2"},X={key:0,class:"text-red-8 text-xs q-pl-sm"},Y={class:"p-2 w-full md:w-1/2"},Z={key:0,class:"text-red-8 text-xs q-pl-sm"},ee={class:"p-2 w-full md:w-1/2"},se={class:"p-2 w-full md:w-1/2"},oe={class:"p-2 w-full md:w-1/2"},te={key:0,class:"text-red-8 text-xs q-pl-sm"},ae={class:"p-2 w-full"},le={key:0,class:"text-red-8 text-xs q-pl-sm"},ne={class:"p-2 w-full"},ce={__name:"EditShopView",setup(de){const d=O();W();const m=P(),b=Q(),t=C({}),e=R({name:"",address:"",phone1:"",phone2:"",email:"",website:"",license:"",note:""}),r=R({name:"",address:"",phone1:"",phone2:"",email:"",website:"",license:"",note:""}),E=async()=>{var o;if(m.params.id=="create")return;const v={method:"GET",url:"api/shop/shop_lists/"+m.params.id,headers:{Authorization:`Bearer ${B("token")}`}};try{d.loading.show();const s=await A.request(v);d.loading.hide(),e.name=s.data.name,r.name=s.data.name,e.address=s.data.address,r.address=s.data.address,e.phone1=s.data.phone1,r.phone1=s.data.phone1,e.phone2=s.data.phone2,r.phone2=s.data.phone2,e.email=s.data.email,r.email=s.data.email,e.website=s.data.website,r.website=s.data.website,e.license=s.data.license,r.license=s.data.license,e.note=s.data.note,r.note=s.data.note}catch(s){((o=s==null?void 0:s.response)==null?void 0:o.status)==401?d.notify({message:s.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):d.notify({message:s.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),d.loading.hide(),console.error(s)}finally{}};$(()=>{E()});const L=async v=>{var y,x,_;v.preventDefault(),t.value={};const o={};if(e.name&&(o.name=e.name),w(e.name)||(t.value.name="Required feild"),e.address&&(o.address=e.address),w(e.address)||(t.value.address="Required feild"),e.phone1&&(o.phone1=e.phone1),w(e.phone1)||(t.value.phone1="Required feild"),e.phone2&&(o.phone2=e.phone2),w(e.phone2)||(t.value.phone2="Required feild"),e.email&&(o.email=e.email),e.website&&(o.website=e.website),e.license&&(o.license=e.license),w(e.license)||(t.value.license="Required feild"),e.note&&(o.note=e.note),w(e.note)||(t.value.note="Required feild"),Object.keys(t.value).length!==0)return;if(Object.keys(o).length<=0){d.notify({message:"Empty Form Submission Not Allowed",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]});return}const s={headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${B("token")}`},data:o};m.params.id=="create"?(s.method="post",s.url="api/shop/shop_lists"):(s.method="put",s.url="api/shop/shop_lists/"+m.params.id);try{const n=await A.request(s);(y=m.query)!=null&&y.redirect?b.push(`/${(x=m.query)==null?void 0:x.redirect}`):b.push("/dashboard/shop/shop_list"),d.notify({message:"Updated Successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(n){((_=n==null?void 0:n.response)==null?void 0:_.status)==401?d.notify({message:n.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):d.notify({message:n.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),console.error(n)}};return(v,o)=>(u(),D(z,{padding:""},{default:j(()=>{var s,y,x,_,n,g,V,q,k,U,S,N;return[F,a("div",G,[a("div",I,[i(p,{label:"Name *",type:"text",placeholder:"Name",modelValue:e.name,"onUpdate:modelValue":o[0]||(o[0]=l=>e.name=l),outlined:"",dense:""},null,8,["modelValue"]),(s=t.value)!=null&&s.name?(u(),c("div",M,[a("span",null,h((y=t.value)==null?void 0:y.name),1)])):f("",!0)]),a("div",H,[i(p,{label:"Address *",type:"text",placeholder:"Address",modelValue:e.address,"onUpdate:modelValue":o[1]||(o[1]=l=>e.address=l),outlined:"",dense:""},null,8,["modelValue"]),(x=t.value)!=null&&x.address?(u(),c("div",J,[a("span",null,h((_=t.value)==null?void 0:_.address),1)])):f("",!0)]),a("div",K,[i(p,{label:"Phone1 *",type:"text",placeholder:"Phone1",modelValue:e.phone1,"onUpdate:modelValue":o[2]||(o[2]=l=>e.phone1=l),outlined:"",dense:""},null,8,["modelValue"]),(n=t.value)!=null&&n.phone1?(u(),c("div",X,[a("span",null,h((g=t.value)==null?void 0:g.phone1),1)])):f("",!0)]),a("div",Y,[i(p,{label:"Phone2 *",type:"text",placeholder:"Phone2",modelValue:e.phone2,"onUpdate:modelValue":o[3]||(o[3]=l=>e.phone2=l),outlined:"",dense:""},null,8,["modelValue"]),(V=t.value)!=null&&V.phone2?(u(),c("div",Z,[a("span",null,h((q=t.value)==null?void 0:q.phone2),1)])):f("",!0)]),a("div",ee,[i(p,{label:"Email",type:"email",placeholder:"name@example.com",modelValue:e.email,"onUpdate:modelValue":o[4]||(o[4]=l=>e.email=l),outlined:"",dense:""},null,8,["modelValue"])]),a("div",se,[i(p,{label:"Website",type:"text",placeholder:"Website",modelValue:e.website,"onUpdate:modelValue":o[5]||(o[5]=l=>e.website=l),outlined:"",dense:""},null,8,["modelValue"])]),a("div",oe,[i(p,{label:"License *",type:"text",placeholder:"License",modelValue:e.license,"onUpdate:modelValue":o[6]||(o[6]=l=>e.license=l),outlined:"",dense:""},null,8,["modelValue"]),(k=t.value)!=null&&k.license?(u(),c("div",te,[a("span",null,h((U=t.value)==null?void 0:U.license),1)])):f("",!0)]),a("div",ae,[i(p,{label:"Note *",type:"textarea",placeholder:"Note",modelValue:e.note,"onUpdate:modelValue":o[7]||(o[7]=l=>e.note=l),outlined:"",dense:""},null,8,["modelValue"]),(S=t.value)!=null&&S.note?(u(),c("div",le,[a("span",null,h((N=t.value)==null?void 0:N.note),1)])):f("",!0)]),a("div",ne,[i(T,{label:v.$route.params.id==="create"?"Create Shop":"Update Shop",color:"green",onClick:L},null,8,["label"])])])]}),_:1}))}};export{ce as default};
