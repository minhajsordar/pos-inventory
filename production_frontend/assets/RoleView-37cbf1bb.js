import{f as F,g,af as ee,u as oe,ac as se,E as te,a1 as le,o as d,c as b,w as h,b as m,ai as V,Q as k,aj as q,a as p,n as $,e as f,ah as Q,ag as D,h as ae,au as T,d as re,av as ne,j,aw as ie,ak as M,aX as ue}from"./index-b55a7827.js";import{Q as ce}from"./QMarkupTable-1fc170d9.js";import{Q as de}from"./QPage-615bd1f9.js";import{C as J}from"./QSpace-f8c655d3.js";import{u as me,a as P}from"./use-quasar-96558313.js";import{T as pe}from"./QTable-c3bf5ca2.js";import{a as x}from"./validationHelper-21a8e46b.js";import{u as ge,g as O}from"./userAuthStore-0c477450.js";import{_ as ye}from"./CompactQTable-d15efe1b.js";import"./QList-f8bcfa4e.js";import"./QSelect-c33eb5ef.js";import"./QChip-1b4874fe.js";import"./QItemLabel-82cf5c84.js";import"./selection-af93f90a.js";import"./rtl-36dd996b.js";import"./format-6ceb96d6.js";const he={class:"w-full flex justify-end pb-3"},fe={class:"relative overflow-x-auto shadow-md sm:rounded-lg"},we={class:"q-pa-md"},ve={key:0,class:"q-pa-md"},be=m("th",{class:"text-left",style:{position:"sticky","z-index":"1",left:"0px","background-color":"white","border-right":"1px solid rgba(0, 0, 0, 0.12)"}}," Role ",-1),ke=m("th",{class:"text-right",style:{position:"sticky","z-index":"1",right:"0px","background-color":"white","border-left":"1px solid rgba(0, 0, 0, 0.12)"}}," Action ",-1),qe={style:{position:"sticky","z-index":"1",left:"0px","background-color":"white","border-right":"1px solid rgba(0, 0, 0, 0.12)"}},_e={class:"q-pa-md"},Ce={class:"text-right",style:{position:"sticky","z-index":"1",right:"0px","background-color":"white","border-left":"1px solid rgba(0, 0, 0, 0.12)"}},Ve=m("div",{class:"text-h6"},"Medium",-1),Le={__name:"RoleView",setup(Pe){const e=F({sortBy:"createdAt",descending:!0,page:1,rowsPerPage:10,keywords:null,gte:null,lte:null,gtValue:null,ltValue:null,filterColumn:null,rangeColumn:null}),w=g("roles"),E=g({}),l=g(null),S=g([]),v=g([]),N=g([]),a=me(),C=ge(),_=g(!1),B=g(null),G=g(!1),t=ee(),U=oe(),L=s=>{e.keywords=s.keywords,e.gt=s.gt,e.lt=s.lt,e.gtValue=s.gtValue,e.ltValue=s.ltValue,e.filterColumn=s.filterColumn,e.rangeColumn=s.rangeColumn},X=s=>{e.page=s.page,e.rowsPerPage=s.rowsPerPage,e.descending=s.descending,e.sortBy=s.sortBy||"createdAt"},H=s=>{U.push(`/dashboard/role/role_list/${s._id}`)},I=s=>{B.value=s._id,_.value=!0},R=async()=>{var r;const s={method:"GET",url:"api/roles",headers:{Authorization:`Bearer ${O("token")}`},params:{pageNumber:(e==null?void 0:e.page)||1,pageSize:(e==null?void 0:e.rowsPerPage)||10,descending:e==null?void 0:e.descending,sortBy:(e==null?void 0:e.sortBy)||"createdAt",select:" "}};e!=null&&e.keywords&&(s.params.keywords=e.keywords),e!=null&&e.gt&&(s.params.gt=e.gt),e!=null&&e.lt&&(s.params.lt=e.lt),x(e==null?void 0:e.gtValue)&&(s.params.gtValue=e.gtValue),x(e==null?void 0:e.ltValue)&&(s.params.ltValue=e.ltValue),e!=null&&e.filterColumn&&(s.params.filterColumn=e.filterColumn),e!=null&&e.rangeColumn&&(s.params.rangeColumn=e.rangeColumn),a.loading.show();try{const o=await P.request(s);l.value=o.data,a.loading.hide()}catch(o){console.log(o),a.loading.hide(),((r=o==null?void 0:o.response)==null?void 0:r.status)==401?a.notify({message:o.response.data.message+", Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}finally{K()}};se(()=>{var s,r,o,i;t.query.hasOwnProperty("pageNumber")&&(e.pageNumber=Number((s=t.query)==null?void 0:s.pageNumber)),t.query.hasOwnProperty("pageSize")&&(e.pageSize=Number((r=t.query)==null?void 0:r.pageSize)),t.query.hasOwnProperty("descending")&&(e.descending=JSON.parse((o=t.query)==null?void 0:o.descending)),t.query.hasOwnProperty("sortBy")&&(e.sortBy=String((i=t.query)==null?void 0:i.sortBy)),t.query.hasOwnProperty("keywords")&&t.query.keywords&&t.query.keywords!=="null"&&(e.keywords=t.query.keywords),t.query.hasOwnProperty("gt")&&t.query.gt&&t.query.gt!=="null"&&(e.gt=String(t.query.gt)),t.query.hasOwnProperty("lt")&&t.query.lt&&t.query.lt!=="null"&&(e.lt=String(t.query.lt)),t.query.hasOwnProperty("gtValue")&&x(t.query.gtValue)&&(e.gtValue=Number(t.query.gtValue)),t.query.hasOwnProperty("ltValue")&&x(t.query.ltValue)&&(e.ltValue=Number(t.query.ltValue)),t.query.hasOwnProperty("filterColumn")&&t.query.filterColumn&&t.query.filterColumn!=="null"&&(e.filterColumn=String(t.query.filterColumn)),t.query.hasOwnProperty("rangeColumn")&&t.query.rangeColumn&&t.query.rangeColumn!=="null"&&(e.rangeColumn=String(t.query.rangeColumn)),R()});const K=async()=>{var r;const s={method:"GET",url:"api/permissions/",headers:{Authorization:`Bearer ${O("token")}`}};try{a.loading.show();const o=await P.request(s);a.loading.hide(),S.value=o.data.permissions;const i=[];for(let u=0;u<l.value.roles.length;u++){console.log(l.value.roles[u].permissions);for(let c=0;c<o.data.permissions.length;c++){const n=!!l.value.roles[u].permissions.find(y=>y===o.data.permissions[c]);i[u]?i[u].push(n):i.push([n])}}console.log("Permission Role Map: ",i),v.value=i,N.value=o.data.permissions,console.log(i,N.value)}catch(o){((r=o==null?void 0:o.response)==null?void 0:r.status)==401?a.notify({message:o.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),a.loading.hide(),console.error(o)}finally{}},W=async(s,r)=>{var c;E.value={};const o={},i=[];for(let n=0;n<v.value[s].length;n++)v.value[s][n]&&i.push(N.value[n]);if(o.permissions=JSON.stringify(i),Object.keys(E.value).length!==0)return;if(Object.keys(o).length<=0){a.notify({message:"Empty Form Submission Not Allowed",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]});return}const u={headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${O("token")}`},data:o};u.method="put",u.url="api/roles/"+r;try{const n=await P.request(u);U.push("/dashboard/role/role_list"),a.notify({message:"Updated Successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(n){((c=n==null?void 0:n.response)==null?void 0:c.status)==401?a.notify({message:n.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:n.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),console.error(n)}};te(e,le(R,1e3));const Y=async()=>{var r;const s={method:"delete",url:"api/roles/"+B.value,headers:{Authorization:`Bearer ${O("token")}`}};try{a.loading.show(),await P.request(s);const o=l==null?void 0:l.value.units.filter(i=>i._id!==B.value);l.value={...JSON.parse(JSON.stringify(l==null?void 0:l.value)),units:o},(l==null?void 0:l.value.units.length)<5&&(l==null?void 0:l.value.pages)!==1&&R(),a.loading.hide(),_.value=!1,a.notify({message:"Deleted successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(o){_.value=!1,((r=o==null?void 0:o.response)==null?void 0:r.status)==401?a.notify({message:o.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):a.notify({message:o.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),a.loading.hide(),console.error(o)}},Z=[{name:"name",label:"Name",align:"left",field:"name",sortable:!0},{name:"slug",label:"Slug",align:"left",field:"slug",sortable:!0},{name:"description",label:"Description",align:"left",field:"description",sortable:!0},{name:"action",label:"Action",field:"action"}];return(s,r)=>(d(),b(de,{padding:""},{default:h(()=>{var o,i,u;return[m("div",he,[V(C).checkShowOnPermission("createRole")?(d(),b(k,{key:0,style:{background:"green",color:"white"},label:"New Role",to:"/dashboard/role/role_list/create","no-caps":""})):q("",!0)]),m("div",fe,[m("div",we,[p(k,{class:$([w.value=="roles"?"bg-primary":"bg-secondary","text-white"]),label:"Roles",onClick:r[0]||(r[0]=c=>w.value="roles"),"no-caps":""},null,8,["class"]),p(k,{class:$([w.value=="rolespermission"?"bg-primary":"bg-secondary","text-white q-ml-sm"]),label:"Grid View",onClick:r[1]||(r[1]=c=>w.value="rolespermission"),"no-caps":""},null,8,["class"])]),w.value==="rolespermission"?(d(),f("div",ve,[p(ce,{flat:"",bordered:"",separator:"cell"},{default:h(()=>{var c;return[m("thead",null,[m("tr",null,[be,(d(!0),f(Q,null,D(S.value,(n,y)=>(d(),f("th",{key:y,class:"text-left"},M(n),1))),128)),ke])]),m("tbody",null,[(d(!0),f(Q,null,D(((c=l.value)==null?void 0:c.roles)||[],(n,y)=>(d(),f("tr",{key:"roles"+y,class:"text-left"},[m("td",qe,M(n.name),1),(d(!0),f(Q,null,D(S.value,(xe,z)=>(d(),f("td",{key:"permission"+z,class:"text-left"},[m("div",_e,[v.value.length>0?(d(),b(ue,{key:0,modelValue:v.value[y][z],"onUpdate:modelValue":A=>v.value[y][z]=A},null,8,["modelValue","onUpdate:modelValue"])):q("",!0)])]))),128)),m("td",Ce,[V(C).checkShowOnPermission("editRole")?(d(),b(k,{key:0,label:"Update",onClick:()=>W(y,n._id),size:"sm",color:"primary"},null,8,["onClick"])):q("",!0)])]))),128))])]}),_:1})])):q("",!0),w.value==="roles"?(d(),b(ye,{key:1,columns:Z,"data-list":((o=l.value)==null?void 0:o.roles)||[],page:((i=l.value)==null?void 0:i.page)||1,pages:((u=l.value)==null?void 0:u.pages)||1,onUpdatePaginate:X,onOnEdit:H,onOnDelete:I,onOnFilter:L,showEdit:V(C).checkShowOnPermission("editRole"),showDelete:V(C).checkShowOnPermission("deleteRole")},null,8,["data-list","page","pages","showEdit","showDelete"])):q("",!0),G.value?(d(),b(pe,{key:2})):q("",!0)]),p(ie,{modelValue:_.value,"onUpdate:modelValue":r[2]||(r[2]=c=>_.value=c)},{default:h(()=>[p(ae,{style:{width:"300px","max-width":"80vw"}},{default:h(()=>[p(T,null,{default:h(()=>[Ve]),_:1}),p(T,{class:"q-pt-none"},{default:h(()=>[re(" Are you sure you want to delete this unit? ")]),_:1}),p(ne,{align:"right",class:"bg-white text-teal"},{default:h(()=>[j(p(k,{flat:"",label:"Cancel"},null,512),[[J]]),j(p(k,{flat:"",label:"Delete",onClick:Y,color:"red"},null,512),[[J]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]}),_:1}))}};export{Le as default};
