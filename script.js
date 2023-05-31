require("ace/ext/emmet");
var editors = [ace.edit("html"), ace.edit("css"), ace.edit("js")];
var editorTypes = ["html", "css", "javascript"];
var result = document.getElementById("result");
function showResult() {
  result.srcdoc = "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><style>" + editors[1].getValue() + "</style></head><body>" + editors[0].getValue() + "<script>" + editors[2].getValue() + "<" + "/script></body></html>";
}
for(var i = 0; i < 3; i++) {
  var qtext = new URLSearchParams(location.search).get(editorTypes[i]);
  editors[i].setTheme("ace/theme/monokai");
  editors[i].session.setMode("ace/mode/" + editorTypes[i]);
  editors[i].session.setUseWorker(false);
  editors[i].session.setUseWrapMode(true);
  editors[i].setOption("enableEmmet", true);
  editors[i].setValue(qtext, 1);
  editors[i].session.on("change", showResult);
}
showResult();
document.getElementById("save").addEventListener("dblclick", function() {
  var title = prompt("Title:");
  if(title !== null) {
    var element = document.createElement("a");
    element.href = "data:text/html," + encodeURIComponent("<!DOCTYPE html><html><head><title>" + title + "</title><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><style>" + editors[1].getValue() + "</style></head><body>" + editors[0].getValue() + "<script>" + editors[2].getValue() + "<" + "/script></body></html>");
    element.download = "program.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
});
document.getElementById("copy-link").addEventListener("click", function() {
  navigator.clipboard.writeText("https://coders2-hcj.github.io/darkside/index.html" + encodeURIComponent(editors[0].getValue()) + "&css=" + encodeURIComponent(editors[1].getValue()) + "&javascript=" + encodeURIComponent(editors[2].getValue()));
  document.getElementById("copy-link").textContent = "Copied!";
  setTimeout(function() {
    document.getElementById("copy-link").textContent = "Copy Link";
  }, 2000);
});
addEventListener("beforeunload", function(e) {e.returnValue = true;});
