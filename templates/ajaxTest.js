{% extends 'layout.html' %}


{% block body %}


<h1>jQuery Example</h1>
<p><input type=text size=5 name=a> +
   <input type=text size=5 name=b> =
   <span id=result>?</span>
<p><a href=# id=calculate>calculate server side</a>

<script type="text/javascript" src="../static/js/ajaxTest.js></script>
{% endblock %}