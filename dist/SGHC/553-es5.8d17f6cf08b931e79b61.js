!function(){"use strict";function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function e(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}(self.webpackChunksghc=self.webpackChunksghc||[]).push([[553],{5553:function(n,o,r){r.r(o),r.d(o,{ErroresModule:function(){return p}});var i,c=r(8583),a=r(4655),s=r(7716),u=r(4578),l=r(6627),f=r(1095),g=[{path:"403",component:(i=function(){function n(e,o){t(this,n),this._router=e,this._serviceError=o,this._serviceError.muestroMenu=!1}return e(n,[{key:"ngOnInit",value:function(){}},{key:"Volver",value:function(){this._router.navigate(["login"])}}]),n}(),i.\u0275fac=function(t){return new(t||i)(s.Y36(a.F0),s.Y36(u.T))},i.\u0275cmp=s.Xpm({type:i,selectors:[["app-no-autorizado"]],decls:14,vars:0,consts:[[1,"container","d-flex","w-50","mt-5"],[1,"row","align-items-start"],[1,"mb-5","p-24","d-flex","justify-content-center"],[1,"icon-display"],[1,"mb-5","w-max"],[1,"mb-5"],["mat-raised-button","","color","primary",3,"click"]],template:function(t,n){1&t&&(s.TgZ(0,"div",0),s.TgZ(1,"div",1),s.TgZ(2,"div",2),s.TgZ(3,"mat-icon",3),s._uU(4,"highlight_off"),s.qZA(),s.qZA(),s.TgZ(5,"div",4),s.TgZ(6,"h1"),s._uU(7,"Error 403 - No autorizado"),s.qZA(),s.qZA(),s.TgZ(8,"div",5),s.TgZ(9,"p"),s._uU(10," No tiene permisos para acceder a esta direcci\xf3n o se venci\xf3 el tiempo de su sesi\xf3n. Pruebe volviendo a iniciar sesi\xf3n. "),s.qZA(),s.qZA(),s.TgZ(11,"div",5),s.TgZ(12,"button",6),s.NdJ("click",function(){return n.Volver()}),s._uU(13,"Volver"),s.qZA(),s.qZA(),s.qZA(),s.qZA())},directives:[l.Hw,f.lW],styles:[".button[_ngcontent-%COMP%]{background-color:#60c76e;color:#fff}.p-24[_ngcontent-%COMP%]{padding:24px}.icon-display[_ngcontent-%COMP%]{color:red;transform:scale(6)}h1[_ngcontent-%COMP%]{font-weight:600;font-size:40px}p[_ngcontent-%COMP%]{font-weight:400;font-size:16px}.w-max[_ngcontent-%COMP%]{width:-moz-max-content;width:max-content}"]}),i)},{path:"404",component:function(){var n=function(){function n(e,o){t(this,n),this._router=e,this._serviceError=o,this._serviceError.muestroMenu=!1}return e(n,[{key:"ngOnInit",value:function(){}},{key:"Volver",value:function(){this._router.navigate(["home"])}}]),n}();return n.\u0275fac=function(t){return new(t||n)(s.Y36(a.F0),s.Y36(u.T))},n.\u0275cmp=s.Xpm({type:n,selectors:[["app-no-encontrado"]],decls:14,vars:0,consts:[[1,"container","d-flex","w-50","mt-5"],[1,"row","align-items-start"],[1,"mb-5","p-24","d-flex","justify-content-center"],[1,"icon-display"],[1,"mb-5","w-max"],[1,"mb-5"],["mat-raised-button","","color","primary",3,"click"]],template:function(t,n){1&t&&(s.TgZ(0,"div",0),s.TgZ(1,"div",1),s.TgZ(2,"div",2),s.TgZ(3,"mat-icon",3),s._uU(4,"highlight_off"),s.qZA(),s.qZA(),s.TgZ(5,"div",4),s.TgZ(6,"h1"),s._uU(7,"Error 404 - P\xe1gina no encontrada"),s.qZA(),s.qZA(),s.TgZ(8,"div",5),s.TgZ(9,"p"),s._uU(10," La direcci\xf3n url solicitada no existe. "),s.qZA(),s.qZA(),s.TgZ(11,"div",5),s.TgZ(12,"button",6),s.NdJ("click",function(){return n.Volver()}),s._uU(13,"Volver"),s.qZA(),s.qZA(),s.qZA(),s.qZA())},directives:[l.Hw,f.lW],styles:[".button[_ngcontent-%COMP%]{background-color:#60c76e;color:#fff}.p-24[_ngcontent-%COMP%]{padding:24px}.icon-display[_ngcontent-%COMP%]{color:red;transform:scale(6)}h1[_ngcontent-%COMP%]{font-weight:600;font-size:40px}p[_ngcontent-%COMP%]{font-weight:400;font-size:16px}.w-max[_ngcontent-%COMP%]{width:-moz-max-content;width:max-content}"]}),n}()},{path:"500",component:function(){var n=function(){function n(e,o){t(this,n),this._router=e,this._serviceError=o,this.fatal="",this._serviceError.muestroMenu=!1}return e(n,[{key:"ngOnInit",value:function(){this.fatal=this._serviceError.errorFatal}},{key:"Volver",value:function(){this._router.navigate(["home"])}}]),n}();return n.\u0275fac=function(t){return new(t||n)(s.Y36(a.F0),s.Y36(u.T))},n.\u0275cmp=s.Xpm({type:n,selectors:[["app-fatal"]],decls:14,vars:1,consts:[[1,"container","d-flex","w-50","mt-5"],[1,"row","align-items-start"],[1,"mb-5","p-24","d-flex","justify-content-center"],[1,"icon-display"],[1,"mb-5","w-max"],[1,"mb-5"],["mat-raised-button","","color","primary",3,"click"]],template:function(t,n){1&t&&(s.TgZ(0,"div",0),s.TgZ(1,"div",1),s.TgZ(2,"div",2),s.TgZ(3,"mat-icon",3),s._uU(4,"highlight_off"),s.qZA(),s.qZA(),s.TgZ(5,"div",4),s.TgZ(6,"h1"),s._uU(7,"Error Fatal en el servidor"),s.qZA(),s.qZA(),s.TgZ(8,"div",5),s.TgZ(9,"p"),s._uU(10),s.qZA(),s.qZA(),s.TgZ(11,"div",5),s.TgZ(12,"button",6),s.NdJ("click",function(){return n.Volver()}),s._uU(13,"Volver"),s.qZA(),s.qZA(),s.qZA(),s.qZA()),2&t&&(s.xp6(10),s.hij(" ",n.fatal," "))},directives:[l.Hw,f.lW],styles:[".button[_ngcontent-%COMP%]{background-color:#60c76e;color:#fff}.p-24[_ngcontent-%COMP%]{padding:24px}.icon-display[_ngcontent-%COMP%]{color:red;transform:scale(6)}h1[_ngcontent-%COMP%]{font-weight:600;font-size:40px}p[_ngcontent-%COMP%]{font-weight:400;font-size:16px}.w-max[_ngcontent-%COMP%]{width:-moz-max-content;width:max-content}"]}),n}()}],d=function(){var n=e(function n(){t(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=s.oAB({type:n}),n.\u0275inj=s.cJS({imports:[[a.Bz.forChild(g)],a.Bz]}),n}(),p=function(){var n=e(function n(){t(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=s.oAB({type:n}),n.\u0275inj=s.cJS({imports:[[c.ez,d,l.Ps,f.ot]]}),n}()}}])}();