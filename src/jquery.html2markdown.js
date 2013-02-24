
function Html2Markdown(value) {
  var dom = $("<div id=\"root\"></div>");
  dom.append(value);
  
  dom.find("> hr").each(function() {
    $(this).replaceWith("---");
  });
  
  dom.find("em > strong").each(function() {
    $(this).replaceWith("**"+$(this).text()+"**"); 
  });
  
  dom.find("> p > em, > em, > ul > li > em").each(function() {
    $(this).replaceWith("_"+$(this).text()+"_"); 
  });
  
  dom.find("> strong, > p > strong, > ul > li > strong").each(function() {
    $(this).replaceWith("**"+$(this).text()+"**"); 
  });
  
  dom.find("> p").each(function() {
    if($(this).get(0).attributes.length === 0) {
     $(this).replaceWith($(this).html()); 
    }
  });
  
  dom.find("ul").each(function() {
    $(this).find('li').each(function() {
      $(this).replaceWith("- "+$(this).text()+"\n");
    });
    $(this).replaceWith($(this).text());
  });
  
  dom.find("ol").each(function() {
    $(this).find('li').each(function(index,value) {
      $(this).replaceWith((index+1)+". "+$(this).text()+"\n");
    });
    $(this).replaceWith($(this).text());
  });
  
  $.each(["h1",'h2','h3','h4','h5'],function(index,value) {
    
    var hashes = "";
    var i = 0;
    for(; i <= index;i++) {
      hashes += "#";
    }
    
    dom.find("> "+value).each(function() {
      $(this).replaceWith(hashes+" "+$.trim($(this).text())); 
    });
  });
  
  return dom.html();
}
