/*global describe, it, expect, Html2Markdown, marked, markdown

*/

// TODO, must fix so that we adde new line where needed ,
// Input html might not have any between the elements and then nothing works =(

var stableMarkdownStrings = [
"---"
,"A single line paragraph"
,"Paragraph one\n\nParagraph two"
,"Paragraph one\n\n---\n\nParagraph two"
,"# Heading1\n\n## Heading 2\n\n### Heading 3\n\n#### Heading 4\n\n##### Heading 5"
,"A _single_ line **paragraph**"
,"<img src=\"/files/test.png\">"
,'<a href="http://www.google.com"><em>Google</em></a>'
,"_**help**_"
,"- Item1\n- Item2\n- Item3"
,"1. Item1\n2. Item2\n3. Item3"
,"- _Item1_\n- **Item2**"
,"# _Heading_\n## **Heading2**"
,"# <span>Heading</span>"
,"_<span>Something</span>_"
,"**<span>Something</span>**"
,"# _<span>Something</span>_"
,"# **<span>Something</span>**"
,"_**<span>Hej</span>**_"
,"- <span>Yes we can!</span>"
,"1. <span>Yes we can!</span>"
,"- Test <br>\n- Fun!"
,"> Paragraph one\n>\n> Paragraph two"
,"This is a <i>test</i> paragraph"
];

var html2Markdown = {
  "<p>Html paragraph 1.</p><p>Html paragraph 2.</p>" : "Html paragraph 1.\n\nHtml paragraph 2."
  ,"<div>Its a div</div><p>Html paragraph 2.</p>" : "<div>Its a div</div>\n\nHtml paragraph 2."
  ,"<ul><li>One</li><li>two</li></ul>" : "- One\n- two"
  ,"<ol><li>One</li><li>two</li></ol>" : "1. One\n2. two"
  ,"<p>Html paragraph</p><ul><li>One</li><li>two</li></ul>" : "Html paragraph\n\n- One\n- two"
  ,"<p>Html paragraph</p><ol><li>One</li><li>two</li></ol>" : "Html paragraph\n\n1. One\n2. two"
  ,"<div>Div</div><ul><li>One</li><li>two</li></ul>" : "<div>Div</div>\n\n- One\n- two"
  ,"<div>Div</div><ol><li>One</li><li>two</li></ol>" : "<div>Div</div>\n\n1. One\n2. two"
  ,"<div><strong>Div</strong></div>" : "<div><strong>Div</strong></div>"
  ,"<div><em>Div</em></div>" : "<div><em>Div</em></div>"
  ,"<blockquote><p>Goda nyheter för alla som gillar italiensk mat.\nNi slipper resa till Rom. En tur till Gamla Stan ger ljuvliga smakupplevelser.</p></blockquote>" : '> Goda nyheter för alla som gillar italiensk mat.\n> Ni slipper resa till Rom. En tur till Gamla Stan ger ljuvliga smakupplevelser.'
  ,'<h1>Kontakt</h1><h2>Restaurang Villa Godthem på Djurgården AB</h2>': '# Kontakt\n\n## Restaurang Villa Godthem på Djurgården AB'
  ,'<h1>Kontakt</h1><p>Restaurang Villa Godthem på Djurgården AB</p>': '# Kontakt\n\nRestaurang Villa Godthem på Djurgården AB'
  ,'<h1>Pellentesque imperdiet</h1><img class="movable ui-draggable ui-droppable right" src="/burp/files/large/change-page-title-4.png">' : '# Pellentesque imperdiet\n\n<img class="movable ui-draggable ui-droppable right" src="/burp/files/large/change-page-title-4.png">'
};



