import{Q as se,a as W,b as de,c as Y}from"./QTabPanels-293b62f7.js";import{y as ae,g as B,l as V,$ as ne,J as oe,V as ue,m as T,k as _e,bh as pe,b8 as he,a_ as me,b0 as ce,b9 as ge,bi as fe,aY as ve,a$ as ye,bc as G,Z as xe,af as be,u as Ve,f as J,ac as we,o as b,c as Fe,w as P,b as _,a as p,au as Z,n as Se,ai as ke,i as Ce,ax as N,e as F,ak as S,aj as k,Q as qe,h as ze}from"./index-b55a7827.js";import{Q as Ue}from"./QChip-1b4874fe.js";import{h as Ne}from"./format-6ceb96d6.js";import{Q as Qe}from"./QPage-615bd1f9.js";import{u as De,a as H}from"./use-quasar-96558313.js";import{g as ee}from"./userAuthStore-0c477450.js";import"./QResizeObserver-25fbf90b.js";import"./rtl-36dd996b.js";import"./touch-5ff41afe.js";import"./selection-af93f90a.js";function E(i,f,A,C){const u=[];return i.forEach(l=>{C(l)===!0?u.push(l):f.push({failedPropValidation:A,file:l})}),u}function R(i){i&&i.dataTransfer&&(i.dataTransfer.dropEffect="copy"),oe(i)}const Pe={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},je=["rejected"];function Ae({editable:i,dnd:f,getFileInput:A,addFilesToQueue:C}){const{props:u,emit:l,proxy:e}=ae(),d=B(null),I=V(()=>u.accept!==void 0?u.accept.split(",").map(r=>(r=r.trim(),r==="*"?"*/":(r.endsWith("/*")&&(r=r.slice(0,r.length-1)),r.toUpperCase()))):null),O=V(()=>parseInt(u.maxFiles,10)),Q=V(()=>parseInt(u.maxTotalSize,10));function a(r){if(i.value)if(r!==Object(r)&&(r={target:null}),r.target!==null&&r.target.matches('input[type="file"]')===!0)r.clientX===0&&r.clientY===0&&ne(r);else{const c=A();c&&c!==r.target&&c.click(r)}}function t(r){i.value&&r&&C(null,r)}function v(r,c,q,z){let o=Array.from(c||r.target.files);const w=[],j=()=>{w.length!==0&&l("rejected",w)};if(u.accept!==void 0&&I.value.indexOf("*/")===-1&&(o=E(o,w,"accept",h=>I.value.some(g=>h.type.toUpperCase().startsWith(g)||h.name.toUpperCase().endsWith(g))),o.length===0))return j();if(u.maxFileSize!==void 0){const h=parseInt(u.maxFileSize,10);if(o=E(o,w,"max-file-size",g=>g.size<=h),o.length===0)return j()}if(u.multiple!==!0&&o.length!==0&&(o=[o[0]]),o.forEach(h=>{h.__key=h.webkitRelativePath+h.lastModified+h.name+h.size}),z===!0){const h=q.map(g=>g.__key);o=E(o,w,"duplicate",g=>h.includes(g.__key)===!1)}if(o.length===0)return j();if(u.maxTotalSize!==void 0){let h=z===!0?q.reduce((g,L)=>g+L.size,0):0;if(o=E(o,w,"max-total-size",g=>(h+=g.size,h<=Q.value)),o.length===0)return j()}if(typeof u.filter=="function"){const h=u.filter(o);o=E(o,w,"filter",g=>h.includes(g))}if(u.maxFiles!==void 0){let h=z===!0?q.length:0;if(o=E(o,w,"max-files",()=>(h++,h<=O.value)),o.length===0)return j()}if(j(),o.length!==0)return o}function y(r){R(r),f.value!==!0&&(f.value=!0)}function s(r){oe(r),(r.relatedTarget!==null||ue.is.safari!==!0?r.relatedTarget!==d.value:document.elementsFromPoint(r.clientX,r.clientY).includes(d.value)===!1)===!0&&(f.value=!1)}function m(r){R(r);const c=r.dataTransfer.files;c.length!==0&&C(null,c),f.value=!1}function D(r){if(f.value===!0)return T("div",{ref:d,class:`q-${r}__dnd absolute-full`,onDragenter:R,onDragover:R,onDragleave:s,onDrop:m})}return Object.assign(e,{pickFiles:a,addFiles:t}),{pickFiles:a,addFiles:t,onDragover:y,onDragleave:s,processFiles:v,getDndNode:D,maxFilesNumber:O,maxTotalSizeNumber:Q}}const te=_e({name:"QFile",inheritAttrs:!1,props:{...pe,...he,...Pe,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...me,...je],setup(i,{slots:f,emit:A,attrs:C}){const{proxy:u}=ae(),l=ce(),e=B(null),d=B(!1),I=ge(i),{pickFiles:O,onDragover:Q,onDragleave:a,processFiles:t,getDndNode:v}=Ae({editable:l.editable,dnd:d,getFileInput:K,addFilesToQueue:X}),y=fe(i),s=V(()=>Object(i.modelValue)===i.modelValue?"length"in i.modelValue?Array.from(i.modelValue):[i.modelValue]:[]),m=V(()=>G(s.value)),D=V(()=>s.value.map(n=>n.name).join(", ")),r=V(()=>Ne(s.value.reduce((n,x)=>n+x.size,0))),c=V(()=>({totalSize:r.value,filesNumber:s.value.length,maxFiles:i.maxFiles})),q=V(()=>({tabindex:-1,type:"file",title:"",accept:i.accept,capture:i.capture,name:I.value,...C,id:l.targetUid.value,disabled:l.editable.value!==!0})),z=V(()=>"q-file q-field--auto-height"+(d.value===!0?" q-file--dnd":"")),o=V(()=>i.multiple===!0&&i.append===!0);function w(n){const x=s.value.slice();x.splice(n,1),h(x)}function j(n){const x=s.value.indexOf(n);x!==-1&&w(x)}function h(n){A("update:modelValue",i.multiple===!0?n:n[0])}function g(n){n.keyCode===13&&xe(n)}function L(n){(n.keyCode===13||n.keyCode===32)&&O(n)}function K(){return e.value}function X(n,x){const U=t(n,x,s.value,o.value),M=K();M!=null&&(M.value=""),U!==void 0&&((i.multiple===!0?i.modelValue&&U.every(le=>s.value.includes(le)):i.modelValue===U[0])||h(o.value===!0?s.value.concat(U):U))}function $(){return[T("input",{class:[i.inputClass,"q-file__filler"],style:i.inputStyle})]}function re(){if(f.file!==void 0)return s.value.length===0?$():s.value.map((x,U)=>f.file({index:U,file:x,ref:this}));if(f.selected!==void 0)return s.value.length===0?$():f.selected({files:s.value,ref:this});if(i.useChips===!0)return s.value.length===0?$():s.value.map((x,U)=>T(Ue,{key:"file-"+U,removable:l.editable.value,dense:!0,textColor:i.color,tabindex:i.tabindex,onRemove:()=>{w(U)}},()=>T("span",{class:"ellipsis",textContent:x.name})));const n=i.displayValue!==void 0?i.displayValue:D.value;return n.length!==0?[T("div",{class:i.inputClass,style:i.inputStyle,textContent:n})]:$()}function ie(){const n={ref:e,...q.value,...y.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:X};return i.multiple===!0&&(n.multiple=!0),T("input",n)}return Object.assign(l,{fieldClass:z,emitValue:h,hasValue:m,inputRef:e,innerValue:s,floatingLabel:V(()=>m.value===!0||G(i.displayValue)),computedCounter:V(()=>{if(i.counterLabel!==void 0)return i.counterLabel(c.value);const n=i.maxFiles;return`${s.value.length}${n!==void 0?" / "+n:""} (${r.value})`}),getControlChild:()=>v("file"),getControl:()=>{const n={ref:l.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:i.tabindex};return l.editable.value===!0&&Object.assign(n,{onDragover:Q,onDragleave:a,onKeydown:g,onKeyup:L}),T("div",n,[ie()].concat(re()))}}),Object.assign(u,{removeAtIndex:w,removeFile:j,getNativeElement:()=>e.value}),ve(u,"nativeEl",()=>e.value),ye(l)}});const Te={class:"q-pa-md"},Ie={class:"q-gutter-y-md site-settings-tabs",style:{"max-width":"600px"}},Oe={class:"flex -m-2"},Ee={class:"p-2 w-full"},Be={key:0,class:"text-red-8 text-xs q-pl-sm"},$e={class:"p-2 w-full"},Re={key:0,class:"text-red-8 text-xs q-pl-sm"},Le={class:"flex -m-2"},Me={class:"p-2 w-full"},We={key:0,class:"text-red-8 text-xs q-pl-sm"},Ye={class:"p-2 w-full"},Ke={key:0,class:"text-red-8 text-xs q-pl-sm"},Xe={class:"p-2 w-full"},Ge={key:0,class:"text-red-8 text-xs q-pl-sm"},Je={class:"p-2 w-full"},Ze={key:0,class:"text-red-8 text-xs q-pl-sm"},He={class:"p-2 w-full"},et={key:0,class:"text-red-8 text-xs q-pl-sm"},tt={class:"flex -m-2"},at={class:"p-2 w-full"},ot={key:0,class:"text-red-8 text-xs q-pl-sm"},rt={class:"p-2 w-full"},it={key:0,class:"text-red-8 text-xs q-pl-sm"},lt={class:"p-2 w-full"},st={key:0,class:"text-red-8 text-xs q-pl-sm"},dt={class:"p-2 w-full"},nt={key:0,class:"text-red-8 text-xs q-pl-sm"},ut={class:"p-2 w-full"},_t={key:0,class:"text-red-8 text-xs q-pl-sm"},wt={__name:"SiteSettingsView",setup(i){const f=be(),A=Ve(),C=B("details"),u=De(),l=B({}),e=J({title:"",description:"",pos_header_image:"",pos_header_image_width:0,pos_header_image_height:0,pos_header:"",pos_footer:"",report_header_image:"",report_header_image_width:0,report_header_image_height:0,report_header:"",report_footer:""}),d=J({title:"",description:"",pos_header_image:"",pos_header_image_width:40,pos_header_image_height:40,pos_header:"",pos_footer:"",report_header_image:"",report_header_image_width:40,report_header_image_height:40,report_header:"",report_footer:""}),I=async()=>{var a;const Q={method:"GET",url:"api/site-setting",headers:{Authorization:`Bearer ${ee("token")}`}};try{u.loading.show();const t=await H.request(Q);u.loading.hide(),e.title=t.data.title,d.title=t.data.title,e.description=t.data.description,d.description=t.data.description,e.pos_header_image=t.data.pos_header_image,d.pos_header_image=t.data.pos_header_image,e.pos_header_image_width=t.data.pos_header_image_width,d.pos_header_image_width=t.data.pos_header_image_width,e.pos_header_image_height=t.data.pos_header_image_height,d.pos_header_image_height=t.data.pos_header_image_height,e.pos_header=t.data.pos_header,d.pos_header=t.data.pos_header,e.pos_footer=t.data.pos_footer,d.pos_footer=t.data.pos_footer,e.report_header_image=t.data.report_header_image,d.report_header_image=t.data.report_header_image,e.report_header_image_width=t.data.report_header_image_width,d.report_header_image_width=t.data.report_header_image_width,e.report_header_image_height=t.data.report_header_image_height,d.report_header_image_height=t.data.report_header_image_height,e.report_header=t.data.report_header,d.report_header=t.data.report_header,e.report_footer=t.data.report_footer,d.report_footer=t.data.report_footer}catch(t){((a=t==null?void 0:t.response)==null?void 0:a.status)==401?u.notify({message:t.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):u.notify({message:t.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),u.loading.hide(),console.error(t)}finally{}};we(()=>{I()});const O=async Q=>{var v,y,s;Q.preventDefault(),l.value={};const a={};if(d.title!==e.title&&(a.title=e.title),d.description!==e.description&&(a.description=e.description),d.pos_header_image!==e.pos_header_image&&(a.pos_header_image=e.pos_header_image),d.pos_header_image_width!==e.pos_header_image_width&&(a.pos_header_image_width=e.pos_header_image_width),d.pos_header_image_height!==e.pos_header_image_height&&(a.pos_header_image_height=e.pos_header_image_height),d.pos_header!==e.pos_header&&(a.pos_header=e.pos_header),d.pos_footer!==e.pos_footer&&(a.pos_footer=e.pos_footer),d.report_header_image!==e.report_header_image&&(a.report_header_image=e.report_header_image),d.report_header_image_width!==e.report_header_image_width&&(a.report_header_image_width=e.report_header_image_width),d.report_header_image_height!==e.report_header_image_height&&(a.report_header_image_height=e.report_header_image_height),d.report_header!==e.report_header&&(a.report_header=e.report_header),d.report_footer!==e.report_footer&&(a.report_footer=e.report_footer),Object.keys(l.value).length!==0)return;if(Object.keys(a).length<=0){u.notify({message:"Empty Form Submission Not Allowed",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]});return}const t={headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${ee("token")}`},data:a};t.method="post",t.url="api/site-setting";try{const m=await H.request(t);(v=f.query)!=null&&v.redirect&&A.push(`/${(y=f.query)==null?void 0:y.redirect}`),u.notify({message:"Updated Successfully!",color:"primary",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]})}catch(m){((s=m==null?void 0:m.response)==null?void 0:s.status)==401?u.notify({message:m.response.data.message+". Login to try again.",color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}):u.notify({message:m.message,color:"red",position:"top",actions:[{icon:"close",color:"white",handler:()=>{}}]}),console.error(m)}};return(Q,a)=>(b(),Fe(Qe,{padding:""},{default:P(()=>[_("div",Te,[_("div",Ie,[p(ze,null,{default:P(()=>[p(Z,{class:"!p-0"},{default:P(()=>[p(se,{modelValue:C.value,"onUpdate:modelValue":a[0]||(a[0]=t=>C.value=t),dense:"",class:Se(["text-grey",ke(u).dark.isActive?"bg-grey-9":"bg-grey-3"]),"active-color":"black","indicator-color":"black",align:"left",shrink:"",stretch:"","narrow-indicator":""},{default:P(()=>[p(W,{name:"details",label:"Details"}),p(W,{name:"pos",label:"Pos"}),p(W,{name:"report",label:"Report"})]),_:1},8,["modelValue","class"]),p(Ce),p(de,{modelValue:C.value,"onUpdate:modelValue":a[13]||(a[13]=t=>C.value=t),animated:""},{default:P(()=>[p(Y,{name:"details"},{default:P(()=>{var t,v,y,s;return[_("div",Oe,[_("div",Ee,[p(N,{label:"title *",type:"text",placeholder:"title",modelValue:e.title,"onUpdate:modelValue":a[1]||(a[1]=m=>e.title=m),outlined:"",dense:""},null,8,["modelValue"]),(t=l.value)!=null&&t.title?(b(),F("div",Be,[_("span",null,S((v=l.value)==null?void 0:v.title),1)])):k("",!0)]),_("div",$e,[p(N,{label:"description *",type:"textarea",placeholder:"description",modelValue:e.description,"onUpdate:modelValue":a[2]||(a[2]=m=>e.description=m),outlined:"",dense:""},null,8,["modelValue"]),(y=l.value)!=null&&y.description?(b(),F("div",Re,[_("span",null,S((s=l.value)==null?void 0:s.description),1)])):k("",!0)])])]}),_:1}),p(Y,{name:"pos"},{default:P(()=>{var t,v,y,s,m,D,r,c,q,z;return[_("div",Le,[_("div",Me,[p(te,{label:"pos_header_image *",placeholder:"pos_header_image",modelValue:e.pos_header_image,"onUpdate:modelValue":a[3]||(a[3]=o=>e.pos_header_image=o),outlined:"",dense:""},null,8,["modelValue"]),(t=l.value)!=null&&t.pos_header_image?(b(),F("div",We,[_("span",null,S((v=l.value)==null?void 0:v.pos_header_image),1)])):k("",!0)]),_("div",Ye,[p(N,{label:"pos_header_image_width *",type:"number",placeholder:"pos_header_image_width",modelValue:e.pos_header_image_width,"onUpdate:modelValue":a[4]||(a[4]=o=>e.pos_header_image_width=o),outlined:"",dense:""},null,8,["modelValue"]),(y=l.value)!=null&&y.pos_header_image_width?(b(),F("div",Ke,[_("span",null,S((s=l.value)==null?void 0:s.pos_header_image_width),1)])):k("",!0)]),_("div",Xe,[p(N,{label:"pos_header_image_height *",type:"number",placeholder:"pos_header_image_height",modelValue:e.pos_header_image_height,"onUpdate:modelValue":a[5]||(a[5]=o=>e.pos_header_image_height=o),outlined:"",dense:""},null,8,["modelValue"]),(m=l.value)!=null&&m.pos_header_image_height?(b(),F("div",Ge,[_("span",null,S((D=l.value)==null?void 0:D.pos_header_image_height),1)])):k("",!0)]),_("div",Je,[p(N,{label:"pos_header *",type:"textarea",placeholder:"pos_header",modelValue:e.pos_header,"onUpdate:modelValue":a[6]||(a[6]=o=>e.pos_header=o),outlined:"",dense:""},null,8,["modelValue"]),(r=l.value)!=null&&r.pos_header?(b(),F("div",Ze,[_("span",null,S((c=l.value)==null?void 0:c.pos_header),1)])):k("",!0)]),_("div",He,[p(N,{label:"pos_footer *",type:"textarea",placeholder:"pos_footer",modelValue:e.pos_footer,"onUpdate:modelValue":a[7]||(a[7]=o=>e.pos_footer=o),outlined:"",dense:""},null,8,["modelValue"]),(q=l.value)!=null&&q.pos_footer?(b(),F("div",et,[_("span",null,S((z=l.value)==null?void 0:z.pos_footer),1)])):k("",!0)])])]}),_:1}),p(Y,{name:"report"},{default:P(()=>{var t,v,y,s,m,D,r,c,q,z;return[_("div",tt,[_("div",at,[p(te,{label:"report_header_image *",placeholder:"report_header_image",modelValue:e.report_header_image,"onUpdate:modelValue":a[8]||(a[8]=o=>e.report_header_image=o),outlined:"",dense:""},null,8,["modelValue"]),(t=l.value)!=null&&t.report_header_image?(b(),F("div",ot,[_("span",null,S((v=l.value)==null?void 0:v.report_header_image),1)])):k("",!0)]),_("div",rt,[p(N,{label:"report_header_image_width *",type:"number",placeholder:"report_header_image_width",modelValue:e.report_header_image_width,"onUpdate:modelValue":a[9]||(a[9]=o=>e.report_header_image_width=o),outlined:"",dense:""},null,8,["modelValue"]),(y=l.value)!=null&&y.report_header_image_width?(b(),F("div",it,[_("span",null,S((s=l.value)==null?void 0:s.report_header_image_width),1)])):k("",!0)]),_("div",lt,[p(N,{label:"report_header_image_height *",type:"number",placeholder:"report_header_image_height",modelValue:e.report_header_image_height,"onUpdate:modelValue":a[10]||(a[10]=o=>e.report_header_image_height=o),outlined:"",dense:""},null,8,["modelValue"]),(m=l.value)!=null&&m.report_header_image_height?(b(),F("div",st,[_("span",null,S((D=l.value)==null?void 0:D.report_header_image_height),1)])):k("",!0)]),_("div",dt,[p(N,{label:"report_header *",type:"textarea",placeholder:"report_header",modelValue:e.report_header,"onUpdate:modelValue":a[11]||(a[11]=o=>e.report_header=o),outlined:"",dense:""},null,8,["modelValue"]),(r=l.value)!=null&&r.report_header?(b(),F("div",nt,[_("span",null,S((c=l.value)==null?void 0:c.report_header),1)])):k("",!0)]),_("div",ut,[p(N,{label:"report_footer *",type:"textarea",placeholder:"report_footer",modelValue:e.report_footer,"onUpdate:modelValue":a[12]||(a[12]=o=>e.report_footer=o),outlined:"",dense:""},null,8,["modelValue"]),(q=l.value)!=null&&q.report_footer?(b(),F("div",_t,[_("span",null,S((z=l.value)==null?void 0:z.report_footer),1)])):k("",!0)])])]}),_:1})]),_:1},8,["modelValue"])]),_:1}),p(Z,{class:"!pt-0"},{default:P(()=>[p(qe,{label:"Update",color:"primary",onClick:O})]),_:1})]),_:1})])])]),_:1}))}};export{wt as default};