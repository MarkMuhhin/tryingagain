(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(17)},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),c=(a(16),a(2)),m=a(3),s=a(5),l=a(4),u=a(6),A=(a(9),a(7)),h=a.n(A),g=function(e){var t=e.chat,a=e.user,n=e.time;return r.a.createElement("li",{className:"chat ".concat(a===t.username?"right":"left")},a!==t.username&&r.a.createElement("img",{src:t.img,alt:"gotoAndBot icon"}),r.a.createElement("div",{className:"usernametime ".concat(a===t.username?"right":"left")},r.a.createElement("user",null,t.username),r.a.createElement("time",null,n)),t.content)},w=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(l.a)(t).call(this,e))).state={chats:[{username:"gotoAndBot",content:r.a.createElement("p",null,"Tere tulemast!"),img:h.a,time:a.showTime()},{username:"Mina",content:r.a.createElement("p",null,"Jou!"),time:a.showTime()},{username:"gotoAndBot",content:r.a.createElement("p",null,"Kas tahad midagi k\xfcsida jhjh hhhghgkhgkgkgk kgk g gk?"),img:h.a,time:a.showTime()},{username:"Mina",content:r.a.createElement("p",null,"Ait\xe4hh k\xfcsimast, kuid ei taha midagi parasjagu!"),time:a.showTime()}]},a}return Object(u.a)(t,e),Object(m.a)(t,[{key:"showTime",value:function(){var e=new Date;return e.getHours()+":"+e.getMinutes()}},{key:"componentDidUpdate",value:function(){this.scrollToBot()}},{key:"scrollToBot",value:function(){o.a.findDOMNode(this.refs.chats).scrollTop=o.a.findDOMNode(this.refs.chats).scrollHeight}},{key:"submitMessage",value:function(e){var t=this;e.preventDefault(),this.setState({chats:this.state.chats.concat([{username:"Mina",content:r.a.createElement("p",null,o.a.findDOMNode(this.refs.msg).value),time:this.showTime()}])},function(){o.a.findDOMNode(t.refs.msg).value=""})}},{key:"render",value:function(){var e=this,t=this.state.chats;return r.a.createElement("div",{className:"chatroom"},r.a.createElement("header",null,r.a.createElement("figure",null,r.a.createElement("img",{src:h.a,alt:"botpic.png"}),r.a.createElement("figcaption",null,"gotoAndBot"))," "),r.a.createElement("main",{className:"chats",ref:"chats"},t.map(function(e,t){return r.a.createElement("div",{className:"fullcomment",key:t},r.a.createElement(g,{chat:e,user:"Mina",time:e.time}))})),r.a.createElement("footer",null,r.a.createElement("form",{className:"input",onSubmit:function(t){return e.submitMessage(t)}},r.a.createElement("div",{className:"inputdiv"},r.a.createElement("input",{type:"text",ref:"msg",placeholder:"Kirjuta siia"}),r.a.createElement("input",{type:"submit",value:"\u203a"})))))}}]),t}(r.a.Component),f=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(w,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},7:function(e,t){e.exports="data:image/png;base64,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"},9:function(e,t,a){}},[[10,1,2]]]);
//# sourceMappingURL=main.5bf0e4cb.chunk.js.map