/*global describe, it, expect, Html2Markdown, marked, markdown

*/

var markdownStrings = [
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
];

describe("Html2Markdown", function() {
  
  it('should exist', function() {
    expect(Html2Markdown).toBeTruthy();
  }); 
  
  it("should translate generated html back to the original markdown", function() {
    $.each(markdownStrings,function(index,originalMarkdown) {
      var translatedMarkdown = $.trim(Html2Markdown(marked(originalMarkdown)));
      expect(translatedMarkdown).toEqual(originalMarkdown);
    });
  });
  
  it('should translate hr elements' ,function() {
    expect(Html2Markdown("<hr>")).toEqual("---");
    expect(Html2Markdown("<hr>\n")).toEqual("---\n");
    expect(Html2Markdown("\n\n<hr>\n")).toEqual("\n\n---\n");
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

  });
  
  describe("should translate paragraphs", function() {
    
    it('should translate elements in the root', function() {
      expect(Html2Markdown("<p>Just some text</p>")).toEqual("Just some text");
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

    it("should not translate element with a div", function() {
      expect(Html2Markdown("<div><em>Just some text</em></div>")).toEqual("<div><em>Just some text</em></div>");
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
  });
  
  describe("should translate ul lists", function() {
    
    it('should handle list with one item', function() {
      expect(Html2Markdown("<ul><li>Hej</li></ul>")).toEqual("- Hej\n")
    })
    
    it('should handle list with many items', function() {
      expect(Html2Markdown("<ul><li>Hej 1</li><li>Hej 2</li></ul>")).toEqual("- Hej 1\n- Hej 2\n")
    })
    
  });
  
  describe("should translate ol lists", function() {
    
    it('should handle list with one item', function() {
      expect(Html2Markdown("<ol><li>Hej</li></ol>")).toEqual("1. Hej\n")
    })
    
    it('should handle list with many items', function() {
      expect(Html2Markdown("<ol><li>Hej 1</li><li>Hej 2</li></ol>")).toEqual("1. Hej 1\n2. Hej 2\n")
    })
    
  });
  
}); 
