  fn = function(req, res) {
  var fileName = req.files.upload.name;
  let   tmpPath = req.files.upload;
tmpPath.mv('./public/upload/editro/'+fileName , function(err) {
      if (err) {
        console.log(err);
        return;
      }
        var html;
        html = "";
        html += "<script type='text/javascript'>";
        html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
        html += "    var url     = \"/upload/editro/" + req.files.upload.name + "\";";
        html += "    var message = \"Uploaded file successfully\";";
        html += "";
        html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
        html += "</script>";
      res.send(html);
      });
  };
  
module.exports = fn