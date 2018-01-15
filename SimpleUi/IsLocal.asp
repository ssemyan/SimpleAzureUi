<% 
	' determine if we are localhost
	set svr = Request.ServerVariables("SERVER_NAME")
	response.Write(svr="localhost")	
%>