describe("Html2Markdown", function() {
  
  it('should exist', function() {
    expect(Html2Markdown).toBeTruthy();
  }); 
  
  it("should translate generated html back to the original markdown", function() {
    $.each(stableMarkdownStrings,function(index,originalMarkdown) {
      var translatedMarkdown = $.trim(Html2Markdown(marked(originalMarkdown)));
      expect(translatedMarkdown.replace(/(\n+)/g,'\n')).toEqual(originalMarkdown.replace(/(\n+)/g,'\n'));
    });
  });
  
  it("should translate any html to a valid markdown where posible", function() {
    $.each(html2Markdown,function(html,expectedMarkdown) {
      expect(Html2Markdown(html)).toEqual(expectedMarkdown);
    });
  });
  
  it('should translate hr elements' ,function() {
    expect(Html2Markdown("<hr>")).toEqual("---");
    expect(Html2Markdown("<hr>\n")).toEqual("---\n\n");
    expect(Html2Markdown("\n\n<hr>\n")).toEqual("\n\n---\n\n");
    expect(Html2Markdown("<hr><div>Hej</div>")).toEqual("---\n\n<div>Hej</div>");
  });
  
  
  it('should only translate hr elements at the first level', function() {
    expect(Html2Markdown("<div><hr></div>")).toEqual("<div><hr></div>");
  });
  
  describe("should translates headings", function() {
    
    it("should translate heading elements", function() {
      expect(Html2Markdown("<h1>Heading 1</h1>")).toEqual("# Heading 1");
      expect(Html2Markdown("<h2>Heading 2</h2>")).toEqual("## Heading 2");
      expect(Html2Markdown("<h3>Heading 3</h3>")).toEqual("### Heading 3");
      expect(Html2Markdown("<h4>Heading 4</h4>")).toEqual("#### Heading 4");
      expect(Html2Markdown("<h5>Heading 5</h5>")).toEqual("##### Heading 5");
    });
    
    it('should not translate elemenst with a div', function() {
      expect(Html2Markdown("<div><h1>Heading 1</h1></div>")).toEqual("<div><h1>Heading 1</h1></div>");
      expect(Html2Markdown("<div><h2>Heading 2</h2></div>")).toEqual("<div><h2>Heading 2</h2></div>");
      expect(Html2Markdown("<div><h3>Heading 3</h3></div>")).toEqual("<div><h3>Heading 3</h3></div>");
      expect(Html2Markdown("<div><h4>Heading 4</h4></div>")).toEqual("<div><h4>Heading 4</h4></div>");
      expect(Html2Markdown("<div><h5>Heading 5</h5></div>")).toEqual("<div><h5>Heading 5</h5></div>");
    });
    
    it('should not translate elements with a attribute', function() {
      expect(Html2Markdown("<h1 class=\"\">Heading 1</h1>")).toEqual("<h1 class=\"\">Heading 1</h1>");
      expect(Html2Markdown("<h2 class=\"\">Heading 2</h2>")).toEqual("<h2 class=\"\">Heading 2</h2>");
      expect(Html2Markdown("<h3 class=\"\">Heading 3</h3>")).toEqual("<h3 class=\"\">Heading 3</h3>");
      expect(Html2Markdown("<h4 class=\"\">Heading 4</h4>")).toEqual("<h4 class=\"\">Heading 4</h4>");
      expect(Html2Markdown("<h5 class=\"\">Heading 5</h5>")).toEqual("<h5 class=\"\">Heading 5</h5>");
    });

  });
  
  describe("should translate paragraphs", function() {
    
    it('should translate elements in the root', function() {
      expect(Html2Markdown("<p>Just some text</p>")).toEqual("Just some text");
    });
    
    it('should translate elements in the blockquote', function() {
      expect(Html2Markdown("<blockquote><p>Just some text</p></blockquote>")).toEqual("> Just some text");
    });

    it('should not translate elements with attributes', function() {
      expect(Html2Markdown("<p class=\"test\">Just some text</p>")).toEqual("<p class=\"test\">Just some text</p>");
    });
    
    it('should not translate elements within a div', function() {
      expect(Html2Markdown("<div><p>Just some text</p></div>")).toEqual("<div><p>Just some text</p></div>");
    });
  });
  
  describe("should translate em element", function() {
    
    it('should translate element in root', function() {
      expect(Html2Markdown("<em>Just some text</em>")).toEqual("_Just some text_");
    });
    
    it('should translate element in paragraph', function() {
      expect(Html2Markdown("<p><em>Just some text</em></p>")).toEqual("_Just some text_");
    });
    
    it('should translate element in li', function() {
      expect(Html2Markdown("<ul><li><em>Just some text</em></li></ul>")).toEqual("- _Just some text_");
    });

    it("should not translate element with a div", function() {
      expect(Html2Markdown("<div><em>Just some text</em></div>")).toEqual("<div><em>Just some text</em></div>");
    });
    
    it('should translate element in heading', function() {
      expect(Html2Markdown("<h1><em>Just some text</em></h1>")).toEqual("# _Just some text_");
    });

  });
  
  describe("translation of strong elment", function() {
    
    it('should handel elements in the root', function() {
      expect(Html2Markdown("<strong>Just some text</strong>")).toEqual("**Just some text**");
    });
    
    it('should handel elements in a paragraph', function() {
      expect(Html2Markdown("<p><strong>Just some text</strong></p>")).toEqual("**Just some text**");
    });

    it("should not translate elements within a div", function() {
      expect(Html2Markdown("<div><strong>Just some text</strong></div>")).toEqual("<div><strong>Just some text</strong></div>");
    });
    
    it('should translate element in li', function() {
      expect(Html2Markdown("<ul><li><strong>Just some text</strong></li></ul>")).toEqual("- **Just some text**");
    });
    
    it('should translate element in heading', function() {
      expect(Html2Markdown("<h1><strong>Just some text</strong></h1>")).toEqual("# **Just some text**");
    });
  });
  
  describe("should translate ul lists", function() {
    
    it('should handle list with one item', function() {
      expect(Html2Markdown("<ul><li>Hej</li></ul>")).toEqual("- Hej");
    });
    
    it('should handle list with many items', function() {
      expect(Html2Markdown("<ul><li>Hej 1</li><li>Hej 2</li></ul>")).toEqual("- Hej 1\n- Hej 2");
    });
    
  });
  
  describe("should translate ol lists", function() {
    
    it('should handle list with one item', function() {
      expect(Html2Markdown("<ol><li>Hej</li></ol>")).toEqual("1. Hej");
    });
    
    it('should handle list with many items', function() {
      expect(Html2Markdown("<ol><li>Hej 1</li><li>Hej 2</li></ol>")).toEqual("1. Hej 1\n2. Hej 2");
    });
    
  });
  
  describe("should translate blockquote", function() {
    
    it("should handle blockquote", function() {
      expect(Html2Markdown("<blockquote>Hej</blockquote>")).toEqual("> Hej");
    });
    
  });
  
}); 
