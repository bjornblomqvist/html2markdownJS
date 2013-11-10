# html2markdownJS

It takes HTML and returns markdown where possible. Where possible is defined as where we don't lose any data by translating to markdown. An example of this is that no element with a class is translated to markdown.

    Html2Markdown("<ol><li>Hej 1</li><li>Hej 2</li></ol>") === "1. Hej 1\n2. Hej 2";
    
    Html2Markdown('<h1 class="">Heading 1</h1>') === '<h1 class="">Heading 1</h1>'
    
    Html2Markdown($('.forum-post').html());
    
See the spec/test for more examples.

## Dependencies

- jQuery
    
## Status

I am using it in production with some customers.

## Contributing to html2markdownJS

- Fork the project.
- Start a feature/bugfix branch.
- Commit and push until you are happy with your contribution.
- Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
    
## Copyright
Copyright (c) 2012 - 2013 Björn Blomqvist. (LGPL) See LICENSE.txt for further details.
