(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),l=t(14),o=t(2),i=function(e){var n=e.filtName,t=e.onChangeFilt;return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.newName,t=e.onChange,a=e.newNumber,u=e.onChangeNumber,c=e.onClick;return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:c},"add"))))},f=function(e){var n=e.numbers;return r.a.createElement("div",null,n)},d=function(e){var n=e.message;return null===n?null:r.a.createElement("div",null," ",r.a.createElement("p",{style:{color:"green",fontSize:16,border:"5px solid green",textAlign:"center"}},n))},s=function(e){var n=e.error;return null===n?null:r.a.createElement("div",null," ",r.a.createElement("p",{style:{color:"red",fontSize:16,border:"5px solid red",textAlign:"center"}},n))},b=t(3),h=t.n(b),p="https://enigmatic-mountain-52992.herokuapp.com/api/persons",v=function(){return h.a.get(p).then((function(e){return e.data}))},E=function(e){return h.a.post(p,e).then((function(e){return e.data}))},g=function(e,n){return h.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){h.a.delete("".concat(p,"/").concat(e))},j=(t(38),function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),b=Object(o.a)(c,2),h=b[0],p=b[1],j=Object(a.useState)(""),C=Object(o.a)(j,2),O=C[0],k=C[1],N=Object(a.useState)(""),S=Object(o.a)(N,2),y=S[0],x=S[1],T=Object(a.useState)(null),z=Object(o.a)(T,2),A=z[0],D=z[1],F=Object(a.useState)(null),J=Object(o.a)(F,2),L=J[0],B=J[1],I=function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Delete ".concat(n,"?"))&&(w(e),setTimeout((function(){v().then((function(e){return u(e)}))}),500))};return Object(a.useEffect)((function(){v().then((function(e){D("promise fulfilled"),setTimeout((function(){D(null)}),5e3),u(e)})).catch((function(e){B("promise rejected"),setTimeout((function(){B(null)}),5e3)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{message:A}),r.a.createElement(s,{error:L}),r.a.createElement(i,{filtname:y,onChangeFilt:function(e){x(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(m,{newName:h,onChange:function(e){p(e.target.value)},newNumber:O,onChangeNumber:function(e){k(e.target.value)},onClick:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(h)){var n=t.find((function(e){return e.name===h}));if(n.number===O)return alert("".concat(h," is already added to phonebook")),p(""),void k("");if(window.confirm("".concat(h," is already added to phonebook, replace the old number with a new one?"))){var a=Object(l.a)({},n,{number:O});return g(n.id,a).then((function(e){u(t.map((function(t){return t.id!==n.id?t:e})))})),p(""),void k("")}}E({name:h,number:O}).then((function(e){u(t.concat(e)),p(""),k("")}))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{numbers:function(){var e=t;return""!==y&&(e=t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}))),e.map((function(e,n){return r.a.createElement("div",{key:n},e.name," ",e.number," "," ",r.a.createElement("button",{onClick:function(){return I(e.id)}},"delete")," ",r.a.createElement("br",null))}))}()}))});c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.618f4615.chunk.js.map