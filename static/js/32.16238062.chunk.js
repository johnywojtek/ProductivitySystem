(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{720:function(n,e,t){"use strict";var r=t(694),a=t(0),i=t.n(a),o=t(693),c=t(719),s=t(16),d=t(192),l=t(718),u=t.n(l);function m(){var n=Object(r.a)(["\n            animation: "," 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22)\n                forwards;\n            svg {\n                opacity: 1;\n                transform: scale(0);\n                fill: white;\n                -webkit-text-stroke: 0;\n                animation: "," 0.3s cubic-bezier(1, 0.008, 0.565, 1.65) 0.1s\n                    1 forwards;\n                stroke: white;\n                stroke-width: 0;\n            }\n        "]);return m=function(){return n},n}function b(){var n=Object(r.a)(["\n    display: inline-block;\n    border-radius: 50%;\n    border: 2px solid rgba(0, 0, 0, 0.1);\n    background: white;\n    vertical-align: middle;\n    margin-right: 20px;\n    width: 2.3rem;\n    height: 2.3rem;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: border 0.3s ease;\n\n    svg {\n        opacity: 0.2;\n        font-size: 1.3rem;\n        fill: transparent;\n        transition: opacity 0.3s 0.1s ease;\n        stroke: rgba(0, 0, 0, 0.5);\n        stroke-width: 20px;\n        transition: all 0.3s ease;\n    }\n\n    &:hover {\n        border: 3px solid rgba(0, 0, 0, 0.2);\n    }\n    ","\n"]);return b=function(){return n},n}function f(){var n=Object(r.a)(["\n    width: 2.3rem;\n    height: 2.3rem;\n"]);return f=function(){return n},n}function h(){var n=Object(r.a)(["\n 0% {\n      width: 2rem;\n      height: 2rem;\n      border-width: 5px;\n    }\n    10% {\n      width: 2rem;\n      height: 2rem;\n      opacity: 0.1;\n      background: rgba(0,0,0,0.2);\n      border-width: 15px;\n    }\n    12% {\n      width: 2rem;\n      height: 2rem;\n      opacity: 0.4;\n      background: rgba(0,0,0,0.1);\n      border-width: 0;\n    }\n    50% {\n      width: 2.3rem;\n      height: 2.3rem;\n      background: #00d478;\n      border: 0;\n      opacity: 0.6;\n    }\n    100% {\n      width: 2.3rem;\n      height: 2.3rem;\n      background: #00d478;\n      border: 0;\n      opacity: 1;\n    }\n"]);return h=function(){return n},n}function g(){var n=Object(r.a)(["\n from {\n      opacity: 0;\n      transform: scale(0.3);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1)\n    }\n"]);return g=function(){return n},n}var k=Object(o.c)(g()),p=Object(o.c)(h()),w=o.b.div(f()),v=o.b.span(b(),function(n){return n.checked&&Object(o.a)(m(),p,k)}),j=Object(d.b)(null,{toggleTask:s.v})(function(n){var e=n.taskId,t=n.currentTaskId,r=n.isDone,a=n.toggleTask;return i.a.createElement(w,{onClick:function(){t?a(e,t,!r):u.a.fire({icon:"error",title:"Ups co\u015b posz\u0142o nie tak",toast:!0,position:"top-end",showConfirmButton:!1,timer:1e3,timerProgressBar:!0})}},i.a.createElement(v,{checked:r},i.a.createElement(c.b,{checked:r})))});function y(){var n=Object(r.a)(["\n    margin-right: 1rem;\n    font-size: 1.3rem;\n"]);return y=function(){return n},n}var E=o.b.span(y());e.a=function(n){var e=n.currentTaskId,t=n.taskId,r=n.value,a=n.number,o=n.isDone,c=n.refe;return i.a.createElement("div",Object.assign({ref:c},n,{className:"media friendlist-box align-items-center justify-content-center m-b-20"}),i.a.createElement(E,null,a),i.a.createElement("div",{className:"m-r-10 photo-table"},i.a.createElement(j,{currentTaskId:e,taskId:t,isDone:o})),i.a.createElement("div",{className:"media-body"},i.a.createElement("h6",{className:"m-0 d-inline"},r),i.a.createElement("span",{className:"float-right d-flex  align-items-center"},i.a.createElement("i",{className:"fa fa-caret-up f-22 m-r-10 text-c-green"}),"3784")))}},826:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),i=t(186),o=t(720),c=t(16),s=t(192),d=t(54),l=t(26),u=t(55),m=t.n(u);e.default=Object(l.d)(Object(s.b)(function(n){return{data:n.firestore.ordered}},{addTask:c.m}),Object(d.firestoreConnect)([{collection:"tasks",where:[["dayId","==",m()().isoWeekday()],["done","==",!1]]}]))(function(n){return a.a.createElement(i.a,null,n.data.tasks?n.data.tasks[0]?a.a.createElement(o.a,{id:n.data.tasks[0].id,value:n.data.tasks[0].value,done:n.data.tasks[0].done}):a.a.createElement("h1",null,"Gratulacje wszystko zrobione !"):a.a.createElement("h1",null,"Loading"))})}}]);
//# sourceMappingURL=32.16238062.chunk.js.map