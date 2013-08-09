
function getAfterPadding(element,padding) {
  var next = $(element).get(0).nextSibling;
  if(!next) {
    padding = "";
  } else if(next.nodeType === 3) {
    if(next.data.match(/^(\t| )*\n(\t| )*\n/)) {
      padding = "";
    } else if(next.data.match(/^(\t| )*\n/) && padding.length > 1) {
      padding = "\n";
    }
  }
  return padding;
}

function getBeforePadding(element,padding) {
  var previous = $(element).get(0).previousSibling;
  if(!previous) {
    padding = "";
  } else if(previous.nodeType === 3) {
    if(previous.data.match(/\n(\t| )*\n(\t| )*$/)) {
      padding = "";
    } else if(previous.data.match(/\n(\t| )*$/) && padding.length > 1) {
      padding = "\n";
    }
  }
  return padding;
} 

function Html2Markdown(value) {
  var dom = $("<div id=\"root\"></div>");
  dom.append(value);
  
  dom.find("> hr").each(function() {
    $(this).replaceWith(getBeforePadding(this,"\n\n") + "---" + getAfterPadding(this,"\n\n"));
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
      $(this).replaceWith(getBeforePadding(this,"\n\n")+$(this).html()+getAfterPadding(this,"\n\n"));
    }
  });
  
  dom.find("ul").each(function() {
    $(this).find('li').each(function() {
      $(this).replaceWith("- "+$(this).html()+getAfterPadding(this,"\n"));
    });
    
    $(this).replaceWith(getBeforePadding(this,"\n\n") + $(this).html() + getAfterPadding(this,"\n\n"));
  });
  
  dom.find("ol").each(function() {
    $(this).find('li').each(function(index,value) {
      $(this).replaceWith((index+1)+". "+$(this).html()+getAfterPadding(this,"\n"));
    });
    $(this).replaceWith(getBeforePadding(this,"\n\n")+$(this).html());
  });
  
  dom.find('blockquote').each(function() {
    $(this).replaceWith("> "+$.trim($(this).html()).replace(/\n{2,20}/g,"\n\n").replace(/\n/g,'\n> ').replace(/> \n/g,">\n"));
  });
  
  $.each(["h1",'h2','h3','h4','h5'],function(index,value) {
    
    var hashes = "";
    var i = 0;
    for(; i <= index;i++) {
      hashes += "#";
    }
    
    dom.find("> "+value).each(function() {
      
      if($(this).get(0).attributes.length === 0) {      
        $(this).find("> strong").each(function() {
          $(this).replaceWith("**"+$(this).html()+"**"); 
        });
      
        $(this).find("> em").each(function() {
          $(this).replaceWith("_"+$(this).html()+"_"); 
        });
      
        $(this).replaceWith(getBeforePadding(this,"\n\n")+hashes+" "+$.trim($(this).html()) + getAfterPadding(this,"\n\n")); 
      }
    });
  });
  
  return dom.html().replace(/^&gt;/mg,'>').replace(/^&lt;/mg,'<').replace(/\n{2,20}/g,"\n\n");
}
