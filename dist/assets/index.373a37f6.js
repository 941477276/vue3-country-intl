import{r as e,c as a,w as t,o as l,a as o,b as n,d as s,F as i,e as u,f as r,v as d,g as c,h as m,t as p,i as h,n as y,j as v,k as f,l as b,T as g,m as C,p as V,q as S,s as w,u as x,x as I}from"./vendor.03154698.js";!function(e=".",a="__import__"){try{self[a]=new Function("u","return import(u)")}catch(t){const l=new URL(e,location),o=e=>{URL.revokeObjectURL(e.src),e.remove()};self[a]=e=>new Promise(((t,n)=>{const s=new URL(e,l);if(self[a].moduleMap[s])return t(self[a].moduleMap[s]);const i=new Blob([`import * as m from '${s}';`,`${a}.moduleMap['${s}']=m;`],{type:"text/javascript"}),u=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){n(new Error(`Failed to import: ${e}`)),o(u)},onload(){t(self[a].moduleMap[s]),o(u)}});document.head.appendChild(u)})),self[a].moduleMap={}}}("assets/");const T={offset(e){let a={top:0,left:0},t=e.offsetParent;for(a.top=e.offsetTop,a.left=e.offsetLeft;null!=t;)a.top+=t.offsetTop,a.left+=t.offsetLeft,t=t.offsetParent;return t=null,a},elementContains(e,a){if(!e||!a)return!1;if(e===a)return!1;if("function"==typeof e.contains)return e.contains(a);for(;;){if(!a)return!1;if(a===e)return!0;a=a.parentNode}return!1},bindEvent(e,a,t){document.addEventListener?(e.addEventListener(a,t,!1),e.addEventListener(a,t,!1)):window.attachEvent&&(e.attachEvent("on"+a,t),e.attachEvent("on"+a,t))},unBindEvent(e,a,t){e&&(document.removeEventListener?(e.removeEventListener(a,t,!1),e.removeEventListener(a,t,!1)):window.detachEvent&&(e.detachEvent("on"+a,t),e.detachEvent("on"+a,t)))},getElementRect(e){var a=e.getBoundingClientRect(),t=document.documentElement.clientTop?document.documentElement.clientTop:0,l=document.documentElement.clientLeft?document.documentElement.clientLeft:0;return{top:a.top-t,bottom:a.bottom-t,left:a.left-l,right:a.right-l}},termianl(){let e=navigator.userAgent;return{android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)}},getStyle(e,a){if(!e||!e.nodeName)return void console.error("ele 必须是一个dom元素");if(!a)return void console.error("cssAttribute 必须是一个字符串");let t="";return window.getComputedStyle?t=window.getComputedStyle(e,null)[a]:e.currentStyle&&(t=e.currentStyle[a]),isNaN(parseFloat(t))?t:parseFloat(t)},getIndex(e,a){if(!e||0==e.length||!a||"function"!=typeof a)return-1;if(e.findIndex)return e.findIndex(a);let t=e.length,l=0,o=-1;for(;l<t;l++)if(!0===a(e[l],o,e)){o=l;break}return o},addClass(e,a){if(!e||!a||1!==e.nodeType)return;let t=a.split(" ");if(e.classList){for(var l=0,o=t.length;l<o;l++){let a=t[l];e.classList.contains(a)||e.classList.add(a)}return e}{let l=e.className&&e.className.length>0?e.className.split(" "):[];return 0===l.length?void(e.className=a):(Array.prototype.push.apply(l,t),l=tool.arrayNoReapeat(l),e.className=l.join(" "),e)}},eleIsIntoView(e){let a=T.scrollTop(),t=0,l=T.getScrollParent(e);T.getScrollParent(e).nodeName,l&&"HTML"!=l.nodeName&&(t=T.scrollTop(e));let o=T.offset(e),n=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,s=o.top-a-t,i=s+e.offsetHeight;return s>0&&s<n&&i>0&&i<n},scrollTop(e){if(e){for(var a=e.parentElement,t=e.scrollTop||0;null!=a;){if(T.eleHasScroll(a))return a.scrollTop;a=a.parentElement}return t}return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},eleHasScroll(e){if(!e instanceof HTMLElement)return!1;if(e.scrollTop>0)return!0;{e.scrollTop++;const a=e.scrollTop;return a&&(e.scrollTop=0),a>0}},getScrollParent(e){if(e)for(var a=e.parentElement;null!=a;){if(T.eleHasScroll(a))return a;a=a.parentElement}}},N=["阿富汗","阿尔巴尼亚","阿尔及利亚","美属萨摩亚群岛","安道尔","安哥拉共和国","安圭拉","安提瓜岛","阿根廷","亚美尼亚","阿鲁巴","澳大利亚","奥地利共和国","阿塞拜疆共和国","巴哈马国","巴林王国","孟加拉人民共和国","巴巴多斯","白俄罗斯共和国","比利时王国 (België)","伯利兹","贝宁共和国 (Bénin)","百慕大群岛","不丹王国","玻利维亚国","波斯尼亚和黑塞哥维那","博茨瓦纳","巴西联邦共和国","英属印度洋领地","英属维尔京群岛","文莱达鲁萨兰国","保加利亚共和国","布基纳法索","布隆迪共和国","柬埔寨王国","喀麦隆共和国","加拿大","佛得角共和国","荷兰王国","开曼群岛","中非共和国","乍得共和国","智利共和国","中国","圣诞岛","科科斯群岛","哥伦比亚共和国","科摩罗联盟","刚果民主共和国","刚果共和国","库克群岛","哥斯达黎加共和国","科特迪瓦","克罗地亚共和国","古巴共和国","库拉索","塞浦路斯","捷克共和国","丹麦","吉布提共和国","多米尼克国","多米尼加共和国","厄瓜多尔","埃及","萨尔瓦","赤道几内亚","厄立特里亚","爱沙尼亚共和国","埃塞俄比亚","马尔维纳斯群岛","法罗群岛","斐济共和国","芬兰","法国","法属圭亚那","法属波利尼西亚","加蓬","冈比亚","格鲁吉亚","德国","加纳","直布罗陀","希腊","格陵兰","格林纳达","瓜德罗普岛","关岛","危地马拉","根西","几内亚","几内亚比绍共和国","圭亚那","海地","洪都拉斯","中国香港","匈牙利","冰岛","印度","印度尼西亚","地拉那","伊拉克共和国","爱尔兰","马恩岛","以色列国","意大利","牙买加","日本","泽西","约旦哈希姆王国","哈萨克斯坦共和国","肯尼亚","基里巴斯","科索沃","科威特国","吉尔吉斯共和国","老挝人民民主共和国","拉脱维亚共和国","黎巴嫩共和国","莱索托","利比里亚","利比亚","列支敦士登","立陶宛共和国","卢森堡","中國澳門","马其顿","马达加斯加共和国","马拉维","马来西亚","马尔代夫","马里","马耳他","马绍尔群岛共和国","马提尼克岛","毛里塔尼亚","毛里求斯","马约特","墨西哥","密克罗尼西亚","摩尔多瓦共和国","摩纳哥","蒙古","黑山共和国","蒙特塞拉特岛","摩洛哥","莫桑比克","缅甸联邦共和国","纳米比亚","瑙鲁","尼泊尔","荷兰","新喀里多尼亚","新西兰","尼加拉瓜","尼日尔","尼日利亚","纽埃","诺福克岛","North Korea (조선 민주주의 인민 공화국)","北马里亚纳群岛","挪威","阿曼苏丹国","巴基斯坦","帕劳共和国","巴勒斯坦国","巴拿马","巴布亚新几内亚独立国","巴拉圭","秘鲁","菲律宾共和国","波兰","葡萄牙","波多黎各岛","卡塔尔国","留尼旺岛","罗马尼亚","俄罗斯","卢旺达","圣巴托洛缪岛","圣海伦娜岛","圣基茨和尼维斯联邦","圣卢西亚","圣马丁岛","圣皮埃尔岛和密克隆岛","圣文森特和格林纳丁斯","西萨摩亚","圣马利诺","São Tomé and Príncipe (São Tomé e Príncipe)","沙特阿拉伯王国","塞内加尔","塞尔维亚共和国","塞舌尔","塞拉利昂共和国","新加坡","圣马丁岛","斯洛伐克共和国","斯洛文尼亚","所罗门群岛","索马里","南非","韩国","南苏丹共和国","西班牙","斯里兰卡","苏丹","苏里南","斯瓦尔巴群岛","斯威士兰","瑞典","瑞士","阿拉伯叙利亚共和国","中国台灣","塔吉克斯坦共和国","坦桑尼亚","泰国","东帝汶民主共和国","多哥","托克劳群岛","汤加","特立尼达和多巴哥共和国","突尼斯","土耳其","土库曼斯坦","特克斯和凯科斯群岛","图瓦卢","美属维尔京群岛","乌干达共和国","乌克兰","阿拉伯联合酋长国","大不列颠联合王国","美国","乌拉圭","乌兹别克斯坦共和国","瓦努阿图","梵蒂冈","委内瑞拉","越南","瓦利斯群岛和富图纳群岛","阿拉伯撒哈拉民主共和国","也门共和国","赞比亚","津巴布韦","奥兰群岛"];for(var B=[["Afghanistan (‫افغانستان‬‎)","af","93"],["Albania (Shqipëri)","al","355"],["Algeria (‫الجزائر‬‎)","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia (Հայաստան)","am","374"],["Aruba","aw","297"],["Australia","au","61",0],["Austria (Österreich)","at","43"],["Azerbaijan (Azərbaycan)","az","994"],["Bahamas","bs","1242"],["Bahrain (‫البحرين‬‎)","bh","973"],["Bangladesh (বাংলাদেশ)","bd","880"],["Barbados","bb","1246"],["Belarus (Беларусь)","by","375"],["Belgium (België)","be","32"],["Belize","bz","501"],["Benin (Bénin)","bj","229"],["Bermuda","bm","1441"],["Bhutan (འབྲུག)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (Босна и Херцеговина)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria (България)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (កម្ពុជា)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599",1],["Cayman Islands","ky","1345"],["Central African Republic (République centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (中国)","cn","86"],["Christmas Island","cx","61",2],["Cocos (Keeling) Islands","cc","61",1],["Colombia","co","57"],["Comoros (‫جزر القمر‬‎)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["Côte d’Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599",0],["Cyprus (Κύπρος)","cy","357"],["Czech Republic (Česká republika)","cz","420"],["Denmark (Danmark)","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic (República Dominicana)","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (‫مصر‬‎)","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (Føroyar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358",0],["France","fr","33"],["French Guiana (Guyane française)","gf","594"],["French Polynesia (Polynésie française)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (საქართველო)","ge","995"],["Germany (Deutschland)","de","49"],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (Ελλάδα)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590",0],["Guam","gu","1671"],["Guatemala","gt","502"],["Guernsey","gg","44",1],["Guinea (Guinée)","gn","224"],["Guinea-Bissau (Guiné Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong (中国香港)","hk","852"],["Hungary (Magyarország)","hu","36"],["Iceland (Ísland)","is","354"],["India (भारत)","in","91"],["Indonesia","id","62"],["Iran (‫ایران‬‎)","ir","98"],["Iraq (‫العراق‬‎)","iq","964"],["Ireland","ie","353"],["Isle of Man","im","44",2],["Israel (‫ישראל‬‎)","il","972"],["Italy (Italia)","it","39",0],["Jamaica","jm","1",4,["876","658"]],["Japan (日本)","jp","81"],["Jersey","je","44",3],["Jordan (‫الأردن‬‎)","jo","962"],["Kazakhstan (Казахстан)","kz","7",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kosovo","xk","383"],["Kuwait (‫الكويت‬‎)","kw","965"],["Kyrgyzstan (Кыргызстан)","kg","996"],["Laos (ລາວ)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (‫لبنان‬‎)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (‫ليبيا‬‎)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (中國澳門)","mo","853"],["Macedonia (FYROM) (Македонија)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (‫موريتانيا‬‎)","mr","222"],["Mauritius (Moris)","mu","230"],["Mayotte","yt","262",1],["Mexico (México)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (Монгол)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1664"],["Morocco (‫المغرب‬‎)","ma","212",0],["Mozambique (Moçambique)","mz","258"],["Myanmar (Burma) (မြန်မာ)","mm","95"],["Namibia (Namibië)","na","264"],["Nauru","nr","674"],["Nepal (नेपाल)","np","977"],["Netherlands (Nederland)","nl","31"],["New Caledonia (Nouvelle-Calédonie)","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (조선 민주주의 인민 공화국)","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway (Norge)","no","47",0],["Oman (‫عُمان‬‎)","om","968"],["Pakistan (‫پاکستان‬‎)","pk","92"],["Palau","pw","680"],["Palestine (‫فلسطين‬‎)","ps","970"],["Panama (Panamá)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (Perú)","pe","51"],["Philippines","ph","63"],["Poland (Polska)","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar (‫قطر‬‎)","qa","974"],["Réunion (La Réunion)","re","262",0],["Romania (România)","ro","40"],["Russia (Россия)","ru","7",0],["Rwanda","rw","250"],["Saint Barthélemy","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin (Saint-Martin (partie française))","mf","590",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé and Príncipe (São Tomé e Príncipe)","st","239"],["Saudi Arabia (‫المملكة العربية السعودية‬‎)","sa","966"],["Senegal (Sénégal)","sn","221"],["Serbia (Србија)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1721"],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (대한민국)","kr","82"],["South Sudan (‫جنوب السودان‬‎)","ss","211"],["Spain (España)","es","34"],["Sri Lanka (ශ්‍රී ලංකාව)","lk","94"],["Sudan (‫السودان‬‎)","sd","249"],["Suriname","sr","597"],["Svalbard and Jan Mayen","sj","47",1],["Swaziland","sz","268"],["Sweden (Sverige)","se","46"],["Switzerland (Schweiz)","ch","41"],["Syria (‫سوريا‬‎)","sy","963"],["Taiwan (中国台灣)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (ไทย)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia (‫تونس‬‎)","tn","216"],["Turkey (Türkiye)","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine (Україна)","ua","380"],["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)","ae","971"],["United Kingdom","gb","44",0],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan (Oʻzbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (Città del Vaticano)","va","39",1],["Venezuela","ve","58"],["Vietnam (Việt Nam)","vn","84"],["Wallis and Futuna (Wallis-et-Futuna)","wf","681"],["Western Sahara (‫الصحراء الغربية‬‎)","eh","212",1],["Yemen (‫اليمن‬‎)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"],["Åland Islands","ax","358",1]],D=0;D<B.length;D++){var k=B[D];B[D]={name:k[0],nameCN:N[D],iso2:k[1],dialCode:k[2],priority:k[3]||0,areaCodes:k[4]||null}}const M=B,L={name:"CountryList",props:{modelValue:{type:[String,Number],default:""},type:{type:String,default:"phone"},iso2:{type:String,default:""},listZIndex:{type:Number,default:0},maxHeight:{type:Number,default:0},searchText:{type:[String,Number],default:""},showAreaCode:{type:Boolean,default:!0},selectedText:{type:String,default:"Selected"},showSelectedText:{type:Boolean,default:!0},searchAble:{type:Boolean,default:!0},disableCountry:{type:[String,Array],default:()=>[]},onlyCountry:{type:[String,Array],default:()=>[]},noDataText:{type:String,default:"未找到任何数据！"},useChinese:{type:Boolean,default:!1}},emits:["update:modelValue","onChange"],setup(o,n){let s=e({item:{}}),i=a((()=>{let e=o.searchText||"",a=M,t="string"==typeof o.disableCountry?o.disableCountry.split(","):o.disableCountry,l="string"==typeof o.onlyCountry?o.onlyCountry.split(","):o.onlyCountry;return l.length>0&&(a=a.filter((e=>T.getIndex(l,(a=>{let t=a+"";return"+"===t.charAt(0)&&(t=t.replace("+","")),e.name===a||e.nameCN===a||e.dialCode===t||e.iso2===a}))>-1))),t.length>0&&(a=a.filter((e=>-1===T.getIndex(t,(a=>{let t=a+"";return"+"===t.charAt(0)&&(t=t.replace("+","")),e.name===a||e.nameCN===a||e.dialCode===t||e.iso2===a}))))),o.searchAble&&0!==e.length?(e=e.replace("+","\\+"),a=a.filter((a=>{let t=new RegExp(e,"gi"),l=t.test(a.name||a.nameCN),o=t.test(a.dialCode),n=t.test(a.iso2);return l||o||n})),a):a})),u=()=>{let e=o.modelValue;if(0==(e+"").length)return{};let a="phone"===o.type.toLowerCase();"+"===(e+"").charAt(0)&&(e=e.substr(1));let t=i.value.filter((t=>a?o.iso2?t.iso2==this.iso2:t.dialCode==e:t.iso2==e));return t=t&&0!==t.length&&t[0]||{},t};return t((()=>o.modelValue),(()=>{let e=u();e&&e!==s.item&&(s.item=e,n.emit("onChange",e,"phone"===o.type.toLowerCase()?e.dialCode||"":e.iso2||""))}),{immediate:!0}),l((()=>{"phone"==o.type&&0==(o.iso2+"").length&&console.warn("当type=phone时最好传递iso2属性，否则当区号代码为212或358时会出现选择不正确问题！")})),{selected:s,countryList:i,countryItemClickEvt:function(e){(e=e||window.event).stopPropagation?e.stopPropagation():e.cancelBubble=!0;let a,t=e.target;if(o.justRead)return;for(;"LI"!==t.nodeName;)t=t.parentElement;e.currentTarget;let l=t.getAttribute("data-index");if(a=i.value[l],!a)return;s.item=a;let u="phone"===o.type.toLowerCase();n.emit("update:modelValue",u?a.dialCode||"":a.iso2||""),n.emit("onChange",a,u?a.dialCode||"":a.iso2||"")}}}},A={class:"vue-country-name"},P={class:"vue-country-no-data"};L.render=function(e,a,t,l,h,y){return o(),n("div",{class:"vue-country-list-wrap",style:{"z-index":0!=t.listZIndex?t.listZIndex:"","max-height":t.maxHeight>0?t.maxHeight+"px":""}},[s("ul",{class:"vue-country-list",onClick:a[1]||(a[1]=(...e)=>l.countryItemClickEvt&&l.countryItemClickEvt(...e))},[(o(!0),n(i,null,u(l.countryList,((e,a)=>(o(),n("li",{class:["vue-country-item",{selected:e.iso2===l.selected.item.iso2}],key:e.iso2+a,"data-index":a,"data-iso":e.iso2},[s("span",{class:["iti-flag",e.iso2]},null,2),s("span",A,p(t.useChinese?e.nameCN:e.name),1),r(s("span",{class:"vue-country-areaCode"},"+"+p(e.dialCode),513),[[d,t.showAreaCode]]),r(s("span",{class:"selected-text"},p(t.selectedText),513),[[d,t.showSelectedText]])],10,["data-index","data-iso"])))),128)),r(s("li",P,[c(e.$slots,"vueCountryNoData",{},(()=>[m(p(t.noDataText),1)]))],512),[[d,0===l.countryList.length]])])],4)};const U={name:"SchemaInput",components:{"country-list":L},inheritAttrs:!1,props:{placeholder:{type:String,default:"请选择国家"},showAreaCode:{type:Boolean,default:!0},modelValue:{type:[String,Number],default:""},type:{type:String,default:"phone"},iso2:{type:String,default:""},searchAble:{type:Boolean,default:!0},listZIndex:{type:Number,default:0},showLabelImg:{type:Boolean,default:!0},onlyValue:{type:Boolean,default:!1},maxHeight:{type:Number,default:0},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},selectedText:{type:String,default:"Selected"},showSelectedText:{type:Boolean,default:!0},disableCountry:{type:[String,Array],default:()=>[]},onlyCountry:{type:[String,Array],default:()=>[]},noDataText:{type:String,default:"未找到任何数据！"},iosMobileReadonly:{type:Boolean,default:!0},useChinese:{type:Boolean,default:!1},static:{type:Boolean,default:!1},transitionName:{type:String,default:"fade_in_up"}},emits:["update:modelValue","onChange"],setup(l,o){let n=e({item:{}}),s=h(null),i=h(null),u=a((()=>{let e=n.item,a=l.useChinese?e.nameCN:e.name;return"phone"===l.type.toLowerCase()?l.onlyValue?"+"+e.dialCode:l.showAreaCode?a+"(+"+e.dialCode+")":a:l.onlyValue?e.iso2:a})),r=h(""),d=h(!1),c=h(!1),m=h(!0),p=h(!1),v=h(window.innerWidth),f=h(l.modelValue),b=h(null),g=h(null),C=a((()=>l.static||d.value));return t(f,(e=>{f.value,l.modelValue!=e&&o.emit("update:modelValue",e)}),{immediate:!0}),t((()=>l.modelValue),(e=>{f.value,f.value!=e&&(f.value=e)})),{id:h("vue_country_intl-"+(window._vueCountryIntl_count++||1)),searchText:r,countryListVisible:C,inputFocused:c,listOnBottom:m,isIos:p,deviceWidth:v,schemaInputValue:f,inputWrap:s,countryList:i,viewText:u,selected:n,searchInput:b,vueCountryIntlWrapper:g,onCountryChange:e=>{e.iso2,n.item.iso2,e.iso2!==n.item.iso2&&(n.item=e,o.emit("onChange",e))},hide:()=>{if(l.disabled||l.readonly||l.static)return;let e=setTimeout((()=>{clearTimeout(e),r.value="",c.value=!1,d.value=!1,m.value=!0}),100)},show:()=>{if(!(l.disabled||l.readonly||l.static)){if(c.value=!0,d.value=!0,r.value="",!l.readonly){let e=setTimeout((()=>{clearTimeout(e),b.value.focus()}),0)}y((()=>{var e;e=i.value.$el,T.eleIsIntoView(e)?m.value=!0:(e.style.opacity=0,m.value=!1,y((()=>{e.style.opacity=null,T.eleIsIntoView(e)||(m.value=!0)})))}))}}}}},E={class:"country-intl-label"},_=s("label",{class:"dropdown-flag"},null,-1),z=s("div",{class:"prevent-click"},null,-1),O={slot:"vueCountryNoData"};U.render=function(e,a,t,l,i,u){const m=v("country-list");return o(),n("div",{class:["vue-country-intl-input",{focused:e.inputFocused,"list-on-bottom":e.listOnBottom,"list-on-top":!e.listOnBottom,"vue-country-disabled":e.disabled,"vue-country-readonly":e.readonly,static:e.static}],ref:"vueCountryIntlWrapper"},[s("div",{class:["country-intl-input-wrap",{"no-data":!e.selected.item.name,"has-selected":e.selected.item.name}],ref:"inputWrap",onClick:a[3]||(a[3]=(...a)=>e.show&&e.show(...a))},[r(s("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=a=>e.searchText=a),class:"country-intl-input",autocomplete:"off",ref:"searchInput",onBlur:a[2]||(a[2]=(...a)=>e.hide&&e.hide(...a)),"aria-readonly":e.readonly,"aria-disabled":e.disabled,id:e.id+"-input",placeholder:e.placeholder,readonly:e.isIos&&e.deviceWidth<992&&e.iosMobileReadonly},null,40,["aria-readonly","aria-disabled","id","placeholder","readonly"]),[[f,e.searchText]]),s("label",E,[r(s("span",{class:["iti-flag",e.selected.item.iso2]},null,2),[[d,e.showLabelImg]]),s("span",null,p(e.viewText),1)]),_,z],2),s(g,{name:e.transitionName},{default:b((()=>[r(s(m,{ref:"countryList",modelValue:e.schemaInputValue,"onUpdate:modelValue":a[4]||(a[4]=a=>e.schemaInputValue=a),"search-text":e.searchText,selectedText:e.selectedText,"show-selected-text":e.showSelectedText,type:e.type,iso2:e.iso2,"search-able":e.searchAble,"disable-country":e.disableCountry,"only-country":e.onlyCountry,"no-data-text":e.noDataText,"use-chinese":e.useChinese,onOnChange:e.onCountryChange},{default:b((()=>[s("template",O,[c(e.$slots,"vueCountryNoData")])])),_:3},8,["modelValue","search-text","selectedText","show-selected-text","type","iso2","search-able","disable-country","only-country","no-data-text","use-chinese","onOnChange"]),[[d,e.countryListVisible]])])),_:1},8,["name"])],2)};const H={name:"SchemaPopover",components:{"country-list":L},inheritAttrs:!1,props:{visible:{type:Boolean,default:!1},showAreaCode:{type:Boolean,default:!0},modelValue:{type:[String,Number],default:""},type:{type:String,default:"phone"},iso2:{type:String,default:""},searchAble:{type:Boolean,default:!0},showLabelImg:{type:Boolean,default:!0},onlyValue:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},selectedText:{type:String,default:"Selected"},showSelectedText:{type:Boolean,default:!0},searchInputPlaceholder:{type:String,default:"输入国家名称、区号搜索"},popoverClass:{type:String,default:""},disableCountry:{type:[String,Array],default:()=>[]},onlyCountry:{type:[String,Array],default:()=>[]},noDataText:{type:String,default:"未找到任何数据！"},useChinese:{type:Boolean,default:!1},offset:{type:Array,default:()=>[0,10]},rightOffset:{type:Number,default:20},transitionName:{type:String,default:"zoom_in"}},emits:["update:modelValue","onChange","update:visible"],setup(a,o){let n=e({item:{}}),s=h(""),i=h(!1),u=h(!0),r=h(a.modelValue),d=h(null),c=h(null),m=h(!1),p=e({left:"-100%",top:"-100%"}),v=h(null),f=(e,a)=>{e-=T.scrollTop();let t=c.value.offsetHeight+e,l=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;return c.value.offsetHeight,e>0&&e<l&&t>0&&t<l},b=()=>{a.disabled||a.readonly||y((()=>{let e=d.value,t=T.offset(e),l=e.offsetHeight,o=T.getScrollParent(e),n=0;T.scrollTop(),o&&"HTML"!=o.nodeName&&(n=n=T.scrollTop(e));let s=0,i=t.left+a.offset[0];if(s=t.top+l+a.offset[1]-n,f(s))u.value=!0;else{let e=t.top-c.value.offsetHeight-a.offset[1]-n;f(e)?(s=e,u.value=!1):u.value=!0}p.top=s+"px",p.left=i+"px";let r=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;v.value=r<992?`calc(100vw - ${i}px - ${a.rightOffset}px)`:null,v.value}))},g=()=>{o.emit("update:visible",!1)};t(r,(e=>{r.value,a.modelValue!=e&&o.emit("update:modelValue",e)}),{immediate:!0}),t((()=>a.modelValue),(e=>{r.value,r.value!=e&&(r.value=e)})),t((()=>a.visible),(e=>{e&&b()}));let C=function(e){let a=(e=e||window.event).target;T.elementContains(d.value,a)||T.elementContains(c.value,a)||g()};return l((()=>{T.bindEvent(document.body,"click",C)})),{id:h("vue_country_intl-"+(window._vueCountryIntl_count++||2)),selected:n,searchText:s,countryListShow:i,listOnBottom:u,schemaPopoverValue:r,popoverContainer:d,popover:c,popoverVisible:m,popoverPosition:p,popoverMaxWidth:v,onCountryChange:e=>{e.iso2,n.item.iso2,e.iso2!==n.item.iso2&&(n.item=e,o.emit("onChange",e),g())},show:b,hide:g}}},R={class:"search-input-box"},G={slot:"vueCountryNoData"},j=s("div",{class:"vue-country-intl-popover-arrow"},null,-1);H.render=function(e,a,t,l,i,u){const m=v("country-list");return o(),n("div",{class:"vue-country-intl-schema-popover",ref:"popoverContainer",id:e.id},[c(e.$slots,"default"),(o(),n(C,{to:"body"},[s(g,{name:e.transitionName},{default:b((()=>[r(s("div",{class:["vue-country-intl-popover",[{"list-on-top":!e.listOnBottom,"list-on-bottom":e.listOnBottom},e.popoverClass]],ref:"popover",style:{left:e.popoverPosition.left,top:e.popoverPosition.top,maxWidth:e.popoverMaxWidth}},[s("div",R,[r(s("input",{type:"text",class:"search-input",autocomplete:"off","onUpdate:modelValue":a[1]||(a[1]=a=>e.searchText=a),placeholder:e.searchInputPlaceholder},null,8,["placeholder"]),[[f,e.searchText]])]),s(m,{ref:"countryList",modelValue:e.schemaPopoverValue,"onUpdate:modelValue":a[2]||(a[2]=a=>e.schemaPopoverValue=a),"search-text":e.searchText,selectedText:e.selectedText,"show-selected-text":e.showSelectedText,type:e.type,iso2:e.iso2,"search-able":e.searchAble,"disable-country":e.disableCountry,"only-country":e.onlyCountry,"no-data-text":e.noDataText,"use-chinese":e.useChinese,onOnChange:e.onCountryChange},{default:b((()=>[s("template",G,[c(e.$slots,"vueCountryNoData")])])),_:3},8,["modelValue","search-text","selectedText","show-selected-text","type","iso2","search-able","disable-country","only-country","no-data-text","use-chinese","onOnChange"]),j],6),[[d,e.visible]])])),_:1},8,["name"])]))],8,["id"])};const F={name:"SchemaModal",components:{"country-list":L},inheritAttrs:!1,props:{showAreaCode:{type:Boolean,default:!0},modelValue:{type:[String,Number],default:""},type:{type:String,default:"phone"},iso2:{type:String,default:""},searchAble:{type:Boolean,default:!0},listZIndex:{type:Number,default:0},maxHeight:{type:Number,default:0},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},selectedText:{type:String,default:"Selected"},showSelectedText:{type:Boolean,default:!0},searchInputPlaceholder:{type:String,default:"输入国家名称、区号搜索"},cancelText:{type:String,default:"取消"},visible:{type:Boolean,default:!1},modalClass:{type:String,default:""},disableCountry:{type:[String,Array],default:()=>[]},onlyCountry:{type:[String,Array],default:()=>[]},noDataText:{type:String,default:"未找到任何数据！"},useChinese:{type:Boolean,default:!1},transitionName:{type:String,default:"fade"}},emits:["update:modelValue","onChange","update:visible"],setup(a,l){let o=e({item:{}}),n=h(""),s=h(a.modelValue),i=h(a.visible),u=h(!1),r=h(null),d=()=>{let e=document.body.classList;e.contains("lock-scroll")||e.add("lock-scroll"),u.value||(u.value=!0),i.value=!0,l.emit("update:visible",!0)},c=()=>{let e=document.body.classList,a=setTimeout((()=>{clearTimeout(a),e.contains("lock-scroll")&&e.remove("lock-scroll"),i.value=!1,n.value="",l.emit("update:visible",!1)}),100)};return t(s,(e=>{s.value,a.modelValue!=e&&l.emit("update:modelValue",e)}),{immediate:!0}),t((()=>a.modelValue),(e=>{s.value,s.value!=e&&(s.value=e)})),t((()=>a.visible),(e=>{e!==i.value&&(e?d():c())}),{immediate:!0}),V((()=>{c()})),{id:h("vue_country_intl-"+window._vueCountryIntl_count++),selected:o,searchText:n,schemaModalValue:s,modalVisible:i,countryListVisible:u,intlModal:r,onCountryChange:e=>{e.iso2,o.item.iso2,e.iso2!==o.item.iso2&&(o.item=e,l.emit("onChange",e),c())},show:d,hide:c}}},K={class:"country-modal-content"},$={class:"country-modal-search-box"},W={class:"modal-search-wrap"},q={slot:"vueCountryNoData"};F.render=function(e,a,t,l,i,u){const m=v("country-list");return o(),n(C,{to:"body"},[s(g,{name:e.transitionName},{default:b((()=>[r(s("div",{class:["vue-country-intl-modal",e.modalClass],ref:"intlModal",style:{zIndex:0!=e.listZIndex?e.listZIndex:""}},[s("div",K,[s("div",$,[s("div",W,[r(s("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=a=>e.searchText=a),autocomplete:"off",class:"country-modal-search-input",placeholder:e.searchInputPlaceholder},null,8,["placeholder"]),[[f,e.searchText]]),s("span",{class:"country-modal-search-cancel",onClick:a[2]||(a[2]=(...a)=>e.hide&&e.hide(...a))},p(e.cancelText),1)])]),r(s(m,{ref:"countryList",modelValue:e.schemaModalValue,"onUpdate:modelValue":a[3]||(a[3]=a=>e.schemaModalValue=a),"search-text":e.searchText,selectedText:e.selectedText,"show-selected-text":e.showSelectedText,type:e.type,iso2:e.iso2,"search-able":e.searchAble,"disable-country":e.disableCountry,"only-country":e.onlyCountry,"no-data-text":e.noDataText,"use-chinese":e.useChinese,onOnChange:e.onCountryChange},{default:b((()=>[s("template",q,[c(e.$slots,"vueCountryNoData")])])),_:3},8,["modelValue","search-text","selectedText","show-selected-text","type","iso2","search-able","disable-country","only-country","no-data-text","use-chinese","onOnChange"]),[[d,e.countryListVisible]])])],6),[[d,e.modalVisible]])])),_:1},8,["name"])])};const Z={name:"Vue3CountryIntl",components:{"schema-input":U,"schema-popover":H,"schema-modal":F},props:{schema:{type:String,default:"input"},placeholder:{type:String,default:"请选择国家"},showAreaCode:{type:Boolean,default:!0},modelValue:{type:[String,Number],default:""},type:{type:String,default:"phone"},iso2:{type:String,default:""},searchAble:{type:Boolean,default:!0},listZIndex:{type:Number,default:0},showLabelImg:{type:Boolean,default:!0},onlyValue:{type:Boolean,default:!1},maxHeight:{type:Number,default:0},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},selectedText:{type:String,default:"Selected"},showSelectedText:{type:Boolean,default:!0},searchInputPlaceholder:{type:String,default:"输入国家名称、区号搜索"},offsetTop:{type:Number,default:10},popoverClass:{type:String,default:""},visible:{type:Boolean,default:!1},modalClass:{type:String,default:""},cancelText:{type:String,default:"取消"},disableCountry:{type:[String,Array],default:()=>[]},onlyCountry:{type:[String,Array],default:()=>[]},noDataText:{type:String,default:"未找到任何数据！"},iosMobileReadonly:{type:Boolean,default:!0},useChinese:{type:Boolean,default:!1},static:{type:Boolean,default:!1},offset:{type:Array,default:()=>[0,10]},rightOffset:{type:Number,default:20},transitionName:{type:[String,void 0],default:void 0}},emits:["update:modelValue","update:visible","onChange"],setup(a,o){window._vueCountryIntl_count||(window._vueCountryIntl_count=1);let n=e({item:{}}),s=h(a.visible),i=h(a.modelValue);t(i,(e=>{a.modelValue!=e&&o.emit("update:modelValue",e)}),{immediate:!0}),t((()=>a.modelValue),(e=>{i.value!=e&&(i.value=e)})),"modal"!=a.schema&&"popover"!=a.schema||(t((()=>a.visible),(e=>{e!=s.value&&(s.value=e)})),t(s,(e=>{e!=a.visible&&o.emit("update:visible",e)})));let u=h(null),r=h(null),d=h(null);return l((()=>{let e=document.body.classList;T.termianl().ios&&!e.contains("vue-country-ios")&&e.add("vue-country-ios")})),{onChange:e=>{n.item=e,o.emit("onChange",e)},version:h("1.0.1"),getSelected:()=>n.item,modalVisible:s,countryIntlValue:i,show:()=>{let e;switch(a.schema){case"input":e=u;break;case"popover":e=r;break;case"modal":e=d}e.value.show()},hide:()=>{let e;switch(a.schema){case"input":e=u;break;case"popover":e=r;break;case"modal":e=d}e.value.hide()},schemaInput:u,schemaPopover:r,modalPopover:d}}},J={slot:"vueCountryNoData"},Y={slot:"vueCountryNoData"},Q={slot:"vueCountryNoData"};Z.render=function(e,a,t,l,i,u){const r=v("schema-input"),d=v("schema-popover"),m=v("schema-modal");return"input"===e.schema?(o(),n(r,S({key:0,ref:"schemaInput"},e.$props,{modelValue:e.countryIntlValue,"onUpdate:modelValue":a[1]||(a[1]=a=>e.countryIntlValue=a),onOnChange:e.onChange}),{default:b((()=>[s("template",J,[c(e.$slots,"vueCountryNoData")])])),_:3},16,["modelValue","onOnChange"])):"popover"===e.schema?(o(),n(d,S({key:1,ref:"schemaPopover"},e.$props,{modelValue:e.countryIntlValue,"onUpdate:modelValue":a[2]||(a[2]=a=>e.countryIntlValue=a),visible:e.modalVisible,"onUpdate:visible":a[3]||(a[3]=a=>e.modalVisible=a),onOnChange:e.onChange}),{default:b((()=>[c(e.$slots,"default"),s("template",Y,[c(e.$slots,"vueCountryNoData")])])),_:3},16,["modelValue","visible","onOnChange"])):"modal"===e.schema?(o(),n(m,S({key:2,ref:"schemaModal"},e.$props,{modelValue:e.countryIntlValue,"onUpdate:modelValue":a[4]||(a[4]=a=>e.countryIntlValue=a),visible:e.modalVisible,"onUpdate:visible":a[5]||(a[5]=a=>e.modalVisible=a),onOnChange:e.onChange}),{default:b((()=>[s("template",Q,[c(e.$slots,"vueCountryNoData")])])),_:3},16,["modelValue","visible","onOnChange"])):w("",!0)};const X={name:"DemoDoc",components:{VueCountryIntl:Z},setup(a,t){let l=e({default:"",country:"cn",disableUse:"+86",noImage:"",staticLayout:"86",disableCountry:"",onlyCountry:"",selected:{}}),o=e({default:"",defaultVisible:!1,defaultVisible2:!1}),n=e({default:!1}),s=e({default:""});return{schemaInputData:l,schemaPopoverData:o,schemaModalVisible:n,schemaModal:s,onChange:e=>{l.selected=e}}}},ee={class:"demo-doc-page clearfix"},ae={class:"left"},te=s("h1",null,"1、模式(model)：scheme = input",-1),le=s("h3",{class:"mb-10"},[s("div",{class:"pull-left"},"1、"),s("div",{class:"overflow"},[s("div",{class:"mb-5"},"默认效果(选择手机区号)"),s("div",null,"Default effect (select phone area code)")])],-1),oe=s("template",{slot:"vueCountryNoData"},[s("h1",null,"没有找到该国籍！")],-1),ne={class:"mt-5"},se=x('<div class="hr"></div><h3 class="mb-10"><div class="pull-left">1-2、</div><div class="overflow"><div class="mb-5">使用中文名称显示</div><div>Use Chinese name display</div></div></h3>',2),ie=s("template",{slot:"vueCountryNoData"},[s("h1",null,"没有找到该国籍！")],-1),ue={class:"mt-5"},re=x('<div class="hr"></div><h3 class="mb-10"><div class="pull-left">2、</div><div class="overflow"><div class="mb-5">选择国籍</div><div>Select country</div></div></h3>',2),de={class:"mt-5"},ce=x('<div class="hr"></div><h3 class="mb-10"><div class="pull-left">3、</div><div class="overflow"><div class="mb-5">禁用</div><div>Disable</div></div></h3>',2),me={class:"mt-5"},pe=x('<div class="hr"></div><h3 class="mb-10"><div class="pull-left">4、</div><div class="overflow"><div class="mb-5">不显示图片</div><div>Do not display images</div></div></h3>',2),he={class:"mt-5"},ye=x('<div class="hr"></div><h3 class="mb-10"><div class="pull-left">5、</div><div class="overflow"><div class="mb-5">静态布局</div><div>Static layout</div></div></h3>',2),ve={class:"mt-5"},fe=x('<div class="hr"></div><h3 class="mb-10"><div class="pull-left">7、</div><div class="overflow"><div class="mb-5">禁用指定国籍</div><div>Disable specified country</div></div></h3><p class="mb-5">禁用：中国、美国、日本，中国香港(Disabled: China, USA, Japan, Hong Kong China)</p>',3),be={class:"mt-5"},ge=x('<div class="hr"></div><h3 class="mb-10"><div class="pull-left">8、</div><div class="overflow"><div class="mb-5">只显示指定国籍</div><div>Show only designated countries</div></div></h3><p class="mb-5">只显示：中国、美国、日本，中国香港(Disabled: China, USA, Japan, Hong Kong China)</p>',3),Ce={class:"mt-5"},Ve=s("div",{class:"hr"},null,-1),Se={class:"center"},we=s("h1",null,"2、模式(model)：scheme = popover",-1),xe=s("h3",{class:"mb-10"},[s("div",{class:"pull-left"},"1、"),s("div",{class:"overflow"},[s("div",{class:"mb-5"},"默认效果(选择手机区号)"),s("div",null,"Default effect (select phone area code)")])],-1),Ie=s("template",{slot:"vueCountryNoData"},[s("h1",null,"没有找到该国籍！")],-1),Te={class:"mt-5"},Ne=x('<div class="hr"></div><h3 class="mb-10" style="margin-top:400px;"><div class="pull-left">2、</div><div class="overflow"><div class="mb-5">测试弹出方位</div><div>Test the pop-up orientation</div></div></h3>',2),Be=s("template",{slot:"vueCountryNoData"},[s("h1",null,"没有找到该国籍！")],-1),De={class:"mt-5"},ke=s("div",{class:"hr"},null,-1),Me={class:"right"},Le=s("h1",null,"scheme = modal 模式",-1),Ae=s("h3",{class:"mb-10"},[s("div",{class:"pull-left"},"1、"),s("div",{class:"overflow"},[s("div",{class:"mb-5"},"默认效果(选择手机区号)"),s("div",null,"Default effect (select phone area code)")])],-1),Pe=s("template",{slot:"vueCountryNoData"},[s("h1",null,"没有找到该国籍！")],-1),Ue={class:"mt-5"};X.render=function(e,a,t,l,i,u){const r=v("VueCountryIntl");return o(),n("div",ee,[s("div",ae,[te,le,s(r,{modelValue:l.schemaInputData.default,"onUpdate:modelValue":a[1]||(a[1]=e=>l.schemaInputData.default=e),onOnChange:l.onChange},{default:b((()=>[oe])),_:1},8,["modelValue","onOnChange"]),s("h5",ne,"区号代码："+p(l.schemaInputData.default||"--"),1),se,s(r,{modelValue:l.schemaInputData.default,"onUpdate:modelValue":a[2]||(a[2]=e=>l.schemaInputData.default=e),"use-chinese":!0},{default:b((()=>[ie])),_:1},8,["modelValue"]),s("h5",ue,"区号代码："+p(l.schemaInputData.default||"--"),1),re,s(r,{type:"country",modelValue:l.schemaInputData.country,"onUpdate:modelValue":a[3]||(a[3]=e=>l.schemaInputData.country=e),"no-data-text":"没有找到相关数据"},null,8,["modelValue"]),s("h5",de,"国籍代码："+p(l.schemaInputData.country||"--"),1),ce,s(r,{modelValue:l.schemaInputData.disableUse,"onUpdate:modelValue":a[4]||(a[4]=e=>l.schemaInputData.disableUse=e),disabled:!0},null,8,["modelValue"]),s("h5",me,"区号："+p(l.schemaInputData.disableUse||"--"),1),pe,s(r,{modelValue:l.schemaInputData.noImage,"onUpdate:modelValue":a[5]||(a[5]=e=>l.schemaInputData.noImage=e),"show-label-img":!1},null,8,["modelValue"]),s("h5",he,"区号："+p(l.schemaInputData.noImage||"--"),1),ye,s(r,{modelValue:l.schemaInputData.staticLayout,"onUpdate:modelValue":a[6]||(a[6]=e=>l.schemaInputData.staticLayout=e),static:!0},null,8,["modelValue"]),s("h5",ve,"区号："+p(l.schemaInputData.staticLayout||"--"),1),fe,s(r,{modelValue:l.schemaInputData.disableCountry,"onUpdate:modelValue":a[7]||(a[7]=e=>l.schemaInputData.disableCountry=e),"disable-country":"+86,United States,Japan (日本),hk"},null,8,["modelValue"]),s("h5",be,"区号："+p(l.schemaInputData.disableCountry||"--"),1),ge,s(r,{modelValue:l.schemaInputData.onlyCountry,"onUpdate:modelValue":a[8]||(a[8]=e=>l.schemaInputData.onlyCountry=e),"only-country":"+86,United States,Japan (日本),hk"},null,8,["modelValue"]),s("h5",Ce,"区号："+p(l.schemaInputData.onlyCountry||"--"),1),Ve]),s("div",Se,[we,xe,s(r,{schema:"popover","popover-class":"popover-class1111",modelValue:l.schemaPopoverData.default,"onUpdate:modelValue":a[10]||(a[10]=e=>l.schemaPopoverData.default=e),visible:l.schemaPopoverData.defaultVisible,"onUpdate:visible":a[11]||(a[11]=e=>l.schemaPopoverData.defaultVisible=e)},{default:b((()=>[s("button",{type:"button",onClick:a[9]||(a[9]=e=>l.schemaPopoverData.defaultVisible=!0)},"选择手机区号"),Ie])),_:1},8,["modelValue","visible"]),s("h5",Te,"区号："+p(l.schemaPopoverData.default||"--"),1),Ne,s(r,{schema:"popover","popover-class":"popover-class1111",modelValue:l.schemaPopoverData.default,"onUpdate:modelValue":a[13]||(a[13]=e=>l.schemaPopoverData.default=e),visible:l.schemaPopoverData.defaultVisible2,"onUpdate:visible":a[14]||(a[14]=e=>l.schemaPopoverData.defaultVisible2=e)},{default:b((()=>[s("button",{type:"button",onClick:a[12]||(a[12]=e=>l.schemaPopoverData.defaultVisible2=!0)},"选择手机区号"),Be])),_:1},8,["modelValue","visible"]),s("h5",De,"区号："+p(l.schemaPopoverData.default||"--"),1),ke]),s("div",Me,[Le,Ae,s("button",{type:"button",onClick:a[15]||(a[15]=e=>l.schemaModalVisible.default=!0)},"选择手机区号"),s(r,{schema:"modal","modal-class":"modal-class",listZIndex:5e3,visible:l.schemaModalVisible.default,"onUpdate:visible":a[16]||(a[16]=e=>l.schemaModalVisible.default=e),modelValue:l.schemaModal.default,"onUpdate:modelValue":a[17]||(a[17]=e=>l.schemaModal.default=e)},{default:b((()=>[Pe])),_:1},8,["visible","modelValue"]),s("h5",Ue,"区号："+p(l.schemaModal.default||"--"),1)])])};I({expose:[],setup:e=>(h(!1),h(null),h(null),h("+86"),h(!1),h(!1),(e,a)=>(o(),n(X))),__scopeId:"data-v-4602b555"}).mount("#app");