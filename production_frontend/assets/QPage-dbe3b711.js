import{k as g,y as p,a7 as r,a8 as t,a9 as h,an as d,l as s,m as y,p as f}from"./index-1afe7156.js";const C=g({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(a,{slots:i}){const{proxy:{$q:o}}=p(),e=r(h,t);if(e===t)return console.error("QPage needs to be a deep child of QLayout"),t;if(r(d,t)===t)return console.error("QPage needs to be child of QPageContainer"),t;const c=s(()=>{const n=(e.header.space===!0?e.header.size:0)+(e.footer.space===!0?e.footer.size:0);if(typeof a.styleFn=="function"){const l=e.isContainer.value===!0?e.containerHeight.value:o.screen.height;return a.styleFn(n,l)}return{minHeight:e.isContainer.value===!0?e.containerHeight.value-n+"px":o.screen.height===0?n!==0?`calc(100vh - ${n}px)`:"100vh":o.screen.height-n+"px"}}),u=s(()=>`q-page${a.padding===!0?" q-layout-padding":""}`);return()=>y("main",{class:u.value,style:c.value},f(i.default))}});export{C as Q};