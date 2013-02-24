
function Html2Markdown(value) {
  var dom = $("<div id=\"root\"></div>");
  dom.append(value);
  
  dom.find("> hr").each(function() {
    $(this).replaceWith("---");
  });
  
  dom.find("em > strong").each(function() {
    $(this).replaceWith("**"+$(this).html()+"**"); 
  });
  
  dom.find("> p > em, > em, > ul > li > em").each(function() {
    $(this).replaceWith("_"+$(this).html()+"_"); 
  });
  
  
  
  dom.find("> strong, > p > strong, > ul > li > strong").each(function() {
    $(this).replaceWith("**"+$(this).html()+"**"); 
  });
  
  dom.find("> p, blockquote > p").each(function() {
    if($(this).get(0).attributes.length === 0) {
     $(this).replaceWith($(this).html()); 
    }
  });
  
  dom.find("ul").each(function() {
    $(this).find('li').each(function() {
      $(this).replaceWith("- "+$(this).html()+"\n");
    });
    $(this).replaceWith($(this).html());
  });
  
  dom.find("ol").each(function() {
    $(this).find('li').each(function(index,value) {
      $(this).replaceWith((index+1)+". "+$(this).html()+"\n");
    });
    $(this).replaceWith($(this).html());
  });
  
  dom.find('blockquote').each(function() {
    $(this).replaceWith("> "+$(this).html());
  });
  
  $.each(["h1",'h2','h3','h4','h5'],function(index,value) {
    
    var hashes = "";
    var i = 0;
    for(; i <= index;i++) {
      hashes += "#";
    }
    
    dom.find("> "+value).each(function() {
      $(this).find("> strong").each(function() {
        $(this).replaceWith("**"+$(this).html()+"**"); 
      });
      
      $(this).find("> em").each(function() {
        $(this).replaceWith("_"+$(this).html()+"_"); 
      });
      
      $(this).replaceWith(hashes+" "+$.trim($(this).html())); 
    });
  });
  
  return dom.html().replace(/^&gt;/,'>');
}
