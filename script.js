require("ace/ext/emmet");
var editors = [ace.edit("html"), ace.edit("css"), ace.edit("js")];
var editorTypes = ["html", "css", "javascript"];
var result = document.getElementById("result");
for(var i = 0; i < 3; i++) {
  editors[i].setTheme("ace/theme/monokai");
  editors[i].session.setMode("ace/mode/" + editorTypes[i]);
  editors[i].session.setUseWorker(false);
  editors[i].setOption("enableEmmet", true);
  editors[i].session.on("change", function() {
    result.src = "data:text/html;charset=utf-8," + encodeURIComponent("<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><style>" + editors[1].getValue() + "</style></head><body>" + editors[0].getValue() + "<script>" + editors[2].getValue() + "<" + "/script></body></html>");
  });
}
document.getElementById("save").addEventListener("dblclick", function() {
  var title = prompt("Title:");
  if(title !== null) {
    var element = document.createElement("a");
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent("<!DOCTYPE html><html><head><title>" + title + "</title><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><style>" + editors[1].getValue() + "</style></head><body>" + editors[0].getValue() + "<script>" + editors[2].getValue() + "<" + "/script></body></html>");
    element.download = "program.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
});
