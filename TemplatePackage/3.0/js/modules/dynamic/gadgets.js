/*!  RD_TemplatePackage_3 2015-12-16 Build: 3.1.14.1 */
var tabs=$(".tabs").length,accordions=$(".accordion").length;if("undefined"!=typeof gadgetobjs&&gadgetobjs.length>0)for(var i=0;i<gadgetobjs.length;i+=2)tabs&&$(gadgetobjs[i].id).tabs(gadgetobjs[i+1]),accordions&&$(gadgetobjs[i].id).accordion(gadgetobjs[i+1]);else log("Gadgets Not Configured Correctly");CDC.getHash().length&&(tabs&&("tab"===$('.tabs a[href="'+CDC.getHash()+'"]').parent().attr("role")?$('.tabs a[href="'+CDC.getHash()+'"]').trigger("click"):$(CDC.getHash()).closest('[role^="tabpanel"]')&&$('.tabs a[href="#'+$(CDC.getHash()).closest('[role^="tabpanel"]').attr("id")+'"]').trigger("click")),accordions&&($(".accordion").find(CDC.getHash()).parent().hasClass("accordion")?$(".accordion").find(CDC.getHash()).trigger("click"):$(".accordion").find(CDC.getHash()).closest('[role^="tabpanel"]').prev("h3").trigger("click"))),$(window).on("hashchange",function(){tabs&&("tab"===$('.tabs a[href="'+CDC.getHash()+'"]').parent().attr("role")?$('.tabs a[href="'+CDC.getHash()+'"]').trigger("click"):$(CDC.getHash()).closest('[role^="tabpanel"]')&&$('.tabs a[href="#'+$(CDC.getHash()).closest('[role^="tabpanel"]').attr("id")+'"]').trigger("click")),accordions&&($(".accordion").find(CDC.getHash()).parent().hasClass("accordion")?$(".accordion").find(CDC.getHash()).trigger("click"):$(".accordion").find(CDC.getHash()).closest('[role^="tabpanel"]').prev("h3").trigger("click"))});