/*
  Text Block
*/
SirTrevor.Blocks.Code = SirTrevor.Block.extend({

  template : _.template([
    '<select id="mode" class="code-mode" size="1"><option value="abap">ABAP</option><option value="ada">ADA</option><option value="actionscript">ActionScript</option><option value="asciidoc">AsciiDoc</option><option value="assembly_x86">Assembly_x86</option><option value="autohotkey">AutoHotKey</option><option value="batchfile">BatchFile</option><option value="c9search">C9Search</option><option value="c_cpp">C/C++</option><option value="clojure">Clojure</option><option value="cobol">Cobol</option><option value="coffee">CoffeeScript</option><option value="coldfusion">ColdFusion</option><option value="csharp">C#</option><option value="css">CSS</option><option value="curly">Curly</option><option value="d">D</option><option value="dart">Dart</option><option value="diff">Diff</option><option value="dot">Dot</option><option value="erlang">Erlang</option><option value="ejs">EJS</option><option value="forth">Forth</option><option value="ftl">FreeMarker</option><option value="glsl">Glsl</option><option value="golang">Go</option><option value="groovy">Groovy</option><option value="haml">HAML</option><option value="haskell">Haskell</option><option value="haxe">haXe</option><option value="html">HTML</option><option value="html_ruby">HTML (Ruby)</option><option value="ini">Ini</option><option value="jade">Jade</option><option value="java">Java</option><option value="javascript">JavaScript</option><option value="json">JSON</option><option value="jsoniq">JSONiq</option><option value="jsp">JSP</option><option value="jsx">JSX</option><option value="julia">Julia</option><option value="latex">LaTeX</option><option value="less">LESS</option><option value="liquid">Liquid</option><option value="lisp">Lisp</option><option value="livescript">LiveScript</option><option value="logiql">LogiQL</option><option value="lsl">LSL</option><option value="lua">Lua</option><option value="luapage">LuaPage</option><option value="lucene">Lucene</option><option value="makefile">Makefile</option><option value="matlab">MATLAB</option><option value="markdown">Markdown</option><option value="mysql">MySQL</option><option value="mushcode">MUSHCode</option><option value="objectivec">Objective-C</option><option value="ocaml">OCaml</option><option value="pascal">Pascal</option><option value="perl">Perl</option><option value="pgsql">pgSQL</option><option value="php">PHP</option><option value="powershell">Powershell</option><option value="prolog">Prolog</option><option value="properties">Properties</option><option value="python">Python</option><option value="r">R</option><option value="rdoc">RDoc</option><option value="rhtml">RHTML</option><option value="ruby">Ruby</option><option value="rust">Rust</option><option value="sass">SASS</option><option value="scad">SCAD</option><option value="scala">Scala</option><option value="scheme">Scheme</option><option value="scss">SCSS</option><option value="sh">SH</option><option value="snippets">snippets</option><option value="sql">SQL</option><option value="stylus">Stylus</option><option value="svg">SVG</option><option value="tcl">Tcl</option><option value="tex">Tex</option><option value="text">Text</option><option value="textile">Textile</option><option value="toml">Toml</option><option value="twig">Twig</option><option value="typescript">Typescript</option><option value="vbscript">VBScript</option><option value="velocity">Velocity</option><option value="xml">XML</option><option value="xquery">XQuery</option><option value="yaml">YAML</option></select>',
    '<div class="code-block" id="code-editor-content-<%= blockID %>" style="position: relative !important; border: 1px solid lightgray; margin: auto;height: 200px;"></div>'
  ].join("\n")),

  type: "code",
  title: 'Code',
  icon_name: 'text',
  className: "st-block st-icon--add st-code-block",

  /*editorHTML: function() {
    return '<div class="code-block" id="code-editor-content-' + this.blockID + '" style="position:absolute; top: 0; right: 0; bottom: 0;left: 0;"></div>';
  },*/

  editorHTML: function() {
    return this.template(this);
  },

  loadData: function(data){
    this.$('.code-block').html(SirTrevor.toHTML(data.text, this.type));
    console.log('content loaded');
  },

  onBlockRender: function() {
    this.codeEditor = ace.edit("code-editor-content-" + this.blockID);
    this.codeEditor.setTheme("ace/theme/github");
    this.codeEditor.getSession().setMode("ace/mode/php");
    this.codeEditor.setHighlightActiveLine(false);

    this.$el.find('select').on('change', _.bind(function(ev){
      this.mode = $(ev.currentTarget).val();
      console.log('mode switched to '+ this.mode);
      this.codeEditor.getSession().setMode("ace/mode/"+this.mode);
    }, this));
  },

  toData: function() {
    var dataObj = {};
    var content =  this.codeEditor == undefined ? '' : this.codeEditor.getSession().getValue();

    if (content.length > 0) {
      dataObj.text = content;
      dataObj.mode = this.mode;
    }

    if(!_.isEmpty(dataObj)) {
      this.setData(dataObj);
    }
  },

});